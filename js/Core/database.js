// js/Core/database.js

import { characterRegistry } from '../Characters/registry.js';
import { techniquesLibrary } from '../Techniques/library.js';
import { passivesLibrary as basePassivesLibrary } from '../Passive/library.js';
import { rerollPassivesByRole } from '../Passive/passivesReroll/passivesReroll.js';

const allRerollPassives = [
    ...(rerollPassivesByRole.FW || []),
    ...(rerollPassivesByRole.MF || []),
    ...(rerollPassivesByRole.DF || []),
    ...(rerollPassivesByRole.GK || [])
];

export const passivesLibrary = [...basePassivesLibrary, ...allRerollPassives];

export { characterRegistry, techniquesLibrary, rerollPassivesByRole };

export const universalManualsKeys = [
    // --- PARATA (4) ---
    "爆裂パンチ",           // Bakunetsu Punch (Pugno di Fuoco)
    "ゆがむ空間",           // Yugamu Kuukan (Spazio Distorto)
    "ワイルドクロウ",         // Wild Claw (Artiglio Selvaggio)
    "つなみウォール",         // Tsunami Wall (Barriera d'Acqua)

    // --- BLOCCO (17) ---
    "怨霊",                 // Onryou (Palude di Mani)
    "裁きの鉄槌",           // Sabaki no Tettsui (Piede del Giudizio)
    "つむじ",               // Tsumuji (Vortice)
    "ザ・ウォール",          // The Wall (Il Muro)
    "スピニングカット",       // Spinning Cut (Taglio Rotante)
    "サイクロン",            // Cyclone (Ciclone)
    "アースクエイク",         // Earthquake (Terremoto)
    "ザ・マウンテン",         // The Mountain (La Montagna)
    "旋風陣",               // Senpuujin (Turbine)
    "ボルケイノカット",       // Volcano Cut (Taglio Vulcanico)
    "フレイムダンス",         // Flame Dance (Danza di Fuoco)
    "アステロイドベルト",      // Asteroid Belt (Fascia di Asteroidi)
    "四股踏み",              // Shikofumi (Scossa di Terremoto)
    "スーパー四股踏み",       // Super Shikofumi (Super Scossa di Terremoto)
    "プロファイルゾーン",      // Profile Zone (Zona Profilo)
    "つちだるま",            // Tsuchidaruma (Pupazzo di Fango)

    // --- DRIBBLING (8) ---
    "ヒートタックル",         // Heat Tackle (Tackle di Fuoco)
    "疾風ダッシュ",          // Shippuu Dash (Scatto Ventoso)
    "ジグザグスパーク",       // Zigzag Spark (Scintilla Zigzag)
    "ジャッジスルー",         // Judge Through (Passaggio del Giudizio)
    "炎風ダッシュ",          // Enpuu Dash (Scatto Infuocato)
    "五里霧中",              // Gorimuchuu (Nebbia Illusoria)
    "ヘブンズタイム",         // Heaven's Time (Istante Divino)
    "そよかぜステップ",       // Soyokaze Step (Passo del Vento)

    // --- TIRO (12) ---
    "ファイアトルネード",      // Fire Tornado (Tornado di Fuoco)
    "グレネードショット",      // Grenade Shot (Tiro Granata)
    "スピニングシュート",      // Spinning Shoot (Tiro Rotante)
    "エターナルブリザード",    // Eternal Blizzard (Tormenta Glaciale)
    "ターザンキック",         // Tarzan Kick (Calcio di Tarzan)
    "バックトルネード",       // Back Tornado (Tornado Inverso)
    "ファントムシュート",      // Phantom Shoot (Tiro Fantasma)
    "流星ブレード",          // Ryuusei Blade (Meteora Dirompente)
    "リフレクトバスター",      // Reflect Buster (Tiro Riflesso)
    "ディバインアロー",       // Divine Arrow (Freccia Divina)
    "デスソード",            // Death Sword (Stoccata Micidiale)
    "ドラゴンクラッシュ"       // Dragon Crash (Drago Nascente)
];

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