import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "goldieLemmonCross");

export const charData = {
    ...baseInfo,
    name: "Goldie Lemmon",
    romanizedName: "Nanobana Kinako",
    japaneseName: "菜花 黄名子",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonGO.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_Cross.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 28, lv320: 2224, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 42, lv320: 3458, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 69, lv320: 6042, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 42, lv320: 3410, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 9, rank: 'S' },
        { code: 7, rank: 'A' },
        { code: 10, rank: 'B' }
    ],

    myTechniques: ["もちもち黄粉餅（花火）", "やきもちスクリュー（花火）"],
    myBasicPassivesIds: ["102055001", "100000301", "102055003"],
    myRarityPassivesIds: ["100000501", "102055004"]
};