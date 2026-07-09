import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thomasMurdockKirkwood");

export const charData = {
    ...baseInfo,
    name: "Thomas Murdock",
    romanizedName: "Tomo Mukata",
    japaneseName: "武方 友",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 51, lv300: 3882, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 39, lv300: 2910, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 31, lv300: 2184, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1444, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' },
        { code: 1, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["トライアングルＺ", "バックトルネード"],
    myBasicPassivesIds: ["100000101", "101153001", "101153003"],
    myRarityPassivesIds: ["100000501", "101153004"]
};