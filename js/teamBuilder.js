import { coachRegistry } from './Coaches/registry.js';
import { characterRegistry } from './Characters/registry.js';

let currentCoachId = '';
let activeCoachDb = null;
let currentSelectedSlot = null;
let teamRoster = {};

async function init() {
    renderSidebar();

    // 1. SETUP CUSTOM SELECTS
    setupCustomSelects();

    // 2. Eventi Filtri Base
    document.getElementById('filter-name').addEventListener('input', applyFilters);
    document.getElementById('btn-reset-filters').addEventListener('click', resetFilters);
    document.getElementById('btn-remove-player').addEventListener('click', removePlayerFromSlot);

    // 3. Renderizza griglia giocatori iniziale
    renderPlayerGrid(characterRegistry);

    // --- AGGIUNTA PER PRESELEZIONE ---
    // Sostituisci 'percival_travis' con l'id esatto che trovi nel tuo registro
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

        // Quando clicchi la riga principale del menu
        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this); // Chiude gli altri
            itemsDiv.classList.toggle("select-hide"); // Apre questo
        });

        // Quando clicchi un'opzione interna
        for (let j = 0; j < optionDivs.length; j++) {
            optionDivs[j].addEventListener("click", function(e) {
                // Aggiorna il valore invisibile e il testo visibile
                const val = this.getAttribute("data-value");
                selElmnt.setAttribute("data-value", val);

                // Clona l'HTML (immagine + testo) nel bottone principale
                selectedDiv.querySelector("span").innerHTML = this.innerHTML;

                // Nascondi il menu e applica filtri
                itemsDiv.classList.add("select-hide");
                applyFilters();
            });
        }
    }

    // Chiude i menu se si clicca da qualsiasi altra parte nello schermo
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

// Resetta i menu custom allo stato iniziale
function resetFilters() {
    document.getElementById('filter-name').value = '';

    const selects = document.querySelectorAll('.custom-select');
    selects.forEach(sel => {
        sel.setAttribute("data-value", "");
        // Prende il primo elemento (l'opzione vuota "Tutti...")
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

async function selectCoach(id) {
    currentCoachId = id;
    teamRoster = {};
    currentSelectedSlot = null;
    toggleRemoveButton();
    renderSidebar();

    try {
        const module = await import(`./Coaches/${id}.js`);
        activeCoachDb = module.coachData;

        // 1. Nome Allenatore
        document.getElementById('coach-name').textContent = activeCoachDb.name;

        // 2. Immagine Ritratto
        const portrait = document.getElementById('coach-portrait');
        if (activeCoachDb.thumb) {
            portrait.src = activeCoachDb.thumb;
            portrait.style.display = 'block';
        } else {
            portrait.style.display = 'none';
        }

        // 3. Tendina Livelli (CONTROLLO DI SICUREZZA AGGIUNTO)
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

        // 4. Barra Blu Squadra
        const teamHeader = document.getElementById('team-name-header');
        teamHeader.textContent = activeCoachDb.formationName;
        teamHeader.style.display = 'flex';

        renderPitch();
    } catch (err) {
        console.error("Errore caricamento modulo allenatore:", err);
    }
}

function renderPitch() {
    const pitchContainer = document.getElementById('pitch-container');
    if (!activeCoachDb) return;

    pitchContainer.innerHTML = activeCoachDb.slots.map(slot => {
        const playerId = teamRoster[slot.number];
        const isSelectedClass = currentSelectedSlot === slot.number ? 'active-selection' : '';

        if (playerId) {
            const player = characterRegistry.find(c => c.id === playerId);
            // MODIFICA: Rimosso il tag <strong>${slot.number}</strong> da qui
            return `
                <div class="pitch-slot has-player ${isSelectedClass}" style="top: ${slot.y}%; left: ${slot.x}%;" onclick="handleSlotClick(${slot.number})">
                    <img src="${slot.baseAsset}" class="role-icon" alt="${slot.position}">
                    <img src="${player.thumb}" class="player-thumb" onerror="this.src='https://placehold.co/65'">
                </div>
            `;
        } else {
            // Se non c'è il giocatore, mostra normalmente maglietta e numero
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
// FILTRAGGIO LOGICA
// ==========================================
async function applyFilters() {
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const roleFilter = document.getElementById('custom-role').getAttribute('data-value');
    const elementFilter = document.getElementById('custom-element').getAttribute('data-value');
    const styleFilter = document.getElementById('custom-style').getAttribute('data-value');
    const teamFilter = document.getElementById('custom-team').getAttribute('data-value');
    const seasonFilter = document.getElementById('custom-season').getAttribute('data-value');

    const isAdvancedFilterActive = styleFilter || teamFilter || seasonFilter;

    let results = [];

    for (let char of characterRegistry) {
        if (nameFilter && !char.name.toLowerCase().includes(nameFilter) && !char.japaneseName.toLowerCase().includes(nameFilter)) continue;
        if (roleFilter && !char.position.includes(roleFilter)) continue;
        if (elementFilter && !char.element.includes(elementFilter)) continue;

        if (isAdvancedFilterActive) {
            try {
                const module = await import(`./Characters/${char.id}.js`);
                const fullCharData = module.charData;
                const allTagsRaw = fullCharData.tags ? fullCharData.tags.join('').toLowerCase() : '';

                if (styleFilter && !allTagsRaw.includes(`ability_${styleFilter.toLowerCase()}`)) continue;
                if (teamFilter && !allTagsRaw.includes(`team_${teamFilter.toLowerCase()}`)) continue;
                if (seasonFilter && !allTagsRaw.includes(`title_${seasonFilter.toLowerCase()}`)) continue;

            } catch (err) {
                console.error("Errore caricamento dati giocatore:", char.id);
                continue;
            }
        }

        results.push(char);
    }

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