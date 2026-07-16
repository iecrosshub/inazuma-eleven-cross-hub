import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "danielHatchRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Daniel Hatch",
    romanizedName: "Terakado Daiki",
    japaneseName: "寺門 大貴",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 109,

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["百烈ショット", "キラースライド"],

    myBasicPassivesIds: ["100000101", "101025001", "101025003"],
    myRarityPassivesIds: ["100000501", "101025004"]
};