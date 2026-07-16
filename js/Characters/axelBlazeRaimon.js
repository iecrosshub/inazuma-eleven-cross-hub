import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "axelBlazeRaimon");

export const charData = {
    ...baseInfo,
    name: "Axel Blaze",
    romanizedName: "Gōenji Shūya",
    japaneseName: "豪炎寺 修也",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 106,

    zones: [
        { code: 3, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["ファイアトルネード", "ヒートタックル"],
    myBasicPassivesIds: ["100000101", "101010001", "101010003"],
    myRarityPassivesIds: ["100000501", "101010004"]
};