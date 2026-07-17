// js/Controllers/character.js

import { characterRegistry, getPopulatedCharacter, rerollPassivesByRole } from '../Core/database.js';
import { getUrlParam, getAdjacentCharacterId, parsePassiveText, extractPosition } from '../Core/parsers.js';
import { calcolaStatisticheEsatte } from '../Core/calculator.js';

let db = {};
let currentId = '';

// ==========================================
// 1. INIZIALIZZAZIONE E RECUPERO DATI
// ==========================================

async function init() {
    currentId = getUrlParam('id') || localStorage.getItem('selectedChar') || 'byronLoveZeus';
    localStorage.setItem('selectedChar', currentId);

    try {
        const module = await import(`../Characters/${currentId}.js`);

        db = getPopulatedCharacter(module.charData);

        // 1. Calcolo per personaggi con formula automatica
        if (db.growth_pattern_code) {
            const stats1 = calcolaStatisticheEsatte(db, 1, 9, 1);
            const stats300 = calcolaStatisticheEsatte(db, 300, 9, 1);

            if (stats1 && stats300) {
                db.stats = {
                    "TP": { lv1: stats1.tp || 100, lv300: stats300.tp || 100 },
                    "Tiro": { lv1: stats1.kick, lv300: stats300.kick },
                    "Tecnica": { lv1: stats1.technique, lv300: stats300.technique },
                    "Blocco": { lv1: stats1.block, lv300: stats300.block },
                    "Parata": { lv1: stats1.catch, lv300: stats300.catch },
                    "Velocità": { lv1: stats1.speed, lv300: stats300.speed }
                };
            }
        }

        // 2. Fallback per personaggi manuali senza stats (se l'oggetto non esiste o è vuoto)
        if (!db.stats || Object.keys(db.stats).length === 0) {
            db.stats = {
                "TP": { lv1: 100, lv300: 100 },
                "Tiro": { lv1: 100, lv300: 100 },
                "Tecnica": { lv1: 100, lv300: 100 },
                "Blocco": { lv1: 100, lv300: 100 },
                "Parata": { lv1: 100, lv300: 100 },
                "Velocità": { lv1: 100, lv300: 100 }
            };
        }

        document.getElementById('char-name-main').textContent = `${db.name} (${db.romanizedName})`;
        document.getElementById('char-name-jp').textContent = db.japaneseName;
        document.getElementById('char-img').src = db.characterImg || db.thumb;
        document.getElementById('element-icon').src = db.element;
        document.getElementById('position-icon').src = db.position;

        const tagsContainer = document.getElementById('tags-container');
        if (tagsContainer && db.tags) {
            tagsContainer.innerHTML = db.tags.map(t => `<img src="${t}" style="height: 38px;">`).join('');
        }

        const btnLv1 = document.getElementById('btn-lv1');
        const btnLv300 = document.getElementById('btn-lv300');
        if (btnLv1) btnLv1.onclick = () => renderStats(db, 'lv1');
        if (btnLv300) btnLv300.onclick = () => renderStats(db, 'lv300');

        renderStats(db, 'lv1');
        renderPassives(db);
        renderTechniques(db);

        setupNavigationControls();
    } catch (err) {
        console.error("Errore durante il caricamento del personaggio:", err);
    }
}

function setupNavigationControls() {
    const simBtn = document.getElementById('btn-send-to-sim');
    if (simBtn) simBtn.href = `simulator.html?char=${currentId}`;

    const prevBtn = document.getElementById('btn-prev-char');
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            const prevId = getAdjacentCharacterId(currentId, characterRegistry, 'prev');
            if (prevId) window.location.search = `?id=${prevId}`;
        };
    }

    const nextBtn = document.getElementById('btn-next-char');
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            const nextId = getAdjacentCharacterId(currentId, characterRegistry, 'next');
            if (nextId) window.location.search = `?id=${nextId}`;
        };
    }
}

// ==========================================
// 2. FUNZIONI DI RENDER GRAFICO
// ==========================================

