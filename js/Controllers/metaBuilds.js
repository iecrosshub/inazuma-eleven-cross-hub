import { AuthManager } from '../Services/auth.js';
import { BuildManager } from '../Services/buildManager.js';
import { characterRegistry, rerollPassivesByRole, techniquesLibrary, universalManualsKeys, passivesLibrary } from '../Core/database.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';
import { parsePassiveText, extractPosition } from '../Core/parsers.js';

const ADMIN_UID = "avNoCAM4I5dyQL6zLY0phnt3fc92";
const MODERATOR_UIDS = ["alqyEbbyuxNjej3yTJQDNthmtf32", "Cu2zjcxpxIh2lddFrlDIc6YePgu1"];

class MetaBuildsController {
    constructor() {
        this.auth = new AuthManager();
        this.buildManager = new BuildManager();
        this.isAdmin = false;
        this.allBuilds = [];
        this.currentViewedCharId = null;

        const allRerollsUnfiltered = Object.values(rerollPassivesByRole).flat();
        this.availableRerolls = Array.from(new Map(allRerollsUnfiltered.map(p => [p.id, p])).values());

        setupGlobalSelectClose();
        this.init();
    }

    async init() {
        this.auth.setAuthStateListener((user) => {
            this.isAdmin = user && (user.uid === ADMIN_UID || MODERATOR_UIDS.includes(user.uid));
            if (this.isAdmin) {
                document.getElementById('btn-toggle-admin').style.display = 'block';
                this.setupAdminForm();
                this.bindAdminEvents();
            }
        });

        document.getElementById('btn-toggle-admin').addEventListener('click', () => {
            const panel = document.getElementById('admin-panel-container');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        await this.loadTierList();
    }

    // ==========================================
    // PARTE PUBBLICA: TIER LIST E MODALE
    // ==========================================
    async loadTierList() {
        document.getElementById('loading-spinner').style.display = 'block';
        document.getElementById('tier-list-container').style.display = 'none';

        // Pulisce i contenitori con ID sicuri
        ['S-plus', 'S', 'A', 'B', 'C'].forEach(t => {
            const el = document.getElementById(`tier-${t}`);
            if (el) el.innerHTML = '';
        });

        this.allBuilds = await this.buildManager.getAllBuilds();

        this.allBuilds.forEach(build => {
            const char = characterRegistry.find(c => c.id === build.characterId);
            if (!char) return;

            // FIX: Se nel database è salvato "S+" o "SS", lo sposta in modo sicuro in "S-plus"
            let tierId = build.tier || 'S';
            if (tierId === 'S+' || tierId === 'SS') tierId = 'S-plus';

            const tierContainer = document.getElementById(`tier-${tierId}`);
            if (tierContainer) {
                const iconHtml = `
                    <div class="char-icon-btn" data-charid="${char.id}" title="${char.name}">
                        <img src="${char.thumb}" alt="${char.name}">
                    </div>
                `;
                tierContainer.insertAdjacentHTML('beforeend', iconHtml);
            }
        });

        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('tier-list-container').style.display = 'block';

        document.querySelectorAll('.char-icon-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openViewModal(btn.dataset.charid));
        });
    }

    openViewModal(charId) {
        this.currentViewedCharId = charId;
        const char = characterRegistry.find(c => c.id === charId);
        const build = this.allBuilds.find(b => b.characterId === charId);
        if (!char || !build) return;

        document.getElementById('view-modal-name').textContent = char.name;
        document.getElementById('view-modal-thumb').src = char.thumb;
        document.getElementById('view-modal-general').textContent = build.generalDescription || "Nessuna descrizione generale.";
        document.getElementById('btn-go-to-char').href = `character.html?id=${char.id}`;

        const passivesContainer = document.getElementById('view-modal-passives');
        passivesContainer.innerHTML = '';
        if (build.passives && build.passives.length > 0) {
            build.passives.forEach((pData, idx) => {
                const pInfo = passivesLibrary.find(x => x.id === pData.id);
                if (pInfo) {
                    const maxLv = pInfo.levels[pInfo.levels.length - 1];
                    const effText = parsePassiveText(pInfo.template, maxLv);
                    const pName = pInfo.title || pInfo.name;

                    passivesContainer.innerHTML += `
                        <div class="p-3 rounded mb-2" style="background-color: #0b1a42; border: 1px solid #1269e8;">
                            <div class="d-flex align-items-center mb-2">
                                <span class="badge bg-info text-dark me-2">Slot ${idx + 1}</span>
                                <strong style="color: #fff; font-size: 1.1rem;">${pName}</strong>
                            </div>
                            <p class="mb-2" style="color: #0dcaf0; font-size: 0.9rem;">${effText}</p>
                            ${pData.desc ? `<p class="mb-0 pt-2 border-top border-secondary" style="color: #fff; font-size: 0.9rem;"><i class="fas fa-comment-dots text-warning me-1"></i> ${pData.desc}</p>` : ''}
                        </div>
                    `;
                }
            });
        } else {
            passivesContainer.innerHTML = `<p class="text-muted fw-bold">Nessuna passiva specificata.</p>`;
        }

        const moveContainer = document.getElementById('view-modal-move-container');
        if (build.extraMove && build.extraMove.id) {
            const tech = techniquesLibrary[build.extraMove.id];
            if (tech) {
                document.getElementById('view-modal-move').innerHTML = `
                    <div class="d-flex align-items-center mb-2">
                        <strong class="fs-5">${tech.name}</strong>
                    </div>
                    ${build.extraMove.desc ? `<div class="mt-2 text-dark">${build.extraMove.desc}</div>` : ''}
                `;
                moveContainer.style.display = 'block';
            }
        } else {
            moveContainer.style.display = 'none';
        }

        if (this.isAdmin) {
            document.getElementById('admin-modal-actions').style.display = 'flex';
        }

        const modal = new bootstrap.Modal(document.getElementById('buildModal'));
        modal.show();
    }

    // ==========================================
    // PARTE ADMIN: FORM E SALVATAGGIO
    // ==========================================
    setupAdminForm() {
        const charSelect = document.getElementById('build-character');
        const sortedChars = [...characterRegistry].filter(c => c && c.name).sort((a, b) => (a.name || "").localeCompare(b.name || ""));

        let charHtml = `
            <div class="select-selected"><span>Seleziona un Personaggio...</span> <i class="fas fa-chevron-down"></i></div>
            <div class="select-items select-hide">
                <div class="p-2 sticky-top bg-white border-bottom search-wrapper" style="z-index: 10;">
                    <input type="text" id="search-char-input" class="form-control form-control-sm" placeholder="🔍 Scrivi per cercare...">
                </div>
        `;
        sortedChars.forEach(c => {
            charHtml += `<div class="char-option" data-value="${c.id}" data-name="${c.name.toLowerCase()}"><img src="${c.thumb}" style="width: 25px; border-radius: 4px; margin-right: 8px;"> <span class="fw-bold text-dark">${c.name}</span></div>`;
        });
        charHtml += `</div>`;
        charSelect.innerHTML = charHtml;

        initCustomSelect(charSelect, (newCharId) => this.autoLoadAdminBuild(newCharId));

        const searchWrapper = charSelect.querySelector('.search-wrapper');
        if(searchWrapper) searchWrapper.addEventListener('click', e => e.stopPropagation());

        const searchInput = document.getElementById('search-char-input');
        if(searchInput) {
            searchInput.addEventListener('click', e => e.stopPropagation());
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                document.querySelectorAll('.char-option').forEach(opt => {
                    opt.style.display = opt.dataset.name.includes(term) ? 'flex' : 'none';
                });
            });
        }

