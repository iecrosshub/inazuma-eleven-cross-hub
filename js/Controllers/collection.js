// js/Controllers/collection.js

import { characterRegistry, techniquesLibrary, passivesLibrary, universalManualsKeys, rerollPassivesByRole } from '../Core/database.js';
import { getRarityTier, getLevelTier, extractPosition } from '../Core/parsers.js';
import { filterCharacters } from '../Core/roster.js';
import { AuthManager } from '../Services/auth.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';
import { calcolaStatisticheEsatte } from '../Core/calculator.js';

class CollectionApp {
    constructor() {
        this.auth = new AuthManager();
        this.collectionData = {};
        this.loadedCharacters = {};
        this.hasUnsavedChanges = false;
        this.isGridRendered = false;
        this.init();
    }

    setupCoreMembers() {
        const sortedChars = [...characterRegistry].sort((a, b) => a.name.localeCompare(b.name));
        let options = `<option value="">-- Nessuno --</option>`;
        sortedChars.forEach(c => {
            options += `<option value="${c.id}">${c.name}</option>`;
        });

        document.querySelectorAll('.core-member-select').forEach(sel => {
            sel.innerHTML = options;
            sel.addEventListener('change', () => this.updateCrossLevel());
        });

        document.querySelectorAll('.core-member-level').forEach(inp => {
            inp.addEventListener('input', () => this.updateCrossLevel());
        });

        try {
            const saved = JSON.parse(localStorage.getItem('collection_core_members'));
            if (saved) {
                for(let i=1; i<=5; i++) {
                    if (saved[i]) {
                        const sel = document.querySelector(`.core-member-select[data-slot="${i}"]`);
                        const inp = document.querySelector(`.core-member-level[data-slot="${i}"]`);
                        if (sel) sel.value = saved[i].id || "";
                        if (inp) inp.value = saved[i].level || 300;
                    }
                }
            }
        } catch(e) {}

        this.updateCrossLevel();
    }

    updateCrossLevel() {
        let levels = [];
        for(let i=1; i<=5; i++) {
            const sel = document.querySelector(`.core-member-select[data-slot="${i}"]`);
            const inp = document.querySelector(`.core-member-level[data-slot="${i}"]`);

            if(sel && inp && sel.value !== "") {
                const val = parseInt(inp.value);
                if (!isNaN(val)) levels.push(val);
            }
        }

        const fallbackInput = document.getElementById('global-char-level');
        const fallbackLevel = fallbackInput ? (parseInt(fallbackInput.value) || 300) : 300;
        const crossLevel = levels.length > 0 ? Math.min(...levels) : fallbackLevel;

        const display = document.getElementById('display-cross-level');
        if(display) display.textContent = `Cross Level: ${crossLevel}`;

        const toSave = {};
        for(let i=1; i<=5; i++) {
            const sel = document.querySelector(`.core-member-select[data-slot="${i}"]`);
            const inp = document.querySelector(`.core-member-level[data-slot="${i}"]`);
            if(sel && inp) {
                toSave[i] = {
                    id: sel.value,
                    level: parseInt(inp.value) || 300
                };
            }
        }
        localStorage.setItem('collection_core_members', JSON.stringify(toSave));
    }

    getCharLevel(charId) {
        let specificLevel = null;
        let levels = [];

        for(let i=1; i<=5; i++) {
            const sel = document.querySelector(`.core-member-select[data-slot="${i}"]`);
            const inp = document.querySelector(`.core-member-level[data-slot="${i}"]`);

            if(sel && inp && sel.value !== "") {
                const lvl = parseInt(inp.value) || 300;
                levels.push(lvl);

                if(sel.value === charId || charId.includes(sel.value) || sel.value.includes(charId)) {
                    specificLevel = lvl;
                }
            }
        }

        if (specificLevel !== null) return specificLevel;
        if (levels.length > 0) return Math.min(...levels);

        const fallbackInput = document.getElementById('global-char-level');
        return fallbackInput ? (parseInt(fallbackInput.value) || 300) : 300;
    }

