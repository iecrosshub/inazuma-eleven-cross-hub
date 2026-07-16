// js/Controllers/meta5vs1.js

import { TrialOptimizer } from '../Core/trialOptimizer.js';
import { getUrlParam, getDailyTrialConfig } from '../Core/parsers.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

class MetaController {
    constructor() {
        this.collectionData = {};
        this.activeTeam = [];
        this.optimizer = new TrialOptimizer(this);
        this.init();
    }

    init() {
        this.setupGlobalListeners();
        document.getElementById('btn-optimize').addEventListener('click', () => this.runMetaOptimization());

        const urlMode = getUrlParam('mode');
        const urlOpp = getUrlParam('opp');

        if (urlMode && urlOpp) {
            // Se clicchi dal banner blu in Mode5vs1, prende le impostazioni e parte!
            this.setUISelectValue('simMode', urlMode);
            this.setUISelectValue('opponentElement', urlOpp);
            this.updateStageBonusUI();

            setTimeout(() => this.runMetaOptimization(), 300);
        } else {
            // Altrimenti, pre-imposta da solo la sfida del giorno in corso (shiftata alle 22:00)
            const todayConfig = getDailyTrialConfig();
            this.setUISelectValue('simMode', todayConfig.mode);
            this.setUISelectValue('opponentElement', todayConfig.opp);
            this.updateStageBonusUI();
        }
    }

    setUISelectValue(selectId, value) {
        const el = document.getElementById(selectId);
        if(!el) return;
        const option = el.querySelector(`.select-items div[data-value="${value}"]`);
        if(option) {
            el.dataset.value = value;
            el.querySelector('.select-selected span').innerHTML = option.innerHTML;
        }
    }

    updateStageBonusUI() {
        const val = document.getElementById('simMode').dataset.value;
        document.getElementById('stageBonusDisplay').textContent = val === 'defense' ? '20' : '10';

        const oppVal = document.getElementById('opponentElement').dataset.value;
        const stageElSelect = document.getElementById('stageElement');
        const mapStage = {
            'None': { val: '', text: 'Nessuno' },
            'Wind': { val: 'Forest', text: 'Foresta' },
            'Mountain': { val: 'Wind', text: 'Vento' },
            'Fire': { val: 'Mountain', text: 'Montagna' },
            'Forest': { val: 'Fire', text: 'Fuoco' }
        };
        const stage = mapStage[oppVal] || mapStage['None'];
        stageElSelect.dataset.value = stage.val;
    }

    setupGlobalListeners() {
        const simModeSelect = document.getElementById('simMode');
        const opponentElSelect = document.getElementById('opponentElement');

        initCustomSelect(simModeSelect, () => this.updateStageBonusUI());
        initCustomSelect(opponentElSelect, () => this.updateStageBonusUI());

        setupGlobalSelectClose();
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
            hideScore: true
        });
    }
}

new MetaController();