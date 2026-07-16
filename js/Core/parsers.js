// js/Core/parsers.js

export function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

export function getAdjacentCharacterId(currentId, registry, direction) {
    const idx = registry.findIndex(c => c.id === currentId);
    if (idx === -1) return null;
    if (direction === 'next') return registry[(idx + 1) % registry.length].id;
    if (direction === 'prev') return registry[idx === 0 ? registry.length - 1 : idx - 1].id;
}

export function extractElement(elementUrl) {
    if (!elementUrl) return 'Void';
    const el = elementUrl.toLowerCase();
    if (el.includes('wind')) return 'Wind';
    if (el.includes('forest')) return 'Forest';
    if (el.includes('fire')) return 'Fire';
    if (el.includes('mountain')) return 'Mountain';
    return 'Void';
}

export function extractPosition(positionUrl) {
    if (!positionUrl) return 'FW';
    const pos = positionUrl.toLowerCase();
    if (pos.includes('fw')) return 'FW';
    if (pos.includes('mf')) return 'MF';
    if (pos.includes('df')) return 'DF';
    if (pos.includes('gk')) return 'GK';
    return 'FW';
}

export function getStatKeyByIcon(iconUrl) {
    if (!iconUrl) return 'Tiro';
    const icon = iconUrl.toLowerCase();
    if (icon.includes('shoot')) return 'Tiro';
    if (icon.includes('catch') || icon.includes('save') || icon.includes('keeper')) return 'Parata';
    if (icon.includes('block') || icon.includes('defense')) return 'Blocco';
    if (icon.includes('dribble') || icon.includes('offense')) return 'Tecnica';
    return 'Tiro';
}

export function getRarityTier(reqString) {
    if (!reqString) return -1;
    const str = reqString.toLowerCase();

    // Mappatura esatta sui tuoi 10 nuovi livelli (0-9)
    if (str.includes("legendary player +")) return 9;
    if (str.includes("legendary player")) return 8;
    if (str.includes("top player +")) return 7;
    if (str.includes("top player")) return 6;
    if (str.includes("advanced player +")) return 5;
    if (str.includes("advanced player")) return 4;
    if (str.includes("growing player +")) return 3;
    if (str.includes("growing player")) return 2;
    if (str.includes("normal player +")) return 1;
    if (str.includes("normal player")) return 0;
    if (str.includes("inferiore advanced player")) return 0; // Fallback di sicurezza
    return -1;
}

export function getLevelTier(reqString) {
    if (!reqString) return -1;
    const lower = reqString.toLowerCase();

    // Ignora completamente la stringa se si tratta di un requisito di rarità
    if (lower.includes("player")) return -1;

    const match = lower.match(/\d+/);
    if (match) return parseInt(match[0]);
    return -1;
}

export function getDailyTrialConfig() {
    const SHIFT_MS = 4 * 60 * 60 * 1000;
    const targetDate = new Date(Date.now() + SHIFT_MS);
    const targetUTC = Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate());

    const EPOCH_DATE = Date.UTC(2026, 6, 15);

    const diffDays = Math.floor((targetUTC - EPOCH_DATE) / (1000 * 60 * 60 * 24));
    let index = diffDays % 8;
    if (index < 0) index += 8;

    const cycle = [
        { mode: 'attack', opp: 'Fire' },
        { mode: 'defense', opp: 'Fire' },
        { mode: 'attack', opp: 'Mountain' },
        { mode: 'defense', opp: 'Mountain' },
        { mode: 'attack', opp: 'Wind' },
        { mode: 'defense', opp: 'Wind' },
        { mode: 'attack', opp: 'Forest' },
        { mode: 'defense', opp: 'Forest' }
    ];

    return cycle[index];
}

// FIX DEFINITIVO: Regex per sostituire TUTTE le occorrenze in un solo colpo
export function parsePassiveText(template, lvData) {
    if (!template) return "";
    return Object.entries(lvData).reduce((text, [key, value]) => {
        const regex = new RegExp(`\\{${key.toUpperCase()}\\}`, 'g');
        return text.replace(regex, value);
    }, template);
}