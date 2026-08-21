// js/Controllers/metaTeam.js
import { AuthManager } from '../Services/auth.js';
import { BuildManager } from '../Services/buildManager.js';
import { characterRegistry, passivesLibrary, techniquesLibrary } from '../Core/database.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';
import { parsePassiveText } from '../Core/parsers.js';

const ADMIN_UID = "avNoCAM4I5dyQL6zLY0phnt3fc92";
const MODERATOR_UIDS = ["alqyEbbyuxNjej3yTJQDNthmtf32", "Cu2zjcxpxIh2lddFrlDIc6YePgu1"];

class MetaTeamController {
    constructor() {
        this.auth = new AuthManager();
        this.buildManager = new BuildManager();
        this.isAdmin = false;
        this.allFormations = [];
        this.draftFormation = null;
        this.currentViewedId = null;
        this.currentForm = null;
        this.dragOccurred = false; // Traccia il trascinamento per bloccare il click accidentale

        setupGlobalSelectClose();
        this.init();
    }

    async init() {
        initCustomSelect(document.getElementById('formation-tier'));

        // FIX: Spostato il caricamento dentro il listener di Auth per gestire i permessi prima di renderizzare
        this.auth.setAuthStateListener(async (user) => {
            this.isAdmin = user && (user.uid === ADMIN_UID || MODERATOR_UIDS.includes(user.uid));
            this.checkDraft();

            await this.loadTierList();
        });

        this.bindEvents();
    }

    checkDraft() {
        if (!this.isAdmin) return;
        const draftStr = sessionStorage.getItem('meta_formation_draft');
        if (draftStr) {
            this.draftFormation = JSON.parse(draftStr);
            document.getElementById('admin-panel-container').style.display = 'block';

            const previewContainer = document.getElementById('draft-preview');
            let html = '';
            if (this.draftFormation.coach) {
                html += `<div class="text-center me-3 border-end border-primary pe-3"><span class="badge bg-warning text-dark d-block mb-1">All.</span><img src="${this.draftFormation.coach.thumb}" class="draft-mini-icon"></div>`;
            }
            if (this.draftFormation.players) {
                this.draftFormation.players.forEach(p => {
                    const char = characterRegistry.find(c => c.id === p.id);
                    if (char) html += `<div class="text-center"><img src="${char.position}" style="height: 14px; margin-bottom: 4px; display: block; margin-left: auto; margin-right: auto;"><img src="${char.thumb}" class="draft-mini-icon"></div>`;
                });
            }
            previewContainer.innerHTML = html;
        }
    }

    async loadTierList() {
        document.getElementById('loading-spinner').style.display = 'block';
        document.getElementById('tier-list-container').style.display = 'none';

        ['S-plus', 'S', 'A', 'B'].forEach(t => {
            const el = document.getElementById(`tier-${t}`);
            if (el) el.innerHTML = '';
        });

        try {
            const snap = await window.dbGetDocs(window.dbCollection(window.firebaseDb, "meta_teams"));
            this.allFormations = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));

            // Ordinamento basato sul campo "order"
            this.allFormations.sort((a, b) => (a.order || 0) - (b.order || 0));

