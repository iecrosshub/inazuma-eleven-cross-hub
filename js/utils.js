// js/utils.js

// ==========================================
// 0. GESTIONE DATABASE GLOBALE
// ==========================================
import { characterRegistry } from './Characters/registry.js';
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';

export { characterRegistry, techniquesLibrary, passivesLibrary };

export const universalManualsKeys = [
    "グレネードショット",     // Tiro (Fuoco)
    "ドラゴンクラッシュ",     // Tiro (Foresta)
    "エターナルブリザード",   // Tiro (Vento)
    "つちだるま",             // Tiro (Montagna)
    "スーパー四股踏み",       // Blocco (Fuoco)
    "スピニングカット",       // Blocco (Vento)
    "ザ・ウォール"            // Blocco (Montagna)
];

// Funzioni per decodificare i requisiti di Sblocco
export function getRarityTier(reqString) {
    if (!reqString) return -1;
    const str = reqString.toLowerCase();
    if (str.includes("legendary player +")) return 6;
    if (str.includes("legendary player")) return 5;
    if (str.includes("top player +")) return 4;
    if (str.includes("top player")) return 3;
    if (str.includes("inferiore advanced player")) return 0;
    if (str.includes("advanced player +")) return 2;
    if (str.includes("advanced player")) return 1;
    return -1;
}

export function getLevelTier(reqString) {
    if (!reqString) return -1;
    const lower = reqString.toLowerCase();
    // Escludiamo le stringhe che si riferiscono alla Rarità per evitare conflitti
    if (lower.includes("advanced") || lower.includes("top") || lower.includes("legendary")) return -1;

    // Estrae qualsiasi numero presente nella stringa della passiva
    const match = lower.match(/\d+/);
    if (match) return parseInt(match[0]);
    return -1;
}

// ==========================================
// 1. GESTIONE URL E NAVIGAZIONE
// ==========================================

export function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

export function getAdjacentCharacterId(currentId, registry, direction) {
    const idx = registry.findIndex(c => c.id === currentId);
    if (idx === -1) return null;

    if (direction === 'next') {
        return registry[(idx + 1) % registry.length].id;
    } else if (direction === 'prev') {
        const prevIdx = idx === 0 ? registry.length - 1 : idx - 1;
        return registry[prevIdx].id;
    }
}

// ==========================================
// 2. ESTRAZIONE DATI DALLE IMMAGINI
// ==========================================

export function extractElement(elementUrl) {
    if (!elementUrl) return 'Void';
    const el = elementUrl.toLowerCase();
    if (el.includes('wind')) return 'Wind';
    if (el.includes('forest')) return 'Forest';
    if (el.includes('fire')) return 'Fire';
    if (el.includes('mountain')) return 'Mountain';
    return 'Void';
}

export function extractPosition(positionUrl) {
    if (!positionUrl) return 'FW';
    const pos = positionUrl.toLowerCase();
    if (pos.includes('fw')) return 'FW';
    if (pos.includes('mf')) return 'MF';
    if (pos.includes('df')) return 'DF';
    if (pos.includes('gk')) return 'GK';
    return 'FW';
}

export function getStatKeyByIcon(iconUrl) {
    if (!iconUrl) return 'Tiro';
    const icon = iconUrl.toLowerCase();
    if (icon.includes('shoot')) return 'Tiro';
    if (icon.includes('catch') || icon.includes('save') || icon.includes('keeper')) return 'Parata';
    if (icon.includes('block') || icon.includes('defense')) return 'Blocco';
    if (icon.includes('dribble') || icon.includes('offense')) return 'Tecnica';
    return 'Tiro';
}

// ==========================================
// 3. MECCANICHE DI GIOCO E CALCOLI
// ==========================================

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

// ==========================================
// 4. MOTORE DEL SIMULATORE
// ==========================================

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

    // AGGIUNTA POTENZA EXTRA ALLA MOSSA!
    const baseTechPower = tech.power ? (parseInt(tech.power[techLvlIndex]) || 0) : 0;
    const techPower = baseTechPower + parseInt(customTechPower || 0);

    let passiveStatBuff = 0;
    let passivePowerBuff = 0;
    let passiveData = [];

    const moveKindToStatKey = {
        "Tiro": "Tiro",
        "Dribbling": "Tecnica",
        "Blocco": "Blocco",
        "Parata": "Parata"
    };

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

                if (effect.amount === "{VAL}") amount = parseInt(currentLvData.val) || 0;
                else if (effect.amount === "{POWER}") amount = parseInt(currentLvData.power) || 0;
                else if (effect.amount === "{VAL2}") amount = parseInt(currentLvData.val2) || 0;
                else if (effect.valueRef) amount = parseInt(currentLvData[effect.valueRef]) || 0;

                amount = amount * stacks;

                if ((effect.type === "stat" && (effect.statName === statKey || effect.statName === "All" || effect.statName === "Tutte_le_Statistiche")) ||
                    (effect.type === "base_stat" && (effect.stat === statKey || effect.stat === "Tutte_le_Statistiche"))) {
                    passiveStatBuff += amount;
                    isAffecting = true;
                }
                else if (effect.type === "power") {
                    let isMatch = true;
                    if (effect.moveKind && moveKindToStatKey[effect.moveKind] !== statKey) isMatch = false;
                    if (effect.moveElement && effect.moveElement !== techElement) isMatch = false;

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
                else if (effect.type === "specific_move_power") {
                    if (effect.stat === techKey || effect.stat === tech.name || effect.moveName === techKey) {
                        passivePowerBuff += amount;
                        isAffecting = true;
                    }
                }
            });
        }

        const descSuffix = stacks > 1 ? `<br><span class="text-primary fw-bold">(Attivata ${stacks} volte)</span>` : '';
        passiveData.push({ title: p.title, level: sel.lvIndex + 1, active: isAffecting, desc: p.template + descSuffix });
    });

    const statFinale = Math.floor((baseStat + passiveStatBuff) * roleMult);
    const potenzaFinale = techPower + passivePowerBuff;
    const danno = Math.floor(statFinale * (potenzaFinale / 100) * stabMult * adv);

    return { danno, statKey, baseStat, passiveStatBuff, roleMult, techPower, passivePowerBuff, hasStab, stabMult, adv, passiveData };
}

