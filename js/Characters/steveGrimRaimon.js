import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "steveGrimRaimon");

export const charData = {
    ...baseInfo,
    name: "Steve Grim",
    romanizedName: "Handa Shinichi",
    japaneseName: "半田 真一",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 37, lv300: 2662, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 44, lv300: 3318, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 27, lv300: 1836, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1230, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ジグザグスパーク", "サイクロン"],

    myBasicPassivesIds: ["100000201", "101006001", "101006003"],
    myRarityPassivesIds: ["100000501", "101006004"]
};