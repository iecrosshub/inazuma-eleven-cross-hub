// js/Controllers/simulator.js

import { characterRegistry, techniquesLibrary, passivesLibrary, universalManualsKeys } from '../Core/database.js';
import { getStatKeyByIcon } from '../Core/parsers.js';
import { calculateDamageData, calcolaStatisticheEsatte } from '../Core/calculator.js';
import { AuthManager } from '../Services/auth.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

let currentDb = null;
let collectionData = {};
const auth = new AuthManager();

// Helper per forzare l'HTML nel custom select da codice
function setCustomSelectValue(el, value, innerHtml) {
    if (!el) return;
    if (typeof el === 'string') el = document.getElementById(el);
    if (!el) return;
    el.dataset.value = value;
    const span = el.querySelector('.select-selected span');
    if (span) span.innerHTML = innerHtml;
}

// Helper per creare la riga tecnica (Nome Ita + SB + Nome Jap + Tooltip)
function formatTechNameHTML(tDef, isManual = false) {
    let itaName = tDef.name;
    let jpName = "";

    const splitIdx = tDef.name.indexOf(' (');
    if (splitIdx !== -1) {
        itaName = tDef.name.substring(0, splitIdx);
        jpName = tDef.name.substring(splitIdx);
    }

    const sbBadge = tDef.shootBlock ? `<span class="badge bg-danger mx-1 py-0" style="font-size:0.65rem; vertical-align: middle;" title="Shoot Block">SB</span>` : '';
    const manualIcon = isManual ? "📕 " : "";
    const fullText = isManual ? `📕 ${tDef.name}` : tDef.name;

    return `<img src="${tDef.icon}" style="width:16px; margin-right:4px; flex-shrink:0;">
            <img src="${tDef.elementIcon}" style="width:16px; margin-right:6px; flex-shrink:0;">
            <span class="text-truncate" style="flex-grow:1; display:inline-block; vertical-align: middle; min-width:0;" title="${fullText}">
                ${manualIcon}${itaName}${sbBadge}${jpName}
            </span>`;
}

async function init() {
    let charHtml = `<div data-value="generic" class="char-opt">--- PERSONAGGIO GENERICO ---</div>`;
    characterRegistry.forEach(c => {
        charHtml += `<div data-value="${c.id}" class="char-opt"><img src="${c.thumb}" style="width:24px; height:24px; border-radius:50%; margin-right:8px; vertical-align:middle;"> ${c.name} (${c.romanizedName})</div>`;
    });

    const charSelectItems = document.querySelector('#sim-char-select .select-items');
    if (charSelectItems) charSelectItems.innerHTML = charHtml;

    initCustomSelect(document.getElementById('sim-char-select'), (val) => {
        const searchInput = document.getElementById('sim-char-search');
        if (searchInput) {
            searchInput.value = '';
            document.querySelectorAll('#sim-char-select .char-opt').forEach(opt => opt.style.display = "");
        }
        loadCharacter(val);
    });

    if (charSelectItems) {
        const searchContainer = document.createElement('div');
        searchContainer.className = "p-2 sticky-top bg-white border-bottom";
        searchContainer.style.zIndex = "10";
        searchContainer.innerHTML = `<input type="text" id="sim-char-search" class="form-control form-control-sm shadow-none border-primary" placeholder="🔍 Cerca personaggio..." autocomplete="off">`;

        searchContainer.addEventListener('click', (e) => e.stopPropagation());

        const searchInput = searchContainer.querySelector('#sim-char-search');
        searchInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            const options = charSelectItems.querySelectorAll('.char-opt');
            options.forEach(opt => {
                const text = opt.textContent || opt.innerText;
                opt.style.display = text.toLowerCase().includes(term) ? "" : "none";
            });
        });

        charSelectItems.prepend(searchContainer);
    }

    initCustomSelect(document.getElementById('sim-role-select'), () => runSimulation());
    initCustomSelect(document.getElementById('sim-advantage-select'), () => runSimulation());

    const techLvlContainer = document.querySelector('#sim-tech-lvl-select .select-items');
    if (techLvlContainer) {
        techLvlContainer.innerHTML = Array.from({length: 10}, (_, i) => `<div data-value="${i+1}">Lv. ${i+1}</div>`).join('');
    }
    initCustomSelect(document.getElementById('sim-tech-lvl-select'), () => runSimulation());

    setupGlobalSelectClose();

    const urlParams = new URLSearchParams(window.location.search);
    let charParam = urlParams.get('char') || localStorage.getItem('selectedChar');

    if (charParam && document.querySelector(`#sim-char-select .select-items div[data-value="${charParam}"]`)) {
        const opt = document.querySelector(`#sim-char-select .select-items div[data-value="${charParam}"]`);
        setCustomSelectValue('sim-char-select', charParam, opt.innerHTML);
    } else {
        setCustomSelectValue('sim-char-select', 'generic', '--- PERSONAGGIO GENERICO ---');
    }

    document.addEventListener('change', (e) => {
        if (e.target.name === 'dataSource') applyPresets();
    });

    document.addEventListener('input', (e) => {
        if (e.target.matches('input[type="number"]')) runSimulation();
    });

    document.getElementById('btn-login').addEventListener('click', () => auth.loginWithGoogle());
    document.getElementById('btn-logout').addEventListener('click', () => auth.logout());

    // Tutorial Listener
    document.getElementById('btn-tutorial').addEventListener('click', startTutorial);

    auth.setAuthStateListener(async (user) => {
        const loginBtn = document.getElementById('btn-login');
        const logoutBtn = document.getElementById('btn-logout');
        const greeting = document.getElementById('user-greeting');

        if (user) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            greeting.innerHTML = `Collezione di: <span class="text-warning">${user.displayName}</span>`;
            collectionData = await auth.getUserCollection();
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            greeting.textContent = "Accedi per usare la tua Collezione";
            collectionData = {};
        }
        applyPresets();
    });

    await loadCharacter();

    // Avvio tutorial automatico
    if (!localStorage.getItem('tutorial_simulator_seen')) {
        setTimeout(startTutorial, 800);
    }
}

