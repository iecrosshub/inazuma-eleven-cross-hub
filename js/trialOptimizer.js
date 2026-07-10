import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { getStatKeyByIcon, extractElement } from './utils.js';

const elementAdvantages = {
    'Wind': 'Mountain', 'Mountain': 'Fire', 'Fire': 'Forest', 'Forest': 'Wind'
};

function getTechniquePower(techKey) {
    const tech = techniquesLibrary[techKey];
    if (!tech) return 0;
    const powerObj = tech.details.find(d => d.label === "Potenza");
    return powerObj ? parseInt(powerObj.values[9]) : 0;
}

function getPlayerBuffsForMove(playerData, techId, statNeeded) {
    let statBuff = 0;
    let powerBuff = 0;
    if (!playerData) return { statBuff, powerBuff };

    const allPassives = [...(playerData.myBasicPassivesIds || []), ...(playerData.myRarityPassivesIds || [])];
    const tech = techniquesLibrary[techId];
    const techElement = tech ? extractElement(tech.elementIcon) : 'Void';

    allPassives.forEach(passiveId => {
        const pDef = passivesLibrary.find(p => p.id === passiveId);
        if (!pDef) return;

        const levelData = pDef.levels[pDef.levels.length - 1];

        pDef.actions.forEach(action => {
            if (action.target !== 'self') return;

            let amountToSum = 0;
            if (action.amount === "{VAL}" && levelData.val !== undefined) amountToSum = parseInt(levelData.val);
            if (action.amount === "{POWER}" && levelData.power !== undefined) amountToSum = parseInt(levelData.power);
            if (action.amount === "{VAL2}" && levelData.val2 !== undefined) amountToSum = parseInt(levelData.val2);

            if (action.type === 'base_stat' && action.stat === statNeeded) statBuff += amountToSum;

            if (action.type === 'move_power') {
                if (action.stat === 'Potenza_Tiro' && statNeeded === 'Tiro') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Blocco' && statNeeded === 'Blocco') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Parata' && statNeeded === 'Parata') powerBuff += amountToSum;

                if (action.stat === 'Potenza_Wind' && techElement === 'Wind') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Forest' && techElement === 'Forest') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Fire' && techElement === 'Fire') powerBuff += amountToSum;
                if (action.stat === 'Potenza_Mountain' && techElement === 'Mountain') powerBuff += amountToSum;
            }

            if (action.type === 'specific_move_power' && tech && tech.name.includes(action.stat)) {
                powerBuff += amountToSum;
            }
        });
    });

    return { statBuff, powerBuff };
}

function evaluateBestMove(playerData, trialType, oppElement) {
    if (!playerData || !playerData.myTechniques || playerData.myTechniques.length === 0) return null;

    let bestMove = null;
    let highestDamage = -1;

    const validMoves = playerData.myTechniques.filter(techId => {
        const tech = techniquesLibrary[techId];
        if (!tech) return false;
        const statType = getStatKeyByIcon(tech.icon);

        if (trialType === 'attack') {
            return statType === 'Tiro';
        }

        if (trialType === 'defense_block') {
            if (statType !== 'Blocco') return false;
            const bloccoTiri = tech.details.find(d => d.label === "Blocco Tiri");
            if (bloccoTiri && bloccoTiri.values[0] === "No") return false;
            return true;
        }

        if (trialType === 'defense_catch') {
            return statType === 'Parata';
        }

        return false;
    });

    if (validMoves.length === 0) return null;

    validMoves.forEach(techId => {
        const tech = techniquesLibrary[techId];
        const statNeeded = getStatKeyByIcon(tech.icon);
        const baseStatLv300 = playerData.stats[statNeeded] ? playerData.stats[statNeeded].lv300 : 0;

        if (baseStatLv300 === 0) return;

        const techPower = getTechniquePower(techId);
        const buffs = getPlayerBuffsForMove(playerData, techId, statNeeded);

        const totalBase = baseStatLv300 + buffs.statBuff;
        let totalPower = techPower + buffs.powerBuff;

        const charElement = extractElement(playerData.element);
        const techElement = extractElement(tech.elementIcon);

        let attrMult = 1.0;
        let stageBuff = 0;

        // Vantaggio Elementale: Tecnica vs Avversario
        if (elementAdvantages[techElement] === oppElement) {
            attrMult += 0.1;
            stageBuff = trialType === 'attack' ? 10 : 20; // Bonus nascosto Stage
        } else if (elementAdvantages[oppElement] === techElement) {
            attrMult -= 0.1;
        }

        // STAB
        if (charElement === techElement && charElement !== 'Void') attrMult += 0.2;

        attrMult = Math.round(attrMult * 10) / 10;
        totalPower += stageBuff; // Aggiunta dello Stage Buff

        let rawDamage = Math.floor(totalBase * totalPower * 0.01 * attrMult);

        if (rawDamage > highestDamage) {
            highestDamage = rawDamage;
            bestMove = {
                techId: techId,
                techElement: techElement,
                rawDamage: rawDamage
            };
        }
    });

    return bestMove;
}

