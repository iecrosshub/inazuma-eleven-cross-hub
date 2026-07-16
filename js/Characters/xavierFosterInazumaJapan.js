import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "xavierFosterInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Xavier Foster",
    romanizedName: "Kiyama Hiroto",
    japaneseName: "基山 ヒロト",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code:101,

    zones: [
        { code: 2, rank: 'S' }, 
        { code: 3, rank: 'A' }, 
        { code: 6, rank: 'B' }  
    ],

    myTechniques: ["流星ブレード", "天空落とし"],
    myBasicPassivesIds: ["100000101", "103018001", "103018003"],
    myRarityPassivesIds: ["100000501", "103018004"]
};