function updateStatIcon(techKey) {
    const iconEl = document.getElementById('stat-base-icon');
    if (!techKey || !techniquesLibrary[techKey]) {
        iconEl.style.display = 'none';
        return;
    }
    const tech = techniquesLibrary[techKey];
    const statKey = getStatKeyByIcon(tech.icon);

    const mapIcons = {
        "Tiro": "img/Status/Icon_Status_Kick.png",
        "Tecnica": "img/Status/Icon_Status_Technic.png",
        "Blocco": "img/Status/Icon_Status_Block.png",
        "Parata": "img/Status/Icon_Status_Catch.png"
    };

    if (mapIcons[statKey]) {
        iconEl.src = mapIcons[statKey];
        iconEl.style.display = 'inline-block';
    } else {
        iconEl.style.display = 'none';
    }
}

async function loadCharacter(idStr) {
    const id = idStr || document.getElementById('sim-char-select').dataset.value;
    try {
        if (id === 'generic') {
            currentDb = {
                id: 'generic',
                name: 'Generico',
                element: 'Void',
                position: 'FW',
                stats: { Tiro: {lv300: 100}, Tecnica: {lv300: 100}, Blocco: {lv300: 100}, Parata: {lv300: 100}, Velocità: {lv300: 100} },
                myTechniques: ["ザ・ウォール", "グレネードショット"],
                myBasicPassivesIds: [],
                myRarityPassivesIds: []
            };
        } else {
            const module = await import(`../Characters/${id}.js`);
            currentDb = module.charData;

            if (currentDb.growth_pattern_code) {
                const stats300 = calcolaStatisticheEsatte(currentDb, 300, 9, 1);
                if (stats300) {
                    currentDb.stats = {
                        "Tiro": { lv300: stats300.kick },
                        "Tecnica": { lv300: stats300.technique },
                        "Blocco": { lv300: stats300.block },
                        "Parata": { lv300: stats300.catch },
                        "Velocità": { lv300: stats300.speed }
                    };
                }
            } else if (!currentDb.stats) {
                currentDb.stats = { "Tiro": { lv300: 0 }, "Tecnica": { lv300: 0 }, "Blocco": { lv300: 0 }, "Parata": { lv300: 0 }, "Velocità": { lv300: 0 } };
            }
        }

        const techSelectEl = document.getElementById('sim-tech-select');
        if (techSelectEl) {
            let optionsHtml = '';

            currentDb.myTechniques.forEach(tKey => {
                const tDef = techniquesLibrary[tKey];
                if (tDef) {
                    optionsHtml += `<div data-value="${tKey}" style="display:flex; align-items:center; overflow:hidden;">${formatTechNameHTML(tDef)}</div>`;
                }
            });

            const availableManuals = universalManualsKeys.filter(m => !currentDb.myTechniques.includes(m));
            if (availableManuals.length > 0) {
                optionsHtml += `<div class="fw-bold text-warning" style="pointer-events:none; padding: 4px 10px; font-size:0.8rem; background:#343a40;">MANUALI (SHOP)</div>`;
                availableManuals.forEach(mKey => {
                    const tDef = techniquesLibrary[mKey];
                    if (tDef) {
                        optionsHtml += `<div data-value="${mKey}" style="display:flex; align-items:center; overflow:hidden;">${formatTechNameHTML(tDef, true)}</div>`;
                    }
                });
            }

            techSelectEl.querySelector('.select-items').innerHTML = optionsHtml;

            if (currentDb.myTechniques.length > 0) {
                const firstT = techniquesLibrary[currentDb.myTechniques[0]];
                setCustomSelectValue('sim-tech-select', currentDb.myTechniques[0], formatTechNameHTML(firstT));
            } else {
                setCustomSelectValue('sim-tech-select', '', '-- Nessuna Tecnica --');
            }

            initCustomSelect(techSelectEl, (val) => {
                const tDef = techniquesLibrary[val];
                if(tDef) {
                    const isManual = availableManuals.includes(val);
                    setCustomSelectValue('sim-tech-select', val, formatTechNameHTML(tDef, isManual));
                }
                updateStatIcon(val);
                applyPresets();
            });

            updateStatIcon(techSelectEl.dataset.value);
        }

        const container = document.getElementById('dynamic-passives-container');
        if (container) {
            container.innerHTML = [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].map(pId => {
                const p = passivesLibrary.find(x => x.id === pId);
                if (!p) return '';
                let opts = '<div data-value="disabled">Bloccata</div>';
                p.levels.forEach((_, idx) => opts += `<div data-value="${idx}">Lv. ${idx + 1}</div>`);

                const isCumulative = p.title.includes('累') || p.template.includes('Ogni volta che');
                let stackHtml = '';
                if (isCumulative) {
                    stackHtml = `
                    <div class="col-3">
                        <div class="input-group input-group-sm" title="Quante volte si è attivata?">
                            <span class="input-group-text fw-bold">x</span>
                            <input type="number" class="form-control sim-passive-stacks" data-passive-id="${p.id}" value="1" min="1" max="50">
                        </div>
                    </div>`;
                }

                return `
                <div class="row g-2 mb-2 align-items-center">
                    <div class="col-${isCumulative ? '5' : '7'} small fw-bold" style="color:#506482" title="${p.template}">
                        ${p.title}
                    </div>
                    <div class="col-${isCumulative ? '4' : '5'}">
                        <div class="custom-select shadow-sm sim-passive-lvl-select" data-passive-id="${p.id}" data-value="disabled">
                            <div class="select-selected"><span style="font-size: 0.85rem;">Bloccata</span> <i class="fas fa-chevron-down" style="font-size: 0.7rem;"></i></div>
                            <div class="select-items select-hide" style="max-height: 200px; overflow-y: auto; font-size: 0.85rem;">
                                ${opts}
                            </div>
                        </div>
                    </div>
                    ${stackHtml}
                </div>`;
            }).join('');

            document.querySelectorAll('.sim-passive-lvl-select').forEach(sel => {
                initCustomSelect(sel, () => runSimulation());
            });
        }

        applyPresets();

    } catch (err) { console.error("Errore caricamento:", err); }
}

