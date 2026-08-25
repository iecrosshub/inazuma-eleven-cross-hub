import { characterRegistry, techniquesLibrary, passivesLibrary, universalManualsKeys } from '../Core/database.js';
import { getStatKeyByIcon } from '../Core/parsers.js';
import { calculateDamageData, calcolaStatisticheEsatte } from '../Core/calculator.js';
import { AuthManager } from '../Services/auth.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

let currentDb = null;
let collectionData = {};
const auth = new AuthManager();

// Array per memorizzare i valori manuali da sommare con i pulsanti +
let manualStatBonuses = [];
let manualPowerBonuses = [];

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

    // Gestione tasti "+" per aggiunta valori manuali
    document.getElementById('btn-add-stat-bonus').addEventListener('click', () => {
        const input = document.getElementById('sim-input-stat-val');
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            manualStatBonuses.push(val);
            input.value = '';
            renderStatBonusesUI();
            runSimulation();
        }
    });

    document.getElementById('btn-add-power-val').addEventListener('click', () => {
        const input = document.getElementById('sim-input-power-val');
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            manualPowerBonuses.push(val);
            input.value = '';
            renderPowerBonusesUI();
            runSimulation();
        }
    });

    // Gestione click sui cestini (rimozione elementi)
    document.getElementById('stat-bonuses-list').addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-stat-bonus');
        if (btn) {
            const index = parseInt(btn.dataset.index);
            manualStatBonuses.splice(index, 1);
            renderStatBonusesUI();
            runSimulation();
        }
    });

    document.getElementById('power-bonuses-list').addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-power-bonus');
        if (btn) {
            const index = parseInt(btn.dataset.index);
            manualPowerBonuses.splice(index, 1);
            renderPowerBonusesUI();
            runSimulation();
        }
    });

    // Toggle modalità manuale
    const manualSwitch = document.getElementById('sim-manual-mode-switch');
    manualSwitch.addEventListener('change', (e) => {
        const isManual = e.target.checked;
        document.getElementById('automatic-mode-container').style.display = isManual ? 'none' : 'block';
        document.getElementById('tech-automatic-section').style.display = isManual ? 'none' : 'block';
        document.getElementById('tech-manual-section').style.display = isManual ? 'block' : 'none';
        document.getElementById('dynamic-passives-container').style.display = isManual ? 'none' : 'block';
        document.getElementById('manual-additions-container').style.display = isManual ? 'block' : 'none';
        document.getElementById('passives-card-title').textContent = isManual ? 'Valori Aggiuntivi da Sommare' : 'Livello delle Abilità Passive';
        document.getElementById('results-secondary-title').textContent = isManual ? 'Riepilogo Inserimenti' : 'Effetti delle Passive';

        const stabCheckbox = document.getElementById('sim-stab');
        stabCheckbox.disabled = !isManual;

        runSimulation();
    });

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
        if (e.target.id === 'sim-stab') runSimulation();
    });

    document.addEventListener('input', (e) => {
        if (e.target.matches('input[type="number"]') && !e.target.id.includes('sim-input-')) runSimulation();
    });

    document.getElementById('btn-login').addEventListener('click', () => auth.loginWithGoogle());
    document.getElementById('btn-logout').addEventListener('click', () => auth.logout());

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

    if (!localStorage.getItem('tutorial_simulator_seen')) {
        setTimeout(startTutorial, 800);
    }
}

