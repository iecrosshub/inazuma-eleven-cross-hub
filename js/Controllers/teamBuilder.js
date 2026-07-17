// js/Controllers/teamBuilder.js

import { coachRegistry } from '../Coaches/registry.js';
import { characterRegistry, fetchCoachData } from '../Core/database.js';
import { filterCharacters } from '../Core/roster.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

let currentCoachId = '';
let activeCoachDb = null;
let teamRoster = {};
let activeSelection = null;
let lastFilteredList = characterRegistry;

// ==========================================
// SALVATAGGIO E CARICAMENTO MEMORIA
// ==========================================
function saveTeamState() {
    localStorage.setItem('tb_roster', JSON.stringify(teamRoster));
    localStorage.setItem('tb_coach', currentCoachId);
}

function loadTeamState() {
    const savedRoster = localStorage.getItem('tb_roster');
    const savedCoach = localStorage.getItem('tb_coach');

    if (savedRoster) {
        try { teamRoster = JSON.parse(savedRoster); } catch(e) { teamRoster = {}; }
    }
    if (savedCoach) {
        currentCoachId = savedCoach;
    }
}

function restoreFilters() {
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

// ==========================================
// INIZIALIZZAZIONE PAGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(async () => {
        loadTeamState();
        restoreFilters();

        // Uso del Componente Universale
        document.querySelectorAll(".custom-select").forEach(sel => {
            initCustomSelect(sel, () => applyFilters());
        });
        setupGlobalSelectClose();

        const searchInput = document.getElementById('search-name');
        if(searchInput) searchInput.addEventListener('input', applyFilters);

        const btnReset = document.getElementById('btn-reset-filters');
        if(btnReset) btnReset.addEventListener('click', resetFilters);

        document.getElementById('btn-remove-player').addEventListener('click', removePlayerFromSlot);

        // Collegamento tasto Tutorial
        const btnTutorial = document.getElementById('btn-tutorial');
        if (btnTutorial) btnTutorial.addEventListener('click', startTutorial);

        if (!currentCoachId || !coachRegistry.some(c => c.id === currentCoachId)) {
            currentCoachId = 'percivalTravis';
        }
        await selectCoach(currentCoachId);
        applyFilters();

        // Avvio tutorial automatico
        if (!localStorage.getItem('tutorial_teambuilder_seen')) {
            setTimeout(startTutorial, 800);
        }
    }, 100);
});

function resetFilters() {
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
    applyFilters();
}

async function applyFilters() {
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

    lastFilteredList = await filterCharacters(characterRegistry, filters);
    renderPlayerGrid(lastFilteredList);
}

// ==========================================
// ALLENATORE E RENDER
// ==========================================
function renderSidebar() {
    const listContainer = document.getElementById('coach-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    coachRegistry.forEach(coach => {
        const btn = document.createElement('div');
        btn.className = `coach-btn ${coach.id === currentCoachId ? 'active' : ''}`;
        btn.innerHTML = `
            <img src="${coach.thumb}" onerror="this.src='https://placehold.co/50'">
            <div class="coach-btn-info">
                <strong>${coach.name}</strong>
            </div>
        `;
        btn.onclick = () => selectCoach(coach.id);
        listContainer.appendChild(btn);
    });
}

