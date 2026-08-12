import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "riccardoDiRigoRaimonGO");

export const charData = {
    ...baseInfo,
    name: "Riccardo Di Rigo",
    romanizedName: "Shindou Takuto",
    japaneseName: "神童 拓人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonGO.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEleGO.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 57, lv340: 1960, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 64, lv340: 4558, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv340: 2846, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 24, lv340: 1898, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' },
        { code: 7, rank: 'A' },
        { code: 2, rank: 'B' }
    ],

    myTechniques: ["フォルテシモ", "プレストターン"],
    myBasicPassivesIds: ["100000201", "101100001", "101100003"],
    myRarityPassivesIds: ["100000501", "101100004"]
};