import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "milesRyanRaimon");

export const charData = {
    ...baseInfo,
    name: "Miles Ryan",
    romanizedName: "Miyasaka Ryou",
    japaneseName: "宮坂 了",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SideBack.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 310,

    zones: [
        { code: 10, rank: 'A' },
        { code: 6, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["疾風ダッシュ", "サイクロン"],

    myBasicPassivesIds: ["100000301", "101041001", "101041003"],
    myRarityPassivesIds: ["100000501", "101041004"]
};