function applyPresets() {
    if (!currentDb) return;

    const mode = document.querySelector('input[name="dataSource"]:checked').value;
    const techKey = document.getElementById('sim-tech-select').dataset.value;
    const statKey = techKey && techniquesLibrary[techKey] ? getStatKeyByIcon(techniquesLibrary[techKey].icon) : 'Tiro';

    let statVal = 0;
    let techLvIndex = 9;
    let passivesConfig = {};

    if (mode === 'max') {
        statVal = currentDb.stats && currentDb.stats[statKey] ? currentDb.stats[statKey]['lv300'] : 0;
        techLvIndex = 9;
        [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].forEach(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            passivesConfig[pId] = pDef ? pDef.levels.length - 1 : 0;
        });
    } else {
        const coll = collectionData[currentDb.id] || {};
        statVal = coll.stats ? (coll.stats[statKey] || 0) : 0;
        techLvIndex = coll.techLevels ? (coll.techLevels[techKey] || 0) : 0;

        const cPass = coll.passives || {};
        [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].forEach(pId => {
            passivesConfig[pId] = cPass[pId] !== undefined ? cPass[pId] : -1;
        });
    }

    document.getElementById('sim-custom-stat').value = statVal;

    setCustomSelectValue('sim-tech-lvl-select', techLvIndex + 1, `Lv. ${techLvIndex + 1}`);

    document.querySelectorAll('.sim-passive-lvl-select').forEach(sel => {
        const pid = sel.dataset.passiveId;
        const targetVal = passivesConfig[pid] === -1 ? 'disabled' : passivesConfig[pid];
        const targetHtml = targetVal === 'disabled' ? 'Bloccata' : `Lv. ${targetVal + 1}`;
        setCustomSelectValue(sel, targetVal, targetHtml);
    });

    runSimulation();
}

