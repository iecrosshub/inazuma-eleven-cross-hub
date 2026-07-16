import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "alanMasterRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Alan Master",
    romanizedName: "Narukami Kenya",
    japaneseName: "成神 健也",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 212,

    zones: [
        { code: 4, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 7, rank: 'B' }
    ],

    myTechniques: ["キラースライド", "イリュージョンボール"],

    myBasicPassivesIds: ["100000201", "101020001", "101020003"],
    myRarityPassivesIds: ["100000501", "101020004"]
};