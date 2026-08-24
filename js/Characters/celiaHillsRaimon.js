import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "celiaHillsRaimon");

export const charData = {
    ...baseInfo,
    name: "Celia Hills",
    romanizedName: "Otonashi Haruna",
    japaneseName: "音無 春奈",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 52, lv340: 4844, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 69, lv340: 6586, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 34, lv340: 2966, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 25, lv340: 1980, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 5, lv340: 5, icon: "img/Status/Icon_Status_Speed.png" }
    },

    // Zone standard per un Playmaker (MF)
    zones: [
        { code: 4, rank: 'S' },
        { code: 6, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["イリュージョンボール", "キラーフィールズ"],
    myBasicPassivesIds: ["100000201", "101167001", "101167003"],
    myRarityPassivesIds: ["100000501", "101167004"]
};