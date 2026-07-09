import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "johanTassmanOccult");

export const charData = {
    ...baseInfo,
    name: "Johan Tassman",
    romanizedName: "Yūkoku Hiroyuki",
    japaneseName: "幽谷 博之",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Occult.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 47, lv300: 3596, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 43, lv300: 3156, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 31, lv300: 2150, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1434, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 5, lv300: 5, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 4, rank: 'A' },
        { code: 1, rank: '1' },
        { code: 2, rank: 'B' }
    ],

    myTechniques: ["ファントムシュート", "怨霊"],
    myBasicPassivesIds: ["100000101", "101086001", "101086003"],
    myRarityPassivesIds: ["100000501", "101086004"]
};