import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "malcolmNightKirkwood");

export const charData = {
    ...baseInfo,
    name: "Malcolm Night",
    romanizedName: "Nishigaki Mamoru",
    japaneseName: "西垣 守",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 21, lv340: 1586, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 38, lv340: 3322, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 49, lv340: 4548, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 36, lv340: 3148, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    // Zone standard per un Difensore (DF)
    zones: [
        { code: 7, rank: 'A' },
        { code: 8, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["スピニングカット", "ダッシュアクセル"],
    myBasicPassivesIds: ["100000301", "101145001", "101145003"],
    myRarityPassivesIds: ["100000501", "101145004"]
};