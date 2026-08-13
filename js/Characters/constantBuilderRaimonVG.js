import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "constantBuilderRaimonVG");

export const charData = {
    ...baseInfo,
    name: "Constant Builder",
    romanizedName: "Bireuda Koichi",
    japaneseName: "備流田 光一",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 49, lv340: 4548, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 41, lv340: 3758, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 31, lv340: 2574, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv340: 1722, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["炎の風見鶏", "ヒートタックル"],
    myBasicPassivesIds: ["100000101", "102054001", "102054003"],
    myRarityPassivesIds: ["100000501", "102054004"]
};