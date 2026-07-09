import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "axelBlazeRaimon");

export const charData = {
    ...baseInfo,
    name: "Axel Blaze",
    romanizedName: "Gōenji Shūya",
    japaneseName: "豪炎寺 修也",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 49, lv300: 3760, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 41, lv300: 3108, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 31, lv300: 2128, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1426, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 3, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["ファイアトルネード", "ヒートタックル"],
    myBasicPassivesIds: ["100000101", "101010001", "101010003"],
    myRarityPassivesIds: ["100000501", "101010004"]
};