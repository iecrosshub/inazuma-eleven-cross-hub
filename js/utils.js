// 1. Funzione universale per tradurre il testo delle passive
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

// 2. Funzione universale per estrarre la Statistica dall'icona della mossa
export function getStatKeyByIcon(iconUrl) {
    const icon = iconUrl.toLowerCase();
    if (icon.includes('shoot')) return 'Tiro';
    if (icon.includes('catch') || icon.includes('save')) return 'Parata';
    if (icon.includes('block')) return 'Blocco';
    if (icon.includes('dribble')) return 'Tecnica';
    return 'Tiro'; // Default
}

// 3. Funzione universale per calcolare lo STAB
export function checkStab(charElementUrl, techElementUrl) {
    const charEl = charElementUrl.split('/').pop().replace('Icon_Element_', '').replace('.png', '').toLowerCase();
    const techEl = techElementUrl.split('/').pop().replace('Icon_Element_', '').replace('.png', '').toLowerCase();
    return charEl === techEl;
}