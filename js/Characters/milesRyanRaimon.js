import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "milesRyanRaimon");

export const charData = {
    ...baseInfo,
    name: "Miles Ryan",
    romanizedName: "Miyasaka Ryou",
    japaneseName: "宮坂 了",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SideBack.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 19, lv300: 1158, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 33, lv300: 2426, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 44, lv300: 3318, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 32, lv300: 2298, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 10, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["疾風ダッシュ", "サイクロン"],

    myBasicPassivesIds: ["100000301", "101041001", "101041003"],
    myRarityPassivesIds: ["100000501", "101041004"]
};