function getPermutations(arr) {
    if (arr.length <= 1) return [arr];
    const perms = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const remainingPerms = getPermutations(remaining);
        for (let j = 0; j < remainingPerms.length; j++) {
            perms.push([current, ...remainingPerms[j]]);
        }
    }
    return perms;
}

function calculateLineupScore(lineup) {
    let totalScore = 0;
    let previousElement = null;

    lineup.forEach(slot => {
        let dmg = slot.bestMove.rawDamage;
        if (previousElement && previousElement === slot.bestMove.techElement) {
            dmg = Math.floor(dmg * 1.1);
        }
        totalScore += dmg;
        previousElement = slot.bestMove.techElement;
    });

    return totalScore;
}

export function runOptimizer(allLoadedPlayers, trialType, oppElement) {

    if (trialType === 'attack') {
        const candidates = [];

        allLoadedPlayers.forEach(playerData => {
            const bestMove = evaluateBestMove(playerData, 'attack', oppElement);
            if (bestMove) {
                candidates.push({ playerData, bestMove });
            }
        });

        if (candidates.length < 5) return null;

        candidates.sort((a, b) => b.bestMove.rawDamage - a.bestMove.rawDamage);

        const topPlayers = candidates.slice(0, 5);

        const permutations = getPermutations(topPlayers);
        let bestLineup = null;
        let maxScore = -1;

        permutations.forEach(lineup => {
            const score = calculateLineupScore(lineup);
            if (score > maxScore) {
                maxScore = score;
                bestLineup = lineup;
            }
        });

        return bestLineup;
    }

    if (trialType === 'defense') {
        const blockCandidates = [];
        const catchCandidates = [];

        allLoadedPlayers.forEach(playerData => {
            const bestBlock = evaluateBestMove(playerData, 'defense_block', oppElement);
            if (bestBlock) blockCandidates.push({ playerData, bestMove: bestBlock });

            const bestCatch = evaluateBestMove(playerData, 'defense_catch', oppElement);
            if (bestCatch) catchCandidates.push({ playerData, bestMove: bestCatch });
        });

        if (blockCandidates.length < 4 || catchCandidates.length < 1) return null;

        blockCandidates.sort((a, b) => b.bestMove.rawDamage - a.bestMove.rawDamage);
        catchCandidates.sort((a, b) => b.bestMove.rawDamage - a.bestMove.rawDamage);

        const top4Blocks = blockCandidates.slice(0, 4);
        const topCatch = catchCandidates[0];

        const blockPermutations = getPermutations(top4Blocks);
        let bestLineup = null;
        let maxScore = -1;

        blockPermutations.forEach(blockLineup => {
            const fullLineup = [...blockLineup, topCatch];
            const score = calculateLineupScore(fullLineup);

            if (score > maxScore) {
                maxScore = score;
                bestLineup = fullLineup;
            }
        });

        return bestLineup;
    }

    return null;
}