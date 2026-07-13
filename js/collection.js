// js/collection.js
import {
    characterRegistry,
    techniquesLibrary,
    passivesLibrary,
    filterCharacters,
    universalManualsKeys,
    getRarityTier,
    getLevelTier
} from './utils.js';
import { AuthManager } from './auth.js';

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
        document.getElementById('search-name').addEventListener('input', () => this.triggerFilter());

        // LOGICA APPLICA LIVELLO GLOBALE (Aggiorna SOLO le passive legate al livello)
        const btnLevel = document.getElementById('btn-apply-level');
        if (btnLevel) {
            btnLevel.addEventListener('click', () => {
                const globalLevel = parseInt(document.getElementById('global-level-input').value) || 1;

                document.querySelectorAll('.pass-lvl').forEach(sel => {
                    const pDef = passivesLibrary.find(p => p.id === sel.dataset.passive);
                    if (pDef) {
                        const isRarity = pDef.levels.some(l => l.req && getRarityTier(l.req) !== -1);

                        // Solo per le passive che NON sono di rarità (e quindi dipendono dal livello)
                        if (!isRarity) {
                            let bestIdx = -1;
                            let hasLevelReq = false;

                            pDef.levels.forEach((lvl, idx) => {
                                const reqLv = getLevelTier(lvl.req);
                                if (reqLv !== -1) {
                                    hasLevelReq = true;
                                    if (globalLevel >= reqLv) bestIdx = idx;
                                }
                            });

                            // Applica l'aggiornamento solo se la passiva ha effettivamente dei requisiti di livello numerici
                            if (hasLevelReq) {
                                sel.value = bestIdx; // Può assegnare -1 (Spenta) se il lvl globale non è sufficiente
                                sel.dispatchEvent(new Event('change'));
                            }
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

    setupUnsavedTracking() {
        const grid = document.getElementById('collection-grid');
        grid.addEventListener('change', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
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
        document.querySelectorAll('.custom-select').forEach(customSelect => {
            const selectedDiv = customSelect.querySelector('.select-selected');
            const itemsDiv = customSelect.querySelector('.select-items');

            selectedDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                itemsDiv.classList.toggle('select-hide');
            });

            itemsDiv.querySelectorAll('div').forEach(option => {
                option.addEventListener('click', () => {
                    customSelect.dataset.value = option.dataset.value;
                    selectedDiv.querySelector('span').innerHTML = option.innerHTML;
                    itemsDiv.classList.add('select-hide');
                    this.triggerFilter();
                });
            });
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.select-items').forEach(el => el.classList.add('select-hide'));
        });
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
                const module = await import(`./Characters/${char.id}.js`);
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

        let manualOptionsHtml = `<option value="">-- Nessuna Tecnica Extra --</option>`;
        universalManualsKeys.forEach(mKey => {
            if (!fullData.myTechniques.includes(mKey)) {
                manualOptionsHtml += `<option value="${mKey}">📕 ${techniquesLibrary[mKey].name}</option>`;
            }
        });

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
                                <span class="input-group-text bg-dark text-light border-secondary" style="font-size: 0.75rem;">${stat}</span>
                                <input type="number" class="form-control bg-dark text-white border-secondary stat-input" 
                                       data-char="${baseChar.id}" data-stat="${stat}" placeholder="${fullData.stats[stat]?.lv300 || 0}">
                            </div>
                        `).join('')}
                    </div>

                    <h6>Livello Mosse</h6>
                    ${fullData.myTechniques.map(techKey => {
            const tName = techniquesLibrary[techKey]?.name || techKey;
            return `
                            <div class="d-flex gap-1 mb-2">
                                <span class="text-light small text-truncate" style="width: 50%;" title="${tName}">${tName}</span>
                                <select class="form-select form-select-sm bg-dark text-white border-secondary tech-lvl" data-char="${baseChar.id}" data-tech="${techKey}" style="width: 25%;">
                                    ${[...Array(10)].map((_, i) => `<option value="${i}" ${i===9 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
                                </select>
                                <input type="number" class="form-control form-control-sm bg-dark text-white border-secondary tech-pwr" data-char="${baseChar.id}" data-tech="${techKey}" placeholder="+Pwr" style="width: 25%;">
                            </div>
                        `;
        }).join('')}
                    
                    <h6 class="text-warning mt-3"><i class="fas fa-book"></i> Insegna Tecnica (Shop)</h6>
                    <div class="d-flex gap-1 mb-3">
                        <select class="form-select form-select-sm bg-dark text-warning border-secondary manual-equip" data-char="${baseChar.id}" style="width: 50%;">
                            ${manualOptionsHtml}
                        </select>
                        <select class="form-select form-select-sm bg-dark text-white border-secondary tech-lvl manual-lvl" data-char="${baseChar.id}" data-tech="" style="width: 25%; display: none;">
                            ${[...Array(10)].map((_, i) => `<option value="${i}" ${i===9 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
                        </select>
                        <input type="number" class="form-control form-control-sm bg-dark text-white border-secondary tech-pwr manual-pwr" data-char="${baseChar.id}" data-tech="" placeholder="+Pwr" style="width: 25%; display: none;">
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

                    <h6>Livello Passive</h6>
                    ${[...(fullData.myBasicPassivesIds || []), ...(fullData.myRarityPassivesIds || [])].map(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            if (!pDef) return '';

            let opts = `<option value="-1">Spenta</option>`;
            pDef.levels.forEach((lvlData, idx) => {
                // MOSTRA SOLO E SEMPRE LV 1, LV 2, ECC... (Come richiesto)
                opts += `<option value="${idx}">Lv ${idx + 1}</option>`;
            });

            return `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="text-light small text-truncate" style="width: 55%;" title="${pDef.title}">${pDef.title}</span>
                                <select class="form-select form-select-sm bg-dark text-white border-secondary pass-lvl" data-char="${baseChar.id}" data-passive="${pId}" style="width: 40%;">
                                    ${opts}
                                </select>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;

        col.innerHTML = html;
        container.appendChild(col);

        const toggle = col.querySelector('.toggle-owned');
        const cardBox = col.querySelector('.collection-card');
        const manualEquip = col.querySelector('.manual-equip');
        const manualLvl = col.querySelector('.manual-lvl');
        const manualPwr = col.querySelector('.manual-pwr');
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

        // AUTO-AGGIORNAMENTO PASSIVE IN BASE ALLA RARITÀ
        charRarity.addEventListener('change', (e) => {
            const val = parseInt(e.target.value);
            col.querySelectorAll('.pass-lvl').forEach(sel => {
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

        manualEquip.addEventListener('change', (e) => {
            const selectedTech = e.target.value;
            if (selectedTech) {
                manualLvl.dataset.tech = selectedTech;
                manualPwr.dataset.tech = selectedTech;
                manualLvl.style.display = 'block';
                manualPwr.style.display = 'block';
            } else {
                manualLvl.dataset.tech = '';
                manualPwr.dataset.tech = '';
                manualLvl.style.display = 'none';
                manualPwr.style.display = 'none';
                manualLvl.value = '9';
                manualPwr.value = '';
            }
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
                techCustomPower: {},
                passives: {},
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
                document.querySelectorAll(`.tech-pwr[data-char="${charId}"]`).forEach(inp => {
                    if (inp.dataset.tech && inp.value) {
                        charData.techCustomPower[inp.dataset.tech] = parseInt(inp.value);
                    }
                });
                document.querySelectorAll(`.pass-lvl[data-char="${charId}"]`).forEach(sel => {
                    charData.passives[sel.dataset.passive] = parseInt(sel.value);
                });

                const manualSelect = document.querySelector(`.manual-equip[data-char="${charId}"]`);
                if (manualSelect && manualSelect.value) {
                    charData.equippedManual = manualSelect.value;
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
            document.querySelectorAll(`.tech-pwr[data-char="${charId}"]`).forEach(inp => inp.value = '');
            document.querySelectorAll(`.tech-lvl[data-char="${charId}"]`).forEach(sel => sel.value = '9');

            const manualSel = document.querySelector(`.manual-equip[data-char="${charId}"]`);
            if(manualSel) {
                manualSel.value = '';
                manualSel.dispatchEvent(new Event('change'));
            }

            document.querySelectorAll(`.pass-lvl[data-char="${charId}"]`).forEach(sel => {
                sel.value = sel.options[sel.options.length - 1].value; // Inizialmente Max Level
            });

            const raritySel = document.querySelector(`.char-rarity[data-char="${charId}"]`);
            if (raritySel) raritySel.value = 0; // Default

            if (data && data.owned) {
                if (data.rarity !== undefined && raritySel) {
                    raritySel.value = data.rarity;
                }

                if (data.equippedManual && manualSel) {
                    manualSel.value = data.equippedManual;
                    manualSel.dispatchEvent(new Event('change'));

                    setTimeout(() => {
                        const mLevel = document.querySelector(`.manual-lvl[data-char="${charId}"][data-tech="${data.equippedManual}"]`);
                        const mPower = document.querySelector(`.manual-pwr[data-char="${charId}"][data-tech="${data.equippedManual}"]`);

                        if (mLevel && data.techLevels[data.equippedManual] !== undefined) mLevel.value = data.techLevels[data.equippedManual];
                        if (mPower && data.techCustomPower[data.equippedManual] !== undefined) mPower.value = data.techCustomPower[data.equippedManual];
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
                if (data.techCustomPower) {
                    for (const [tech, val] of Object.entries(data.techCustomPower)) {
                        if (tech === data.equippedManual) continue;
                        const inp = document.querySelector(`.tech-pwr[data-char="${charId}"][data-tech="${tech}"]`);
                        if (inp) inp.value = val > 0 ? val : '';
                    }
                }
                if (data.passives) {
                    for (const [passive, val] of Object.entries(data.passives)) {
                        const sel = document.querySelector(`.pass-lvl[data-char="${charId}"][data-passive="${passive}"]`);
                        if (sel) sel.value = val;
                    }
                }
            }
        });

        this.hasUnsavedChanges = false;
    }
}

new CollectionApp();