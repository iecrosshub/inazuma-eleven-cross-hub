import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "erikEagleRaimon");

export const charData = {
    ...baseInfo,
    name: "Erik Eagle",
    romanizedName: "Ichinose Kazuya",
    japaneseName: "一之瀬 一哉",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 208,

    zones: [
        { code: 1, rank: 'A' }, 
        { code: 4, rank: 'A' }, 
        { code: 6, rank: 'B' }  
    ],

    myTechniques: ["スピニングシュート", "イリュージョンボール"],
    myBasicPassivesIds: ["100000201", "101016001", "101016003"],
    myRarityPassivesIds: ["100000501", "101016004"]
};