import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "judeSharpInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Jude Sharp InazumaJapan",
    romanizedName: "Kidō Yūto",
    japaneseName: "鬼道 有人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 204,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 3866, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 5466, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 3316, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 1934, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' }, 
        { code: 7, rank: 'A' }, 
        { code: 2, rank: 'B' }  
    ],

    myTechniques: ["イリュージョンボール", "皇帝ペンギン2号"],
    myBasicPassivesIds: ["100000201", "103014001", "103014003"],
    myRarityPassivesIds: ["100000501", "103014004"]
};