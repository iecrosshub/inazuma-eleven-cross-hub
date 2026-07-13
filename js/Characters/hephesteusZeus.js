import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "hephesteusZeus");

export const charData = {
    ...baseInfo,
    name: "Hephestus",
    romanizedName: "Bubai En",
    japaneseName: "部灰 炎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 20, lv300: 1222, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 33, lv300: 2368, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 43, lv300: 3246, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 33, lv300: 2362, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 3, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 10, rank: 'B' }
    ],

    myTechniques: ["裁きの鉄槌", "ダッシュストーム"],
    myBasicPassivesIds: ["100000201", "101158001", "101157003"],
    myRarityPassivesIds: ["100000501", "101157004"]
};