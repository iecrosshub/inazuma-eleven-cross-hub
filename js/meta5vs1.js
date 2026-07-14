// js/meta5vs1.js

import { TrialOptimizer } from './trialOptimizer.js';

class MetaController {
    constructor() {
        this.collectionData = {}; // Finta collezione vuota
        this.activeTeam = []; // Finto team vuoto
        this.optimizer = new TrialOptimizer(this);
        this.init();
    }

    init() {
        this.setupGlobalListeners();
        document.getElementById('btn-optimize').addEventListener('click', () => this.runMetaOptimization());

        document.addEventListener('click', () => {
            document.querySelectorAll('.select-items').forEach(el => el.classList.add('select-hide'));
        });
    }

    initCustomSelect(customSelectEl, onChangeCallback) {
        const selectedDiv = customSelectEl.querySelector('.select-selected');
        const itemsDiv = customSelectEl.querySelector('.select-items');

        const newSelected = selectedDiv.cloneNode(true);
        selectedDiv.parentNode.replaceChild(newSelected, selectedDiv);

        newSelected.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.select-items').forEach(el => {
                if (el !== itemsDiv) el.classList.add('select-hide');
            });
            itemsDiv.classList.toggle('select-hide');
        });

        itemsDiv.querySelectorAll('div').forEach(option => {
            option.addEventListener('click', () => {
                const oldVal = customSelectEl.dataset.value;
                const newVal = option.dataset.value;
                customSelectEl.dataset.value = newVal;
                newSelected.querySelector('span').innerHTML = option.innerHTML;
                itemsDiv.classList.add('select-hide');
                if (oldVal !== newVal && onChangeCallback) {
                    onChangeCallback(newVal);
                }
            });
        });
    }

    setupGlobalListeners() {
        const simModeSelect = document.getElementById('simMode');
        const stageElSelect = document.getElementById('stageElement');
        const opponentElSelect = document.getElementById('opponentElement');

        this.initCustomSelect(simModeSelect, (val) => {
            document.getElementById('stageBonusDisplay').textContent = val === 'defense' ? '20' : '10';
        });

        this.initCustomSelect(opponentElSelect, (val) => {
            const mapStage = {
                'None': { val: '', text: 'Nessuno' },
                'Wind': { val: 'Forest', text: 'Foresta' },
                'Mountain': { val: 'Wind', text: 'Vento' },
                'Fire': { val: 'Mountain', text: 'Montagna' },
                'Forest': { val: 'Fire', text: 'Fuoco' }
            };
            const stage = mapStage[val] || mapStage['None'];
            stageElSelect.dataset.value = stage.val;
        });
    }

    runMetaOptimization() {
        const allowManuals = document.getElementById('allowManualsToggle').checked;

        const stageConfig = {
            element: document.getElementById('stageElement').dataset.value,
            bonus: parseInt(document.getElementById('stageBonusDisplay').textContent) || 0,
            opponent: document.getElementById('opponentElement').dataset.value,
            mode: document.getElementById('simMode').dataset.value
        };

        this.optimizer.runOptimization({
            mode: 'max',
            allowManuals: allowManuals,
            stageConfig: stageConfig,
            modalId: null,
            containerId: 'metaResultsContainer',
            hideApplyButton: true,
            ignoreRerolls: true,
            hideScore: true // NUOVA OPZIONE: Nasconde il punteggio matematico
        });
    }
}

new MetaController();