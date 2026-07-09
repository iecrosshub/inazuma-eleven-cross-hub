import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "todIronsideInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Tod Ironside",
    romanizedName: "Kurimatsu Teppei",
    japaneseName: "栗松 鉄平",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 21, lv300: 1312, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 38, lv300: 2748, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 49, lv300: 3760, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 36, lv300: 2602, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'A' }, 
        { code: 10, rank: 'A' }, 
        { code: 3, rank: 'B' }  
    ],

    myTechniques: ["まぼろしドリブル", "スピニングカット"],
    myBasicPassivesIds: ["100000301", "103005001", "103005003"],
    myRarityPassivesIds: ["100000501", "103005004"]
};