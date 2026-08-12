import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "todIronsideRaimon");

export const charData = {
    ...baseInfo,
    name: "Tod Ironside",
    romanizedName: "Kurimatsu Teppei",
    japaneseName: "栗松 鉄平",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 309,

    stats: {
        "TP": { lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv320: 1356, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv320: 2626, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv320: 3602, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv320: 2620, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv320: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ダッシュアクセル", "彗星シュート"],

    myBasicPassivesIds: ["100000301", "101005001", "101005003"],
    myRarityPassivesIds: ["100000501", "101005004"]
};