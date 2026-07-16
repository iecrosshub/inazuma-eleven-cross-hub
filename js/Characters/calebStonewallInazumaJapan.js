import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "calebStonewallInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Caleb Stonewall",
    romanizedName: "Fudō Akio",
    japaneseName: "不動 明王",
    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],
    growth_pattern_code:203,

    zones: [
        { code: 4, rank: 'S' }, 
        { code: 6, rank: 'A' }, 
        { code: 5, rank: 'B' }  
    ],

    myTechniques: ["ジャッジスルー2", "キラーフィールズ"],
    myBasicPassivesIds: ["100000201", "103008001", "103008003"],
    myRarityPassivesIds: ["100000501", "103008004"]
};