import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "davidSamfordInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "David Samford",
    romanizedName: "Sakuma Jirou",
    japaneseName: "佐久間 次郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    stats: {
        "TP": { lv1: 100, lv440: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 69, lv440: 9332, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 53, lv440: 6982, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 34, lv440: 4192, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 25, lv440: 2796, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv440: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' },
        { code: 2, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["皇帝ペンギン2号", "烈風ダッシュ"],

    myBasicPassivesIds: ["100000101", "103016001", "103016003"],
    myRarityPassivesIds: ["100000501", "103016004"]
};