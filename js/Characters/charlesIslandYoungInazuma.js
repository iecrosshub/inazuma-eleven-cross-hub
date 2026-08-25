import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "charlesIslandYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Charles Island",
    romanizedName: "Ukishima Kazuto",
    japaneseName: "浮島 一人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Longshooter.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 21, lv320: 1454, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 38, lv320: 3048, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 49, lv320: 4172, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 36, lv320: 2888, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },


    zones: [
        { code: 9, rank: 'A' },
        { code: 8, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["炎の風見鶏", "サイクロン"],
    myBasicPassivesIds: ["100000301", "102045001", "102045003"],
    myRarityPassivesIds: ["100000501", "102045004"]
};