// ==========================================
// 5. UI E FILTRI GALLERIA
// ==========================================

export function parsePassiveText(template, lvData) {
    if (!template) return "";
    return Object.entries(lvData).reduce((text, [key, value]) => {
        const placeholder = `{${key.toUpperCase()}}`;
        return text.replace(placeholder, value);
    }, template);
}

export async function filterCharacters(characters, filters) {
    let results = [];
    const isActive = (val) => val != null && val !== 'All' && val !== '';
    const isAdvancedFilterActive = isActive(filters.style) || isActive(filters.team) || isActive(filters.season);

    for (let char of characters) {
        const charElement = extractElement(char.element);
        const charPosition = extractPosition(char.position);

        if (isActive(filters.name)) {
            const searchName = filters.name.toLowerCase();
            const matchName = (char.name && char.name.toLowerCase().includes(searchName)) ||
                (char.japaneseName && char.japaneseName.toLowerCase().includes(searchName)) ||
                (char.romanizedName && char.romanizedName.toLowerCase().includes(searchName));
            if (!matchName) continue;
        }

        if (isActive(filters.element) && charElement !== filters.element) continue;
        if (isActive(filters.position) && charPosition !== filters.position) continue;
        if (isActive(filters.rarity) && String(char.stars) !== String(filters.rarity)) continue;

        if (isAdvancedFilterActive) {
            try {
                const module = await import(`./Characters/${char.id}.js`);
                const allTagsRaw = module.charData.tags ? module.charData.tags.join('').toLowerCase() : '';

                if (isActive(filters.style) && !allTagsRaw.includes(`ability_${filters.style.toLowerCase()}`)) continue;
                if (isActive(filters.team) && !allTagsRaw.includes(`team_${filters.team.toLowerCase()}`)) continue;
                if (isActive(filters.season) && !allTagsRaw.includes(`title_${filters.season.toLowerCase()}`)) continue;
            } catch (err) {
                console.error("Errore nel file giocatore:", char.id);
                continue;
            }
        }
        results.push(char);
    }
    return results;
}

export async function fetchCoachData(id) {
    try {
        const module = await import(`./Coaches/${id}.js`);
        return module.coachData;
    } catch (err) {
        return null;
    }
}

// ==========================================
// 6. ROSTER MANAGER (Per il 5vs1)
// ==========================================

export class RosterManager {
    constructor() {
        this.roster = [];
        this.currentId = 0;
    }

    addCharacter(customChar) {
        this.currentId++;
        const newChar = { uid: `roster_${this.currentId}`, ...customChar };
        this.roster.push(newChar);
        return newChar;
    }

    getCharacter(uid) { return this.roster.find(c => c.uid === uid); }
    getAllCharacters() { return this.roster; }
    removeCharacter(uid) { this.roster = this.roster.filter(c => c.uid !== uid); }
}

// ==========================================
// 7. MOTORE SIMULAZIONE SQUADRA (5vs1)
// ==========================================

