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
    "ファイアトルネード", "ヒートタックル", "爆熱パンチ", "疾風ダッシュ", "ザ・ウォール",
    "ジグザグスパーク", "スピニングカット", "サイクロン", "グレネードショット", "スピニングシュート",
    "アースクエイク", "ジャッジスルー", "ザ・マウンテン", "旋風陣", "真空魔",
    "エターナルブリザード", "ボルケイノカット", "ターザンキック", "つむじ", "ゆがむ空間",
    "炎風ダッシュ", "フレイムダンス", "つちだるま", "五里霧中", "ワイルドクロウ",
    "バックトルネード", "アステロイドベルト", "ファントムシュート", "四股踏み", "スーパー四股踏み",
    "怨霊", "流星ブレード", "ヘブンズタイム", "リフレクトバスター", "つなみウォール",
    "裁きの鉄槌", "ディバインアロー", "そよかぜステップ", "デスソード", "プロファイルゾーン"
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