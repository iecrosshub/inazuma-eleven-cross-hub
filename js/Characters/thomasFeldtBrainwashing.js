import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thomasFeldtBrainwashing");

export const charData = {
    ...baseInfo,
    name: "Thomas Feldt",
    romanizedName: "Sugimori Takeshi",
    japaneseName: "杉森 威",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Brainwashing.png",
        "img/TagTitle/Icon_Tag_Ability_Buffer.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 30, lv300: 2026, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 28, lv300: 2002, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 37, lv300: 2682, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 51, lv300: 3882, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv300: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    // Griglia base di esempio per un Portiere (GK)
    zones: [
        { code: 10, rank: 'B' },
        { code: 8, rank: 'A' },
        { code: 11, rank: 'A' }
    ],

    myTechniques: ["シュートポケット", "ロケットこぶし"],
    myBasicPassivesIds: ["100000401", "101100001", "101100003"],
    myRarityPassivesIds: ["100000501", "101100004"]
};