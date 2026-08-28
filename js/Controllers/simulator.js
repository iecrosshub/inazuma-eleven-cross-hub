// js/Controllers/simulator.js

import { characterRegistry, techniquesLibrary, passivesLibrary, universalManualsKeys } from '../Core/database.js';
import { getStatKeyByIcon } from '../Core/parsers.js';
import { calculateDamageData, calcolaStatisticheEsatte } from '../Core/calculator.js';
import { AuthManager } from '../Services/auth.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

let dbs = { 1: null, 2: null };
let collectionData = {};
const auth = new AuthManager();

// Array per memorizzare i valori manuali da sommare con i pulsanti + (separati per slot)
let manualStatBonuses = { 1: [], 2: [] };
let manualPowerBonuses = { 1: [], 2: [] };

function setCustomSelectValue(el, value, innerHtml) {
    if (!el) return;
    if (typeof el === 'string') el = document.getElementById(el);
    if (!el) return;
    el.dataset.value = value;
    const span = el.querySelector('.select-selected span');
    if (span) span.innerHTML = innerHtml;
}

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
        charHtml += `<div data-value="${c.id}" class="char-opt"><img src="${c.thumb}" style="width:24px; height:24px; border-radius:50%; margin-right:8px; vertical-align:middle; object-fit:cover;"> ${c.name}</div>`;
    });

    // Inizializza entrambi gli Slot (1 e 2)
    [1, 2].forEach(slot => {
        const charSelectItems = document.querySelector(`#sim-char-select-${slot} .select-items`);
        if (charSelectItems) charSelectItems.innerHTML = charHtml;

        initCustomSelect(document.getElementById(`sim-char-select-${slot}`), (val) => {
            const searchInput = document.getElementById(`sim-char-search-${slot}`);
            if (searchInput) {
                searchInput.value = '';
                document.querySelectorAll(`#sim-char-select-${slot} .char-opt`).forEach(opt => opt.style.display = "");
            }
            loadCharacter(val, slot);
        });

        if (charSelectItems) {
            const searchContainer = document.createElement('div');
            searchContainer.className = "p-2 sticky-top bg-white border-bottom";
            searchContainer.style.zIndex = "10";
            searchContainer.innerHTML = `<input type="text" id="sim-char-search-${slot}" class="form-control form-control-sm shadow-none border-primary" placeholder="🔍 Cerca personaggio..." autocomplete="off">`;

            searchContainer.addEventListener('click', (e) => e.stopPropagation());

            const searchInput = searchContainer.querySelector(`#sim-char-search-${slot}`);
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

        initCustomSelect(document.getElementById(`sim-role-select-${slot}`), () => runSimulation(slot));
        initCustomSelect(document.getElementById(`sim-advantage-select-${slot}`), () => runSimulation(slot));

        const techLvlContainer = document.querySelector(`#sim-tech-lvl-select-${slot} .select-items`);
        if (techLvlContainer) {
            techLvlContainer.innerHTML = Array.from({length: 10}, (_, i) => `<div data-value="${i+1}">Lv. ${i+1}</div>`).join('');
        }
        initCustomSelect(document.getElementById(`sim-tech-lvl-select-${slot}`), () => runSimulation(slot));

        // Toggle modalità manuale
        const manualSwitch = document.getElementById(`sim-manual-mode-switch-${slot}`);
        manualSwitch.addEventListener('change', (e) => {
            const isManual = e.target.checked;
            document.getElementById(`automatic-mode-container-${slot}`).style.display = isManual ? 'none' : 'block';
            document.getElementById(`tech-automatic-section-${slot}`).style.display = isManual ? 'none' : 'block';
            document.getElementById(`tech-manual-section-${slot}`).style.display = isManual ? 'block' : 'none';
            document.getElementById(`dynamic-passives-container-${slot}`).style.display = isManual ? 'none' : 'block';
            document.getElementById(`manual-additions-container-${slot}`).style.display = isManual ? 'block' : 'none';
            document.getElementById(`passives-card-title-${slot}`).textContent = isManual ? 'Valori Aggiuntivi da Sommare' : 'Livello delle Abilità Passive';
            document.getElementById(`results-secondary-title-${slot}`).textContent = isManual ? 'Riepilogo Inserimenti' : 'Effetti delle Passive';

            const stabCheckbox = document.getElementById(`sim-stab-${slot}`);
            stabCheckbox.disabled = !isManual;

            runSimulation(slot);
        });
    });

    setupGlobalSelectClose();

    // Eventi Pulsanti Manuali Slot 1 e 2 (Delega degli eventi)
    document.querySelectorAll('.btn-add-stat-bonus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slot = e.currentTarget.dataset.slot;
            const input = document.getElementById(`sim-input-stat-val-${slot}`);
            const val = parseFloat(input.value);
            if (!isNaN(val)) {
                manualStatBonuses[slot].push(val);
                input.value = '';
                renderStatBonusesUI(slot);
                runSimulation(slot);
            }
        });
    });

    document.querySelectorAll('.btn-add-power-val').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slot = e.currentTarget.dataset.slot;
            const input = document.getElementById(`sim-input-power-val-${slot}`);
            const val = parseFloat(input.value);
            if (!isNaN(val)) {
                manualPowerBonuses[slot].push(val);
                input.value = '';
                renderPowerBonusesUI(slot);
                runSimulation(slot);
            }
        });
    });

    // Cestini
    [1, 2].forEach(slot => {
        document.getElementById(`stat-bonuses-list-${slot}`).addEventListener('click', (e) => {
            const btn = e.target.closest('.remove-stat-bonus');
            if (btn) {
                const index = parseInt(btn.dataset.index);
                manualStatBonuses[slot].splice(index, 1);
                renderStatBonusesUI(slot);
                runSimulation(slot);
            }
        });

        document.getElementById(`power-bonuses-list-${slot}`).addEventListener('click', (e) => {
            const btn = e.target.closest('.remove-power-bonus');
            if (btn) {
                const index = parseInt(btn.dataset.index);
                manualPowerBonuses[slot].splice(index, 1);
                renderPowerBonusesUI(slot);
                runSimulation(slot);
            }
        });
    });

    // Caricamento Iniziale
    const urlParams = new URLSearchParams(window.location.search);
    let charParam = urlParams.get('char') || localStorage.getItem('selectedChar');

    if (charParam && document.querySelector(`#sim-char-select-1 .select-items div[data-value="${charParam}"]`)) {
        const opt = document.querySelector(`#sim-char-select-1 .select-items div[data-value="${charParam}"]`);
        setCustomSelectValue('sim-char-select-1', charParam, opt.innerHTML);
    } else {
        setCustomSelectValue('sim-char-select-1', 'generic', '--- PERSONAGGIO GENERICO ---');
    }

    // Slot 2 parte generico di default
    setCustomSelectValue('sim-char-select-2', 'generic', '--- PERSONAGGIO GENERICO ---');

    document.addEventListener('change', (e) => {
        if (e.target.name === 'dataSource') {
            applyPresets(1);
            applyPresets(2);
        }
        if (e.target.id.startsWith('sim-stab-')) {
            const slot = e.target.id.split('-').pop();
            runSimulation(slot);
        }
    });

    document.addEventListener('input', (e) => {
        if (e.target.matches('input[type="number"]') && !e.target.id.includes('sim-input-')) {
            const slot = e.target.id.split('-').pop();
            if(slot == 1 || slot == 2) runSimulation(slot);
        }
    });

    document.getElementById('btn-login').addEventListener('click', () => auth.loginWithGoogle());
    document.getElementById('btn-logout').addEventListener('click', () => auth.logout());
    document.getElementById('btn-tutorial').addEventListener('click', startTutorial);

    // Sistema Confronto
    document.getElementById('btn-compare').addEventListener('click', () => {
        document.getElementById('master-layout').className = 'layout-compare';
        document.body.classList.add('compare-mode-active');
        document.querySelectorAll('.slot-2-el').forEach(el => el.style.display = 'block');
        document.getElementById('btn-compare').style.display = 'none';
        document.getElementById('btn-close-compare').style.display = 'inline-block';
    });

    document.getElementById('btn-close-compare').addEventListener('click', () => {
        document.getElementById('master-layout').className = 'layout-single';
        document.body.classList.remove('compare-mode-active');
        document.querySelectorAll('.slot-2-el').forEach(el => el.style.display = 'none');
        document.getElementById('btn-compare').style.display = 'inline-block';
        document.getElementById('btn-close-compare').style.display = 'none';
    });

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
        applyPresets(1);
        applyPresets(2);
    });

    await loadCharacter(document.getElementById('sim-char-select-1').dataset.value, 1);
    await loadCharacter('generic', 2);

    if (!localStorage.getItem('tutorial_simulator_seen')) {
        setTimeout(startTutorial, 800);
    }
}

