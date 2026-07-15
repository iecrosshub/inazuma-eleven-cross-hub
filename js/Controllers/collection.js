// js/Controllers/collection.js

import { characterRegistry, techniquesLibrary, passivesLibrary, universalManualsKeys, rerollPassivesByRole } from '../Core/database.js';
import { getRarityTier, getLevelTier, extractPosition } from '../Core/parsers.js';
import { filterCharacters } from '../Core/roster.js';
import { AuthManager } from '../Services/auth.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

class CollectionApp {
    constructor() {
        this.auth = new AuthManager();
        this.collectionData = {};
        this.hasUnsavedChanges = false;
        this.init();
    }

    init() {
        document.getElementById('btn-login').addEventListener('click', () => this.auth.loginWithGoogle());
        document.getElementById('btn-logout').addEventListener('click', () => this.auth.logout());
        document.getElementById('btn-save-cloud').addEventListener('click', () => this.saveToCloud());

        this.setupCustomSelects();
        this.restoreFilters();

        const savedGlobalLevel = localStorage.getItem('collection_global_level') || '';
        const globalInput = document.getElementById('global-level-input');
        if (globalInput && savedGlobalLevel) globalInput.value = savedGlobalLevel;

        document.getElementById('search-name').addEventListener('input', () => this.triggerFilter());

        const btnLevel = document.getElementById('btn-apply-level');
        if (btnLevel) {
            btnLevel.addEventListener('click', () => {
                const inputVal = document.getElementById('global-level-input').value;
                if(!inputVal) return;

                const globalLevel = parseInt(inputVal);
                localStorage.setItem('collection_global_level', globalLevel);

                document.querySelectorAll('.pass-lvl-basic').forEach(sel => {
                    const pDef = passivesLibrary.find(p => p.id === sel.dataset.passive);
                    if (pDef) {
                        let bestIdx = -1;
                        let hasLevelReq = false;

                        pDef.levels.forEach((lvl, idx) => {
                            const reqLv = getLevelTier(lvl.req);
                            if (reqLv !== -1) {
                                hasLevelReq = true;
                                if (globalLevel >= reqLv) bestIdx = idx;
                            }
                        });

                        if (hasLevelReq) {
                            sel.value = bestIdx;
                            sel.dispatchEvent(new Event('change'));
                        }
                    }
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
            initCustomSelect(customSelect); // Usa il Componente Universale!
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

    async renderCollectionGrid() {
        const grid = document.getElementById('collection-grid');
        grid.innerHTML = '';

        for (const char of characterRegistry) {
            try {
                const module = await import(`../Characters/${char.id}.js`);
                const fullData = module.charData;
                this.buildPlayerCard(grid, char, fullData);
            } catch (e) {
                console.error("Errore caricamento giocatore per collezione:", char.id);
            }
        }
        this.applySavedDataToUI();
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

            return `
                <div class="d-flex gap-1 mb-2 align-items-center">
                    <div class="d-flex align-items-center gap-1" style="width: 70%;">
                        ${typeIcon ? `<img src="${typeIcon}" style="width:16px; height:16px; object-fit: contain; flex-shrink:0;">` : ''}
                        ${elIcon ? `<img src="${elIcon}" style="width:16px; height:16px; object-fit: contain; flex-shrink:0;">` : ''}
                        <span class="text-light small text-truncate" title="${tName}">${tName}</span>
                        ${sbBadge}
                    </div>
                    <select class="form-select form-select-sm bg-dark text-white border-secondary tech-lvl" data-char="${baseChar.id}" data-tech="${techKey}" style="width: 30%;">
                        ${[...Array(10)].map((_, i) => `<option value="${i}" ${i===9 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
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
                    <h6>Statistiche Nude</h6>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${["Tiro", "Tecnica", "Blocco", "Parata", "Velocità"].map(stat => `
                            <div class="input-group input-group-sm" style="width: 48%;">
                                <span class="input-group-text bg-dark text-light border-secondary" style="font-size: 0.75rem; display: flex; align-items: center; gap: 4px;">
                                    <img src="${statIcons[stat]}" style="width: 14px; height: 14px; object-fit: contain;">${stat}
                                </span>
                                <input type="number" class="form-control bg-dark text-white border-secondary stat-input" 
                                       data-char="${baseChar.id}" data-stat="${stat}" placeholder="${fullData.stats[stat]?.lv300 || 0}">
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
                            ${[...Array(10)].map((_, i) => `<option value="${i}" ${i===9 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
                        </select>
                    </div>
                    
                    <h6 class="text-info mt-3 border-top border-secondary pt-2"><i class="fas fa-star"></i> Rarità Personaggio</h6>
                    <div class="mb-3">
                        <select class="form-select form-select-sm bg-dark text-info border-secondary char-rarity" data-char="${baseChar.id}">
                            <option value="0">Inferiore Advanced Player</option>
                            <option value="1">Advanced Player</option>
                            <option value="2">Advanced Player +</option>
                            <option value="3">Top Player</option>
                            <option value="4">Top Player +</option>
                            <option value="5">Legendary Player</option>
                            <option value="6">Legendary Player +</option>
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

        // Usa il componente UI customSelect!
        const manualCustomSelect = col.querySelector('.manual-equip');
        initCustomSelect(manualCustomSelect, (selectedTech) => {
            const manualLvl = col.querySelector('.manual-lvl');
            if (selectedTech) {
                manualLvl.dataset.tech = selectedTech;
                manualLvl.style.display = 'block';
            } else {
                manualLvl.dataset.tech = '';
                manualLvl.style.display = 'none';
                manualLvl.value = '9';
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
        });
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
            ownedStatus: document.getElementById('filter-owned').dataset.value
        };

        localStorage.setItem('collection_filters', JSON.stringify(currentFilters));

        const filteredArray = await filterCharacters(characterRegistry, currentFilters);
        const allowedIds = filteredArray.map(c => c.id);

        document.querySelectorAll('.collection-item-wrapper').forEach(card => {
            const isOwned = card.querySelector('.collection-card').classList.contains('owned');

            let matchesFilter = allowedIds.includes(card.dataset.charId);
            let matchesOwned = true;

            if (currentFilters.ownedStatus === 'owned') matchesOwned = isOwned;
            if (currentFilters.ownedStatus === 'not-owned') matchesOwned = !isOwned;

            if (matchesFilter && matchesOwned) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    extractDataFromUI() {
        const payload = {};
        document.querySelectorAll('.toggle-owned').forEach(toggle => {
            const charId = toggle.dataset.charId;
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

    async loadFromCloud() {
        if (!this.auth.user) return;
        try {
            const userDocRef = window.dbDoc(window.firebaseDb, "collezione", this.auth.user.uid);
            const docSnap = await window.dbGet(userDocRef);

            if (docSnap.exists()) {
                this.collectionData = docSnap.data().characters || {};
                this.applySavedDataToUI();
            } else {
                console.log("Nessun salvataggio trovato.");
            }
        } catch (error) {
            console.error("Errore nel caricamento dal cloud:", error);
        }
    }

    applySavedDataToUI(resetToDefault = false) {
        document.querySelectorAll('.toggle-owned').forEach(toggle => {
            const charId = toggle.dataset.charId;
            const data = this.collectionData[charId];

            if (resetToDefault || !data) {
                toggle.checked = false;
            } else {
                toggle.checked = (data.owned !== false);
            }
            toggle.dispatchEvent(new Event('change'));

            document.querySelectorAll(`.stat-input[data-char="${charId}"]`).forEach(inp => inp.value = '');
            document.querySelectorAll(`.tech-lvl[data-char="${charId}"]`).forEach(sel => sel.value = '9');

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

                if (data.stats) {
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
        });

        this.triggerFilter();

        setTimeout(() => {
            this.hasUnsavedChanges = false;
        }, 100);
    }
}

new CollectionApp();