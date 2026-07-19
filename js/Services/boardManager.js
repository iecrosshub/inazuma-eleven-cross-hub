import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class BoardManager {
    constructor() {
        this.db = window.firebaseDb;
        this.collectionName = "community_posts";
    }

    async fetchPosts() {
        try {
            const postsRef = collection(this.db, this.collectionName);
            const q = query(postsRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            return posts;
        } catch (error) {
            console.error("Errore nel recupero dei post:", error);
            return [];
        }
    }

    async createPost(user, type, code, message, profileData = null) {
        try {
            const postsRef = collection(this.db, this.collectionName);
            await addDoc(postsRef, {
                authorId: user.uid,
                authorName: profileData?.nickname || user.displayName || "Utente Anonimo",
                authorAvatarId: profileData?.selectedAvatarId || "default",
                authorRole: profileData?.role || "FW",
                authorElement: profileData?.element || "Fuoco",
                authorRarity: profileData?.rarity || "Normal Player", // SALVIAMO LA RARITÀ!
                type: type,
                code: code.toUpperCase().trim(),
                message: message.trim(),
                createdAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Errore durante la pubblicazione:", error);
            return false;
        }
    }

    async deletePost(postId) {
        try {
            const postRef = doc(this.db, this.collectionName, postId);
            await deleteDoc(postRef);
            return true;
        } catch (error) {
            console.error("Errore durante l'eliminazione del post:", error);
            return false;
        }
    }

    // Aggiorna nome, avatar, ruolo ed elemento nei post vecchi
    async updatePostAuthorData(postId, newData) {
        try {
            const postRef = doc(this.db, this.collectionName, postId);
            await updateDoc(postRef, newData);
            return true;
        } catch (error) {
            console.error("Errore durante l'aggiornamento dei dati nel post:", error);
            return false;
        }
    }
}