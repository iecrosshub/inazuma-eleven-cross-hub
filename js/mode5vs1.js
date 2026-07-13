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
        let charOptions = `<option value="">-- Seleziona Giocatore --</option>`;
        characterRegistry.forEach(char => {
            charOptions += `<option value="${char.id}">${char.name} (${char.romanizedName})</option>`;
        });

        for (let i = 0; i < this.slotsCount; i++) {
            const slotCard = document.createElement('div');
            slotCard.className = 'slot-card';
            slotCard.setAttribute('data-slot', i);

            slotCard.innerHTML = `
                <div class="slot-name">Slot ${i + 1}</div>
                <div class="slot-dropdowns">
                    <select class="sim-char-select">${charOptions}</select>
                    <select class="sim-tech-select" disabled><option value="">-- Seleziona Tecnica --</option></select>
                </div>
                <div class="slot-result">
                    Slot <span class="slot-damage">0</span>
                    <i class="fas fa-info-circle details-btn-icon" style="display:none;" title="Dettagli Calcolo"></i>
                </div>
            `;
            grid.appendChild(slotCard);

            const charSelect = slotCard.querySelector('.sim-char-select');
            const techSelect = slotCard.querySelector('.sim-tech-select');

            charSelect.addEventListener('change', async (e) => {
                const charId = e.target.value;
                if (!charId) {
                    this.activeTeam[i] = null;
                    techSelect.innerHTML = '<option value="">-- Seleziona Tecnica --</option>';
                    techSelect.disabled = true;
                } else {
                    try {
                        const module = await import(`./Characters/${charId}.js`);
                        this.activeTeam[i] = module.charData;
                        this.renderTechDropdown(i);
                    } catch (err) { }
                }
                this.updateSimulation();
            });
            techSelect.addEventListener('change', () => this.updateSimulation());
            slotCard.querySelector('.details-btn-icon').addEventListener('click', () => this.openDetailsModal(i));
        }
    }

    renderTechDropdown(slotIndex) {
        const charData = this.activeTeam[slotIndex];
        const slotCard = document.querySelector(`.slot-card[data-slot="${slotIndex}"]`);
        const techSelect = slotCard.querySelector('.sim-tech-select');
        const mode = document.querySelector('input[name="dataSource"]:checked').value;
        const simMode = document.getElementById('simMode').value;
        const allowManuals = document.getElementById('allowManualsToggle').checked;

        if (!charData) return;

        let techOptions = '<option value="">-- Seleziona Tecnica --</option>';
        const collData = this.collectionData[charData.id] || {};

        let allMoves = [...charData.myTechniques];

        // AGGIUNTA IMPORTANTE: Se non sto forzando i manuali universali, ma il giocatore
        // ha equipaggiato un manuale nella collezione, glielo faccio vedere!
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
            let lv = isTaughtMove ? 1 : (mode === 'max' ? 10 : (collData.techLevels && collData.techLevels[techKey] !== undefined ? (collData.techLevels[techKey] + 1) : 10));

            // Evidenzio se la mossa proviene da un manuale
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
        document.querySelectorAll('input[name="dataSource"]').forEach(radio => radio.addEventListener('change', () => { this.updateTechDropdowns(); this.updateSimulation(); }));
        document.getElementById('simMode').addEventListener('change', () => { this.updateTechDropdowns(); this.updateSimulation(); });
        document.getElementById('allowManualsToggle').addEventListener('change', () => { this.updateTechDropdowns(); this.updateSimulation(); });
        document.getElementById('stageElement').addEventListener('change', () => this.updateSimulation());
        document.getElementById('stageBonus').addEventListener('input', () => this.updateSimulation());
        document.getElementById('opponentElement').addEventListener('change', () => this.updateSimulation());
    }

    updateSimulation() {
        const teamDataForEngine = [];
        const slotCards = document.querySelectorAll('.slot-card');
        const mode = document.querySelector('input[name="dataSource"]:checked').value;
        const stageConfig = {
            element: document.getElementById('stageElement').value,
            bonus: parseInt(document.getElementById('stageBonus').value) || 0,
            opponent: document.getElementById('opponentElement').value,
            mode: document.getElementById('simMode').value
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

        const statSourceStr = mode === 'max' ? 'Statistica MAX' : 'Statistica Base + Passiva Reroll';
        let statHtml = `<li><span class="passive-source">${statSourceStr}</span> <span class="val-badge">+${calc.base.naked.toLocaleString('it-IT')}</span></li>`;
        slotData.details.stats.forEach(detail => {
            statHtml += `<li><div><span class="passive-source">[${detail.source}]</span> ${detail.passiveName} ${detail.isSelf ? "(Self)" : "(Alleato)"}</div> <span class="val-badge">+${detail.value.toLocaleString('it-IT')}</span></li>`;
        });
        document.getElementById('modalStatList').innerHTML = statHtml;

        let powerHtml = `<li><span class="passive-source">Potenza Base Mossa</span> <span class="val-badge">+${calc.power.naked}</span></li>`;
        if (calc.power.stageBonus > 0) powerHtml += `<li><span class="passive-source">Bonus Giornaliero (${document.getElementById('stageElement').value})</span> <span class="val-badge">+${calc.power.stageBonus}</span></li>`;

        if (slotData._hasAdvantageBonus > 0) {
            powerHtml += `<li><span class="passive-source text-danger fw-bold"><i class="fas fa-fire-alt"></i> Vantaggio vs Avversario</span> <span class="val-badge bg-warning text-dark">+${slotData._hasAdvantageBonus}</span></li>`;
        }

        let collCustomBonus = calc.power.customBonus - (slotData._hasAdvantageBonus || 0);
        if (collCustomBonus > 0) powerHtml += `<li><span class="passive-source">Potenza Tecnica Passiva Reroll</span> <span class="val-badge">+${collCustomBonus}</span></li>`;

        slotData.details.power.forEach(detail => {
            powerHtml += `<li><div><span class="passive-source">[${detail.source}]</span> ${detail.passiveName} ${detail.isSelf ? "(Self)" : "(Alleato)"}</div> <span class="val-badge">+${detail.value}</span></li>`;
        });
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