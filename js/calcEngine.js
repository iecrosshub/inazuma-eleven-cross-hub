// js/calcEngine.js
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { getStatKeyByIcon } from './utils.js';

export function calculateAllDamage(currentDb, techKey, techLvlIndex, lvl, roleMult, stab, adv, passiveSelections) {
    const tech = techniquesLibrary[techKey];
    const statKey = getStatKeyByIcon(tech.icon);

    // 1. Otteniamo l'elemento della tecnica in inglese ("fire", "wind", ecc.)
    const techElementEn = tech.elementIcon.split('/').pop().replace('Icon_Element_', '').replace('.png', '').toLowerCase();

    // 2. Mappiamo l'elemento in Italiano perché le passive usano parole come "Fuoco", "Vento"
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

        if (p.actions) {
            p.actions.forEach(action => {
                let amount = 0;
                // Gestione dinamica dei valori
                if (action.amount === "{VAL}") amount = parseInt(currentLvData.val) || 0;
                else if (action.amount === "{POWER}") amount = parseInt(currentLvData.power) || 0;
                else if (action.amount === "{VAL2}") amount = parseInt(currentLvData.val2) || 0;

                // 1. Buff alle statistiche base
                if (action.type === "base_stat" && (action.stat === statKey || action.stat === "Tutte_le_Statistiche")) {
                    passiveStatBuff += amount;
                    isAffecting = true;
                }

                // 2. Buff alla potenza della mossa
                else if (action.type === "move_power") {
                    let isMatch = false;

                    // CASO A: Buff generico (es. "Potenza_Tiro")
                    if (action.stat === "Potenza_Tiro" && statKey === "Tiro") isMatch = true;
                    if (action.stat === "Potenza_Dribbling" && statKey === "Tecnica") isMatch = true;
                    if (action.stat === "Potenza_Blocco" && statKey === "Blocco") isMatch = true;
                    if (action.stat === "Potenza_Parata" && statKey === "Parata") isMatch = true;

                    // CASO B: Buff per solo Elemento (es. "Potenza_Wind" o "Potenza_Fuoco")
                    if (action.stat.toLowerCase() === `potenza_${techElementEn}`) isMatch = true;
                    if (action.stat === `Potenza_${techElementIt}`) isMatch = true;

                    // CASO C: Buff Combinato Azione+Elemento (es. "Potenza_Tiro_Fuoco")
                    if (action.stat === `Potenza_Tiro_${techElementIt}` && statKey === "Tiro") isMatch = true;
                    if (action.stat === `Potenza_Dribbling_${techElementIt}` && statKey === "Tecnica") isMatch = true;
                    if (action.stat === `Potenza_Blocco_${techElementIt}` && statKey === "Blocco") isMatch = true;
                    if (action.stat === `Potenza_Parata_${techElementIt}` && statKey === "Parata") isMatch = true;

                    // Se una qualsiasi di queste condizioni è vera, sommiamo la potenza
                    if (isMatch) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }

                // 3. Buff specifici per una mossa particolare (es. "Mano di Luce")
                else if (action.type === "specific_move_power") {
                    if (action.stat === techKey || action.stat === tech.name) {
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