import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "arionSherwindRaimonGO");

export const charData = {
    ...baseInfo,
    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonGO.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEleGO.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 52, lv300: 4004, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 69, lv300: 5444, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 34, lv300: 2454, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 25, lv300: 1638, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 5, lv300: 5, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 7, rank: 'S' },
        { code: 5, rank: 'A' },
        { code: 2, rank: 'B' }
    ],

    myTechniques: ["そよかぜステップ", "マッハウインド"],

    myBasicPassivesIds: ["103030004", "100000201", "103030003"],
    myRarityPassivesIds: ["100000501", "103030001"]
};