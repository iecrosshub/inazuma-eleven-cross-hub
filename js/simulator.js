// js/simulator.js

import { characterRegistry, techniquesLibrary, passivesLibrary, getStatKeyByIcon, calculateDamageData } from './utils.js';
import { AuthManager } from './auth.js';

let currentDb = null;
let collectionData = {};
const auth = new AuthManager();

async function init() {
    const charSelect = document.getElementById('sim-char');
    if (!charSelect) return;

    charSelect.innerHTML = characterRegistry.map(c => `<option value="${c.id}">${c.name} (${c.romanizedName})</option>`).join('');

    const urlParams = new URLSearchParams(window.location.search);
    let charParam = urlParams.get('char') || localStorage.getItem('selectedChar');

    if (charParam && charSelect.querySelector(`option[value="${charParam}"]`)) {
        charSelect.value = charParam;
    }

    const techLvlSelect = document.getElementById('sim-tech-lvl');
    if (techLvlSelect) {
        techLvlSelect.innerHTML = Array.from({length: 10}, (_, i) => `<option value="${i+1}">Lv. ${i+1}</option>`).join('');
    }

    charSelect.addEventListener('change', loadCharacter);

    // Ascoltatori Eventi
    document.addEventListener('change', (e) => {
        if (e.target.name === 'dataSource') applyPresets(); // Cambio da Max a Collezione
        if (e.target.id === 'sim-tech') applyPresets();     // Cambio Tecnica ricarica i preset
        if (e.target.matches('select, input[type="checkbox"]')) runSimulation();
    });

    document.addEventListener('input', (e) => {
        if (e.target.matches('input[type="number"]')) runSimulation();
    });

    // Gestione Autenticazione e recupero Dati
    document.getElementById('btn-login').addEventListener('click', () => auth.loginWithGoogle());
    document.getElementById('btn-logout').addEventListener('click', () => auth.logout());

    auth.setAuthStateListener(async (user) => {
        const loginBtn = document.getElementById('btn-login');
        const logoutBtn = document.getElementById('btn-logout');
        const greeting = document.getElementById('user-greeting');

        if (user) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            greeting.innerHTML = `Collezione di: <span class="text-warning">${user.displayName}</span>`;
            // FUNZIONE CENTRALIZZATA CHIAMATA QUI:
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
}

async function loadCharacter() {
    const id = document.getElementById('sim-char').value;
    try {
        const module = await import(`./Characters/${id}.js`);
        currentDb = module.charData;

        const techSelect = document.getElementById('sim-tech');
        if (techSelect) {
            techSelect.innerHTML = currentDb.myTechniques
                .filter(tKey => techniquesLibrary[tKey])
                .map(tKey => `<option value="${tKey}">${techniquesLibrary[tKey].name}</option>`).join('');
        }

        const container = document.getElementById('dynamic-passives-container');
        if (container) {
            container.innerHTML = [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].map(pId => {
                const p = passivesLibrary.find(x => x.id === pId);
                if (!p) return '';
                let opts = '<option value="disabled">Bloccata</option>';
                p.levels.forEach((_, idx) => opts += `<option value="${idx}">Lv. ${idx + 1}</option>`);

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
                        <select class="form-select form-select-sm sim-passive-lvl-select" data-passive-id="${p.id}">${opts}</select>
                    </div>
                    ${stackHtml}
                </div>`;
            }).join('');
        }

        applyPresets();

    } catch (err) { console.error("Errore caricamento:", err); }
}

// Funzione che Inserisce Automaticamente i Numeri (Max o Collezione)
function applyPresets() {
    if (!currentDb) return;

    const mode = document.querySelector('input[name="dataSource"]:checked').value;
    const techKey = document.getElementById('sim-tech').value;
    const statKey = techKey && techniquesLibrary[techKey] ? getStatKeyByIcon(techniquesLibrary[techKey].icon) : 'Tiro';

    let statVal = 0;
    let techLvIndex = 9; // Default max
    let passivesConfig = {};

    if (mode === 'max') {
        statVal = currentDb.stats[statKey] ? currentDb.stats[statKey]['lv300'] : 0;
        techLvIndex = 9;
        [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].forEach(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            passivesConfig[pId] = pDef ? pDef.levels.length - 1 : 0;
        });
    } else { // Modalità Collezione
        const coll = collectionData[currentDb.id] || {};
        statVal = coll.stats ? (coll.stats[statKey] || 0) : 0;
        techLvIndex = coll.techLevels ? (coll.techLevels[techKey] || 0) : 0;

        const cPass = coll.passives || {};
        [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].forEach(pId => {
            passivesConfig[pId] = cPass[pId] !== undefined ? cPass[pId] : -1;
        });
    }

    // Inietta i valori nell'interfaccia
    document.getElementById('sim-custom-stat').value = statVal;

    const techSelect = document.getElementById('sim-tech-lvl');
    if (techSelect) techSelect.value = techLvIndex + 1;

    document.querySelectorAll('.sim-passive-lvl-select').forEach(sel => {
        const pid = sel.dataset.passiveId;
        sel.value = passivesConfig[pid] === -1 ? 'disabled' : passivesConfig[pid];
    });

    runSimulation();
}

function runSimulation() {
    if (!currentDb) return;

    const techKey = document.getElementById('sim-tech').value;
    const techLvlIndex = parseInt(document.getElementById('sim-tech-lvl').value) - 1;
    const roleMult = parseFloat(document.getElementById('sim-role').value);
    const adv = parseFloat(document.getElementById('sim-advantage').value);
    const customStatVal = document.getElementById('sim-custom-stat').value;

    const passiveSelections = Array.from(document.querySelectorAll('.sim-passive-lvl-select'))
        .filter(s => s.value !== 'disabled')
        .map(s => {
            const id = s.dataset.passiveId;
            const stackInput = document.querySelector(`.sim-passive-stacks[data-passive-id="${id}"]`);
            return { id, lvIndex: parseInt(s.value), stacks: stackInput ? (parseInt(stackInput.value) || 1) : 1 };
        });

    const data = calculateDamageData(currentDb, techKey, techLvlIndex, customStatVal, roleMult, adv, passiveSelections);

    if (!data) return;

    const formulaStr = `<span style="color:#1269e8; font-weight:900;">Equazione:</span><br>[(${data.baseStat} + ${data.passiveStatBuff}) &times; ${data.roleMult.toFixed(2)}] &times; (${data.techPower} + ${data.passivePowerBuff}/100) &times; ${data.stabMult} &times; ${data.adv}`;

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

document.addEventListener('DOMContentLoaded', init);