import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "johnBloomRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "John Bloom",
    romanizedName: "Sakiyama Shuuji",
    japaneseName: "咲山 修二",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 210,

    zones: [
        { code: 1, rank: 'A' },
        { code: 4, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["百烈ショット", "キラースライド"],

    myBasicPassivesIds: ["100000101", "101023001", "101023003"],
    myRarityPassivesIds: ["100000501", "101023004"]
};