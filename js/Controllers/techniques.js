// js/Controllers/techniques.js

import { techniquesLibrary } from '../Core/database.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

class TechniquesDatabase {
    constructor() {
        this.allTechniques = Object.entries(techniquesLibrary).map(([key, val]) => ({ id: key, ...val }));
        this.init();
    }

    init() {
        this.restoreFilters();
        this.setupCustomSelects();

        document.getElementById('search-name').addEventListener('input', () => this.applyFilters());

        this.applyFilters();
    }

    restoreFilters() {
        const saved = localStorage.getItem('techniques_filters');
        if (saved) {
            try {
                const filters = JSON.parse(saved);
                const searchInput = document.getElementById('search-name');
                if (searchInput) searchInput.value = filters.name || '';

                const setCustomSelect = (id, val) => {
                    const el = document.getElementById(id);
                    if (el && val !== undefined && val !== null) {
                        el.dataset.value = val;
                        const option = el.querySelector(`.select-items div[data-value="${val}"]`) || el.querySelector('.select-items div');
                        if (option) {
                            el.dataset.value = option.dataset.value;
                            el.querySelector('.select-selected span').innerHTML = option.innerHTML;
                        }
                    }
                };

                setCustomSelect('filter-kind', filters.kind);
                setCustomSelect('filter-element', filters.element);
                setCustomSelect('filter-sb', filters.sb);
                setCustomSelect('filter-catch', filters.catchType);
            } catch (e) {}
        }
    }

    setupCustomSelects() {
        // Uso del Componente Universale
        document.querySelectorAll('.filters-container .custom-select').forEach(customSelect => {
            initCustomSelect(customSelect, () => this.applyFilters());
        });
        setupGlobalSelectClose();
    }

    applyFilters() {
        const filters = {
            name: document.getElementById('search-name').value.toLowerCase(),
            kind: document.getElementById('filter-kind').dataset.value,
            element: document.getElementById('filter-element').dataset.value,
            sb: document.getElementById('filter-sb').dataset.value,
            catchType: document.getElementById('filter-catch').dataset.value
        };

        localStorage.setItem('techniques_filters', JSON.stringify(filters));

        const filteredArray = this.allTechniques.filter(tech => {
            if (filters.name && !tech.name.toLowerCase().includes(filters.name)) return false;
            if (filters.kind !== 'All' && tech.kind !== filters.kind) return false;
            if (filters.element !== 'All' && tech.element !== filters.element) return false;

            if (filters.sb === 'yes' && !tech.shootBlock) return false;
            if (filters.sb === 'no' && tech.shootBlock) return false;

            if (filters.catchType !== 'All') {
                if (tech.kind !== 'Parata') return false;

                const isPunch = tech.punch === true || tech.catchType === 'Respinta' || tech.catchType === 'Punch';
                if (filters.catchType === 'Respinta' && !isPunch) return false;
                if (filters.catchType === 'Blocco' && isPunch) return false;
            }

            return true;
        });

        this.renderTechniques(filteredArray);
    }

    renderTechniques(techniquesList) {
        const container = document.getElementById('techniques-list');
        container.innerHTML = '';

        if (techniquesList.length === 0) {
            container.innerHTML = `<h4 class="text-center text-secondary my-5">Nessuna tecnica trovata con questi filtri.</h4>`;
            return;
        }

        const formatPerc = (val) => String(val).includes('%') ? val : `${val}%`;

        techniquesList.forEach(tech => {
            const power = tech.power || Array(10).fill(0);
            const tp = tech.tp || Array(10).fill(0);
            const range = tech.range || Array(10).fill(0);
            const crit = tech.crit || Array(10).fill(0);
            const foul = tech.foul || Array(10).fill(0);

            let extraBadges = '';
            let rowsHtml = `
                <tr>
                    <td>Potenza</td>
                    ${power.map(p => `<td>${p}</td>`).join('')}
                </tr>
                <tr>
                    <td>Costo TP</td>
                    ${tp.map(t => `<td>${t}</td>`).join('')}
                </tr>
            `;

            if (tech.kind === 'Tiro') {
                rowsHtml += `
                    <tr>
                        <td>Portata</td>
                        ${range.map(r => `<td>${r}</td>`).join('')}
                    </tr>`;
                if (tech.chain) {
                    extraBadges += `<span class="tech-badge badge-special">Catena</span>`;
                }

            } else if (tech.kind === 'Dribbling') {
                rowsHtml += `
                    <tr>
                        <td>% Fallo</td>
                        ${foul.map(f => `<td>${formatPerc(f)}</td>`).join('')}
                    </tr>`;

            } else if (tech.kind === 'Blocco') {
                rowsHtml += `
                    <tr>
                        <td>% Fallo</td>
                        ${foul.map(f => `<td>${formatPerc(f)}</td>`).join('')}
                    </tr>`;
                if (tech.shootBlock) {
                    extraBadges += `<span class="tech-badge badge-special">Blocco Tiri</span>`;
                }

            } else if (tech.kind === 'Parata') {
                let catchType = "Blocco";
                if (tech.punch === true || tech.catchType === 'Respinta' || tech.catchType === 'Punch') {
                    catchType = "Respinta";
                }
                extraBadges += `<span class="tech-badge badge-special">${catchType}</span>`;
            }

            rowsHtml += `
                <tr>
                    <td>% Critico</td>
                    ${crit.map(c => `<td>${formatPerc(c)}</td>`).join('')}
                </tr>`;

            const cardHtml = `
                <div class="tech-card">
                    <div class="tech-header">
                        <img src="${tech.icon}" alt="${tech.kind}" onerror="this.style.display='none'">
                        <img src="${tech.elementIcon}" alt="${tech.element}" onerror="this.style.display='none'">
                        ${tech.name}
                    </div>
                    <div class="tech-content-wrapper">
                        <div class="tech-badges">
                            <span class="tech-badge">${tech.kind}</span>
                            <span class="tech-badge">${tech.element}</span>
                            ${extraBadges}
                        </div>
                        <div class="tech-table-container">
                            <table class="tech-table">
                                <thead>
                                    <tr>
                                        <th>Statistica / Lv</th>
                                        <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
                                        <th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rowsHtml}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TechniquesDatabase();
});