            this.allFormations.forEach(form => {
                const tierContainer = document.getElementById(`tier-${form.tier}`);
                if (tierContainer) {
                    const coachImg = form.team.coach ? form.team.coach.thumb : 'img/IECross.png';
                    const coachName = form.team.coach ? form.team.coach.name : 'Sconosciuto';

                    // Aggiunti draggable="true" per gli admin e blocchi pointer-events per un drag fluido
                    const draggableAttr = this.isAdmin ? 'draggable="true" style="cursor: grab;"' : '';

                    const cardHtml = `
                        <div class="formation-card shadow-sm" data-uid="${form.uid}" ${draggableAttr}>
                            <img src="${coachImg}" draggable="false" style="pointer-events: none;">
                            <div class="overflow-hidden" style="pointer-events: none;">
                                <h6 class="mb-0 fw-bold text-dark text-truncate">${form.title}</h6>
                                <small class="text-secondary fw-bold">All: ${coachName}</small>
                            </div>
                        </div>
                    `;
                    tierContainer.insertAdjacentHTML('beforeend', cardHtml);
                }
            });
        } catch (e) {
            console.error("Errore nel caricamento formazioni:", e);
        }

        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('tier-list-container').style.display = 'block';

        document.querySelectorAll('.formation-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (this.dragOccurred) {
                    e.preventDefault();
                    return;
                }
                this.openViewModal(card.dataset.uid);
            });
        });

        // Inizializza il sistema di trascinamento se l'utente è Admin o Moderatore
        if (this.isAdmin) {
            this.setupDragAndDrop();
        }
    }

    // ==========================================
    // SISTEMA DRAG & DROP (Solo Admin/Mod)
    // ==========================================
    setupDragAndDrop() {
        // Selezioniamo le aree dove le formazioni possono essere rilasciate
        const containers = document.querySelectorAll('[id^="tier-"]');

        document.querySelectorAll('.formation-card').forEach(draggable => {
            draggable.addEventListener('dragstart', (e) => {
                this.dragOccurred = true;
                draggable.classList.add('dragging');
                draggable.style.opacity = '0.4';
                if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
            });

            draggable.addEventListener('dragend', async () => {
                draggable.classList.remove('dragging');
                draggable.style.opacity = '1';

                // Ritardo per permettere al click di essere bloccato
                setTimeout(() => { this.dragOccurred = false; }, 100);

                await this.saveNewOrder(draggable.parentElement);
            });
        });

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = this.getDragAfterElement(container, e.clientX);
                const draggable = document.querySelector('.dragging');
                if (draggable) {
                    if (afterElement == null) {
                        container.appendChild(draggable);
                    } else {
                        container.insertBefore(draggable, afterElement);
                    }
                }
            });
        });
    }

    getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.formation-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    async saveNewOrder(container) {
        const newTier = container.id.replace('tier-', '');
        const items = container.querySelectorAll('.formation-card');
        const updates = [];

        document.body.style.cursor = 'wait';

        items.forEach((item, index) => {
            const uid = item.dataset.uid;
            const formRef = window.dbDoc(window.firebaseDb, "meta_teams", uid);
            updates.push(window.dbSet(formRef, {
                order: index,
                tier: newTier
            }, { merge: true }));
        });

        await Promise.all(updates);
        document.body.style.cursor = 'default';
    }


    async openViewModal(uid) {
        this.currentViewedId = uid;
        this.currentForm = this.allFormations.find(f => f.uid === uid);
        if (!this.currentForm) return;

        document.getElementById('view-build-details').innerHTML = `
            <div class="h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <i class="fas fa-hand-pointer fa-4x text-info mb-3 pulse-icon"></i>
                <h4 class="fw-bold text-white">Clicca su un giocatore in campo<br>per visualizzare la sua Meta Build!</h4>
            </div>`;
        document.getElementById('view-build-details').style.justifyContent = 'center';

        document.getElementById('view-formation-title').textContent = this.currentForm.title;
        document.getElementById('view-formation-desc').textContent = this.currentForm.desc;
        if(this.currentForm.team.coach) {
            document.getElementById('view-coach-thumb').src = this.currentForm.team.coach.thumb;
            document.getElementById('view-coach-name').textContent = "All: " + this.currentForm.team.coach.name;
        }

        const btnDelete = document.getElementById('btn-delete-formation');
        btnDelete.style.display = this.isAdmin ? 'inline-block' : 'none';

        const pitchContainer = document.getElementById('view-pitch-container');
        pitchContainer.innerHTML = '';

        const slots = this.currentForm.team.coach.slots;
        let tempRoster = this.currentForm.team.roster || {};

        if (Object.keys(tempRoster).length === 0) {
            this.currentForm.team.players.forEach((p, idx) => {
                if(slots[idx]) tempRoster[slots[idx].number] = p.id;
            });
        }

        pitchContainer.innerHTML = slots.map(slot => {
            const playerId = tempRoster[slot.number];
            if (playerId) {
                const player = characterRegistry.find(c => c.id === playerId);
                if (player) {
                    return `
                        <div class="pitch-slot has-player" 
                             style="top: ${slot.y}%; left: ${slot.x}%;" 
                             data-charid="${player.id}" 
                             onclick="window.metaTeamController.showPlayerBuild('${player.id}', this)">
                            <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                            <img src="${player.thumb}" class="player-thumb">
                        </div>
                    `;
                }
            }
            return '';
        }).join('');

        const modal = new bootstrap.Modal(document.getElementById('formationModal'));
        modal.show();
    }

    async showPlayerBuild(charId, clickedSlotElement) {
        document.querySelectorAll('#view-pitch-container .has-player').forEach(s => {
            s.classList.remove('active-selection');
        });
        clickedSlotElement.classList.add('active-selection');

        const detailsContainer = document.getElementById('view-build-details');
        detailsContainer.style.justifyContent = 'flex-start';
        detailsContainer.innerHTML = '<div class="text-center p-5 w-100"><i class="fas fa-spinner fa-spin fa-3x text-info"></i><br><span class="fw-bold mt-2 d-block text-white">Estrazione Dati...</span></div>';

        const char = characterRegistry.find(c => c.id === charId);
        const build = await this.buildManager.getBuild(charId);

        let buildHtml = '';
        if (build) {
            let passivesHtml = '';
            if (build.passives && build.passives.length > 0) {
                build.passives.forEach((pData, idx) => {
                    const pInfo = passivesLibrary.find(x => x.id === pData.id);
                    if (pInfo) {
                        passivesHtml += `
                            <div class="p-2 rounded mb-2 shadow-sm" style="background-color: #ffffff; border: 2px solid #1a73e8;">
                                <div class="d-flex align-items-center">
                                    <span class="badge" style="background-color: #0b1a42; color: #0dcaf0; border: 1px solid #0dcaf0;">Slot ${idx + 1}</span> 
                                    <strong class="fs-6 ms-2" style="color: #0b1a42;">${pInfo.title || pInfo.name}</strong>
                                </div>
                                ${pData.desc ? `<div class="mt-2 pt-2" style="border-top: 1px solid #c0d3e8;"><small class="fw-bold" style="color: #5c728e;"><i class="fas fa-comment-dots text-warning me-1"></i> ${pData.desc}</small></div>` : ''}
                            </div>
                        `;
                    }
                });
            }

            let moveHtml = '';
            if (build.extraMove && build.extraMove.id) {
                const tech = techniquesLibrary[build.extraMove.id];
                if (tech) {
                    moveHtml = `
                        <div class="p-2 rounded shadow-sm mt-3" style="background-color: #fffdf5; border: 2px solid #ffc107;">
                            <div class="d-flex align-items-center">
                                <span class="badge bg-danger text-white border border-light">Mossa Extra</span> 
                                <strong class="fs-6 ms-2" style="color: #0b1a42;">${tech.name}</strong>
                            </div>
                            ${build.extraMove.desc ? `<div class="mt-2 pt-2" style="border-top: 1px solid #ffe69c;"><small class="fw-bold" style="color: #5c728e;"><i class="fas fa-comment-dots text-warning me-1"></i> ${build.extraMove.desc}</small></div>` : ''}
                        </div>
                    `;
                }
            }

            buildHtml = `
                <div class="mt-4 w-100">
                    <h5 class="fw-bold pb-2 mb-3" style="color: #0dcaf0; border-bottom: 2px solid #0dcaf0;"><i class="fas fa-tools me-2"></i> Equipaggiamento Meta</h5>
                    ${passivesHtml || '<p class="text-secondary small fw-bold">Nessuna passiva specificata per la build.</p>'}
                    ${moveHtml}
                </div>
            `;
        } else {
            buildHtml = `
                <div class="mt-4 p-4 rounded border text-center w-100 shadow-sm" style="background-color: #ffffff; border-color: #c0d3e8 !important;">
                    <i class="fas fa-folder-open fa-3x text-secondary mb-3"></i><br>
                    <span class="fw-bold" style="color: #0b1a42;">Nessuna Meta Build specifica registrata nel database per questo giocatore.</span>
                </div>`;
        }

        detailsContainer.innerHTML = `
            <div class="d-flex align-items-center gap-3 w-100 bg-white p-3 rounded shadow-sm" style="border: 2px solid #1a73e8;">
                <img src="${char.thumb}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 2px solid #0b1a42; background: linear-gradient(to bottom, #edf3f8 0%, #a4ccf4 100%);">
                <div class="flex-grow-1">
                    <h4 class="mb-0 text-dark fw-bold">${char.name}</h4>
                    <div class="mt-2">
                        <img src="${char.element}" title="Elemento" style="height: 22px; margin-right: 5px;">
                        <img src="${char.position}" title="Ruolo" style="height: 22px;">
                    </div>
                </div>
                <a href="#" onclick="event.preventDefault(); window.location.href = (window.location.pathname.includes('.html') ? 'character.html' : 'character') + '?id=${char.id}';" class="btn btn-primary fw-bold px-3 shadow-sm">
                    Scheda PG <i class="fas fa-arrow-right ms-1"></i>
                </a>
            </div>
            ${buildHtml}
        `;
    }

    bindEvents() {
        document.getElementById('btn-cancel-draft').addEventListener('click', () => {
            sessionStorage.removeItem('meta_formation_draft');
            document.getElementById('admin-panel-container').style.display = 'none';
            this.draftFormation = null;
        });

        document.getElementById('btn-save-formation').addEventListener('click', async (e) => {
            if (!this.draftFormation) return;

            const title = document.getElementById('formation-title').value.trim();
            const desc = document.getElementById('formation-desc').value.trim();
            const tier = document.getElementById('formation-tier').dataset.value;

            if (!title) { alert("Inserisci un titolo per la formazione!"); return; }

            const btn = e.target;
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Salvataggio...`;

            try {
                const newId = `metaTeam_${Date.now()}`;
                const formRef = window.dbDoc(window.firebaseDb, "meta_teams", newId);

                await window.dbSet(formRef, {
                    authorId: this.auth.user.uid,
                    title: title,
                    desc: desc,
                    tier: tier,
                    order: this.allFormations.length, // Viene inserita in fondo per default
                    team: this.draftFormation,
                    createdAt: new Date().toISOString()
                });

                sessionStorage.removeItem('meta_formation_draft');
                document.getElementById('admin-panel-container').style.display = 'none';
                this.draftFormation = null;

                alert("Squadra Meta a 11 pubblicata con successo!");
                await this.loadTierList();

            } catch (err) {
                alert("Errore durante il salvataggio.");
            }

            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-save me-2"></i> Salva nel Meta`;
        });

        document.getElementById('btn-delete-formation').addEventListener('click', async () => {
            if(confirm("Sei sicuro di voler eliminare definitivamente questa Formazione dal Meta?")) {
                try {
                    await window.dbDelete(window.dbDoc(window.firebaseDb, "meta_teams", this.currentViewedId));
                    bootstrap.Modal.getInstance(document.getElementById('formationModal')).hide();
                    alert("Formazione eliminata.");
                    await this.loadTierList();
                } catch(e) {
                    alert("Errore durante l'eliminazione.");
                }
            }
        });
    }
}

const metaTeamController = new MetaTeamController();
window.metaTeamController = metaTeamController;