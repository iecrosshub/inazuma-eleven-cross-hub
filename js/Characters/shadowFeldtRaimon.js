import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "shadowFeldtRaimon");

export const charData = {
    ...baseInfo,
    name: "Shadow Feldt",
    romanizedName: "Yamino Kageto",
    japaneseName: "闇野 カゲト",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 105,


    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["ダークトルネード", "クイックドロウ"],
    myBasicPassivesIds: ["100000101", "101040001", "101040003"],
    myRarityPassivesIds: ["100000501", "101040004"]
};