import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "peterMildredYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Peter Mildred",
    romanizedName: "Batora Shi",
    japaneseName: "場寅 仕",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 37, lv340: 3286, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 50, lv340: 4646, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 33, lv340: 2820, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 21, lv340: 1644, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ブレードアタック", "残像"],
    myBasicPassivesIds: ["100000201", "102048001", "102048003"],
    myRarityPassivesIds: ["100000501", "102048004"]
};