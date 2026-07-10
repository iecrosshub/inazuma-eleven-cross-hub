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

    charSelect.innerHTML = characterRegistry.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    const urlParams = new URLSearchParams(window.location.search);
    let charParam = urlParams.get('char');

    if (!charParam) {
        charParam = localStorage.getItem('selectedChar');
    }

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
                let opts = '<option value="disabled" selected>Disattivata</option>';
                p.levels.forEach((_, idx) => opts += `<option value="${idx}">Lv. ${idx + 1}</option>`);

                // Rileva se è una passiva cumulativa per mostrare il Contatore!
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
                    <div class="col-${isCumulative ? '5' : '7'} small fw-bold text-secondary" title="${p.template}">
                        ${p.title}
                    </div>
                    <div class="col-${isCumulative ? '4' : '5'}">
                        <select class="form-select form-select-sm sim-passive-lvl-select" data-passive-id="${p.id}">${opts}</select>
                    </div>
                    ${stackHtml}
                </div>`;
            }).join('');
        }
        calculateDamage();
    } catch (err) { console.error("Errore caricamento:", err); }
}

function calculateDamage() {
    if (!currentDb) return;

    // Raccoglie gli input, INCLUSO il numero di Stacks (Volte)
    const selections = Array.from(document.querySelectorAll('.sim-passive-lvl-select'))
        .filter(s => s.value !== 'disabled')
        .map(s => {
            const id = s.dataset.passiveId;
            const stackInput = document.querySelector(`.sim-passive-stacks[data-passive-id="${id}"]`);
            const stacks = stackInput ? parseInt(stackInput.value) || 1 : 1;

            return { id, lvIndex: parseInt(s.value), stacks };
        });

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

    const formulaStr = `<span class="text-info fw-bold">Equazione:</span><br>[(${data.baseStat} + ${data.passiveStatBuff}) &times; ${data.roleMult.toFixed(2)}] &times; (${data.techPower + data.passivePowerBuff}/100) &times; ${data.stab} &times; ${data.adv}`;

    updateSimulatorUI(data, formulaStr);
    updatePassiveDescriptions(data.passiveData);
}

init();