import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "jackWallsideInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Jack Wallside",
    romanizedName: "Kabeyama Heigorō",
    japaneseName: "壁山 塀吾郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 303,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 1864, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 3724, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 5524, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 3712, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 9, rank: 'S' }, 
        { code: 7, rank: 'A' }, 
        { code: 10, rank: 'B' }  
    ],

    myTechniques: ["ザ・ウォール", "ザ・マウンテン"],

    myBasicPassivesIds: ["100000301", "103003001", "103003003"],
    myRarityPassivesIds: ["100000501", "103003004"]
};