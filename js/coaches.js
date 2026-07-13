// js/coaches.js
import { coachRegistry } from './Coaches/registry.js';
import { parsePassiveText, fetchCoachData } from './utils.js'; // <-- Importiamo anche fetchCoachData

let currentId = '';
let currentLevel = 10;
let activeCoachDb = null;

async function init() {
    const savedId = localStorage.getItem('selectedCoach');
    const isValidId = coachRegistry.some(c => c.id === savedId);
    currentId = isValidId ? savedId : coachRegistry[0]?.id;

    if (!currentId) return;

    // --- SETUP TENDINA LIVELLI ---
    const levelSelect = document.getElementById('coach-level-select');
    if (levelSelect) {
        levelSelect.innerHTML = '';
        for (let i = 10; i >= 1; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Lv.${i}`;
            levelSelect.appendChild(option);
        }

        levelSelect.addEventListener('change', (e) => {
            if (!activeCoachDb) return;
            currentLevel = parseInt(e.target.value, 10);
            updatePassiveText();
        });
    }

    renderSidebar();
    await loadCoachData(currentId);
}

function renderSidebar() {
    const listContainer = document.getElementById('coach-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    coachRegistry.forEach(coach => {
        const btn = document.createElement('div');
        btn.className = `coach-btn ${coach.id === currentId ? 'active' : ''}`;

        btn.innerHTML = `
            <img src="${coach.thumb}" onerror="this.src='https://placehold.co/35'">
            <div class="coach-btn-info">
                <strong>${coach.name} <br><span style="font-size: 16px; color: #65718a;">(${coach.japaneseName})</span></strong>
                <span class="level-badge">Lv.10</span>
            </div>
        `;

        btn.onclick = async () => {
            currentId = coach.id;
            currentLevel = 10;
            localStorage.setItem('selectedCoach', currentId);
            renderSidebar();
            await loadCoachData(currentId);
        };

        listContainer.appendChild(btn);
    });
}

async function loadCoachData(id) {
    // Usiamo l'utility per recuperare i dati!
    activeCoachDb = await fetchCoachData(id);

    // Se il caricamento fallisce, interrompiamo la funzione
    if (!activeCoachDb) return;

    const db = activeCoachDb;

    currentLevel = db.level || 10;
    const levelSelect = document.getElementById('coach-level-select');
    if (levelSelect) levelSelect.value = currentLevel;

    document.getElementById('coach-name').textContent = db.name;
    document.getElementById('formation-name').textContent = db.formationName;

    const portrait = document.getElementById('coach-portrait');
    portrait.src = db.artwork;
    portrait.style.display = 'block';

    // --- Aggiornamento Condizioni ---
    document.getElementById('conditions-container').innerHTML = db.formationConditions.map(cond => {
        const icons = cond.icons || (cond.icon ? [cond.icon] : []);
        const iconsHtml = icons.map(icon => `<img src="${icon}" onerror="this.src='https://placehold.co/35?text=⚡'">`).join('');

        return `
            <div class="condition-row">
                <strong>${cond.slotCode}</strong>
                ${iconsHtml}
            </div>
        `;
    }).join('');

    // --- IL CAMPETTO TATTICO ---
    const conditionSlots = db.formationConditions.map(c => c.slotCode);

    document.getElementById('pitch-container').innerHTML = db.slots.map(slot => {
        const isActive = conditionSlots.includes(slot.number) ? 'active-slot' : '';
        return `
            <div class="pitch-slot ${isActive}" style="top: ${slot.y}%; left: ${slot.x}%;">
                <img src="${slot.baseAsset}" alt="${slot.position}">
                <strong>${slot.number}</strong>
            </div>
        `;
    }).join('');

    // --- Passiva Formazione ---
    const formIcons = db.formationPassive.icons || [];
    document.getElementById('formation-icons').innerHTML = formIcons.map(icon => `<img src="${icon}" onerror="this.src='https://placehold.co/32'">`).join('');
    document.getElementById('formation-text').innerHTML = db.formationPassive.text;

    // --- Aggiorna i titoli delle passive ---
    document.getElementById('formation-passive-title').textContent = db.formationPassive.title || "Attiva - Formazione";
    document.getElementById('coach-passive-title').textContent = db.coachPassive.title || "Passiva Allenatore";

    // Aggiorna passiva allenatore
    updatePassiveText();
}

function updatePassiveText() {
    if (!activeCoachDb) return;
    const db = activeCoachDb;

    const activeLevelIndex = Math.max(0, currentLevel - 1);
    const activeLevelData = db.coachPassive.levels[activeLevelIndex] || db.coachPassive.levels[db.coachPassive.levels.length - 1];

    const parsedText = parsePassiveText(db.coachPassive.template, activeLevelData);

    const coachIcons = db.coachPassive.icons || [];
    document.getElementById('coach-icons').innerHTML = coachIcons.map(icon => `<img src="${icon}" onerror="this.src='https://placehold.co/32'">`).join('');
    document.getElementById('coach-text').innerHTML = parsedText;
}

document.addEventListener('DOMContentLoaded', init);