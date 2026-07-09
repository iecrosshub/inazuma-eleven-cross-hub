import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "maddieMoonlightInazumaKidsFC");

export const charData = {
    ...baseInfo,
    name: "Maddie Moonlight",
    romanizedName: "Kisaragi Mako",
    japaneseName: "如月 まこ",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaKidsFC.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 45, lv300: 3426, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 36, lv300: 2570, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv300: 1928, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1274, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["彗星シュート", "ダッシュアクセル"],

    myBasicPassivesIds: ["100000101", "101077001", "101077003"],
    myRarityPassivesIds: ["100000501", "101077004"]
};