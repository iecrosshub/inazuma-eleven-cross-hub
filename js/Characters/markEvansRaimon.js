import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markEvansRaimon");

export const charData = {
    ...baseInfo,
    name: "Mark Evans",
    romanizedName: "Endō Mamoru",
    japaneseName: "円堂 守",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Buffer.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 31, lv300: 2150, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 28, lv300: 1988, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 37, lv300: 2654, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 50, lv300: 3800, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv300: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'B' },
        { code: 9, rank: 'A' },
        { code: 11, rank: 'A' }
    ],

    myTechniques: ["ゴッドハンド", "爆裂パンチ"],
    myBasicPassivesIds: ["100000401", "101001001", "101001003"],
    myRarityPassivesIds: ["100000501", "101001004"]
};