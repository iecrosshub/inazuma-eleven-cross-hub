import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "samKincaidRaimon");

export const charData = {
    ...baseInfo,
    name: "Sam Kincaid",
    romanizedName: "Shishido Sakichi",
    japaneseName: "宍戸 佐吉",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 209,

    zones: [
        { code: 6, rank: 'A' },
        { code: 7, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["グレネードショット", "分身フェイント"],

    myBasicPassivesIds: ["100000201", "101008001", "101008003"],
    myRarityPassivesIds: ["100000501", "101008004"]
};