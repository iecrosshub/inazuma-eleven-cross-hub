import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "apoloZeus");

export const charData = {
    ...baseInfo,
    name: "Apolo",
    romanizedName: "Aporo Hikaru",
    japaneseName: "阿保露 光",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 19, lv300: 1158, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 33, lv300: 2426, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 44, lv300: 3318, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 32, lv300: 2298, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 4, rank: 'A' },
        { code: 8, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["裁きの鉄槌", "ダッシュストーム"],
    myBasicPassivesIds: ["100000301", "101156001", "101156003"],
    myRarityPassivesIds: ["100000501", "101156004"]
};