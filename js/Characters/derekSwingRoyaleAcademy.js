import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "derekSwingRoyaleAcademy");

export const charData = {
    ...baseInfo,
    name: "Derek Swing",
    romanizedName: "Hōmen Shūichirō",
    japaneseName: "洞面 秀一郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyaleAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 36, lv300: 2586, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 43, lv300: 3246, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv300: 1928, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1288, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 3, rank: 'A' },
        { code: 5, rank: 'B' },
        { code: 7, rank: 'A' }
    ],

    myTechniques: ["分身フェイント", "デスゾーン"],

    myBasicPassivesIds: ["100000101", "101099001", "101099003"],
    myRarityPassivesIds: ["100000501", "101024004"]
};