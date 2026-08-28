// js/Controllers/character.js

import { characterRegistry, getPopulatedCharacter, rerollPassivesByRole } from '../Core/database.js';
import { getAdjacentCharacterId, parsePassiveText, extractPosition } from '../Core/parsers.js';
import { calcolaStatisticheEsatte } from '../Core/calculator.js';

let db1 = null;
let db2 = null;
let currentId1 = '';

// ==========================================
// 1. INIZIALIZZAZIONE
// ==========================================

async function init() {
    const currentUrl = new URL(window.location.href);
    let clickedId = currentUrl.searchParams.get('id');

    if (clickedId && clickedId.trim() !== "") {
        currentId1 = clickedId;
    } else {
        currentId1 = localStorage.getItem('selectedChar') || 'byronLoveZeus';
    }

    localStorage.setItem('selectedChar', currentId1);

    db1 = await fetchCharacterData(currentId1);
    if(db1) {
        populateCharacterUI(db1, 1);
    }

    setupNavigationControls();
    setupCompareControls();
}

async function fetchCharacterData(charId) {
    try {
        const module = await import(`../Characters/${charId}.js`);
        let charDb = getPopulatedCharacter(module.charData);

        if (charDb.growth_pattern_code) {
            const stats1 = calcolaStatisticheEsatte(charDb, 1, 9, 1);
            const stats300 = calcolaStatisticheEsatte(charDb, 300, 9, 1);
            if (stats1 && stats300) {
                charDb.stats = {
                    "TP": { lv1: stats1.tp || 100, lv300: stats300.tp || 100 },
                    "Tiro": { lv1: stats1.kick, lv300: stats300.kick },
                    "Tecnica": { lv1: stats1.technique, lv300: stats300.technique },
                    "Blocco": { lv1: stats1.block, lv300: stats300.block },
                    "Parata": { lv1: stats1.catch, lv300: stats300.catch },
                    "Velocità": { lv1: stats1.speed, lv300: stats300.speed }
                };
            }
        }

        if (!charDb.stats || Object.keys(charDb.stats).length === 0) {
            charDb.stats = {
                "TP": { lv1: 100, lv300: 100 }, "Tiro": { lv1: 100, lv300: 100 }, "Tecnica": { lv1: 100, lv300: 100 },
                "Blocco": { lv1: 100, lv300: 100 }, "Parata": { lv1: 100, lv300: 100 }, "Velocità": { lv1: 100, lv300: 100 }
            };
        }
        return charDb;
    } catch (err) {
        console.error("Errore fetch pg:", charId, err);
        return null;
    }
}

// ==========================================
// 2. FUNZIONI DI POPOLAMENTO UI
// ==========================================

function populateCharacterUI(db, slot) {
    document.getElementById(`char-name-main-${slot}`).textContent = `${db.name} (${db.romanizedName})`;
    document.getElementById(`char-name-jp-${slot}`).textContent = db.japaneseName;
    document.getElementById(`char-img-${slot}`).src = db.characterImg || db.thumb;
    document.getElementById(`element-icon-${slot}`).src = db.element;
    document.getElementById(`position-icon-${slot}`).src = db.position;

    const tagsContainer = document.getElementById(`tags-container-${slot}`);
    if (tagsContainer && db.tags) {
        tagsContainer.innerHTML = db.tags.map(t => `<img src="${t}" style="height: 38px;">`).join('');
    }

    renderStats(db, 'lv1', slot);
    renderTechniques(db, slot);
    renderPassives(db, slot);
}

function renderStats(db, level, slot) {
    const statsList = document.getElementById(`stats-list-${slot}`);
    statsList.innerHTML = '';

    document.getElementById(`btn-lv1-${slot}`).classList.toggle('active', level === 'lv1');
    document.getElementById(`btn-lv300-${slot}`).classList.toggle('active', level === 'lv300');

    const icons = {
        "TP": "img/Status/Icon_Status_TP.png", "Tiro": "img/Status/Icon_Status_Kick.png",
        "Tecnica": "img/Status/Icon_Status_Technic.png", "Blocco": "img/Status/Icon_Status_Block.png",
        "Parata": "img/Status/Icon_Status_Catch.png", "Velocità": "img/Status/Icon_Status_Speed.png"
    };

    Object.entries(db.stats).forEach(([key, data]) => {
        const iconSrc = icons[key] || data.icon || '';
        statsList.innerHTML += `
            <li>
                <span class="d-flex align-items-center gap-2">
                    <img src="${iconSrc}" style="height: 24px;" alt="${key}">
                    ${key}
                </span>
                <span>${data[level]}</span>
            </li>`;
    });

    const zonesContainer = document.getElementById(`zones-container-${slot}`);
    if (zonesContainer) zonesContainer.innerHTML = createZonesGrid(db.zones || []);
}

