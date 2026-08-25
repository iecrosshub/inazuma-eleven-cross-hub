import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "zackWallside");

export const charData = {
    ...baseInfo,
    name: "Zack Wallside",
    romanizedName: "Kabeyama Saku",
    japaneseName: "壁山 サク",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Free.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 20, lv340: 1478, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 33, lv340: 2862, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 43, lv340: 3926, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 33, lv340: 2856, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    // Zone standard per un Difensore (DF)
    zones: [
        { code: 10, rank: 'A' },
        { code: 9, rank: 'A' },
        { code: 7, rank: 'B' }
    ],

    myTechniques: ["ザ・ウォール", "ダッシュアクセル"],
    myBasicPassivesIds: ["100000301", "101172001", "101172003"],
    myRarityPassivesIds: ["100000501", "101172004"]
};