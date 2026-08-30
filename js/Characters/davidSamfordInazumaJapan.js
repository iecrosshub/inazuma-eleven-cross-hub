import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "davidSamfordInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "David Samford",
    romanizedName: "Sakuma Jirou",
    japaneseName: "佐久間 次郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    stats: {
        "TP": { lv1: "???", lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: "???", lv340: 22199, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: "???", lv340: 16399, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: "???", lv340: 10463, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: "???", lv340: 5880, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: "???", lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' },
        { code: 2, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["皇帝ペンギン2号", "烈風ダッシュ"],

    myBasicPassivesIds: ["100000101", "102173002", "102173003"],
    myRarityPassivesIds: ["100000501", "102173005"]
};