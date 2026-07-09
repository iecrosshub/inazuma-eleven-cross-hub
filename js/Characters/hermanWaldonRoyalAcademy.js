import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "hermanWaldonRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Herman Waldon",
    romanizedName: "Henmi Wataru",
    japaneseName: "辺見 渡",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 36, lv300: 2586, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 43, lv300: 3246, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv300: 1928, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv300: 1288, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv300: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 2, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 7, rank: 'B' }
    ],


    myTechniques: ["ジャッジスルー", "デスゾーン"],

    myBasicPassivesIds: ["100000201", "101022001", "101022003"],
    myRarityPassivesIds: ["100000501", "101022004"]
};