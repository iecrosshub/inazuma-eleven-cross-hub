import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "samKincaidRaimon");

export const charData = {
    ...baseInfo,
    name: "Sam Kincaid",
    romanizedName: "Shishido Sakichi",
    japaneseName: "宍戸 佐吉",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
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
        { code: 6, rank: 'A' },
        { code: 7, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["グレネードショット", "分身フェイント"],

    myBasicPassivesIds: ["100000201", "101008001", "101008003"],
    myRarityPassivesIds: ["100000501", "101008004"]
};