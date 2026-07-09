import { characterRegistry } from './Characters/registry.js';

// Funzione helper per estrarre l'elemento dal percorso immagine
function getElement(path) {
    if (path.includes('Forest')) return 'Forest';
    if (path.includes('Fire')) return 'Fire';
    if (path.includes('Mountain')) return 'Mountain';
    if (path.includes('Wind')) return 'Wind';
    return '';
}

// Funzione helper per estrarre la posizione dal percorso immagine
function getPosition(path) {
    if (path.includes('GK')) return 'GK';
    if (path.includes('DF')) return 'DF';
    if (path.includes('MF')) return 'MF';
    if (path.includes('FW')) return 'FW';
    return '';
}

function renderGallery(filteredList = characterRegistry) {
    const grid = document.getElementById('character-grid');
    if (!grid) return;

    grid.innerHTML = filteredList.map(char => {
        const starsHTML = Array(char.stars).fill(
            `<img src="img/Frm_GachaIcon/Icon_GradeStar.png" class="star-icon">`
        ).join('');

        return `
        <div class="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column align-items-center">
            <a href="./character.html?id=${char.id}" onclick="localStorage.setItem('selectedChar', '${char.id}')" style="text-decoration: none; color: inherit;">                
                <div class="gacha-icon-wrapper">
                    <div class="rarity-bg-layer" style="background-image: url('${char.background}');">
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

function filterCharacters() {
    const nameSearch = document.getElementById('search-name').value.toLowerCase();
    const elementVal = document.getElementById('filter-element').value;
    const posVal = document.getElementById('filter-position').value;
    const rarityVal = document.getElementById('filter-rarity').value;

    const filtered = characterRegistry.filter(char => {
        // Estraiamo le categorie al volo dai path
        const charElement = getElement(char.element);
        const charPosition = getPosition(char.position);

        const matchesName = char.name.toLowerCase().includes(nameSearch);
        const matchesElement = elementVal === 'All' || charElement === elementVal;
        const matchesPos = posVal === 'All' || charPosition === posVal;
        const matchesRarity = rarityVal === 'All' || char.stars == rarityVal;

        return matchesName && matchesElement && matchesPos && matchesRarity;
    });

    renderGallery(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    document.getElementById('search-name').addEventListener('input', filterCharacters);
    document.getElementById('filter-element').addEventListener('change', filterCharacters);
    document.getElementById('filter-position').addEventListener('change', filterCharacters);
    document.getElementById('filter-rarity').addEventListener('change', filterCharacters);
});