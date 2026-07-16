import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "steveGrimRaimon");

export const charData = {
    ...baseInfo,
    name: "Steve Grim",
    romanizedName: "Handa Shinichi",
    japaneseName: "半田 真一",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 210,

    zones: [
        { code: 6, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ジグザグスパーク", "サイクロン"],

    myBasicPassivesIds: ["100000201", "101006001", "101006003"],
    myRarityPassivesIds: ["100000501", "101006004"]
};