// js/Controllers/passiveDB.js

// Aggiunto l'import di rerollPassivesByRole
import { passivesLibrary, rerollPassivesByRole } from '../Core/database.js';
import { parsePassiveText } from '../Core/parsers.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

class PassiveDatabase {
    constructor() {
        this.allPassive = passivesLibrary;
        this.init();
    }

    init() {
        this.setupCustomSelects();
        document.getElementById('search-name').addEventListener('input', () => this.applyFilters());

        // INTERCETTAZIONE CLICK SUI TAB DEL LIVELLO
        const container = document.getElementById('passive-list');
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('passive-tab')) {
                const tab = e.target;
                const card = tab.closest('.tech-card');
                const pId = card.dataset.id;
                const idx = parseInt(tab.dataset.index);

                // Recupera i dati della passiva dal database locale
                const p = this.allPassive.find(x => x.id === pId);
                if (!p || !p.levels[idx]) return;

                // Aggiorna lo stato dei Tab visivi sulla card
                card.querySelectorAll('.passive-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Aggiorna dinamicamente il badge dei requisiti
                const reqBadge = card.querySelector('.passive-req-badge');
                if (reqBadge) {
                    reqBadge.textContent = p.levels[idx].req || 'Sbloccato di base';
                }

                // Aggiorna dinamicamente il box descrizione sostituendo i placeholder con i dati di quel livello
                const descBox = card.querySelector('.passive-desc-box');
                if (descBox) {
                    descBox.innerHTML = parsePassiveText(p.template, p.levels[idx]);
                }
            }
        });

        this.applyFilters();
    }

    setupCustomSelects() {
        // Uso del Componente Universale
        document.querySelectorAll('.filters-container .custom-select').forEach(customSelect => {
            initCustomSelect(customSelect, () => this.applyFilters());
        });
        setupGlobalSelectClose();
    }

    getCategory(p) {
        if (p.id.startsWith('REROLL_')) return 'Reroll';
        if (p.category === 'Always' || p.category === 'Bond') return 'Level';
        return 'Awakening';
    }

    applyFilters() {
        const categoryVal = document.getElementById('filter-category').dataset.value;

        // Gestione dinamica visibilità del filtro "Ruolo" e dimensioni griglia
        const colCategory = document.getElementById('col-category');
        const colRole = document.getElementById('col-role');
        const colStat = document.getElementById('col-stat');
        const colPower = document.getElementById('col-power');

        if (categoryVal === 'Reroll') {
            colRole.style.display = 'block';
            // Restringe le colonne a un quarto di pagina (col-md-3) per farcene stare 4 in riga
            [colCategory, colStat, colPower].forEach(el => {
                el.classList.remove('col-md-4');
                el.classList.add('col-md-3');
            });
        } else {
            colRole.style.display = 'none';
            // Riporta le colonne a un terzo di pagina (col-md-4) visto che sono solo 3
            [colCategory, colStat, colPower].forEach(el => {
                el.classList.remove('col-md-3');
                el.classList.add('col-md-4');
            });
        }

        const filters = {
            name: document.getElementById('search-name').value.toLowerCase(),
            category: categoryVal,
            role: document.getElementById('filter-role').dataset.value, // Estrapolo il ruolo
            stat: document.getElementById('filter-stat').dataset.value,
            power: document.getElementById('filter-power').dataset.value
        };

        const filtered = this.allPassive.filter(p => {
            // Filtro Nome
            if (filters.name && !p.title.toLowerCase().includes(filters.name) && !p.template.toLowerCase().includes(filters.name)) return false;

            // Filtro Categoria
            const cat = this.getCategory(p);
            if (filters.category !== 'All' && cat !== filters.category) return false;

            // NUOVO: Filtro Ruolo (Applicato SOLO se la categoria è Reroll e il ruolo non è 'All')
            if (filters.category === 'Reroll' && filters.role !== 'All') {
                const rolePassivesArray = rerollPassivesByRole[filters.role] || [];
                // Se l'ID di questa passiva NON è presente nell'array di quel ruolo, escludila
                if (!rolePassivesArray.some(rp => rp.id === p.id)) {
                    return false;
                }
            }

            const effects = p.effects || p.actions || [];

            // Filtro Statistica
            if (filters.stat !== 'All') {
                const hasStat = effects.some(e => (e.type === 'stat' || e.type === 'base_stat') && e.statName === filters.stat);
                if (!hasStat) return false;
            }

            // Filtro Potenza
            if (filters.power !== 'All') {
                const hasPower = effects.some(e => (e.type === 'power' || e.type === 'move_power') && (e.moveKind === filters.power || e.stat?.includes(filters.power)));
                if (!hasPower) return false;
            }

            return true;
        });

        this.render(filtered);
    }

    render(list) {
        const container = document.getElementById('passive-list');
        container.innerHTML = '';

        if (list.length === 0) {
            container.innerHTML = `<h4 class="text-center text-secondary my-5">Nessuna passiva trovata con questi filtri.</h4>`;
            return;
        }

        list.forEach(p => {
            const cat = this.getCategory(p);

            const tabsHtml = p.levels.map((_, idx) => `
                <div class="passive-tab ${idx === 0 ? 'active' : ''}" data-index="${idx}">Lv. ${idx + 1}</div>
            `).join('');

            const initialDesc = parsePassiveText(p.template, p.levels[0]);
            const initialReq = p.levels[0].req || 'Sbloccato di base';

            const cardHtml = `
                <div class="tech-card cat-${cat}" data-id="${p.id}">
                    <div class="tech-header d-flex justify-content-between align-items-center">
                        <span>${p.title}</span>
                        <span style="font-size: 0.9rem; color: #8e9bb0; font-weight: normal;">ID: ${p.id}</span>
                    </div>
                    <div class="tech-content-wrapper" style="padding: 15px 20px 20px 20px;">
                        <div class="passive-tabs-container">
                            <div class="passive-tabs">
                                ${tabsHtml}
                            </div>
                        </div>
                        <div class="passive-req-container">
                            <span class="passive-req-badge">${initialReq}</span>
                        </div>
                        <div class="passive-desc-box">
                            ${initialDesc}
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PassiveDatabase();
});