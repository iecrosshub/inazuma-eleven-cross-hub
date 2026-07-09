import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "neilTurnerBrainwashing");

export const charData = {
    ...baseInfo,
    name: "Neil Turner",
    romanizedName: "Shimozuru Arata",
    japaneseName: "下鶴 改",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Brainwashing.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 49, lv300: 3678, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 40, lv300: 3042, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 32, lv300: 2226, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 23, lv300: 1474, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 4, lv300: 4, icon: "img/Status/Icon_Status_Speed.png" }
    },

    // Usa la griglia Zones corretta se l'hai definita altrove (questa è una base standard per gli Striker FW).
    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["パトリオットシュート", "ファイアトルネード"],
    myBasicPassivesIds: ["100000101", "101110001", "101110003"],
    myRarityPassivesIds: ["100000501", "101110004"]
};