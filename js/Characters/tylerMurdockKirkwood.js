import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "tylerMurdockKirkwood");

export const charData = {
    ...baseInfo,
    name: "Tyler Murdock",
    romanizedName: "Mukata Tsutomu",
    japaneseName: "武方 努",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 105,

    zones: [
        { code: 2, rank: 'A' }, 
        { code: 3, rank: 'A' }, 
        { code: 6, rank: 'B' }  
    ],

    myTechniques: ["スピニングカット", "トライアングルＺ"],
    myBasicPassivesIds: ["100000101", "101154001", "101154003"],
    myRarityPassivesIds: ["100000501", "101154004"]
};