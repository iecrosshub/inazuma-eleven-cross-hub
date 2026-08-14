import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "kevinDragonflyInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Kevin Dragonfly",
    romanizedName: "Someoka Ryūgo",
    japaneseName: "染岡 竜吾",
    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],
    growth_pattern_code: 101,

    stats: {
        "TP": { lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv340: 5234, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv340: 4326, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv340: 3166, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv340: 2096, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv340: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 1, rank: 'S' }, 
        { code: 2, rank: 'A' }, 
        { code: 3, rank: 'B' }  
    ],

    myTechniques: ["ドラゴンクラッシュ", "ドラゴンスレイヤー"],
    myBasicPassivesIds: ["100000101", "103017001", "103017003"],
    myRarityPassivesIds: ["100000501", "103017004"]
};