// js/Controllers/teamBuilder.js

import { AuthManager } from '../Services/auth.js';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { coachRegistry } from '../Coaches/registry.js';
import { characterRegistry, fetchCoachData } from '../Core/database.js';
import { filterCharacters } from '../Core/roster.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

// ==========================================
// 1. MANAGER DISCUSSIONI (Stile BoardManager)
// ==========================================
class TeamDiscussionManager {
    constructor() {
        this.collectionName = "team_discussions";
    }

    // Recupera il database in modo dinamico per evitare crash
    get db() {
        return window.firebaseDb;
    }

    async fetchDiscussions() {
        if (!this.db) return null;
        try {
            const q = query(collection(this.db, this.collectionName), orderBy("createdAt", "desc"), limit(10));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Errore fetch discussioni:", error);
            return [];
        }
    }

    async createDiscussion(user, profile, title, desc, teamSnapshot) {
        if (!this.db) return false;
        try {
            await addDoc(collection(this.db, this.collectionName), {
                authorId: user.uid,
                authorName: profile?.nickname || user.displayName || "Allenatore Anonimo",
                authorAvatarId: profile?.selectedAvatarId || "default",
                authorRarity: profile?.rarity || "Normal Player",
                title: title,
                description: desc,
                teamSnapshot: JSON.stringify(teamSnapshot),
                commentCount: 0,
                likes: 0,
                createdAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Errore creazione discussione:", error);
            return false;
        }
    }
}

// ==========================================
// 2. CONTROLLER PRINCIPALE TEAM BUILDER
// ==========================================
class TeamBuilderController {
    constructor() {
        // Inizializza i Manager
        this.auth = new AuthManager();
        this.discussionManager = new TeamDiscussionManager();

        // Variabili di Stato
        this.currentCoachId = '';
        this.activeCoachDb = null;
        this.teamRoster = {};
        this.activeSelection = null;
        this.lastFilteredList = characterRegistry;

        // Esponi le funzioni al window per i tag onclick nell'HTML
        window.handleSlotClick = (slotNumber) => this.handleSlotClick(slotNumber);
        window.assignPlayerToSlot = (charId) => this.assignPlayerToSlot(charId);

        // Avvio sicuro
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        this.bindEvents();
        this.loadTeamState();
        this.restoreFilters();

        // Inizializza select custom
        document.querySelectorAll(".custom-select").forEach(sel => {
            initCustomSelect(sel, () => this.applyFilters());
        });
        setupGlobalSelectClose();

        // Gestione Auth per mostrare i tasti Condividi/Admin
        this.auth.setAuthStateListener((user) => {
            this.checkShareButtonVisibility();
        });

        if (!this.currentCoachId || !coachRegistry.some(c => c.id === this.currentCoachId)) {
            this.currentCoachId = 'percivalTravis';
        }

        await this.selectCoach(this.currentCoachId);
        this.applyFilters();
        this.loadLatestDiscussions();

        // Avvio tutorial automatico
        if (!localStorage.getItem('tutorial_teambuilder_seen')) {
            setTimeout(() => this.startTutorial(), 800);
        }
    }

    bindEvents() {
        const searchInput = document.getElementById('search-name');
        if(searchInput) searchInput.addEventListener('input', () => this.applyFilters());

        const btnReset = document.getElementById('btn-reset-filters');
        if(btnReset) btnReset.addEventListener('click', () => this.resetFilters());

        const btnRemove = document.getElementById('btn-remove-player');
        if(btnRemove) btnRemove.addEventListener('click', () => this.removePlayerFromSlot());

        const btnTutorial = document.getElementById('btn-tutorial');
        if (btnTutorial) btnTutorial.addEventListener('click', () => this.startTutorial());

        const btnShare = document.getElementById('btn-share-team');
        if (btnShare) btnShare.addEventListener('click', () => this.openShareModal());

        const btnSubmitShare = document.getElementById('btn-submit-share');
        if (btnSubmitShare) btnSubmitShare.addEventListener('click', () => this.submitTeamShare());

        // Bottone Admin per il Meta
        const btnPublishMeta = document.getElementById('btn-publish-meta');
        if (btnPublishMeta) btnPublishMeta.addEventListener('click', () => this.publishToMeta());
    }

    // --- SALVATAGGIO STATO ---
    saveTeamState() {
        localStorage.setItem('tb_roster', JSON.stringify(this.teamRoster));
        localStorage.setItem('tb_coach', this.currentCoachId);
    }

    loadTeamState() {
        const savedRoster = localStorage.getItem('tb_roster');
        const savedCoach = localStorage.getItem('tb_coach');
        if (savedRoster) {
            try { this.teamRoster = JSON.parse(savedRoster); } catch(e) { this.teamRoster = {}; }
        }
        if (savedCoach) {
            this.currentCoachId = savedCoach;
        }
    }

    restoreFilters() {
        const saved = localStorage.getItem('tb_filters');
        if (saved) {
            try {
                const filters = JSON.parse(saved);
                const searchInput = document.getElementById('search-name');
                if (searchInput) searchInput.value = filters.name || '';

                const setCustomSelect = (id, val) => {
                    const el = document.getElementById(id);
                    if (el && val !== undefined && val !== null) {
                        el.dataset.value = val;
                        const option = el.querySelector(`.select-items div[data-value="${val}"]`) || el.querySelector('.select-items div');
                        if (option) {
                            el.dataset.value = option.dataset.value;
                            el.querySelector('.select-selected span').innerHTML = option.innerHTML;
                        }
                    }
                };

                setCustomSelect('filter-position', filters.position);
                setCustomSelect('filter-element', filters.element);
                setCustomSelect('filter-rarity', filters.rarity);
                setCustomSelect('filter-style', filters.style);
                setCustomSelect('filter-team', filters.team);
                setCustomSelect('filter-season', filters.season);
            } catch (e) {}
        }
    }

    // --- FILTRI ---
    resetFilters() {
        const searchInput = document.getElementById('search-name');
        if(searchInput) searchInput.value = '';

        const selects = document.querySelectorAll('.custom-select');
        selects.forEach(sel => {
            const firstOption = sel.querySelector('.select-items div');
            if(firstOption) {
                sel.dataset.value = firstOption.dataset.value;
                sel.querySelector('.select-selected span').innerHTML = firstOption.innerHTML;
            }
        });
        this.applyFilters();
    }

    async applyFilters() {
        const filters = {
            name: document.getElementById('search-name')?.value || '',
            position: document.getElementById('filter-position')?.dataset.value || 'All',
            element: document.getElementById('filter-element')?.dataset.value || 'All',
            rarity: document.getElementById('filter-rarity')?.dataset.value || 'All',
            style: document.getElementById('filter-style')?.dataset.value || 'All',
            team: document.getElementById('filter-team')?.dataset.value || 'All',
            season: document.getElementById('filter-season')?.dataset.value || 'All'
        };

        localStorage.setItem('tb_filters', JSON.stringify(filters));
        this.lastFilteredList = await filterCharacters(characterRegistry, filters);
        this.renderPlayerGrid(this.lastFilteredList);
    }

    // --- ALLENATORE E RENDER CAMPO ---
    renderSidebar() {
        const listContainer = document.getElementById('coach-list');
        if (!listContainer) return;
        listContainer.innerHTML = '';

        coachRegistry.forEach(coach => {
            const btn = document.createElement('div');
            btn.className = `coach-btn ${coach.id === this.currentCoachId ? 'active' : ''}`;
            btn.innerHTML = `
                <img src="${coach.thumb}" onerror="this.src='https://placehold.co/50'">
                <div class="coach-btn-info">
                    <strong>${coach.name}</strong>
                </div>
            `;
            btn.onclick = () => this.selectCoach(coach.id);
            listContainer.appendChild(btn);
        });
    }

    async selectCoach(id) {
        this.currentCoachId = id;
        this.activeSelection = null;
        this.saveTeamState();
        this.toggleRemoveButton();
        this.renderSidebar();

        this.activeCoachDb = await fetchCoachData(id);
        if (!this.activeCoachDb) return;

        document.getElementById('coach-name').textContent = this.activeCoachDb.name;

        const portrait = document.getElementById('coach-portrait');
        if (this.activeCoachDb.thumb) {
            portrait.src = this.activeCoachDb.thumb;
            portrait.style.display = 'block';
        } else {
            portrait.style.display = 'none';
        }

        const teamHeader = document.getElementById('team-name-header');
        teamHeader.textContent = this.activeCoachDb.formationName;
        teamHeader.style.display = 'flex';

        const condBox = document.getElementById('tb-conditions-box');
        const condList = document.getElementById('tb-conditions-list');

        if (this.activeCoachDb.formationConditions && this.activeCoachDb.formationConditions.length > 0) {
            condList.innerHTML = this.activeCoachDb.formationConditions.map(cond => {
                const icons = cond.icons || (cond.icon ? [cond.icon] : []);
                const iconsHtml = icons.map(icon => `<img src="${icon}" onerror="this.src='https://placehold.co/35?text=⚡'">`).join('');
                return `
                    <div class="tb-condition-row">
                        <strong>${cond.slotCode}</strong>
                        ${iconsHtml}
                    </div>
                `;
            }).join('');
            condBox.style.display = 'block';
        } else {
            condBox.style.display = 'none';
        }

        this.renderPitch();
        this.renderPlayerGrid(this.lastFilteredList);
    }

    renderPitch() {
        const pitchContainer = document.getElementById('pitch-container');
        if (!this.activeCoachDb) return;

        const conditionSlots = this.activeCoachDb.formationConditions ? this.activeCoachDb.formationConditions.map(c => c.slotCode) : [];

        pitchContainer.innerHTML = this.activeCoachDb.slots.map(slot => {
            const playerId = this.teamRoster[slot.number];
            const isSelectedClass = (this.activeSelection && this.activeSelection.type === 'slot' && this.activeSelection.value === slot.number) ? 'active-selection' : '';
            const isConditionClass = conditionSlots.includes(slot.number) ? 'condition-slot' : '';

            if (playerId) {
                const player = characterRegistry.find(c => c.id === playerId);
                return `
                    <div class="pitch-slot has-player ${isSelectedClass} ${isConditionClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                        <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                        <img src="${player.thumb}" class="player-thumb" onerror="this.src='https://placehold.co/65'">
                    </div>
                `;
            } else {
                return `
                    <div class="pitch-slot ${isSelectedClass} ${isConditionClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                        <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                        <strong>${slot.number}</strong>
                    </div>
                `;
            }
        }).join('');
    }

    renderPlayerGrid(playersList) {
        const grid = document.getElementById('player-grid-container');
        grid.innerHTML = '';

        playersList.forEach(char => {
            const isSelected = (this.activeSelection && this.activeSelection.type === 'char' && this.activeSelection.value === char.id);
            const cardStyle = isSelected ? 'border-color: #ffca28; background: #fffdf5; box-shadow: 0 0 10px rgba(255,202,40,0.8); transform: translateY(-2px);' : '';

            const card = document.createElement('div');
            card.className = 'tb-player-card';
            card.style.cssText = cardStyle;
            card.innerHTML = `
                <img src="${char.thumb}" class="thumb" onerror="this.src='https://placehold.co/50'">
                <div class="name">${char.name}</div>
                <div class="icons-row">
                    <img src="${char.element}" onerror="this.style.display='none'">
                    <img src="${char.position}" onerror="this.style.display='none'">
                </div>
            `;
            card.onclick = () => this.assignPlayerToSlot(char.id);
            grid.appendChild(card);
        });
    }

    // --- INTERAZIONI CAMPO/GRIGLIA ---
    handleSlotClick(slotNumber) {
        if (!this.activeSelection) {
            this.activeSelection = { type: 'slot', value: slotNumber };
        } else if (this.activeSelection.type === 'slot') {
            if (this.activeSelection.value === slotNumber) {
                this.activeSelection = null;
            } else {
                const slotA = this.activeSelection.value;
                const slotB = slotNumber;
                const charA = this.teamRoster[slotA];
                const charB = this.teamRoster[slotB];

                if (charB) this.teamRoster[slotA] = charB; else delete this.teamRoster[slotA];
                if (charA) this.teamRoster[slotB] = charA; else delete this.teamRoster[slotB];

                this.activeSelection = null;
                this.saveTeamState();
            }
        } else if (this.activeSelection.type === 'char') {
            const charId = this.activeSelection.value;
            for (const [key, val] of Object.entries(this.teamRoster)) {
                if (val === charId) delete this.teamRoster[key];
            }
            this.teamRoster[slotNumber] = charId;
            this.activeSelection = null;
            this.saveTeamState();
        }
        this.renderPitch();
        this.renderPlayerGrid(this.lastFilteredList);
        this.toggleRemoveButton();
    }

    assignPlayerToSlot(charId) {
        if (!this.activeSelection) {
            this.activeSelection = { type: 'char', value: charId };
        } else if (this.activeSelection.type === 'char') {
            if (this.activeSelection.value === charId) {
                this.activeSelection = null;
            } else {
                this.activeSelection = { type: 'char', value: charId };
            }
        } else if (this.activeSelection.type === 'slot') {
            const slotNumber = this.activeSelection.value;
            for (const [key, val] of Object.entries(this.teamRoster)) {
                if (val === charId) delete this.teamRoster[key];
            }
            this.teamRoster[slotNumber] = charId;
            this.activeSelection = null;
            this.saveTeamState();
        }
        this.renderPitch();
        this.renderPlayerGrid(this.lastFilteredList);
        this.toggleRemoveButton();
    }

    toggleRemoveButton() {
        const btn = document.getElementById('btn-remove-player');
        if (this.activeSelection && this.activeSelection.type === 'slot' && this.teamRoster[this.activeSelection.value]) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
        this.checkShareButtonVisibility();
    }

    removePlayerFromSlot() {
        if (this.activeSelection && this.activeSelection.type === 'slot') {
            delete this.teamRoster[this.activeSelection.value];
            this.activeSelection = null;
            this.saveTeamState();
            this.renderPitch();
            this.renderPlayerGrid(this.lastFilteredList);
            this.toggleRemoveButton();
        }
    }

    // --- COMMUNITY & CONDIVISIONE ---
    checkShareButtonVisibility() {
        const btnShare = document.getElementById('btn-share-team');
        const btnPublishMeta = document.getElementById('btn-publish-meta');

        const hasPlayers = Object.keys(this.teamRoster).length > 0;

        if (this.auth && this.auth.user && hasPlayers) {
            // Mostra sempre il tasto Condividi per tutti gli utenti loggati
            if (btnShare) btnShare.style.display = 'block';

            // Controllo per attivare il tasto speciale Meta Formazione (Solo Admin)
            const uid = this.auth.user.uid;
            if (uid === 'avNoCAM4I5dyQL6zLY0phnt3fc92' || uid === 'alqyEbbyuxNjej3yTJQDNthmtf32' || uid === 'Cu2zjcxpxIh2lddFrlDIc6YePgu1') {
                if (btnPublishMeta) btnPublishMeta.style.display = 'inline-block';
            } else {
                if (btnPublishMeta) btnPublishMeta.style.display = 'none';
            }
        } else {
            if (btnShare) btnShare.style.display = 'none';
            if (btnPublishMeta) btnPublishMeta.style.display = 'none';
        }
    }

    openShareModal() {
        const modal = new bootstrap.Modal(document.getElementById('shareTeamModal'));
        modal.show();
    }

    async submitTeamShare() {
        const title = document.getElementById('share-title').value.trim();
        const desc = document.getElementById('share-desc').value.trim();

        if (title.length < 5 || desc.length < 5) {
            alert("Il titolo e la descrizione devono avere almeno 5 caratteri.");
            return;
        }

        if (!window.firebaseDb) {
            alert("Connessione in corso... aspetta un secondo e riprova!");
            return;
        }

        const btnSubmit = document.getElementById('btn-submit-share');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Pubblicazione...';

        const profile = this.auth.getCurrentProfile();
        const teamSnapshot = {
            coachId: this.currentCoachId,
            roster: this.teamRoster,
            playerCount: Object.keys(this.teamRoster).length
        };

        const success = await this.discussionManager.createDiscussion(this.auth.user, profile, title, desc, teamSnapshot);

        if (success) {
            document.getElementById('share-title').value = '';
            document.getElementById('share-desc').value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('shareTeamModal'));
            modal.hide();
            await this.loadLatestDiscussions();
        } else {
            alert("Errore durante la pubblicazione. Riprova.");
        }

        btnSubmit.disabled = false;
        btnSubmit.innerHTML = 'Pubblica Post';
    }

    // --- NUOVA LOGICA: INVIA LA SQUADRA ALLA PAGINA META (SOLO ADMIN) ---
    publishToMeta() {
        if (!this.activeCoachDb || Object.keys(this.teamRoster).length === 0) {
            alert("Completa la formazione schierando almeno un giocatore prima di promuoverla al Meta!");
            return;
        }

        const playersArray = [];

        // Formatta i giocatori convertendo gli ID degli slot nel loro ruolo in campo
        for (const [slotNum, charId] of Object.entries(this.teamRoster)) {
            const slotInfo = this.activeCoachDb.slots.find(s => s.number == slotNum);
            playersArray.push({
                id: charId,
                position: slotInfo ? slotInfo.position : 'Sconosciuto'
            });
        }

        const metaTeam = {
            coach: this.activeCoachDb,
            players: playersArray,
            roster: this.teamRoster
        };

        sessionStorage.setItem('meta_formation_draft', JSON.stringify(metaTeam));
        window.location.href = 'metaTeam.html';
    }

    async loadLatestDiscussions() {
        const listContainer = document.getElementById('discussions-list');
        if (!listContainer) return;

        if (!window.firebaseDb) {
            listContainer.innerHTML = '<div class="text-center p-4 text-warning border border-secondary rounded bg-dark fw-bold">Connessione al Database in corso...<br><small class="text-muted fw-normal">Se questo messaggio non va via, controlla di aver inserito gli script di Firebase nel file HTML!</small></div>';
            setTimeout(() => this.loadLatestDiscussions(), 1500);
            return;
        }

        listContainer.innerHTML = '<div class="text-center p-4 text-white"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';

        const posts = await this.discussionManager.fetchDiscussions();

        if (posts === null) return;

        if (posts.length === 0) {
            listContainer.innerHTML = '<div class="text-center p-4 fw-bold shadow-sm" style="color: #1a73e8; background-color: #ffffff; border: 2px solid #c0d3e8; border-radius: 12px;">Nessuna formazione condivisa di recente. Sii il primo a chiedere consigli alla community!</div>';
            return;
        }

        let html = '';
        posts.forEach(data => {
            const dateStr = data.createdAt ? this.formatDate(data.createdAt.toDate()) : 'Poco fa';
            let teamData = { playerCount: 0 };
            try { teamData = JSON.parse(data.teamSnapshot); } catch(e){}

            let coachThumb = "https://placehold.co/60";
            if(teamData.coachId) {
                const c = coachRegistry.find(x => x.id === teamData.coachId);
                if(c) coachThumb = c.thumb;
            }

            html += `
            <div class="post-card bg-white p-3 rounded d-flex align-items-center gap-3 shadow-sm mb-2" 
                 style="border: 1px solid #c0d3e8; border-left: 5px solid #1a73e8; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" 
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(0,0,0,0.1)';" 
                 onmouseout="this.style.transform='none'; this.style.boxShadow='0 .125rem .25rem rgba(0,0,0,.075)';" 
                 onclick="sessionStorage.setItem('discType', 'team'); sessionStorage.setItem('discId', '${data.id}'); window.location.href='discussion.html'">
                
                <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1" style="color: #0b1a42;">${data.title}</h5>
                    <div class="small mb-2" style="font-size: 0.85rem; color: #5c728e;">
                        <strong style="color: #0b1a42;">${data.authorName}</strong> <span class="badge bg-secondary ms-1" style="font-size: 0.65rem;">${data.authorRarity}</span>
                        <span class="ms-2 me-2">•</span> 
                        <span style="color: #0b1a42;">${data.description.substring(0, 80)}${data.description.length > 80 ? '...' : ''}</span>
                    </div>
                    <div class="d-flex align-items-center w3fw-bold" style="font-size: 0.85rem; color: #1a73e8;">
                        <i class="fas fa-comment me-1"></i> ${data.commentCount || 0}
                        <span class="ms-3" style="color: #5c728e;"><i class="far fa-clock me-1"></i> ${dateStr}</span>
                    </div>
                </div>
                
                <div class="rounded overflow-hidden position-relative shadow" style="width: 80px; height: 60px; border: 2px solid #ffca28; background: #0b1a42;">
                    <img src="${coachThumb}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
                    <div class="position-absolute top-50 start-50 translate-middle w-100 text-center fw-bold" style="font-size: 0.75rem; text-shadow: 1px 1px 3px #000; color: #fff;">
                        ${teamData.playerCount}/11
                    </div>
                </div>
            </div>
            `;
        });

        listContainer.innerHTML = html;
        const btnViewAll = document.getElementById('btn-view-all-discussions');
        if (btnViewAll) btnViewAll.style.display = 'inline-block';
    }

    formatDate(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours < 1) return Math.floor(diffTime / (1000 * 60)) + "m fa";
        if (diffHours < 24) return diffHours + "h fa";
        return date.toLocaleDateString();
    }