        initCustomSelect(document.getElementById('build-tier'));

        const passivesContainer = document.getElementById('passives-container');
        passivesContainer.innerHTML = '';

        for (let i = 1; i <= 3; i++) {
            passivesContainer.innerHTML += `
                <div class="col-12 mb-4">
                    <div class="card border-secondary shadow reroll-slot-card" data-slot="${i}">
                        <div class="card-header d-flex align-items-center" style="background-color: #0b1a42;">
                            <span class="badge bg-info text-dark me-2">Slot ${i}</span>
                            <div class="custom-select flex-grow-1 m-0" id="build-passive-${i}" data-value="">
                                <div class="select-selected" style="background: #e4edf8; color: #102247; border-radius: 4px; padding: 6px 12px;"><span>-- Seleziona prima un pg --</span> <i class="fas fa-chevron-down"></i></div>
                                <div class="select-items select-hide"></div>
                            </div>
                        </div>
                        <div class="card-body" id="build-passive-details-${i}" style="display: none; background-color: #ffffff; border-bottom: 2px solid #1269e8;"></div>
                        <div class="card-body" style="background-color: #e4edf8; padding: 15px;">
                            <label class="fw-bold mb-1 text-primary small"><i class="fas fa-pen"></i> Spiegazione strategica</label>
                            <textarea id="build-passive-desc-${i}" class="form-control" rows="2" style="border: 1px solid #b0c4de; font-weight: bold; resize: none;"></textarea>
                        </div>
                    </div>
                </div>
            `;
        }

