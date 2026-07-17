// js/Controllers/gallery.js

import { characterRegistry } from '../Core/database.js';
import { filterCharacters } from '../Core/roster.js';
import { initCustomSelect, setupGlobalSelectClose } from '../Components/customSelect.js';

function renderGallery(filteredList = characterRegistry) {
    const grid = document.getElementById('character-grid');
    if (!grid) return;

    if (filteredList.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center mt-5"><h5 class="text-white opacity-75">Nessun giocatore trovato con questi filtri.</h5></div>`;
        return;
    }

    grid.innerHTML = filteredList.map(char => {
        const starsHTML = Array(char.stars).fill(
            `<img src="img/Frm_GachaIcon/Icon_GradeStar.png" class="star-icon">`
        ).join('');

        const bgStyle = (char.background || '').includes('linear-gradient')
            ? `background: ${char.background};`
            : `background-image: url('${char.background}');`;

        return `
        <div class="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column align-items-center character-card-wrapper">
            <a href="./character.html?id=${char.id}" onclick="localStorage.setItem('selectedChar', '${char.id}')" style="text-decoration: none; color: inherit; width: 100%;">                
                <div class="gacha-icon-wrapper">
                    <div class="rarity-bg-layer" style="${bgStyle}">
                        <img src="${char.thumb}" class="personaje-imagen" alt="char">
                    </div>
                    <img src="${char.frame}" class="frame-overlay">
                    <div class="hud-top-left">
                        <img src="${char.element}" class="atributo-tag">
                        <img src="${char.position}" class="posicion-tag">
                    </div>
                    <div class="stars-curved-container">${starsHTML}</div>
                </div>
                <div class="personaje-nombre d-flex flex-column justify-content-center text-center mt-2">
                    <span style="font-size: 0.9rem; line-height: 1.1;">${char.name} (${char.romanizedName})</span>
                    <span style="font-size: 1rem; font-weight: bold; color: #ffca28;">${char.japaneseName}</span>
                </div>
            </a>
        </div>`;
    }).join('');
}

// ==========================================
// LOGICA RIPRISTINO FILTRI SALVATI
// ==========================================
function restoreFilters() {
    const saved = localStorage.getItem('gallery_filters');
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

            setCustomSelect('filter-element', filters.element);
            setCustomSelect('filter-position', filters.position);
            setCustomSelect('filter-rarity', filters.rarity);
            setCustomSelect('filter-style', filters.style);
            setCustomSelect('filter-team', filters.team);
            setCustomSelect('filter-season', filters.season);
        } catch (e) {}
    }
}

// ==========================================
// LOGICA FILTRAGGIO E INIZIALIZZAZIONE
// ==========================================
async function handleFiltersChange() {
    const currentFilters = {
        name: document.getElementById('search-name').value,
        element: document.getElementById('filter-element').getAttribute('data-value'),
        position: document.getElementById('filter-position').getAttribute('data-value'),
        rarity: document.getElementById('filter-rarity').getAttribute('data-value'),
        style: document.getElementById('filter-style').getAttribute('data-value'),
        team: document.getElementById('filter-team').getAttribute('data-value'),
        season: document.getElementById('filter-season').getAttribute('data-value')
    };

    localStorage.setItem('gallery_filters', JSON.stringify(currentFilters));

    const filteredList = await filterCharacters(characterRegistry, currentFilters);
    renderGallery(filteredList);
}

