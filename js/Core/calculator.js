// js/Core/calculator.js

import { techniquesLibrary, passivesLibrary } from './database.js';
import { extractElement, extractPosition, getStatKeyByIcon, parsePassiveText } from './parsers.js';
import { growth_patterns } from './growthTable.js';
import { equipmentData } from './equipmentTables.js';

// Tutti i 10 gradi di rarità
const awakeningMultipliers = {
    0: 1.00,  // Normal Player
    1: 1.10,  // Normal Player +
    2: 1.20,  // Growing Player
    3: 1.30,  // Growing Player +
    4: 1.40,  // Advanced Player
    5: 1.50,  // Advanced Player +
    6: 1.60,  // Top Player
    7: 1.70,  // Top Player +
    8: 1.85,  // Legendary Player
    9: 2.00   // Legendary Player +
};

function getClosestEquipLevel(target) {
    const levels = [1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300];
    let best = 1;
    for(let l of levels) {
        if(l <= target) best = l;
        else break;
    }
    return best.toString();
}

export function calcolaStatisticheEsatte(character, livelloPG, gradoRisveglio, equipMatrixObj) {
    if (!character || !character.growth_pattern_code) return null;

    const codicePG = character.growth_pattern_code;
    const statBase = growth_patterns[codicePG] ? growth_patterns[codicePG][livelloPG.toString()] : null;

    if (!statBase) return null;

    const moltiplicatore = awakeningMultipliers[gradoRisveglio] || 1.0;

    let finalStats = {
        kick: Math.floor(statBase.kick * moltiplicatore),
        technique: Math.floor(statBase.technique * moltiplicatore),
        block: Math.floor(statBase.block * moltiplicatore),
        catch: Math.floor(statBase.catch * moltiplicatore),
        speed: statBase.speed,
        tp: statBase.tp
    };

    let rawRuolo = character.position?.code || character.position || "";
    const ruolo = extractPosition(rawRuolo);

    if (equipmentData[ruolo]) {
        Object.keys(equipmentData[ruolo]).forEach(categoria => {

            let targetLvl = 300;

            if (typeof equipMatrixObj === 'object' && equipMatrixObj !== null) {
                if (equipMatrixObj[ruolo] && equipMatrixObj[ruolo][categoria]) {
                    targetLvl = equipMatrixObj[ruolo][categoria];
                }
            }
            else if (typeof equipMatrixObj === 'number' || typeof equipMatrixObj === 'string') {
                targetLvl = parseInt(equipMatrixObj);
            }

            const lvlEqStr = getClosestEquipLevel(targetLvl);

            if (equipmentData[ruolo][categoria][lvlEqStr]) {
                const bonus = equipmentData[ruolo][categoria][lvlEqStr];
                finalStats.kick += bonus.kick || 0;
                finalStats.technique += bonus.technique || 0;
                finalStats.block += bonus.block || 0;
                finalStats.catch += bonus.catch || 0;
                finalStats.speed += bonus.speed || 0;
            }
        });
    }

    return finalStats;
}

export function checkStab(charElementUrl, techElementUrl) {
    if (!charElementUrl || !techElementUrl) return false;
    const charEl = extractElement(charElementUrl);
    const techEl = extractElement(techElementUrl);
    return charEl === techEl && charEl !== 'Void';
}

export function getElementalAdvantage(moveElement, opponentElement) {
    if (!moveElement || !opponentElement || moveElement === 'Void' || opponentElement === 'None') return 0;
    const advantages = { 'Wind': 'Mountain', 'Mountain': 'Fire', 'Fire': 'Forest', 'Forest': 'Wind' };
    if (advantages[moveElement] === opponentElement) return 0.1;
    if (advantages[opponentElement] === moveElement) return -0.1;
    return 0;
}

