import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "benSimmonsRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Ben Simmons",
    romanizedName: "Banjou Kazumichi",
    japaneseName: "万丈 一道",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 309,

    zones: [
        { code: 9, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 8, rank: 'B' }
    ],

    myTechniques: ["ジャッジスルー", "サイクロン"],

    myBasicPassivesIds: ["100000301", "101019001", "101019003"],
    myRarityPassivesIds: ["100000501", "101019004"]
};