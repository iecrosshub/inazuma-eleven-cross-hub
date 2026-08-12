// js/Services/buildManager.js

export class BuildManager {
    constructor() {
        this.collectionName = "character_builds";
    }

    get db() {
        return window.firebaseDb;
    }

    async getAllBuilds() {
        if (!this.db) return [];
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
            const snapshot = await getDocs(collection(this.db, this.collectionName));
            return snapshot.docs.map(doc => ({
                characterId: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Errore recupero build:", error);
            return [];
        }
    }

    async getBuild(charId) {
        if (!this.db || !charId) return null;
        try {
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
            const docRef = doc(this.db, this.collectionName, charId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error) {
            console.error("Errore recupero singola build:", error);
            return null;
        }
    }

    async saveBuild(charId, buildData) {
        if (!this.db || !charId) return false;
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
            const docRef = doc(this.db, this.collectionName, charId);
            await setDoc(docRef, buildData, { merge: true });
            return true;
        } catch (error) {
            console.error("Errore salvataggio build:", error);
            alert("Errore durante il salvataggio su Firebase.");
            return false;
        }
    }

    async deleteBuild(charId) {
        if (!this.db || !charId) return false;
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
            const docRef = doc(this.db, this.collectionName, charId);
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            console.error("Errore eliminazione build:", error);
            return false;
        }
    }
}