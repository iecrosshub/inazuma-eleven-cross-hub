import { AuthManager } from '../Services/auth.js';
import { coachRegistry } from '../Coaches/registry.js';
import { characterRegistry, fetchCoachData } from '../Core/database.js';
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const ADMIN_UID = "avNoCAM4I5dyQL6zLY0phnt3fc92";
const MODERATOR_UIDS = ["alqyEbbyuxNjej3yTJQDNthmtf32"];

class DiscussionController {
    constructor() {
        this.auth = new AuthManager();

        this.postType = sessionStorage.getItem('discType');
        this.postId = sessionStorage.getItem('discId');

        this.originalPostData = null;
        this.currentUser = null;

        this.commentsCollection = "discussion_comments";

        this.auth.setAuthStateListener((user) => {
            this.currentUser = user;
            // Quando l'utente logga, re-renderizziamo il post così i suoi dati dinamici si applicano subito
            if (this.originalPostData) {
                this.renderPost();
                this.renderPostActions();
                this.renderCommentForm();
            }
        });

        this.injectEditModal();
        this.init();
    }

    async init() {
        if (!this.postId || !this.postType) {
            this.showError("Nessuna discussione selezionata. Torna in bacheca e clicca su un post.");
            return;
        }

        if (!window.firebaseDb) {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.db = window.firebaseDb;
        await this.loadOriginalPost();
    }

    // ==========================================
    // GRAFICA UTENTE (COLLEGATA AL PROFILO REALE)
    // ==========================================
    generateUserHeaderHtml(data, dateStr) {
        const elementEngMap = { 'Fuoco': 'Fire', 'Vento': 'Wind', 'Albero': 'Forest', 'Montagna': 'Mountain', 'Nulla': 'Void' };

        // --- IL TRUCCO DINAMICO ---
        // Partiamo dai dati salvati nel database...
        let uName = data.authorName;
        let uAvatar = data.authorAvatarId;
        let uRole = data.authorRole;
        let uElement = data.authorElement;
        let uRarity = data.authorRarity;

        // ... MA se l'autore di questo post/commento sei TU (utente loggato),
        // sovrascriviamo al volo i vecchi dati con quelli LIVE del tuo profilo globale!
        if (this.currentUser && data.authorId === this.currentUser.uid) {
            const profile = this.auth.getCurrentProfile();
            if (profile) {
                uName = profile.nickname || uName;
                uAvatar = profile.selectedAvatarId || uAvatar;
                uRole = profile.role || uRole;
                uElement = profile.element || uElement;
                uRarity = profile.rarity || uRarity;
            }
        }
        // --------------------------

        // 1. Avatar (usa le variabili dinamiche "u")
        let avatarHtml = `<div class="user-avatar text-center align-content-center post-user-avatar">${uName.charAt(0).toUpperCase()}</div>`;
        if (uAvatar && uAvatar !== 'default') {
            const baseChar = characterRegistry.find(c => c.id === uAvatar);
            if (baseChar) avatarHtml = `<img src="${baseChar.thumb.includes('/') ? baseChar.thumb : 'img/Characters/'+baseChar.thumb}" class="post-user-avatar">`;
        }

        // 2. Ruolo ed Elemento (ora pescano dal Profilo se sei tu!)
        const elementIcon = `img/Element/Icon_Element_${elementEngMap[uElement] || 'Fire'}.png`;
        const roleIcon = `img/Position/Icon_Position_${uRole || 'FW'}.png`;

        // 3. Admin Badges
        let adminBadgeHtml = '';
        if (data.authorId === ADMIN_UID) adminBadgeHtml = `<span class="badge ms-2 bg-danger border border-warning shadow-sm"><i class="fas fa-crown text-warning"></i> Creatore</span>`;
        else if (MODERATOR_UIDS.includes(data.authorId)) adminBadgeHtml = `<span class="badge ms-2 bg-primary border border-light shadow-sm"><i class="fas fa-shield-alt text-light"></i> Admin</span>`;

        // 4. Stile Rarità
        let bgColor = "#198754", textColor = "#ffffff", extraStyle = "";
        if (uRarity) {
            if (uRarity.includes("Growing")) { bgColor = "#add8e6"; textColor = "#000000"; }
            else if (uRarity.includes("Advanced")) { bgColor = "#8a2be2"; textColor = "#ffffff"; }
            else if (uRarity.includes("Top")) { bgColor = "#fffacd"; textColor = "#000000"; }
            else if (uRarity === "Legendary Player") { bgColor = "#fd7e14"; textColor = "#ffffff"; }
            else if (uRarity === "Legendary Player +") { bgColor = "transparent"; textColor = "#ffffff"; extraStyle = "background-image: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3); border: 1px solid #fff;"; }
        }

        // 5. Blocco User-Info
        return `
        <div class="user-info d-flex align-items-center">
            <div class="me-3">${avatarHtml}</div>
            <div>
                <strong>${uName}</strong> ${adminBadgeHtml}<br>
                <div class="d-flex align-items-center mt-1 gap-2 border rounded px-2 py-1 bg-light" style="display: inline-flex !important;">
                    <img src="${roleIcon}" style="width: 18px; height: 18px;">
                    <img src="${elementIcon}" style="width: 18px; height: 18px;">
                </div>
                <span class="badge ms-2 border text-shadow-sm" style="background-color: ${bgColor}; color: ${textColor}; ${extraStyle}">${uRarity || 'Normal Player'}</span>
                <small class="d-block mt-2"><i class="far fa-clock"></i> ${dateStr}</small>
            </div>
        </div>`;
    }

    // ==========================================
    // 1. CARICAMENTO E RENDER DEL POST
    // ==========================================
    async loadOriginalPost() {
        let collectionName = this.postType === 'team' ? 'team_discussions' : 'build_discussions';

        try {
            const docRef = window.dbDoc(this.db, collectionName, this.postId);
            const docSnap = await window.dbGet(docRef);

            if (docSnap.exists()) {
                this.originalPostData = docSnap.data();
                await this.renderPost();
                await this.loadComments();
            } else {
                this.showError("Questa discussione è stata eliminata o non esiste più.");
            }
        } catch (error) {
            console.error("Errore nel caricamento del post:", error);
            this.showError("Errore di connessione al database.");
        }
    }

    async renderPost() {
        const container = document.getElementById('original-post-container');
        const data = this.originalPostData;
        const dateStr = data.createdAt ? this.formatDate(data.createdAt.toDate()) : 'Data sconosciuta';

        if (this.postType === 'team') {
            await this.renderTeamPost(container, data, dateStr);
        } else {
            container.innerHTML = `<div class="p-4 bg-white rounded shadow-sm border text-center">Struttura in arrivo...</div>`;
        }

        this.renderPostActions();
    }

    async renderTeamPost(container, data, dateStr) {
        let teamData = { coachId: null, playerCount: 0, roster: {} };
        try { teamData = JSON.parse(data.teamSnapshot); } catch(e) {}

        let coachName = "Allenatore Sconosciuto";
        let coachThumb = "https://placehold.co/100";
        let coachDb = null;

        if(teamData.coachId) {
            const c = coachRegistry.find(x => x.id === teamData.coachId);
            if(c) {
                coachName = c.name;
                coachThumb = c.thumb;
            }
            coachDb = await fetchCoachData(teamData.coachId);
        }

        let pitchHtml = `<div class="text-center text-muted p-3">Impossibile caricare il campo.</div>`;

        if (coachDb && coachDb.slots) {
            const slotsHtml = coachDb.slots.map(slot => {
                const playerId = teamData.roster[slot.number];
                if (playerId) {
                    const player = characterRegistry.find(c => c.id === playerId);
                    return `
                        <div class="pitch-slot has-player" style="top: ${slot.y}%; left: ${slot.x}%; cursor: default;">
                            <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                            <img src="${player.thumb}" class="player-thumb" onerror="this.src='https://placehold.co/65'">
                        </div>
                    `;
                } else {
                    return `
                        <div class="pitch-slot" style="top: ${slot.y}%; left: ${slot.x}%; cursor: default;">
                            <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                            <strong>${slot.number}</strong>
                        </div>
                    `;
                }
            }).join('');

            pitchHtml = `
            <div class="pitch-container-wrapper mx-auto mt-4 mb-2" style="transform: scale(0.9); transform-origin: top center; pointer-events: none;">
                <div class="pitch shadow-lg">
                    ${slotsHtml}
                </div>
            </div>`;
        }

        container.innerHTML = `
        <div class="bg-white rounded shadow-sm overflow-hidden position-relative" style="border: 2px solid #1a73e8;">
            <div id="post-actions-container" class="position-absolute top-0 end-0 p-3 z-3"></div>

            <div class="p-4" style="background-color: #f8fbff; border-bottom: 2px solid #c0d3e8;">
                <h2 class="fw-bold mb-3 pe-5" style="color: #0b1a42;" id="display-title">${data.title}</h2>
                <!-- Richiamo la funzione 1:1 della Community che ora pesca dal tuo profilo! -->
                ${this.generateUserHeaderHtml(data, dateStr)}
            </div>
            
            <div class="p-4">
                <p class="fs-5 m-0" style="color: #0b1a42; line-height: 1.6; white-space: pre-wrap;" id="display-desc">${data.description}</p>
            </div>
            
            <div class="p-4 m-4 rounded" style="background-color: #0b1a42; border: 2px solid #ffca28; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                <div class="d-flex justify-content-between border-bottom pb-2 border-secondary mb-3">
                    <h5 class="text-white fw-bold m-0"><i class="fas fa-chess-board text-warning me-2"></i> Formazione: ${coachName}</h5>
                    <div class="badge bg-light text-dark fw-bold px-3 py-2 fs-6">In campo: ${teamData.playerCount} / 11</div>
                </div>
                ${pitchHtml}
            </div>
        </div>`;
    }

    renderPostActions() {
        const container = document.getElementById('post-actions-container');
        if (!container || !this.currentUser || !this.originalPostData) return;

        const isAuthor = this.currentUser.uid === this.originalPostData.authorId;
        const isAdmin = this.currentUser.uid === ADMIN_UID || MODERATOR_UIDS.includes(this.currentUser.uid);

        if (isAuthor || isAdmin) {
            container.innerHTML = `
                <div class="d-flex gap-2 bg-white p-2 rounded shadow-sm border">
                    ${isAuthor ? `<button id="btn-edit-post" class="btn btn-sm btn-outline-primary fw-bold"><i class="fas fa-edit"></i> Modifica</button>` : ''}
                    <button id="btn-delete-post" class="btn btn-sm btn-outline-danger fw-bold"><i class="fas fa-trash"></i> Elimina</button>
                </div>
            `;

            if(isAuthor) {
                document.getElementById('btn-edit-post').onclick = () => this.handleEditPost();
            }
            document.getElementById('btn-delete-post').onclick = () => this.handleDeletePost();
        }
    }

    // ==========================================
    // 2. AZIONI POST (MODIFICA / ELIMINA)
    // ==========================================
    injectEditModal() {
        if (document.getElementById('editPostModal')) return;

        const modalHtml = `
        <div class="modal fade" id="editPostModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-white" style="border: 2px solid #1a73e8; border-radius: 12px;">
                    <div class="modal-header" style="border-bottom: 2px solid #e2e8f0;">
                        <h5 class="modal-title fw-bold" style="color: #0b1a42;"><i class="fas fa-edit text-primary me-2"></i> Modifica Discussione</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold" style="color: #0b1a42;">Titolo della discussione</label>
                            <input type="text" id="edit-title-input" class="form-control" style="background-color: #f8fbff; border: 1px solid #a0bcdc; color: #0b1a42;" maxlength="60">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold" style="color: #0b1a42;">Descrizione / Domanda</label>
                            <textarea id="edit-desc-input" class="form-control" style="background-color: #f8fbff; border: 1px solid #a0bcdc; color: #0b1a42;" rows="5" maxlength="300"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer" style="border-top: 2px solid #e2e8f0;">
                        <button type="button" class="btn btn-outline-secondary fw-bold" data-bs-dismiss="modal">Annulla</button>
                        <button type="button" id="btn-save-edit" class="btn btn-primary fw-bold" style="background-color: #1a73e8;">Salva Modifiche</button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    handleEditPost() {
        document.getElementById('edit-title-input').value = this.originalPostData.title;
        document.getElementById('edit-desc-input').value = this.originalPostData.description;

        const modalEl = document.getElementById('editPostModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();

        const btnSave = document.getElementById('btn-save-edit');
        btnSave.onclick = async () => {
            const newTitle = document.getElementById('edit-title-input').value.trim();
            const newDesc = document.getElementById('edit-desc-input').value.trim();

            if (newTitle.length < 5 || newDesc.length < 5) {
                alert("Il titolo e la descrizione devono avere almeno 5 caratteri.");
                return;
            }

            btnSave.disabled = true;
            btnSave.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvataggio...';

            const collectionName = this.postType === 'team' ? 'team_discussions' : 'build_discussions';
            const docRef = doc(this.db, collectionName, this.postId);

            try {
                await updateDoc(docRef, { title: newTitle, description: newDesc });
                this.originalPostData.title = newTitle;
                this.originalPostData.description = newDesc;
                document.getElementById('display-title').textContent = newTitle;
                document.getElementById('display-desc').textContent = newDesc;
                modal.hide();
            } catch (e) {
                console.error("Errore modifica:", e);
                alert("Errore durante la modifica del post.");
            } finally {
                btnSave.disabled = false;
                btnSave.innerHTML = 'Salva Modifiche';
            }
        };
    }

    async handleDeletePost() {
        if (!confirm("Sei sicuro di voler eliminare questa discussione? L'azione è irreversibile.")) return;

        const collectionName = this.postType === 'team' ? 'team_discussions' : 'build_discussions';
        try {
            await deleteDoc(doc(this.db, collectionName, this.postId));
            window.location.href = `community.html?tab=${this.postType === 'team' ? 'teams' : 'general'}`;
        } catch (e) {
            console.error("Errore eliminazione:", e);
            alert("Errore durante l'eliminazione del post.");
        }
    }

    // ==========================================
    // 3. SISTEMA COMMENTI
    // ==========================================
    async loadComments() {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '<div class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x text-primary"></i></div>';

        try {
            const q = query(
                collection(this.db, this.commentsCollection),
                where("postId", "==", this.postId),
                orderBy("createdAt", "asc")
            );

            const snapshot = await getDocs(q);
            const commentsList = document.createElement('div');
            commentsList.className = "d-flex flex-column gap-3 mb-4";

            if (snapshot.empty) {
                commentsList.innerHTML = `<div class="text-center p-4 text-muted border rounded bg-light">Ancora nessun commento. Sii il primo a rispondere!</div>`;
            } else {
                snapshot.forEach(doc => {
                    const c = doc.data();
                    const dateStr = c.createdAt ? this.formatDate(c.createdAt.toDate()) : 'Poco fa';
                    const isAuthor = c.authorId === this.originalPostData.authorId;

                    // Anche i commenti usano la logica dinamica per chi li ha scritti!
                    commentsList.innerHTML += `
                    <div class="p-3 bg-white border rounded shadow-sm">
                        <div class="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                            ${this.generateUserHeaderHtml(c, dateStr)}
                            <div class="text-end">
                                ${isAuthor ? '<span class="badge bg-primary mb-1"><i class="fas fa-pen"></i> Autore</span>' : ''}
                            </div>
                        </div>
                        <p class="m-0 fs-6" style="white-space: pre-wrap; color: #0b1a42;">${c.text}</p>
                    </div>`;
                });
            }

            commentsContainer.innerHTML = '';
            commentsContainer.appendChild(commentsList);

            this.renderCommentForm();

        } catch (error) {
            console.error("Errore caricamento commenti:", error);
            commentsContainer.innerHTML = '<div class="text-danger text-center p-3">Impossibile caricare i commenti.</div>';
        }
    }

    renderCommentForm() {
        const container = document.getElementById('comments-container');
        const existingForm = document.getElementById('add-comment-box');
        if (existingForm) existingForm.remove();

        if (!this.currentUser) {
            container.insertAdjacentHTML('beforeend', `
                <div id="add-comment-box" class="text-center p-4 rounded mt-3" style="background-color: #f8fbff; border: 2px dashed #c0d3e8;">
                    <p class="fw-bold text-primary m-0"><i class="fas fa-lock me-2"></i>Devi effettuare l'accesso per poter commentare.</p>
                </div>
            `);
            return;
        }

        container.insertAdjacentHTML('beforeend', `
            <div id="add-comment-box" class="bg-light p-3 border rounded shadow-sm mt-3">
                <h6 class="fw-bold mb-2" style="color: #0b1a42;">Aggiungi una risposta</h6>
                <textarea id="comment-input" class="form-control mb-2" rows="3" placeholder="Scrivi un commento educato e costruttivo..."></textarea>
                <div class="text-end">
                    <button id="btn-submit-comment" class="btn btn-primary fw-bold px-4"><i class="fas fa-paper-plane me-1"></i> Invia Risposta</button>
                </div>
            </div>
        `);

        document.getElementById('btn-submit-comment').onclick = () => this.submitComment();
    }

    async submitComment() {
        const input = document.getElementById('comment-input');
        const text = input.value.trim();

        if (text.length < 2) {
            alert("Il commento è troppo corto!");
            return;
        }

        const btn = document.getElementById('btn-submit-comment');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio...';

        try {
            const profile = this.auth.getCurrentProfile();

            await addDoc(collection(this.db, this.commentsCollection), {
                postId: this.postId,
                authorId: this.currentUser.uid,
                authorName: profile?.nickname || this.currentUser.displayName || "Allenatore",
                authorAvatarId: profile?.selectedAvatarId || "default",
                authorRole: profile?.role || "FW",
                authorElement: profile?.element || "Fuoco",
                authorRarity: profile?.rarity || "Normal Player",
                text: text,
                createdAt: serverTimestamp()
            });

            const collectionName = this.postType === 'team' ? 'team_discussions' : 'build_discussions';
            const docRef = doc(this.db, collectionName, this.postId);
            const newCount = (this.originalPostData.commentCount || 0) + 1;
            await updateDoc(docRef, { commentCount: newCount });

            input.value = '';
            await this.loadComments();
        } catch (e) {
            console.error("Errore invio commento:", e);
            alert("Si è verificato un errore durante l'invio.");
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane me-1"></i> Invia Risposta';
        }
    }

    showError(message) {
        const container = document.getElementById('original-post-container');
        container.innerHTML = `
        <div class="text-center p-5 bg-white rounded shadow-sm border" style="border-color: #ff4d4d !important;">
            <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
            <h5 class="text-danger fw-bold">${message}</h5>
        </div>`;
    }

    formatDate(date) {
        const ore = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        const giorno = date.getDate().toString().padStart(2, '0');
        const mese = (date.getMonth() + 1).toString().padStart(2, '0');
        const anno = date.getFullYear();
        return `${giorno}/${mese}/${anno} alle ${ore}:${min}`;
    }
}

new DiscussionController();