function isTargetValid(caster, targetChar, effect) {
    if (effect.target) {
        if (effect.target === "self") return caster.id === targetChar.id;
        if (effect.target === "team" || effect.target.includes("allies")) return true;
        if (effect.target.startsWith("enemy")) return false;

        const role = extractPosition(targetChar.position);
        const element = extractElement(targetChar.element);

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
        if (effect.target === "team_Raimon_Emperors" || effect.target === "team_teikoku" || effect.target === "team_Raimon") return true;

        return false;
    }

    if (effect.targetScope === "self" && caster.id !== targetChar.id) return false;
    if (effect.targetScope === "enemy") return false;

    const role = extractPosition(targetChar.position);
    const element = extractElement(targetChar.element);

    if (effect.targetRoles && effect.targetRoles.length > 0 && !effect.targetRoles.includes(role)) return false;
    if (effect.targetElements && effect.targetElements.length > 0 && !effect.targetElements.includes(element)) return false;

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
        const allPassives = [...(caster.myBasicPassivesIds || []), ...(caster.myRarityPassivesIds || [])];

        allPassives.forEach(passiveId => {
            const userLevelIndex = passiveLevelsMap[passiveId];
            if (userLevelIndex === -1 || userLevelIndex === undefined) return;

            const passiveDef = passivesLibrary.find(p => p.id === passiveId);
            if (!passiveDef || !passiveDef.levels[userLevelIndex]) return;

            const currentLvData = passiveDef.levels[userLevelIndex];
            const actionsList = passiveDef.effects || passiveDef.actions;

            if (!actionsList) return;

            actionsList.forEach(effect => {
                let isAlwaysOrBond = true;
                if (effect.condition) {
                    isAlwaysOrBond = effect.condition === 'always' || effect.condition === 'in_penalty_area' || effect.condition.startsWith('3_allies');
                } else if (passiveDef.conditions && passiveDef.conditions.triggerEvent) {
                    const trig = passiveDef.conditions.triggerEvent;
                    if (trig !== 'always' && !trig.includes('allies')) {
                        isAlwaysOrBond = false;
                    }
                }
                if (!isAlwaysOrBond) return;

                const isPower = effect.type === 'move_power' || effect.type === 'specific_move_power' || effect.type === 'power';
                const isStat = effect.type === 'base_stat' || effect.type === 'stat';

                if (!isPower && !isStat) return;

                let actualValue = 0;
                if (effect.valueRef) {
                    actualValue = parseInt(currentLvData[effect.valueRef]) || 0;
                } else if (effect.amount) {
                    if (effect.amount === "{VAL}") actualValue = parseInt(currentLvData.val) || 0;
                    else if (effect.amount === "{POWER}") actualValue = parseInt(currentLvData.power) || 0;
                    else if (effect.amount === "{VAL2}") actualValue = parseInt(currentLvData.val2) || 0;
                }

                team.forEach((targetWrapper, targetIndex) => {
                    const target = targetWrapper.charData;

                    if (isTargetValid(caster, target, effect)) {
                        const targetTech = techniquesLibrary[targetWrapper.moveName];
                        const targetStatType = targetTech ? getStatKeyByIcon(targetTech.icon) : 'Tiro';
                        const targetTechElement = targetTech ? extractElement(targetTech.elementIcon) : 'Void';

                        let isGenericOrSpecific = false;

                        if (isStat) {
                            const statName = effect.stat || effect.statName;
                            if (statName === targetStatType || statName === "All" || statName === "Tutte_le_Statistiche") isGenericOrSpecific = true;
                        } else if (isPower) {
                            let isMatch = true;
                            const mkMap = {"Tiro":"Tiro", "Dribbling":"Tecnica", "Blocco":"Blocco", "Parata":"Parata"};
                            if (effect.moveKind && effect.moveKind !== "All" && mkMap[effect.moveKind] !== targetStatType) isMatch = false;
                            if (effect.moveElement && effect.moveElement !== targetTechElement) isMatch = false;

                            if (effect.stat && effect.stat.includes(targetStatType)) isMatch = true;
                            if (effect.stat === "Tutte_le_Statistiche") isMatch = true;

                            if (isMatch) isGenericOrSpecific = true;
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
        const totalBase = nakedBaseStat + slotBuffs.statSelf + slotBuffs.statAlly;

        const userTechLevelIndex = slot.techLevel || 0;
        const nakedPower = tech.power ? (parseInt(tech.power[userTechLevelIndex]) || 0) : 0;

        const manualBonusPower = slot.customTechPower ? (slot.customTechPower[slot.moveName] || 0) : 0;

        let stageBonus = 0;
        const moveElement = extractElement(tech.elementIcon);
        if (stageConfig.element && moveElement === stageConfig.element) {
            stageBonus = stageConfig.bonus;
        }

        const totalPower = nakedPower + manualBonusPower + slotBuffs.powerSelf + slotBuffs.powerAlly + stageBonus;

        let attributeMultiplier = 1.0;
        if (checkStab(char.element, tech.elementIcon)) attributeMultiplier += 0.2;
        if (stageConfig.opponent && stageConfig.opponent !== 'None') {
            attributeMultiplier += getElementalAdvantage(moveElement, stageConfig.opponent);
        }
        attributeMultiplier = Math.round(attributeMultiplier * 10) / 10;

        let chainMultiplier = 1.0;
        let isChainActive = false;
        if (index > 0 && previousMoveElement === moveElement) {
            chainMultiplier = 1.1;
            isChainActive = true;
        }

        const roundOriginal = (val) => Math.floor(val + 1e-6);

        let rawDamage = roundOriginal(totalBase * totalPower * 0.01 * attributeMultiplier);
        let finalDamage = isChainActive ? roundOriginal(rawDamage * chainMultiplier) : rawDamage;

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

    const finalScore = totalDamage * finalMultiplier;

    return {
        slots: results,
        totalDamage: totalDamage,
        finalMultiplier: finalMultiplier,
        isClear: isClear,
        finalScore: finalScore
    };
}