export function calculateDamageData(charDb, techKey, techLvlIndex, customStat, roleMult, adv, passiveSelections, customTechPower = 0) {
    if (!charDb || !techKey || !techniquesLibrary[techKey]) return null;

    const tech = techniquesLibrary[techKey];
    const statKey = getStatKeyByIcon(tech.icon);

    const techElement = extractElement(tech.elementIcon);
    const charElement = extractElement(charDb.element);
    const hasStab = (techElement === charElement && techElement !== 'Void');
    const stabMult = hasStab ? 1.2 : 1.0;

    const elMapIt = { 'Fire': 'Fuoco', 'Wind': 'Vento', 'Forest': 'Foresta', 'Mountain': 'Montagna', 'Void': 'Vuoto' };
    const techElementIt = elMapIt[techElement];

    const baseStat = parseInt(customStat) || 0;
    const baseTechPower = tech.power ? (parseInt(tech.power[techLvlIndex]) || 0) : 0;
    const techPower = baseTechPower + parseInt(customTechPower || 0);

    let passiveStatBuff = 0;
    let passivePowerBuff = 0;
    let passiveData = [];

    const moveKindToStatKey = { "Tiro": "Tiro", "Dribbling": "Tecnica", "Blocco": "Blocco", "Parata": "Parata" };

    passiveSelections.forEach(sel => {
        const p = passivesLibrary.find(x => x.id === sel.id);
        if (!p || !p.levels[sel.lvIndex]) return;

        const currentLvData = p.levels[sel.lvIndex];
        const stacks = sel.stacks || 1;
        let isAffecting = false;
        const actionsList = p.effects || p.actions;

        if (actionsList) {
            actionsList.forEach(effect => {
                let amount = 0;

                if (effect.valueRef) {
                    amount = parseInt(currentLvData[effect.valueRef]) || 0;
                } else if (effect.amount !== undefined) {
                    if (effect.amount === "{VAL}") amount = parseInt(currentLvData.val) || 0;
                    else if (effect.amount === "{POWER}") amount = parseInt(currentLvData.power) || 0;
                    else if (effect.amount === "{VAL2}") amount = parseInt(currentLvData.val2) || 0;
                    else {
                        let parsed = parseInt(effect.amount);
                        amount = isNaN(parsed) ? (parseInt(currentLvData.power) || parseInt(currentLvData.val) || 0) : parsed;
                    }
                } else {
                    amount = parseInt(currentLvData.power) || parseInt(currentLvData.val) || 0;
                }

                amount = amount * stacks;
                if (amount === 0) return;

                if ((effect.type === "stat" && (effect.statName === statKey || effect.statName === "All" || effect.statName === "Tutte_le_Statistiche")) ||
                    (effect.type === "base_stat" && (effect.stat === statKey || effect.stat === "Tutte_le_Statistiche"))) {
                    passiveStatBuff += amount;
                    isAffecting = true;
                }
                else if (effect.type === "power") {
                    let isMatch = true;
                    if (effect.moveKind && effect.moveKind !== "All" && moveKindToStatKey[effect.moveKind] !== statKey) isMatch = false;
                    if (effect.moveElement && effect.moveElement !== "All" && effect.moveElement !== techElement) isMatch = false;

                    if (isMatch) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }
                else if (effect.type === "move_power") {
                    let isMatch = false;
                    if (effect.stat === "Potenza_Tiro" && statKey === "Tiro") isMatch = true;
                    if (effect.stat === "Potenza_Dribbling" && statKey === "Tecnica") isMatch = true;
                    if (effect.stat === "Potenza_Blocco" && statKey === "Blocco") isMatch = true;
                    if (effect.stat === "Potenza_Parata" && statKey === "Parata") isMatch = true;
                    if (effect.stat === `Potenza_${techElementIt}`) isMatch = true;
                    if (effect.stat === `Potenza_Tiro_${techElementIt}` && statKey === "Tiro") isMatch = true;
                    if (effect.stat === `Potenza_Dribbling_${techElementIt}` && statKey === "Tecnica") isMatch = true;
                    if (effect.stat === `Potenza_Blocco_${techElementIt}` && statKey === "Blocco") isMatch = true;
                    if (effect.stat === `Potenza_Parata_${techElementIt}` && statKey === "Parata") isMatch = true;

                    if (isMatch) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }
                else if (effect.type === "specific_move_power" || effect.type === "specific_move") {
                    const possibleNames = [effect.stat, effect.statName, effect.moveName, effect.move, effect.tech].filter(Boolean);
                    let statMatch = false;

                    if (possibleNames.length === 0) {
                        if (p.title && (p.title.includes(tech.name) || p.title.includes(techKey))) statMatch = true;
                    } else {
                        possibleNames.forEach(n => {
                            if (techKey === n || tech.name.includes(n) || n.includes(techKey)) statMatch = true;
                        });
                    }

                    if (statMatch) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }
            });
        }

        const descSuffix = stacks > 1 ? `<br><span class="text-primary fw-bold">(Attivata ${stacks} volte)</span>` : '';
        const parsedDesc = parsePassiveText(p.template, currentLvData);
        passiveData.push({ title: p.title, level: sel.lvIndex + 1, active: isAffecting, desc: parsedDesc + descSuffix });
    });

    const statFinale = Math.floor((baseStat + passiveStatBuff) * roleMult);
    const potenzaFinale = techPower + passivePowerBuff;

    // --- NUOVA LOGICA TRONCAMENTO PER DIFETTO (MATH.FLOOR) IN OGNI STEP ---
    let step1 = Math.floor(statFinale * potenzaFinale * 0.01);
    let step2 = Math.floor(step1 * stabMult);
    let rawDmg = Math.floor(step2 * adv);
    // ---------------------------------------------------------------------
    const danno = rawDmg;

    return { danno, statKey, baseStat, passiveStatBuff, roleMult, techPower, passivePowerBuff, hasStab, stabMult, adv, passiveData };
}

