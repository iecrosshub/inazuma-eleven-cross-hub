import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "shadowFeldtRaimon");

export const charData = {
    ...baseInfo,
    name: "Shadow Feldt",
    romanizedName: "Yamino Kageto",
    japaneseName: "闇野 カゲト",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
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
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["ダークトルネード", "クイックドロウ"],
    myBasicPassivesIds: ["100000101", "101040001", "101040003"],
    myRarityPassivesIds: ["100000501", "101040004"]
};