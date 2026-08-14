import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "shawnFrosteInazumaJapan");

export const charData = {
    ...baseInfo,
    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 103,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 5524, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 4140, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 3108, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 2052, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'S' }, 
        { code: 5, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["エターナルブリザード", "ウルフレジェンド"],
    myBasicPassivesIds: ["100000101", "103010001", "103009003"],
    myRarityPassivesIds: ["100000501", "103009004"]
};