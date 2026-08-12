import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thomasMurdockKirkwood");

export const charData = {
    ...baseInfo,
    name: "Thomas Murdock",
    romanizedName: "Mukata Tsutomu",
    japaneseName: "武方 努",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 107,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 4308, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 3230, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 2424, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 1602, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
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