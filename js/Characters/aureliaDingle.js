import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "aureliaDingle");

export const charData = {
    ...baseInfo,
    name: "Aurelia Dingle",
    romanizedName: "Ootani Tsukushi",
    japaneseName: "大谷 つくし",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Free.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 37, lv340: 3286, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 50, lv340: 4646, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv340: 2820, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 21, lv340: 1644, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 4, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 7, rank: 'B' }
    ],

    myTechniques: ["スピニングカット", "疾風ダッシュ"],
    myBasicPassivesIds: ["100000201", "101175001", "101175003"],
    myRarityPassivesIds: ["100000501", "101175004"]
};