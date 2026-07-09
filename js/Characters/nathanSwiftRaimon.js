import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "nathanSwiftRaimon");

export const charData = {
    ...baseInfo,
    name: "Nathan Swift",
    romanizedName: "Kazemaru Ichirōta",
    japaneseName: "風丸 一郎太",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SideBack.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 21, lv300: 1312, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 38, lv300: 2748, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 49, lv300: 3760, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 36, lv300: 2602, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 4, rank: 'A' }, 
        { code: 8, rank: 'A' }, 
        { code: 1, rank: 'B' }  
    ],

    myTechniques: ["疾風ダッシュ", "クイックドロウ"],
    myBasicPassivesIds: ["100000301", "101002001", "101002003"],
    myRarityPassivesIds: ["100000501", "101002004"]
};