export function isTargetValid(caster, targetChar, effect) {
    // --- [NOVITÀ] CONTROLLO "ALLIES" ---
    // Se il targetScope è "allies" (alleati/compagni), IL CASTER DEVE ESSERE ESCLUSO!
    if (effect.targetScope === "allies" && caster.id === targetChar.id) {
        return false;
    }
    // -----------------------------------

    if (effect.target) {
        if (effect.target === "self") return caster.id === targetChar.id;
        if (effect.target === "team" || effect.target.includes("allies")) {
            if (effect.target.includes("allies") && caster.id === targetChar.id) return false;
            return true;
        }
        if (effect.target.startsWith("enemy")) return false;

        const role = extractPosition(targetChar.position);
        const element = extractElement(targetChar.element);
        const tags = targetChar.tags ? targetChar.tags.map(t => t.toLowerCase()) : [];

        if (effect.target === "team_DF") return role === "DF";
        if (effect.target === "team_FW") return role === "FW";
        if (effect.target === "team_MF") return role === "MF";
        if (effect.target === "team_GK") return role === "GK";
        if (effect.target === "team_DF_GK") return role === "DF" || role === "GK";
        if (effect.target === "team_MF_DF") return role === "MF" || role === "DF";
        if (effect.target === "team_FW_MF") return role === "FW" || role === "MF";

        if (effect.target === "team_Forest") return element === "Forest";
        if (effect.target === "team_Wind_Fire") return element === "Wind" || element === "Fire";
        if (effect.target === "team_Forest_DF_GK") return element === "Forest" && (role === "DF" || role === "GK");
        if (effect.target === "team_FW_Forest") return role === "FW" && element === "Forest";
        if (effect.target === "team_FW_Fire") return role === "FW" && element === "Fire";
        if (effect.target === "team_FW_Fire_Forest") return role === "FW" && (element === "Fire" || element === "Forest");
        if (effect.target === "team_MF_Wind") return role === "MF" && element === "Wind";

        if (effect.target === "team_Raimon") return tags.some(t => t.includes('raimon'));
        if (effect.target === "team_teikoku") return tags.some(t => t.includes('royalacademy') || t.includes('teikoku'));
        if (effect.target === "team_Raimon_Emperors") return tags.some(t => t.includes('raimon') || t.includes('royalacademy') || t.includes('teikoku'));
        if (effect.target === "team_InazumaJapan") return tags.some(t => t.includes('inazumajapan'));
        if (effect.target === "team_zeus") return tags.some(t => t.includes('zeus'));

        return false;
    }

    if (effect.targetScope === "self" && caster.id !== targetChar.id) return false;
    if (effect.targetScope === "enemy") return false;

    const role = extractPosition(targetChar.position);
    const element = extractElement(targetChar.element);
    const tags = targetChar.tags ? targetChar.tags.map(t => t.toLowerCase()) : [];

    if (effect.targetRoles && effect.targetRoles.length > 0 && !effect.targetRoles.includes(role)) return false;
    if (effect.targetElements && effect.targetElements.length > 0 && !effect.targetElements.includes(element)) return false;

    if (effect.targetTags && effect.targetTags.length > 0) {
        const hasRequiredTag = effect.targetTags.some(reqTag => {
            const cleanReq = reqTag.toLowerCase().replace('.png', '').split('/').pop();
            return tags.some(charTag => charTag.includes(cleanReq));
        });
        if (!hasRequiredTag) return false;
    }

    return true;
}

