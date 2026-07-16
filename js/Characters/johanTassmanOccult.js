import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "johanTassmanOccult");

export const charData = {
    ...baseInfo,
    name: "Johan Tassman",
    romanizedName: "Yūkoku Hiroyuki",
    japaneseName: "幽谷 博之",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Occult.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code:108,

    zones: [
        { code: 4, rank: 'A' },
        { code: 1, rank: '1' },
        { code: 2, rank: 'B' }
    ],

    myTechniques: ["ファントムシュート", "怨霊"],
    myBasicPassivesIds: ["100000101", "101086001", "101086003"],
    myRarityPassivesIds: ["100000501", "101086004"]
};