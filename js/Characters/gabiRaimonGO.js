import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "gabiRaimonGO");

export const charData = {
    ...baseInfo,
    name: "Gabi Garcia",
    romanizedName: "Kirino Ranmaru",
    japaneseName: "霧野 蘭丸",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonGO.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEleGO.png"
    ],


    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 25, lv320: 1960, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 49, lv320: 4558, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1:69, lv320: 6586, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1:38, lv320: 3392, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 9, rank: 'S' },
        { code: 7, rank: 'A' },
        { code: 8, rank: 'B' }
    ],

    myTechniques: ["ザ・ミスト", "ディープミスト"],
    myBasicPassivesIds: ["100000301", "104003001", "104003003"],
    myRarityPassivesIds: ["100000501", "104003004"]
};