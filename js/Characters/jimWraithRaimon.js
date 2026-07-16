import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "jimWraithRaimon");

export const charData = {
    ...baseInfo,
    name: "Jim Wraith",
    romanizedName: "Kageno Jin",
    japaneseName: "影野 仁",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SideBack.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 310,

    zones: [
        { code: 8, rank: 'A' },
        { code: 10, rank: 'A' },
        { code: 9, rank: 'B' }
    ],

    myTechniques: ["コイルターン", "残像"],

    myBasicPassivesIds: ["100000301", "101004001", "101004003"],
    myRarityPassivesIds: ["100000501", "101004004"]
};