// js/Controllers/mode5vs1.js

import { characterRegistry, passivesLibrary, techniquesLibrary } from '../Core/database.js';
import { extractPosition, getDailyTrialConfig } from '../Core/parsers.js';
import { calculateTeamDamage } from '../Core/calculator.js';
import { AuthManager } from '../Services/auth.js';
import { TrialOptimizer } from '../Core/trialOptimizer.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

class AppController {
    constructor() {
        this.auth = new AuthManager();
        this.slotsCount = 5;
        this.activeTeam = Array(this.slotsCount).fill(null);
        this.lastResult = null;
        this.collectionData = {};

        this.optimizer = new TrialOptimizer(this);
        this.init();

        // Controllo se è la prima volta che l'utente entra nel Simulatore
        if (!localStorage.getItem('tutorial_sim_seen')) {
            setTimeout(() => this.startTutorial(), 500);
        }
    }

    init() {
        this.renderSimSlots();
        this.setupGlobalListeners();

        const todayConfig = getDailyTrialConfig();
        this.setUISelectValue('simMode', todayConfig.mode);
        this.setUISelectValue('opponentElement', todayConfig.opp);
        this.updateStageBonusUI();
        this.updateMetaLink();

        document.getElementById('btn-login').addEventListener('click', () => this.auth.loginWithGoogle());
        document.getElementById('btn-logout').addEventListener('click', () => this.auth.logout());
        document.getElementById('btn-optimize').addEventListener('click', () => this.optimizer.runOptimization());

        // Aggiunto l'evento per il tasto "Guida"
        const tutorialBtn = document.getElementById('btn-tutorial');
        if (tutorialBtn) tutorialBtn.addEventListener('click', () => this.startTutorial());

        this.auth.setAuthStateListener((user) => this.handleAuthState(user));
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

    updateMetaLink() {
        const mode = document.getElementById('simMode').dataset.value;
        const opp = document.getElementById('opponentElement').dataset.value;
        const link = document.getElementById('link-to-meta');
        if (link) {
            link.href = `meta5vs1.html?mode=${mode}&opp=${opp}`;
        }
    }

    updateStageBonusUI() {
        const val = document.getElementById('simMode').dataset.value;
        document.getElementById('stageBonusDisplay').textContent = val === 'defense' ? '20' : '10';

        const oppVal = document.getElementById('opponentElement').dataset.value;
        const stageElSelect = document.getElementById('stageElement');
        const mapStage = {
            'None': { val: '', text: 'Nessuno', img: '' },
            'Wind': { val: 'Forest', text: 'Foresta', img: 'img/Element/Icon_Element_Forest.png' },
            'Mountain': { val: 'Wind', text: 'Vento', img: 'img/Element/Icon_Element_Wind.png' },
            'Fire': { val: 'Mountain', text: 'Montagna', img: 'img/Element/Icon_Element_Mountain.png' },
            'Forest': { val: 'Fire', text: 'Fuoco', img: 'img/Element/Icon_Element_Fire.png' }
        };
        const stage = mapStage[oppVal] || mapStage['None'];
        stageElSelect.dataset.value = stage.val;

        const stageSpan = stageElSelect.querySelector('.select-selected span');
        if(stage.img) {
            stageSpan.innerHTML = `<img src="${stage.img}" style="width:20px; vertical-align:middle; margin-right:5px;"> ${stage.text}`;
        } else {
            stageSpan.innerHTML = stage.text;
        }
    }

    handleAuthState(user) {
        const loginBtn = document.getElementById('btn-login');
        const logoutBtn = document.getElementById('btn-logout');
        const greeting = document.getElementById('user-greeting');

        if (user) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            greeting.innerHTML = `Collezione collegata: <span class="text-warning">${user.displayName}</span>`;

            this.loadFromCloud();
        } else {
            const warningModal = document.getElementById('loginWarningModal');
            if (warningModal) {
                warningModal.style.display = 'flex';
            }
        }
    }

    async loadFromCloud() {
        if (!this.auth.user) return;
        this.collectionData = await this.auth.getUserCollection();
        this.updateTechDropdowns();
        this.updateSimulation();
    }

