import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "bellatrixGenesis");

export const charData = {
    ...baseInfo,
    name: "Bellatrix",
    romanizedName: "Urubida",
    japaneseName: "ウルビダ",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Genesis.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv440: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 57, lv440: 7558, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 64, lv440: 8706, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv440: 4020, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 24, lv440: 2678, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv440: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' },
        { code: 2, rank: 'A' },
        { code: 7, rank: 'B' }
    ],

    myTechniques: ["メテオシャワー", "スペースペンギン"],
    myBasicPassivesIds: ["100000101", "102042001", "102042003"],
    myRarityPassivesIds: ["100000501", "102042004"]
};