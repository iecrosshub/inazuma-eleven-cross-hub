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

    growth_pattern_code: 110,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 3682, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 3042, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 2084, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 1396, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    myTechniques: ["ターザンキック", "ダッシュアクセル"],
    myBasicPassivesIds: ["100000101", "101099001", "101099003"],
    myRarityPassivesIds: ["100000501", "101099004"]
};