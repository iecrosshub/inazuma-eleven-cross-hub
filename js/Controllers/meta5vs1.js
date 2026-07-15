// js/Controllers/meta5vs1.js

import { TrialOptimizer } from '../Core/trialOptimizer.js';
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
    }

    setupGlobalListeners() {
        const simModeSelect = document.getElementById('simMode');
        const stageElSelect = document.getElementById('stageElement');
        const opponentElSelect = document.getElementById('opponentElement');

        // Sostituiti con il Componente Globale!
        initCustomSelect(simModeSelect, (val) => {
            document.getElementById('stageBonusDisplay').textContent = val === 'defense' ? '20' : '10';
        });

        initCustomSelect(opponentElSelect, (val) => {
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