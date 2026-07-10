import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "victorBladeRaimonGO");

export const charData = {
    ...baseInfo,
    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonGO.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEleGO.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 69, lv300: 5460, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 50, lv300: 3846, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 36, lv300: 2598, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 26, lv300: 1734, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'S' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["デスソード", "デスドロップ"],

    myBasicPassivesIds: ["101200001", "101200002", "101200003"],
    myRarityPassivesIds: ["101200004", "100000501"]
};