function renderStatBonusesUI() {
    const container = document.getElementById('stat-bonuses-list');
    if (!container) return;
    container.innerHTML = manualStatBonuses.map((val, index) => `
        <div class="d-flex justify-content-between align-items-center bg-white p-1 px-2 rounded border border-secondary shadow-sm">
            <span class="fw-bold text-primary">+${val.toLocaleString('it-IT')}</span>
            <button class="btn btn-sm btn-outline-danger py-0 px-1 border-0 remove-stat-bonus" data-index="${index}" title="Rimuovi"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join('');
}

function renderPowerBonusesUI() {
    const container = document.getElementById('power-bonuses-list');
    if (!container) return;
    container.innerHTML = manualPowerBonuses.map((val, index) => `
        <div class="d-flex justify-content-between align-items-center bg-white p-1 px-2 rounded border border-secondary shadow-sm">
            <span class="fw-bold text-warning text-dark">+${val.toLocaleString('it-IT')}</span>
            <button class="btn btn-sm btn-outline-danger py-0 px-1 border-0 remove-power-bonus" data-index="${index}" title="Rimuovi"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join('');
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
    const isManual = document.getElementById('sim-manual-mode-switch').checked;

    if (isManual) {
        // --- MODALITÀ MANUALE CON LISTE DINAMICHE ---
        const baseStat = parseFloat(document.getElementById('sim-custom-stat').value) || 0;
        const statBonusSum = manualStatBonuses.reduce((acc, curr) => acc + curr, 0);
        const totalStat = baseStat + statBonusSum;

        const roleMult = parseFloat(document.getElementById('sim-role-select').dataset.value) || 1.00;

        const baseTechPower = parseFloat(document.getElementById('sim-manual-tech-power').value) || 0;
        const powerBonusSum = manualPowerBonuses.reduce((acc, curr) => acc + curr, 0);
        const totalTechPower = baseTechPower + powerBonusSum;

        const hasStab = document.getElementById('sim-stab').checked;
        const stabMult = hasStab ? 1.20 : 1.00;

        const adv = parseFloat(document.getElementById('sim-advantage-select').dataset.value) || 1.00;

        // Formula di calcolo standard con i troncamenti algebrici intermedi
        const step1 = Math.floor(totalStat * roleMult);
        const step2 = Math.floor(step1 * (totalTechPower / 100));
        const step3 = Math.floor(step2 * stabMult);
        const finalDamage = Math.floor(step3 * adv);

        const formulaStr = `<span style="color:#1269e8; font-weight:900;">Equazione Manuale:</span><br>⌊ ⌊ ⌊ (${baseStat} + ${statBonusSum}) &times; ${roleMult.toFixed(2)} ⌋ &times; (${totalTechPower} / 100) ⌋ &times; ${stabMult.toFixed(2)} ⌋ &times; ${adv.toFixed(2)}`;

        document.getElementById('damage-result').textContent = finalDamage.toLocaleString('it-IT');
        document.getElementById('damage-formula').innerHTML = formulaStr;

        document.getElementById('stats-display').innerHTML = `
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Stat Base:</strong> <span class="text-info fw-bold">${baseStat.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Totale Somme Stat:</strong> <span class="text-info fw-bold">+${statBonusSum.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Moltiplicatore Ruolo:</strong> <span class="text-info fw-bold">x${roleMult.toFixed(2)}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Potenza Tecnica Base:</strong> <span class="text-info fw-bold">${baseTechPower.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Totale Somme Potenza:</strong> <span class="text-info fw-bold">+${powerBonusSum.toLocaleString('it-IT')}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>STAB:</strong> <span class="text-info fw-bold">x${stabMult.toFixed(2)}</span></li>
            <li class="border-bottom border-secondary py-1 d-flex justify-content-between"><strong>Vantaggio Elemento:</strong> <span class="text-info fw-bold">x${adv.toFixed(2)}</span></li>
        `;

        const stabLabel = document.getElementById('stab-label');
        stabLabel.textContent = hasStab ? "STAB ATTIVO (x1.20)" : "STAB INATTIVO (x1.00)";
        stabLabel.className = `form-check-label fw-bold small ${hasStab ? 'text-success' : 'text-secondary'}`;

        document.getElementById('passive-display').innerHTML = '<li><span class="text-secondary fw-normal">Modalità Manuale attiva con liste di valori aggiunti dinamici.</span></li>';

    } else {
        // --- MODALITÀ AUTOMATICA ---
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
                intro: "<div style='text-align: center;'>" +
                    "<h4 class='text-primary fw-bold mb-3' style='text-transform: uppercase; letter-spacing: 1px;'>⚡ Simulatore 1vs1</h4>" +
                    "<p>Benvenuto nel laboratorio di calcolo!<br><br>" +
                    "Puoi usare i dati automatici o attivare la <strong>Modalità Manuale</strong> per inserire singolarmente i vari bonus con il tasto <strong>+</strong> e sommarli dinamicamente.</p>" +
                    "</div>"
            }
        ]
    }).start();
}

document.addEventListener('DOMContentLoaded', init);