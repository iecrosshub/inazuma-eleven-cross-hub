import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "steveGrimRaimon");

export const charData = {
    ...baseInfo,
    name: "Steve Grim",
    romanizedName: "Handa Shinichi",
    japaneseName: "半田 真一",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 210,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 2954, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 3682, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 2038, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 1364, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ジグザグスパーク", "サイクロン"],

    myBasicPassivesIds: ["100000201", "101006001", "101006003"],
    myRarityPassivesIds: ["100000501", "101006004"]
};