    renderSimSlots() {
        const grid = document.getElementById('teamGrid');
        grid.innerHTML = '';

        let charOptionsHtml = `<div data-value="">-- Seleziona Giocatore --</div>`;
        characterRegistry.forEach(char => {
            charOptionsHtml += `<div data-value="${char.id}"><img src="${char.thumb}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> ${char.name}</div>`;
        });

        for (let i = 0; i < this.slotsCount; i++) {
            const slotCard = document.createElement('div');
            slotCard.className = 'slot-card';
            slotCard.setAttribute('data-slot', i);

            slotCard.innerHTML = `
                <div class="slot-name">Slot ${i + 1}</div>
                <div class="slot-dropdowns" style="display:flex; gap: 15px; flex:1;">
                    <div class="custom-select sim-char-select" data-value="" style="flex: 1; width: 0;">
                        <div class="select-selected"><span>-- Seleziona Giocatore --</span> <i class="fas fa-chevron-down"></i></div>
                        <div class="select-items select-hide">
                            ${charOptionsHtml}
                        </div>
                    </div>
                    <select class="sim-tech-select text-truncate" disabled style="flex: 1; width: 0; padding: 8px 12px; border: 1px solid #d4e1f1; border-radius: 6px; font-weight: bold; color: #102247;"><option value="">-- Seleziona Tecnica --</option></select>
                </div>
                <div class="slot-result">
                    Slot <span class="slot-damage">0</span>
                    <i class="fas fa-info-circle details-btn-icon" style="display:none;" title="Dettagli Calcolo"></i>
                </div>
            `;
            grid.appendChild(slotCard);

            const charCustomSelect = slotCard.querySelector('.sim-char-select');

            initCustomSelect(charCustomSelect, async (charId) => {
                const techSelect = slotCard.querySelector('.sim-tech-select');
                if (!charId) {
                    this.activeTeam[i] = null;
                    techSelect.innerHTML = '<option value="">-- Seleziona Tecnica --</option>';
                    techSelect.disabled = true;
                } else {
                    try {
                        const module = await import(`../Characters/${charId}.js`);
                        this.activeTeam[i] = module.charData;
                        this.renderTechDropdown(i);
                    } catch (err) {}
                }
                this.updateSimulation();
            });

            const techSelect = slotCard.querySelector('.sim-tech-select');
            techSelect.addEventListener('change', () => this.updateSimulation());
            slotCard.querySelector('.details-btn-icon').addEventListener('click', () => this.openDetailsModal(i));
        }
    }

    renderTechDropdown(slotIndex) {
        const charData = this.activeTeam[slotIndex];
        const slotCard = document.querySelector(`.slot-card[data-slot="${slotIndex}"]`);
        const techSelect = slotCard.querySelector('.sim-tech-select');
        const simMode = document.getElementById('simMode').dataset.value;
        const mode = 'collection';

        if (!charData) return;

        let techOptions = '<option value="">-- Seleziona Tecnica --</option>';
        const collData = this.collectionData[charData.id] || {};

        let allMoves = [...charData.myTechniques];

        if (collData.equippedManual && !allMoves.includes(collData.equippedManual)) {
            allMoves.push(collData.equippedManual);
        }

        const isDefense = simMode === 'defense';
        const isGK = extractPosition(charData.position) === 'GK';

        allMoves.forEach(techKey => {
            const techDef = techniquesLibrary[techKey];
            if (!techDef) return;

            if (isDefense) {
                if (isGK && techDef.kind !== 'Parata') return;
                if (!isGK) {
                    if (techDef.kind !== 'Blocco') return;
                    if (techDef.shootBlock === false) return;
                }
            } else {
                if (techDef.kind !== 'Tiro') return;
            }

            const isTaughtMove = !charData.myTechniques.includes(techKey);

            let lv;
            if (isTaughtMove && techKey !== collData.equippedManual) {
                lv = 1;
            } else {
                lv = collData.techLevels && collData.techLevels[techKey] !== undefined ? (collData.techLevels[techKey] + 1) : 1;
            }

            const manualTag = isTaughtMove ? " 📕" : "";
            techOptions += `<option value="${techKey}">${techDef.name} (Lv ${lv})${manualTag}</option>`;
        });

        techSelect.innerHTML = techOptions;
        techSelect.disabled = false;
    }

    updateTechDropdowns() {
        for (let i = 0; i < this.slotsCount; i++) {
            if (this.activeTeam[i]) {
                const currentMove = document.querySelector(`.slot-card[data-slot="${i}"] .sim-tech-select`).value;
                this.renderTechDropdown(i);
                document.querySelector(`.slot-card[data-slot="${i}"] .sim-tech-select`).value = currentMove;
            }
        }
    }

