import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "davidSamfordRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "David Samford",
    romanizedName: "Sakuma Jirō",
    japaneseName: "佐久間 次郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 108,

    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["皇帝ペンギン2号", "キラースライド"],
    myBasicPassivesIds: ["100000101", "101027001", "101027003"],
    myRarityPassivesIds: ["100000501", "101027004"]
};