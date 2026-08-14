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

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 4048, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 5524, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 3006, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 2004, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 4, rank: 'S' }, 
        { code: 6, rank: 'A' }, 
        { code: 5, rank: 'B' }  
    ],

    myTechniques: ["ジャッジスルー2", "キラーフィールズ"],
    myBasicPassivesIds: ["100000201", "103008001", "103008003"],
    myRarityPassivesIds: ["100000501", "103008004"]
};