import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "nellyRaimonRaimon");

export const charData = {
    ...baseInfo,
    name: "Nelly Raimon",
    romanizedName: "Raimon Natsumi",
    japaneseName: "雷門 夏未",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 69, lv340: 6606, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 50, lv340: 4652, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 36, lv340: 3142, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 26, lv340: 2096, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 3, rank: 'S' },
        { code: 1, rank: 'A' },
        { code: 2, rank: 'B' }
    ],

    myTechniques: ["ファントムシュート", "ローズスプラッシュ"],
    myBasicPassivesIds: ["100000101", "101168001", "101168003"],
    myRarityPassivesIds: ["100000501", "101168004"]
};