    setupGlobalListeners() {
        const simModeSelect = document.getElementById('simMode');
        const opponentElSelect = document.getElementById('opponentElement');

        initCustomSelect(simModeSelect, () => {
            this.updateStageBonusUI();
            this.updateTechDropdowns();
            this.updateSimulation();
            this.updateMetaLink();
        });

        initCustomSelect(opponentElSelect, () => {
            this.updateStageBonusUI();
            this.updateSimulation();
            this.updateMetaLink();
        });

        setupGlobalSelectClose();
    }

    updateSimulation() {
        const teamDataForEngine = [];
        const slotCards = document.querySelectorAll('.slot-card');
        const mode = 'collection';

        const stageConfig = {
            element: document.getElementById('stageElement').dataset.value,
            bonus: parseInt(document.getElementById('stageBonusDisplay').textContent) || 0,
            opponent: document.getElementById('opponentElement').dataset.value,
            mode: document.getElementById('simMode').dataset.value
        };

        for (let i = 0; i < this.slotsCount; i++) {
            const charData = this.activeTeam[i];
            const techSelect = slotCards[i].querySelector('.sim-tech-select');
            const moveName = techSelect ? techSelect.value : null;

            if (charData && moveName) {
                const engineFormat = this.optimizer.createCharEngineFormat(charData, moveName, mode);
                const techDef = techniquesLibrary[moveName];

                const advBonus = this.optimizer.getAdvantageBonus(techDef.element, stageConfig.opponent, techDef.kind, stageConfig.mode);
                if (advBonus > 0) {
                    engineFormat._hasAdvantageBonus = advBonus;
                    if (!engineFormat.customTechPower) engineFormat.customTechPower = {};
                    engineFormat.customTechPower[moveName] = advBonus;
                }

                teamDataForEngine.push(engineFormat);
            }
        }

        if (teamDataForEngine.length === 0) { this.clearDisplay(); return; }

        this.lastResult = calculateTeamDamage(teamDataForEngine, stageConfig);
        teamDataForEngine.forEach((engineFmt, idx) => {
            this.lastResult.slots[idx]._hasAdvantageBonus = engineFmt._hasAdvantageBonus || 0;
        });

        let engineIndex = 0;
        for (let i = 0; i < this.slotsCount; i++) {
            const card = slotCards[i];
            const detailsBtn = card.querySelector('.details-btn-icon');

            if (this.activeTeam[i] && card.querySelector('.sim-tech-select').value) {
                const slotResult = this.lastResult.slots[engineIndex];
                card.querySelector('.slot-damage').textContent = Math.floor(slotResult.calculations.damage).toLocaleString('it-IT');
                detailsBtn.style.display = 'inline-block';
                engineIndex++;
            } else {
                card.querySelector('.slot-damage').textContent = "0";
                detailsBtn.style.display = 'none';
            }
        }

        document.getElementById('totalRawDamage').textContent = Math.floor(this.lastResult.totalDamage).toLocaleString('it-IT');
        document.getElementById('defenseMult').textContent = `x${this.lastResult.finalMultiplier.toFixed(1)}`;
        document.getElementById('totalScore').textContent = Math.floor(this.lastResult.finalScore).toLocaleString('it-IT');

        const clearBox = document.getElementById('defenseClearCheck');
        if (stageConfig.mode === 'defense') {
            clearBox.innerHTML = this.lastResult.isClear ? "✓ SOGLIA DIFESA SUPERATA (Danno ≥ 200.000) <br> <span style='font-size:0.9rem; color:#4caf50;'>Moltiplicatore applicato: x1.5</span>" : "SOTTO SOGLIA DIFESA <br> <span style='font-size:0.9rem; color:#f44336;'>Moltiplicatore applicato: x1.0</span>";
            clearBox.style.color = "#ffca28";
        } else {
            clearBox.innerHTML = this.lastResult.isClear ? "🔥 SOGLIA ATTACCO SUPERATA (Danno ≥ 250.000) <br> <span style='font-size:0.9rem; color:#4caf50;'>Moltiplicatore applicato: x3.6</span>" : "SOTTO SOGLIA ATTACCO <br> <span style='font-size:0.9rem; color:#f44336;'>Moltiplicatore applicato: x2.4</span>";
            clearBox.style.color = "#ffca28";
        }
    }