function renderStats(db, level) {
    const statsList = document.getElementById('stats-list');
    statsList.innerHTML = '';
    document.getElementById('btn-lv1').classList.toggle('active', level === 'lv1');
    document.getElementById('btn-lv300').classList.toggle('active', level === 'lv300');

    const icons = {
        "TP": "img/Status/Icon_Status_TP.png",
        "Tiro": "img/Status/Icon_Status_Kick.png",
        "Tecnica": "img/Status/Icon_Status_Technic.png",
        "Blocco": "img/Status/Icon_Status_Block.png",
        "Parata": "img/Status/Icon_Status_Catch.png",
        "Velocità": "img/Status/Icon_Status_Speed.png"
    };

    Object.entries(db.stats).forEach(([key, data]) => {
        // Se c'è un'icona definita direttamente nel data.icon (vecchio formato), la usiamo, altrimenti usiamo la mappa
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

    const zonesContainer = document.getElementById('zones-container');
    if (zonesContainer) zonesContainer.innerHTML = createZonesGrid(db.zones || []);
}

function renderTechniques(db) {
    const container = document.getElementById('tecniche-container');
    if (!container) return;

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
        <div class="card mb-3 shadow-sm">
            <div class="card-header d-flex align-items-center">
                <img src="${tech.icon}" alt="Icon" class="me-2" style="width: 28px; height: 28px;">
                <img src="${tech.elementIcon}" alt="Element" class="me-2" style="width: 28px; height: 28px;">
                <h5 class="mb-0" style="font-size: 1.1rem; color: #0dcaf0; font-weight: bold;">${tech.name}</h5>
            </div>
            <div class="card-body p-2">
                <div class="mb-2 ps-1">
                    ${badgesHtml}
                </div>
                <div class="table-responsive">
                    <table class="table table-sm text-center align-middle mb-0" style="font-size: 0.85rem;">
                        <thead>
                            <tr>
                                <th class="text-start" style="width: 15%;">Statistica / Lv</th>
                                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(lv => `<th>${lv}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
    }

    container.innerHTML = html;
}

function renderPassives(db) {
    const passContainer = document.getElementById('passive-container');
    if (!passContainer) return;
    passContainer.innerHTML = '';

    // --- 1. RENDER PASSIVE BASE E RISVEGLIO ---
    const drawGroup = (title, passiveList) => {
        if (passiveList.length === 0) return;
        passContainer.innerHTML += `<h3 class="mb-4 mt-5 text-info">${title}</h3>`;

        passiveList.forEach((p) => {
            let tabs = '', content = '';
            p.levels.forEach((lv, lvIdx) => {
                const active = lvIdx === 0 ? 'active' : '';
                const tabId = `p-${p.id}-${lvIdx}`;
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
            passContainer.innerHTML += `
                <div class="card border-secondary mb-4 shadow">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <strong style="color: #0dcaf0; font-size: 1.1rem;">${p.title}</strong>
                        <small class="opacity-75 text-white">ID: ${p.id}</small>
                    </div>
                    <div class="card-body">
                        <ul class="nav nav-tabs border-secondary mb-3">${tabs}</ul>
                        <div class="tab-content">${content}</div>
                    </div>
                </div>`;
        });
    };

    drawGroup("Passive di Livello", db.basicPassives);
    drawGroup("Passive di Risveglio", db.rarityPassives);

    // --- 2. RENDER SLOT PASSIVE DI REROLL ---
    const role = extractPosition(db.position);
    const availableRerolls = rerollPassivesByRole[role] || [];

    if (availableRerolls.length > 0) {
        passContainer.innerHTML += `
            <h3 class="mb-4 mt-5 text-info d-flex align-items-center gap-2">
                <i class="fas fa-dice text-warning"></i> Simulatore Passive di Reroll [Pool: ${role}]
            </h3>
        `;

        let optionsHtml = `<option value="">-- Seleziona una passiva da equipaggiare --</option>`;
        availableRerolls.forEach(p => {
            optionsHtml += `<option value="${p.id}">${p.title}</option>`;
        });

        // Creazione dei 3 slot
        for (let i = 1; i <= 3; i++) {
            passContainer.innerHTML += `
                <div class="card border-secondary mb-4 shadow reroll-slot-card" data-slot="${i}">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge border border-info" style="background-color: #0b1a42; color: #0dcaf0; font-size: 0.9rem;">Slot ${i}</span>
                            <select class="form-select form-select-sm bg-dark text-white border-secondary reroll-select fw-bold" style="min-width: 280px; cursor: pointer;">
                                ${optionsHtml}
                            </select>
                        </div>
                        <small class="opacity-75 text-white reroll-id-display"></small>
                    </div>
                    <div class="card-body reroll-content" style="display: none;">
                        <!-- Il contenuto dei tab verrà caricato qui via JS -->
                    </div>
                    <div class="card-body reroll-placeholder text-center py-4">
                        <span style="color: #102247; font-weight: bold; font-size: 0.95rem;">
                            Seleziona una passiva dal menu per visualizzarne i dettagli.
                        </span>
                    </div>
                </div>
            `;
        }

        // Event listener
        document.querySelectorAll('.reroll-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const card = e.target.closest('.reroll-slot-card');
                const contentContainer = card.querySelector('.reroll-content');
                const placeholder = card.querySelector('.reroll-placeholder');
                const idDisplay = card.querySelector('.reroll-id-display');
                const selectedId = e.target.value;

                if (!selectedId) {
                    contentContainer.style.display = 'none';
                    placeholder.style.display = 'block';
                    idDisplay.textContent = '';
                    contentContainer.innerHTML = '';
                    return;
                }

                const p = availableRerolls.find(x => x.id === selectedId);
                if (p) {
                    idDisplay.textContent = `ID: ${p.id}`; // Inserisce l'ID nell'header a destra

                    let tabs = '', content = '';
                    p.levels.forEach((lv, lvIdx) => {
                        const active = lvIdx === 0 ? 'active' : '';
                        const tabId = `r-${p.id}-slot${card.dataset.slot}-${lvIdx}`;
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

                    // Costruisce SOLO i tab e il box chiaro nel card-body (niente titolo ripetuto)
                    contentContainer.innerHTML = `
                        <ul class="nav nav-tabs border-secondary mb-3">${tabs}</ul>
                        <div class="tab-content">${content}</div>
                    `;

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

    return `
        <div class="field-zone">
            <div class="field-zone-title">Zone</div>
            <div class="position-grid">${cells.join("")}</div>
        </div>`;
}

document.addEventListener('DOMContentLoaded', init);