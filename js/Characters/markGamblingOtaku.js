import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markGamblingOtaku");

export const charData = {
    ...baseInfo,
    name: "Mark Gambling",
    romanizedName: "Manga Moe",
    japaneseName: "漫画 萌",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Otaku.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 44, lv300: 3318, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 38, lv300: 2742, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 27, lv300: 1878, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1258, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 3, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["ド根性バット", "五里霧中"],

    myBasicPassivesIds: ["100000101", "101120001", "101120003"],
    myRarityPassivesIds: ["100000501", "101120004"]
};