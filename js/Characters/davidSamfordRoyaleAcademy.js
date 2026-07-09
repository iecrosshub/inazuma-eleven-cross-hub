import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "davidSamfordRoyaleAcademy");

export const charData = {
    ...baseInfo,
    name: "David Samford",
    romanizedName: "Sakuma Jirō",
    japaneseName: "佐久間 次郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyaleAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 47, lv300: 3596, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 43, lv300: 3156, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 31, lv300: 2150, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1434, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 5, lv300: 5, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["皇帝ペンギン2号", "キラースライド"],
    myBasicPassivesIds: ["100000101", "101027001", "101027003"],
    myRarityPassivesIds: ["100000501", "101027004"]
};