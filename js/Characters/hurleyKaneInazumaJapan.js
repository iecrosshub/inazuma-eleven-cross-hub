import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "hurleyKaneInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Hurley Kane",
    romanizedName: "Tsunami Jōsuke",
    japaneseName: "綱海 条介",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Longshooter.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 21, lv300: 1386, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 37, lv300: 2682, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 49, lv300: 3678, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 37, lv300: 2676, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 8, rank: 'A' }, // 4 = Centrocampo Sinistra
        { code: 4, rank: 'A' }, // 5 = Trequartista (Centro-alto)
        { code: 7, rank: 'B' }  // 7 = Mediano (Centro-basso)
    ],

    myTechniques: ["ツナミブースト", "スピニングカット"],
    myBasicPassivesIds: ["100000301", "103004001", "103004003"],
    myRarityPassivesIds: ["100000501", "103004004"]
};