// js/Controllers/stats.js

import { characterRegistry } from '../Core/database.js';
import { filterCharacters } from '../Core/roster.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

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
                this.allChars.push({ id: char.id, ...char, ...module.charData });
            } catch (e) { console.error("Error loading", char.id); }
        }

        this.setupCustomSelects();
        document.getElementById('search-name').addEventListener('input', () => this.updateView());
        window.sortStats = (key) => this.toggleSort(key);

        this.updateView();
    }

    setupCustomSelects() {
        // Uso del Componente Universale
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
            let valA = this.sortKey === 'name' ? a.name : (a.stats[this.sortKey]?.lv300 || 0);
            let valB = this.sortKey === 'name' ? b.name : (b.stats[this.sortKey]?.lv300 || 0);

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
            const row = document.createElement('div');
            row.className = 'stats-row';
            row.innerHTML = `
                <div class="col-name"><img src="${c.thumb}" class="char-thumb-mini"> ${c.name}</div>
                <div class="col-stat">${c.stats.Tiro?.lv300 || 0}</div>
                <div class="col-stat">${c.stats.Tecnica?.lv300 || 0}</div>
                <div class="col-stat">${c.stats.Blocco?.lv300 || 0}</div>
                <div class="col-stat">${c.stats.Parata?.lv300 || 0}</div>
                <div class="col-stat">${c.stats.Velocità?.lv300 || 0}</div>
            `;
            list.appendChild(row);
        });
    }
}

new StatsDatabase();