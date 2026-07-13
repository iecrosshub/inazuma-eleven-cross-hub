import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "poseidonZeus");

export const charData = {
    ...baseInfo,
    name: "Poseidon",
    romanizedName: "Posei Donichi",
    japaneseName: "歩星 呑一",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    stats: {
        "TP": { lv1: 100, lv300: 100, icon: "img/Status/Icon_Status_TP.png" },
        "Tiro": { lv1: 30, lv300: 2074, icon: "img/Status/Icon_Status_Kick.png" },
        "Tecnica": { lv1: 30, lv300: 2058, icon: "img/Status/Icon_Status_Technic.png" },
        "Blocco": { lv1: 38, lv300: 2780, icon: "img/Status/Icon_Status_Block.png" },
        "Parata": { lv1: 49, lv300: 3680, icon: "img/Status/Icon_Status_Catch.png" },
        "Velocità": { lv1: 2, lv300: 2, icon: "img/Status/Icon_Status_Speed.png" }
    },

    zones: [
        { code: 11, rank: 'A' },
        { code: 9, rank: 'A' },
        { code: 10, rank: 'B' }
    ],

    myTechniques: ["つなみウォール", "ギガントウォール"],
    myBasicPassivesIds: ["100000401", "101155001", "101155003"],
    myRarityPassivesIds: ["100000501", "101155004"]
};