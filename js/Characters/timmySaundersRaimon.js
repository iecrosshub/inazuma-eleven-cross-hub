import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "timmySaundersRaimon");

export const charData = {
    ...baseInfo,
    name: "Timmy Saunders",
    romanizedName: "Shourinji Ayumu",
    japaneseName: "少林寺 歩",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 33, lv300: 2398, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 45, lv300: 3390, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 30, lv300: 2058, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1202, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'A' },
        { code: 7, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["竜巻旋風", "分身フェイント"],

    myBasicPassivesIds: ["100000201", "101006001", "101007003"],
    myRarityPassivesIds: ["100000501", "101007004"]
};