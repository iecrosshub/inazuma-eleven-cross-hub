import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "erikEagleRaimon");

export const charData = {
    ...baseInfo,
    name: "Erik Eagle",
    romanizedName: "Ichinose Kazuya",
    japaneseName: "一之瀬 一哉",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 37, lv300: 2718, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 50, lv300: 3842, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv300: 2332, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 21, lv300: 1360, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 1, rank: 'A' }, // 4 = Centrocampo Sinistra
        { code: 4, rank: 'A' }, // 5 = Trequartista (Centro-alto)
        { code: 6, rank: 'B' }  // 7 = Mediano (Centro-basso)
    ],

    myTechniques: ["スピニングシュート", "イリュージョンボール"],
    myBasicPassivesIds: ["100000201", "101016001", "101016003"],
    myRarityPassivesIds: ["100000501", "101016004"]
};