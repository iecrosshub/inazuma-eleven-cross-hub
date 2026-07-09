import { characterRegistry } from './Characters/registry.js';
import { techniquesLibrary } from './Techniques/library.js';
import { passivesLibrary } from './Passive/library.js';
import { renderStats, renderTechniques, renderPassives } from './renderUI.js';

let db = {};
let currentId = '';

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    currentId = urlParams.get('id');

    // Se non c'è id nell'URL, prova col localStorage o il default
    if (!currentId) {
        currentId = localStorage.getItem('selectedChar') || 'byronLoveZeus';
    }

    // Salva l'id per il futuro
    localStorage.setItem('selectedChar', currentId);

    try {
        const module = await import(`./Characters/${currentId}.js`);
        db = {
            ...module.charData,
            techniques: Object.fromEntries(Object.entries(techniquesLibrary).filter(([key]) => module.charData.myTechniques.includes(key))),
            basicPassives: passivesLibrary.filter(p => module.charData.myBasicPassivesIds.includes(p.id)),
            rarityPassives: passivesLibrary.filter(p => module.charData.myRarityPassivesIds.includes(p.id))
        };

        // UI Base
        document.getElementById('char-name-main').textContent = `${db.name} (${db.romanizedName})`;
        document.getElementById('char-name-jp').textContent = db.japaneseName;
        document.getElementById('char-img').src = db.characterImg || db.thumb;
        document.getElementById('element-icon').src = db.element;
        document.getElementById('position-icon').src = db.position;
        document.getElementById('tags-container').innerHTML = db.tags.map(t => `<img src="${t}" style="height: 38px;">`).join('');

        // Imposta il tasto Simulatore col PG corretto
        const simBtn = document.getElementById('btn-send-to-sim');
        if (simBtn) simBtn.href = `simulator.html?char=${currentId}`;

        document.getElementById('btn-lv1').onclick = () => renderStats(db, 'lv1');
        document.getElementById('btn-lv300').onclick = () => renderStats(db, 'lv300');

        renderStats(db, 'lv1');
        renderPassives(db);
        renderTechniques(db);
        setupNavigationControls();
    } catch (err) {
        console.error("Errore caricamento personaggio:", err);
    }
}

function setupNavigationControls() {
    const idx = characterRegistry.findIndex(c => c.id === currentId);
    if (idx === -1) return;

    // 1. Tasto "Invia al Simulatore"
    const simBtn = document.getElementById('btn-send-to-sim');
    if (simBtn) {
        simBtn.onclick = () => {
            window.location.href = `./simulator.html?char=${currentId}`;
        };
    }

    const prevBtn = document.getElementById('btn-prev-char');
    const nextBtn = document.getElementById('btn-next-char');

    // 2. Tasto Precedente
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            const nextIdx = (idx + 1) % characterRegistry.length;
            window.location.search = `?id=${characterRegistry[nextIdx].id}`;
        };
    }

    // 3. Tasto Successivo
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            const prevIdx = idx === 0 ? characterRegistry.length - 1 : idx - 1;
            window.location.search = `?id=${characterRegistry[prevIdx].id}`;
        };
    }
}

document.addEventListener('DOMContentLoaded', init);