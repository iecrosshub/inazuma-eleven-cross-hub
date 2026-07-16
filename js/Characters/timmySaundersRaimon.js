import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "timmySaundersRaimon");

export const charData = {
    ...baseInfo,
    name: "Timmy Saunders",
    romanizedName: "Shourinji Ayumu",
    japaneseName: "少林寺 歩",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 212,

    zones: [
        { code: 5, rank: 'A' },
        { code: 7, rank: 'A' },
        { code: 4, rank: 'B' }
    ],

    myTechniques: ["竜巻旋風", "分身フェイント"],

    myBasicPassivesIds: ["100000201", "101006001", "101007003"],
    myRarityPassivesIds: ["100000501", "101007004"]
};