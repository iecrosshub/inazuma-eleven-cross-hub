import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "judeSharpRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Jude Sharp",
    romanizedName: "Kidō Yūto",
    japaneseName: "鬼道 有人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 37, lv300: 2718, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 50, lv300: 3842, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv300: 2332, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 21, lv300: 1360, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' }, 
        { code: 5, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["イリュージョンボール", "ツインブースト"],
    myBasicPassivesIds: ["100000201", "101026001", "101026003"],
    myRarityPassivesIds: ["100000501", "101026004"]
};