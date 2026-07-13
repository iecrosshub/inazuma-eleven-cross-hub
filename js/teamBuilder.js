// js/teamBuilder.js
import { coachRegistry } from './Coaches/registry.js';
import { characterRegistry } from './Characters/registry.js';
import { fetchCoachData, filterCharacters } from './utils.js'; // Le nostre utility!

let currentCoachId = '';
let activeCoachDb = null;
let currentSelectedSlot = null;
let teamRoster = {};

async function init() {
    renderSidebar();
    setupCustomSelects();

    document.getElementById('filter-name').addEventListener('input', applyFilters);
    document.getElementById('btn-reset-filters').addEventListener('click', resetFilters);
    document.getElementById('btn-remove-player').addEventListener('click', removePlayerFromSlot);

    renderPlayerGrid(characterRegistry);
    selectCoach('percivalTravis');
}

// ==========================================
// FUNZIONAMENTO DEI MENU A TENDINA CUSTOM
// ==========================================
function setupCustomSelects() {
    const customSelects = document.getElementsByClassName("custom-select");
    for (let i = 0; i < customSelects.length; i++) {
        const selElmnt = customSelects[i];
        const selectedDiv = selElmnt.querySelector(".select-selected");
        const itemsDiv = selElmnt.querySelector(".select-items");
        const optionDivs = itemsDiv.getElementsByTagName("DIV");

        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            itemsDiv.classList.toggle("select-hide");
        });

        for (let j = 0; j < optionDivs.length; j++) {
            optionDivs[j].addEventListener("click", function(e) {
                const val = this.getAttribute("data-value");
                selElmnt.setAttribute("data-value", val);
                selectedDiv.querySelector("span").innerHTML = this.innerHTML;
                itemsDiv.classList.add("select-hide");
                applyFilters();
            });
        }
    }
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
    document.getElementById('filter-name').value = '';
    const selects = document.querySelectorAll('.custom-select');
    selects.forEach(sel => {
        sel.setAttribute("data-value", "");
        const firstOptionHtml = sel.querySelector('.select-items div').innerHTML;
        sel.querySelector('.select-selected span').innerHTML = firstOptionHtml;
    });
    applyFilters();
}

// ==========================================
// ALLENATORE E CAMPO
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

// Guarda quanto è snella grazie a fetchCoachData!
async function selectCoach(id) {
    currentCoachId = id;
    teamRoster = {};
    currentSelectedSlot = null;
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

    const levelSelect = document.getElementById('coach-level-select');
    levelSelect.innerHTML = '';
    if (activeCoachDb.levels && Array.isArray(activeCoachDb.levels)) {
        activeCoachDb.levels.forEach(lv => {
            const opt = document.createElement('option');
            opt.value = lv.level;
            opt.textContent = `Lv.${lv.level}`;
            levelSelect.appendChild(opt);
        });
        levelSelect.style.display = 'block';
    } else {
        levelSelect.style.display = 'none';
    }

    const teamHeader = document.getElementById('team-name-header');
    teamHeader.textContent = activeCoachDb.formationName;
    teamHeader.style.display = 'flex';

    renderPitch();
}

function renderPitch() {
    const pitchContainer = document.getElementById('pitch-container');
    if (!activeCoachDb) return;

    pitchContainer.innerHTML = activeCoachDb.slots.map(slot => {
        const playerId = teamRoster[slot.number];
        const isSelectedClass = currentSelectedSlot === slot.number ? 'active-selection' : '';

        if (playerId) {
            const player = characterRegistry.find(c => c.id === playerId);
            return `
                <div class="pitch-slot has-player ${isSelectedClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                    <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                    <img src="${player.thumb}" class="player-thumb" onerror="this.src='https://placehold.co/65'">
                </div>
            `;
        } else {
            return `
                <div class="pitch-slot ${isSelectedClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                    <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                    <strong>${slot.number}</strong>
                </div>
            `;
        }
    }).join('');
}

window.handleSlotClick = function(slotNumber) {
    if(currentSelectedSlot === slotNumber) {
        currentSelectedSlot = null;
    } else {
        currentSelectedSlot = slotNumber;
    }
    renderPitch();
    toggleRemoveButton();
};

function toggleRemoveButton() {
    const btn = document.getElementById('btn-remove-player');
    if (currentSelectedSlot !== null && teamRoster[currentSelectedSlot]) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
}

function removePlayerFromSlot() {
    if (currentSelectedSlot !== null) {
        delete teamRoster[currentSelectedSlot];
        currentSelectedSlot = null;
        renderPitch();
        toggleRemoveButton();
    }
}

// ==========================================
// FILTRAGGIO LOGICA (Ora passa tutto per utils!)
// ==========================================
async function applyFilters() {
    // 1. Raccogliamo i valori dai custom select (Nota gli ID diversi dall'HTML)
    const filters = {
        name: document.getElementById('filter-name').value,
        position: document.getElementById('custom-role').getAttribute('data-value'),
        element: document.getElementById('custom-element').getAttribute('data-value'),
        style: document.getElementById('custom-style').getAttribute('data-value'),
        team: document.getElementById('custom-team').getAttribute('data-value'),
        season: document.getElementById('custom-season').getAttribute('data-value')
    };

    // 2. Chiediamo a utils.js di fare il lavoro asincrono
    const results = await filterCharacters(characterRegistry, filters);

    // 3. Stampiamo i risultati nella barra laterale
    renderPlayerGrid(results);
}

function renderPlayerGrid(playersList) {
    const grid = document.getElementById('player-grid-container');
    grid.innerHTML = '';

    playersList.forEach(char => {
        const card = document.createElement('div');
        card.className = 'tb-player-card';
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

function assignPlayerToSlot(charId) {
    if (currentSelectedSlot !== null) {
        for (const [slot, id] of Object.entries(teamRoster)) {
            if (id === charId) delete teamRoster[slot];
        }
        teamRoster[currentSelectedSlot] = charId;
        currentSelectedSlot = null;
        renderPitch();
        toggleRemoveButton();
    } else {
        alert("Clicca prima su un ruolo nel campo per selezionarlo!");
    }
}

document.addEventListener('DOMContentLoaded', init);