export function calculateTeamDamage(team, stageConfig = { element: null, bonus: 0, opponent: 'None', mode: 'defense' }) {
    const results = [];
    let totalDamage = 0;
    let previousMoveElement = null;

    const buffs = team.map(() => ({
        statSelf: 0, statAlly: 0, powerSelf: 0, powerAlly: 0,
        statDetails: [], powerDetails: []
    }));

    team.forEach((casterWrapper, casterIndex) => {
        const caster = casterWrapper.charData;
        const passiveLevelsMap = casterWrapper.passiveLevels || {};

        const allPassives = Object.keys(passiveLevelsMap);

        allPassives.forEach(passiveId => {
            const userLevelIndex = passiveLevelsMap[passiveId];
            if (userLevelIndex === -1 || userLevelIndex === undefined) return;

            const passiveDef = passivesLibrary.find(p => p.id === passiveId);
            if (!passiveDef || !passiveDef.levels[userLevelIndex]) return;

            const currentLvData = passiveDef.levels[userLevelIndex];
            const actionsList = passiveDef.effects || passiveDef.actions;

            if (!actionsList) return;

            actionsList.forEach(effect => {
                const isPower = effect.type === 'move_power' || effect.type === 'specific_move_power' || effect.type === 'specific_move' || effect.type === 'power';
                const isStat = effect.type === 'base_stat' || effect.type === 'stat';

                if (!isPower && !isStat) return;

                let actualValue = 0;
                if (effect.valueRef) {
                    actualValue = parseInt(currentLvData[effect.valueRef]) || 0;
                } else if (effect.amount !== undefined) {
                    if (effect.amount === "{VAL}") actualValue = parseInt(currentLvData.val) || 0;
                    else if (effect.amount === "{POWER}") actualValue = parseInt(currentLvData.power) || 0;
                    else if (effect.amount === "{VAL2}") actualValue = parseInt(currentLvData.val2) || 0;
                    else {
                        let parsed = parseInt(effect.amount);
                        actualValue = isNaN(parsed) ? (parseInt(currentLvData.power) || parseInt(currentLvData.val) || 0) : parsed;
                    }
                } else {
                    actualValue = parseInt(currentLvData.power) || parseInt(currentLvData.val) || 0;
                }

                if (actualValue === 0) return;

                team.forEach((targetWrapper, targetIndex) => {
                    const target = targetWrapper.charData;

                    if (isTargetValid(caster, target, effect)) {
                        const targetTech = techniquesLibrary[targetWrapper.moveName];
                        if (!targetTech) return;

                        const targetStatType = getStatKeyByIcon(targetTech.icon);
                        const targetTechElement = extractElement(targetTech.elementIcon);

                        let isGenericOrSpecific = false;

                        if (isStat) {
                            const statName = effect.stat || effect.statName;
                            if (statName === targetStatType || statName === "All" || statName === "Tutte_le_Statistiche") isGenericOrSpecific = true;
                        } else if (isPower) {

                            if (effect.type === "specific_move_power" || effect.type === "specific_move") {
                                const possibleNames = [effect.stat, effect.statName, effect.moveName, effect.move, effect.tech, effect.targetMove].filter(Boolean);
                                let statMatch = false;

                                if (possibleNames.length === 0) {
                                    if (passiveDef.title && (passiveDef.title.includes(targetTech.name) || passiveDef.title.includes(targetWrapper.moveName))) {
                                        statMatch = true;
                                    }
                                } else {
                                    possibleNames.forEach(n => {
                                        if (targetWrapper.moveName === n || targetTech.name.includes(n) || n.includes(targetWrapper.moveName)) {
                                            statMatch = true;
                                        }
                                    });
                                }

                                if (statMatch) isGenericOrSpecific = true;

                            } else {
                                let isMatch = true;
                                const mkMap = {"Tiro":"Tiro", "Dribbling":"Tecnica", "Blocco":"Blocco", "Parata":"Parata"};
                                if (effect.moveKind && effect.moveKind !== "All" && mkMap[effect.moveKind] !== targetStatType) isMatch = false;
                                if (effect.moveElement && effect.moveElement !== targetTechElement) isMatch = false;

                                if (effect.stat && effect.stat !== "All" && effect.stat !== "Tutte_le_Statistiche") {
                                    const elMapIt = { 'Fire': 'Fuoco', 'Wind': 'Vento', 'Forest': 'Foresta', 'Mountain': 'Montagna', 'Void': 'Vuoto' };
                                    const targetTechElementIt = elMapIt[targetTechElement];
                                    let statMatch = false;

                                    if (effect.stat === "Potenza_Tiro" && targetStatType === "Tiro") statMatch = true;
                                    if (effect.stat === "Potenza_Dribbling" && targetStatType === "Tecnica") statMatch = true;
                                    if (effect.stat === "Potenza_Blocco" && targetStatType === "Blocco") statMatch = true;
                                    if (effect.stat === "Potenza_Parata" && targetStatType === "Parata") statMatch = true;
                                    if (effect.stat === `Potenza_${targetTechElementIt}`) statMatch = true;
                                    if (effect.stat === `Potenza_Tiro_${targetTechElementIt}` && statKey === "Tiro") statMatch = true;
                                    if (effect.stat === `Potenza_Dribbling_${targetTechElementIt}` && statKey === "Tecnica") statMatch = true;
                                    if (effect.stat === `Potenza_Blocco_${targetTechElementIt}` && statKey === "Blocco") statMatch = true;
                                    if (effect.stat === `Potenza_Parata_${targetTechElementIt}` && statKey === "Parata") statMatch = true;
                                    if (effect.stat.includes(targetStatType)) statMatch = true;

                                    const strippedStat = effect.stat.replace("Potenza_", "");
                                    if (strippedStat === targetWrapper.moveName || targetTech.name.includes(strippedStat)) statMatch = true;
                                    if (effect.stat === targetWrapper.moveName || targetTech.name.includes(effect.stat)) statMatch = true;

                                    if (effect.moveName && (effect.moveName === targetWrapper.moveName || targetTech.name.includes(effect.moveName))) statMatch = true;

                                    if (!statMatch) isMatch = false;
                                }

                                if (isMatch) isGenericOrSpecific = true;
                            }
                        }

                        if (isGenericOrSpecific) {
                            const isSelf = casterIndex === targetIndex;
                            const logEntry = {
                                source: caster.name,
                                passiveName: passiveDef.title,
                                value: actualValue,
                                isSelf: isSelf
                            };

                            if (isStat) {
                                if (isSelf) buffs[targetIndex].statSelf += actualValue;
                                else buffs[targetIndex].statAlly += actualValue;
                                buffs[targetIndex].statDetails.push(logEntry);
                            } else if (isPower) {
                                if (isSelf) buffs[targetIndex].powerSelf += actualValue;
                                else buffs[targetIndex].powerAlly += actualValue;
                                buffs[targetIndex].powerDetails.push(logEntry);
                            }
                        }
                    }
                });
            });
        });
    });

    team.forEach((slot, index) => {
        const char = slot.charData;
        const tech = techniquesLibrary[slot.moveName];
        const slotBuffs = buffs[index];

        if (!tech) return;

        const statKey = getStatKeyByIcon(tech.icon);
        const nakedBaseStat = slot.customStats[statKey] || 0;

        const rawBase = nakedBaseStat + slotBuffs.statSelf + slotBuffs.statAlly;
        const totalBase = Math.floor(rawBase * 1);

        const userTechLevelIndex = slot.techLevel || 0;
        const nakedPower = tech.power ? (parseInt(tech.power[userTechLevelIndex]) || 0) : 0;
        const manualBonusPower = slot.customTechPower ? (slot.customTechPower[slot.moveName] || 0) : 0;

        let stageBonus = 0;
        const moveElement = extractElement(tech.elementIcon);
        if (stageConfig.element && moveElement === stageConfig.element) {
            stageBonus = stageConfig.bonus;
        }

        const rawPower = nakedPower + manualBonusPower + slotBuffs.powerSelf + slotBuffs.powerAlly + stageBonus;
        const totalPower = Math.floor(rawPower * 1);

        let attributeMultiplier = 1.0;
        if (checkStab(char.element, tech.elementIcon)) attributeMultiplier += 0.2;
        if (stageConfig.opponent && stageConfig.opponent !== 'None') {
            attributeMultiplier += getElementalAdvantage(moveElement, stageConfig.opponent);
        }
        attributeMultiplier = Math.round(attributeMultiplier * 10) / 10;

        let chainMultiplier = 1.0;
        let isChainActive = false;
        const isGKInDefense = (stageConfig.mode === 'defense' && index === 4);

        if (index > 0 && previousMoveElement === moveElement && !isGKInDefense) {
            chainMultiplier = 1.1;
            isChainActive = true;
        }

        // --- NUOVA LOGICA TRONCAMENTO PER DIFETTO DOPO OGNI MOLTIPLICAZIONE (MATH.FLOOR) ---
        let baseDmg = Math.floor(totalBase * totalPower * 0.01);
        let attrDmg = Math.floor(baseDmg * attributeMultiplier);
        let finalDamage = isChainActive ? Math.floor(attrDmg * chainMultiplier) : attrDmg;
        // -----------------------------------------------------------------------------------

        totalDamage += finalDamage;
        previousMoveElement = moveElement;

        results.push({
            charName: char.name,
            moveName: slot.moveName,
            moveElement: moveElement,
            statType: statKey,
            calculations: {
                base: { naked: nakedBaseStat, selfBuff: slotBuffs.statSelf, allyBuff: slotBuffs.statAlly, total: totalBase },
                power: {
                    naked: nakedPower,
                    customBonus: manualBonusPower,
                    selfBuff: slotBuffs.powerSelf,
                    allyBuff: slotBuffs.powerAlly,
                    stageBonus: stageBonus,
                    total: totalPower
                },
                multipliers: { attribute: attributeMultiplier, chain: chainMultiplier },
                damage: finalDamage
            },
            details: { stats: slotBuffs.statDetails, power: slotBuffs.powerDetails }
        });
    });

    let finalMultiplier = 1.0;
    let isClear = false;

    if (stageConfig.mode === 'defense') {
        isClear = totalDamage >= 200000;
        finalMultiplier = isClear ? 1.5 : 1.0;
    } else if (stageConfig.mode === 'attack') {
        isClear = totalDamage >= 250000;
        finalMultiplier = isClear ? 3.6 : 2.4;
    }

    const finalScore = Math.floor(totalDamage * finalMultiplier);

    return {
        slots: results,
        totalDamage: totalDamage,
        finalMultiplier: finalMultiplier,
        isClear: isClear,
        finalScore: finalScore
    };
}

