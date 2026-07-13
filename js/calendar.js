// js/calendar.js

// Il "Ciclo Infinito" di 8 giorni.
const trialCycle = [
    { element: 'Montagna', mode: 'Attacco', cssMode: 'mode-attack', icon: 'img/Element/Icon_Element_Mountain.png' },
    { element: 'Montagna', mode: 'Difesa',  cssMode: 'mode-defense', icon: 'img/Element/Icon_Element_Mountain.png' },
    { element: 'Vento',    mode: 'Attacco', cssMode: 'mode-attack', icon: 'img/Element/Icon_Element_Wind.png' },
    { element: 'Vento',    mode: 'Difesa',  cssMode: 'mode-defense', icon: 'img/Element/Icon_Element_Wind.png' },
    { element: 'Foresta',  mode: 'Attacco', cssMode: 'mode-attack', icon: 'img/Element/Icon_Element_Forest.png' },
    { element: 'Foresta',  mode: 'Difesa',  cssMode: 'mode-defense', icon: 'img/Element/Icon_Element_Forest.png' },
    { element: 'Fuoco',    mode: 'Attacco', cssMode: 'mode-attack', icon: 'img/Element/Icon_Element_Fire.png' },
    { element: 'Fuoco',    mode: 'Difesa',  cssMode: 'mode-defense', icon: 'img/Element/Icon_Element_Fire.png' }
];

// DATA DI RIFERIMENTO ORIGINE (EPOCH): Il 1 Luglio 2026 era "Montagna - Attacco" (Indice 0)
// Math.UTC garantisce che non ci siano problemi di fusi orari o ora legale
const EPOCH_DATE = Date.UTC(2026, 6, 1); // Anno, Mese (0-11, quindi 6=Luglio), Giorno

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

// --- MOTORE MATEMATICO ---
// Calcola quale delle 8 sfide è attiva in una determinata data
function getTrialStateForDate(targetDate) {
    const targetUTC = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const diffTime = targetUTC - EPOCH_DATE;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calcoliamo l'indice nel ciclo (gestendo anche le date antecedenti al 1 Luglio 2026)
    let index = diffDays % 8;
    if (index < 0) index += 8;

    return trialCycle[index];
}

// --- RENDERING VISTA SETTIMANALE ---
function renderWeeklyView() {
    const container = document.getElementById('weekly-view');
    container.innerHTML = '';

    // Partiamo da "Oggi"
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const state = getTrialStateForDate(d);
        const isToday = i === 0;

        // Formattazione: "13 Lug" (Oggi mostriamo la parola "Oggi")
        const dateStr = isToday ? "Oggi" : `${d.getDate()} ${monthNames[d.getMonth()].substring(0, 3)}`;

        container.innerHTML += `
            <div class="week-day-card ${isToday ? 'today' : ''}">
                <div class="day-label ${isToday ? 'text-danger' : ''}">${dateStr}</div>
                <img src="${state.icon}" class="elem-icon" alt="${state.element}">
                <span class="mode-badge ${state.cssMode}">${state.mode}</span>
            </div>
        `;
    }
}

// --- RENDERING CALENDARIO MENSILE ---
function renderMonthCalendar(year, month) {
    document.getElementById('month-title').textContent = `${monthNames[month]} ${year}`;
    const body = document.getElementById('calendar-body');
    body.innerHTML = '';

    // Otteniamo il giorno della settimana del primo giorno del mese (0=Domenica, 1=Lunedì)
    const firstDay = new Date(year, month, 1).getDay();
    // In Italia il calendario parte da Lunedì, quindi convertiamo 0 (Domenica) in 6, 1 (Lunedì) in 0, ecc.
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Quante celle disegnare in totale (multipli di 7)
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDay = today.getDate();

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');

        // Se la cella è prima del primo giorno o dopo l'ultimo giorno del mese
        if (i < startOffset || i >= startOffset + daysInMonth) {
            cell.className = 'cal-cell empty';
        } else {
            const dayNum = i - startOffset + 1;
            const isToday = isCurrentMonth && dayNum === currentDay;
            cell.className = `cal-cell ${isToday ? 'today' : ''}`;

            // Calcoliamo lo stato per questo giorno esatto
            const cellDate = new Date(year, month, dayNum);
            const state = getTrialStateForDate(cellDate);

            cell.innerHTML = `
                <span class="cal-date">${dayNum}</span>
                <img src="${state.icon}" class="elem-icon" alt="${state.element}">
                <span class="mode-badge ${state.cssMode}">${state.mode.substring(0,3).toUpperCase()}</span>
            `;
        }
        body.appendChild(cell);
    }
}

// --- INIZIALIZZAZIONE E BOTTONI ---
document.addEventListener('DOMContentLoaded', () => {
    renderWeeklyView();
    renderMonthCalendar(currentYear, currentMonth);

    document.getElementById('btn-prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderMonthCalendar(currentYear, currentMonth);
    });

    document.getElementById('btn-next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderMonthCalendar(currentYear, currentMonth);
    });
});