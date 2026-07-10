import { characterRegistry } from './Characters/registry.js';
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { runOptimizer } from './trialOptimizer.js';
import { parsePassiveText, getStatKeyByIcon, extractElement, checkStab } from './utils.js';

// ==========================================
// STATO DELL'APP E LOGICA
// ==========================================

const state = {
    trialType: 'attack',
    opponentElement: 'Wind',
    opponentTechElement: 'Wind',
    slots: Array.from({ length: 5 }, () => ({
        playerId: '',
        playerData: null,
        baseStatObj: { base: 0, buffSelf: 0 },
        powerObj: { base: 0, buffSelf: 0 },
        techniqueId: '',
        passiveLevels: {}
    }))
};

const elementAdvantages = {
    'Wind': 'Mountain', 'Mountain': 'Fire', 'Fire': 'Forest', 'Forest': 'Wind'
};

function init() {
    renderSlots();
    attachGlobalListeners();
    calculateScore();
}

function attachGlobalListeners() {
    document.getElementById('trial-type')?.addEventListener('change', (e) => {
        state.trialType = e.target.value;
        resetAllSlotsMoves();
        renderSlots();
        calculateScore();
    });

    document.getElementById('trial-opponent')?.addEventListener('change', (e) => {
        state.opponentElement = e.target.value;
        calculateScore();
    });

    document.getElementById('trial-opponent-tech')?.addEventListener('change', (e) => {
        state.opponentTechElement = e.target.value;
        calculateScore();
    });

    // ==========================================
    // LOGICA PULSANTE OTTIMIZZAZIONE AUTOMATICA
    // ==========================================
    document.getElementById('btn-optimize')?.addEventListener('click', async (e) => {
        const btn = e.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Calcolo in corso...';
        btn.disabled = true;

        try {
            const allLoadedPlayers = [];
            const loadPromises = characterRegistry.map(async (char) => {
                try {
                    const module = await import(`./Characters/${char.id}.js`);
                    allLoadedPlayers.push(module.charData);
                } catch (err) {
                    console.warn(`Impossibile caricare i dati per: ${char.id}`, err);
                }
            });

            await Promise.all(loadPromises);

            const bestLineup = runOptimizer(allLoadedPlayers, state.trialType, state.opponentElement, state.opponentTechElement);

            if (bestLineup && bestLineup.length === 5) {
                bestLineup.forEach((item, index) => {
                    const slot = state.slots[index];
                    slot.playerId = item.playerData.id;
                    slot.playerData = item.playerData;
                    slot.techniqueId = item.bestMove.techId;

                    slot.passiveLevels = {};
                    const allPassives = [...(item.playerData.myBasicPassivesIds || []), ...(item.playerData.myRarityPassivesIds || [])];
                    allPassives.forEach(pid => {
                        const pDef = passivesLibrary.find(p => p.id === pid);
                        if (pDef) slot.passiveLevels[pid] = pDef.levels.length - 1;
                    });

                    const statNeeded = getStatKeyByIcon(techniquesLibrary[slot.techniqueId].icon);
                    const statBaseLv300 = slot.playerData.stats[statNeeded] ? slot.playerData.stats[statNeeded].lv300 : 0;
                    const buffs = calculatePlayerPassiveBuffs(slot, statNeeded);

                    slot.baseStatObj = { base: statBaseLv300, buffSelf: buffs.statBuff };
                    slot.powerObj = { base: getTechniquePower(slot.techniqueId), buffSelf: buffs.powerBuff };
                });

                renderSlots();
                calculateScore();
            } else {
                alert("Non ci sono abbastanza giocatori o tecniche valide per completare questa prova!");
            }
        } catch (error) {
            console.error("Errore durante l'ottimizzazione:", error);
            alert("Si è verificato un errore durante l'ottimizzazione.");
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

function resetAllSlotsMoves() {
    state.slots.forEach(slot => { slot.techniqueId = ''; });
}

function getValidMovesForSlot(playerData, slotIndex) {
    if (!playerData || !playerData.myTechniques) return [];

    return playerData.myTechniques.map(moveId => ({
        id: moveId,
        data: techniquesLibrary[moveId]
    })).filter(move => {
        if (!move.data) return false;
        const statType = getStatKeyByIcon(move.data.icon);

        if (state.trialType === 'attack') return statType === 'Tiro';
        if (state.trialType === 'defense') {
            // CONTROLLO "BLOCCO TIRI"
            const bloccoTiri = move.data.details.find(d => d.label === "Blocco Tiri");
            if (bloccoTiri && bloccoTiri.values[0] === "No") return false;

            return slotIndex === 4 ? statType === 'Parata' : statType === 'Blocco';
        }
        return false;
    });
}

function calculatePlayerPassiveBuffs(slot, statNeeded) {
    let statBuff = 0;
    let powerBuff = 0;
    const playerData = slot.playerData;

    if (!playerData) return { statBuff, powerBuff };

    const allPassives = [...(playerData.myBasicPassivesIds || []), ...(playerData.myRarityPassivesIds || [])];

    allPassives.forEach(passiveId => {
        const passiveDef = passivesLibrary.find(p => p.id === passiveId);
        if(!passiveDef) return;

        const selectedLevelIndex = slot.passiveLevels[passiveId] !== undefined ? slot.passiveLevels[passiveId] : (passiveDef.levels.length - 1);
        const levelData = passiveDef.levels[selectedLevelIndex];

        passiveDef.actions.forEach(action => {
            if(action.target !== 'self') return;

            let amountToSum = 0;
            if (action.amount === "{VAL}" && levelData.val !== undefined) amountToSum = parseInt(levelData.val);
            if (action.amount === "{POWER}" && levelData.power !== undefined) amountToSum = parseInt(levelData.power);
            if (action.amount === "{VAL2}" && levelData.val2 !== undefined) amountToSum = parseInt(levelData.val2);

            if (action.type === 'base_stat' && action.stat === statNeeded) {
                statBuff += amountToSum;
            }

            if (action.type === 'move_power') {
                if (action.stat === 'Potenza_Tiro' && statNeeded === 'Tiro') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Blocco' && statNeeded === 'Blocco') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Parata' && statNeeded === 'Parata') powerBuff += amountToSum;

                if (slot.techniqueId) {
                    const techElement = extractElement(techniquesLibrary[slot.techniqueId].elementIcon);
                    if (action.stat === 'Potenza_Wind' && techElement === 'Wind') powerBuff += amountToSum;
                    if (action.stat === 'Potenza_Forest' && techElement === 'Forest') powerBuff += amountToSum;
                    if (action.stat === 'Potenza_Fire' && techElement === 'Fire') powerBuff += amountToSum;
                    if (action.stat === 'Potenza_Mountain' && techElement === 'Mountain') powerBuff += amountToSum;
                }
            }
        });
    });

    return { statBuff, powerBuff };
}

function getTechniquePower(techKey) {
    const tech = techniquesLibrary[techKey];
    if (!tech) return 0;
    const powerObj = tech.details.find(d => d.label === "Potenza");
    return powerObj ? parseInt(powerObj.values[9]) : 0;
}

// ==========================================
// CALCOLATORE UFFICIALE E MULTIPLI
// ==========================================

function calculateScore() {
    let totalScore = 0;
    let previousElement = null;

    state.slots.forEach((slot, index) => {
        const slotDOM = document.getElementById(`slot-${index}`);
        const damageDOM = document.getElementById(`damage-${index}`);
        const breakdownDOM = document.getElementById(`breakdown-${index}`);

        if (!slot.playerData || !slot.techniqueId) {
            damageDOM.textContent = "0";
            if(breakdownDOM) breakdownDOM.textContent = "";
            slotDOM.classList.remove('chain-active');
            previousElement = null;
            return;
        }

        const tech = techniquesLibrary[slot.techniqueId];
        const baseTechPower = getTechniquePower(slot.techniqueId);

        const charElement = extractElement(slot.playerData.element);
        const techElement = extractElement(tech.elementIcon);

        let totalBase = slot.baseStatObj.base + slot.baseStatObj.buffSelf;
        let totalPower = baseTechPower + slot.powerObj.buffSelf;

        const allPassives = [...(slot.playerData.myBasicPassivesIds || []), ...(slot.playerData.myRarityPassivesIds || [])];
        allPassives.forEach(passiveId => {
            const pDef = passivesLibrary.find(p => p.id === passiveId);
            if(!pDef) return;
            const selectedLevelIndex = slot.passiveLevels[passiveId] !== undefined ? slot.passiveLevels[passiveId] : (pDef.levels.length - 1);
            const levelData = pDef.levels[selectedLevelIndex];

            pDef.actions.forEach(act => {
                if(act.type === 'specific_move_power' && tech.name.includes(act.stat)) {
                    totalPower += parseInt(levelData.power || levelData.val || 0);
                }
            });
        });

        let attrMult = 1.0;

        if (elementAdvantages[charElement] === state.opponentElement) attrMult += 0.1;
        else if (elementAdvantages[state.opponentElement] === charElement) attrMult -= 0.1;

        if (elementAdvantages[techElement] === state.opponentTechElement) attrMult += 0.1;
        else if (elementAdvantages[state.opponentTechElement] === techElement) attrMult -= 0.1;

        if (checkStab(slot.playerData.element, tech.elementIcon)) attrMult += 0.2;

        attrMult = Math.round(attrMult * 10) / 10;

        let rawDamage = Math.floor(totalBase * totalPower * 0.01 * attrMult);

        let isChain = false;
        if (previousElement && previousElement === techElement) {
            isChain = true;
            rawDamage = Math.floor(rawDamage * 1.1);
            slotDOM.classList.add('chain-active');
        } else {
            slotDOM.classList.remove('chain-active');
        }

        previousElement = techElement;
        totalScore += rawDamage;

        damageDOM.textContent = rawDamage.toLocaleString();
        if(breakdownDOM) {
            breakdownDOM.innerHTML = `Base(${totalBase}) x Pow(${totalPower}) x Attr(${attrMult}) ${isChain ? ' x Chain(1.1)' : ''} <br> = <b>${rawDamage.toLocaleString()}</b>`;
        }
    });

    let finalMultiplier = state.trialType === 'attack' ? 3.6 : 1.5;
    let finalScore = Math.floor(totalScore * finalMultiplier);

    document.getElementById('final-score').textContent = finalScore.toLocaleString();
}

// ==========================================
// RENDER UI & EVENTI DINAMICI
// ==========================================

function renderPassivesForSlot(index, slot) {
    const container = document.getElementById(`passives-container-${index}`);
    if (!container) return;

    if (!slot.playerData) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    const allPassives = [...(slot.playerData.myBasicPassivesIds || []), ...(slot.playerData.myRarityPassivesIds || [])];
    if (allPassives.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    let html = '<div style="font-size: 11px; font-weight: bold; color: #003a8c; margin-bottom: 5px;">Passive Personaggio:</div>';

    allPassives.forEach(passiveId => {
        const pDef = passivesLibrary.find(p => p.id === passiveId);
        if (!pDef) return;

        const selectedIdx = slot.passiveLevels[passiveId] !== undefined ? slot.passiveLevels[passiveId] : (pDef.levels.length - 1);

        let options = pDef.levels.map((lv, idx) => {
            let detail = lv.val || lv.power || lv.crt || lv.tp || 'Max';
            return `<option value="${idx}" ${idx === selectedIdx ? 'selected' : ''}>Lv.${idx + 1} (${detail})</option>`;
        }).join('');

        html += `
            <div style="margin-bottom: 6px;">
                <label style="display:block; font-size: 10px; color: #1269e8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${pDef.title}">${pDef.title}</label>
                <select class="passive-select" data-slot="${index}" data-passive="${passiveId}" style="width: 100%; padding: 4px; border: 1px solid #c0d3e8; border-radius: 4px; font-size: 11px; font-weight: bold; color: #102247;">
                    ${options}
                </select>
            </div>
        `;
    });

    container.innerHTML = html;
    container.style.display = 'block';

    container.querySelectorAll('.passive-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const sIdx = parseInt(e.target.getAttribute('data-slot'));
            const pId = e.target.getAttribute('data-passive');
            state.slots[sIdx].passiveLevels[pId] = parseInt(e.target.value);
            triggerSlotUpdate(sIdx);
        });
    });
}

function triggerSlotUpdate(index) {
    const slot = state.slots[index];
    if (slot.techniqueId && slot.playerData) {
        const statNeeded = getStatKeyByIcon(techniquesLibrary[slot.techniqueId].icon);
        const statBaseLv300 = slot.playerData.stats[statNeeded] ? slot.playerData.stats[statNeeded].lv300 : 0;
        const buffs = calculatePlayerPassiveBuffs(slot, statNeeded);

        slot.baseStatObj = { base: statBaseLv300, buffSelf: buffs.statBuff };
        slot.powerObj = { base: getTechniquePower(slot.techniqueId), buffSelf: buffs.powerBuff };

        document.getElementById(`base-${index}`).value = slot.baseStatObj.base + slot.baseStatObj.buffSelf;
    }
    calculateScore();
}

function renderSlots() {
    const container = document.getElementById('slots-container');
    if (!container) return;
    container.innerHTML = '';

    const playerOptions = `<option value="">- Seleziona Giocatore -</option>` +
        characterRegistry.map(p => `<option value="${p.id}">${p.name}</option>`).join('');

    state.slots.forEach((slot, index) => {
        const slotEl = document.createElement('div');
        slotEl.className = 'trial-slot';
        slotEl.id = `slot-${index}`;

        let techGuideText = state.trialType === 'attack' ? 'Tiro' : (index === 4 ? 'Parata' : 'Blocco');

        slotEl.innerHTML = `
            <div class="slot-number">${index + 1}</div>
            <div class="slot-chain-badge">🔗 Chain x1.1</div>
            
            <div class="slot-image-box">
                <img id="img-${index}" class="player-thumb" src="https://placehold.co/150x180/e4edf8/102247?text=Player" alt="Player">
                <img id="el-${index}" class="player-element-badge" style="display:none;" src="" alt="Element">
            </div>

            <div class="slot-controls">
                <label>Giocatore</label>
                <select id="player-${index}">${playerOptions}</select>

                <div id="passives-container-${index}" style="display:none; background: #f0f5fa; padding: 8px; border-radius: 6px; border: 1px dashed #c0d3e8; margin-top: 5px;"></div>

                <label>Tecnica (${techGuideText})</label>
                <select id="tech-${index}" disabled><option value="">--</option></select>

                <label>Statistica Totale Rilevata</label>
                <input type="number" id="base-${index}" placeholder="Es: 1500" min="0" value="${slot.baseStatObj.base + slot.baseStatObj.buffSelf || ''}">

                <div class="calc-breakdown" id="breakdown-${index}"></div>
            </div>

            <div class="slot-result">
                <div class="slot-result-label">VALORE SLOT TRONCATO</div>
                <div class="slot-result-damage" id="damage-${index}">0</div>
            </div>
        `;

        container.appendChild(slotEl);

        // Se lo slot è già valorizzato (es. dopo l'Optimizer), aggiorniamo immagine ed elementi grafici!
        if (slot.playerId && slot.playerData) {
            document.getElementById(`player-${index}`).value = slot.playerId;
            document.getElementById(`img-${index}`).src = slot.playerData.thumb || characterRegistry.find(p => p.id === slot.playerId)?.thumb || 'https://placehold.co/150x180/e4edf8/102247?text=Player';

            const elImg = document.getElementById(`el-${index}`);
            elImg.src = slot.playerData.element;
            elImg.style.display = 'block';

            updateSlotUIWithPlayerData(index, slot.playerData);
            renderPassivesForSlot(index, slot);
        }

        document.getElementById(`player-${index}`).addEventListener('change', async (e) => {
            const playerId = e.target.value;
            slot.playerId = playerId;

            if (!playerId) {
                slot.playerData = null; slot.techniqueId = '';
                slot.baseStatObj = { base: 0, buffSelf: 0 };
                slot.powerObj = { base: 0, buffSelf: 0 };
                slot.passiveLevels = {};
                document.getElementById(`img-${index}`).src = 'https://placehold.co/150x180/e4edf8/102247?text=Player';
                document.getElementById(`el-${index}`).style.display = 'none';
                document.getElementById(`tech-${index}`).innerHTML = '<option value="">--</option>';
                document.getElementById(`tech-${index}`).disabled = true;
                document.getElementById(`base-${index}`).value = '';
                renderPassivesForSlot(index, slot);
                calculateScore();
                return;
            }

            try {
                const module = await import(`./Characters/${playerId}.js`);
                slot.playerData = module.charData;

                slot.passiveLevels = {};
                const allPassives = [...(slot.playerData.myBasicPassivesIds || []), ...(slot.playerData.myRarityPassivesIds || [])];
                allPassives.forEach(pid => {
                    const pDef = passivesLibrary.find(p => p.id === pid);
                    if (pDef) slot.passiveLevels[pid] = pDef.levels.length - 1;
                });

                document.getElementById(`img-${index}`).src = slot.playerData.thumb || characterRegistry.find(p => p.id === playerId).thumb;
                const elImg = document.getElementById(`el-${index}`);
                elImg.src = slot.playerData.element;
                elImg.style.display = 'block';

                renderPassivesForSlot(index, slot);
                updateSlotUIWithPlayerData(index, slot.playerData);
            } catch (err) {
                console.error("Errore import:", err);
            }
        });

        document.getElementById(`tech-${index}`).addEventListener('change', (e) => {
            slot.techniqueId = e.target.value;
            triggerSlotUpdate(index);
        });

        document.getElementById(`base-${index}`).addEventListener('input', (e) => {
            const manualValue = parseInt(e.target.value) || 0;
            slot.baseStatObj.base = manualValue;
            slot.baseStatObj.buffSelf = 0;
            calculateScore();
        });
    });
}

function updateSlotUIWithPlayerData(index, playerData) {
    const techSelect = document.getElementById(`tech-${index}`);
    const validMoves = getValidMovesForSlot(playerData, index);

    if (validMoves.length === 0) {
        techSelect.innerHTML = `<option value="">- No Mosse Valide -</option>`;
        techSelect.disabled = true;
    } else {
        techSelect.innerHTML = `<option value="">- Scegli -</option>` +
            validMoves.map(m => `<option value="${m.id}">${m.data.name}</option>`).join('');
        techSelect.disabled = false;
    }

    if (state.slots[index].techniqueId && validMoves.find(m => m.id === state.slots[index].techniqueId)) {
        techSelect.value = state.slots[index].techniqueId;
        techSelect.dispatchEvent(new Event('change'));
    } else {
        state.slots[index].techniqueId = '';
        techSelect.dispatchEvent(new Event('change'));
    }
}

document.addEventListener('DOMContentLoaded', init);