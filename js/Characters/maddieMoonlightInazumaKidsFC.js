import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "maddieMoonlightInazumaKidsFC");

export const charData = {
    ...baseInfo,
    name: "Maddie Moonlight",
    romanizedName: "Kisaragi Mako",
    japaneseName: "如月 まこ",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaKidsFC.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 111,

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["彗星シュート", "ダッシュアクセル"],

    myBasicPassivesIds: ["100000101", "101077001", "101077003"],
    myRarityPassivesIds: ["100000501", "101077004"]
};