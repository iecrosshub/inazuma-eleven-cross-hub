// js/gallery.js
import { characterRegistry } from './Characters/registry.js';
import { filterCharacters } from './utils.js';

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

        // Salvavita: se il background non c'è, previene il blocco del render
        const bgStyle = (char.background || '').includes('linear-gradient')
            ? `background: ${char.background};`
            : `background-image: url('${char.background}');`;

        return `
        <div class="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column align-items-center">
            <a href="./character.html?id=${char.id}" onclick="localStorage.setItem('selectedChar', '${char.id}')" style="text-decoration: none; color: inherit;">                
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
// GESTIONE DEI MENU A TENDINA CUSTOM (COPIATA DA TEAM BUILDER)
// ==========================================
function setupCustomSelects() {
    const customSelects = document.getElementsByClassName("custom-select");

    for (let i = 0; i < customSelects.length; i++) {
        const selElmnt = customSelects[i];
        const selectedDiv = selElmnt.querySelector(".select-selected");
        const itemsDiv = selElmnt.querySelector(".select-items");
        const optionDivs = itemsDiv.getElementsByTagName("DIV");

        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            itemsDiv.classList.toggle("select-hide");
        });

        for (let j = 0; j < optionDivs.length; j++) {
            optionDivs[j].addEventListener("click", function(e) {
                const val = this.getAttribute("data-value");
                selElmnt.setAttribute("data-value", val);
                selectedDiv.querySelector("span").innerHTML = this.innerHTML;
                itemsDiv.classList.add("select-hide");
                handleFiltersChange(); // Scatta il filtro ogni volta che selezioni una voce
            });
        }
    }
    document.addEventListener("click", closeAllSelect);
}

function closeAllSelect(elmnt) {
    const items = document.getElementsByClassName("select-items");
    const selectedDivs = document.getElementsByClassName("select-selected");
    for (let i = 0; i < selectedDivs.length; i++) {
        if (elmnt !== selectedDivs[i]) {
            items[i].classList.add("select-hide");
        }
    }
}

// ==========================================
// LOGICA FILTRAGGIO (Con le chiamate esatte all'HTML aggiornato)
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

    const filteredList = await filterCharacters(characterRegistry, currentFilters);
    renderGallery(filteredList);
}

// Inizializzazione pagina
document.addEventListener('DOMContentLoaded', () => {
    renderGallery(); // Il primissimo caricamento mostra tutti i giocatori
    setupCustomSelects();

    // L'input testo non ha bisogno dei menu custom, usiamo l'evento input classico
    document.getElementById('search-name').addEventListener('input', handleFiltersChange);
});