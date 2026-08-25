import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "arthurSweetYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Arthur Sweet",
    romanizedName: "Aida Chikara",
    japaneseName: "会田 力",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 21, lv340: 1674, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 37, lv340: 3244, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 49, lv340: 4450, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 37, lv340: 3236, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 8, rank: 'A' },
        { code: 4, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["ザ・ウォール", "ドラゴンクラッシュ"],
    myBasicPassivesIds: ["100000301", "102047001", "102047003"],
    myRarityPassivesIds: ["100000501", "102047004"]
};