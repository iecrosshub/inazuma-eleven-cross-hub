import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "victoriaVanguardSecretService");

export const charData = {
    ...baseInfo,
    name: "Victoria Vanguard",
    romanizedName: "Zaizen Touko",
    japaneseName: "財前 塔子",

    tags: [
        "img/TagTitle/Icon_Tag_Team_SecretService.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv440: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 41, lv440: 5324, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 56, lv440: 7476, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 58, lv440: 7786, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 21, lv440: 2376, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv440: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 7, rank: 'S' },
        { code: 9, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["ザ・タワー", "パーフェクト・タワー"],
    myBasicPassivesIds: ["100000201", "102064001", "102064003"],
    myRarityPassivesIds: ["100000501", "102064004"]
};