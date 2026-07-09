import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "tylerMurdockKirkwood");

export const charData = {
    ...baseInfo,
    name: "Tyler Murdock",
    romanizedName: "Mukata Tsutomu",
    japaneseName: "武方 努",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 49, lv300: 3678, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 40, lv300: 3042, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 32, lv300: 2226, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1474, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' }, // 4 = Centrocampo Sinistra
        { code: 3, rank: 'A' }, // 5 = Trequartista (Centro-alto)
        { code: 6, rank: 'B' }  // 7 = Mediano (Centro-basso)
    ],

    myTechniques: ["スピニングカット", "トライアングルＺ"],
    myBasicPassivesIds: ["100000101", "101154001", "101154003"],
    myRarityPassivesIds: ["100000501", "101154004"]
};