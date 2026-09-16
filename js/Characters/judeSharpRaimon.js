import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "judeSharpRaimon");

export const charData = {
    ...baseInfo,
    name: "Jude Sharp",
    romanizedName: "Kidou Yuuto",
    japaneseName: "鬼道 有人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv440: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 43, lv440: 5460, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 58, lv440: 7722, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 38, lv440: 4684, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 24, lv440: 2730, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv440: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' },
        { code: 7, rank: 'A' },
        { code: 9, rank: 'B' }
    ],

    myTechniques: ["イリュージョンボール", "スピニングカット"],
    myBasicPassivesIds: ["100000801", "101169001", "101169003"],
    myRarityPassivesIds: ["100000501", "101169004"]
};