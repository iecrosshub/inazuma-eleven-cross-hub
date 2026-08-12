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

    growth_pattern_code: 407,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 2248, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 2220, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 2976, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 4308, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 10, rank: 'B' },
        { code: 8, rank: 'A' },
        { code: 11, rank: 'A' }
    ],

    myTechniques: ["シュートポケット", "ロケットこぶし"],
    myBasicPassivesIds: ["100000401", "101100001", "101100003"],
    myRarityPassivesIds: ["100000501", "101100004"]
};