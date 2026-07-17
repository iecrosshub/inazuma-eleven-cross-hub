// js/Core/trialOptimizer.js

import { characterRegistry, passivesLibrary, techniquesLibrary, universalManualsKeys } from './database.js';
import { extractPosition } from './parsers.js';
import { calculateTeamDamage, calcolaStatisticheEsatte } from './calculator.js';

export class TrialOptimizer {
    constructor(app) {
        this.app = app;
    }

    createCharEngineFormat(charData, moveName, mode, customConfig) {
        const customStats = {};
        const techLevels = {};
        const customTechPower = {};
        const passiveLevels = {};

        // --- LOGICA ORIGINALE RIPRISTINATA ---
        // (Usata come fallback SOLO per la Collezione, come prima)
        let statsSource = charData.stats;
        if (!statsSource && charData.growth_pattern_code) {
            const calced = calcolaStatisticheEsatte(charData, 300, 9, 300);
            statsSource = {
                "Tiro": { lv300: calced.kick },
                "Tecnica": { lv300: calced.technique },
                "Blocco": { lv300: calced.block },
                "Parata": { lv300: calced.catch },
                "Velocità": { lv300: calced.speed }
            };
        }

        const collData = this.app.collectionData[charData.id] || {};
        let allValidMoves = [...charData.myTechniques];
        if (collData.equippedManual && !allValidMoves.includes(collData.equippedManual)) {
            allValidMoves.push(collData.equippedManual);
        }

        const isTaughtMove = !charData.myTechniques.includes(moveName);
        const cRerolls = collData.rerollSlots || {};
        const ignoreRerolls = customConfig ? customConfig.ignoreRerolls : false;

        if (mode === 'max') {
            // --- NUOVA LOGICA: SOLO PER L'OTTIMIZZATORE META ---
            // Livello 300, Grado 9 (Legendary+), Equipaggiamenti a 1 (base pura)
            let maxStats = {};
            if (charData.growth_pattern_code) {
                const calcedMax = calcolaStatisticheEsatte(charData, 300, 9, 1);
                if (calcedMax) {
                    maxStats = { "Tiro": calcedMax.kick, "Tecnica": calcedMax.technique, "Blocco": calcedMax.block, "Parata": calcedMax.catch, "Velocità": calcedMax.speed };
                }
            } else if (charData.stats) {
                // Fallback per PG inseriti manualmente senza growth_pattern
                maxStats = {
                    "Tiro": charData.stats.Tiro?.lv300 || 0,
                    "Tecnica": charData.stats.Tecnica?.lv300 || 0,
                    "Blocco": charData.stats.Blocco?.lv300 || 0,
                    "Parata": charData.stats.Parata?.lv300 || 0,
                    "Velocità": charData.stats.Velocità?.lv300 || 0
                };
            }

            ["Tiro", "Tecnica", "Blocco", "Parata", "Velocità"].forEach(s => customStats[s] = maxStats[s] || 0);

            allValidMoves.forEach(t => { techLevels[t] = 9; customTechPower[t] = 0; });

            if (isTaughtMove) {
                techLevels[moveName] = 9;
                customTechPower[moveName] = 0;
            }

            [...(charData.myBasicPassivesIds || []), ...(charData.myRarityPassivesIds || [])].forEach(pId => {
                const pDef = passivesLibrary.find(p => p.id === pId);
                passiveLevels[pId] = pDef ? pDef.levels.length - 1 : 0;
            });

            if (!ignoreRerolls) {
                Object.values(cRerolls).forEach(r => {
                    if (r && r.id) passiveLevels[r.id] = r.lv;
                });
            }

        } else {
            // --- LOGICA ORIGINALE: LA TUA COLLEZIONE ---
            const cStats = collData.stats || {};
            const cTechs = collData.techLevels || {};
            const cPass = collData.passives || {};

            ["Tiro", "Tecnica", "Blocco", "Parata", "Velocità"].forEach(s => customStats[s] = cStats[s] || statsSource[s]?.lv300 || 0);
            allValidMoves.forEach(t => { techLevels[t] = cTechs[t] || 0; customTechPower[t] = 0; });

            if (isTaughtMove) {
                if (moveName === collData.equippedManual) {
                    techLevels[moveName] = cTechs[moveName] !== undefined ? cTechs[moveName] : 0;
                } else {
                    techLevels[moveName] = 0;
                }
            }

            [...(charData.myBasicPassivesIds || []), ...(charData.myRarityPassivesIds || [])].forEach(pId => {
                passiveLevels[pId] = cPass[pId] !== undefined ? cPass[pId] : -1;
            });

            if (!ignoreRerolls) {
                Object.values(cRerolls).forEach(r => {
                    if (r && r.id) passiveLevels[r.id] = r.lv;
                });
            }
        }
        return { charData, moveName, customStats, techLevel: techLevels[moveName] || 0, customTechPower, passiveLevels };
    }

