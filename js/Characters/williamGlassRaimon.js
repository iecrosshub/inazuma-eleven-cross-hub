import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "williamGlassRaimon");

export const charData = {
    ...baseInfo,
    name: "William Glass",
    romanizedName: "Megane Kakeru",
    japaneseName: "目金 欠流",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 110,

    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["クイックドロウ", "メガネクラッシュ"],

    myBasicPassivesIds: ["100000201", "101012001", "101012003"],
    myRarityPassivesIds: ["100000501", "101012004"]
};