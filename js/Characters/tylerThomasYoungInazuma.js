import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "tylerThomasYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Tyler Thomas",
    romanizedName: "Sadayoshi Tamotsu",
    japaneseName: "定良 保",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 37, lv320: 2954, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 44, lv320: 3682, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 27, lv320: 2038, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv320: 1364, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv320: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["イリュージョンボール", "クロスドライブ"],
    myBasicPassivesIds: ["100000201", "102051001", "102051003"],
    myRarityPassivesIds: ["100000501", "102051004"]
};