    getPermutations(arr, size) {
        const results = [];
        function permute(current, remaining) {
            if (current.length === size) { results.push(current); return; }
            for (let i = 0; i < remaining.length; i++) {
                permute([...current, remaining[i]], remaining.slice(0, i).concat(remaining.slice(i + 1)));
            }
        }
        permute([], arr);
        return results;
    }

    getAdvantageBonus(techElem, oppElem, techKind, mode) {
        if (!oppElem || oppElem === 'None') return 0;
        const wins = { 'Fire': 'Forest', 'Forest': 'Wind', 'Wind': 'Mountain', 'Mountain': 'Fire' };
        if (wins[techElem] === oppElem) {
            if (mode === 'defense' && (techKind === 'Blocco' || techKind === 'Parata')) return 20;
            if (mode === 'attack' && techKind === 'Tiro') return 10;
        }
        return 0;
    }

    async runOptimization(customConfig = null) {
        const modalId = customConfig?.modalId || 'optimizerModal';
        const containerId = customConfig?.containerId || 'optimizerResults';
        const modal = document.getElementById(modalId);
        const container = document.getElementById(containerId);

        if (modal) modal.style.display = 'flex';
        if (container) container.innerHTML = '<div class="text-center text-secondary py-5"><i class="fas fa-spinner fa-spin fa-3x mb-3"></i><br>Elaborazione formazioni in corso...</div>';

        await new Promise(resolve => setTimeout(resolve, 100));

        const mode = customConfig ? customConfig.mode : 'collection';
        const allowManuals = customConfig ? customConfig.allowManuals : false;
        const hideApplyButton = customConfig ? customConfig.hideApplyButton : false;
        const hideScore = customConfig ? customConfig.hideScore : false;

        const stageConfig = customConfig?.stageConfig || {
            element: document.getElementById('stageElement')?.dataset.value || '',
            bonus: parseInt(document.getElementById('stageBonusDisplay')?.textContent || '0') || 0,
            opponent: document.getElementById('opponentElement')?.dataset.value || 'None',
            mode: document.getElementById('simMode')?.dataset.value || 'defense'
        };

        const isDefense = stageConfig.mode === 'defense';
        const availableChars = [];

        for (const char of characterRegistry) {
            if (mode === 'collection') {
                const dbEntry = this.app.collectionData[char.id];
                if (!dbEntry || dbEntry.owned === false) continue;
            }
            try {
                const module = await import(`../Characters/${char.id}.js`);
                availableChars.push(module.charData);
            } catch (e) { }
        }

        const evaluatedPlayers = [];
        for (const char of availableChars) {
            const isGK = extractPosition(char.position) === 'GK';
            let bestMove = null;
            let bestScore = -1;

            let movesToTest = [...char.myTechniques];
            if (allowManuals) {
                movesToTest.push(...universalManualsKeys);
            } else if (mode === 'collection') {
                const dbEntry = this.app.collectionData[char.id];
                if (dbEntry && dbEntry.equippedManual && !movesToTest.includes(dbEntry.equippedManual)) {
                    movesToTest.push(dbEntry.equippedManual);
                }
            }
            movesToTest = [...new Set(movesToTest)];

            for (const move of movesToTest) {
                const techDef = techniquesLibrary[move];
                if (!techDef) continue;

                if (isDefense) {
                    if (isGK && techDef.kind !== 'Parata') continue;
                    if (!isGK) {
                        if (techDef.kind !== 'Blocco') continue;
                        if (techDef.shootBlock === false) continue;
                    }
                } else {
                    if (techDef.kind !== 'Tiro') continue;
                }

                const engineFormat = this.createCharEngineFormat(char, move, mode, customConfig);

                const advBonus = this.getAdvantageBonus(techDef.element, stageConfig.opponent, techDef.kind, stageConfig.mode);
                if (advBonus > 0) engineFormat.customTechPower[move] = advBonus;

                const dummyTeam = [engineFormat];
                const sim = calculateTeamDamage(dummyTeam, stageConfig);

                if (sim.totalDamage > bestScore) {
                    bestScore = sim.totalDamage;
                    bestMove = move;
                }
            }
            if (bestMove) evaluatedPlayers.push({ char, bestMove, bestScore, isGK });
        }

        evaluatedPlayers.sort((a, b) => b.bestScore - a.bestScore);

        let permutations = [];
        if (isDefense) {
            const topGKs = evaluatedPlayers.filter(p => p.isGK).slice(0, 2);
            const topBlockers = evaluatedPlayers.filter(p => !p.isGK).slice(0, 8);
            const blockPerms = this.getPermutations(topBlockers, 4);
            for (const bp of blockPerms) {
                for (const gk of topGKs) permutations.push([...bp, gk]);
            }
        } else {
            const topShooters = evaluatedPlayers.slice(0, 8);
            permutations = this.getPermutations(topShooters, 5);
        }

        const teamResults = [];
        for (const perm of permutations) {
            const teamData = perm.map(p => {
                const eFmt = this.createCharEngineFormat(p.char, p.bestMove, mode, customConfig);
                const tDef = techniquesLibrary[p.bestMove];
                const aBon = this.getAdvantageBonus(tDef.element, stageConfig.opponent, tDef.kind, stageConfig.mode);
                if (aBon > 0) eFmt.customTechPower[p.bestMove] = aBon;
                return eFmt;
            });
            const simResult = calculateTeamDamage(teamData, stageConfig);
            teamResults.push({ team: perm, score: simResult.finalScore, rawData: simResult });
        }

        teamResults.sort((a, b) => b.score - a.score);

        const top5 = [];
        const seenScores = new Set();
        const seenSquads = new Set();

        for (const res of teamResults) {
            const scoreInt = Math.floor(res.score);
            const squadSignature = res.team.map(p => p.char.id).sort().join('_');

            if (!seenScores.has(scoreInt) && !seenSquads.has(squadSignature)) {
                seenScores.add(scoreInt);
                seenSquads.add(squadSignature);
                top5.push(res);
            }
            if (top5.length === 10) break;
        }

        if (container) container.innerHTML = '';
        if (top5.length === 0) {
            if (container) container.innerHTML = '<div class="text-danger fw-bold text-center">Nessuna formazione trovata.</div>';
            return;
        }

        top5.forEach((res, idx) => {
            const row = document.createElement('div');
            row.className = 'bg-white rounded p-3 d-flex justify-content-between align-items-center shadow-sm border border-light mb-3';

            let headerText = hideScore
                ? `Rank #${idx + 1}`
                : `#${idx + 1} - Score: ${Math.floor(res.score).toLocaleString('it-IT')}`;

            let htmlStr = `<div class="d-flex flex-column w-100"><strong class="text-primary fs-5"><i class="fas fa-medal text-warning"></i> ${headerText}</strong><div class="d-flex gap-2 mt-2 flex-wrap">`;

            let manualsToTeach = [];

            res.team.forEach(p => {
                const isManual = !p.char.myTechniques.includes(p.bestMove);
                const techDef = techniquesLibrary[p.bestMove];
                const badgeColor = isManual ? 'bg-danger' : 'bg-secondary';

                htmlStr += `<span class="badge ${badgeColor}" title="${techDef.name}"><img src="${techDef.elementIcon}" style="height:12px; margin-right:4px; margin-bottom:2px;">${p.char.name}</span>`;

                if (isManual && hideScore) {
                    manualsToTeach.push(`📕 Insegna <strong>${techDef.name}</strong> a <strong>${p.char.name}</strong>`);
                }
            });

            htmlStr += `</div>`;

            if (manualsToTeach.length > 0) {
                htmlStr += `
                <div class="mt-3 p-2 rounded bg-light border-start border-4 border-danger" style="font-size: 0.9rem;">
                    <span class="text-danger fw-bold d-block mb-1"><i class="fas fa-book"></i> Manuali necessari per questa Formazione:</span>
                    <div style="color: #506482;">${manualsToTeach.join('<br>')}</div>
                </div>`;
            }

            htmlStr += `</div>`;

            if (!hideApplyButton) {
                htmlStr += `<button class="btn btn-success fw-bold text-nowrap px-4 py-2 apply-btn ms-3" data-index="${idx}">APPLICA</button>`;
            }

            row.innerHTML = htmlStr;
            if (container) container.appendChild(row);
        });

        if (!hideApplyButton) {
            if (container) container.querySelectorAll('.apply-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const idx = e.target.dataset.index;
                    const bestTeam = top5[idx].team;
                    for (let i = 0; i < 5; i++) {
                        this.app.activeTeam[i] = bestTeam[i].char;
                        const slotCharSelect = document.querySelector(`.slot-card[data-slot="${i}"] .sim-char-select`);
                        const slotSelectSelected = slotCharSelect.querySelector('.select-selected span');

                        slotCharSelect.dataset.value = bestTeam[i].char.id;
                        slotSelectSelected.innerHTML = `<img src="${bestTeam[i].char.thumb}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> ${bestTeam[i].char.name}`;

                        this.app.renderTechDropdown(i);
                        document.querySelector(`.slot-card[data-slot="${i}"] .sim-tech-select`).value = bestTeam[i].bestMove;
                    }
                    this.app.updateSimulation();
                    if (modal) modal.style.display = 'none';
                });
            });
        }
    }
}