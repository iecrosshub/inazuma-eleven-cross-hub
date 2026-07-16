import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "sailBlueseaShuriken");

export const charData = {
    ...baseInfo,
    name: "Sail Bluesea",
    romanizedName: "Kirigakure Saiji",
    japaneseName: "霧隠 才次",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Shuriken.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 108,

    zones: [
        { code: 2, rank: 'A' },
        { code: 1, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["つちだるま", "残像"],
    myBasicPassivesIds: ["100000101", "101143001", "101143003"],
    myRarityPassivesIds: ["100000501", "101143004"]
};