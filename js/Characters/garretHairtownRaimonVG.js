import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "garretHairtownRaimonVG");

export const charData = {
    ...baseInfo,
    name: "Garret Hairtown",
    romanizedName: "Kamimura Kirito",
    japaneseName: "髪村 切斗",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 20, lv340: 1478, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 33, lv340: 2862, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 43, lv340: 3926, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 33, lv340: 2856, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 9, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 6, rank: 'B' }
    ],

    myTechniques: ["スピニングカット", "残像"],
    myBasicPassivesIds: ["100000201", "102046001", "102046003"],
    myRarityPassivesIds: ["100000501", "102046004"]
};