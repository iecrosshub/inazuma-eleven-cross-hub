import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "bobbyShearerRaimon");

export const charData = {
    ...baseInfo,
    name: "Bobby Shearer",
    romanizedName: "Domon Asuka",
    japaneseName: "土門 飛鳥",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
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
        { code: 5, rank: 'A' }, // 4 = Centrocampo Sinistra
        { code: 8, rank: 'A' }, // 5 = Trequartista (Centro-alto)
        { code: 9, rank: 'B' }  // 7 = Mediano (Centro-basso)
    ],

    myTechniques: ["キラースライド", "スピニングカット"],
    myBasicPassivesIds: ["100000301", "101013001", "101013003"],
    myRarityPassivesIds: ["100000501", "101013004"]
};