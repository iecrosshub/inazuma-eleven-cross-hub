import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markEvansRaimon");

export const charData = {
    ...baseInfo,
    name: "Mark Evans",
    romanizedName: "Endō Mamoru",
    japaneseName: "円堂 守",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Buffer.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 408,

    zones: [
        { code: 2, rank: 'B' },
        { code: 9, rank: 'A' },
        { code: 11, rank: 'A' }
    ],

    myTechniques: ["ゴッドハンド", "爆裂パンチ"],
    myBasicPassivesIds: ["100000401", "101001001", "101001003"],
    myRarityPassivesIds: ["100000501", "101001004"]
};