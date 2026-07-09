// js/calcEngine.js
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { getStatKeyByIcon } from './utils.js';

export function calculateAllDamage(currentDb, techKey, techLvlIndex, lvl, roleMult, stab, adv, passiveSelections) {
    const tech = techniquesLibrary[techKey];
    const statKey = getStatKeyByIcon(tech.icon);
    const techElement = tech.elementIcon.split('/').pop().replace('Icon_Element_', '').replace('.png', '').toLowerCase();

    const baseStat = currentDb.stats[statKey] ? currentDb.stats[statKey][lvl] : 0;
    const techPower = tech.details[0]?.values ? parseInt(tech.details[0].values[techLvlIndex]) || 0 : 0;

    let passiveStatBuff = 0;
    let passivePowerBuff = 0;
    let passiveData = []; // Per restituire anche le icone 🟢/⚪

    passiveSelections.forEach(sel => {
        const p = passivesLibrary.find(x => x.id === sel.id);
        if (!p || !p.levels[sel.lvIndex]) return;

        const currentLvData = p.levels[sel.lvIndex];
        let isAffecting = false;

        if (p.actions) {
            p.actions.forEach(action => {
                let amount = 0;
                if (action.amount === "{VAL}") amount = parseInt(currentLvData.val) || 0;
                else if (action.amount === "{POWER}") amount = parseInt(currentLvData.power) || 0;
                else if (action.amount === "{VAL2}") amount = parseInt(currentLvData.val2) || 0;

                if (action.type === "base_stat" && (action.stat === statKey || action.stat === "Tutte_le_Statistiche")) {
                    passiveStatBuff += amount;
                    isAffecting = true;
                } else if (action.type === "move_power") {
                    // Logica di match per i buff potenza
                    if ((action.stat === "Potenza_Tiro" && statKey === "Tiro") ||
                        (action.stat === "Potenza_Dribbling" && statKey === "Tecnica") ||
                        (action.stat === `Potenza_${techElement.charAt(0).toUpperCase() + techElement.slice(1)}`)) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }
            });
        }
        passiveData.push({ title: p.title, level: sel.lvIndex + 1, active: isAffecting, desc: p.template });
    });

    const statFinale = Math.floor((baseStat + passiveStatBuff) * roleMult);
    const potenzaFinale = techPower + passivePowerBuff;
    const danno = Math.floor(statFinale * (potenzaFinale / 100) * stab * adv);

    return { danno, statKey, baseStat, passiveStatBuff, roleMult, techPower, passivePowerBuff, stab, adv, passiveData };
}