import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "dionysusZeus");

export const charData = {
    ...baseInfo,
    name: "Dionysus",
    romanizedName: "Teyo Geki",
    japaneseName: "手魚 激",

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
        { code: 10, rank: 'A' },
        { code: 9, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["アースクェイク", "ジグザグスパーク"],
    myBasicPassivesIds: ["100000301", "103007001", "101159004"],
    myRarityPassivesIds: ["100000501","101158004"]
};