function runSimulation() {
    if (!currentDb) return;

    const techKey = document.getElementById('sim-tech-select').dataset.value;
    const techLvlIndex = parseInt(document.getElementById('sim-tech-lvl-select').dataset.value) - 1;
    const roleMult = parseFloat(document.getElementById('sim-role-select').dataset.value);
    const adv = parseFloat(document.getElementById('sim-advantage-select').dataset.value);
    const customStatVal = document.getElementById('sim-custom-stat').value;

    const passiveSelections = Array.from(document.querySelectorAll('.sim-passive-lvl-select'))
        .filter(s => s.dataset.value !== 'disabled')
        .map(s => {
            const id = s.dataset.passiveId;
            const stackInput = document.querySelector(`.sim-passive-stacks[data-passive-id="${id}"]`);
            return { id, lvIndex: parseInt(s.dataset.value), stacks: stackInput ? (parseInt(stackInput.value) || 1) : 1 };
        });

    const data = calculateDamageData(currentDb, techKey, techLvlIndex, customStatVal, roleMult, adv, passiveSelections, 0);

    if (!data) return;

    const formulaStr = `<span style="color:#1269e8; font-weight:900;">Equazione:</span><br>⌊ ⌊ ⌊ (${data.baseStat} + ${data.passiveStatBuff}) &times; ${data.roleMult.toFixed(2)} ⌋ &times; ((${data.techPower} + ${data.passivePowerBuff}) / 100) ⌋ &times; ${data.stabMult} ⌋ &times; ${data.adv}`;

    document.getElementById('damage-result').textContent = data.danno.toLocaleString('it-IT');
    document.getElementById('damage-formula').innerHTML = formulaStr;

    document.getElementById('stats-display').innerHTML = `
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Cat. Tecnica:</strong> <span class="text-info fw-bold">${data.statKey}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Stat Base:</strong> <span class="text-info fw-bold">${data.baseStat.toLocaleString('it-IT')}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Buff Stat:</strong> <span class="text-info fw-bold">+${data.passiveStatBuff}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Moltiplicatore Ruolo:</strong> <span class="text-info fw-bold">x${data.roleMult.toFixed(2)}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Potenza Base Mossa:</strong> <span class="text-info fw-bold">${data.techPower}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Buff Potenza:</strong> <span class="text-info fw-bold">+${data.passivePowerBuff}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>STAB:</strong> <span class="text-info fw-bold">x${data.stabMult.toFixed(2)}</span></li>
        <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Vantaggio:</strong> <span class="text-info fw-bold">x${data.adv.toFixed(2)}</span></li>
    `;

    const stabLabel = document.getElementById('stab-label');
    const stabCheckbox = document.getElementById('sim-stab');
    if (stabLabel && stabCheckbox) {
        stabCheckbox.checked = data.hasStab;
        stabLabel.textContent = data.hasStab ? "STAB ATTIVO (x1.20)" : "STAB INATTIVO (x1.00)";
        stabLabel.className = `form-check-label fw-bold small ${data.hasStab ? 'text-success' : 'text-secondary'}`;
    }

    const display = document.getElementById('passive-display');
    if (display) {
        display.innerHTML = data.passiveData.length > 0
            ? data.passiveData.map(p => `<li><span class="text-info">${p.active ? "🟢" : "⚪"} ${p.title} (Lv. ${p.level}):</span> <span class="text-secondary ms-1 fw-normal">${p.desc}</span></li>`).join('')
            : '<li><span class="text-secondary fw-normal">Nessuna passiva.</span></li>';
    }
}

