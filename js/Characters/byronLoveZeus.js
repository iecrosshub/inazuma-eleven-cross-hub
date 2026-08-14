import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "byronLoveZeus");

export const charData = {
    ...baseInfo,
    name: "Byron Love",
    romanizedName: "Afuro Terumi",
    japaneseName: "亜風炉 照美",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 201,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 4976, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 6162, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 3068, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 2048, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 5, rank: 'S' }, 
        { code: 2, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["ゴッドノウズ", "ヘブンズタイム"],
    myBasicPassivesIds: ["100000201", "101164001", "101164003"],
    myRarityPassivesIds: ["100000501", "101164004"]
};