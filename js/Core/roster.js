// js/Core/roster.js

import { extractElement, extractPosition } from './parsers.js';

export async function filterCharacters(characters, filters) {
    let results = [];
    const isActive = (val) => val != null && val !== 'All' && val !== '';
    const isAdvancedFilterActive = isActive(filters.style) || isActive(filters.team) || isActive(filters.season);

    for (let char of characters) {
        const charElement = extractElement(char.element);
        const charPosition = extractPosition(char.position);

        if (isActive(filters.name)) {
            const searchName = filters.name.toLowerCase();
            const matchName = (char.name && char.name.toLowerCase().includes(searchName)) ||
                (char.japaneseName && char.japaneseName.toLowerCase().includes(searchName)) ||
                (char.romanizedName && char.romanizedName.toLowerCase().includes(searchName));
            if (!matchName) continue;
        }

        if (isActive(filters.element) && charElement !== filters.element) continue;
        if (isActive(filters.position) && charPosition !== filters.position) continue;
        if (isActive(filters.rarity) && String(char.stars) !== String(filters.rarity)) continue;

        if (isAdvancedFilterActive) {
            try {
                const module = await import(`../Characters/${char.id}.js`);
                const allTagsRaw = module.charData.tags ? module.charData.tags.join('').toLowerCase() : '';

                if (isActive(filters.style) && !allTagsRaw.includes(`ability_${filters.style.toLowerCase()}`)) continue;
                if (isActive(filters.team) && !allTagsRaw.includes(`team_${filters.team.toLowerCase()}`)) continue;
                if (isActive(filters.season) && !allTagsRaw.includes(`title_${filters.season.toLowerCase()}`)) continue;
            } catch (err) {
                console.error("Errore nel file giocatore:", char.id);
                continue;
            }
        }
        results.push(char);
    }
    return results;
}

export class RosterManager {
    constructor() {
        this.roster = [];
        this.currentId = 0;
    }

    addCharacter(customChar) {
        this.currentId++;
        const newChar = { uid: `roster_${this.currentId}`, ...customChar };
        this.roster.push(newChar);
        return newChar;
    }

    getCharacter(uid) { return this.roster.find(c => c.uid === uid); }
    getAllCharacters() { return this.roster; }
    removeCharacter(uid) { this.roster = this.roster.filter(c => c.uid !== uid); }
}