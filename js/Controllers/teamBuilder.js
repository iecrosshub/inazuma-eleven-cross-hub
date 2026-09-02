// js/Controllers/teamBuilder.js

import { AuthManager } from '../Services/auth.js';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { coachRegistry } from '../Coaches/registry.js';
import { filterCharacters } from '../Core/roster.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

// IMPORT UNIFICATI E CORRETTI DAL DATABASE E PARSERS
import {
    characterRegistry,
    fetchCoachData,
    passivesLibrary,
    rerollPassivesByRole,
    techniquesLibrary,
    universalManualsKeys
} from '../Core/database.js';

import { extractPosition, extractElement, getStatKeyByIcon } from '../Core/parsers.js';
import { BattleEngine } from '../Core/BattleEngine.js';
import { calculateCoachBuffs } from '../Core/calculator.js';
import { elementMap, roleMap } from '../Components/tagDictionary.js';

// Funzione Helper per tradurre il tipo di mossa
function getMoveKindByStat(statKey) {
    if (statKey === "Tiro") return "Tiro";
    if (statKey === "Tecnica") return "Dribbling";
    if (statKey === "Blocco") return "Blocco";
    if (statKey === "Parata") return "Parata";
    return "All";
}

class TeamDiscussionManager {
    constructor() {
        this.collectionName = "team_discussions";
    }

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

class TeamBuilderController {
    constructor() {
        this.auth = new AuthManager();
        this.discussionManager = new TeamDiscussionManager();

        this.currentCoachId = '';
        this.activeCoachDb = null;
        this.teamRoster = {};
        this.activeSelection = null;
        this.lastFilteredList = characterRegistry;
        this.editMetaPayload = null;

        window.handleSlotClick = (slotNumber) => this.handleSlotClick(slotNumber);
        window.assignPlayerToSlot = (charId) => this.assignPlayerToSlot(charId);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        this.bindEvents();

        const editRequestStr = sessionStorage.getItem('edit_meta_team_request');
        if (editRequestStr) {
            const editRequest = JSON.parse(editRequestStr);
            this.currentCoachId = editRequest.coachId;
            this.teamRoster = editRequest.roster;
            this.editMetaPayload = editRequest;

            sessionStorage.removeItem('edit_meta_team_request');
            this.saveTeamState();
        } else {
            this.loadTeamState();
        }

        this.restoreFilters();

        document.querySelectorAll(".custom-select").forEach(sel => {
            initCustomSelect(sel, () => this.applyFilters());
        });
        setupGlobalSelectClose();

        this.auth.setAuthStateListener((user) => {
            this.checkShareButtonVisibility();
        });

        if (!this.currentCoachId || !coachRegistry.some(c => c.id === this.currentCoachId)) {
            this.currentCoachId = 'percivalTravis';
        }

        await this.selectCoach(this.currentCoachId);
        this.applyFilters();
        this.loadLatestDiscussions();

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

        const btnPublishMeta = document.getElementById('btn-publish-meta');
        if (btnPublishMeta) btnPublishMeta.addEventListener('click', () => this.publishToMeta());

        // BOTTONI SIMULATORE
        const btnSimulate = document.getElementById('btn-simulate-buffs');
        if (btnSimulate) btnSimulate.addEventListener('click', () => this.openSimulatorModal());

        const btnRunEngine = document.getElementById('btn-run-engine');
        if (btnRunEngine) btnRunEngine.addEventListener('click', () => this.runSimulationEngine());
    }

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
                if (player) {
                    return `
                        <div class="pitch-slot has-player ${isSelectedClass} ${isConditionClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                            <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                            <img src="${player.thumb}" class="player-thumb" onerror="this.src='https://placehold.co/65'">
                        </div>
                    `;
                } else {
                    delete this.teamRoster[slot.number];
                    this.saveTeamState();
                    return `
                        <div class="pitch-slot ${isSelectedClass} ${isConditionClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                            <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                            <strong>${slot.number}</strong>
                        </div>
                    `;
                }
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

