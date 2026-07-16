import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "archerHawkinsInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Archer Hawkins",
    romanizedName: "Tobitaka Seiya",
    japaneseName: "飛鷹 征矢",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 305,

    zones: [
        { code: 7, rank: 'A' }, 
        { code: 9, rank: 'A' }, 
        { code: 8, rank: 'B' }  
    ],

    myTechniques: ["真空魔", "ジャッジスルー"],
    myBasicPassivesIds: ["100000301", "103007001", "103007003"],
    myRarityPassivesIds: ["100000501", "103007004"]
};