// js/Services/buildManager.js
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class BuildManager {
    constructor() {
        this.collectionName = "character_builds";
    }

    get db() {
        return window.firebaseDb;
    }

    // Salva o aggiorna la build di un PG (usa l'ID del pg come ID del documento per evitare duplicati)
    async saveBuild(characterId, buildData) {
        if (!this.db) return false;
        try {
            const buildRef = doc(this.db, this.collectionName, characterId);
            await setDoc(buildRef, {
                ...buildData,
                updatedAt: serverTimestamp()
            }, { merge: true }); // Merge unisce i dati senza cancellare quelli vecchi
            return true;
        } catch (error) {
            console.error("Errore salvataggio build:", error);
            return false;
        }
    }

    // Recupera la build di un SINGOLO personaggio (perfetto per le future schede PG)
    async getBuild(characterId) {
        if (!this.db) return null;
        try {
            const buildRef = doc(this.db, this.collectionName, characterId);
            const snap = await getDoc(buildRef);
            return snap.exists() ? snap.data() : null;
        } catch (error) {
            console.error("Errore recupero build:", error);
            return null;
        }
    }

    // Recupera TUTTE le build (utile per una futura pagina "Tier List Globale")
    async getAllBuilds() {
        if (!this.db) return [];
        try {
            const snap = await getDocs(collection(this.db, this.collectionName));
            return snap.docs.map(doc => ({ characterId: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Errore recupero tutte le build:", error);
            return [];
        }
    }

    async deleteBuild(characterId) {
        if (!this.db) return false;
        try {
            await deleteDoc(doc(this.db, this.collectionName, characterId));
            return true;
        } catch (error) {
            console.error("Errore eliminazione build:", error);
            return false;
        }
    }
}