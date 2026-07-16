// js/Controllers/stats.js

import { characterRegistry } from '../Core/database.js';
import { filterCharacters } from '../Core/roster.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';
import { calcolaStatisticheEsatte } from '../Core/calculator.js';

class StatsDatabase {
    constructor() {
        this.allChars = [];
        this.sortKey = 'name';
        this.sortAsc = true;
        this.init();
    }

    async init() {
        for (const char of characterRegistry) {
            try {
                const module = await import(`../Characters/${char.id}.js`);
                let fullChar = { id: char.id, ...char, ...module.charData };

                // 1. SE HA IL GROWTH PATTERN: Calcoliamo le stats al volo
                if (fullChar.growth_pattern_code) {
                    // Usiamo '1' come ultimo parametro (livello equip) per isolare le stats base
                    const stats1 = calcolaStatisticheEsatte(fullChar, 1, 9, 1);
                    const stats300 = calcolaStatisticheEsatte(fullChar, 300, 9, 1);

                    if (stats1 && stats300) {
                        fullChar.stats = {
                            "Tiro": { lv1: stats1.kick, lv300: stats300.kick },
                            "Tecnica": { lv1: stats1.technique, lv300: stats300.technique },
                            "Blocco": { lv1: stats1.block, lv300: stats300.block },
                            "Parata": { lv1: stats1.catch, lv300: stats300.catch },
                            "Velocità": { lv1: stats1.speed, lv300: stats300.speed }
                        };
                    }
                }
                // 2. SE NON HA IL GROWTH PATTERN: Usiamo le sue stats così come sono già scritte nel file
                else if (!fullChar.stats) {
                    // Fallback di sicurezza se per errore mancassero le stats in un pg manuale
                    fullChar.stats = {
                        "Tiro": { lv1: 0, lv300: 0 },
                        "Tecnica": { lv1: 0, lv300: 0 },
                        "Blocco": { lv1: 0, lv300: 0 },
                        "Parata": { lv1: 0, lv300: 0 },
                        "Velocità": { lv1: 0, lv300: 0 }
                    };
                }

                this.allChars.push(fullChar);
            } catch (e) { console.error("Error loading", char.id); }
        }

        this.setupCustomSelects();
        document.getElementById('search-name').addEventListener('input', () => this.updateView());
        window.sortStats = (key) => this.toggleSort(key);

        this.updateView();
    }

    setupCustomSelects() {
        document.querySelectorAll('.custom-select').forEach(customSelect => {
            initCustomSelect(customSelect, () => this.updateView());
        });
        setupGlobalSelectClose();
    }

    toggleSort(key) {
        if (this.sortKey === key) this.sortAsc = !this.sortAsc;
        else { this.sortKey = key; this.sortAsc = true; }
        this.updateView();
    }

    async updateView() {
        const filters = {
            name: document.getElementById('search-name').value,
            element: document.getElementById('filter-element').dataset.value,
            position: document.getElementById('filter-position').dataset.value,
            rarity: document.getElementById('filter-rarity').dataset.value,
            style: document.getElementById('filter-style').dataset.value,
            team: document.getElementById('filter-team').dataset.value,
            season: document.getElementById('filter-season').dataset.value
        };

        let data = await filterCharacters(this.allChars, filters);

        data.sort((a, b) => {
            let valA = this.sortKey === 'name' ? a.name : (a.stats && a.stats[this.sortKey] ? a.stats[this.sortKey].lv300 : 0);
            let valB = this.sortKey === 'name' ? b.name : (b.stats && b.stats[this.sortKey] ? b.stats[this.sortKey].lv300 : 0);

            if (this.sortKey === 'name') return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            return this.sortAsc ? valA - valB : valB - valA;
        });

        this.render(data);
    }

    render(data) {
        const list = document.getElementById('stats-list');
        list.innerHTML = '';

        if (data.length === 0) {
            list.innerHTML = `<div class="text-center mt-4 text-secondary">Nessun giocatore corrisponde ai filtri selezionati.</div>`;
            return;
        }

        data.forEach(c => {
            const stats = c.stats || {};
            const row = document.createElement('div');
            row.className = 'stats-row';
            row.innerHTML = `
                <div class="col-name"><img src="${c.thumb}" class="char-thumb-mini"> ${c.name}</div>
                <div class="col-stat">${stats.Tiro?.lv300 || 0}</div>
                <div class="col-stat">${stats.Tecnica?.lv300 || 0}</div>
                <div class="col-stat">${stats.Blocco?.lv300 || 0}</div>
                <div class="col-stat">${stats.Parata?.lv300 || 0}</div>
                <div class="col-stat">${stats.Velocità?.lv300 || 0}</div>
            `;
            list.appendChild(row);
        });
    }
}

new StatsDatabase();