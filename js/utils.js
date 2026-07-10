// ==========================================
// FUNZIONI DI UTILITÀ GLOBALI (js/utils.js)
// ==========================================

/**
 * Traduce il testo delle passive sostituendo i placeholder con i valori del livello.
 */
export function parsePassiveText(template, lvData) {
    let text = template || "";
    if (lvData.val !== undefined) text = text.replace('{VAL}', lvData.val);
    if (lvData.power !== undefined) text = text.replace('{POWER}', lvData.power);
    if (lvData.val2 !== undefined) text = text.replace('{VAL2}', lvData.val2);
    if (lvData.dist !== undefined) text = text.replace('{DIST}', lvData.dist);
    if (lvData.crt !== undefined) text = text.replace('{CRT}', lvData.crt);
    if (lvData.tp !== undefined) text = text.replace('{TP}', lvData.tp);
    return text;
}

/**
 * Estrae il nome della Statistica (Tiro, Parata, Blocco, Tecnica) dall'URL dell'icona della mossa.
 */
export function getStatKeyByIcon(iconUrl) {
    if (!iconUrl) return 'Tiro';
    const icon = iconUrl.toLowerCase();
    if (icon.includes('shoot')) return 'Tiro';
    if (icon.includes('catch') || icon.includes('save')) return 'Parata';
    if (icon.includes('block')) return 'Blocco';
    if (icon.includes('dribble')) return 'Tecnica';
    return 'Tiro'; // Default
}

/**
 * Estrae l'Elemento (Wind, Forest, Fire, Mountain) dall'URL dell'icona dell'elemento.
 */
export function extractElement(elementUrl) {
    if (!elementUrl) return 'Void';
    const el = elementUrl.toLowerCase();
    if (el.includes('wind')) return 'Wind';
    if (el.includes('forest')) return 'Forest';
    if (el.includes('fire')) return 'Fire';
    if (el.includes('mountain')) return 'Mountain';
    return 'Void';
}

/**
 * Verifica lo STAB (Same Type Attack Bonus) confrontando elemento giocatore e mossa.
 */
export function checkStab(charElementUrl, techElementUrl) {
    if (!charElementUrl || !techElementUrl) return false;
    const charEl = extractElement(charElementUrl);
    const techEl = extractElement(techElementUrl);
    return charEl === techEl && charEl !== 'Void';
}