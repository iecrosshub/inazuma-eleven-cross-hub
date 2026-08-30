// --- js/Techniques/library.js ---

import { shootLibrary } from './shootLibrary.js';
import { dribbleLibrary } from './dribbleLibrary.js';
import { blockLibrary } from './blockLibrary.js';
import { catchLibrary } from './catchLibrary.js';

// 1. Uniamo tutte le tecniche in un unico oggetto
export const techniquesLibrary = {
    ...shootLibrary,
    ...dribbleLibrary,
    ...blockLibrary,
    ...catchLibrary
};

// 2. Il database degli Shop e degli Eventi
export const shopDatabase = {
    "Negozio club": [
        "バックトルネード",      // Tornado inverso
        "ジャッジスルー",        // Calcio stordente
        // "IN ATTESA",         // Furia stellare
        "サイクロン",            // Ciclone
        "ファントムシュート",    // Tiro fantasma
        "ジグザグスパーク",      // Fulmine zigzag
        "スーパー四股踏み",      // Super blocco difensivo
        "スピニングカット"       // Taglio roteante
    ],
    "Sfida online 11vs11": [
        "ファイアトルネード",    // Tornado di fuoco
        "烈風ダッシュ",         // Scatto infuocato
        "フレイムダンス",        // Danza del fuoco
        // "IN ATTESA",         // Raffica esplosiva
        "つちだるま",            // Tiro ninja a valanga
        "五里霧中",              // Tempesta di polvere
        "アースクェイク",        // Terremoto
        // "IN ATTESA"          // Artiglio selvaggio
    ],
    "Sfida online 5vs1": [
        // "IN ATTESA",         // Tuono del vulcano
        "ザ・ウォール",          // Muro di roccia
        "グレネードショット",    // Tiro fulminante
        "ドラゴンクラッシュ",    // Dragon Crash
        "スピニングシュート",    // Tiro roteante
        "ターザンキック",        // Calcio di tarzan
        // "IN ATTESA",         // Ciclone incrociato
        "ゆがむ空間"             // Vortice magnetico
    ],
    "Shop Evento Shawn e Xavier": [
        "エターナルブリザード",  // Tormenta glaciale
        "疾風ダッシュ",          // Scatto repentino
        "コイルターン",          // Difesa a spirale
        "流星ブレード",          // Meteora dirompente
        "ヒートタックル",        // Dribbling rovente
        "スーパー四股踏み"       // Super blocco difensivo
    ],

    "Shop Evento Byron": [
        "ヘブンズタイム",        // Salto Temporale
        "ディバインアロー",      // Freccia Saettante
        "リフレクトバスター"     // Meteora Rimbalzante
    ],
    "Shop Evento Victor e Arion": [
        "そよかぜステップ",      // Giro di Vento
        // "IN ATTESA",         // Zona di Sicurezza
        "デスソード",            // Stoccata Micidiale
        "ファイアトルネード",    // Tornado di Fuoco
        "ジャッジスルー",        // Calcio Stordente
        "フレイムダンス"         // Danza del Fuoco
    ],
    "Shop Evento Goldie e Fey Prima Parte": [
        "バウンサーラビット（花火）", // Tiro Rimbalzante (Fuochi d'Artificio)
        "分身フェイント",             // Illusione Ottica
        "怨霊"                        // Palude di Mani
    ],
    "Shop Evento Goldie e Fey Seconda Parte": [
        "もちもち黄粉餅（花火）",     // Impasto di Goldie (Fuochi d'artificio)
        "ダッシュアクセル",           // Scatto Bruciante
        "ザ・ウォール"                // Muro di Roccia
    ],
    "Login Giornaliero Gabi e Riccardo": [
        "フォルテシモ",          // Tiro Sonoro
        "ザ・ミスト"             // Cinta di Nebbia
    ],
    "Shop Evento Silvia, Celia e Nelly": [
        "イリュージョンボール",  // Grande Illusione
        "キラースライド"         // Scivolata Micidiale
    ]
};

// 3. LOGICA AUTOMATICA: Estrae le chiavi uniche e inietta il campo "shop" nelle tecniche
const manualKeysSet = new Set();

for (const [shopName, techKeys] of Object.entries(shopDatabase)) {
    techKeys.forEach(key => {
        manualKeysSet.add(key); // Aggiunge la mossa alla lista dei manuali unici

        if (techniquesLibrary[key]) {
            // Se la mossa ha già uno shop assegnato, accodiamo il nuovo (es. Negozio Club / Evento Victor)
            if (techniquesLibrary[key].shop) {
                if (!techniquesLibrary[key].shop.includes(shopName)) {
                    techniquesLibrary[key].shop += ` / ${shopName}`;
                }
            } else {
                techniquesLibrary[key].shop = shopName;
            }
        }
    });
}

// Esportiamo la lista pulita e generata in automatico
export const universalManualsKeys = Array.from(manualKeysSet);