import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "danielHatchRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Daniel Hatch",
    romanizedName: "Terakado Daiki",
    japaneseName: "寺門 大貴",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 43, lv300: 3246, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 37, lv300: 2684, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv300: 1966, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 21, lv300: 1302, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["百烈ショット", "キラースライド"],

    myBasicPassivesIds: ["100000101", "101025001", "101025003"],
    myRarityPassivesIds: ["100000501", "101025004"]
};