// js/collection.js
import {
    characterRegistry,
    techniquesLibrary,
    passivesLibrary,
    filterCharacters,
    universalManualsKeys // Importiamo l'array da utils!
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

        const tagsHtml = (fullData.tags || []).map(tagUrl =>
            `<img src="${tagUrl}" class="tag-icon-small" alt="tag">`
        ).join('');

        let manualOptionsHtml = `<option value="">-- Nessuna Tecnica Extra --</option>`;
        universalManualsKeys.forEach(mKey => {
            if (!fullData.myTechniques.includes(mKey)) {
                manualOptionsHtml += `<option value="${mKey}">📕 ${techniquesLibrary[mKey].name}</option>`;
            }
        });

        let html = `
            <div class="toggle-container">
                <label class="form-check-label small" for="toggle-${baseChar.id}">Posseduto</label>
                <div class="form-check form-switch">
                    <input class="form-check-input toggle-owned" type="checkbox" id="toggle-${baseChar.id}" data-char-id="${baseChar.id}" checked>
                </div>
            </div>

            <div class="collection-card owned" id="card-${baseChar.id}">
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
                    
                    <h6>Livello Passive</h6>
                    ${[...(fullData.myBasicPassivesIds || []), ...(fullData.myRarityPassivesIds || [])].map(pId => {
            const pDef = passivesLibrary.find(p => p.id === pId);
            if (!pDef) return '';
            return `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="text-light small text-truncate" style="width: 65%;" title="${pDef.title}">${pDef.title}</span>
                                <select class="form-select form-select-sm bg-dark text-white border-secondary pass-lvl" data-char="${baseChar.id}" data-passive="${pId}" style="width: 30%;">
                                    <option value="-1">Spenta</option>
                                    ${pDef.levels.map((_, i) => `<option value="${i}" ${i===pDef.levels.length-1 ? 'selected':''}>Lv ${i+1}</option>`).join('')}
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

        // Logica attivazione carta
        toggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                cardBox.classList.remove('unowned-card');
                cardBox.classList.add('owned');
            } else {
                cardBox.classList.add('unowned-card');
                cardBox.classList.remove('owned');
            }
        });

        // Logica per mostrare/nascondere Livello e Potenza del Manuale
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
            season: document.getElementById('filter-season').dataset.value
        };

        const filteredArray = await filterCharacters(characterRegistry, currentFilters);
        const allowedIds = filteredArray.map(c => c.id);

        document.querySelectorAll('.collection-item-wrapper').forEach(card => {
            if (allowedIds.includes(card.dataset.charId)) {
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
                equippedManual: ""
            };

            if (toggle.checked) {
                document.querySelectorAll(`.stat-input[data-char="${charId}"]`).forEach(inp => {
                    if(inp.value) charData.stats[inp.dataset.stat] = parseInt(inp.value);
                });
                // Salviamo le tecniche. Il manuale è incluso in automatico perché ha la classe tech-lvl e dataset aggiornato!
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

            if (resetToDefault || !data || data.owned !== false) {
                toggle.checked = true;
            } else {
                toggle.checked = false;
            }
            toggle.dispatchEvent(new Event('change'));

            // Svuotamento preventivo inputs
            document.querySelectorAll(`.stat-input[data-char="${charId}"]`).forEach(inp => inp.value = '');
            document.querySelectorAll(`.tech-pwr[data-char="${charId}"]`).forEach(inp => inp.value = '');
            document.querySelectorAll(`.tech-lvl[data-char="${charId}"]`).forEach(sel => sel.value = '9');

            const manualSel = document.querySelector(`.manual-equip[data-char="${charId}"]`);
            if(manualSel) {
                manualSel.value = '';
                manualSel.dispatchEvent(new Event('change')); // Nasconde gli input del manuale e pulisce i dataset
            }

            document.querySelectorAll(`.pass-lvl[data-char="${charId}"]`).forEach(sel => {
                sel.value = sel.options[sel.options.length - 1].value;
            });

            if (data && data.owned) {
                // IMPORTANTISSIMO: Caricare PRIMA il manuale, così attiva i campi nascosti e assegna il data-tech corretto!
                if (data.equippedManual && manualSel) {
                    manualSel.value = data.equippedManual;
                    manualSel.dispatchEvent(new Event('change'));
                }

                if (data.stats) {
                    for (const [stat, val] of Object.entries(data.stats)) {
                        const inp = document.querySelector(`.stat-input[data-char="${charId}"][data-stat="${stat}"]`);
                        if (inp) inp.value = val;
                    }
                }
                if (data.techLevels) {
                    for (const [tech, val] of Object.entries(data.techLevels)) {
                        const sel = document.querySelector(`.tech-lvl[data-char="${charId}"][data-tech="${tech}"]`);
                        if (sel) sel.value = val;
                    }
                }
                if (data.techCustomPower) {
                    for (const [tech, val] of Object.entries(data.techCustomPower)) {
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