    openDetailsModal(slotIndex) {
        if (!this.lastResult || !this.lastResult.slots[slotIndex]) return;
        const slotData = this.lastResult.slots[slotIndex];
        const calc = slotData.calculations;
        const charDb = this.activeTeam[slotIndex];

        document.getElementById('modalTitle').textContent = `Dettagli: ${slotData.charName}`;

        document.getElementById('modalMath').innerHTML = `
            <div>Base Stat (${slotData.statType}): ${calc.base.total.toLocaleString('it-IT')}</div>
            <div>Potenza Mossa: ${calc.power.total}</div>
            <div>Moltiplicatore (STAB + Affinità): x${calc.multipliers.attribute}</div>
            <div>Moltiplicatore Catena: x${calc.multipliers.chain}</div>
            <div style="color:#1269e8; font-size:1.2rem; margin-top: 15px; border-top: 2px solid #d4e1f1; padding-top: 10px;">
                Equazione Reale Gioco:<br>⌊ ⌊ ⌊ ${calc.base.total.toLocaleString('it-IT')} × ${calc.power.total}% ⌋ × ${calc.multipliers.attribute} ⌋ × ${calc.multipliers.chain} ⌋ = <strong>${Math.floor(calc.damage).toLocaleString('it-IT')}</strong>
            </div>
        `;

        const categorizeDetail = (detail) => {
            if (!detail.isSelf) return 'compagni';
            const pDef = passivesLibrary.find(p => p.title === detail.passiveName);
            if (!pDef) return 'livello';
            if (pDef.category === 'Reroll') return 'reroll';
            if (charDb.myRarityPassivesIds && charDb.myRarityPassivesIds.includes(pDef.id)) return 'risveglio';
            return 'livello';
        };

        const renderGroup = (groupArr, groupTitle) => {
            if (groupArr.length === 0) return '';
            let html = `<div class="mt-3 mb-2 ms-1 fw-bold text-uppercase" style="font-size: 0.8rem; color: #506482; letter-spacing: 0.5px;">${groupTitle}</div>`;
            groupArr.forEach(detail => {
                let label = detail.isSelf ? `[${slotData.charName}] ${detail.passiveName} (Self)` : `[${detail.source}] ${detail.passiveName} (Alleato)`;
                html += `
                    <li>
                        <div><span class="passive-source fw-bold" style="color:#0b1a42;">${label}</span></div>
                        <span class="val-badge">+${detail.value.toLocaleString('it-IT')}</span>
                    </li>`;
            });
            return html;
        };

        let statsGroups = { livello: [], risveglio: [], reroll: [], compagni: [] };
        slotData.details.stats.forEach(detail => statsGroups[categorizeDetail(detail)].push(detail));

        statsGroups.compagni.sort((a, b) => a.source.localeCompare(b.source));

        let statHtml = `
            <li>
                <span class="passive-source fw-bold" style="color: #0b1a42;">Statistica Base</span>
                <span class="val-badge">+${calc.base.naked.toLocaleString('it-IT')}</span>
            </li>`;

        statHtml += renderGroup(statsGroups.livello, "Passive di Livello");
        statHtml += renderGroup(statsGroups.risveglio, "Passive di Risveglio");
        statHtml += renderGroup(statsGroups.reroll, "Passive di Reroll");
        statHtml += renderGroup(statsGroups.compagni, "Passive Compagni");
        document.getElementById('modalStatList').innerHTML = statHtml;


        let powerGroups = { livello: [], risveglio: [], reroll: [], compagni: [] };
        slotData.details.power.forEach(detail => powerGroups[categorizeDetail(detail)].push(detail));

        powerGroups.compagni.sort((a, b) => a.source.localeCompare(b.source));

        let powerHtml = `
            <li>
                <span class="passive-source fw-bold" style="color: #0b1a42;">Potenza Base Mossa</span>
                <span class="val-badge">+${calc.power.naked}</span>
            </li>`;

        if (calc.power.stageBonus > 0) {
            powerHtml += `
            <li>
                <span class="passive-source fw-bold" style="color: #0b1a42;">Bonus Giornaliero (${document.getElementById('stageElement').dataset.value})</span>
                <span class="val-badge">+${calc.power.stageBonus}</span>
            </li>`;
        }

        if (slotData._hasAdvantageBonus > 0) {
            powerHtml += `
            <li style="border-left: 4px solid #dc3545; background: #fff5f5;">
                <span class="passive-source text-danger fw-bold"><i class="fas fa-fire-alt"></i> Vantaggio vs Avversario</span>
                <span class="val-badge bg-warning text-dark border border-warning">+${slotData._hasAdvantageBonus}</span>
            </li>`;
        }

        powerHtml += renderGroup(powerGroups.livello, "Passive di Livello");
        powerHtml += renderGroup(powerGroups.risveglio, "Passive di Risveglio");
        powerHtml += renderGroup(powerGroups.reroll, "Passive di Reroll");
        powerHtml += renderGroup(powerGroups.compagni, "Passive Compagni");
        document.getElementById('modalPowerList').innerHTML = powerHtml;

        document.getElementById('detailsModal').style.display = 'flex';
    }