// ==========================================
// TUTORIAL INTRO.JS (NUOVO FLUSSO NAVBAR)
// ==========================================
function startTutorial() {
    localStorage.setItem('tutorial_index_seen', 'true');
    const btnTut = document.getElementById('btn-tutorial');
    if (btnTut) btnTut.classList.remove('btn-tutorial-pulse');

    const tour = introJs();
    tour.setOptions({
        nextLabel: 'Avanti →',
        prevLabel: '← Indietro',
        doneLabel: 'Iniziamo! 🚀',
        showStepNumbers: true,
        showBullets: true,
        overlayOpacity: 0.8,
        scrollTo: 'tooltip',
        steps: [
            {
                intro: "<div style='text-align: center;'>" +
                    "<h4 class='text-primary fw-bold mb-3' style='text-transform: uppercase; letter-spacing: 1px;'>👋 Benvenuto in<br>IE Cross Hub!</h4>" +
                    "<p>Questo è il portale centrale di Inazuma Eleven Cross.<br><br>" +
                    "Prima di tuffarti nel sito, ti mostro <strong>tutti gli strumenti</strong> che hai a disposizione navigando nella barra in alto!</p>" +
                    "</div>"
            },
            {
                element: document.getElementById('tour-simulators'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-warning fw-bold mb-3' style='text-transform: uppercase;'>🛠️ Simulatori Avanzati</h5>" +
                    "<p>Da questo menu puoi accedere al <strong>Team Builder</strong> per creare la tua squadra perfetta, simulare scenari nel <strong>5vs1</strong> o calcolare i danni esatti nel <strong>Simulatore Tecniche</strong>.</p>" +
                    "</div>",
                position: 'bottom'
            },
            {
                element: document.getElementById('tour-info'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-success fw-bold mb-3' style='text-transform: uppercase;'>📚 Info & Utility</h5>" +
                    "<p>Tutta la conoscenza del gioco in un solo posto!<br><br>Consulta le formazioni Meta, il Calendario Sfide e spulcia i <strong>Database completi</strong> di Statistiche, Passive, Tecniche e Allenatori.</p>" +
                    "</div>",
                position: 'bottom'
            },
            {
                element: document.getElementById('tour-collection'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-danger fw-bold mb-3' style='text-transform: uppercase;'>🎒 La Tua Collezione</h5>" +
                    "<p>L'area più importante del sito!<br><br>Entra qui per <strong>salvare i giocatori</strong> che hai trovato in gioco, livellarli e sbloccare i calcoli esatti e personalizzati sul tuo account.</p>" +
                    "</div>",
                position: 'bottom'
            },
            {
                element: document.querySelector('.filters-container'),
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-info fw-bold mb-3' style='text-transform: uppercase;'>🔍 Ricerca Rapida</h5>" +
                    "<p>Qui sotto troverai l'intero roster dei personaggi.<br><br>Usa i filtri per restringere il campo e <strong>trovare immediatamente</strong> chi cerchi.</p>" +
                    "</div>",
                position: 'top'
            },
            {
                element: document.querySelector('.character-card-wrapper'), // Inquadra la prima card!
                intro: "<div style='text-align: center;'>" +
                    "<h5 class='text-primary fw-bold mb-3' style='text-transform: uppercase;'>📖 Il Vero Potere</h5>" +
                    "<p>Clicca sull'immagine di un giocatore per aprire la sua <strong>Scheda Dettagliata</strong> e scoprire il suo potenziale.<br><br>" +
                    "Lì troverai tutte le sue statistiche esatte e il simulatore per le passive di Reroll.<br><br>" +
                    "<span style='color: #d32f2f; font-weight: bold;'>Prova a cliccarci appena chiudi questa finestra. Buon divertimento!</span></p>" +
                    "</div>",
                position: 'right'
            }
        ]
    });

    // Evento Magico: Forza l'apertura dei dropdown quando ci passa sopra Intro.js
    tour.onbeforechange(function(targetElement) {
        // 1. Chiude eventuali menu rimasti aperti
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('force-show'));

        // 2. Se l'elemento corrente è un dropdown, gli aggiunge la classe per aprirlo
        if (targetElement && targetElement.classList.contains('nav-dropdown')) {
            targetElement.classList.add('force-show');
        }
    });

    // Pulisce tutto quando il tutorial finisce
    tour.onexit(function() {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('force-show'));
    });

    tour.start();
}

document.addEventListener('DOMContentLoaded', async () => {
    restoreFilters();

    document.querySelectorAll('.custom-select').forEach(sel => {
        initCustomSelect(sel, () => handleFiltersChange());
    });
    setupGlobalSelectClose();

    document.getElementById('search-name').addEventListener('input', handleFiltersChange);

    // Generiamo la griglia iniziale
    await handleFiltersChange();

    // Evento per il tasto Tutorial
    const btnTutorial = document.getElementById('btn-tutorial');
    if (btnTutorial) {
        btnTutorial.addEventListener('click', startTutorial);
    }

    // Se è la prima visita, avvia il tutorial dopo un attimo
    if (!localStorage.getItem('tutorial_index_seen')) {
        setTimeout(startTutorial, 500);
    } else if (btnTutorial) {
        btnTutorial.classList.remove('btn-tutorial-pulse');
    }
});