        const moveSelect = document.getElementById('build-move-select');
        let moveOptionsHtml = `<div data-value="">-- Nessuna Mossa Extra --</div>`;
        universalManualsKeys.forEach(key => {
            const tech = techniquesLibrary[key];
            if (tech) moveOptionsHtml += `<div data-value="${key}"><span class="fw-bold">${tech.name}</span></div>`;
        });
        moveSelect.innerHTML = `<div class="select-selected"><span>-- Seleziona Mossa --</span> <i class="fas fa-chevron-down"></i></div><div class="select-items select-hide">${moveOptionsHtml}</div>`;
        initCustomSelect(moveSelect);
    }

    updatePassiveDropdowns(charId) {
        const char = characterRegistry.find(c => c.id === charId);
        if (!char) return;

        const role = extractPosition(char.position);
        const rolePassives = rerollPassivesByRole[role] || [];
        rolePassives.sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || ""));

        let passivesListHtml = `<div data-value="">-- Nessuna Passiva --</div>`;
        rolePassives.forEach(p => {
            passivesListHtml += `<div data-value="${p.id}"><span class="fw-bold text-primary">${p.title || p.name}</span></div>`;
        });

        for (let i = 1; i <= 3; i++) {
            const selectEl = document.getElementById(`build-passive-${i}`);
            selectEl.querySelector('.select-items').innerHTML = passivesListHtml;
            selectEl.dataset.value = "";
            selectEl.querySelector('.select-selected span').innerHTML = `-- Equipaggia una passiva (${role}) --`;

            document.getElementById(`build-passive-details-${i}`).style.display = 'none';

            initCustomSelect(selectEl, (selectedId) => {
                this.renderPassiveGameDetails(i, selectedId);
            });
        }
    }

    renderPassiveGameDetails(slotIndex, passiveId) {
        const container = document.getElementById(`build-passive-details-${slotIndex}`);
        if (!passiveId) {
            container.style.display = 'none';
            return;
        }

        const p = this.availableRerolls.find(x => x.id === passiveId);
        if (p) {
            const effText = parsePassiveText(p.template, p.levels[p.levels.length - 1]);
            container.innerHTML = `<div class="p-2 rounded" style="background: #0b1a42; color: #0dcaf0; font-size: 0.95rem; font-weight: bold;">${effText}</div>`;
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    setCustomSelectValue(elId, val) {
        const el = document.getElementById(elId);
        if (!el) return;
        el.dataset.value = val;
        let targetOption = el.querySelector(`.select-items div[data-value="${val}"]`) || el.querySelector('.select-items div[data-value=""]') || el.querySelector('.select-items div');
        if (targetOption) el.querySelector('.select-selected span').innerHTML = targetOption.innerHTML;
    }

    async autoLoadAdminBuild(charId) {
        if (!charId) return;

        this.updatePassiveDropdowns(charId);

        document.getElementById('build-desc-general').value = "";
        this.setCustomSelectValue('build-tier', 'S');
        this.setCustomSelectValue('build-move-select', '');
        document.getElementById('build-move-desc').value = '';

        for (let i = 1; i <= 3; i++) {
            document.getElementById(`build-passive-desc-${i}`).value = '';
            document.getElementById(`build-passive-details-${i}`).style.display = 'none';
        }

        const build = await this.buildManager.getBuild(charId);
        if (build) {
            document.getElementById('build-desc-general').value = build.generalDescription || "";

            // MAPPA IN AUTOMATICO I VECCHI VALORI ERRATI IN "S-plus"
            let loadTier = build.tier || "S";
            if(loadTier === "SS" || loadTier === "S+") loadTier = "S-plus";
            this.setCustomSelectValue('build-tier', loadTier);

            for (let i = 0; i < 3; i++) {
                if (build.passives && build.passives[i]) {
                    this.setCustomSelectValue(`build-passive-${i+1}`, build.passives[i].id);
                    document.getElementById(`build-passive-desc-${i+1}`).value = build.passives[i].desc || "";
                    const selectEl = document.getElementById(`build-passive-${i+1}`);
                    selectEl.dispatchEvent(new Event('change'));
                }
            }
            if (build.extraMove) {
                this.setCustomSelectValue('build-move-select', build.extraMove.id || "");
                document.getElementById('build-move-desc').value = build.extraMove.desc || "";
            }
        }
    }

    bindAdminEvents() {
        document.getElementById('btn-delete-build').addEventListener('click', async () => {
            if (confirm("Sei sicuro di voler eliminare questa build dal database?")) {
                await this.buildManager.deleteBuild(this.currentViewedCharId);
                bootstrap.Modal.getInstance(document.getElementById('buildModal')).hide();
                await this.loadTierList();
                alert("Build eliminata.");
            }
        });

        document.getElementById('btn-edit-build').addEventListener('click', () => {
            bootstrap.Modal.getInstance(document.getElementById('buildModal')).hide();
            document.getElementById('admin-panel-container').style.display = 'block';
            this.setCustomSelectValue('build-character', this.currentViewedCharId);
            this.autoLoadAdminBuild(this.currentViewedCharId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('btn-save-build').addEventListener('click', async (e) => {
            const charId = document.getElementById('build-character').dataset.value;
            if (!charId) { alert("Devi prima selezionare un personaggio!"); return; }

            const btn = e.target;
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Salvataggio...`;

            const buildData = {
                authorId: this.auth.user.uid,
                tier: document.getElementById('build-tier').dataset.value,
                generalDescription: document.getElementById('build-desc-general').value.trim(),
                passives: [],
                extraMove: {
                    id: document.getElementById('build-move-select').dataset.value || "",
                    desc: document.getElementById('build-move-desc').value.trim()
                }
            };

            for (let i = 1; i <= 3; i++) {
                const pId = document.getElementById(`build-passive-${i}`).dataset.value;
                if (pId) {
                    buildData.passives.push({
                        id: pId,
                        desc: document.getElementById(`build-passive-desc-${i}`).value.trim()
                    });
                }
            }

            await this.buildManager.saveBuild(charId, buildData);
            await this.loadTierList();

            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-save me-2"></i> Pubblica/Aggiorna Build`;
            document.getElementById('admin-panel-container').style.display = 'none';
        });
    }
}

new MetaBuildsController();