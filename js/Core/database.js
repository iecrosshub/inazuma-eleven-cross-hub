// js/Core/database.js

import { characterRegistry } from '../Characters/registry.js';
import { techniquesLibrary, universalManualsKeys } from '../Techniques/library.js'; // <- Ora lo importa da library.js!
import { passivesLibrary as basePassivesLibrary } from '../Passive/library.js';
import { rerollPassivesByRole } from '../Passive/passivesReroll/passivesReroll.js';

const allRerollPassives = [
    ...(rerollPassivesByRole.FW || []),
    ...(rerollPassivesByRole.MF || []),
    ...(rerollPassivesByRole.DF || []),
    ...(rerollPassivesByRole.GK || [])
];

export const passivesLibrary = [...basePassivesLibrary, ...allRerollPassives];

// Esporta tutto per far funzionare il resto del sito
export { characterRegistry, techniquesLibrary, rerollPassivesByRole, universalManualsKeys };

export async function fetchCoachData(id) {
    try {
        const module = await import(`../Coaches/${id}.js`);
        return module.coachData;
    } catch (err) {
        return null;
    }
}

export function getPopulatedCharacter(charData) {
    if (!charData) return null;
    const safeTechniques = charData.myTechniques || [];
    const safeBasicPassives = charData.myBasicPassivesIds || [];
    const safeRarityPassives = charData.myRarityPassivesIds || [];

    return {
        ...charData,
        techniques: Object.fromEntries(
            Object.entries(techniquesLibrary).filter(([key]) => safeTechniques.includes(key))
        ),
        basicPassives: passivesLibrary.filter(p => safeBasicPassives.includes(p.id)),
        rarityPassives: passivesLibrary.filter(p => safeRarityPassives.includes(p.id))
    };
}