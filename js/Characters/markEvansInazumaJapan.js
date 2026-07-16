import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markEvansInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Mark Evans",
    romanizedName: "Endō Mamoru",
    japaneseName: "円堂 守",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Buffer.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 404,


    zones: [
        { code: 11, rank: 'S' }, 
        { code: 9, rank: 'A' }, 
        { code: 2, rank: 'B' }  
    ],

    myTechniques: ["ゴッドハンド", "怒りの鉄槌"],
    myBasicPassivesIds: ["100000401", "103001001", "103001003"],
    myRarityPassivesIds: ["100000501", "103001004"]
};