import { AuthManager } from '../Services/auth.js';
import { characterRegistry } from '../Core/database.js';

const ADMIN_UID = "avNoCAM4I5dyQL6zLY0phnt3fc92";
// Aggiunto il nuovo UID qui per dargli accesso al Pannello Admin delle Torri
const MODERATOR_UIDS = [
    "alqyEbbyuxNjej3yTJQDNthmtf32",
    "Cu2zjcxpxIh2lddFrlDIc6YePgu1",
    "EjTkeNHHKBdnvCToNtmHmKhXjko2"
];

class TowersController {
    constructor() {
        this.auth = new AuthManager();
        this.isAdmin = false;
        this.allStages = [];
        this.currentViewedId = null;
        this.editingUid = null;

        // Memoria per il Drag & Drop Admin
        this.adminPlayers = [
            { id: 1, charId: '', role: 'FW', top: 15, left: 50 },
            { id: 2, charId: '', role: 'MF', top: 40, left: 25 },
            { id: 3, charId: '', role: 'MF', top: 40, left: 75 },
            { id: 4, charId: '', role: 'DF', top: 70, left: 50 },
            { id: 5, charId: '', role: 'GK', top: 90, left: 50 }
        ];

        this.init();
    }

    async init() {
        this.generateAdminPlayerSelects();

        this.auth.setAuthStateListener(async (user) => {
            this.isAdmin = user && (user.uid === ADMIN_UID || MODERATOR_UIDS.includes(user.uid));

            if (this.isAdmin) {
                document.getElementById('btn-add-new-stage').style.display = 'inline-block';
            } else {
                document.getElementById('btn-add-new-stage').style.display = 'none';
                document.getElementById('admin-stage-actions').style.display = 'none';
            }

            await this.loadStages();
        });

        this.bindEvents();
    }

    /* ========================================================
       SISTEMA DRAG & DROP E SELECT IMMAGINI (PANNELLO ADMIN)
       ======================================================== */
    generateAdminPlayerSelects() {
        const container = document.getElementById('admin-players-container');
        let html = '';

        // Genera la lista visiva di tutti i personaggi (Aggiunta classe 'char-opt' per la ricerca)
        let charListHtml = `<div data-value="" class="char-opt">-- Rimuovi Personaggio --</div>`;
        characterRegistry.forEach(c => {
            charListHtml += `<div data-value="${c.id}" class="char-opt"><img src="${c.thumb}" style="width:24px; height:24px; border-radius:50%; margin-right:10px; object-fit:cover;"> ${c.name}</div>`;
        });

        for(let i=1; i<=5; i++) {
            html += `
            <div class="mb-3 d-flex gap-2">
                <div class="char-custom-select flex-grow-1" id="admin-char-sel-${i}" data-slot="${i}">
                    <div class="char-select-selected"><span>-- Seleziona Personaggio ${i} --</span> <i class="fas fa-chevron-down"></i></div>
                    <div class="char-select-items char-select-hide">${charListHtml}</div>
                </div>
                <select class="form-select w-auto admin-role-select" data-slot="${i}">
                    <option value="FW">FW</option>
                    <option value="MF">MF</option>
                    <option value="DF">DF</option>
                    <option value="GK">GK</option>
                </select>
            </div>`;
        }
        container.innerHTML = html;

        // Inizializza i custom select, la barra di ricerca e i loro eventi
        for(let i=1; i<=5; i++) {
            const wrapper = document.getElementById(`admin-char-sel-${i}`);
            const selected = wrapper.querySelector('.char-select-selected');
            const items = wrapper.querySelector('.char-select-items');
            const roleSelect = document.querySelector(`.admin-role-select[data-slot="${i}"]`);

            // --- INIEZIONE BARRA DI RICERCA ---
            const searchContainer = document.createElement('div');
            searchContainer.className = "p-2 sticky-top bg-white border-bottom";
            searchContainer.style.zIndex = "10";
            searchContainer.innerHTML = `<input type="text" class="form-control form-control-sm shadow-none border-primary" placeholder="🔍 Cerca personaggio..." autocomplete="off">`;

            // Impedisce che cliccando sulla barra di ricerca il menu si chiuda
            searchContainer.addEventListener('click', (e) => e.stopPropagation());

            // Logica di filtraggio
            const searchInput = searchContainer.querySelector('input');
            searchInput.addEventListener('input', function(e) {
                const term = e.target.value.toLowerCase();
                const options = items.querySelectorAll('.char-opt');
                options.forEach(opt => {
                    const text = opt.textContent || opt.innerText;
                    opt.style.display = text.toLowerCase().includes(term) ? "" : "none";
                });
            });

            items.prepend(searchContainer);
            // --- FINE INIEZIONE BARRA ---

            selected.addEventListener('click', (e) => {
                e.stopPropagation();

                // Chiude gli altri menu aperti
                document.querySelectorAll('.char-select-items').forEach(el => {
                    if (el !== items) el.classList.add('char-select-hide');
                });

                const isHidden = items.classList.contains('char-select-hide');
                if (isHidden) {
                    items.classList.remove('char-select-hide');
                    // Reset della ricerca ogni volta che si apre
                    searchInput.value = '';
                    items.querySelectorAll('.char-opt').forEach(opt => opt.style.display = "");
                    searchInput.focus(); // Mette subito il cursore nella barra
                } else {
                    items.classList.add('char-select-hide');
                }
            });

            // Selezione personaggio
            items.querySelectorAll('.char-opt').forEach(opt => {
                opt.addEventListener('click', (e) => {
                    const val = opt.getAttribute('data-value');
                    selected.querySelector('span').innerHTML = opt.innerHTML;
                    wrapper.dataset.value = val;
                    items.classList.add('char-select-hide');

                    // Aggiorna array in memoria e ricarica campetto admin
                    this.adminPlayers[i-1].charId = val;
                    this.renderAdminPitch();
                });
            });

            // Aggiorna ruolo
            roleSelect.addEventListener('change', (e) => {
                this.adminPlayers[i-1].role = e.target.value;
                this.renderAdminPitch();
            });
        }

        // Chiudi select cliccando fuori in qualsiasi punto della pagina
        document.addEventListener('click', () => {
            document.querySelectorAll('.char-select-items').forEach(el => el.classList.add('char-select-hide'));
        });

        this.renderAdminPitch();
    }

