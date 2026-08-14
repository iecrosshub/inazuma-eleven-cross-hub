import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markEvansJapanNationalTeam2026");

export const charData = {
    ...baseInfo,
    tags: [
        "img/TagTitle/Icon_Tag_Team_JapanNationalTeam2026.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_Cross.png"
    ],
    growth_pattern_code: 202,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 4292, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 5350, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 2960, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 1980, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 6, rank: 'S' }, 
        { code: 5, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["サムライショット", "サムライフェイント"],
    myBasicPassivesIds: ["100000201", "1010004001", "1010004003"],
    myRarityPassivesIds: ["100000501", "1010004004"]
};