function renderTechniques(db, slot) {
    // FIX: Ora targetta esattamente il contenitore corretto senza iniettare H3 doppi
    const container = document.getElementById(`tecniche-container-${slot}`);
    if (!container) return;
    container.innerHTML = '';

    if (!db.techniques || Object.keys(db.techniques).length === 0) {
        container.innerHTML = '<p class="text-secondary fw-bold mt-3">Nessuna tecnica disponibile.</p>';
        return;
    }

    let html = '';

    for (const [key, tech] of Object.entries(db.techniques)) {
        let rowsHtml = '';
        if (tech.power) rowsHtml += `<tr><th class="text-start">Potenza</th>${tech.power.map(v => `<td>${v}</td>`).join('')}</tr>`;
        if (tech.tp) rowsHtml += `<tr><th class="text-start">Costo TP</th>${tech.tp.map(v => `<td>${v}</td>`).join('')}</tr>`;
        if (tech.range) rowsHtml += `<tr><th class="text-start">Portata</th>${tech.range.map(v => `<td>${v}</td>`).join('')}</tr>`;
        if (tech.foul) rowsHtml += `<tr><th class="text-start">% Fallo</th>${tech.foul.map(v => `<td>${v}%</td>`).join('')}</tr>`;
        if (tech.crit) rowsHtml += `<tr><th class="text-start">% Critico</th>${tech.crit.map(v => `<td>${v}%</td>`).join('')}</tr>`;

        let badgesHtml = '';
        if (tech.kind) badgesHtml += `<span class="badge bg-secondary me-1 mb-1">${tech.kind}</span>`;
        if (tech.element) badgesHtml += `<span class="badge bg-secondary me-1 mb-1">${tech.element}</span>`;
        if (tech.chain) badgesHtml += `<span class="badge bg-warning text-dark me-1 mb-1">Shoot Chain</span>`;
        if (tech.shootBlock) badgesHtml += `<span class="badge bg-info text-dark me-1 mb-1">Blocco Tiri</span>`;
        if (tech.catchType) badgesHtml += `<span class="badge bg-primary me-1 mb-1">${tech.catchType}</span>`;

        html += `
        <div class="card mb-3 shadow-sm border-secondary">
            <div class="card-header d-flex align-items-center">
                <img src="${tech.icon}" alt="Icon" class="me-2" style="width: 28px; height: 28px;">
                <img src="${tech.elementIcon}" alt="Element" class="me-2" style="width: 28px; height: 28px;">
                <h5 class="mb-0 text-info fw-bold" style="font-size: 1.1rem;">${tech.name}</h5>
            </div>
            <div class="card-body p-2">
                <div class="mb-2 ps-1">${badgesHtml}</div>
                <div class="table-responsive">
                    <table class="table table-sm text-center align-middle mb-0" style="font-size: 0.85rem;">
                        <thead>
                            <tr>
                                <th class="text-start" style="width: 15%;">Statistica / Lv</th>
                                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(lv => `<th>${lv}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>`;
    }
    container.innerHTML = html;
}

function renderPassives(db, slot) {
    // FIX: Nomi ID corretti per targettare la Griglia
    const baseC = document.getElementById(`grid-pass-base-${slot}`);
    const awakeC = document.getElementById(`grid-pass-awake-${slot}`);
    const rerollC = document.getElementById(`grid-pass-reroll-${slot}`);

    if(!baseC || !awakeC || !rerollC) return;

    baseC.innerHTML = ''; awakeC.innerHTML = ''; rerollC.innerHTML = '';

    const drawGroup = (title, passiveList, targetContainer) => {
        if (passiveList.length === 0) return;

        let html = `<h3 class="mb-4 mt-5 text-info text-uppercase fw-bold">${title}</h3>`;

        passiveList.forEach((p) => {
            let tabs = '', content = '';
            p.levels.forEach((lv, lvIdx) => {
                const active = lvIdx === 0 ? 'active' : '';
                const tabId = `p-${slot}-${p.id}-${lvIdx}`;
                const descrizione = parsePassiveText(p.template, lv);

                tabs += `<li class="nav-item"><button class="nav-link ${active}" data-bs-toggle="tab" data-bs-target="#${tabId}">Lv. ${lvIdx + 1}</button></li>`;

                content += `
                    <div class="tab-pane fade ${lvIdx === 0 ? 'show active' : ''}" id="${tabId}">
                        <div class="mb-2 mt-2">
                            <span class="badge border border-info" style="background-color: #102247; color: #0dcaf0;">${lv.req || 'Nessun requisito'}</span>
                        </div>
                        <div class="bg-light">
                            <p class="mb-0" style="font-size: 1.05rem; line-height: 1.5;">${descrizione}</p>
                        </div>
                    </div>`;
            });
            html += `
                <div class="card border-secondary mb-4 shadow">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <strong class="text-info" style="font-size: 1.1rem;">${p.title}</strong>
                        <small class="opacity-75 text-white">ID: ${p.id}</small>
                    </div>
                    <div class="card-body">
                        <ul class="nav nav-tabs border-secondary mb-3">${tabs}</ul>
                        <div class="tab-content">${content}</div>
                    </div>
                </div>`;
        });
        targetContainer.innerHTML = html;
    };

    drawGroup("PASSIVE DI LIVELLO", db.basicPassives, baseC);
    drawGroup("PASSIVE DI RISVEGLIO", db.rarityPassives, awakeC);

    const role = extractPosition(db.position);
    const availableRerolls = rerollPassivesByRole[role] || [];

    if (availableRerolls.length > 0) {
        let rerollHtml = `
            <h3 class="mb-4 mt-5 text-info text-uppercase fw-bold d-flex align-items-center gap-2">
                <i class="fas fa-dice text-warning"></i> Simulatore Reroll [${role}]
            </h3>
        `;

        let optionsHtml = `<option value="">-- Seleziona passiva --</option>`;
        availableRerolls.forEach(p => {
            optionsHtml += `<option value="${p.id}">${p.title}</option>`;
        });

        for (let i = 1; i <= 3; i++) {
            rerollHtml += `
                <div class="card border-secondary mb-4 shadow reroll-slot-card" data-slot="${i}">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge border border-info" style="background-color: #0b1a42; color: #0dcaf0;">Slot ${i}</span>
                            <select class="form-select form-select-sm bg-dark text-white border-secondary reroll-select fw-bold" style="min-width: 250px;">
                                ${optionsHtml}
                            </select>
                        </div>
                    </div>
                    <div class="card-body reroll-content" style="display: none;"></div>
                    <div class="card-body reroll-placeholder text-center py-4">
                        <span style="color: #102247; font-weight: bold;">Seleziona dal menu</span>
                    </div>
                </div>
            `;
        }

        rerollC.innerHTML = rerollHtml;

        rerollC.querySelectorAll('.reroll-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const card = e.target.closest('.reroll-slot-card');
                const contentContainer = card.querySelector('.reroll-content');
                const placeholder = card.querySelector('.reroll-placeholder');
                const selectedId = e.target.value;

                if (!selectedId) {
                    contentContainer.style.display = 'none';
                    placeholder.style.display = 'block';
                    contentContainer.innerHTML = '';
                    return;
                }

                const p = availableRerolls.find(x => x.id === selectedId);
                if (p) {
                    let tabs = '', content = '';
                    p.levels.forEach((lv, lvIdx) => {
                        const active = lvIdx === 0 ? 'active' : '';
                        const tabId = `r-${slot}-${p.id}-s${card.dataset.slot}-${lvIdx}`;
                        const descrizione = parsePassiveText(p.template, lv);

                        tabs += `<li class="nav-item"><button class="nav-link ${active}" data-bs-toggle="tab" data-bs-target="#${tabId}">Lv. ${lvIdx + 1}</button></li>`;
                        content += `
                            <div class="tab-pane fade ${lvIdx === 0 ? 'show active' : ''}" id="${tabId}">
                                <div class="mb-2 mt-2"><span class="badge border border-info" style="background-color: #102247; color: #0dcaf0;">${lv.req || 'Nessun requisito'}</span></div>
                                <div class="bg-light"><p class="mb-0">${descrizione}</p></div>
                            </div>`;
                    });

                    contentContainer.innerHTML = `<ul class="nav nav-tabs border-secondary mb-3">${tabs}</ul><div class="tab-content">${content}</div>`;
                    placeholder.style.display = 'none';
                    contentContainer.style.display = 'block';
                }
            });
        });
    }
}

function createZonesGrid(playerZones) {
    if (!playerZones || playerZones.length === 0) return '';
    const areaByCode = new Map(playerZones.map(area => [area.code, area]));

    const layout = [
        { code: 1, row: "1", col: "1" }, { code: 2, row: "1", col: "2 / span 2" }, { code: 3, row: "1", col: "4" },
        { code: 4, row: "2 / span 2", col: "1" }, { code: 5, row: "2", col: "2 / span 2" }, { code: 6, row: "2 / span 2", col: "4" },
        { code: 7, row: "3", col: "2 / span 2" }, { code: 8, row: "4", col: "1" }, { code: 9, row: "4", col: "2 / span 2" },
        { code: 10, row: "4", col: "4" }, { code: 11, row: "5", col: "2 / span 2" }
    ];

    const cells = layout.map(cell => {
        const area = areaByCode.get(cell.code);
        const rankClass = area ? `rank-${area.rank.toLowerCase()}` : "rank-empty";
        return `<span class="zone-cell ${rankClass}" style="grid-row:${cell.row}; grid-column:${cell.col}">${area ? area.rank : ""}</span>`;
    });

    return `<div class="field-zone"><div class="field-zone-title text-uppercase">Zone</div><div class="position-grid">${cells.join("")}</div></div>`;
}

// ==========================================
// 3. TOGGLE VISTA E SELEZIONE
// ==========================================

function toggleCompareMode(isCompare) {
    const layout = document.getElementById('master-layout');
    const slot2Elements = document.querySelectorAll('.slot-2-element');

    if (isCompare) {
        layout.className = 'layout-compare';
        document.body.classList.add('compare-mode-active');
        slot2Elements.forEach(el => el.style.display = 'block');
        document.getElementById('btn-compare').style.display = 'none';
        document.getElementById('btn-close-compare').style.display = 'inline-block';
    } else {
        layout.className = 'layout-single';
        document.body.classList.remove('compare-mode-active');
        slot2Elements.forEach(el => el.style.display = 'none');
        document.getElementById('btn-compare').style.display = 'inline-block';
        document.getElementById('btn-close-compare').style.display = 'none';
        db2 = null;
    }
}

function setupCompareControls() {
    const listContainer = document.getElementById('compare-list-container');
    const searchInput = document.getElementById('compare-search-input');

    let html = '';
    characterRegistry.forEach(char => {
        // FIX: Inserite le ICONE fisiche del personaggio invece del nome testuale
        html += `
            <div class="compare-char-item" data-id="${char.id}">
                <img src="${char.thumb}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                <div>
                    <h6 class="m-0 text-dark fw-bold">${char.name}</h6>
                    <div class="mt-1 d-flex align-items-center gap-2">
                        <img src="${char.element}" style="height: 18px;" title="Elemento">
                        <img src="${char.position}" style="height: 18px;" title="Ruolo">
                    </div>
                </div>
            </div>
        `;
    });
    listContainer.innerHTML = html;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        listContainer.querySelectorAll('.compare-char-item').forEach(item => {
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(term) ? 'flex' : 'none';
        });
    });

    listContainer.querySelectorAll('.compare-char-item').forEach(item => {
        item.addEventListener('click', async () => {
            const idToCompare = item.getAttribute('data-id');
            bootstrap.Modal.getInstance(document.getElementById('compareModal')).hide();

            db2 = await fetchCharacterData(idToCompare);
            if(db2) {
                populateCharacterUI(db2, 2);
                toggleCompareMode(true);
            }
        });
    });

    document.getElementById('btn-close-compare').addEventListener('click', () => {
        toggleCompareMode(false);
    });
}

function setupNavigationControls() {
    const prevBtn = document.getElementById('btn-prev-char');
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            const prevId = getAdjacentCharacterId(currentId1, characterRegistry, 'prev');
            if (prevId) window.location.search = `?id=${prevId}`;
        };
    }

    const nextBtn = document.getElementById('btn-next-char');
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            const nextId = getAdjacentCharacterId(currentId1, characterRegistry, 'next');
            if (nextId) window.location.search = `?id=${nextId}`;
        };
    }
}

window.charController = {
    switchLevel: function(slot, level) {
        const targetDb = slot === 1 ? db1 : db2;
        if (targetDb) renderStats(targetDb, level, slot);
    }
};

document.addEventListener('DOMContentLoaded', init);