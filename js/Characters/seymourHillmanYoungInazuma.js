import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "seymourHillmanYoungInazuma");

export const charData = {
    ...baseInfo,
    name: "Seymour Hillman",
    romanizedName: "Hibiki Seigou",
    japaneseName: "響木 正剛",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Buffer.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv320: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 28, lv320: 2206, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 28, lv320: 2218, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 39, lv320: 3158, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 49, lv320: 4172, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv320: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },


    zones: [
        { code: 11, rank: 'A' },
        { code: 8, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["ゴッドハンド", "爆裂パンチ"],
    myBasicPassivesIds: ["100000401", "102044001", "102044003"],
    myRarityPassivesIds: ["100000501", "102044004"]
};