// ==========================================
// TUTORIAL INTRO.JS
// ==========================================
function startTutorial() {
    localStorage.setItem('tutorial_simulator_seen', 'true');

    introJs().setOptions({
        nextLabel: 'Avanti →',
        prevLabel: '← Indietro',
        doneLabel: 'Al calcolo! 🧮',
        showStepNumbers: true,
        showBullets: true,
        overlayOpacity: 0.8,
        scrollTo: 'tooltip',
        steps: [
            {
                intro: "<div style='text-align: center;'>" +
                    "<h4 class='text-primary fw-bold mb-3' style='text-transform: uppercase; letter-spacing: 1px;'>⚡ Simulatore 1vs1</h4>" +
                    "<p>Benvenuto nel laboratorio di calcolo!<br><br>" +
                    "Qui puoi analizzare matematicamente ogni singola mossa del gioco per scoprire esattamente quanti danni infliggerà in uno scontro diretto.</p>" +
                    "</div>"
            },
            {
                element: document.getElementById('tour-datasource'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-warning fw-bold mb-3' style='text-transform: uppercase;'>⚖️ La Regola d'Oro</h5>" +
                    "<p>Questa scelta cambierà totalmente i risultati:<br><br>" +
                    "🎒 <strong>Collezione:</strong> I danni sono altissimi perché includono le statistiche fornite dai tuoi <strong>Equipaggiamenti</strong>.<br><br>" +
                    "🔥 <strong>MAX:</strong> Porta le mosse al massimo (Lv.10), ma usa le statistiche base del personaggio <strong>nude, senza equipaggiamenti</strong>.</p>" +
                    "<p style='font-size:0.9rem; color:#d32f2f; margin-top:10px;'><em>Perché i danni MAX sono più bassi? Perché serve appositamente per confrontare le abilità assolute delle mosse in modo pulito e imparziale, per studiare chi vince i vari matchup!</em></p>" +
                    "</div>",
                position: 'bottom'
            },
            {
                element: document.getElementById('tour-settings'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-info fw-bold mb-3' style='text-transform: uppercase;'>⚙️ Imposta lo Scontro</h5>" +
                    "<p>Seleziona un personaggio e una tecnica.<br><br>" +
                    "Puoi variare il livello della mossa, simulare il <strong>Moltiplicatore Ruolo</strong> del personaggio (S, A, B) e impostare il <strong>Vantaggio di Tipo</strong> elementale per simulare condizioni specifiche in campo.</p>" +
                    "</div>",
                position: 'right'
            },
            {
                element: document.getElementById('tour-results'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-success fw-bold mb-3' style='text-transform: uppercase;'>📊 La Matematica</h5>" +
                    "<p>In questa colonna avviene la magia!<br><br>" +
                    "Il sistema ti mostrerà il <strong>Danno Finale Stimato</strong> ricreando l'esatta equazione che usa il gioco, rispettando tutti i troncamenti algebrici intermedi.<br><br>" +
                    "Più sotto, potrai analizzare pezzo per pezzo quali passive si sono attivate. Buono studio!</p>" +
                    "</div>",
                position: 'left'
            }
        ]
    }).start();
}

document.addEventListener('DOMContentLoaded', init);