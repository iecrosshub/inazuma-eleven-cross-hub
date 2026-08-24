import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "silviaWoodsRaimon");

export const charData = {
    ...baseInfo,
    name: "Silvia Woods",
    romanizedName: "Kino Aki",
    japaneseName: "木野 秋",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 32, lv340: 2764, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 36, lv340: 3168, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 46, lv340: 4222, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 69, lv340: 6586, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv340: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 11, rank: 'S' },
        { code: 10, rank: 'A' },
        { code: 8, rank: 'B' }
    ],

    myTechniques: ["熱血パンチ", "ゴッドハンド"],
    myBasicPassivesIds: ["100000401", "101166001", "101166003"],
    myRarityPassivesIds: ["100000501", "101166004"]
};