    checkShareButtonVisibility() {
        const btnShare = document.getElementById('btn-share-team');
        const btnPublishMeta = document.getElementById('btn-publish-meta');
        const btnSimulate = document.getElementById('btn-simulate-buffs');

        const hasPlayers = Object.keys(this.teamRoster).length > 0;

        // Mostra simulatore se ci sono giocatori
        if (hasPlayers) {
            if (btnSimulate) btnSimulate.style.display = 'block';
        } else {
            if (btnSimulate) btnSimulate.style.display = 'none';
        }

        // Mostra Condivisione/Promozione se loggato
        if (this.auth && this.auth.user && hasPlayers) {
            if (btnShare) btnShare.style.display = 'block';

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

    publishToMeta() {
        if (!this.activeCoachDb || Object.keys(this.teamRoster).length === 0) {
            alert("Completa la formazione schierando almeno un giocatore prima di promuoverla alla Tier List!");
            return;
        }

        const playersArray = [];

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
            roster: this.teamRoster,

            originalUid: this.editMetaPayload ? this.editMetaPayload.uid : null,
            originalTitle: this.editMetaPayload ? this.editMetaPayload.title : '',
            originalDesc: this.editMetaPayload ? this.editMetaPayload.desc : '',
            originalTier: this.editMetaPayload ? this.editMetaPayload.tier : 'S'
        };

        sessionStorage.setItem('meta_formation_draft', JSON.stringify(metaTeam));
        window.location.href = 'metaTeam.html';
    }

    async loadLatestDiscussions() {
        const listContainer = document.getElementById('discussions-list');
        if (!listContainer) return;

        if (!window.firebaseDb) {
            listContainer.innerHTML = '<div class="text-center p-4 text-warning border border-secondary rounded bg-dark fw-bold">Connessione al Database in corso...</div>';
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

    // =========================================================================
    //  NUOVE FUNZIONI SIMULATORE MANUALE (PASSIVE, REROLL E TECNICHE CON "MANUALE")
    // =========================================================================

    async openSimulatorModal() {
        const container = document.getElementById('sim-players-container');
        container.innerHTML = '<div class="text-center text-primary py-4"><i class="fas fa-spinner fa-spin fa-2x"></i><div class="fw-bold mt-2">Caricamento dati giocatori...</div></div>';

        const successMsg = document.getElementById('sim-total-power');
        if(successMsg) successMsg.style.display = 'none';

        let cardsHtml = '';

        for (const [slotNum, charId] of Object.entries(this.teamRoster)) {
            const baseChar = characterRegistry.find(c => c.id === charId);
            if (!baseChar) continue;

            let fullPlayer;
            try {
                const module = await import(`../Characters/${charId}.js`);
                fullPlayer = module.charData;
            } catch (e) {
                console.error("Impossibile caricare il giocatore:", charId);
                continue;
            }

            const logicalRole = roleMap[baseChar.position] || baseChar.position;
            const logicalElement = elementMap[baseChar.element] || baseChar.element;

            // --- 1. GENERAZIONE MOSSE NATIVE E EXTRA (COLONNA CENTRALE) ---
            const nativeTechsHtml = (fullPlayer.myTechniques || []).map(techKey => {
                const tDef = techniquesLibrary[techKey];
                const tName = tDef ? tDef.name : techKey;
                const splitIdx = tName.indexOf(' (');
                const cleanName = splitIdx !== -1 ? tName.substring(0, splitIdx) : tName;

                return `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="small fw-bold text-dark text-truncate" style="width:50%;" title="${tName}">${cleanName}</span>
                        <div class="d-flex justify-content-end" style="width: 48%;">
                            <select class="form-select form-select-sm shadow-sm border-success sim-tech-lvl" data-slot="${slotNum}" data-tech="${techKey}" style="width: 100%; font-weight: bold; color: #0b1a42;">
                                ${[...Array(10)].map((_, i) => `<option value="${i}">Lv ${i+1}</option>`).join('')}
                                <option value="manual">Manuale</option>
                            </select>
                            <input type="number" class="form-control form-control-sm border-success ms-1 sim-tech-manual-val" data-slot="${slotNum}" data-tech="${techKey}" style="display:none; width: 60px; padding: 2px 4px; font-weight:bold;" placeholder="Val">
                        </div>
                    </div>
                `;
            }).join('');

            let manualOptionsHtml = `<option value="">-- Nessuna --</option>`;
            universalManualsKeys.forEach(mKey => {
                if (!(fullPlayer.myTechniques || []).includes(mKey)) {
                    const tDef = techniquesLibrary[mKey];
                    const tName = tDef ? tDef.name : mKey;
                    const splitIdx = tName.indexOf(' (');
                    const cleanName = splitIdx !== -1 ? tName.substring(0, splitIdx) : tName;
                    manualOptionsHtml += `<option value="${mKey}">${cleanName}</option>`;
                }
            });

            const manualTechHtml = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <select class="form-select form-select-sm shadow-sm border-warning sim-manual-tech-id" data-slot="${slotNum}" style="width: 48%; font-size: 0.75rem; font-weight: bold;">
                        ${manualOptionsHtml}
                    </select>
                    <div class="d-flex justify-content-end" style="width: 48%;">
                        <select class="form-select form-select-sm shadow-sm border-warning sim-manual-tech-lvl" data-slot="${slotNum}" style="width: 100%; font-weight: bold; color: #0b1a42;" disabled>
                            <option value="0">Lv 1</option>
                        </select>
                        <input type="number" class="form-control form-control-sm border-warning ms-1 sim-manual-tech-manual-val" data-slot="${slotNum}" style="display:none; width: 60px; padding: 2px 4px; font-weight:bold;" placeholder="Val">
                    </div>
                </div>
            `;

            // --- 2. GENERAZIONE PASSIVE NATIVE E REROLL (COLONNA DESTRA) ---
            const allNativePassives = (fullPlayer.myBasicPassivesIds || []).concat(fullPlayer.myRarityPassivesIds || []);
            const passivesHtml = allNativePassives.map(pid => {
                const pDef = passivesLibrary.find(pl => pl.id === pid);
                if(!pDef) return '';
                const options = pDef.levels.map((lvl, i) => `<option value="${i}" ${i===9 ? 'selected' : ''}>Liv ${i+1}</option>`).join('');
                return `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="small fw-bold text-dark text-truncate" style="width: 50%;" title="${pDef.title}">${pDef.title}</span>
                        <div class="d-flex justify-content-end" style="width: 48%;">
                            <select class="form-select form-select-sm sim-passive-select shadow-sm border-primary" data-slot="${slotNum}" data-pid="${pid}" style="width: 100%; font-weight: bold; color: #0b1a42;">
                                <option value="-1">Spenta</option>
                                ${options}
                                <option value="manual">Manuale</option>
                            </select>
                            <input type="number" class="form-control form-control-sm border-primary ms-1 sim-passive-manual-val" data-slot="${slotNum}" data-pid="${pid}" style="display:none; width: 60px; padding: 2px 4px; font-weight:bold;" placeholder="Val">
                        </div>
                    </div>`;
            }).join('');

            const extractedRole = extractPosition(baseChar.position) || "FW";
            const availableRerolls = rerollPassivesByRole[extractedRole] || [];

            let rerollOptionsHtml = `<option value="">-- Seleziona Reroll --</option>`;
            availableRerolls.forEach(p => {
                rerollOptionsHtml += `<option value="${p.id}">${p.title}</option>`;
            });

            let rerollHtml = '';
            for (let i = 1; i <= 3; i++) {
                rerollHtml += `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <select class="form-select form-select-sm shadow-sm border-secondary sim-reroll-id" data-slot="${slotNum}" data-rindex="${i}" style="width: 50%; font-size: 0.75rem;">
                            ${rerollOptionsHtml}
                        </select>
                        <div class="d-flex justify-content-end" style="width: 48%;">
                            <select class="form-select form-select-sm shadow-sm border-secondary sim-reroll-lvl" data-slot="${slotNum}" data-rindex="${i}" style="width: 100%; font-weight: bold; color: #0b1a42;" disabled>
                                <option value="-1">Spenta</option>
                            </select>
                            <input type="number" class="form-control form-control-sm border-secondary ms-1 sim-reroll-manual-val" data-slot="${slotNum}" data-rindex="${i}" style="display:none; width: 60px; padding: 2px 4px; font-weight:bold;" placeholder="Val">
                        </div>
                    </div>
                `;
            }

            // CREAZIONE ACCORDION E MODAL
            cardsHtml += `
                <div class="accordion-item shadow-sm border-0 mb-2" style="border-radius: 10px; overflow: hidden;">
                    
                    <h2 class="accordion-header m-0" id="heading-sim-${slotNum}">
                        <button class="accordion-button collapsed py-2 px-3 bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-sim-${slotNum}" style="border-left: 5px solid #1a73e8; box-shadow: none;">
                            <div class="d-flex align-items-center w-100 pe-2">
                                <div class="text-center position-relative me-3">
                                    <img src="${baseChar.thumb}" class="rounded-circle shadow-sm bg-dark" style="width: 45px; height: 45px; object-fit: cover; border: 2px solid #ffca28;">
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark border border-warning" style="font-size: 0.65rem;">${slotNum}</span>
                                </div>
                                <div style="width: 140px;">
                                    <div class="fw-bold text-truncate" style="color: #0b1a42; font-size: 1rem;" title="${baseChar.name}">${baseChar.name}</div>
                                    <div class="small fw-bold text-secondary">
                                        <img src="${baseChar.element}" style="width:12px; margin-right:2px;"> ${logicalElement} | 
                                        <img src="${baseChar.position}" style="width:12px; margin-right:2px;"> ${logicalRole}
                                    </div>
                                </div>
                                <div class="ms-auto text-end sim-results-box" id="sim-result-${slotNum}" style="min-width: 250px;">
                                    <span class="badge bg-secondary text-light mt-2">Premi Calcola per i risultati</span>
                                </div>
                            </div>
                        </button>
                    </h2>

                    <div id="collapse-sim-${slotNum}" class="accordion-collapse collapse" data-bs-parent="#sim-players-container">
                        <div class="accordion-body bg-light border-top border-secondary-subtle py-3 px-4">
                            
                            <div class="row w-100 m-0">
                                <!-- Colonna 1: Statistiche Manuali -->
                                <div class="col-12 col-md-4 border-end border-secondary-subtle mb-3 mb-md-0 pe-md-4">
                                    <div class="fw-bold mb-3" style="font-size: 0.85rem; color: #0b1a42;"><i class="fas fa-chart-bar me-1"></i> STATISTICHE BASE</div>
                                    <div class="d-flex flex-column gap-2">
                                        <div class="input-group input-group-sm shadow-sm">
                                            <span class="input-group-text bg-danger text-white border-danger fw-bold" style="width:45px;">Tir</span>
                                            <input type="number" class="form-control sim-stat-input text-center fw-bold" data-slot="${slotNum}" data-stat="Tiro" value="${fullPlayer.stats?.Tiro?.lv340 || 100}">
                                        </div>
                                        <div class="input-group input-group-sm shadow-sm">
                                            <span class="input-group-text bg-success text-white border-success fw-bold" style="width:45px;">Tec</span>
                                            <input type="number" class="form-control sim-stat-input text-center fw-bold" data-slot="${slotNum}" data-stat="Tecnica" value="${fullPlayer.stats?.Tecnica?.lv340 || 100}">
                                        </div>
                                        <div class="input-group input-group-sm shadow-sm">
                                            <span class="input-group-text bg-secondary text-white border-secondary fw-bold" style="width:45px;">Blc</span>
                                            <input type="number" class="form-control sim-stat-input text-center fw-bold" data-slot="${slotNum}" data-stat="Blocco" value="${fullPlayer.stats?.Blocco?.lv340 || 100}">
                                        </div>
                                        <div class="input-group input-group-sm shadow-sm">
                                            <span class="input-group-text bg-warning text-dark border-warning fw-bold" style="width:45px;">Par</span>
                                            <input type="number" class="form-control sim-stat-input text-center fw-bold" data-slot="${slotNum}" data-stat="Parata" value="${fullPlayer.stats?.Parata?.lv340 || 100}">
                                        </div>
                                    </div>
                                </div>

                                <!-- Colonna 2: Mosse -->
                                <div class="col-12 col-md-4 border-end border-secondary-subtle mb-3 mb-md-0 px-md-3">
                                    <div class="fw-bold mb-3" style="font-size: 0.85rem; color: #198754;"><i class="fas fa-running me-1"></i> LIVELLO MOSSE</div>
                                    ${nativeTechsHtml}
                                    <div class="fw-bold mb-2 mt-4 text-warning" style="font-size: 0.85rem;"><i class="fas fa-book me-1"></i> INSEGNA TECNICA</div>
                                    ${manualTechHtml}
                                </div>

                                <!-- Colonna 3: Passive -->
                                <div class="col-12 col-md-4 ps-md-3">
                                    <div class="fw-bold mb-3" style="font-size: 0.85rem; color: #1a73e8;"><i class="fas fa-bolt me-1"></i> PASSIVE NATIVE</div>
                                    ${passivesHtml || '<span class="text-muted small fst-italic">Nessuna passiva assegnata.</span>'}
                                    
                                    <div class="fw-bold mb-2 mt-4" style="font-size: 0.85rem; color: #d32f2f;"><i class="fas fa-dice me-1"></i> PASSIVE REROLL</div>
                                    ${rerollHtml}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        }

        container.innerHTML = cardsHtml;

        // Listener Globale per far comparire il box di input quando si seleziona "Manuale"
        container.addEventListener('change', (e) => {
            if (e.target.tagName === 'SELECT' &&
                (e.target.classList.contains('sim-tech-lvl') ||
                    e.target.classList.contains('sim-manual-tech-lvl') ||
                    e.target.classList.contains('sim-passive-select') ||
                    e.target.classList.contains('sim-reroll-lvl'))
            ) {
                const input = e.target.nextElementSibling;
                if (input && input.tagName === 'INPUT') {
                    if (e.target.value === 'manual') {
                        input.style.display = 'block';
                        e.target.style.width = 'auto';
                        e.target.style.flexGrow = '1';
                    } else {
                        input.style.display = 'none';
                        e.target.style.width = '100%';
                        e.target.style.flexGrow = '0';
                    }
                }
            }
        });

        // Listener: Attiva livello passiva Reroll
        container.querySelectorAll('.sim-reroll-id').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const slot = e.target.dataset.slot;
                const rIndex = e.target.dataset.rindex;
                const pId = e.target.value;
                const lvlSelect = container.querySelector(`.sim-reroll-lvl[data-slot="${slot}"][data-rindex="${rIndex}"]`);

                if (!pId) {
                    lvlSelect.innerHTML = `<option value="-1">Spenta</option>`;
                    lvlSelect.disabled = true;
                    if(lvlSelect.nextElementSibling) lvlSelect.nextElementSibling.style.display = 'none';
                    return;
                }

                const charId = this.teamRoster[slot];
                const baseChar = characterRegistry.find(c => c.id === charId);
                const role = extractPosition(baseChar?.position) || "FW";
                const rList = rerollPassivesByRole[role] || [];

                const pDef = rList.find(p => p.id === pId);

                if (pDef) {
                    let opts = `<option value="-1">Spenta</option>`;
                    opts += pDef.levels.map((_, idx) => `<option value="${idx}" ${idx===9 ? 'selected' : ''}>Liv ${idx+1}</option>`).join('');
                    opts += `<option value="manual">Manuale</option>`;
                    lvlSelect.innerHTML = opts;
                    lvlSelect.disabled = false;
                }
            });
        });

