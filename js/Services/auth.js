// js/auth.js

export class AuthManager {
    constructor() {
        this.user = null;
        this.onUserChanged = null;
    }

    setAuthStateListener(callback) {
        this.onUserChanged = callback;

        // Questo comando ascolta Firebase in tempo reale:
        // se l'utente è loggato, se ricarica la pagina, o se esce.
        if (window.firebaseOnAuth && window.firebaseAuth) {
            window.firebaseOnAuth(window.firebaseAuth, (user) => {
                this.user = user;
                if (this.onUserChanged) this.onUserChanged(this.user);
            });
        }
    }

    async loginWithGoogle() {
        try {
            console.log("Avvio procedura di login con Google...");
            // Chiama la finestra popup di Google
            await window.firebaseLogin(window.firebaseAuth, window.googleProvider);
        } catch (error) {
            console.error("Errore durante il login:", error);
            alert("Impossibile accedere: " + error.message);
        }
    }

    async logout() {
        try {
            console.log("Disconnessione in corso...");
            await window.firebaseLogout(window.firebaseAuth);
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    }

    getCurrentUser() {
        return this.user;
    }

    // --- ECCO LA FUNZIONE CHE MANCAVA! ---
    // Scarica la collezione dell'utente loggato dal Cloud
    async getUserCollection() {
        if (!this.user || !window.firebaseDb) return {};
        try {
            const userDocRef = window.dbDoc(window.firebaseDb, "collezione", this.user.uid);
            const docSnap = await window.dbGet(userDocRef);
            return docSnap.exists() ? (docSnap.data().characters || {}) : {};
        } catch (error) {
            console.error("Errore nel recupero della collezione dal Cloud:", error);
            return {};
        }
    }
}