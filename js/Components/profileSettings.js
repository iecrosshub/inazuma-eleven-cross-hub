import { characterRegistry } from '../Core/database.js';

export async function showProfileEditModal(user, authManager) {
    if (document.getElementById('profile-edit-modal')) return;

    // 1. Inietta dinamicamente il nuovo CSS del Profilo se non esiste
    if (!document.getElementById('profile-css')) {
        const link = document.createElement('link');
        link.id = 'profile-css';
        link.rel = 'stylesheet';
        link.href = 'css/styleProfile.css';
        document.head.appendChild(link);
    }

    const profile = authManager.getCurrentProfile();
    if (!profile) return;

    const myCollection = await authManager.getUserCollection();
    const ownedCharIds = Object.keys(myCollection).filter(id => myCollection[id].owned);

    let avatarOptionsHtml = '';

    if (ownedCharIds.length > 0) {
        const ownedChars = characterRegistry.filter(c => ownedCharIds.includes(c.id));
        ownedChars.forEach(c => {
            const isSelected = profile.selectedAvatarId === c.id ? 'selected' : '';
            avatarOptionsHtml += `
                <img src="${c.thumb}" 
                     class="profile-icon avatar-option-edit ${isSelected}" 
                     style="width: 65px; height: 65px; object-fit: cover;" 
                     data-id="${c.id}" 
                     alt="${c.name}"
                     title="${c.name}">
            `;
        });
    } else {
        avatarOptionsHtml = `
            <div class="text-center text-secondary w-100 mt-3 mb-2">
                <i class="fas fa-user-circle fa-3x mb-2 text-info"></i>
                <p class="small">Nessun personaggio sbloccato.</p>
            </div>
        `;
    }

    const modalHtml = `
        <div id="profile-edit-modal" class="profile-modal-overlay">
            <div class="profile-modal-card">
                <button id="btn-close-edit" class="btn btn-sm btn-outline-light position-absolute" style="top: 12px; right: 12px; z-index: 10;">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="profile-modal-header">
                    <h5 class="mb-0 text-light fw-bold"><i class="fas fa-user-cog me-2"></i>Modifica Profilo</h5>
                </div>
                
                <div class="card-body p-4">
                    <div class="mb-4">
                        <label class="form-label fw-bold text-light small">Nickname</label>
                        <input type="text" id="edit-nickname" class="form-control bg-dark text-white border-secondary" value="${profile.nickname || ''}" maxlength="15" required>
                    </div>

                    <div class="row mb-4">
                        <!-- NUOVO: Ruoli a Icone -->
                        <div class="col-12 mb-3">
                            <label class="form-label fw-bold text-light small">Ruolo</label>
                            <div class="profile-selector-box" id="role-selector">
                                <img src="img/Position/Icon_Position_FW.png" class="profile-icon role-option ${profile.role === 'FW' ? 'selected' : ''}" data-val="FW" title="Attaccante (FW)" style="width: 45px; height: 45px;">
                                <img src="img/Position/Icon_Position_MF.png" class="profile-icon role-option ${profile.role === 'MF' ? 'selected' : ''}" data-val="MF" title="Centrocampista (MF)" style="width: 45px; height: 45px;">
                                <img src="img/Position/Icon_Position_DF.png" class="profile-icon role-option ${profile.role === 'DF' ? 'selected' : ''}" data-val="DF" title="Difensore (DF)" style="width: 45px; height: 45px;">
                                <img src="img/Position/Icon_Position_GK.png" class="profile-icon role-option ${profile.role === 'GK' ? 'selected' : ''}" data-val="GK" title="Portiere (GK)" style="width: 45px; height: 45px;">
                            </div>
                        </div>

                        <!-- Elementi a Icone -->
                        <div class="col-12">
                            <label class="form-label fw-bold text-light small">Elemento</label>
                            <div class="profile-selector-box" id="element-selector">
                                <img src="img/Element/Icon_Element_Fire.png" class="profile-icon element-icon element-option ${profile.element === 'Fuoco' ? 'selected' : ''}" data-val="Fuoco" title="Fuoco" style="width: 45px; height: 45px;">
                                <img src="img/Element/Icon_Element_Wind.png" class="profile-icon element-icon element-option ${profile.element === 'Vento' ? 'selected' : ''}" data-val="Vento" title="Vento" style="width: 45px; height: 45px;">
                                <img src="img/Element/Icon_Element_Forest.png" class="profile-icon element-icon element-option ${profile.element === 'Albero' ? 'selected' : ''}" data-val="Albero" title="Albero" style="width: 45px; height: 45px;">
                                <img src="img/Element/Icon_Element_Mountain.png" class="profile-icon element-icon element-option ${profile.element === 'Montagna' ? 'selected' : ''}" data-val="Montagna" title="Montagna" style="width: 45px; height: 45px;">
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold text-light small">Scegli il tuo Avatar</label>
                        <div class="profile-selector-box">
                            ${avatarOptionsHtml}
                        </div>
                    </div>

                    <button id="btn-update-profile" class="btn btn-success w-100 fw-bold py-2 shadow" style="font-size: 1.1rem;">
                        <i class="fas fa-save me-2"></i> Salva Modifiche
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    let selectedAvatarId = profile.selectedAvatarId || "default";
    let selectedElement = profile.element || "Fuoco";
    let selectedRole = profile.role || "FW";

    // Logica di selezione unificata
    const setupSelection = (selectorClass, onSelect) => {
        document.querySelectorAll(selectorClass).forEach(img => {
            img.addEventListener('click', (e) => {
                document.querySelectorAll(selectorClass).forEach(el => el.classList.remove('selected'));
                e.target.classList.add('selected');
                onSelect(e.target.dataset.val || e.target.dataset.id);
            });
        });
    };

    setupSelection('.avatar-option-edit', val => selectedAvatarId = val);
    setupSelection('.role-option', val => selectedRole = val);
    setupSelection('.element-option', val => selectedElement = val);

    // Chiusura modale
    document.getElementById('btn-close-edit').addEventListener('click', () => {
        document.getElementById('profile-edit-modal').remove();
    });

    // Salvataggio
    // Salvataggio
    document.getElementById('btn-update-profile').addEventListener('click', async () => {
        const nickname = document.getElementById('edit-nickname').value.trim();

        if (nickname.length < 3) {
            alert("Il Nickname deve avere almeno 3 caratteri!");
            return;
        }

        const btn = document.getElementById('btn-update-profile');
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Controllo disponibilità...`;

        // 1. Controlliamo se il Nickname è già preso da qualcun altro!
        const isAvailable = await authManager.isNicknameAvailable(nickname);
        if (!isAvailable) {
            alert("⚠️ Questo Nickname è già in uso da un altro giocatore! Scegline uno diverso.");
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-save me-2"></i> Salva Modifiche`;
            return; // Blocchiamo il salvataggio
        }

        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Salvataggio...`;

        try {
            const profileRef = window.dbDoc(window.firebaseDb, "users", user.uid);

            await window.dbSet(profileRef, {
                nickname: nickname,
                role: selectedRole,
                element: selectedElement,
                selectedAvatarId: selectedAvatarId
            }, { merge: true });

            document.getElementById('profile-edit-modal').remove();

            await authManager.loadUserProfile();
            window.location.reload();

        } catch (error) {
            console.error("Errore aggiornamento profilo:", error);
            alert("Errore durante il salvataggio. Riprova.");
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-save me-2"></i> Salva Modifiche`;
        }
    });
}