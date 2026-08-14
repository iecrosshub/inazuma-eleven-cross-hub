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

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 3056, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 2828, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 3774, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 5408, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 11, rank: 'S' }, 
        { code: 9, rank: 'A' }, 
        { code: 2, rank: 'B' }  
    ],

    myTechniques: ["ゴッドハンド", "怒りの鉄槌"],
    myBasicPassivesIds: ["100000401", "103001001", "103001003"],
    myRarityPassivesIds: ["100000501", "103001004"]
};