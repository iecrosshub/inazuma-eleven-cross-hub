import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "marvinMurdockKirkwood");

export const charData = {
    ...baseInfo,
    name: "Marvin Murdock",
    romanizedName: "Mukata Masaru",
    japaneseName: "武方 勝",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 106,

    zones: [
        { code: 2, rank: 'A' },
        { code: 1, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["トライアングルＺ", "イリュージョンボール"],
    myBasicPassivesIds: ["100000101", "101152001", "101152003"],
    myRarityPassivesIds: ["100000501", "101152004"]
};