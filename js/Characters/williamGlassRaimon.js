import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "williamGlassRaimon");

export const charData = {
    ...baseInfo,
    name: "William Glass",
    romanizedName: "Megane Kakeru",
    japaneseName: "目金 欠流",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 110,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 3682, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 3042, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 2084, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 1396, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["クイックドロウ", "メガネクラッシュ"],

    myBasicPassivesIds: ["100000201", "101012001", "101012003"],
    myRarityPassivesIds: ["100000501", "101012004"]
};