        // Listener: Attiva livello Mossa Manuale
        container.querySelectorAll('.sim-manual-tech-id').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const slot = e.target.dataset.slot;
                const lvlSelect = container.querySelector(`.sim-manual-tech-lvl[data-slot="${slot}"]`);
                if (e.target.value) {
                    let opts = [...Array(10)].map((_, i) => `<option value="${i}">Lv ${i+1}</option>`).join('');
                    opts += `<option value="manual">Manuale</option>`;
                    lvlSelect.innerHTML = opts;
                    lvlSelect.disabled = false;
                } else {
                    lvlSelect.innerHTML = `<option value="0">Lv 1</option>`;
                    lvlSelect.disabled = true;
                    if(lvlSelect.nextElementSibling) lvlSelect.nextElementSibling.style.display = 'none';
                }
            });
        });

        const modal = new bootstrap.Modal(document.getElementById('simulatorModal'));
        modal.show();
    }

    async runSimulationEngine() {
        if (!this.activeCoachDb) { alert("Scegli un allenatore prima!"); return; }

        let rosterForEngine = [];

        for (const [slotNum, charId] of Object.entries(this.teamRoster)) {
            let fullPlayer;
            try {
                const module = await import(`../Characters/${charId}.js`);
                fullPlayer = module.charData;
            } catch(e) { continue; }

            let pData = { ...fullPlayer };

            pData.customBaseStats = {
                Tiro: parseInt(document.querySelector(`input.sim-stat-input[data-slot="${slotNum}"][data-stat="Tiro"]`)?.value || 0),
                Tecnica: parseInt(document.querySelector(`input.sim-stat-input[data-slot="${slotNum}"][data-stat="Tecnica"]`)?.value || 0),
                Blocco: parseInt(document.querySelector(`input.sim-stat-input[data-slot="${slotNum}"][data-stat="Blocco"]`)?.value || 0),
                Parata: parseInt(document.querySelector(`input.sim-stat-input[data-slot="${slotNum}"][data-stat="Parata"]`)?.value || 0),
            };

            pData.selectedPassiveLevels = {};
            let activePassivesList = [];

            // Funzione Helper per processare le passive manuali iniettando un finto livello 99+slot nel BattleEngine
            const processPassive = (select) => {
                const val = select.value;
                const pid = select.dataset.pid || select.value; // Nelle reroll l'ID è nel select affianco

                if (val === 'manual') {
                    const manualVal = parseInt(select.nextElementSibling.value) || 0;
                    const pDef = passivesLibrary.find(p => p.id === pid);
                    if (pDef) {
                        const fakeLvlIdx = 99 + parseInt(slotNum);
                        pDef.levels[fakeLvlIdx] = { val: manualVal, power: manualVal, val2: manualVal };
                        pData.selectedPassiveLevels[pid] = fakeLvlIdx;
                        activePassivesList.push(pid);
                    }
                } else if(parseInt(val) !== -1) {
                    pData.selectedPassiveLevels[pid] = parseInt(val);
                    activePassivesList.push(pid);
                }
            };

            // Legge i livelli scelti per le passive NATIVE
            document.querySelectorAll(`select.sim-passive-select[data-slot="${slotNum}"]`).forEach(select => processPassive(select));

            // Legge le passive REROLL aggiunte a mano
            document.querySelectorAll(`select.sim-reroll-id[data-slot="${slotNum}"]`).forEach(select => {
                const pId = select.value;
                const rIndex = select.dataset.rindex;
                const lvlSelect = document.querySelector(`select.sim-reroll-lvl[data-slot="${slotNum}"][data-rindex="${rIndex}"]`);

                if (pId && lvlSelect && lvlSelect.value !== '-1') {
                    lvlSelect.dataset.pid = pId; // Assegniamo temporaneamente l'id per la funzione processPassive
                    processPassive(lvlSelect);
                }
            });

            // GESTIONE DELLE MOSSE E CALCOLO BASE POWER (Native + Extra)
            pData.techData = [];

            // Mosse Native
            document.querySelectorAll(`select.sim-tech-lvl[data-slot="${slotNum}"]`).forEach(sel => {
                const techKey = sel.dataset.tech;
                const val = sel.value;
                let basePower = 0;
                const tDef = techniquesLibrary[techKey];

                if (val === 'manual') {
                    basePower = parseInt(sel.nextElementSibling.value) || 0;
                } else {
                    const lvl = parseInt(val) || 0;
                    basePower = tDef && tDef.power ? (parseInt(tDef.power[lvl]) || 0) : 0;
                }

                if(tDef) {
                    pData.techData.push({
                        key: techKey,
                        name: tDef.name,
                        basePower,
                        element: extractElement(tDef.elementIcon),
                        kind: getMoveKindByStat(getStatKeyByIcon(tDef.icon))
                    });
                }
            });

            // Mossa Manuale Extra
            const manTechSel = document.querySelector(`select.sim-manual-tech-id[data-slot="${slotNum}"]`);
            const manLvlSel = document.querySelector(`select.sim-manual-tech-lvl[data-slot="${slotNum}"]`);
            if (manTechSel && manTechSel.value) {
                const techKey = manTechSel.value;
                const val = manLvlSel.value;
                let basePower = 0;
                const tDef = techniquesLibrary[techKey];

                if (val === 'manual') {
                    basePower = parseInt(manLvlSel.nextElementSibling.value) || 0;
                } else {
                    const lvl = parseInt(val) || 0;
                    basePower = tDef && tDef.power ? (parseInt(tDef.power[lvl]) || 0) : 0;
                }

                if(tDef) {
                    pData.myTechniques.push(techKey); // Aggiunta al roster per il Battle Engine
                    pData.techData.push({
                        key: techKey,
                        name: tDef.name,
                        basePower,
                        element: extractElement(tDef.elementIcon),
                        kind: getMoveKindByStat(getStatKeyByIcon(tDef.icon))
                    });
                }
            }

            pData.myBasicPassivesIds = activePassivesList;
            pData.myRarityPassivesIds = [];

            rosterForEngine.push(pData);
        }

        const engine = new BattleEngine();
        engine.startMatch(rosterForEngine, []);

        rosterForEngine.forEach((pData, index) => {
            const enginePlayer = engine.homeTeam[index];
            const coachBuffs = calculateCoachBuffs(pData, this.activeCoachDb, 10);

            enginePlayer.matchStats.Tiro += coachBuffs.statBuffs.Tiro || 0;
            enginePlayer.matchStats.Tecnica += coachBuffs.statBuffs.Tecnica || 0;
            enginePlayer.matchStats.Blocco += coachBuffs.statBuffs.Blocco || 0;
            enginePlayer.matchStats.Parata += coachBuffs.statBuffs.Parata || 0;

            // Salviamo i buff potenza dell'allenatore per applicarli dopo alle mosse
            pData.coachPowerBuffs = coachBuffs.powerBuffs;
        });

        rosterForEngine.forEach((pData, index) => {
            const slotNum = Object.keys(this.teamRoster)[index];
            const ePlayer = engine.homeTeam[index];
            const resBox = document.getElementById(`sim-result-${slotNum}`);

            // Statistiche Base Finali
            const diffTiro = ePlayer.matchStats.Tiro - pData.customBaseStats.Tiro;
            const diffTec = ePlayer.matchStats.Tecnica - pData.customBaseStats.Tecnica;
            const diffBlo = ePlayer.matchStats.Blocco - pData.customBaseStats.Blocco;
            const diffPar = ePlayer.matchStats.Parata - pData.customBaseStats.Parata;

            let statsHtml = `
                <div class="d-flex flex-column gap-1 pe-2 border-end border-secondary-subtle">
                    <div class="fw-bold" style="color: #dc3545; font-size: 0.9rem;">Tir: ${ePlayer.matchStats.Tiro} <span class="badge bg-danger-subtle text-danger ms-1">+${diffTiro}</span></div>
                    <div class="fw-bold" style="color: #198754; font-size: 0.9rem;">Tec: ${ePlayer.matchStats.Tecnica} <span class="badge bg-success-subtle text-success ms-1">+${diffTec}</span></div>
                    <div class="fw-bold" style="color: #6c757d; font-size: 0.9rem;">Blc: ${ePlayer.matchStats.Blocco} <span class="badge bg-secondary-subtle text-secondary ms-1">+${diffBlo}</span></div>
                    <div class="fw-bold" style="color: #ffc107; font-size: 0.9rem; text-shadow: 0 0 1px #000;">Par: ${ePlayer.matchStats.Parata} <span class="badge bg-warning-subtle text-dark ms-1">+${diffPar}</span></div>
                </div>
            `;

            // Potenza delle Mosse
            let techsHtml = '';
            if (pData.techData && pData.techData.length > 0) {
                techsHtml += '<div class="d-flex flex-column gap-1 ps-2 justify-content-center">';

                pData.techData.forEach(t => {
                    let passivePowerBuff = 0;

                    // Somma Buff del Battle Engine
                    ePlayer.moveBuffs.forEach(buff => {
                        let applicabile = true;
                        if (buff.kind && buff.kind !== "All" && buff.kind !== t.kind) applicabile = false;
                        if (buff.element && buff.element !== "All" && buff.element !== t.element) applicabile = false;
                        if (buff.moveName && buff.moveName !== t.name && buff.moveName !== t.key) applicabile = false;
                        if (applicabile) passivePowerBuff += buff.bonus;
                    });

                    // Somma Buff dell'Allenatore
                    if (pData.coachPowerBuffs && pData.coachPowerBuffs[t.kind]) {
                        passivePowerBuff += pData.coachPowerBuffs[t.kind];
                    }

                    const totalPower = t.basePower + passivePowerBuff;
                    const cleanName = t.name.indexOf(' (') !== -1 ? t.name.substring(0, t.name.indexOf(' (')) : t.name;

                    techsHtml += `
                        <div class="fw-bold text-dark text-truncate" style="font-size: 0.85rem; max-width: 140px;" title="${t.name}">
                            ${cleanName}: <span class="text-primary">${totalPower}</span> <span class="badge bg-primary-subtle text-primary ms-1">+${passivePowerBuff}</span>
                        </div>
                    `;
                });

                techsHtml += '</div>';
            }

            resBox.innerHTML = `
                <div class="d-flex align-items-center justify-content-end text-start">
                    ${statsHtml}
                    ${techsHtml}
                </div>
            `;
        });

        const successMsg = document.getElementById('sim-total-power');
        if(successMsg) successMsg.style.display = 'block';
    }
}

new TeamBuilderController();