    setupEquipMatrix() {
        const rolesConfig = [
            { id: 'FW', name: 'FW', color: '#d32f2f' },
            { id: 'MF', name: 'MF', color: '#f57c00' },
            { id: 'DF', name: 'DF', color: '#1976d2' },
            { id: 'GK', name: 'GK', color: '#0097a7' }
        ];

        const categories = [
            { key: 'シューズ', label: '👟 Scarpe' },
            { key: 'ミサンガ', label: '📿 Bracciale' },
            { key: 'すね当て', label: '🛡️ Parastinchi' },
            { key: 'リストバンド', label: '💪 Polsino' },
            { key: 'グローブ', label: '🧤 Guanti/Accessorio' },
            { key: 'ペンダント', label: '🏅 Ciondolo' }
        ];

        let optionsHtml = `<option value="1">Lv 1</option>`;
        for (let i = 5; i <= 300; i += 5) {
            optionsHtml += `<option value="${i}">Lv ${i}</option>`;
        }

        const thead = document.getElementById('equip-matrix-head');
        const tbody = document.getElementById('equip-matrix-body');

        if (thead && tbody) {
            let headHtml = `<tr><th style="width: 8%;"></th>`;
            categories.forEach(c => {
                headHtml += `<th class="fw-bold" style="width: 15%;">${c.label}</th>`;
            });
            headHtml += `</tr>`;
            thead.innerHTML = headHtml;

            let html = '';
            rolesConfig.forEach(r => {
                html += `<tr>
                    <td class="fw-bold text-white shadow-sm" style="background-color: ${r.color}; font-size: 1.2rem; border-radius: 8px 0 0 8px;">
                        ${r.name}
                    </td>`;
                categories.forEach((c, index) => {
                    let radius = (index === categories.length - 1) ? '0 8px 8px 0' : '0';
                    html += `<td style="background-color: #212529; padding: 10px; border-radius: ${radius};">
                        <select class="form-select form-select-sm bg-dark text-white border-secondary equip-matrix-select mx-auto" style="font-size: 0.8rem; max-width: 90px; text-align: center;" data-role="${r.id}" data-cat="${c.key}">
                            ${optionsHtml}
                        </select>
                    </td>`;
                });
                html += `</tr>`;
            });
            tbody.innerHTML = html;
        }

        try {
            const savedMatrix = JSON.parse(localStorage.getItem('collection_equip_matrix'));
            if (savedMatrix) {
                document.querySelectorAll('.equip-matrix-select').forEach(sel => {
                    const r = sel.dataset.role;
                    const c = sel.dataset.cat;
                    if (savedMatrix[r] && savedMatrix[r][c]) {
                        sel.value = savedMatrix[r][c];
                    } else {
                        sel.value = "300";
                    }
                });
            } else {
                document.querySelectorAll('.equip-matrix-select').forEach(sel => sel.value = "300");
            }
        } catch(e) {
            document.querySelectorAll('.equip-matrix-select').forEach(sel => sel.value = "300");
        }
    }

    init() {
        document.getElementById('btn-login').addEventListener('click', () => this.auth.loginWithGoogle());
        document.getElementById('btn-logout').addEventListener('click', () => this.auth.logout());
        document.getElementById('btn-save-cloud').addEventListener('click', () => this.saveToCloud());

        this.setupCustomSelects();
        this.restoreFilters();

        this.setupEquipMatrix();
        this.setupCoreMembers();

        document.getElementById('search-name').addEventListener('input', () => this.triggerFilter());

        const btnApplyGlobal = document.getElementById('btn-apply-global');
        if (btnApplyGlobal) {
            btnApplyGlobal.addEventListener('click', () => {

                const charLevelVal = document.getElementById('global-char-level').value;
                if (charLevelVal) localStorage.setItem('collection_char_level', charLevelVal);

                const matrixObj = { FW: {}, MF: {}, DF: {}, GK: {} };
                document.querySelectorAll('.equip-matrix-select').forEach(sel => {
                    matrixObj[sel.dataset.role][sel.dataset.cat] = parseInt(sel.value) || 300;
                });
                localStorage.setItem('collection_equip_matrix', JSON.stringify(matrixObj));

                this.updateCrossLevel();

                document.querySelectorAll('.collection-item-wrapper').forEach(col => {
                    const charId = col.dataset.charId;

                    const charLevel = this.getCharLevel(charId);

                    col.querySelectorAll('.pass-lvl-basic').forEach(sel => {
                        const pDef = passivesLibrary.find(p => p.id === sel.dataset.passive);
                        if (pDef) {
                            let bestIdx = -1;
                            pDef.levels.forEach((lvl, idx) => {
                                const reqLv = getLevelTier(lvl.req);
                                if (reqLv !== -1 && charLevel >= reqLv) bestIdx = idx;
                            });
                            if (bestIdx !== -1) {
                                sel.value = bestIdx;
                                sel.dispatchEvent(new Event('change'));
                            }
                        }
                    });

                    const raritySel = col.querySelector('.char-rarity');
                    if (raritySel) {
                        const valRarity = parseInt(raritySel.value) || 0;
                        col.querySelectorAll('.pass-lvl-rarity').forEach(sel => {
                            const pDef = passivesLibrary.find(p => p.id === sel.dataset.passive);
                            if (pDef) {
                                let bestIdx = -1;
                                pDef.levels.forEach((lvl, idx) => {
                                    const reqR = getRarityTier(lvl.req);
                                    if (reqR !== -1 && valRarity >= reqR) bestIdx = idx;
                                });
                                if (bestIdx !== -1) {
                                    sel.value = bestIdx;
                                    sel.dispatchEvent(new Event('change'));
                                }
                            }
                        });
                    }

                    this.recalculateStats(charId);
                });

                this.hasUnsavedChanges = true;
            });
        }

        this.auth.setAuthStateListener((user) => this.handleAuthState(user));
        this.renderCollectionGrid();

        this.setupUnsavedTracking();
        this.setupNavigationInterception();
    }

