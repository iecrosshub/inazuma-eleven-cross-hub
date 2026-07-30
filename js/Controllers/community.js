import { AuthManager } from '../Services/auth.js';
import { BoardManager } from '../Services/boardManager.js';
import { showProfileSetupModal } from '../Components/profileModal.js';
import { showProfileEditModal } from '../Components/profileSettings.js';
import { characterRegistry } from '../Core/database.js';
import { coachRegistry } from '../Coaches/registry.js';
import { collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const ADMIN_UID = "avNoCAM4I5dyQL6zLY0phnt3fc92";
const MODERATOR_UIDS = ["alqyEbbyuxNjej3yTJQDNthmtf32"];

class CommunityController {
    constructor() {
        this.auth = new AuthManager();
        this.board = new BoardManager();
        this.allPosts = [];
        this.teamPosts = []; // Nuova lista per le formazioni
        this.currentUser = null;

        // Legge la "stanza" dall'URL se vieni dal Team Builder (es. community.html?tab=teams)
        const urlParams = new URLSearchParams(window.location.search);
        this.activeTab = urlParams.get('tab') || 'general';

        this.initElements();
        this.bindEvents();

        this.auth.setAuthStateListener(
            (user) => this.handleAuthState(user),
            (user) => showProfileSetupModal(user, this.auth)
        );

        this.switchRoom(this.activeTab); // Avvia la stanza iniziale
    }

    initElements() {
        this.btnLogin = document.getElementById('btn-login');
        this.btnLogout = document.getElementById('btn-logout');

        this.createPostArea = document.getElementById('create-post-area');
        this.loginPromptArea = document.getElementById('login-prompt-area');

        this.uiStandardPost = document.getElementById('standard-post-ui');
        this.uiTeamPost = document.getElementById('team-post-ui');
        this.createPostTitle = document.getElementById('create-post-title');

        this.btnPublish = document.getElementById('btn-publish');
        this.postText = document.getElementById('post-text');
        this.postCode = document.getElementById('post-code');
        this.charCount = document.getElementById('char-count');

        this.postContainer = document.getElementById('post-container');
        this.filterButtons = document.querySelectorAll('.category-btn');
    }

    bindEvents() {
        this.btnLogin.addEventListener('click', () => this.auth.loginWithGoogle());
        this.btnLogout.addEventListener('click', () => this.auth.logout());

        window.addEventListener('open-profile-settings', () => {
            if (this.auth && this.auth.user) {
                showProfileEditModal(this.auth.user, this.auth);
            }
        });

        this.postText.addEventListener('input', () => {
            this.charCount.textContent = this.postText.value.length;
        });

        this.btnPublish.addEventListener('click', () => this.handlePublish());

        // Gestione Click sulle Stanze
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.filter;
                this.switchRoom(targetTab);

                // Pulisce l'URL in alto senza ricaricare la pagina
                window.history.replaceState({}, '', 'community.html');
            });
        });

        // Copia Codice / Elimina / Sposta
        this.postContainer.addEventListener('click', async (e) => {
            const copyBtn = e.target.closest('.copy-btn');
            if (copyBtn) {
                const code = copyBtn.dataset.code;
                navigator.clipboard.writeText(code).then(() => {
                    const icon = copyBtn.querySelector('i');
                    icon.classList.replace('fa-copy', 'fa-check');
                    copyBtn.classList.add('text-success');
                    setTimeout(() => {
                        icon.classList.replace('fa-check', 'fa-copy');
                        copyBtn.classList.remove('text-success');
                    }, 2000);
                });
            }

            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                const postId = deleteBtn.getAttribute('data-postid');
                if(confirm("Sei sicuro di voler eliminare questo annuncio?")) {
                    const success = await this.board.deletePost(postId);
                    if (success) this.loadRoomData();
                    else alert("Errore: Impossibile eliminare il post.");
                }
            }
        });

        this.postContainer.addEventListener('change', async (e) => {
            if (e.target.classList.contains('move-category-select')) {
                const postId = e.target.getAttribute('data-postid');
                const newType = e.target.value;
                const success = await this.board.updatePostCategory(postId, newType);
                if (success) this.loadRoomData();
                else alert("Errore durante lo spostamento.");
            }
        });
    }

    // NUOVO: LOGICA CAMBIO STANZA
    switchRoom(tabName) {
        this.activeTab = tabName;

        // Aggiorna grafica bottoni
        this.filterButtons.forEach(b => {
            b.classList.remove('active');
            if (b.dataset.filter === tabName) b.classList.add('active');
        });

        // Aggiorna l'area di pubblicazione in base alla stanza
        const roomNames = {
            'general': 'Discussione Generale',
            'invite': 'Codici Invito',
            'club': 'Reclutamento Club',
            'feedback': 'Problemi / Consigli',
            'teams': 'Formazioni'
        };

        this.createPostTitle.innerHTML = `<i class="fas fa-edit me-2"></i> Pubblica in: <span class="text-primary">${roomNames[tabName]}</span>`;

        if (tabName === 'teams') {
            this.uiStandardPost.style.display = 'none';
            this.uiTeamPost.style.display = 'block';
        } else {
            this.uiStandardPost.style.display = 'block';
            this.uiTeamPost.style.display = 'none';
        }

        // Resetta i campi di testo pulendoli
        this.postText.value = '';
        this.postCode.value = '';
        this.charCount.textContent = '0';

        // Carica i dati dal database specifici per la stanza
        this.loadRoomData();
    }

    async handleAuthState(user) {
        const greetingText = document.getElementById('user-greeting');
        this.currentUser = user;

        if (user) {
            this.btnLogin.style.display = 'none';
            this.btnLogout.style.display = 'inline-block';

            const profile = this.auth.getCurrentProfile();
            const displayNickname = profile && profile.nickname ? profile.nickname : user.displayName;
            if(greetingText) greetingText.textContent = `Bacheca di ${displayNickname}`;

            this.createPostArea.style.display = 'block';
            this.loginPromptArea.style.display = 'none';
        } else {
            this.btnLogin.style.display = 'inline-block';
            this.btnLogout.style.display = 'none';
            if(greetingText) greetingText.textContent = "Accedi per partecipare alla Community";

            this.createPostArea.style.display = 'none';
            this.loginPromptArea.style.display = 'block';
        }
    }

    async handlePublish() {
        const text = this.postText.value;
        const code = this.postCode.value;
        // Prende il tipo DIRETTAMENTE dalla stanza in cui ci troviamo!
        const type = this.activeTab;

        if (text.length < 5) {
            alert("Il messaggio è troppo corto! Scrivi almeno 5 caratteri.");
            return;
        }

        this.btnPublish.disabled = true;
        this.btnPublish.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        const profile = this.auth.getCurrentProfile();
        const success = await this.board.createPost(this.auth.user, type, code, text, profile);

        if (success) {
            if (this.auth.addExp) await this.auth.addExp(15);
            this.postText.value = '';
            this.postCode.value = '';
            this.charCount.textContent = '0';
            await this.loadRoomData();
        } else {
            alert("Errore durante la pubblicazione. Riprova più tardi.");
        }

        this.btnPublish.disabled = false;
        this.btnPublish.innerHTML = `<i class="fas fa-paper-plane me-1"></i> Pubblica nella Stanza`;
    }

    async loadRoomData() {
        this.postContainer.innerHTML = '<div class="text-center p-5"><i class="fas fa-spinner fa-spin fa-2x text-primary"></i><br>Caricamento Stanza...</div>';

        if (this.activeTab === 'teams') {
            // Seleziona la collezione esterna delle Formazioni
            await this.fetchAndRenderTeamDiscussions();
        } else {
            // Usa la Board standard filtrando per la stanza attuale
            this.allPosts = await this.board.fetchPosts();

            const profile = this.auth.getCurrentProfile();
            if (this.currentUser && profile) await this.syncUserPosts(profile); // Sincronizza avatar prima di renderizzare

            this.renderStandardPosts();
        }
    }

    async fetchAndRenderTeamDiscussions() {
        try {
            const db = window.firebaseDb;
            const q = query(collection(db, "team_discussions"), orderBy("createdAt", "desc"), limit(20));
            const snapshot = await getDocs(q);

            this.teamPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.renderTeamPosts();
        } catch (error) {
            console.error("Errore fetch formazioni:", error);
            this.postContainer.innerHTML = '<div class="text-center p-4 text-danger fw-bold">Impossibile caricare le Formazioni.</div>';
        }
    }

    async syncUserPosts(profile) {
        for (let post of this.allPosts) {
            if (post.authorId === this.currentUser.uid) {
                if (post.authorName !== profile.nickname || post.authorAvatarId !== profile.selectedAvatarId || post.authorRole !== profile.role) {
                    post.authorName = profile.nickname;
                    post.authorAvatarId = profile.selectedAvatarId;
                    post.authorRole = profile.role;
                    post.authorElement = profile.element;
                    post.authorRarity = profile.rarity;
                    await this.board.updatePostAuthorData(post.id, {
                        authorName: profile.nickname || "Utente",
                        authorAvatarId: profile.selectedAvatarId || "default",
                        authorRole: profile.role || "FW",
                        authorElement: profile.element || "Fuoco",
                        authorRarity: profile.rarity || "Normal Player"
                    });
                }
            }
        }
    }

    formatDate(timestamp) {
        if (!timestamp) return "Poco fa";
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const diffDays = Math.floor(Math.abs(new Date().setHours(0,0,0,0) - new Date(date).setHours(0,0,0,0)) / 86400000);
        const ore = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');

        if (diffDays === 0) return `Oggi alle ${ore}:${min}`;
        if (diffDays === 1) return `Ieri alle ${ore}:${min}`;
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} alle ${ore}:${min}`;
    }

    // RENDER: Stanze Normali (Generale, Club, ecc)
    renderStandardPosts() {
        this.postContainer.innerHTML = '';
        const filteredPosts = this.allPosts.filter(p => p.type === this.activeTab);

        if (filteredPosts.length === 0) {
            this.postContainer.innerHTML = `<div class="empty-message">Nessun annuncio presente in questa stanza.<br>Sii il primo a rompere il ghiaccio!</div>`;
            return;
        }

        const elementEngMap = { 'Fuoco': 'Fire', 'Vento': 'Wind', 'Albero': 'Forest', 'Montagna': 'Mountain', 'Nulla': 'Void' };

        filteredPosts.forEach(post => {
            const safeMessage = post.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            // Avatar
            let avatarHtml = `<div class="user-avatar text-center align-content-center post-user-avatar">${post.authorName.charAt(0).toUpperCase()}</div>`;
            if (post.authorAvatarId && post.authorAvatarId !== 'default') {
                const baseChar = characterRegistry.find(c => c.id === post.authorAvatarId);
                if (baseChar) avatarHtml = `<img src="${baseChar.thumb.includes('/') ? baseChar.thumb : 'img/Characters/'+baseChar.thumb}" class="post-user-avatar">`;
            }

            const elementIcon = `img/Element/Icon_Element_${elementEngMap[post.authorElement] || 'Fire'}.png`;
            const roleIcon = `img/Position/Icon_Position_${post.authorRole || 'FW'}.png`;

            // Badges Grafici
            let bgColor = "#198754", textColor = "#ffffff", extraStyle = "";
            if (post.authorRarity) {
                if (post.authorRarity.includes("Growing")) { bgColor = "#add8e6"; textColor = "#000000"; }
                else if (post.authorRarity.includes("Advanced")) { bgColor = "#8a2be2"; textColor = "#ffffff"; }
                else if (post.authorRarity.includes("Top")) { bgColor = "#fffacd"; textColor = "#000000"; }
                else if (post.authorRarity === "Legendary Player") { bgColor = "#fd7e14"; textColor = "#ffffff"; }
                else if (post.authorRarity === "Legendary Player +") { bgColor = "transparent"; textColor = "#ffffff"; extraStyle = "background-image: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3); border: 1px solid #fff;"; }
            }

            let adminBadgeHtml = '';
            if (post.authorId === ADMIN_UID) adminBadgeHtml = `<span class="badge ms-2 bg-danger border border-warning shadow-sm"><i class="fas fa-crown text-warning"></i> Creatore</span>`;
            else if (MODERATOR_UIDS.includes(post.authorId)) adminBadgeHtml = `<span class="badge ms-2 bg-primary border border-light shadow-sm"><i class="fas fa-shield-alt text-light"></i> Admin</span>`;

            // Strumenti Admin/Autore
            let actionToolsHTML = '';
            if (this.currentUser && (this.currentUser.uid === post.authorId || this.currentUser.uid === ADMIN_UID || (MODERATOR_UIDS.includes(this.currentUser.uid) && post.authorId !== ADMIN_UID))) {
                actionToolsHTML = `<div class="d-flex align-items-center gap-2 ms-auto">
                    <select class="form-select form-select-sm border-secondary move-category-select" data-postid="${post.id}" style="width: auto; padding: 0.1rem 1.5rem 0.1rem 0.5rem; font-size: 0.75rem;">
                        <option value="general" ${post.type === 'general' ? 'selected' : ''}>Generale</option>
                        <option value="invite" ${post.type === 'invite' ? 'selected' : ''}>Invito</option>
                        <option value="club" ${post.type === 'club' ? 'selected' : ''}>Club</option>
                        <option value="feedback" ${post.type === 'feedback' ? 'selected' : ''}>Feedback</option>
                    </select>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-postid="${post.id}" style="padding: 2px 6px;"><i class="fas fa-trash"></i></button>
                </div>`;
            }

            let codeBoxHtml = post.code ? `
                <div class="post-code-box ${post.type === 'invite' ? '' : 'club-code'} shadow-sm mt-3 border">
                    ${post.code}
                    <button class="copy-btn ${post.type === 'invite' ? '' : 'club-btn'}" data-code="${post.code}"><i class="far fa-copy"></i></button>
                </div>` : '';

            this.postContainer.insertAdjacentHTML('beforeend', `
            <div class="post-card">
                <div class="post-header d-flex justify-content-between align-items-start">
                    <div class="user-info d-flex align-items-center">
                        <div class="me-3">${avatarHtml}</div>
                        <div>
                            <strong>${post.authorName}</strong> ${adminBadgeHtml}<br>
                            <div class="d-flex align-items-center mt-1 gap-2 border rounded px-2 py-1 bg-light" style="display: inline-flex !important;">
                                <img src="${roleIcon}" style="width: 18px; height: 18px;">
                                <img src="${elementIcon}" style="width: 18px; height: 18px;">
                            </div>
                            <span class="badge ms-2 border text-shadow-sm" style="background-color: ${bgColor}; color: ${textColor}; ${extraStyle}">${post.authorRarity || 'Normal Player'}</span>
                            <small class="d-block mt-2"><i class="far fa-clock"></i> ${this.formatDate(post.createdAt)}</small>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-end">
                        ${actionToolsHTML}
                    </div>
                </div>
                <div class="post-body pt-3 mt-3 border-top">
                    ${safeMessage}
                    ${codeBoxHtml}
                </div>
            </div>`);
        });
    }

    // RENDER: Formazioni (La nuova Stanza Speciale)
    renderTeamPosts() {
        this.postContainer.innerHTML = '';
        if (this.teamPosts.length === 0) {
            this.postContainer.innerHTML = `<div class="empty-message">Nessuna formazione pubblicata finora.<br>Vai nel Team Builder e apri le danze!</div>`;
            return;
        }

        this.teamPosts.forEach(data => {
            const dateStr = data.createdAt ? this.formatDate(data.createdAt.toDate()) : 'Poco fa';
            let teamData = { playerCount: 0 };
            try { teamData = JSON.parse(data.teamSnapshot); } catch(e){}

            let coachThumb = "https://placehold.co/60";
            if(teamData.coachId) {
                const c = coachRegistry.find(x => x.id === teamData.coachId);
                if(c) coachThumb = c.thumb;
            }

            // Stile Bianco/Blu ereditato dal CSS Community
            this.postContainer.insertAdjacentHTML('beforeend', `
            <div class="post-card d-flex align-items-center gap-3 p-3 mb-3 cursor-pointer" onclick="sessionStorage.setItem('discType', 'team'); sessionStorage.setItem('discId', '${data.id}'); window.location.href='discussion.html'">
                <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1" style="color: #0b1a42;">${data.title}</h5>
                    <div class="small mb-2" style="font-size: 0.85rem; color: #5c728e;">
                        <strong style="color: #0b1a42;">${data.authorName}</strong> <span class="badge bg-secondary ms-1">${data.authorRarity}</span>
                        <span class="ms-2 me-2">•</span> 
                        <span style="color: #0b1a42;">${data.description.substring(0, 100)}${data.description.length > 100 ? '...' : ''}</span>
                    </div>
                    <div class="d-flex align-items-center fw-bold" style="font-size: 0.85rem; color: #1a73e8;">
                        <i class="fas fa-comment me-1"></i> ${data.commentCount || 0} Risposte
                        <span class="ms-3" style="color: #5c728e;"><i class="far fa-clock me-1"></i> ${dateStr}</span>
                    </div>
                </div>
                
                <div class="rounded overflow-hidden position-relative shadow" style="width: 80px; height: 60px; border: 2px solid #ffca28; background: #0b1a42; flex-shrink: 0;">
                    <img src="${coachThumb}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
                    <div class="position-absolute top-50 start-50 translate-middle w-100 text-center fw-bold" style="font-size: 0.75rem; text-shadow: 1px 1px 3px #000; color: #fff;">
                        ${teamData.playerCount}/11
                    </div>
                </div>
            </div>
            `);
        });
    }
}

new CommunityController();