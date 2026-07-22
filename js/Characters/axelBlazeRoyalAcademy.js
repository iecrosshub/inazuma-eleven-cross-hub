import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "axelBlazeRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Axel Blaze RoyalAcademy",
    romanizedName: "Gōenji Shūya",
    japaneseName: "豪炎寺 修也",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png", // (O il tag squadra appropriato della Royal)
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_Cross.png"
    ],

    // Aggiornato con il nuovo livello massimo 320
    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 69, lv320: 6060, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 54, lv320: 4534, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 34, lv320: 2724, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 25, lv320: 1818, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'S' },
        { code: 1, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["ファイアトルネード", "インフェルノペンギン"],
    myBasicPassivesIds: ["100000101", "101150001", "101150002"],
    myRarityPassivesIds: ["100000501", "101150003"]
};