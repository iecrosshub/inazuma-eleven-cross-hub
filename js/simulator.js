import { characterRegistry } from './Characters/registry.js';
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { checkStab, getStatKeyByIcon } from './utils.js';
import { calculateAllDamage } from './calcEngine.js';
import { updateSimulatorUI, updatePassiveDescriptions } from './uiSimulator.js';

let currentDb = null;

async function init() {
    const charSelect = document.getElementById('sim-char');
    if (!charSelect) return;

    // Popola le opzioni della tendina
    charSelect.innerHTML = characterRegistry.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    // Cerca il parametro nell'URL
    const urlParams = new URLSearchParams(window.location.search);
    let charParam = urlParams.get('char');

    // IL TRUCCO INFALLIBILE: Se l'URL non ha il parametro (perso a causa del server),
    // leggiamo l'ultimo PG visitato dal localStorage!
    if (!charParam) {
        charParam = localStorage.getItem('selectedChar');
    }

    // Se troviamo un ID valido (da URL o Memoria), lo impostiamo come valore di default
    if (charParam && charSelect.querySelector(`option[value="${charParam}"]`)) {
        charSelect.value = charParam;
    }

    const techLvlSelect = document.getElementById('sim-tech-lvl');
    if (techLvlSelect) {
        techLvlSelect.innerHTML = Array.from({length: 10}, (_, i) => `<option value="${i+1}" ${i === 9 ? 'selected' : ''}>Lv. ${i+1}</option>`).join('');
    }

    charSelect.addEventListener('change', loadCharacter);
    document.addEventListener('change', (e) => {
        if (e.target.matches('select, input')) calculateDamage();
    });

    await loadCharacter();
}

async function loadCharacter() {
    const id = document.getElementById('sim-char').value;
    try {
        // Percorso assoluto corretto
        const module = await import(`./Characters/${id}.js`);
        currentDb = module.charData;

        const techSelect = document.getElementById('sim-tech');
        if (techSelect) {
            techSelect.innerHTML = currentDb.myTechniques
                .filter(tKey => techniquesLibrary[tKey])
                .map(tKey => `<option value="${tKey}">${techniquesLibrary[tKey].name}</option>`).join('');
        }

        // Aggiorna interfaccia passive
        const container = document.getElementById('dynamic-passives-container');
        if (container) {
            container.innerHTML = [...(currentDb.myBasicPassivesIds || []), ...(currentDb.myRarityPassivesIds || [])].map(pId => {
                const p = passivesLibrary.find(x => x.id === pId);
                if (!p) return '';
                let opts = '<option value="disabled" selected>Disattivata</option>';
                p.levels.forEach((_, idx) => opts += `<option value="${idx}">Lv. ${idx + 1}</option>`);
                return `<div class="row g-2 mb-2"><div class="col-7 small">${p.title}</div><div class="col-5"><select class="form-select form-select-sm sim-passive-lvl-select" data-passive-id="${p.id}">${opts}</select></div></div>`;
            }).join('');
        }
        calculateDamage();
    } catch (err) { console.error("Errore caricamento:", err); }
}

function calculateDamage() {
    if (!currentDb) return;

    // Raccoglie gli input
    const selections = Array.from(document.querySelectorAll('.sim-passive-lvl-select'))
        .filter(s => s.value !== 'disabled')
        .map(s => ({ id: s.dataset.passiveId, lvIndex: parseInt(s.value) }));

    const data = calculateAllDamage(
        currentDb,
        document.getElementById('sim-tech').value,
        parseInt(document.getElementById('sim-tech-lvl').value) - 1,
        document.getElementById('sim-lvl').value,
        parseFloat(document.getElementById('sim-role').value),
        checkStab(currentDb.element, techniquesLibrary[document.getElementById('sim-tech').value].elementIcon) ? 1.2 : 1.0,
        parseFloat(document.getElementById('sim-advantage').value),
        selections
    );

    // Formatta la formula
// Formatta la formula (Senza il risultato finale ridondante)
    const formulaStr = `<span class="text-info fw-bold">Equazione:</span><br>[(${data.baseStat} + ${data.passiveStatBuff}) &times; ${data.roleMult.toFixed(2)}] &times; (${data.techPower + data.passivePowerBuff}/100) &times; ${data.stab} &times; ${data.adv}`;
    // Aggiorna UI
    updateSimulatorUI(data, formulaStr);
    updatePassiveDescriptions(data.passiveData);
}

init();