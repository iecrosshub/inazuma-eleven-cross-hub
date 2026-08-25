import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "sonnyRaimon");

export const charData = {
    ...baseInfo,
    name: "Sonny Raimon",
    romanizedName: "Raimon Souichirou",
    japaneseName: "雷門 総一郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Free.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 45, lv340: 4144, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 36, lv340: 3108, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 28, lv340: 2332, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv340: 1540, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 9, rank: 'A' },
        { code: 11, rank: 'A' },
        { code: 10, rank: 'B' }
    ],

    myTechniques: ["グレネードショット", "ダークトルネード"],
    myBasicPassivesIds: ["100000101", "101173001", "101173003"],
    myRarityPassivesIds: ["100000501", "101173004"]
};