    renderAdminPitch() {
        const pitch = document.getElementById('admin-interactive-pitch');
        // Rimuove i vecchi giocatori dal campo admin
        pitch.querySelectorAll('.draggable-player').forEach(el => el.remove());

        this.adminPlayers.forEach(p => {
            if (!p.charId) return;
            const char = characterRegistry.find(c => c.id === p.charId);
            const thumb = char ? char.thumb : 'https://placehold.co/50x50';
            const roleClass = `role-${p.role.toLowerCase()}`;

            const node = document.createElement('div');
            node.className = 'draggable-player';
            node.style.top = `${p.top}%`;
            node.style.left = `${p.left}%`;
            node.dataset.slot = p.id;

            node.innerHTML = `
                <img src="${thumb}">
                <div class="badge-role ${roleClass}">${p.role}</div>
            `;

            this.makeDraggable(node, pitch);
            pitch.appendChild(node);
        });
    }

    makeDraggable(element, container) {
        let isDragging = false;

        const move = (clientX, clientY) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            let x = clientX - rect.left;
            let y = clientY - rect.top;

            let topPerc = (y / rect.height) * 100;
            let leftPerc = (x / rect.width) * 100;

            // Blocca dentro i bordi
            topPerc = Math.max(0, Math.min(100, topPerc));
            leftPerc = Math.max(0, Math.min(100, leftPerc));

            element.style.top = `${topPerc}%`;
            element.style.left = `${leftPerc}%`;

            // Aggiorna l'array in memoria in tempo reale
            const slotIdx = parseInt(element.dataset.slot) - 1;
            this.adminPlayers[slotIdx].top = topPerc;
            this.adminPlayers[slotIdx].left = leftPerc;
        };

