import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class AuthManager {
    constructor() {
        this.user = null;
        this.userProfile = null;
        this.onUserChanged = null;
        this.onProfileRequired = null;

        this.sessionStartTime = null;
        this.sessionInterval = null;
        this.lastActivityTime = Date.now(); // Rilevatore inattività

        // Tracciamo l'attività dell'utente per l'anti-farming
        window.addEventListener('mousemove', () => this.updateActivity());
        window.addEventListener('keydown', () => this.updateActivity());
        window.addEventListener('click', () => this.updateActivity());
    }

    updateActivity() {
        this.lastActivityTime = Date.now();
    }

    setAuthStateListener(callback, requireProfileCallback = null) {
        this.onUserChanged = callback;
        this.onProfileRequired = requireProfileCallback;

        if (window.firebaseOnAuth && window.firebaseAuth) {
            window.firebaseOnAuth(window.firebaseAuth, async (user) => {
                this.user = user;

                if (user) {
                    await this.loadUserProfile();
                } else {
                    this.userProfile = null;
                    this.stopSessionTimer();
                }

                if (this.onUserChanged) this.onUserChanged(this.user, this.userProfile);
            });
        }
    }

    async loadUserProfile() {
        if (!this.user || !window.firebaseDb) return;

        try {
            const profileRef = window.dbDoc(window.firebaseDb, "users", this.user.uid);
            const docSnap = await window.dbGet(profileRef);

            if (docSnap.exists()) {
                this.userProfile = docSnap.data();
                await this.handleDailyLogin(profileRef);
                this.startSessionTimer(profileRef);
            } else {
                this.userProfile = null;
                if (this.onProfileRequired) {
                    this.onProfileRequired(this.user);
                }
            }
        } catch (error) {
            console.error("Errore nel caricamento del profilo utente:", error);
        }
    }

    // --- NUOVO: Controllo Nickname Esclusivo ---
    async isNicknameAvailable(nickname) {
        if (!window.firebaseDb || !this.user) return false;

        const usersRef = collection(window.firebaseDb, "users");
        const q = query(usersRef, where("nickname", "==", nickname));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return true; // Nessuno lo usa

        let available = true;
        snapshot.forEach(doc => {
            // Se esiste ma è il NOSTRO documento, va bene. Altrimenti è di un altro.
            if (doc.id !== this.user.uid) {
                available = false;
            }
        });

        return available;
    }

    async handleDailyLogin(profileRef) {
        const now = new Date();
        const todayStr = now.toDateString();

        let lastLoginStr = this.userProfile.lastLoginDate ? this.userProfile.lastLoginDate : null;

        if (lastLoginStr === todayStr) return;

        let consecutiveDays = this.userProfile.consecutiveDays || 0;
        let newExp = this.userProfile.totalExp || 0;

        if (lastLoginStr) {
            const lastLoginDate = new Date(lastLoginStr);
            const diffTime = Math.abs(now - lastLoginDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                consecutiveDays += 1;
            } else if (diffDays > 1) {
                consecutiveDays = 1; // Resetta la serie se salta un giorno
            }
        } else {
            consecutiveDays = 1;
        }

        // Moltiplicatore EXP giornaliero
        const multiplier = Math.min(1 + (consecutiveDays * 0.2), 3.0); // Massimo x3
        const expGained = Math.floor(20 * multiplier); // Base 20 exp
        newExp += expGained;

        const newRarity = this.calculateRarity(newExp);

        this.userProfile.lastLoginDate = todayStr;
        this.userProfile.consecutiveDays = consecutiveDays;
        this.userProfile.totalExp = newExp;
        this.userProfile.rarity = newRarity;

        await window.dbSet(profileRef, {
            lastLoginDate: todayStr,
            consecutiveDays: consecutiveDays,
            totalExp: newExp,
            rarity: newRarity
        }, { merge: true });
    }

    startSessionTimer(profileRef) {
        this.sessionStartTime = Date.now();

        // Salva ogni 5 minuti
        this.sessionInterval = setInterval(async () => {
            await this.saveSessionTime(profileRef);
        }, 5 * 60 * 1000);

        window.addEventListener('beforeunload', () => {
            this.saveSessionTime(profileRef, true);
        });
    }

    stopSessionTimer() {
        if (this.sessionInterval) {
            clearInterval(this.sessionInterval);
            this.sessionInterval = null;
        }
        if (this.user && this.userProfile) {
            const profileRef = window.dbDoc(window.firebaseDb, "users", this.user.uid);
            this.saveSessionTime(profileRef);
        }
    }

    async saveSessionTime(profileRef, isUnloading = false) {
        if (!this.sessionStartTime || !this.userProfile) return;

        const now = Date.now();
        // ANTI-FARMING: Se l'utente non ha mosso il mouse da 5 minuti, non diamo EXP
        const isAfk = (now - this.lastActivityTime) > (5 * 60 * 1000);

        const minutesSpent = Math.floor((now - this.sessionStartTime) / 60000);

        if (minutesSpent > 0) {
            let currentTotalTime = this.userProfile.totalTimeSpent || 0;
            let currentExp = this.userProfile.totalExp || 0;

            currentTotalTime += minutesSpent;

            // Diamo 1 exp ogni 2 minuti, ma SOLO se non è AFK
            if (!isAfk) {
                currentExp += Math.floor(minutesSpent / 2);
            }

            const newRarity = this.calculateRarity(currentExp);

            this.userProfile.totalTimeSpent = currentTotalTime;
            this.userProfile.totalExp = currentExp;
            this.userProfile.rarity = newRarity;

            this.sessionStartTime = now;

            if (!isUnloading) {
                await window.dbSet(profileRef, {
                    totalTimeSpent: currentTotalTime,
                    totalExp: currentExp,
                    rarity: newRarity
                }, { merge: true });
            }
        }
    }

    // --- NUOVO: Aggiungi EXP extra (es. per Post in bacheca) ---
    async addExp(amount) {
        if (!this.user || !this.userProfile) return;

        let currentExp = this.userProfile.totalExp || 0;
        currentExp += amount;

        const newRarity = this.calculateRarity(currentExp);
        this.userProfile.totalExp = currentExp;
        this.userProfile.rarity = newRarity;

        const profileRef = window.dbDoc(window.firebaseDb, "users", this.user.uid);
        await window.dbSet(profileRef, {
            totalExp: currentExp,
            rarity: newRarity
        }, { merge: true });
    }

    // --- SCALATA RARITÀ BILANCIATA ---
    calculateRarity(exp) {
        if (exp >= 50000) return "Legendary Player +";
        if (exp >= 20000) return "Legendary Player";
        if (exp >= 10000) return "Top Player +";
        if (exp >= 5000) return "Top Player";
        if (exp >= 2500) return "Advanced Player +";
        if (exp >= 1200) return "Advanced Player";
        if (exp >= 600) return "Growing Player +";
        if (exp >= 300) return "Growing Player";
        if (exp >= 100) return "Normal Player +";
        return "Normal Player";
    }

    async loginWithGoogle() {
        try {
            await window.firebaseLogin(window.firebaseAuth, window.googleProvider);
        } catch (error) {
            console.error("Errore durante il login:", error);
        }
    }

    async logout() {
        try {
            this.stopSessionTimer();
            await window.firebaseLogout(window.firebaseAuth);
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    }

    getCurrentUser() { return this.user; }
    getCurrentProfile() { return this.userProfile; }

    async getUserCollection() {
        if (!this.user || !window.firebaseDb) return {};
        try {
            const userDocRef = window.dbDoc(window.firebaseDb, "collezione", this.user.uid);
            const docSnap = await window.dbGet(userDocRef);
            return docSnap.exists() ? (docSnap.data().characters || {}) : {};
        } catch (error) {
            console.error("Errore nel recupero della collezione:", error);
            return {};
        }
    }
}