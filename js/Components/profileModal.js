// js/Components/profileModal.js

import { characterRegistry } from '../Core/database.js';

export async function showProfileSetupModal(user, authManager) {
    // Evitiamo di duplicare il modale se esiste già
    if (document.getElementById('profile-setup-modal')) return;

    // Recuperiamo la collezione dal Cloud per la scelta dell'avatar
    const myCollection = await authManager.getUserCollection();
    const ownedCharIds = Object.keys(myCollection).filter(id => myCollection[id].owned);

    let avatarOptionsHtml = '';

    // Se ha sbloccato personaggi, generiamo la griglia con le loro miniature
    if (ownedCharIds.length > 0) {
        const ownedChars = characterRegistry.filter(c => ownedCharIds.includes(c.id));
        ownedChars.forEach((c, index) => {
            const isSelected = index === 0 ? 'border-success border-3' : 'border-secondary';
            avatarOptionsHtml += `
                <img src="${c.thumb}" 
                     class="avatar-option rounded cursor-pointer border ${isSelected} m-1 shadow-sm" 
                     style="width: 65px; height: 65px; object-fit: cover; cursor: pointer; transition: 0.2s;" 
                     data-id="${c.id}" 
                     alt="${c.name}"
                     title="${c.name}">
            `;
        });
    } else {
        // Il "compromesso": Nessun personaggio posseduto -> Avatar standard
        avatarOptionsHtml = `
            <div class="text-center text-secondary w-100 mt-3 mb-2">
                <i class="fas fa-user-circle fa-3x mb-2 text-info"></i>
                <p class="small">Nessun personaggio sbloccato.<br>Registra la tua collezione per usare i volti dei giocatori!</p>
            </div>
        `;
    }

    // Iniezione dinamica della UI (Stile Inazuma: Colori scuri, Giallo e Blu)
    const modalHtml = `
        <div id="profile-setup-modal" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(11, 26, 66, 0.9); z-index: 9999; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(8px);">
            <div class="card bg-dark text-white shadow-lg" style="width: 90%; max-width: 500px; border: 2px solid #ffca28; border-radius: 12px;">
                <div class="card-header border-bottom border-secondary text-center py-3" style="background: linear-gradient(180deg, #1a3673 0%, #0b1a42 100%); border-radius: 10px 10px 0 0;">
                    <h4 class="mb-0 text-warning fw-bold"><i class="fas fa-id-badge me-2"></i>Crea il tuo Profilo</h4>
                </div>
                <div class="card-body p-4">
                    <p class="small text-info text-center mb-4">Benvenuto! Per partecipare alla community e salire di Rarità, compila la tua scheda giocatore.</p>
                    
                    <div class="mb-3">
                        <label class="form-label fw-bold text-light">Nickname</label>
                        <input type="text" id="setup-nickname" class="form-control bg-dark text-white border-secondary" placeholder="Es. AxelBlaze99" maxlength="15" required>
                    </div>

                    <div class="row mb-3">
                        <div class="col-6">
                            <label class="form-label fw-bold text-light">Ruolo</label>
                            <select id="setup-role" class="form-select bg-dark text-white border-secondary">
                                <option value="FW">Attaccante (FW)</option>
                                <option value="MF">Centrocampista (MF)</option>
                                <option value="DF">Difensore (DF)</option>
                                <option value="GK">Portiere (GK)</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-bold text-light">Elemento</label>
                            <select id="setup-element" class="form-select bg-dark text-white border-secondary">
                                <option value="Fuoco">🔥 Fuoco</option>
                                <option value="Vento">🌪️ Vento</option>
                                <option value="Albero">🌳 Albero</option>
                                <option value="Montagna">⛰️ Montagna</option>
                                <option value="Nulla">✨ Nulla</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold text-light">Scegli il tuo Avatar</label>
                        <div class="p-2 border border-secondary rounded bg-dark d-flex flex-wrap justify-content-center" style="max-height: 180px; overflow-y: auto; background-color: #121212 !important;" id="avatar-container">
                            ${avatarOptionsHtml}
                        </div>
                    </div>

                    <button id="btn-save-profile" class="btn btn-primary w-100 fw-bold py-2 shadow" style="font-size: 1.1rem; background-color: #0d6efd; border-color: #0d6efd;">
                        Entra in Campo! <i class="fas fa-futbol ms-2"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    let selectedAvatarId = ownedCharIds.length > 0 ? ownedCharIds[0] : "default";

    // Evidenziatore grafico per la selezione dell'avatar
    document.querySelectorAll('.avatar-option').forEach(img => {
        img.addEventListener('click', (e) => {
            document.querySelectorAll('.avatar-option').forEach(el => {
                el.classList.remove('border-success', 'border-3');
                el.classList.add('border-secondary');
            });
            e.target.classList.remove('border-secondary');
            e.target.classList.add('border-success', 'border-3');
            selectedAvatarId = e.target.dataset.id;
        });
    });

    // Avvio del salvataggio dei dati su Firebase
    document.getElementById('btn-save-profile').addEventListener('click', async () => {
        const nickname = document.getElementById('setup-nickname').value.trim();
        const role = document.getElementById('setup-role').value;
        const element = document.getElementById('setup-element').value;

        if (nickname.length < 3) {
            alert("Il Nickname deve avere almeno 3 caratteri!");
            return;
        }

        const btn = document.getElementById('btn-save-profile');
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Registrazione...`;

        try {
            const profileRef = window.dbDoc(window.firebaseDb, "users", user.uid);

            // Inizializzazione della Scheda Giocatore (Onboarding)
            await window.dbSet(profileRef, {
                nickname: nickname,
                role: role,
                element: element,
                selectedAvatarId: selectedAvatarId,
                totalExp: 0,
                consecutiveDays: 1,
                totalTimeSpent: 0,
                rarity: "Normal Player",
                lastLoginDate: new Date().toDateString()
            });

            // Distruzione del Modale
            document.getElementById('profile-setup-modal').remove();

            // Forza authManager ad assorbire i nuovi dati
            await authManager.loadUserProfile();

            // Ricarica la pagina: così l'utente vede subito la Bacheca / Collezione sbloccata
            window.location.reload();

        } catch (error) {
            console.error("Errore salvataggio profilo:", error);
            alert("Si è verificato un errore durante la registrazione. Riprova.");
            btn.disabled = false;
            btn.innerHTML = `Entra in Campo! <i class="fas fa-futbol ms-2"></i>`;
        }
    });
}