        // Mouse Events
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', (e) => {
            if(isDragging) move(e.clientX, e.clientY);
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });

        // Touch Events (Mobile)
        element.addEventListener('touchstart', (e) => {
            isDragging = true;
            document.body.style.userSelect = 'none';
        }, {passive: false});
        document.addEventListener('touchmove', (e) => {
            if(isDragging) {
                e.preventDefault();
                move(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, {passive: false});
        document.addEventListener('touchend', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });
    }

    /* ========================================================
       SISTEMA PIANI DIFFICILI E SALVATAGGIO
       ======================================================== */
    addDifficultStageBox(title = '', desc = '') {
        const container = document.getElementById('admin-difficult-stages-container');
        const box = document.createElement('div');
        box.className = 'col-md-6 diff-stage-box';
        box.innerHTML = `
            <div class="p-3 border rounded bg-white shadow-sm position-relative">
                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 remove-diff-btn"><i class="fas fa-times"></i></button>
                <input type="text" class="form-control mb-2 admin-diff-title" placeholder="Titolo (Es. Piani 51-53)" value="${title}">
                <textarea class="form-control admin-diff-desc" rows="3" placeholder="Strategia...">${desc}</textarea>
            </div>
        `;
        box.querySelector('.remove-diff-btn').addEventListener('click', () => box.remove());
        container.appendChild(box);
    }

    bindEvents() {
        document.getElementById('btn-add-new-stage').addEventListener('click', () => {
            this.editingUid = null;
            document.getElementById('admin-panel-container').style.display = 'block';

            // Reset Campi
            document.getElementById('form-tower-name').value = '';
            document.getElementById('form-user-formation').value = '';
            document.getElementById('form-intro-desc').value = '';
            document.getElementById('form-strategy').value = '';
            document.getElementById('form-manuals').value = '';
            document.getElementById('form-subs-desc').value = '';

            document.getElementById('admin-difficult-stages-container').innerHTML = '';
            this.addDifficultStageBox(); // Inizia con 1

            // Reset Giocatori in memoria
            this.adminPlayers = [
                { id: 1, charId: '', role: 'FW', top: 15, left: 50 },
                { id: 2, charId: '', role: 'MF', top: 40, left: 25 },
                { id: 3, charId: '', role: 'MF', top: 40, left: 75 },
                { id: 4, charId: '', role: 'DF', top: 70, left: 50 },
                { id: 5, charId: '', role: 'GK', top: 90, left: 50 }
            ];

            // Reset grafici dei dropdown
            for(let i=1; i<=5; i++) {
                const wrapper = document.getElementById(`admin-char-sel-${i}`);
                wrapper.dataset.value = '';
                wrapper.querySelector('.char-select-selected span').innerHTML = '-- Seleziona Personaggio --';
                document.querySelector(`.admin-role-select[data-slot="${i}"]`).value = this.adminPlayers[i-1].role;
            }
            this.renderAdminPitch();
        });

        document.getElementById('btn-add-diff-stage').addEventListener('click', () => this.addDifficultStageBox());

        document.getElementById('btn-cancel-draft').addEventListener('click', () => {
            document.getElementById('admin-panel-container').style.display = 'none';
        });

        document.getElementById('btn-save-stage').addEventListener('click', async (e) => {
            const btn = e.target;
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Salvataggio...`;

            try {
                const diffStages = [];
                document.querySelectorAll('.diff-stage-box').forEach(box => {
                    const t = box.querySelector('.admin-diff-title').value.trim();
                    const d = box.querySelector('.admin-diff-desc').value.trim();
                    if(t || d) diffStages.push({ title: t, desc: d });
                });

                const stageData = {
                    towerName: document.getElementById('form-tower-name').value.trim(),
                    formation: document.getElementById('form-user-formation').value.trim(),
                    introDesc: document.getElementById('form-intro-desc').value.trim(),
                    strategy: document.getElementById('form-strategy').value.trim(),
                    manuals: document.getElementById('form-manuals').value.trim(),
                    subsDesc: document.getElementById('form-subs-desc').value.trim(),
                    players: this.adminPlayers,
                    difficultStages: diffStages,
                    updatedAt: new Date().toISOString()
                };

                if (!stageData.towerName) {
                    alert("Compila il Nome Torre!");
                    btn.disabled = false;
                    btn.innerHTML = `<i class="fas fa-save me-2"></i> Salva Stage`;
                    return;
                }

                if (this.editingUid) {
                    await window.dbSet(window.dbDoc(window.firebaseDb, "towers_5v5", this.editingUid), stageData, { merge: true });
                } else {
                    stageData.createdAt = new Date().toISOString();
                    const newId = `towerStage_${Date.now()}`;
                    await window.dbSet(window.dbDoc(window.firebaseDb, "towers_5v5", newId), stageData);
                }

                document.getElementById('admin-panel-container').style.display = 'none';
                alert("Stage Salvato Correttamente!");
                await this.loadStages();

            } catch(err) {
                console.error(err);
                alert("Errore durante il salvataggio.");
            }

            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-save me-2"></i> Salva Stage`;
        });

        document.getElementById('btn-edit-current').addEventListener('click', () => {
            if (!this.currentViewedId) return;
            const stage = this.allStages.find(s => s.uid === this.currentViewedId);
            if(!stage) return;

            this.editingUid = stage.uid;
            document.getElementById('admin-panel-container').style.display = 'block';

            document.getElementById('form-tower-name').value = stage.towerName || '';
            document.getElementById('form-user-formation').value = stage.formation || '';
            document.getElementById('form-intro-desc').value = stage.introDesc || '';
            document.getElementById('form-strategy').value = stage.strategy || '';
            document.getElementById('form-manuals').value = stage.manuals || '';
            document.getElementById('form-subs-desc').value = stage.subsDesc || '';

            // Ripristina giocatori in memoria
            this.adminPlayers = JSON.parse(JSON.stringify(stage.players));

            // Ripristina dropdown
            for(let i=1; i<=5; i++) {
                const p = this.adminPlayers[i-1];
                const wrapper = document.getElementById(`admin-char-sel-${i}`);
                wrapper.dataset.value = p.charId;

                const char = characterRegistry.find(c => c.id === p.charId);
                if(char) {
                    wrapper.querySelector('.char-select-selected span').innerHTML = `<img src="${char.thumb}" style="width:24px; height:24px; border-radius:50%; margin-right:10px; object-fit:cover;"> ${char.name}`;
                } else {
                    wrapper.querySelector('.char-select-selected span').innerHTML = '-- Seleziona Personaggio --';
                }
                document.querySelector(`.admin-role-select[data-slot="${i}"]`).value = p.role;
            }
            this.renderAdminPitch();

            // Ripristina piani difficili
            document.getElementById('admin-difficult-stages-container').innerHTML = '';
            if (stage.difficultStages && stage.difficultStages.length > 0) {
                stage.difficultStages.forEach(ds => this.addDifficultStageBox(ds.title, ds.desc));
            } else {
                this.addDifficultStageBox();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('btn-delete-current').addEventListener('click', async () => {
            if(confirm("Sei sicuro di voler eliminare DEFINITIVAMENTE questa guida?")) {
                try {
                    await window.dbDelete(window.dbDoc(window.firebaseDb, "towers_5v5", this.currentViewedId));
                    this.currentViewedId = null;
                    alert("Guida eliminata.");
                    await this.loadStages();
                } catch(e) {
                    alert("Errore durante l'eliminazione.");
                }
            }
        });
    }

    /* ========================================================
       CARICAMENTO E RENDERING LATO UTENTE
       ======================================================== */
    async loadStages() {
        document.getElementById('sidebar-loading').style.display = 'block';
        document.getElementById('tower-navigation').innerHTML = '';

        try {
            const snap = await window.dbGetDocs(window.dbCollection(window.firebaseDb, "towers_5v5"));
            this.allStages = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
            this.allStages.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

            this.renderSidebar();

            if (this.allStages.length > 0) {
                this.renderStageView(this.allStages[0].uid);
            } else {
                document.getElementById('stage-display-container').style.display = 'none';
                document.getElementById('empty-state').style.display = 'block';
            }

        } catch (e) {
            console.error("Errore fetch torri:", e);
        }

        document.getElementById('sidebar-loading').style.display = 'none';
    }

    renderSidebar() {
        const nav = document.getElementById('tower-navigation');
        nav.innerHTML = '';

        this.allStages.forEach((stage, index) => {
            const icon = stage.towerName.toLowerCase().includes('aliena') ? 'fa-meteor'
                : stage.towerName.toLowerCase().includes('foresta') ? 'fa-leaf'
                    : stage.towerName.toLowerCase().includes('fuoco') ? 'fa-fire' : 'fa-chess-rook';

            const color = stage.towerName.toLowerCase().includes('aliena') ? '#1a73e8'
                : stage.towerName.toLowerCase().includes('foresta') ? '#198754'
                    : stage.towerName.toLowerCase().includes('fuoco') ? '#dc3545' : '#6c757d';

            const isActive = this.currentViewedId === stage.uid || (index === 0 && !this.currentViewedId) ? 'active' : '';

            const btnHtml = `
                <div class="tower-btn ${isActive}" data-uid="${stage.uid}">
                    <div class="tower-btn-icon" style="background: ${color}; border-color: ${color};"><i class="fas ${icon}"></i></div>
                    <div>
                        <strong class="d-block text-dark" style="font-size: 1.1rem;">${stage.towerName}</strong>
                    </div>
                </div>
            `;
            nav.insertAdjacentHTML('beforeend', btnHtml);
        });

        document.querySelectorAll('.tower-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tower-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderStageView(btn.dataset.uid);
            });
        });
    }

    renderStageView(uid) {
        this.currentViewedId = uid;
        const stage = this.allStages.find(s => s.uid === uid);
        if (!stage) return;

        document.getElementById('empty-state').style.display = 'none';
        document.getElementById('stage-display-container').style.display = 'block';

        if (this.isAdmin) document.getElementById('admin-stage-actions').style.display = 'block';

        const indexNum = (this.allStages.indexOf(stage) + 1).toString().padStart(2, '0');
        document.getElementById('display-number').textContent = indexNum;
        document.getElementById('display-tower-name').textContent = stage.towerName;
        document.getElementById('display-formation').textContent = stage.formation || "N/D";
        document.getElementById('display-intro').textContent = stage.introDesc;

        // Disegna Campo
        const pitch = document.getElementById('display-pitch');
        pitch.innerHTML = '<div class="penalty-area-top"></div><div class="penalty-area-bottom"></div>';

        if (stage.players) {
            stage.players.forEach(p => {
                if(!p.charId) return;
                const char = characterRegistry.find(c => c.id === p.charId);
                const thumb = char ? char.thumb : 'https://placehold.co/55x55';
                const roleClass = `role-${p.role.toLowerCase()}`;

                const node = `
                <div class="player-node-5v5" style="top: ${p.top}%; left: ${p.left}%;">
                    <img src="${thumb}">
                    <div class="player-role-badge ${roleClass}">${p.role}</div>
                </div>`;
                pitch.insertAdjacentHTML('beforeend', node);
            });
        }

        // Strategia
        const strategyLines = stage.strategy ? stage.strategy.split('\n').filter(line => line.trim() !== '') : [];
        const strategyHtml = strategyLines.map((line, idx) => `
            <div class="numbered-list">
                <div class="num">${idx + 1}</div>
                <div>${line}</div>
            </div>
        `).join('');
        document.getElementById('display-strategy').innerHTML = strategyHtml || '<p class="text-secondary">Nessuna strategia inserita.</p>';

        document.getElementById('display-manuals').textContent = stage.manuals || 'Nessun manuale specificato.';
        document.getElementById('display-subs-desc').textContent = stage.subsDesc || 'Nessuna indicazione sui sostituti.';

        // Piani Difficili
        const diffSection = document.getElementById('display-difficult-section');
        const diffGrid = document.getElementById('display-difficult-grid');
        diffGrid.innerHTML = '';

        if (stage.difficultStages && stage.difficultStages.length > 0) {
            stage.difficultStages.forEach(ds => {
                diffGrid.insertAdjacentHTML('beforeend', `
                    <div class="floor-card">
                        <h5>${ds.title}</h5>
                        <p style="white-space: pre-wrap;">${ds.desc}</p>
                    </div>
                `);
            });
            diffSection.style.display = 'block';
        } else {
            diffSection.style.display = 'none';
        }
    }
}

new TowersController();