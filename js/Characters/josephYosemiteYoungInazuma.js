import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "josephYosemiteYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Joseph Yosemite",
    romanizedName: "Taniyama Yō",
    japaneseName: "民山 謡",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 45, lv320: 3802, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 36, lv320: 2850, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv320: 2140, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv320: 1414, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["クロスドライブ", "イナズマ落とし"],
    myBasicPassivesIds: ["100000101", "102052001", "102052003"],
    myRarityPassivesIds: ["100000501", "102052004"]
};