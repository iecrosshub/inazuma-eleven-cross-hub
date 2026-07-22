import { AuthManager } from '../Services/auth.js';
import { BoardManager } from '../Services/boardManager.js';
import { showProfileSetupModal } from '../Components/profileModal.js';
import { showProfileEditModal } from '../Components/profileSettings.js';
import { characterRegistry } from '../Core/database.js';

// --- GESTIONE DEI RUOLI ---
const ADMIN_UID = "avNoCAM4I5dyQL6zLY0phnt3fc92"; // Tu (Creatore: onnipotente)
const MODERATOR_UIDS = ["alqyEbbyuxNjej3yTJQDNthmtf32"]; // Il tuo nuovo Admin!

class CommunityController {
    constructor() {
        this.auth = new AuthManager();
        this.board = new BoardManager();
        this.allPosts = [];
        this.currentUser = null;

        this.initElements();
        this.bindEvents();

        this.auth.setAuthStateListener(
            (user) => this.handleAuthState(user),
            (user) => showProfileSetupModal(user, this.auth)
        );
        this.loadPosts();
    }

    initElements() {
        this.btnLogin = document.getElementById('btn-login');
        this.btnLogout = document.getElementById('btn-logout');
        this.userProfile = document.getElementById('user-profile');
        this.displayName = document.getElementById('display-name');

        this.createPostArea = document.getElementById('create-post-area');
        this.loginPromptArea = document.getElementById('login-prompt-area');

        this.btnPublish = document.getElementById('btn-publish');
        this.postText = document.getElementById('post-text');
        this.postCode = document.getElementById('post-code');
        this.postType = document.getElementById('post-type');
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

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.dataset.filter;
                this.renderPosts(filter);
            });
        });

        // Gestione Cambi di Categoria
        this.postContainer.addEventListener('change', async (e) => {
            if (e.target.classList.contains('move-category-select')) {
                const postId = e.target.getAttribute('data-postid');
                const newType = e.target.value;
                const success = await this.board.updatePostCategory(postId, newType);
                if (success) {
                    this.loadPosts(); // Ricarica la bacheca per aggiornare i filtri
                } else {
                    alert("Errore durante lo spostamento di categoria.");
                }
            }
        });

        // Gestione Copia Codice ed Eliminazione
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
                    if (success) {
                        this.loadPosts();
                    } else {
                        alert("Errore: Impossibile eliminare il post. Controlla i permessi.");
                    }
                }
            }
        });
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

            if (profile && this.allPosts.length > 0) {
                await this.syncUserPosts(profile);
            }

        } else {
            this.btnLogin.style.display = 'inline-block';
            this.btnLogout.style.display = 'none';
            if(greetingText) greetingText.textContent = "Accedi per partecipare alla Community";
            this.createPostArea.style.display = 'none';
            this.loginPromptArea.style.display = 'block';
        }

        if(this.allPosts.length > 0) {
            const activeFilter = document.querySelector('.category-btn.active').dataset.filter;
            this.renderPosts(activeFilter);
        }
    }

    async syncUserPosts(profile) {
        let updated = false;

        for (let post of this.allPosts) {
            if (post.authorId === this.currentUser.uid) {
                if (post.authorName !== profile.nickname ||
                    post.authorAvatarId !== profile.selectedAvatarId ||
                    post.authorRole !== profile.role ||
                    post.authorElement !== profile.element ||
                    post.authorRarity !== profile.rarity) {

                    post.authorName = profile.nickname;
                    post.authorAvatarId = profile.selectedAvatarId;
                    post.authorRole = profile.role;
                    post.authorElement = profile.element;
                    post.authorRarity = profile.rarity;

                    await this.board.updatePostAuthorData(post.id, {
                        authorName: profile.nickname || "Utente Anonimo",
                        authorAvatarId: profile.selectedAvatarId || "default",
                        authorRole: profile.role || "FW",
                        authorElement: profile.element || "Fuoco",
                        authorRarity: profile.rarity || "Normal Player"
                    });
                    updated = true;
                }
            }
        }

        // RISOLTO: Ora disegna sempre i post, evitando il caricamento infinito!
        const activeFilter = document.querySelector('.category-btn.active');
        const filterValue = activeFilter ? activeFilter.dataset.filter : 'all';
        this.renderPosts(filterValue);
    }

    async handlePublish() {
        const text = this.postText.value;
        const code = this.postCode.value;
        const type = this.postType.value;

        if (text.length < 5) {
            alert("Il messaggio è troppo corto!");
            return;
        }

        this.btnPublish.disabled = true;
        this.btnPublish.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        const profile = this.auth.getCurrentProfile();
        const success = await this.board.createPost(this.auth.user, type, code, text, profile);

        if (success) {
            if (this.auth.addExp) {
                await this.auth.addExp(15);
            }
            this.postText.value = '';
            this.postCode.value = '';
            this.charCount.textContent = '0';
            await this.loadPosts();
        } else {
            alert("Errore durante la pubblicazione. Riprova più tardi.");
        }

        this.btnPublish.disabled = false;
        this.btnPublish.innerHTML = `<i class="fas fa-paper-plane me-1"></i> Pubblica`;
    }

    async loadPosts() {
        this.postContainer.innerHTML = '<div class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x text-primary"></i></div>';

        localStorage.setItem('last_community_visit', Date.now().toString());

        this.allPosts = await this.board.fetchPosts();

        const profile = this.auth.getCurrentProfile();
        if (this.currentUser && profile) {
            await this.syncUserPosts(profile);
        } else {
            const activeFilter = document.querySelector('.category-btn.active').dataset.filter;
            this.renderPosts(activeFilter);
        }
    }

    formatDate(timestamp) {
        if (!timestamp) return "Poco fa";

        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();

        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const postDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const diffTime = Math.abs(today - postDay);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        if (diffDays === 0) return `Oggi alle ${hours}:${minutes}`;
        if (diffDays === 1) return `Ieri alle ${hours}:${minutes}`;

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year} alle ${hours}:${minutes}`;
    }

    renderPosts(filter = 'all') {
        this.postContainer.innerHTML = '';

        const filteredPosts = this.allPosts.filter(p => filter === 'all' || p.type === filter);

        if (filteredPosts.length === 0) {
            this.postContainer.innerHTML = `<div class="text-center p-4 mt-3" style="color: #0dcaf0; font-weight: bold; font-size: 1.2rem;">Nessun annuncio trovato in questa categoria.</div>`;
            return;
        }

        const elementEngMap = {
            'Fuoco': 'Fire',
            'Vento': 'Wind',
            'Albero': 'Forest',
            'Montagna': 'Mountain',
            'Nulla': 'Void'
        };

        filteredPosts.forEach(post => {

            let tagClass, tagIcon, tagText;
            if (post.type === 'invite') {
                tagClass = 'tag-invite'; tagIcon = 'fa-user-plus'; tagText = 'Codice Invito';
            } else if (post.type === 'club') {
                tagClass = 'tag-club'; tagIcon = 'fa-users'; tagText = 'Reclutamento Club';
            } else if (post.type === 'general') {
                tagClass = 'bg-primary text-white border-0 px-2 py-1 rounded shadow-sm'; tagIcon = 'fa-globe'; tagText = 'Generale';
            } else if (post.type === 'feedback') {
                tagClass = 'bg-danger text-white border-0 px-2 py-1 rounded shadow-sm'; tagIcon = 'fa-lightbulb'; tagText = 'Problemi / Consigli';
            } else {
                tagClass = 'bg-secondary text-white border-0 px-2 py-1 rounded'; tagIcon = 'fa-comment'; tagText = 'Altro';
            }

            const cardClass = 'club-card';
            const codeBoxClass = post.type === 'invite' ? '' : 'club-code';
            const copyBtnClass = post.type === 'invite' ? '' : 'club-btn';

            const safeMessage = post.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            let avatarHtml = `<div class="user-avatar text-center align-content-center" style="width: 55px; height: 55px; border-radius: 8px; font-size: 1.5rem; background-color: #0b1a42; color: #fff; border: 2px solid #ffca28;">${post.authorName.charAt(0).toUpperCase()}</div>`;
            if (post.authorAvatarId && post.authorAvatarId !== 'default') {
                const baseChar = characterRegistry.find(c => c.id === post.authorAvatarId);
                if (baseChar) {
                    let thumbPath = baseChar.thumb;
                    if(!thumbPath.includes('/')) thumbPath = `img/Characters/${thumbPath}`;
                    avatarHtml = `<img src="${thumbPath}" class="post-user-avatar" alt="Avatar" style="width: 55px; height: 55px; border-radius: 8px; border: 2px solid #ffca28; object-fit: cover;">`;
                }
            }

            const elEng = elementEngMap[post.authorElement] || 'Fire';
            const elementIcon = `img/Element/Icon_Element_${elEng}.png`;
            const roleIcon = `img/Position/Icon_Position_${post.authorRole || 'FW'}.png`;

            let bgColor = "#198754";
            let textColor = "#ffffff";
            let extraStyle = "";

            if (post.authorRarity) {
                if (post.authorRarity.includes("Growing")) {
                    bgColor = "#add8e6"; textColor = "#000000";
                } else if (post.authorRarity.includes("Advanced")) {
                    bgColor = "#8a2be2"; textColor = "#ffffff";
                } else if (post.authorRarity.includes("Top")) {
                    bgColor = "#fffacd"; textColor = "#000000";
                } else if (post.authorRarity === "Legendary Player") {
                    bgColor = "#fd7e14"; textColor = "#ffffff";
                } else if (post.authorRarity === "Legendary Player +") {
                    bgColor = "transparent"; textColor = "#ffffff";
                    extraStyle = "background-image: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3); text-shadow: 1px 1px 2px #000; border: 1px solid #fff;";
                }
            }

            const badgesHtml = `
                <div class="d-flex align-items-center mt-1 gap-2 bg-dark rounded px-2 py-1" style="display: inline-flex !important; border: 1px solid #444;">
                    <img src="${roleIcon}" style="width: 20px; height: 20px; object-fit: contain;" title="Ruolo: ${post.authorRole || 'FW'}">
                    <img src="${elementIcon}" style="width: 20px; height: 20px; object-fit: contain;" title="Elemento: ${post.authorElement || 'Fuoco'}">
                </div>
                <span class="badge ms-2" style="background-color: ${bgColor}; color: ${textColor}; font-size: 0.75rem; letter-spacing: 0.5px; border: 1px solid #444; ${extraStyle}">${post.authorRarity || 'Normal Player'}</span>
            `;

            // Logica dei Badges per i Ruoli e Poteri (Creatore/Admin)
            let adminBadgeHtml = '';
            if (post.authorId === ADMIN_UID) {
                adminBadgeHtml = `<span class="badge ms-2" style="background-color: #dc3545; color: white; font-size: 0.75rem; border: 1px solid #ffca28; text-shadow: 1px 1px 2px #000;"><i class="fas fa-crown text-warning"></i> Creatore</span>`;
            } else if (MODERATOR_UIDS.includes(post.authorId)) {
                adminBadgeHtml = `<span class="badge ms-2" style="background-color: #0d6efd; color: white; font-size: 0.75rem; border: 1px solid #fff; text-shadow: 1px 1px 2px #000;"><i class="fas fa-shield-alt text-light"></i> Admin</span>`;
            }

            // GESTIONE DEI PERMESSI DI MODIFICA / ELIMINAZIONE
            let actionToolsHTML = '';
            if (this.currentUser) {
                const isAuthor = this.currentUser.uid === post.authorId;
                const isCreator = this.currentUser.uid === ADMIN_UID;
                const isMod = MODERATOR_UIDS.includes(this.currentUser.uid);

                // Regola: Chi può eliminare?
                let canDelete = false;
                if (isAuthor || isCreator) canDelete = true;
                // Un moderatore può eliminare tutti tranne il Creatore (Tu)
                if (isMod && post.authorId !== ADMIN_UID) canDelete = true;

                // Regola: Chi può spostare di categoria? (L'autore, il Creatore, i Mod)
                let canMove = isAuthor || isCreator || isMod;

                if (canDelete || canMove) {
                    actionToolsHTML = `<div class="d-flex align-items-center gap-2 ms-auto">`;

                    if (canMove) {
                        actionToolsHTML += `
                            <select class="form-select form-select-sm bg-dark text-white border-secondary move-category-select" data-postid="${post.id}" style="width: auto; padding: 0.1rem 1.5rem 0.1rem 0.5rem; font-size: 0.75rem;" title="Sposta Annuncio">
                                <option value="general" ${post.type === 'general' ? 'selected' : ''}>Generale</option>
                                <option value="invite" ${post.type === 'invite' ? 'selected' : ''}>Invito</option>
                                <option value="club" ${post.type === 'club' ? 'selected' : ''}>Club</option>
                                <option value="feedback" ${post.type === 'feedback' ? 'selected' : ''}>Feedback</option>
                            </select>
                        `;
                    }

                    if (canDelete) {
                        actionToolsHTML += `
                            <button class="btn btn-sm btn-outline-danger delete-btn" data-postid="${post.id}" title="Elimina annuncio" style="border: none; padding: 2px 6px;">
                                <i class="fas fa-trash"></i>
                            </button>
                        `;
                    }

                    actionToolsHTML += `</div>`;
                }
            }

            let codeBoxHtml = '';
            if (post.code && post.code.length > 0) {
                codeBoxHtml = `
                <div class="post-code-box ${codeBoxClass} shadow-sm">
                    ${post.code}
                    <button class="copy-btn ${copyBtnClass}" data-code="${post.code}" title="Copia Codice"><i class="far fa-copy"></i></button>
                </div>`;
            }

            const html = `
            <div class="post-card ${cardClass}">
                <div class="post-header d-flex justify-content-between align-items-start">
                    <div class="user-info d-flex align-items-center">
                        <div class="me-3">${avatarHtml}</div>
                        <div>
                            <strong style="color: #0b1a42; font-size: 1.2rem;">${post.authorName}</strong> ${adminBadgeHtml}<br>
                            ${badgesHtml}
                            <small class="d-block text-muted mt-2" style="font-size: 0.8rem;"><i class="far fa-clock"></i> ${this.formatDate(post.createdAt)}</small>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-end">
                        ${actionToolsHTML}
                        <span class="post-tag ${tagClass} mt-2"><i class="fas ${tagIcon}"></i> ${tagText}</span>
                    </div>
                </div>
                <div class="post-content mt-3 pt-2" style="border-top: 1px solid #eee;">
                    ${safeMessage}
                    <br>
                    ${codeBoxHtml}
                </div>
            </div>`;

            this.postContainer.insertAdjacentHTML('beforeend', html);
        });
    }
}

new CommunityController();