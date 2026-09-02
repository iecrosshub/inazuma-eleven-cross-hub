// --- js/Core/BattleEngine.js ---

import { passivesLibrary } from '../Passive/library.js';
import { tagMap, elementMap, roleMap } from '../Components/tagDictionary.js';

export class BattleEngine {
    constructor() {
        this.homeTeam = [];
        this.awayTeam = [];
        this.matchState = "draw"; // Può essere "winning", "losing", "draw"
    }

    // 1. Inizializza la partita
    startMatch(team1, team2) {
        this.homeTeam = this.initializePlayers(team1);
        this.awayTeam = this.initializePlayers(team2);

        // Applica le passive "Always" e "Bonds" al fischio d'inizio!
        this.processAlwaysAndBonds(this.homeTeam, this.awayTeam);
        this.processAlwaysAndBonds(this.awayTeam, this.homeTeam);
    }

    // 2. Prepara i giocatori strutturandoli per il simulatore
    initializePlayers(roster) {
        return roster.map(p => {
            let pData = { ...p };

            // Se il calculator passa le stats customizzate nude (da UI), usa quelle! Altrimenti default.
            pData.matchStats = p.customBaseStats ? { ...p.customBaseStats } : {};
            if(!p.customBaseStats && p.stats) {
                pData.matchStats = {
                    Tiro: p.stats["Tiro"] ? p.stats["Tiro"].lv340 : 0,
                    Tecnica: p.stats["Tecnica"] ? p.stats["Tecnica"].lv340 : 0,
                    Blocco: p.stats["Blocco"] ? p.stats["Blocco"].lv340 : 0,
                    Parata: p.stats["Parata"] ? p.stats["Parata"].lv340 : 0,
                    Velocità: p.stats["Velocità"] ? p.stats["Velocità"].lv340 : 0,
                    TP: p.stats["TP"] ? p.stats["TP"].lv340 : 0
                };
            }

            pData.moveBuffs = [];
            pData.moveModifiers = [];

            // Traduzione Automatica Tag
            pData.logicalTags = (p.tags || []).map(imgUrl => tagMap[imgUrl] || imgUrl);
            pData.logicalElement = elementMap[p.element] || p.element;
            pData.logicalRole = roleMap[p.position] || p.position;

            const allPassiveIds = [...(p.myBasicPassivesIds || []), ...(p.myRarityPassivesIds || [])];

            pData.equippedPassives = allPassiveIds.map(pid => {
                const def = passivesLibrary.find(libP => libP.id === pid);

                // Cerca il livello specifico passato dal calculator (se esiste), altrimenti livello MAX
                let lvIndex = def ? def.levels.length - 1 : 0;
                if (p.selectedPassiveLevels && p.selectedPassiveLevels[pid] !== undefined) {
                    lvIndex = p.selectedPassiveLevels[pid];
                }

                return {
                    id: pid,
                    def: def,
                    levelIndex: lvIndex
                };
            }).filter(ep => ep.def && ep.levelIndex !== -1); // Scarta le passive disattivate (-1)

            return pData;
        });
    }

    // 3. Elabora i Legami e i Sempre Attivi
    processAlwaysAndBonds(team, enemyTeam) {
        team.forEach(player => {
            player.equippedPassives.forEach(passive => {
                if (passive.def.category === "Always" || passive.def.category === "Bond") {
                    if (this.checkConditions(passive.def.conditions, team)) {
                        this.applyEffects(passive.def, passive.levelIndex, player, team, enemyTeam);
                    }
                }
            });
        });
    }

    // 4. Controlla che le condizioni siano soddisfatte (incluso il conteggio di sé stesso)
    checkConditions(conditions, team) {
        if (!conditions) return true;
        let count = 0;

        if (conditions.requiresTags) {
            count = team.filter(p => conditions.requiresTags.some(tag => p.logicalTags.includes(tag))).length;
        } else if (conditions.requiresElements) {
            count = team.filter(p => conditions.requiresElements.includes(p.logicalElement)).length;
        } else {
            return true;
        }

        const minCount = conditions.requiresCount || 1;
        return count >= minCount;
    }

    // 5. Applica gli effetti (gestendo i "meno" nei debuff correttamente)
    applyEffects(passiveDef, levelIndex, sourcePlayer, team, enemyTeam) {
        const levelData = passiveDef.levels[levelIndex];

        passiveDef.effects.forEach(effect => {
            const bonusValue = levelData[effect.valueRef];
            if (bonusValue === undefined) return;

            let targets = [];
            if (effect.targetScope === "self") targets = [sourcePlayer];
            else if (effect.targetScope === "allies") targets = team.filter(p => p.id !== sourcePlayer.id);
            else if (effect.targetScope === "team") targets = team;
            else if (effect.targetScope === "enemy_team") targets = enemyTeam;

            // Filtro per chi deve ricevere il buff (FW? Elemento Fuoco? ecc.)
            targets = targets.filter(p => {
                const roleMatch = (!effect.targetRoles || effect.targetRoles.length === 0) || effect.targetRoles.includes(p.logicalRole);
                const elemMatch = (!effect.targetElements || effect.targetElements.length === 0) || effect.targetElements.includes(p.logicalElement);
                const tagMatch = (!effect.targetTags || effect.targetTags.length === 0) || effect.targetTags.some(t => p.logicalTags.includes(t));
                return roleMatch && elemMatch && tagMatch;
            });

            // Erogazione del Buff o Debuff
            targets.forEach(target => {
                if (effect.type === "stat") {
                    target.matchStats[effect.statName] += bonusValue;
                }
                else if (effect.type === "stat_debuff") {
                    target.matchStats[effect.statName] -= bonusValue;
                }
                else if (effect.type === "power" || effect.type === "power_debuff") {
                    target.moveBuffs.push({
                        kind: effect.moveKind,
                        element: effect.moveElement,
                        bonus: effect.type === "power_debuff" ? -bonusValue : bonusValue
                    });
                }
                else if (effect.type === "specific_move") {
                    target.moveBuffs.push({
                        moveName: effect.moveName,
                        bonus: bonusValue
                    });
                }
                else if (effect.type === "move_modifier") {
                    target.moveModifiers.push({
                        modifierType: effect.modifierType,
                        moveName: effect.moveName,
                        value: bonusValue
                    });
                }
            });
        });
    }

    // 6. Funzione per innescare le Stacking (Es. Quando Victor dribbla, chiami questo)
    triggerEvent(eventName, actingPlayer, teamId) {
        const team = (teamId === 'home') ? this.homeTeam : this.awayTeam;
        const enemyTeam = (teamId === 'home') ? this.awayTeam : this.homeTeam;

        team.forEach(player => {
            player.equippedPassives.forEach(passive => {
                const def = passive.def;

                if (def.category === "Stacking" && def.conditions) {
                    // Logica molto semplificata: si innesca?
                    if (def.conditions.triggerEvent === eventName) {
                        this.applyEffects(def, passive.levelIndex, player, team, enemyTeam);
                    }
                }
            });
        });
    }
}