// js/Core/calculator.js

import { techniquesLibrary, passivesLibrary } from './database.js';
import { extractElement, extractPosition, getStatKeyByIcon } from './parsers.js';
import { growth_patterns } from './growthTable.js';
import { equipmentData } from './equipmentTables.js';
import { BattleEngine } from './BattleEngine.js';
import { tagMap, elementMap, roleMap } from '../Components/tagDictionary.js';

const awakeningMultipliers = {
    0: 1.00, 1: 1.10, 2: 1.20, 3: 1.30, 4: 1.40,
    5: 1.50, 6: 1.60, 7: 1.70, 8: 1.85, 9: 2.00
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

// Funzione Helper per tradurre il tipo di statistica nel tipo di mossa
function getMoveKindByStat(statKey) {
    if (statKey === "Tiro") return "Tiro";
    if (statKey === "Tecnica") return "Dribbling";
    if (statKey === "Blocco") return "Blocco";
    if (statKey === "Parata") return "Parata";
    return "All";
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
                if (equipMatrixObj[ruolo] && equipMatrixObj[ruolo][categoria]) targetLvl = equipMatrixObj[ruolo][categoria];
            } else if (typeof equipMatrixObj === 'number' || typeof equipMatrixObj === 'string') {
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

// -----------------------------------------------------------------------
// NUOVO CALCOLO DANNI SINGOLO TRAMITE BATTLE ENGINE
// -----------------------------------------------------------------------
export function calculateDamageData(charDb, techKey, techLvlIndex, customStat, roleMult, adv, passiveSelections, customTechPower = 0) {
    if (!charDb || !techKey || !techniquesLibrary[techKey]) return null;

    const tech = techniquesLibrary[techKey];
    const statKey = getStatKeyByIcon(tech.icon);
    const techElement = extractElement(tech.elementIcon);
    const charElement = extractElement(charDb.element);

    const hasStab = (techElement === charElement && techElement !== 'Void');
    const stabMult = hasStab ? 1.2 : 1.0;

    const baseStat = parseInt(customStat) || 0;
    const baseTechPower = tech.power ? (parseInt(tech.power[techLvlIndex]) || 0) : 0;
    const techPower = baseTechPower + parseInt(customTechPower || 0);

    // Mappa le selezioni dell'utente
    const passiveMap = {};
    passiveSelections.forEach(sel => { passiveMap[sel.id] = sel.lvIndex; });

    // Crea il giocatore fittizio da passare al motore
    const simPlayer = {
        ...charDb,
        customBaseStats: { [statKey]: baseStat },
        selectedPassiveLevels: passiveMap,
        myBasicPassivesIds: passiveSelections.map(s => s.id) // Passiamo le passive attive in UI
    };

    // 1. INIZIALIZZA IL MOTORE
    const engine = new BattleEngine();
    engine.startMatch([simPlayer], []); // Nemici vuoti per la preview
    const enginePlayer = engine.homeTeam[0];

    // 2. RECUPERA I DATI MODIFICATI DAL MOTORE
    const finalStat = enginePlayer.matchStats[statKey] || baseStat;
    const passiveStatBuff = finalStat - baseStat;

    let passivePowerBuff = 0;
    enginePlayer.moveBuffs.forEach(buff => {
        let applicabile = true;
        if (buff.kind && buff.kind !== "All" && buff.kind !== getMoveKindByStat(statKey)) applicabile = false;
        if (buff.element && buff.element !== "All" && buff.element !== techElement) applicabile = false;
        if (buff.moveName && buff.moveName !== tech.name && buff.moveName !== techKey) applicabile = false;

        if (applicabile) passivePowerBuff += buff.bonus;
    });

    // 3. CALCOLO FORMULA INAZUMA
    const statFinale = Math.floor(finalStat * roleMult);
    const potenzaFinale = techPower + passivePowerBuff;

    let step1 = Math.floor(statFinale * potenzaFinale * 0.01);
    let step2 = Math.floor(step1 * stabMult);
    let rawDmg = Math.floor(step2 * adv);

    return {
        danno: rawDmg, statKey, baseStat, passiveStatBuff,
        roleMult, techPower, passivePowerBuff, hasStab, stabMult, adv, passiveData: []
    };
}

// -----------------------------------------------------------------------
// NUOVO CALCOLO DANNI SQUADRA TRAMITE BATTLE ENGINE
// -----------------------------------------------------------------------
export function calculateTeamDamage(team, stageConfig = { element: null, bonus: 0, opponent: 'None', mode: 'defense' }) {
    const results = [];
    let totalDamage = 0;
    let previousMoveElement = null;

    // 1. INIZIALIZZA IL MOTORE
    const engine = new BattleEngine();

    // Prepara il Roster per il Motore
    const rosterForEngine = team.map(slot => {
        return {
            ...slot.charData,
            selectedPassiveLevels: slot.passiveLevels,
            customBaseStats: slot.customStats
        };
    });

    // Avvia la simulazione delle passive di gruppo
    engine.startMatch(rosterForEngine, []);

    // 2. RECUPERA I DATI DEL MOTORE E CALCOLA
    team.forEach((slot, index) => {
        const char = slot.charData;
        const tech = techniquesLibrary[slot.moveName];
        const enginePlayer = engine.homeTeam[index];

        if (!tech) return;

        const statKey = getStatKeyByIcon(tech.icon);
        const techElement = extractElement(tech.elementIcon);

        // -- STATISTICA --
        const nakedBaseStat = slot.customStats[statKey] || 0;
        const totalBase = enginePlayer.matchStats[statKey] || nakedBaseStat;
        const statBuffsAmount = totalBase - nakedBaseStat;

        // -- POTENZA --
        const userTechLevelIndex = slot.techLevel || 0;
        const nakedPower = tech.power ? (parseInt(tech.power[userTechLevelIndex]) || 0) : 0;
        const manualBonusPower = slot.customTechPower ? (slot.customTechPower[slot.moveName] || 0) : 0;

        let stageBonus = 0;
        if (stageConfig.element && techElement === stageConfig.element) stageBonus = stageConfig.bonus;

        let enginePowerBuffs = 0;
        enginePlayer.moveBuffs.forEach(buff => {
            let applicabile = true;
            if (buff.kind && buff.kind !== "All" && buff.kind !== getMoveKindByStat(statKey)) applicabile = false;
            if (buff.element && buff.element !== "All" && buff.element !== techElement) applicabile = false;
            if (buff.moveName && buff.moveName !== tech.name && buff.moveName !== slot.moveName) applicabile = false;

            if (applicabile) enginePowerBuffs += buff.bonus;
        });

        const totalPower = nakedPower + manualBonusPower + enginePowerBuffs + stageBonus;

        // -- MOLTIPLICATORI --
        let attributeMultiplier = 1.0;
        if (checkStab(char.element, tech.elementIcon)) attributeMultiplier += 0.2;
        if (stageConfig.opponent && stageConfig.opponent !== 'None') {
            attributeMultiplier += getElementalAdvantage(techElement, stageConfig.opponent);
        }
        attributeMultiplier = Math.round(attributeMultiplier * 10) / 10;

        let chainMultiplier = 1.0;
        let isChainActive = false;
        const isGKInDefense = (stageConfig.mode === 'defense' && index === 4);

        if (index > 0 && previousMoveElement === techElement && !isGKInDefense) {
            chainMultiplier = 1.1;
            isChainActive = true;
        }

        // -- DANNO --
        let baseDmg = Math.floor(totalBase * totalPower * 0.01);
        let attrDmg = Math.floor(baseDmg * attributeMultiplier);
        let finalDamage = isChainActive ? Math.floor(attrDmg * chainMultiplier) : attrDmg;

        totalDamage += finalDamage;
        previousMoveElement = techElement;

        results.push({
            charName: char.name,
            moveName: slot.moveName,
            moveElement: techElement,
            statType: statKey,
            calculations: {
                base: { naked: nakedBaseStat, selfBuff: statBuffsAmount, allyBuff: 0, total: totalBase },
                power: { naked: nakedPower, customBonus: manualBonusPower, selfBuff: enginePowerBuffs, allyBuff: 0, stageBonus: stageBonus, total: totalPower },
                multipliers: { attribute: attributeMultiplier, chain: chainMultiplier },
                damage: finalDamage
            },
            details: { stats: [], power: [] }
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
    let statBuffs = { Tiro: 0, Tecnica: 0, Blocco: 0, Parata: 0, Velocità: 0, TP: 0 };
    let powerBuffs = { Tiro: 0, Tecnica: 0, Blocco: 0, Parata: 0, All: 0 };
    let logsStats = [];
    let logsPower = [];

    if (!charData || !coachDb) return { statBuffs, powerBuffs, logsStats, logsPower };

    // Traduzione dei tag grafici in tag logici (come nel Battle Engine)
    const charRole = roleMap[charData.position] || charData.position;
    const charElement = elementMap[charData.element] || charData.element;
    const charTags = (charData.tags || []).map(t => tagMap[t] || t);

    const processActions = (actions, levelData, sourceName) => {
        if (!actions) return;

        actions.forEach(action => {
            // Controlla se il giocatore rispetta i requisiti della passiva dell'allenatore
            const roleMatch = (!action.targetRoles || action.targetRoles.length === 0) || action.targetRoles.includes(charRole);
            const elemMatch = (!action.targetElements || action.targetElements.length === 0) || action.targetElements.includes(charElement);
            const tagMatch = (!action.targetTags || action.targetTags.length === 0) || action.targetTags.some(t => charTags.includes(t));

            if (roleMatch && elemMatch && tagMatch) {
                let amount = 0;
                if (action.amount === "{VAL}") amount = parseInt(levelData?.val) || 0;
                else if (action.amount === "{POWER}") amount = parseInt(levelData?.power) || 0;
                else if (action.amount === "{VAL2}") amount = parseInt(levelData?.val2) || 0;
                else amount = parseInt(action.amount) || 0;

                // Applica Statistiche
                if (action.type === "stat" || action.type === "base_stat") {
                    const statName = action.statName || action.stat;
                    if (statBuffs[statName] !== undefined) {
                        statBuffs[statName] += amount;
                        logsStats.push(`[Mister] ${sourceName} : +${amount} ${statName}`);
                    } else if (statName === "All" || statName === "Tutte_le_Statistiche") {
                        for (let key in statBuffs) statBuffs[key] += amount;
                        logsStats.push(`[Mister] ${sourceName} : +${amount} Tutte le Stat.`);
                    }
                }
                // Applica Malus Statistiche
                else if (action.type === "stat_debuff") {
                    const statName = action.statName || action.stat;
                    if (statBuffs[statName] !== undefined) {
                        statBuffs[statName] -= amount;
                        logsStats.push(`[Mister] ${sourceName} : -${amount} ${statName}`);
                    }
                }
                // Applica Potenza Mosse
                else if (action.type === "power" || action.type === "move_power") {
                    const matchCat = action.moveKind;
                    if (matchCat && powerBuffs[matchCat] !== undefined) {
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