async function selectCoach(id) {
    currentCoachId = id;
    activeSelection = null;
    saveTeamState();

    toggleRemoveButton();
    renderSidebar();

    activeCoachDb = await fetchCoachData(id);
    if (!activeCoachDb) return;

    document.getElementById('coach-name').textContent = activeCoachDb.name;

    const portrait = document.getElementById('coach-portrait');
    if (activeCoachDb.thumb) {
        portrait.src = activeCoachDb.thumb;
        portrait.style.display = 'block';
    } else {
        portrait.style.display = 'none';
    }

    const teamHeader = document.getElementById('team-name-header');
    teamHeader.textContent = activeCoachDb.formationName;
    teamHeader.style.display = 'flex';

    const condBox = document.getElementById('tb-conditions-box');
    const condList = document.getElementById('tb-conditions-list');

    if (activeCoachDb.formationConditions && activeCoachDb.formationConditions.length > 0) {
        condList.innerHTML = activeCoachDb.formationConditions.map(cond => {
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

    renderPitch();
    renderPlayerGrid(lastFilteredList);
}

// ==========================================
// INTERAZIONE CAMPO E GIOCATORI
// ==========================================
function renderPitch() {
    const pitchContainer = document.getElementById('pitch-container');
    if (!activeCoachDb) return;

    const conditionSlots = activeCoachDb.formationConditions ? activeCoachDb.formationConditions.map(c => c.slotCode) : [];

    pitchContainer.innerHTML = activeCoachDb.slots.map(slot => {
        const playerId = teamRoster[slot.number];
        const isSelectedClass = (activeSelection && activeSelection.type === 'slot' && activeSelection.value === slot.number) ? 'active-selection' : '';
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

window.handleSlotClick = function(slotNumber) {
    if (!activeSelection) {
        activeSelection = { type: 'slot', value: slotNumber };
    } else if (activeSelection.type === 'slot') {
        if (activeSelection.value === slotNumber) {
            activeSelection = null;
        } else {
            const slotA = activeSelection.value;
            const slotB = slotNumber;
            const charA = teamRoster[slotA];
            const charB = teamRoster[slotB];

            if (charB) teamRoster[slotA] = charB; else delete teamRoster[slotA];
            if (charA) teamRoster[slotB] = charA; else delete teamRoster[slotB];

            activeSelection = null;
            saveTeamState();
        }
    } else if (activeSelection.type === 'char') {
        const charId = activeSelection.value;
        for (const [key, val] of Object.entries(teamRoster)) {
            if (val === charId) delete teamRoster[key];
        }
        teamRoster[slotNumber] = charId;
        activeSelection = null;
        saveTeamState();
    }

    renderPitch();
    renderPlayerGrid(lastFilteredList);
    toggleRemoveButton();
};

function renderPlayerGrid(playersList) {
    const grid = document.getElementById('player-grid-container');
    grid.innerHTML = '';

    playersList.forEach(char => {
        const isSelected = (activeSelection && activeSelection.type === 'char' && activeSelection.value === char.id);
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
        card.onclick = () => assignPlayerToSlot(char.id);
        grid.appendChild(card);
    });
}

window.assignPlayerToSlot = function(charId) {
    if (!activeSelection) {
        activeSelection = { type: 'char', value: charId };
    } else if (activeSelection.type === 'char') {
        if (activeSelection.value === charId) {
            activeSelection = null;
        } else {
            activeSelection = { type: 'char', value: charId };
        }
    } else if (activeSelection.type === 'slot') {
        const slotNumber = activeSelection.value;
        for (const [key, val] of Object.entries(teamRoster)) {
            if (val === charId) delete teamRoster[key];
        }
        teamRoster[slotNumber] = charId;
        activeSelection = null;
        saveTeamState();
    }

    renderPitch();
    renderPlayerGrid(lastFilteredList);
    toggleRemoveButton();
};

function toggleRemoveButton() {
    const btn = document.getElementById('btn-remove-player');
    if (activeSelection && activeSelection.type === 'slot' && teamRoster[activeSelection.value]) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
}

function removePlayerFromSlot() {
    if (activeSelection && activeSelection.type === 'slot') {
        delete teamRoster[activeSelection.value];
        activeSelection = null;
        saveTeamState();
        renderPitch();
        renderPlayerGrid(lastFilteredList);
        toggleRemoveButton();
    }
}

// ==========================================
// TUTORIAL INTRO.JS
// ==========================================
function startTutorial() {
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
                intro: "<div style='text-align: center;'>" +
                    "<h4 class='text-primary fw-bold mb-3' style='text-transform: uppercase; letter-spacing: 1px;'>📋 Team Builder</h4>" +
                    "<p>Benvenuto nel creatore di formazioni!<br><br>" +
                    "Qui puoi costruire il tuo <strong>Team</strong>, verificare le sinergie visive e studiare i requisiti dell'allenatore.</p>" +
                    "</div>"
            },
            {
                element: document.querySelector('.sidebar-left'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-info fw-bold mb-3' style='text-transform: uppercase;'>👔 Scegli l'Allenatore</h5>" +
                    "<p>Tutto parte da qui!<br><br>Seleziona un allenatore per caricare immediatamente la sua <strong>formazione base</strong> sul campo centrale.</p>" +
                    "</div>",
                position: 'right'
            },
            {
                element: document.querySelector('.sidebar-right'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-warning fw-bold mb-3' style='text-transform: uppercase;'>🔍 Trova i Giocatori</h5>" +
                    "<p>Usa i filtri o la barra di ricerca per trovare i giocatori perfetti per la tua strategia.<br><br>Fai molta attenzione al riquadro scuro delle <strong>Condizioni Allenatore</strong> se vuoi massimizzare le passive!</p>" +
                    "</div>",
                position: 'left'
            },
            {
                element: document.querySelector('.pitch-container-wrapper'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-success fw-bold mb-3' style='text-transform: uppercase;'>⚽ Schiera la Squadra</h5>" +
                    "<p>Il sistema di assegnazione è semplicissimo:<br><br>" +
                    "1️⃣ Clicca su un <strong>giocatore</strong> a destra.<br>" +
                    "2️⃣ Clicca su uno <strong>slot vuoto</strong> sul campo per posizionarlo.<br><br>" +
                    "Vuoi scambiare due giocatori in campo? Ti basta <strong>cliccare prima l'uno e poi l'altro!</strong></p>" +
                    "</div>",
                position: 'top'
            }
        ]
    }).start();
}