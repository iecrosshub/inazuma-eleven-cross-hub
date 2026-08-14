import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "xavierFosterInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Xavier Foster",
    romanizedName: "Kiyama Hiroto",
    japaneseName: "基山 ヒロト",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 101,

    stats: {
        "TP": { lv320: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 4802, lv340: 5234, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 3970, lv340: 4326, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 2906, lv340: 3166, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 1924, lv340: 2096, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'S' },
        { code: 3, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["流星ブレード", "天空落とし"],
    myBasicPassivesIds: ["100000101", "103018001", "103018003"],
    myRarityPassivesIds: ["100000501", "103018004"]
};