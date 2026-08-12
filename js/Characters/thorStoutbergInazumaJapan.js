import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thorStoutbergInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Thor Stoutberg",
    romanizedName: "Hijikata Raiden",
    japaneseName: "土方 雷電",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 306,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 1454, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 3048, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 4172, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 2888, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 7, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["スーパー四股踏み", "ブレードアタック"],
    myBasicPassivesIds: ["100000201", "103012001", "103012003"],
    myRarityPassivesIds: ["100000501", "103012004"]
};