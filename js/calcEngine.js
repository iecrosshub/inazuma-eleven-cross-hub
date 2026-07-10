// js/calcEngine.js
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { getStatKeyByIcon } from './utils.js';

export function calculateAllDamage(currentDb, techKey, techLvlIndex, lvl, roleMult, stab, adv, passiveSelections) {
    const tech = techniquesLibrary[techKey];
    const statKey = getStatKeyByIcon(tech.icon);

    const techElementEn = tech.elementIcon.split('/').pop().replace('Icon_Element_', '').replace('.png', '').toLowerCase();
    const elMap = { 'fire': 'Fuoco', 'wind': 'Vento', 'forest': 'Foresta', 'mountain': 'Montagna', 'void': 'Vuoto' };
    const techElementIt = elMap[techElementEn];

    const baseStat = currentDb.stats[statKey] ? currentDb.stats[statKey][lvl] : 0;
    const techPower = tech.details[0]?.values ? parseInt(tech.details[0].values[techLvlIndex]) || 0 : 0;

    let passiveStatBuff = 0;
    let passivePowerBuff = 0;
    let passiveData = [];

    passiveSelections.forEach(sel => {
        const p = passivesLibrary.find(x => x.id === sel.id);
        if (!p || !p.levels[sel.lvIndex]) return;

        const currentLvData = p.levels[sel.lvIndex];
        let isAffecting = false;

        // RECUPERA IL NUMERO DI VOLTE (Se non c'è, vale 1)
        const stacks = sel.stacks || 1;

        if (p.actions) {
            p.actions.forEach(action => {
                let amount = 0;

                if (action.amount === "{VAL}") amount = parseInt(currentLvData.val) || 0;
                else if (action.amount === "{POWER}") amount = parseInt(currentLvData.power) || 0;
                else if (action.amount === "{VAL2}") amount = parseInt(currentLvData.val2) || 0;

                // MOLTIPLICA L'EFFETTO DELLA PASSIVA PER LE VOLTE CHE SI È ATTIVATA
                amount = amount * stacks;

                // 1. Buff Statistica Base
                if (action.type === "base_stat" && (action.stat === statKey || action.stat === "Tutte_le_Statistiche")) {
                    passiveStatBuff += amount;
                    isAffecting = true;
                }

                // 2. Buff Potenza Mossa
                else if (action.type === "move_power") {
                    let isMatch = false;

                    if (action.stat === "Potenza_Tiro" && statKey === "Tiro") isMatch = true;
                    if (action.stat === "Potenza_Dribbling" && statKey === "Tecnica") isMatch = true;
                    if (action.stat === "Potenza_Blocco" && statKey === "Blocco") isMatch = true;
                    if (action.stat === "Potenza_Parata" && statKey === "Parata") isMatch = true;

                    if (action.stat.toLowerCase() === `potenza_${techElementEn}`) isMatch = true;
                    if (action.stat === `Potenza_${techElementIt}`) isMatch = true;

                    if (action.stat === `Potenza_Tiro_${techElementIt}` && statKey === "Tiro") isMatch = true;
                    if (action.stat === `Potenza_Dribbling_${techElementIt}` && statKey === "Tecnica") isMatch = true;
                    if (action.stat === `Potenza_Blocco_${techElementIt}` && statKey === "Blocco") isMatch = true;
                    if (action.stat === `Potenza_Parata_${techElementIt}` && statKey === "Parata") isMatch = true;

                    if (isMatch) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }

                // 3. Buff Mossa Specifica
                else if (action.type === "specific_move_power") {
                    if (action.stat === techKey || action.stat === tech.name) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }
            });
        }

        // Aggiunge un feedback visivo se l'abilità è stata accumulata più volte
        const descSuffix = stacks > 1 ? `<br><span class="text-primary fw-bold">(Attivata ${stacks} volte)</span>` : '';
        passiveData.push({ title: p.title, level: sel.lvIndex + 1, active: isAffecting, desc: p.template + descSuffix });
    });

    const statFinale = Math.floor((baseStat + passiveStatBuff) * roleMult);
    const potenzaFinale = techPower + passivePowerBuff;
    const danno = Math.floor(statFinale * (potenzaFinale / 100) * stab * adv);

    return { danno, statKey, baseStat, passiveStatBuff, roleMult, techPower, passivePowerBuff, stab, adv, passiveData };
}