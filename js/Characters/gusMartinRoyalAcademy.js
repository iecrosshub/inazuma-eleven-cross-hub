import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "gusMartinRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Gus Martin",
    romanizedName: "Gojou Takeyuki",
    japaneseName: "五条 勝",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 310,

    zones: [
        { code: 6, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 9, rank: 'B' }
    ],

    myTechniques: ["キラースライド", "イリュージョンボール"],

    myBasicPassivesIds: ["100000201", "101020001", "101020003"],
    myRarityPassivesIds: ["100000501", "101020004"]
};