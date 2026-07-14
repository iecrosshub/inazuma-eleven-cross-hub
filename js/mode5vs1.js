// js/mode5vs1.js

import { characterRegistry, passivesLibrary, techniquesLibrary, calculateTeamDamage, extractPosition, universalManualsKeys } from './utils.js';
import { AuthManager } from './auth.js';
import { TrialOptimizer } from './trialOptimizer.js';

class AppController {
    constructor() {
        this.auth = new AuthManager();
        this.slotsCount = 5;
        this.activeTeam = Array(this.slotsCount).fill(null);
        this.lastResult = null;
        this.collectionData = {};

        this.optimizer = new TrialOptimizer(this);
        this.init();
    }

    init() {
        this.renderSimSlots();
        this.setupGlobalListeners();
        document.getElementById('btn-login').addEventListener('click', () => this.auth.loginWithGoogle());
        document.getElementById('btn-logout').addEventListener('click', () => this.auth.logout());
        document.getElementById('btn-optimize').addEventListener('click', () => this.optimizer.runOptimization());
        this.auth.setAuthStateListener((user) => this.handleAuthState(user));

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
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            greeting.textContent = "Accedi per usare la tua Collezione";
            this.collectionData = {};
            this.updateTechDropdowns();
            this.updateSimulation();
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

            this.initCustomSelect(charCustomSelect, async (charId) => {
                const techSelect = slotCard.querySelector('.sim-tech-select');
                if (!charId) {
                    this.activeTeam[i] = null;
                    techSelect.innerHTML = '<option value="">-- Seleziona Tecnica --</option>';
                    techSelect.disabled = true;
                } else {
                    try {
                        const module = await import(`./Characters/${charId}.js`);
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
        const mode = document.querySelector('input[name="dataSource"]:checked').value;
        const simMode = document.getElementById('simMode').dataset.value;
        const allowManualsToggle = document.getElementById('allowManualsToggle');

        const allowManuals = allowManualsToggle.disabled ? false : allowManualsToggle.checked;

        if (!charData) return;

        let techOptions = '<option value="">-- Seleziona Tecnica --</option>';
        const collData = this.collectionData[charData.id] || {};

        let allMoves = [...charData.myTechniques];

        if (collData.equippedManual && !allMoves.includes(collData.equippedManual)) {
            allMoves.push(collData.equippedManual);
        }

        if (allowManuals) {
            universalManualsKeys.forEach(uniKey => {
                if (!allMoves.includes(uniKey)) allMoves.push(uniKey);
            });
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
            if (mode === 'max') {
                lv = 10;
            } else {
                if (isTaughtMove && techKey !== collData.equippedManual) {
                    lv = 1;
                } else {
                    lv = collData.techLevels && collData.techLevels[techKey] !== undefined ? (collData.techLevels[techKey] + 1) : 1;
                }
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
        const stageElSelect = document.getElementById('stageElement');
        const opponentElSelect = document.getElementById('opponentElement');

        this.initCustomSelect(simModeSelect, (val) => {
            const bonus = val === 'defense' ? 20 : 10;
            document.getElementById('stageBonusDisplay').textContent = bonus;
            this.updateTechDropdowns();
            this.updateSimulation();
        });

        this.initCustomSelect(opponentElSelect, (val) => {
            const mapStage = {
                'None': { val: '', text: 'Nessuno', img: '' },
                'Wind': { val: 'Forest', text: 'Foresta', img: 'img/Element/Icon_Element_Forest.png' },
                'Mountain': { val: 'Wind', text: 'Vento', img: 'img/Element/Icon_Element_Wind.png' },
                'Fire': { val: 'Mountain', text: 'Montagna', img: 'img/Element/Icon_Element_Mountain.png' },
                'Forest': { val: 'Fire', text: 'Fuoco', img: 'img/Element/Icon_Element_Fire.png' }
            };
            const stage = mapStage[val] || mapStage['None'];
            stageElSelect.dataset.value = stage.val;

            const stageSpan = stageElSelect.querySelector('.select-selected span');
            if(stage.img) {
                stageSpan.innerHTML = `<img src="${stage.img}" style="width:20px; vertical-align:middle; margin-right:5px;"> ${stage.text}`;
            } else {
                stageSpan.innerHTML = stage.text;
            }

            this.updateSimulation();
        });

        const radios = document.querySelectorAll('input[name="dataSource"]');
        const toggle = document.getElementById('allowManualsToggle');
        const toggleLabel = document.querySelector('label[for="allowManualsToggle"]');

        const updateToggleState = (mode) => {
            if (mode === 'collection') {
                toggle.checked = false;
                toggle.disabled = true;
                toggleLabel.style.opacity = '0.5';
            } else {
                toggle.disabled = false;
                toggleLabel.style.opacity = '1';
            }
        };

        const currentMode = document.querySelector('input[name="dataSource"]:checked').value;
        updateToggleState(currentMode);

        radios.forEach(radio => radio.addEventListener('change', (e) => {
            updateToggleState(e.target.value);
            this.updateTechDropdowns();
            this.updateSimulation();
        }));

        document.getElementById('allowManualsToggle').addEventListener('change', () => {
            this.updateTechDropdowns();
            this.updateSimulation();
        });
    }

    updateSimulation() {
        const teamDataForEngine = [];
        const slotCards = document.querySelectorAll('.slot-card');
        const mode = document.querySelector('input[name="dataSource"]:checked').value;
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
                    engineFormat.customTechPower[moveName] = (engineFormat.customTechPower[moveName] || 0) + advBonus;
                    engineFormat._hasAdvantageBonus = advBonus;
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
            clearBox.textContent = this.lastResult.isClear ? "✓ SOGLIA DIFESA SUPERATA (Danno ≥ 200.000)" : "SOTTO SOGLIA DIFESA (Moltiplicatore 1.0x)";
            clearBox.style.color = "#ffca28";
        } else {
            clearBox.textContent = this.lastResult.isClear ? "🔥 SOGLIA ATTACCO SUPERATA (Danno ≥ 250.000)" : "SOTTO SOGLIA ATTACCO (Moltiplicatore 2.4x)";
            clearBox.style.color = "#ffca28";
        }
    }

    openDetailsModal(slotIndex) {
        if (!this.lastResult || !this.lastResult.slots[slotIndex]) return;
        const slotData = this.lastResult.slots[slotIndex];
        const calc = slotData.calculations;
        const mode = document.querySelector('input[name="dataSource"]:checked').value;
        const charDb = this.activeTeam[slotIndex];

        document.getElementById('modalTitle').textContent = `Dettagli: ${slotData.charName}`;
        document.getElementById('modalMath').innerHTML = `
            <div>Base Stat (${slotData.statType}): ${calc.base.total.toLocaleString('it-IT')}</div>
            <div>Potenza Mossa: ${calc.power.total}</div>
            <div>Moltiplicatore (STAB + Affinità): x${calc.multipliers.attribute}</div>
            <div>Moltiplicatore Catena: x${calc.multipliers.chain}</div>
            <div style="color:#1269e8; font-size:1.2rem; margin-top: 15px; border-top: 2px solid #d4e1f1; padding-top: 10px;">
                Equazione:<br>( ${calc.base.total.toLocaleString('it-IT')} × ${calc.power.total} × 0.01 ) × ${calc.multipliers.attribute} × ${calc.multipliers.chain} = <strong>${Math.floor(calc.damage).toLocaleString('it-IT')}</strong>
            </div>
        `;

        // CATEGORIZZATORE
        const categorizeDetail = (detail) => {
            if (!detail.isSelf) return 'compagni';
            const pDef = passivesLibrary.find(p => p.title === detail.passiveName);
            if (!pDef) return 'livello'; // Fallback
            if (pDef.category === 'Reroll') return 'reroll';
            if (charDb.myRarityPassivesIds && charDb.myRarityPassivesIds.includes(pDef.id)) return 'risveglio';
            return 'livello'; // Default per tutto il resto (Basic)
        };

        // RENDERER GRUPPI
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

        // --- GESTIONE STATISTICHE BASE E PASSIVE ---
        let statsGroups = { livello: [], risveglio: [], reroll: [], compagni: [] };
        slotData.details.stats.forEach(detail => statsGroups[categorizeDetail(detail)].push(detail));

        // Ordine alfabetico per i compagni
        statsGroups.compagni.sort((a, b) => a.source.localeCompare(b.source));

        const statSourceStr = mode === 'max' ? 'Statistica Base (Lv. 300)' : 'Statistica Base';
        let statHtml = `
            <li>
                <span class="passive-source fw-bold" style="color: #0b1a42;">${statSourceStr}</span>
                <span class="val-badge">+${calc.base.naked.toLocaleString('it-IT')}</span>
            </li>`;

        statHtml += renderGroup(statsGroups.livello, "Passive di Livello");
        statHtml += renderGroup(statsGroups.risveglio, "Passive di Risveglio");
        statHtml += renderGroup(statsGroups.reroll, "Passive di Reroll");
        statHtml += renderGroup(statsGroups.compagni, "Passive Compagni");
        document.getElementById('modalStatList').innerHTML = statHtml;


        // --- GESTIONE POTENZA MOSSE E PASSIVE ---
        let powerGroups = { livello: [], risveglio: [], reroll: [], compagni: [] };
        slotData.details.power.forEach(detail => powerGroups[categorizeDetail(detail)].push(detail));

        // Ordine alfabetico per i compagni
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
}

new AppController();