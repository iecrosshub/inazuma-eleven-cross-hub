import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "gregorySmith");

export const charData = {
    ...baseInfo,
    name: "Gregory Smith",
    romanizedName: "Smith",
    japaneseName: "鬼瓦 源五郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Free.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 26, lv340: 2162, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 26, lv340: 2136, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv340: 2862, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 45, lv340: 4144, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv340: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 11, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["ゴッドハンド", "ヒートタックル"],
    myBasicPassivesIds: ["100000401", "101174001", "101174003"],
    myRarityPassivesIds: ["100000501", "101174004"]
};