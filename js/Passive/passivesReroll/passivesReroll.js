// js/Passive/passivesReroll/passivesReroll.js

// Importiamo i singoli moduli dalla STESSA cartella
import { rerollPassivesFW } from './passivesFW.js';
import { rerollPassivesMF } from './passivesMF.js';
import { rerollPassivesDF } from './passivesDF.js';
import { rerollPassivesGK } from './passivesGK.js';

// 1. Array globale con TUTTE le passive di reroll (utile per la ricerca per ID)
export const allRerollPassives = [
    ...rerollPassivesFW,
    ...rerollPassivesMF,
    ...rerollPassivesDF,
    ...rerollPassivesGK
];

// 2. Oggetto diviso per ruolo (estremamente utile per il simulatore)
export const rerollPassivesByRole = {
    FW: rerollPassivesFW,
    MF: rerollPassivesMF,
    DF: rerollPassivesDF,
    GK: rerollPassivesGK
};

// Se in futuro ti serve esportarli anche singolarmente
export {
    rerollPassivesFW,
    rerollPassivesMF,
    rerollPassivesDF,
    rerollPassivesGK
};