    startTutorial() {
        localStorage.setItem('tutorial_teambuilder_seen', 'true');
        introJs().setOptions({
            nextLabel: 'Avanti →',
            prevLabel: '← Indietro',
            doneLabel: 'Costruiamo! ⚽',
            showStepNumbers: true,
            showBullets: true,
            overlayOpacity: 0.8,
            scrollTo: 'tooltip',
            steps: [
                {
                    intro: "<div style='text-align: center;'><h4 class='text-primary fw-bold mb-3' style='text-transform: uppercase; letter-spacing: 1px;'>📋 Team Builder</h4><p>Benvenuto nel creatore di formazioni!<br><br>Qui puoi costruire il tuo <strong>Team</strong>, verificare le sinergie visive e studiare i requisiti dell'allenatore.</p></div>"
                },
                {
                    element: document.querySelector('.sidebar-left'),
                    intro: "<div style='text-align: center;'><h5 class='text-info fw-bold mb-3' style='text-transform: uppercase;'>👔 Scegli l'Allenatore</h5><p>Tutto parte da qui!<br><br>Seleziona un allenatore per caricare immediatamente la sua <strong>formazione base</strong> sul campo centrale.</p></div>",
                    position: 'right'
                },
                {
                    element: document.querySelector('.sidebar-right'),
                    intro: "<div style='text-align: center;'><h5 class='text-warning fw-bold mb-3' style='text-transform: uppercase;'>🔍 Trova i Giocatori</h5><p>Usa i filtri o la barra di ricerca per trovare i giocatori perfetti per la tua strategia.<br><br>Fai molta attenzione al riquadro scuro delle <strong>Condizioni Allenatore</strong> se vuoi massimizzare le passive!</p></div>",
                    position: 'left'
                },
                {
                    element: document.querySelector('.pitch-container-wrapper'),
                    intro: "<div style='text-align: center;'><h5 class='text-success fw-bold mb-3' style='text-transform: uppercase;'>⚽ Schiera la Squadra</h5><p>Il sistema di assegnazione è semplicissimo:<br><br>1️⃣ Clicca su un <strong>giocatore</strong> a destra.<br>2️⃣ Clicca su uno <strong>slot vuoto</strong> sul campo per posizionarlo.<br><br>Vuoi scambiare due giocatori in campo? Ti basta <strong>cliccare prima l'uno e poi l'altro!</strong></p></div>",
                    position: 'top'
                }
            ]
        }).start();
    }
}

new TeamBuilderController();