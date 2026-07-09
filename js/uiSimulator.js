// js/uiSimulator.js
import { parsePassiveText } from './utils.js';

export function updateSimulatorUI(data, damageFormulaStr) {
    // 1. Aggiorna i valori principali
    document.getElementById('damage-result').textContent = data.danno.toLocaleString('it-IT');
    document.getElementById('damage-formula').innerHTML = damageFormulaStr;

    // 2. Aggiorna la tabella riassuntiva
    document.getElementById('stats-display').innerHTML = `
        <li class="border-bottom border-secondary py-1"><strong>Cat. Tecnica:</strong> <span class="text-info float-end">${data.statKey}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>Stat Base:</strong> <span class="text-info float-end">${data.baseStat}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>Buff Stat:</strong> <span class="text-info float-end">+${data.passiveStatBuff}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>Moltiplicatore Ruolo:</strong> <span class="text-info float-end">x${data.roleMult.toFixed(2)}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>Potenza Mossa:</strong> <span class="text-info float-end">${data.techPower}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>Buff Potenza:</strong> <span class="text-info float-end">+${data.passivePowerBuff}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>STAB:</strong> <span class="text-info float-end">x${data.stab.toFixed(2)}</span></li>
        <li class="border-bottom border-secondary py-1"><strong>Vantaggio:</strong> <span class="text-info float-end">x${data.adv.toFixed(2)}</span></li>
    `;

    // 3. AGGIUNTO: Aggiorna visivamente la levetta e il testo dello STAB!
    const stabCheckbox = document.getElementById('sim-stab');
    const stabLabel = document.getElementById('stab-label');

    if (stabCheckbox && stabLabel) {
        const isStabAttivo = data.stab > 1.0; // Se il moltiplicatore è 1.2, lo STAB c'è

        stabCheckbox.checked = isStabAttivo;

        if (isStabAttivo) {
            stabLabel.textContent = "STAB ATTIVO (x1.20)";
            stabLabel.classList.remove('text-info', 'text-secondary');
            stabLabel.classList.add('text-success'); // Diventa verde per evidenziarlo
        } else {
            stabLabel.textContent = "STAB INATTIVO (x1.00)";
            stabLabel.classList.remove('text-info', 'text-success');
            stabLabel.classList.add('text-secondary'); // Diventa grigio
        }
    }
}

export function updatePassiveDescriptions(passiveData) {
    const display = document.getElementById('passive-display');
    if (!display) return;
    display.innerHTML = passiveData.length > 0
        ? passiveData.map(p => `<li><span class="text-info">${p.active ? "🟢" : "⚪"} ${p.title} (Lv. ${p.level}):</span> <span class="text-light">${p.desc}</span></li>`).join('')
        : '<li><span class="text-muted">Nessuna passiva.</span></li>';
}