function renderStatBonusesUI(slot) {
    const container = document.getElementById(`stat-bonuses-list-${slot}`);
    if (!container) return;
    const colorClass = 'text-primary';
    container.innerHTML = manualStatBonuses[slot].map((val, index) => `
        <div class="d-flex justify-content-between align-items-center bg-white p-1 px-2 rounded border border-secondary shadow-sm">
            <span class="fw-bold ${colorClass}">+${val.toLocaleString('it-IT')}</span>
            <button class="btn btn-sm btn-outline-danger py-0 px-1 border-0 remove-stat-bonus" data-index="${index}" title="Rimuovi"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join('');
}

function renderPowerBonusesUI(slot) {
    const container = document.getElementById(`power-bonuses-list-${slot}`);
    if (!container) return;
    const colorClass = 'text-warning text-dark';
    container.innerHTML = manualPowerBonuses[slot].map((val, index) => `
        <div class="d-flex justify-content-between align-items-center bg-white p-1 px-2 rounded border border-secondary shadow-sm">
            <span class="fw-bold ${colorClass}">+${val.toLocaleString('it-IT')}</span>
            <button class="btn btn-sm btn-outline-danger py-0 px-1 border-0 remove-power-bonus" data-index="${index}" title="Rimuovi"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join('');
}

function updateStatIcon(techKey, slot) {
    const iconEl = document.getElementById(`stat-base-icon-${slot}`);
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

async function loadCharacter(idStr, slot) {
    const id = idStr || document.getElementById(`sim-char-select-${slot}`).dataset.value;
    try {
        let dbRef = null;
        if (id === 'generic') {
            dbRef = {
                id: 'generic', name: 'Generico', element: 'Void', position: 'FW',
                stats: { Tiro: {lv300: 100}, Tecnica: {lv300: 100}, Blocco: {lv300: 100}, Parata: {lv300: 100}, Velocità: {lv300: 100} },
                myTechniques: ["ザ・ウォール", "グレネードショット"], myBasicPassivesIds: [], myRarityPassivesIds: []
            };
        } else {
            const module = await import(`../Characters/${id}.js`);
            // Deep copy to prevent slots from overriding each other if they use same char
            dbRef = JSON.parse(JSON.stringify(module.charData));

            if (dbRef.growth_pattern_code) {
                const stats300 = calcolaStatisticheEsatte(dbRef, 300, 9, 1);
                if (stats300) {
                    dbRef.stats = {
                        "Tiro": { lv300: stats300.kick }, "Tecnica": { lv300: stats300.technique },
                        "Blocco": { lv300: stats300.block }, "Parata": { lv300: stats300.catch }, "Velocità": { lv300: stats300.speed }
                    };
                }
            } else if (!dbRef.stats) {
                dbRef.stats = { "Tiro": { lv300: 0 }, "Tecnica": { lv300: 0 }, "Blocco": { lv300: 0 }, "Parata": { lv300: 0 }, "Velocità": { lv300: 0 } };
            }
        }

        dbs[slot] = dbRef;

        const techSelectEl = document.getElementById(`sim-tech-select-${slot}`);
        if (techSelectEl) {
            let optionsHtml = '';

            dbRef.myTechniques.forEach(tKey => {
                const tDef = techniquesLibrary[tKey];
                if (tDef) {
                    optionsHtml += `<div data-value="${tKey}" style="display:flex; align-items:center; overflow:hidden;">${formatTechNameHTML(tDef)}</div>`;
                }
            });

            const availableManuals = universalManualsKeys.filter(m => !dbRef.myTechniques.includes(m));
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

            if (dbRef.myTechniques.length > 0) {
                const firstT = techniquesLibrary[dbRef.myTechniques[0]];
                setCustomSelectValue(`sim-tech-select-${slot}`, dbRef.myTechniques[0], formatTechNameHTML(firstT));
            } else {
                setCustomSelectValue(`sim-tech-select-${slot}`, '', '-- Nessuna Tecnica --');
            }

            initCustomSelect(techSelectEl, (val) => {
                const tDef = techniquesLibrary[val];
                if(tDef) {
                    const isManual = availableManuals.includes(val);
                    setCustomSelectValue(`sim-tech-select-${slot}`, val, formatTechNameHTML(tDef, isManual));
                }
                updateStatIcon(val, slot);
                applyPresets(slot);
            });

            updateStatIcon(techSelectEl.dataset.value, slot);
        }

        const container = document.getElementById(`dynamic-passives-container-${slot}`);
        if (container) {
            container.innerHTML = [...(dbRef.myBasicPassivesIds || []), ...(dbRef.myRarityPassivesIds || [])].map(pId => {
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

            container.querySelectorAll('.sim-passive-lvl-select').forEach(sel => {
                initCustomSelect(sel, () => runSimulation(slot));
            });
        }

        applyPresets(slot);

    } catch (err) { console.error(`Errore caricamento slot ${slot}:`, err); }
}

function applyPresets(slot) {
    if (!dbs[slot]) return;
    const dbRef = dbs[slot];

    const modeNode = document.querySelector('input[name="dataSource"]:checked');
    const mode = modeNode ? modeNode.value : 'collection';

    const techKey = document.getElementById(`sim-tech-select-${slot}`).dataset.value;
    const statKey = techKey && techniquesLibrary[techKey] ? getStatKeyByIcon(techniquesLibrary[techKey].icon) : 'Tiro';

    let statVal = 0;
    let techLvIndex = 9;
    let passivesConfig = {};

    if (mode === 'max') {
        statVal = dbRef.stats && dbRef.stats[statKey] ? dbRef.stats[statKey]['lv300'] : 0;
        techLvIndex = 9;
        [...(dbRef.myBasicPassivesIds || []), ...(dbRef.myRarityPassivesIds || [])].forEach(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            passivesConfig[pId] = pDef ? pDef.levels.length - 1 : 0;
        });
    } else {
        const coll = collectionData[dbRef.id] || {};
        statVal = coll.stats ? (coll.stats[statKey] || 0) : 0;
        techLvIndex = coll.techLevels ? (coll.techLevels[techKey] || 0) : 0;

        const cPass = coll.passives || {};
        [...(dbRef.myBasicPassivesIds || []), ...(dbRef.myRarityPassivesIds || [])].forEach(pId => {
            passivesConfig[pId] = cPass[pId] !== undefined ? cPass[pId] : -1;
        });
    }

    document.getElementById(`sim-custom-stat-${slot}`).value = statVal;
    setCustomSelectValue(`sim-tech-lvl-select-${slot}`, techLvIndex + 1, `Lv. ${techLvIndex + 1}`);

    document.getElementById(`dynamic-passives-container-${slot}`).querySelectorAll('.sim-passive-lvl-select').forEach(sel => {
        const pid = sel.dataset.passiveId;
        const targetVal = passivesConfig[pid] === -1 ? 'disabled' : passivesConfig[pid];
        const targetHtml = targetVal === 'disabled' ? 'Bloccata' : `Lv. ${targetVal + 1}`;
        setCustomSelectValue(sel, targetVal, targetHtml);
    });

    runSimulation(slot);
}

function runSimulation(slot) {
    const isManual = document.getElementById(`sim-manual-mode-switch-${slot}`).checked;
    const colorClass = 'text-info';

    if (isManual) {
        const baseStat = parseFloat(document.getElementById(`sim-custom-stat-${slot}`).value) || 0;
        const statBonusSum = manualStatBonuses[slot].reduce((acc, curr) => acc + curr, 0);
        const totalStat = baseStat + statBonusSum;

        const roleMult = parseFloat(document.getElementById(`sim-role-select-${slot}`).dataset.value) || 1.00;

        const baseTechPower = parseFloat(document.getElementById(`sim-manual-tech-power-${slot}`).value) || 0;
        const powerBonusSum = manualPowerBonuses[slot].reduce((acc, curr) => acc + curr, 0);
        const totalTechPower = baseTechPower + powerBonusSum;

        const hasStab = document.getElementById(`sim-stab-${slot}`).checked;
        const stabMult = hasStab ? 1.20 : 1.00;

        const adv = parseFloat(document.getElementById(`sim-advantage-select-${slot}`).dataset.value) || 1.00;

        const step1 = Math.floor(totalStat * roleMult);
        const step2 = Math.floor(step1 * (totalTechPower / 100));
        const step3 = Math.floor(step2 * stabMult);
        const finalDamage = Math.floor(step3 * adv);

        const formulaStr = `<span style="color:#1269e8; font-weight:900;">Equazione Manuale:</span><br>⌊ ⌊ ⌊ (${baseStat} + ${statBonusSum}) &times; ${roleMult.toFixed(2)} ⌋ &times; (${totalTechPower} / 100) ⌋ &times; ${stabMult.toFixed(2)} ⌋ &times; ${adv.toFixed(2)}`;

        document.getElementById(`damage-result-${slot}`).textContent = finalDamage.toLocaleString('it-IT');
        document.getElementById(`damage-formula-${slot}`).innerHTML = formulaStr;

        document.getElementById(`stats-display-${slot}`).innerHTML = `
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Stat Base:</strong> <span class="${colorClass} fw-bold">${baseStat.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Totale Somme Stat:</strong> <span class="${colorClass} fw-bold">+${statBonusSum.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Moltiplicatore Ruolo:</strong> <span class="${colorClass} fw-bold">x${roleMult.toFixed(2)}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Potenza Tecnica Base:</strong> <span class="${colorClass} fw-bold">${baseTechPower.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Totale Somme Potenza:</strong> <span class="${colorClass} fw-bold">+${powerBonusSum.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>STAB:</strong> <span class="${colorClass} fw-bold">x${stabMult.toFixed(2)}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Vantaggio Elemento:</strong> <span class="${colorClass} fw-bold">x${adv.toFixed(2)}</span></li>
        `;

        const stabLabel = document.getElementById(`stab-label-${slot}`);
        stabLabel.textContent = hasStab ? "STAB ATTIVO (x1.20)" : "STAB INATTIVO (x1.00)";
        stabLabel.className = `form-check-label fw-bold small ${hasStab ? 'text-success' : 'text-secondary'}`;

        document.getElementById(`passive-display-${slot}`).innerHTML = '<li><span class="text-secondary fw-normal">Modalità Manuale attiva con liste di valori aggiunti dinamici.</span></li>';

    } else {
        if (!dbs[slot]) return;

        const techKey = document.getElementById(`sim-tech-select-${slot}`).dataset.value;
        const techLvlIndex = parseInt(document.getElementById(`sim-tech-lvl-select-${slot}`).dataset.value) - 1;
        const roleMult = parseFloat(document.getElementById(`sim-role-select-${slot}`).dataset.value);
        const adv = parseFloat(document.getElementById(`sim-advantage-select-${slot}`).dataset.value);
        const customStatVal = document.getElementById(`sim-custom-stat-${slot}`).value;

        const passiveSelections = Array.from(document.getElementById(`dynamic-passives-container-${slot}`).querySelectorAll('.sim-passive-lvl-select'))
            .filter(s => s.dataset.value !== 'disabled')
            .map(s => {
                const id = s.dataset.passiveId;
                const stackInput = document.querySelector(`#dynamic-passives-container-${slot} .sim-passive-stacks[data-passive-id="${id}"]`);
                return { id, lvIndex: parseInt(s.dataset.value), stacks: stackInput ? (parseInt(stackInput.value) || 1) : 1 };
            });

        const data = calculateDamageData(dbs[slot], techKey, techLvlIndex, customStatVal, roleMult, adv, passiveSelections, 0);

        if (!data) return;

        const formulaStr = `<span style="color:#1269e8; font-weight:900;">Equazione:</span><br>⌊ ⌊ ⌊ (${data.baseStat} + ${data.passiveStatBuff}) &times; ${data.roleMult.toFixed(2)} ⌋ &times; ((${data.techPower} + ${data.passivePowerBuff}) / 100) ⌋ &times; ${data.stabMult} ⌋ &times; ${data.adv}`;

        document.getElementById(`damage-result-${slot}`).textContent = data.danno.toLocaleString('it-IT');
        document.getElementById(`damage-formula-${slot}`).innerHTML = formulaStr;

        document.getElementById(`stats-display-${slot}`).innerHTML = `
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Cat. Tecnica:</strong> <span class="${colorClass} fw-bold">${data.statKey}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Stat Base:</strong> <span class="${colorClass} fw-bold">${data.baseStat.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Buff Stat:</strong> <span class="${colorClass} fw-bold">+${data.passiveStatBuff}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Moltiplicatore Ruolo:</strong> <span class="${colorClass} fw-bold">x${data.roleMult.toFixed(2)}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Potenza Base Mossa:</strong> <span class="${colorClass} fw-bold">${data.techPower}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Buff Potenza:</strong> <span class="${colorClass} fw-bold">+${data.passivePowerBuff}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>STAB:</strong> <span class="${colorClass} fw-bold">x${data.stabMult.toFixed(2)}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Vantaggio:</strong> <span class="${colorClass} fw-bold">x${data.adv.toFixed(2)}</span></li>
        `;

        const stabLabel = document.getElementById(`stab-label-${slot}`);
        const stabCheckbox = document.getElementById(`sim-stab-${slot}`);
        if (stabLabel && stabCheckbox) {
            stabCheckbox.checked = data.hasStab;
            stabLabel.textContent = data.hasStab ? "STAB ATTIVO (x1.20)" : "STAB INATTIVO (x1.00)";
            stabLabel.className = `form-check-label fw-bold small ${data.hasStab ? 'text-success' : 'text-secondary'}`;
        }

        const display = document.getElementById(`passive-display-${slot}`);
        if (display) {
            display.innerHTML = data.passiveData.length > 0
                ? data.passiveData.map(p => `<li><span class="${colorClass}">${p.active ? "🟢" : "⚪"} ${p.title} (Lv. ${p.level}):</span> <span class="text-secondary ms-1 fw-normal">${p.desc}</span></li>`).join('')
                : '<li><span class="text-secondary fw-normal">Nessuna passiva.</span></li>';
        }
    }
}

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
                intro: "<div style='text-align: center;'><h4 class='text-primary fw-bold mb-3'>⚡ Simulatore 1vs1</h4><p>Benvenuto nel laboratorio di calcolo! Puoi analizzare una mossa o premere 'Confronta' per paragonarne due fianco a fianco!</p></div>"
            }
        ]
    }).start();
}

document.addEventListener('DOMContentLoaded', init);