    restoreFilters() {
        const saved = localStorage.getItem('collection_filters');
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

                setCustomSelect('filter-owned', filters.ownedStatus);
                setCustomSelect('filter-calc', filters.calcType);
                setCustomSelect('filter-element', filters.element);
                setCustomSelect('filter-position', filters.position);
                setCustomSelect('filter-rarity', filters.rarity);
                setCustomSelect('filter-style', filters.style);
                setCustomSelect('filter-team', filters.team);
                setCustomSelect('filter-season', filters.season);
            } catch (e) {}
        }
    }

    setupUnsavedTracking() {
        const grid = document.getElementById('collection-grid');
        grid.addEventListener('change', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.classList.contains('custom-select')) {
                this.hasUnsavedChanges = true;
            }
        });
        grid.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT') {
                this.hasUnsavedChanges = true;
            }
        });
    }

    setupNavigationInterception() {
        let pendingTargetUrl = null;
        const modal = document.getElementById('unsaved-modal');
        const btnSave = document.getElementById('btn-modal-save');
        const btnDiscard = document.getElementById('btn-modal-discard');
        const btnCancel = document.getElementById('btn-modal-cancel');

        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (this.hasUnsavedChanges && link.href && !link.href.includes('#') && link.target !== '_blank') {
                    e.preventDefault();
                    pendingTargetUrl = link.href;
                    modal.style.display = 'flex';
                }
            });
        });

        btnSave.addEventListener('click', async () => {
            const success = await this.saveToCloud();
            if (success && pendingTargetUrl) {
                window.location.href = pendingTargetUrl;
            }
        });

        btnDiscard.addEventListener('click', () => {
            this.hasUnsavedChanges = false;
            if (pendingTargetUrl) window.location.href = pendingTargetUrl;
        });

        btnCancel.addEventListener('click', () => {
            pendingTargetUrl = null;
            modal.style.display = 'none';
        });

        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    setupCustomSelects() {
        document.querySelectorAll('.filters-container .custom-select').forEach(customSelect => {
            initCustomSelect(customSelect);
            customSelect.addEventListener('change', () => this.triggerFilter());
        });
        setupGlobalSelectClose();
    }

    handleAuthState(user) {
        const loginBtn = document.getElementById('btn-login');
        const logoutBtn = document.getElementById('btn-logout');
        const saveBtn = document.getElementById('btn-save-cloud');
        const greeting = document.getElementById('user-greeting');

        if (user) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            saveBtn.style.display = 'inline-block';
            greeting.textContent = `Collezione di ${user.displayName}`;
            this.loadFromCloud();
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            saveBtn.style.display = 'none';
            greeting.textContent = "Accedi per salvare la tua collezione";
            this.collectionData = {};
            this.applySavedDataToUI(true);
        }
    }

    async loadFromCloud() {
        if (!this.auth.user) return;
        try {
            this.collectionData = await this.auth.getUserCollection();
            if (this.isGridRendered) {
                this.applySavedDataToUI();
            }
        } catch (error) {
            console.error("Errore nel caricamento dal cloud:", error);
        }
    }

    async renderCollectionGrid() {
        const grid = document.getElementById('collection-grid');
        grid.innerHTML = '';

        const promises = characterRegistry.map(async (char) => {
            try {
                const module = await import(`../Characters/${char.id}.js`);
                return { baseChar: char, fullData: module.charData };
            } catch (e) {
                console.error("Errore caricamento giocatore per collezione:", char.id);
                return null;
            }
        });

        const results = await Promise.all(promises);

        results.forEach(res => {
            if (res) {
                this.loadedCharacters[res.baseChar.id] = res.fullData;
                this.buildPlayerCard(grid, res.baseChar, res.fullData);
            }
        });

        this.isGridRendered = true;
        this.applySavedDataToUI();
    }

    async triggerFilter() {
        const currentFilters = {
            name: document.getElementById('search-name').value,
            element: document.getElementById('filter-element').dataset.value,
            position: document.getElementById('filter-position').dataset.value,
            rarity: document.getElementById('filter-rarity').dataset.value,
            style: document.getElementById('filter-style').dataset.value,
            team: document.getElementById('filter-team').dataset.value,
            season: document.getElementById('filter-season').dataset.value,
            ownedStatus: document.getElementById('filter-owned').dataset.value,
            calcType: document.getElementById('filter-calc') ? document.getElementById('filter-calc').dataset.value : 'All'
        };

        localStorage.setItem('collection_filters', JSON.stringify(currentFilters));

        const filteredArray = await filterCharacters(characterRegistry, currentFilters);
        const allowedIds = filteredArray.map(c => c.id);

        document.querySelectorAll('.collection-item-wrapper').forEach(card => {
            const charId = card.dataset.charId;
            const isOwned = card.querySelector('.collection-card').classList.contains('owned');

            const fullData = this.loadedCharacters[charId];
            const isAuto = !!(fullData && fullData.growth_pattern_code);

            let matchesFilter = allowedIds.includes(charId);
            let matchesOwned = true;
            let matchesCalc = true;

            if (currentFilters.ownedStatus === 'owned') matchesOwned = isOwned;
            if (currentFilters.ownedStatus === 'not-owned') matchesOwned = !isOwned;

            if (currentFilters.calcType === 'auto') matchesCalc = isAuto;
            if (currentFilters.calcType === 'manual') matchesCalc = !isAuto;

            if (matchesFilter && matchesOwned && matchesCalc) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    recalculateStats(charId) {
        const fullData = this.loadedCharacters[charId];
        if (!fullData || !fullData.growth_pattern_code) return;

        const raritySel = document.querySelector(`.char-rarity[data-char="${charId}"]`);
        if (!raritySel) return;

        const rarity = parseInt(raritySel.value) || 0;

        const charLevel = this.getCharLevel(charId);

        const equipMatrix = { FW: {}, MF: {}, DF: {}, GK: {} };
        document.querySelectorAll('.equip-matrix-select').forEach(sel => {
            equipMatrix[sel.dataset.role][sel.dataset.cat] = parseInt(sel.value) || 300;
        });

        const newStats = calcolaStatisticheEsatte(fullData, charLevel, rarity, equipMatrix);

        if (newStats) {
            const statMap = {
                "Tiro": "kick",
                "Tecnica": "technique",
                "Blocco": "block",
                "Parata": "catch",
                "Velocità": "speed",
                "TP": "tp"
            };

            for (const [itaStat, engKey] of Object.entries(statMap)) {
                const inp = document.querySelector(`.stat-input[data-char="${charId}"][data-stat="${itaStat}"]`);
                if (inp) {
                    inp.value = newStats[engKey];
                }
            }
        }
    }

    buildPlayerCard(container, baseChar, fullData) {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-xl-4 collection-item-wrapper';
        col.dataset.charId = baseChar.id;

        const tagsHtml = (fullData.tags || []).map(tagUrl => `<img src="${tagUrl}" class="tag-icon-small" alt="tag">`).join('');

        const statIcons = {
            "Tiro": "img/Status/Icon_Status_Kick.png",
            "Tecnica": "img/Status/Icon_Status_Technic.png",
            "Blocco": "img/Status/Icon_Status_Block.png",
            "Parata": "img/Status/Icon_Status_Catch.png",
            "Velocità": "img/Status/Icon_Status_Speed.png"
        };

        const hasAutoStats = !!fullData.growth_pattern_code;

        let manualOptionsCustomHtml = `<div data-value="" style="display:flex; align-items:center; padding: 6px 10px; color: #f8f9fa; cursor: pointer;" onmouseover="this.style.backgroundColor='#343a40'; this.style.color='#ffca28';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#f8f9fa';">-- Nessuna Tecnica Extra --</div>`;
        universalManualsKeys.forEach(mKey => {
            if (!fullData.myTechniques.includes(mKey)) {
                const tDef = techniquesLibrary[mKey];
                if (tDef) {
                    const sbBadge = tDef.shootBlock ? `<span class="badge bg-danger ms-1 px-1 py-0" style="font-size:0.6rem; flex-shrink:0;" title="Shoot Block">SB</span>` : '';
                    manualOptionsCustomHtml += `
                        <div data-value="${mKey}" style="display:flex; align-items:center; gap: 4px; padding: 6px 10px; color: #f8f9fa; border-bottom: 1px solid #444; cursor: pointer;" onmouseover="this.style.backgroundColor='#343a40'; this.style.color='#ffca28';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#f8f9fa';">
                            <img src="${tDef.icon}" style="width:16px; height:16px; object-fit: contain; flex-shrink:0;">
                            <img src="${tDef.elementIcon}" style="width:16px; height:16px; object-fit: contain; flex-shrink:0;">
                            <span class="text-truncate">${tDef.name}</span>${sbBadge}
                        </div>`;
                }
            }
        });

        const nativeTechsHtml = fullData.myTechniques.map(techKey => {
            const techDef = techniquesLibrary[techKey];
            const tName = techDef?.name || techKey;
            const typeIcon = techDef?.icon || '';
            const elIcon = techDef?.elementIcon || '';
            const sbBadge = techDef?.shootBlock ? `<span class="badge bg-danger ms-1 px-1 py-0" style="font-size:0.65rem; flex-shrink:0;" title="Shoot Block">SB</span>` : '';

            // QUI IL LIVELLO PARTE DA "0" (Lv 1) PER LE MOSSE NATIVE!
            return `
                <div class="d-flex gap-1 mb-2 align-items-center">
                    <div class="d-flex align-items-center gap-1" style="width: 70%;">
                        ${typeIcon ? `<img src="${typeIcon}" style="width:16px; height:16px; object-fit: contain; flex-shrink:0;">` : ''}
                        ${elIcon ? `<img src="${elIcon}" style="width:16px; height:16px; object-fit: contain; flex-shrink:0;">` : ''}
                        <span class="text-light small text-truncate" title="${tName}">${tName}</span>
                        ${sbBadge}
                    </div>
                    <select class="form-select form-select-sm bg-dark text-white border-secondary tech-lvl" data-char="${baseChar.id}" data-tech="${techKey}" style="width: 30%;">
                        ${[...Array(10)].map((_, i) => `<option value="${i}" ${i===0 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
                    </select>
                </div>
            `;
        }).join('');

        const role = extractPosition(fullData.position);
        const availableRerolls = rerollPassivesByRole[role] || [];
        let rerollOptions = `<option value="">-- Vuota --</option>`;
        availableRerolls.forEach(p => {
            rerollOptions += `<option value="${p.id}">${p.title}</option>`;
        });

        let rerollSlotsHtml = '';
        for (let i = 1; i <= 3; i++) {
            rerollSlotsHtml += `
                <div class="d-flex gap-1 mb-2 align-items-center">
                    <select class="form-select form-select-sm bg-dark text-white border-secondary reroll-id" data-char="${baseChar.id}" data-slot="${i}" style="width: 70%;">
                        ${rerollOptions}
                    </select>
                    <select class="form-select form-select-sm bg-dark text-white border-secondary reroll-lvl" data-char="${baseChar.id}" data-slot="${i}" style="width: 30%;" disabled>
                        <option value="0">Lv 1</option>
                    </select>
                </div>
            `;
        }

        let html = `
            <div class="collection-card owned" id="card-${baseChar.id}">
                
                <div class="toggle-container" style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 10px;">
                    <label class="form-check-label small fw-bold" for="toggle-${baseChar.id}">POSSEDUTO</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input toggle-owned" type="checkbox" id="toggle-${baseChar.id}" data-char-id="${baseChar.id}" checked>
                    </div>
                </div>

                <div class="d-flex align-items-start mb-3 border-bottom border-secondary pb-2">
                    <div class="position-relative me-3">
                        <img src="${baseChar.thumb}" class="char-thumb" alt="thumb">
                        <img src="${fullData.element}" class="position-absolute" style="width: 24px; bottom: -6px; right: -6px;">
                    </div>
                    <div style="flex-grow: 1;">
                        <strong style="color: #ffca28; font-size: 1.1rem;">${baseChar.name}</strong><br>
                        <img src="${fullData.position}" style="height: 18px; margin-top: 2px;">
                        <div class="d-flex flex-wrap gap-1 mt-2">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
                
                <div class="card-details">
                    <h6>Statistiche ${hasAutoStats ? '<span class="badge bg-success" style="font-size:0.6rem;">Calcolo Auto</span>' : '<span class="badge bg-warning text-dark" style="font-size:0.6rem;">Manuali</span>'}</h6>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${["Tiro", "Tecnica", "Blocco", "Parata", "Velocità"].map(stat => `
                            <div class="input-group input-group-sm" style="width: 48%;">
                                <span class="input-group-text bg-dark text-light border-secondary" style="font-size: 0.75rem; display: flex; align-items: center; gap: 4px;">
                                    <img src="${statIcons[stat]}" style="width: 14px; height: 14px; object-fit: contain;">${stat}
                                </span>
                                <input type="number" class="form-control bg-dark text-white border-secondary stat-input ${hasAutoStats ? 'auto-stat' : ''}" 
                                       data-char="${baseChar.id}" data-stat="${stat}" 
                                       placeholder="${fullData.stats && fullData.stats[stat] ? fullData.stats[stat].lv300 : 0}"
                                       ${hasAutoStats ? 'readonly style="background-color: #1a1a1a !important; cursor: not-allowed;" title="Gestito globalmente"' : ''}>
                            </div>
                        `).join('')}
                    </div>

                    <h6>Livello Mosse</h6>
                    ${nativeTechsHtml}
                    
                    <h6 class="text-warning mt-3"><i class="fas fa-book"></i> Insegna Tecnica (Shop)</h6>
                    <div class="d-flex gap-1 mb-3 align-items-center">
                        <div class="custom-select manual-equip" data-char="${baseChar.id}" data-value="" style="width: 70%;">
                            <div class="select-selected bg-dark border-secondary form-select-sm" style="height: 31px; display:flex; align-items:center; color: #ffca28; cursor:pointer;">
                                <span class="text-truncate" style="color: inherit;">-- Nessuna Tecnica Extra --</span>
                                <i class="fas fa-chevron-down" style="margin-left:auto;"></i>
                            </div>
                            <div class="select-items select-hide bg-dark border-secondary" style="font-size: 0.85rem; padding:0;">
                                ${manualOptionsCustomHtml}
                            </div>
                        </div>
                        <select class="form-select form-select-sm bg-dark text-white border-secondary tech-lvl manual-lvl" data-char="${baseChar.id}" data-tech="" style="width: 30%; display: none;">
                            ${[...Array(10)].map((_, i) => `<option value="${i}" ${i===0 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
                        </select>
                    </div>
                    
                    <h6 class="text-info mt-3 border-top border-secondary pt-2"><i class="fas fa-star"></i> Rarità Personaggio</h6>
                    <div class="mb-3">
                        <select class="form-select bg-dark text-info border-info char-rarity fw-bold" style="font-size: 1.05rem; padding-top: 8px; padding-bottom: 8px;" data-char="${baseChar.id}">
                            <option value="0">Normal Player</option>
                            <option value="1">Normal Player +</option>
                            <option value="2">Growing Player</option>
                            <option value="3">Growing Player +</option>
                            <option value="4">Advanced Player</option>
                            <option value="5">Advanced Player +</option>
                            <option value="6">Top Player</option>
                            <option value="7">Top Player +</option>
                            <option value="8">Legendary Player</option>
                            <option value="9">Legendary Player +</option>
                        </select>
                    </div>

                    <h6 class="mt-4 mb-2 text-info">Passive di Livello</h6>
                    ${(fullData.myBasicPassivesIds || []).map(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            if (!pDef) return '';
            let opts = `<option value="-1">Spenta</option>`;
            pDef.levels.forEach((lvlData, idx) => { opts += `<option value="${idx}">Lv ${idx + 1}</option>`; });
            return `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="text-light small text-truncate" style="width: 55%; color:#aaa;" title="${pDef.title}">${pDef.title}</span>
                                <select class="form-select form-select-sm bg-dark text-white border-secondary pass-lvl pass-lvl-basic" data-char="${baseChar.id}" data-passive="${pId}" style="width: 40%;">
                                    ${opts}
                                </select>
                            </div>
                        `;
        }).join('')}

                    <h6 class="mt-4 mb-2 text-info">Passive di Risveglio</h6>
                    ${(fullData.myRarityPassivesIds || []).map(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            if (!pDef) return '';
            let opts = `<option value="-1">Spenta</option>`;
            pDef.levels.forEach((lvlData, idx) => { opts += `<option value="${idx}">Lv ${idx + 1}</option>`; });
            return `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="text-light small text-truncate" style="width: 55%; color:#aaa;" title="${pDef.title}">${pDef.title}</span>
                                <select class="form-select form-select-sm bg-dark text-white border-secondary pass-lvl pass-lvl-rarity" data-char="${baseChar.id}" data-passive="${pId}" style="width: 40%;">
                                    ${opts}
                                </select>
                            </div>
                        `;
        }).join('')}

                    <h6 class="mt-4 mb-2 text-info">Passive di Reroll (Personalizzate)</h6>
                    ${rerollSlotsHtml}

                </div>
            </div>
        `;

        col.innerHTML = html;
        container.appendChild(col);

        const manualCustomSelect = col.querySelector('.manual-equip');
        initCustomSelect(manualCustomSelect, (selectedTech) => {
            const manualLvl = col.querySelector('.manual-lvl');
            if (selectedTech) {
                manualLvl.dataset.tech = selectedTech;
                manualLvl.style.display = 'block';
            } else {
                manualLvl.dataset.tech = '';
                manualLvl.style.display = 'none';
                manualLvl.value = '0';
            }
        });

        const rerollIdSelects = col.querySelectorAll('.reroll-id');
        rerollIdSelects.forEach(selectEl => {
            selectEl.addEventListener('change', (e) => {
                const slot = e.target.dataset.slot;
                const pId = e.target.value;
                const lvlSelect = col.querySelector(`.reroll-lvl[data-slot="${slot}"]`);

                if (!pId) {
                    lvlSelect.innerHTML = `<option value="0">Lv 1</option>`;
                    lvlSelect.disabled = true;
                    return;
                }

                const passiveDef = availableRerolls.find(p => p.id === pId);
                if (passiveDef) {
                    lvlSelect.innerHTML = passiveDef.levels.map((_, idx) => `<option value="${idx}">Lv ${idx+1}</option>`).join('');
                    lvlSelect.disabled = false;
                }
            });
        });

        const toggle = col.querySelector('.toggle-owned');
        const cardBox = col.querySelector('.collection-card');
        const charRarity = col.querySelector('.char-rarity');

        toggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                cardBox.classList.remove('unowned-card');
                cardBox.classList.add('owned');
            } else {
                cardBox.classList.add('unowned-card');
                cardBox.classList.remove('owned');
            }
        });

        charRarity.addEventListener('change', (e) => {
            const val = parseInt(e.target.value);

            col.querySelectorAll('.pass-lvl-rarity').forEach(sel => {
                const pDef = passivesLibrary.find(p => p.id === sel.dataset.passive);
                if (pDef && pDef.levels.some(l => l.req && getRarityTier(l.req) !== -1)) {
                    let bestIdx = -1;
                    pDef.levels.forEach((lvl, idx) => {
                        const reqR = getRarityTier(lvl.req);
                        if (reqR !== -1 && val >= reqR) bestIdx = idx;
                    });
                    sel.value = bestIdx;
                    sel.dispatchEvent(new Event('change'));
                }
            });

            if (hasAutoStats) {
                this.recalculateStats(baseChar.id);
            }
        });
    }

    extractDataFromUI() {
        const payload = {};
        document.querySelectorAll('.toggle-owned').forEach(toggle => {
            const charId = toggle.dataset.charId;
            const fullData = this.loadedCharacters[charId];

            const charData = {
                owned: toggle.checked,
                stats: {},
                techLevels: {},
                passives: {},
                rerollSlots: {},
                equippedManual: "",
                rarity: parseInt(document.querySelector(`.char-rarity[data-char="${charId}"]`).value) || 0
            };

            if (toggle.checked) {
                document.querySelectorAll(`.stat-input[data-char="${charId}"]`).forEach(inp => {
                    if(inp.value) charData.stats[inp.dataset.stat] = parseInt(inp.value);
                });

                document.querySelectorAll(`.tech-lvl[data-char="${charId}"]`).forEach(sel => {
                    if (sel.dataset.tech) {
                        charData.techLevels[sel.dataset.tech] = parseInt(sel.value);
                    }
                });

                document.querySelectorAll(`.pass-lvl[data-char="${charId}"]`).forEach(sel => {
                    charData.passives[sel.dataset.passive] = parseInt(sel.value);
                });

                document.querySelectorAll(`.reroll-id[data-char="${charId}"]`).forEach(sel => {
                    const slot = sel.dataset.slot;
                    const pId = sel.value;
                    const lvlSel = document.querySelector(`.reroll-lvl[data-char="${charId}"][data-slot="${slot}"]`);
                    if (pId && lvlSel && !lvlSel.disabled) {
                        charData.rerollSlots[slot] = { id: pId, lv: parseInt(lvlSel.value) };
                        charData.passives[pId] = parseInt(lvlSel.value);
                    }
                });

                const manualSelect = document.querySelector(`.manual-equip[data-char="${charId}"]`);
                if (manualSelect && manualSelect.dataset.value) {
                    charData.equippedManual = manualSelect.dataset.value;
                }
            }
            payload[charId] = charData;
        });
        return payload;
    }

    async saveToCloud() {
        if (!this.auth.user) {
            alert("Devi essere loggato per salvare!");
            return false;
        }

        const btn = document.getElementById('btn-save-cloud');
        const modal = document.getElementById('unsaved-modal');
        btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Salvataggio...`;
        btn.disabled = true;

        try {
            const dataToSave = this.extractDataFromUI();
            const userDocRef = window.dbDoc(window.firebaseDb, "collezione", this.auth.user.uid);

            await window.dbSet(userDocRef, { characters: dataToSave }, { merge: true });

            this.hasUnsavedChanges = false;
            modal.style.display = 'none';

            alert("Collezione salvata con successo nel Cloud!");
            return true;
        } catch (error) {
            console.error("Errore nel salvataggio:", error);
            alert("Errore durante il salvataggio: controlla la console.");
            return false;
        } finally {
            btn.innerHTML = `<i class="fas fa-cloud-upload-alt me-2"></i> Salva nel Cloud`;
            btn.disabled = false;
        }
    }

    applySavedDataToUI(resetToDefault = false) {
        document.querySelectorAll('.toggle-owned').forEach(toggle => {
            const charId = toggle.dataset.charId;
            const data = this.collectionData[charId];
            const fullData = this.loadedCharacters[charId];

            if (resetToDefault || !data) {
                toggle.checked = false;
            } else {
                toggle.checked = (data.owned !== false);
            }
            toggle.dispatchEvent(new Event('change'));

            if (!fullData || !fullData.growth_pattern_code) {
                document.querySelectorAll(`.stat-input[data-char="${charId}"]`).forEach(inp => inp.value = '');
            }

            // RIPORTA AL LV 1 (VALUE 0) ANCHE QUANDO RIPRISTINA IL DEFAULT
            document.querySelectorAll(`.tech-lvl[data-char="${charId}"]`).forEach(sel => sel.value = '0');

            document.querySelectorAll(`.reroll-id[data-char="${charId}"]`).forEach(sel => {
                sel.value = '';
                sel.dispatchEvent(new Event('change'));
            });

            const manualSel = document.querySelector(`.manual-equip[data-char="${charId}"]`);
            if(manualSel) {
                manualSel.dataset.value = '';
                manualSel.querySelector('.select-selected span').innerHTML = '-- Nessuna Tecnica Extra --';
                manualSel.dispatchEvent(new Event('change'));
            }

            document.querySelectorAll(`.pass-lvl[data-char="${charId}"]`).forEach(sel => {
                sel.value = sel.options[sel.options.length - 1].value;
            });

            const raritySel = document.querySelector(`.char-rarity[data-char="${charId}"]`);
            if (raritySel) raritySel.value = 0;

            if (data && data.owned) {
                if (data.rarity !== undefined && raritySel) {
                    raritySel.value = data.rarity;
                }

                if (data.equippedManual && manualSel) {
                    manualSel.dataset.value = data.equippedManual;
                    const option = manualSel.querySelector(`.select-items div[data-value="${data.equippedManual}"]`);
                    if (option) {
                        manualSel.querySelector('.select-selected span').innerHTML = option.innerHTML;
                    }
                    manualSel.dispatchEvent(new Event('change'));

                    setTimeout(() => {
                        const mLevel = document.querySelector(`.manual-lvl[data-char="${charId}"][data-tech="${data.equippedManual}"]`);
                        if (mLevel && data.techLevels && data.techLevels[data.equippedManual] !== undefined) mLevel.value = data.techLevels[data.equippedManual];
                    }, 50);
                }

                if (data.stats && (!fullData || !fullData.growth_pattern_code)) {
                    for (const [stat, val] of Object.entries(data.stats)) {
                        const inp = document.querySelector(`.stat-input[data-char="${charId}"][data-stat="${stat}"]`);
                        if (inp) inp.value = val;
                    }
                }

                if (data.techLevels) {
                    for (const [tech, val] of Object.entries(data.techLevels)) {
                        if (tech === data.equippedManual) continue;
                        const sel = document.querySelector(`.tech-lvl[data-char="${charId}"][data-tech="${tech}"]`);
                        if (sel) sel.value = val;
                    }
                }
                if (data.passives) {
                    for (const [passive, val] of Object.entries(data.passives)) {
                        const sel = document.querySelector(`.pass-lvl[data-char="${charId}"][data-passive="${passive}"]`);
                        if (sel) sel.value = val;
                    }
                }
                if (data.rerollSlots) {
                    for (const [slot, rData] of Object.entries(data.rerollSlots)) {
                        const idSel = document.querySelector(`.reroll-id[data-char="${charId}"][data-slot="${slot}"]`);
                        const lvlSel = document.querySelector(`.reroll-lvl[data-char="${charId}"][data-slot="${slot}"]`);
                        if (idSel && lvlSel) {
                            idSel.value = rData.id;
                            idSel.dispatchEvent(new Event('change'));
                            lvlSel.value = rData.lv;
                        }
                    }
                }
            }

            if (fullData && fullData.growth_pattern_code) {
                this.recalculateStats(charId);
            }
        });

        this.triggerFilter();

        setTimeout(() => {
            this.hasUnsavedChanges = false;
        }, 100);
    }
}

new CollectionApp();