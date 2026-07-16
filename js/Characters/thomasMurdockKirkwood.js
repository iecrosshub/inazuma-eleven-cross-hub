import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thomasMurdockKirkwood");

export const charData = {
    ...baseInfo,
    name: "Thomas Murdock",
    romanizedName: "Tomo Mukata",
    japaneseName: "武方 友",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Kirkwood.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 107,

    zones: [
        { code: 2, rank: 'A' },
        { code: 1, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["トライアングルＺ", "バックトルネード"],
    myBasicPassivesIds: ["100000101", "101153001", "101153003"],
    myRarityPassivesIds: ["100000501", "101153004"]
};