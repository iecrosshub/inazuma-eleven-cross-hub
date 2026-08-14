import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "feyRuneCross");

export const charData = {
    ...baseInfo,
    name: "Fey Rune",
    romanizedName: "Fei Rūn",
    japaneseName: "フェイ・ルーン",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonGO.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_Cross.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 69, lv320: 6060, lv340: 6606, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 54, lv320: 4534, lv340: 4942, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 34, lv320: 2724, lv340: 2968, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 25, lv320: 1818, lv340: 1980, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv320: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'S' },
        { code: 3, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["バウンサーラビット（花火）", "スカイウォーク（花火）"],
    myBasicPassivesIds: ["100000101", "110003001", "110003003"],
    myRarityPassivesIds: ["100000501", "110003004"]
};