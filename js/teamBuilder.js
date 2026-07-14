// js/teamBuilder.js
import { coachRegistry } from './Coaches/registry.js';
import { characterRegistry } from './Characters/registry.js';
import { fetchCoachData, filterCharacters } from './utils.js';

let currentCoachId = '';
let activeCoachDb = null;
let teamRoster = {};
let activeSelection = null; // Memorizza la selezione attiva: { type: 'slot'|'char', value: ID }
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
                    el.setAttribute('data-value', val);
                    const option = el.querySelector(`.select-items div[data-value="${val}"]`) || el.querySelector('.select-items div');
                    if (option) {
                        el.setAttribute('data-value', option.getAttribute('data-value'));
                        el.querySelector('.select-selected span').innerHTML = option.innerHTML;
                    }
                }
            };

            // USIAMO I NUOVI ID UNIFICATI
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
    // Aspettiamo un istante per assicurarci che il componente <inazuma-filters> sia generato
    setTimeout(async () => {
        loadTeamState();
        restoreFilters();

        setupCustomSelects();

        const searchInput = document.getElementById('search-name');
        if(searchInput) searchInput.addEventListener('input', applyFilters);

        const btnReset = document.getElementById('btn-reset-filters');
        if(btnReset) btnReset.addEventListener('click', resetFilters);

        document.getElementById('btn-remove-player').addEventListener('click', removePlayerFromSlot);

        if (!currentCoachId || !coachRegistry.some(c => c.id === currentCoachId)) {
            currentCoachId = 'percivalTravis';
        }
        await selectCoach(currentCoachId);
        applyFilters();
    }, 100);
});

// ==========================================
// FUNZIONAMENTO MENU A TENDINA E FILTRI
// ==========================================
function setupCustomSelects() {
    const customSelects = document.querySelectorAll(".custom-select");
    customSelects.forEach(selElmnt => {
        const selectedDiv = selElmnt.querySelector(".select-selected");
        const itemsDiv = selElmnt.querySelector(".select-items");
        if (!selectedDiv || !itemsDiv) return;

        const optionDivs = itemsDiv.querySelectorAll("div");

        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            itemsDiv.classList.toggle("select-hide");
        });

        optionDivs.forEach(opt => {
            opt.addEventListener("click", function(e) {
                const val = this.getAttribute("data-value");
                selElmnt.setAttribute("data-value", val);
                selectedDiv.querySelector("span").innerHTML = this.innerHTML;
                itemsDiv.classList.add("select-hide");
                applyFilters();
            });
        });
    });
    document.addEventListener("click", closeAllSelect);
}

function closeAllSelect(elmnt) {
    const items = document.getElementsByClassName("select-items");
    const selectedDivs = document.getElementsByClassName("select-selected");
    for (let i = 0; i < selectedDivs.length; i++) {
        if (elmnt !== selectedDivs[i]) {
            items[i].classList.add("select-hide");
        }
    }
}

function resetFilters() {
    const searchInput = document.getElementById('search-name');
    if(searchInput) searchInput.value = '';

    const selects = document.querySelectorAll('.custom-select');
    selects.forEach(sel => {
        const firstOption = sel.querySelector('.select-items div');
        if(firstOption) {
            sel.setAttribute("data-value", firstOption.getAttribute("data-value"));
            sel.querySelector('.select-selected span').innerHTML = firstOption.innerHTML;
        }
    });
    applyFilters();
}

async function applyFilters() {
    // USIAMO I NUOVI ID UNIFICATI
    const filters = {
        name: document.getElementById('search-name')?.value || '',
        position: document.getElementById('filter-position')?.getAttribute('data-value') || 'All',
        element: document.getElementById('filter-element')?.getAttribute('data-value') || 'All',
        rarity: document.getElementById('filter-rarity')?.getAttribute('data-value') || 'All',
        style: document.getElementById('filter-style')?.getAttribute('data-value') || 'All',
        team: document.getElementById('filter-team')?.getAttribute('data-value') || 'All',
        season: document.getElementById('filter-season')?.getAttribute('data-value') || 'All'
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

    // RENDERIZZA LA BOX DELLE CONDIZIONI
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
// INTERAZIONE CAMPO (Click, Scambio, Spostamento)
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
        // Nulla selezionato: seleziono questo slot in campo
        activeSelection = { type: 'slot', value: slotNumber };
    } else if (activeSelection.type === 'slot') {
        if (activeSelection.value === slotNumber) {
            // Deseleziona se riclicchi lo stesso
            activeSelection = null;
        } else {
            // SCAMBIO O SPOSTAMENTO DA UNO SLOT ALL'ALTRO
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
        // ASSEGNAZIONE: Ho selezionato prima un PG dalla lista a destra, e ora clicco il campo
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
        // Evidenzia visivamente se il personaggio è attualmente il "bersaglio attivo"
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
        // Seleziono il giocatore dalla lista
        activeSelection = { type: 'char', value: charId };
    } else if (activeSelection.type === 'char') {
        if (activeSelection.value === charId) {
            activeSelection = null; // Deseleziona
        } else {
            activeSelection = { type: 'char', value: charId }; // Cambia selezione
        }
    } else if (activeSelection.type === 'slot') {
        // ASSEGNAZIONE: Ho prima cliccato il campo, ora clicco il PG
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