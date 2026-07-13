import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "athenaZeus");

export const charData = {
    ...baseInfo,
    name: "Athena",
    romanizedName: "Asuka Tomo",
    japaneseName: "明天名 智",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 39, lv300: 2930, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 49, lv300: 3678, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 31, lv300: 2184, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1458, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 3, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["リフレクトバスター", "スピニングカット"],
    myBasicPassivesIds: ["100000201", "101154001", "101162003"],
    myRarityPassivesIds: ["100000501", "101027004"]
};