export function calculateCoachBuffs(charData, coachDb, coachLevel) {
    let statBuffs = { Tiro: 0, Tecnica: 0, Blocco: 0, Parata: 0, Velocità: 0 };
    let powerBuffs = { Tiro: 0, Tecnica: 0, Blocco: 0, Parata: 0 };
    let logsStats = [];
    let logsPower = [];

    if (!charData || !coachDb) return { statBuffs, powerBuffs, logsStats, logsPower };

    const charRole = extractPosition(charData.position).toLowerCase();
    const charTags = charData.tags ? charData.tags.map(t => t.toLowerCase()) : [];

    const processActions = (actions, levelData, sourceName) => {
        if (!actions) return;

        actions.forEach(action => {
            let isTarget = false;
            const target = action.target ? action.target.toLowerCase() : "";

            if (target === "all" || target.includes("allies") || target.includes("team")) {
                isTarget = true;
                if(target.includes("fw") && charRole !== "fw") isTarget = false;
                if(target.includes("mf") && charRole !== "mf") isTarget = false;
                if(target.includes("df") && charRole !== "df") isTarget = false;
                if(target.includes("gk") && charRole !== "gk") isTarget = false;

                if(target.includes("inazumajapan") && !charTags.some(t => t.includes("inazumajapan"))) isTarget = false;
                if(target.includes("raimon") && !charTags.some(t => t.includes("raimon"))) isTarget = false;
            }

            if (isTarget) {
                let amount = 0;
                if (action.amount === "{VAL}") amount = parseInt(levelData?.val) || 0;
                else if (action.amount === "{POWER}") amount = parseInt(levelData?.power) || 0;
                else if (action.amount === "{VAL2}") amount = parseInt(levelData?.val2) || 0;
                else amount = parseInt(action.amount) || 0;

                if (action.type === "base_stat" || action.type === "stat") {
                    const statName = action.stat || action.statName;
                    if (statBuffs[statName] !== undefined) {
                        statBuffs[statName] += amount;
                        logsStats.push(`[Mister] ${sourceName} : +${amount} ${statName}`);
                    } else if (statName === "Tutte_le_Statistiche" || statName === "All") {
                        for (let key in statBuffs) statBuffs[key] += amount;
                        logsStats.push(`[Mister] ${sourceName} : +${amount} Tutte le Stat.`);
                    }
                }
                else if (action.type === "move_power" || action.type === "power") {
                    let matchCat = null;
                    if (action.stat === "Potenza_Tiro" || action.moveKind === "Tiro") matchCat = "Tiro";
                    if (action.stat === "Potenza_Dribbling" || action.moveKind === "Dribbling") matchCat = "Tecnica";
                    if (action.stat === "Potenza_Blocco" || action.moveKind === "Blocco") matchCat = "Blocco";
                    if (action.stat === "Potenza_Parata" || action.moveKind === "Parata") matchCat = "Parata";

                    if (matchCat) {
                        powerBuffs[matchCat] += amount;
                        logsPower.push(`[Mister] ${sourceName} : +${amount} Pot. ${matchCat}`);
                    }
                }
            }
        });
    };

    if (coachDb.coachPassive && coachDb.coachPassive.actions) {
        const levelData = coachDb.coachPassive.levels[Math.max(0, coachLevel - 1)];
        processActions(coachDb.coachPassive.actions, levelData, coachDb.coachPassive.title || "Passiva Allenatore");
    }

    if (coachDb.formationPassive && coachDb.formationPassive.actions) {
        processActions(coachDb.formationPassive.actions, null, coachDb.formationPassive.title || "Passiva Formazione");
    }

    return { statBuffs, powerBuffs, logsStats, logsPower };
}