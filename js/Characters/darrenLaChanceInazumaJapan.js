import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "darrenLaChanceInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Darren LaChance",
    romanizedName: "Tachimukai Yūki",
    japaneseName: "立向居 勇気",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 402,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 2828, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 2842, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 4048, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 5350, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 11, rank: 'S' }, 
        { code: 9, rank: 'A' }, 
        { code: 8, rank: 'B' }  
    ],

    myTechniques: ["ゴッドハンド2", "ムゲン・ザ・ハンド"],
    myBasicPassivesIds: ["100000401", "103020001", "103020003"],
    myRarityPassivesIds: ["100000501", "103020004"]
};