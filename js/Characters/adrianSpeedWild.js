import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "adrianSpeedWild");

export const charData = {
    ...baseInfo,
    name: "Adrian Speed",
    romanizedName: "Suizenji Chiita",
    japaneseName: "水前寺 馳威太",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Wild.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    zones: [
        { code: 3, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 2, rank: 'B' }
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 44, lv300: 3318, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 38, lv300: 2742, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 27, lv300: 1878, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1258, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    myTechniques: ["ターザンキック", "ダッシュアクセル"],

    myBasicPassivesIds: ["100000101", "101099001", "101099003"],
    myRarityPassivesIds: ["100000501", "101099004"]
};