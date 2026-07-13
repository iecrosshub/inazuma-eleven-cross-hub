// --- js/Techniques/library.js ---

import { shootLibrary } from './shootLibrary.js';
import { dribbleLibrary } from './dribbleLibrary.js';
import { blockLibrary } from './blockLibrary.js';
import { catchLibrary } from './catchLibrary.js';

export const techniquesLibrary = {
    ...shootLibrary,
    ...dribbleLibrary,
    ...blockLibrary,
    ...catchLibrary
};