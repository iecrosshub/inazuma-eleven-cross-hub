import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "darrenLaChanceInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Darren LaChance",
    romanizedName: "Tachimukai Yūki",
    japaneseName: "立向居 勇気",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 402,

    zones: [
        { code: 11, rank: 'S' }, 
        { code: 9, rank: 'A' }, 
        { code: 8, rank: 'B' }  
    ],

    myTechniques: ["ゴッドハンド2", "ムゲン・ザ・ハンド"],
    myBasicPassivesIds: ["100000401", "103020001", "103020003"],
    myRarityPassivesIds: ["100000501", "103020004"]
};