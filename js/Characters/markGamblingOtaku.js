import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markGamblingOtaku");

export const charData = {
    ...baseInfo,
    name: "Mark Gambling",
    romanizedName: "Manga Moe",
    japaneseName: "漫画 萌",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Otaku.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 110,


    zones: [
        { code: 3, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["ド根性バット", "五里霧中"],

    myBasicPassivesIds: ["100000101", "101120001", "101120003"],
    myRarityPassivesIds: ["100000501", "101120004"]
};