import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "aresZeus");

export const charData = {
    ...baseInfo,
    name: "Ares",
    romanizedName: "Arasu Ran",
    japaneseName: "荒須 乱",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 18, lv300: 1086, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 31, lv300: 2158, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 45, lv300: 3390, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 34, lv300: 2488, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 5, lv300: 5, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 9, rank: 'A' },
        { code: 8, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["裁きの鉄槌", "アースクェイク"],
    myBasicPassivesIds: ["100000301", "101158001", "101158003"],
    myRarityPassivesIds: ["100000501", "101158004"]
};