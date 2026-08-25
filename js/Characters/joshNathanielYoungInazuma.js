import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "joshNathanielYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Josh Nathaniel",
    romanizedName: "Nakama Yō",
    japaneseName: "中間 庸",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 36, lv340: 3128, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 43, lv340: 3926, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv340: 2332, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv340: 1556, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'A' },
        { code: 7, rank: 'A' },
        { code: 9, rank: 'B' }
    ],

    myTechniques: ["ジグザグスパーク", "ブレードアタック"],
    myBasicPassivesIds: ["100000201", "102049001", "102049003"],
    myRarityPassivesIds: ["100000501", "102049004"]
};