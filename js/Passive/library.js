// --- js/Passive/library.js ---

import { alwaysPassives } from './stats_always.js';
import { bondPassives } from './bonds.js';
import { stackingPassives } from './impeto_stacking.js';
import { conditionPassives } from './impeto_conditions.js';
import { specificMovesPassives } from './specific_moves.js';

// Unisce tutti gli array in un unico archivio globale
export const passivesLibrary = [
    ...alwaysPassives,
    ...bondPassives,
    ...stackingPassives,
    ...conditionPassives,
    ...specificMovesPassives
];