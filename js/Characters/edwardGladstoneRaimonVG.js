import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "edwardGladstoneRaimonVG");

export const charData = {
    ...baseInfo,
    name: "Edward Gladstone",
    romanizedName: "Ikari Gangorou",
    japaneseName: "碇 頑五郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_YoungInazuma.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle2.png"
    ],

    stats: {
        "TP": { lv1: 100, lv340: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 33, lv340: 2900, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 45, lv340: 4100, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 30, lv340: 2488, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 20, lv340: 1452, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 6, lv340: 6, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 4, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 7, rank: 'B' }
    ],

    myTechniques: ["ドラゴンクラッシュ", "ひとりワンツー"],
    myBasicPassivesIds: ["100000201", "102050001", "102050003"],
    myRarityPassivesIds: ["100000501", "102050004"]
};