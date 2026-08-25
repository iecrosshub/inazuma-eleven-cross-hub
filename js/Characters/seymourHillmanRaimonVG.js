import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "SeymourHillmanRaimonVG");

export const charData = {
    ...baseInfo,
    name: "Seymour Hillman Adulto",
    romanizedName: "Hibiki Seigou",
    japaneseName: "響木 正剛",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RaimonVeterans.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 30, lv340: 2448, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 28, lv340: 2420, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 37, lv340: 3244, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 51, lv340: 4696, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv340: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 11, rank: 'A' },
        { code: 8, rank: 'A' },
        { code: 4, rank: 'B' }

    ],

    myTechniques: ["ゴッドハンド", "爆裂パンチ"],
    myBasicPassivesIds: ["100000401", "101170001", "101170003"],
    myRarityPassivesIds: ["100000501", "101170004"]
};