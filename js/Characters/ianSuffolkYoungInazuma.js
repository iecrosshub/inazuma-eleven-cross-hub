import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "ianSuffolkYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Ian Suffolk",
    romanizedName: "Sugata Gen",
    japaneseName: "菅田 厳",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 34, lv320: 2786, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 45, lv320: 3802, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 27, lv320: 2070, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv320: 1380, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv320: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },


    zones: [
        { code: 2, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 7, rank: 'B' }
    ],

    myTechniques: ["炎の風見鶏", "ヒートタックル"],
    myBasicPassivesIds: ["100000201", "102053001", "102053003"],
    myRarityPassivesIds: ["100000501", "102053004"]
};