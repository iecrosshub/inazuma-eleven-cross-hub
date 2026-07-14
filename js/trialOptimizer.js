// js/trialOptimizer.js

import { characterRegistry, passivesLibrary, techniquesLibrary, calculateTeamDamage, extractPosition, universalManualsKeys } from './utils.js';

export class TrialOptimizer {
    constructor(app) {
        this.app = app;
    }

    createCharEngineFormat(charData, moveName, mode) {
        const customStats = {};
        const techLevels = {};
        const customTechPower = {};
        const passiveLevels = {};

        const collData = this.app.collectionData[charData.id] || {};
        let allValidMoves = [...charData.myTechniques];
        if (collData.equippedManual && !allValidMoves.includes(collData.equippedManual)) {
            allValidMoves.push(collData.equippedManual);
        }

        const isTaughtMove = !charData.myTechniques.includes(moveName);

        // Estrazione delle passive Reroll
        const cRerolls = collData.rerollSlots || {};

        if (mode === 'max') {
            ["Tiro", "Tecnica", "Blocco", "Parata", "Velocità"].forEach(s => customStats[s] = charData.stats[s]?.lv300 || 0);
            allValidMoves.forEach(t => { techLevels[t] = 9; customTechPower[t] = 0; });

            if (isTaughtMove) {
                techLevels[moveName] = 9;
                customTechPower[moveName] = 0;
            }

            [...(charData.myBasicPassivesIds || []), ...(charData.myRarityPassivesIds || [])].forEach(pId => {
                const pDef = passivesLibrary.find(p => p.id === pId);
                passiveLevels[pId] = pDef ? pDef.levels.length - 1 : 0;
            });

            Object.values(cRerolls).forEach(r => {
                if (r && r.id) passiveLevels[r.id] = r.lv;
            });

        } else {
            const cStats = collData.stats || {};
            const cTechs = collData.techLevels || {};
            const cPass = collData.passives || {};

            ["Tiro", "Tecnica", "Blocco", "Parata", "Velocità"].forEach(s => customStats[s] = cStats[s] || 0);
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

            Object.values(cRerolls).forEach(r => {
                if (r && r.id) passiveLevels[r.id] = r.lv;
            });
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

    async runOptimization() {
        const modal = document.getElementById('optimizerModal');
        const container = document.getElementById('optimizerResults');
        modal.style.display = 'flex';
        container.innerHTML = '<div class="text-center text-secondary py-5"><i class="fas fa-spinner fa-spin fa-3x mb-3"></i><br>Elaborazione formazioni in corso...</div>';

        await new Promise(resolve => setTimeout(resolve, 100));

        // FIX DELL'ERRORE: Hardcodiamo i valori visto che abbiamo rimosso i selettori HTML
        const mode = 'collection';
        const allowManuals = false;

        const stageElementNode = document.getElementById('stageElement');
        const opponentElementNode = document.getElementById('opponentElement');
        const simModeNode = document.getElementById('simMode');
        const stageBonusDisplay = document.getElementById('stageBonusDisplay');

        const stageConfig = {
            element: stageElementNode ? stageElementNode.dataset.value : '',
            bonus: parseInt(stageBonusDisplay ? stageBonusDisplay.textContent : '0') || 0,
            opponent: opponentElementNode ? opponentElementNode.dataset.value : 'None',
            mode: simModeNode ? simModeNode.dataset.value : 'defense'
        };

        const isDefense = stageConfig.mode === 'defense';

        const availableChars = [];
        for (const char of characterRegistry) {
            if (mode === 'collection') {
                const dbEntry = this.app.collectionData[char.id];
                if (!dbEntry || dbEntry.owned === false) continue;
            }
            try {
                const module = await import(`./Characters/${char.id}.js`);
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

                const engineFormat = this.createCharEngineFormat(char, move, mode);
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
                const eFmt = this.createCharEngineFormat(p.char, p.bestMove, mode);
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
            if (top5.length === 5) break;
        }

        container.innerHTML = '';
        if (top5.length === 0) {
            container.innerHTML = '<div class="text-danger fw-bold text-center">Nessuna formazione trovata. Rivedi i filtri!</div>';
            return;
        }

        top5.forEach((res, idx) => {
            const row = document.createElement('div');
            row.className = 'bg-white rounded p-3 d-flex justify-content-between align-items-center shadow-sm border border-light';

            let htmlStr = `<div class="d-flex flex-column"><strong class="text-primary fs-5">#${idx + 1} - Score: ${Math.floor(res.score).toLocaleString('it-IT')}</strong><div class="d-flex gap-2 mt-2 flex-wrap">`;

            res.team.forEach(p => {
                const isManual = !p.char.myTechniques.includes(p.bestMove);
                const badgeColor = isManual ? 'bg-danger' : 'bg-secondary';
                htmlStr += `<span class="badge ${badgeColor}" title="${techniquesLibrary[p.bestMove].name}"><img src="${techniquesLibrary[p.bestMove].elementIcon}" style="height:12px; margin-right:4px; margin-bottom:2px;">${p.char.name}</span>`;
            });

            htmlStr += `</div></div><button class="btn btn-success fw-bold text-nowrap px-4 py-2 apply-btn" data-index="${idx}">APPLICA</button>`;
            row.innerHTML = htmlStr;
            container.appendChild(row);
        });

        container.querySelectorAll('.apply-btn').forEach(btn => {
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
                document.getElementById('optimizerModal').style.display = 'none';
            });
        });
    }
}