    clearDisplay() {
        document.querySelectorAll('.slot-damage').forEach(el => el.textContent = "0");
        document.querySelectorAll('.details-btn-icon').forEach(btn => btn.style.display = 'none');
        document.getElementById('totalRawDamage').textContent = "0";
        document.getElementById('defenseMult').textContent = "x1.0";
        document.getElementById('totalScore').textContent = "0";
        document.getElementById('defenseClearCheck').textContent = "";
        this.lastResult = null;
    }

    // ==========================================
    // TUTORIAL INTRO.JS (GUIDA INTERATTIVA + STILE NUOVO)
    // ==========================================
    startTutorial() {
        localStorage.setItem('tutorial_sim_seen', 'true');

        introJs().setOptions({
            nextLabel: 'Avanti →',
            prevLabel: '← Indietro',
            doneLabel: 'Ho capito! 🚀',
            showStepNumbers: true,
            showBullets: true,
            overlayOpacity: 0.8,
            steps: [
                {
                    intro: "<div style='text-align: center;'><h4 class='text-primary fw-bold mb-3' style='text-transform: uppercase; letter-spacing: 1px;'>⚡ Simulatore 5vs1</h4><p>Benvenuto nella modalità <strong>Chain Simulator</strong>!<br><br>Qui puoi testare i danni della tua squadra contro i Boss Evento, usando direttamente i giocatori salvati nella tua <strong>Collezione</strong>.</p></div>"
                },
                {
                    element: document.querySelector('.stage-config'),
                    intro: "<div><h5 class='text-warning fw-bold mb-2' style='text-transform: uppercase;'>⚙️ Impostazioni Sfida</h5><p class='mb-0'>Scegli la fase (Attacco/Difesa) e l'elemento dell'Avversario.<br>Il sistema calcolerà in automatico i <strong>vantaggi elementali</strong> e i bonus dello stage per la mappa!</p></div>",
                    position: 'bottom'
                },
                {
                    element: document.getElementById('btn-optimize'),
                    intro: "<div><h5 class='text-success fw-bold mb-2' style='text-transform: uppercase;'>🤖 Auto-Ottimizza</h5><p class='mb-0'>Non sai chi schierare?<br>Premi questo pulsante e l'algoritmo analizzerà tutta la tua Collezione per scovare matematicamente le <strong>5 migliori formazioni possibili</strong> in base alle sinergie!</p></div>",
                    position: 'bottom'
                },
                {
                    element: document.getElementById('teamGrid'),
                    intro: "<div><h5 class='text-info fw-bold mb-2' style='text-transform: uppercase;'>⚽ La Tua Squadra</h5><p class='mb-0'>Se preferisci inserire i giocatori a mano, selezionali in questi slot.<br>Verranno caricati istantaneamente i <strong>livelli, le mosse e le passive</strong> che hai salvato in Collezione.</p></div>",
                    position: 'top'
                },
                {
                    element: document.querySelector('.global-results'),
                    intro: "<div><h5 class='text-danger fw-bold mb-2' style='text-transform: uppercase;'>📊 Risultato e Dettagli</h5><p class='mb-0'>Scopri se hai superato le <strong>Soglie di Vittoria</strong>.<br>Clicca sulle icone <i class='fas fa-info-circle text-info'></i> vicino ai danni per ispezionare tutta la matematica dietro al calcolo del singolo personaggio!</p></div>",
                    position: 'top'
                }
            ]
        }).start();
    }
}

new AppController();