import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "juliaBlaze");

export const charData = {
    ...baseInfo,
    name: "Julia Blaze",
    romanizedName: "Gouenji Yuuka",
    japaneseName: "豪炎寺 夕香",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Free.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 36, lv340: 3128, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 43, lv340: 3926, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv340: 2332, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv340: 1556, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    // Zone standard per un Playmaker (MF)
    zones: [
        { code: 5, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ひとりワンツー", "ファイアトルネード"],
    myBasicPassivesIds: ["100000201", "101171001", "101171003"],
    myRarityPassivesIds: ["100000501", "101171004"]
};