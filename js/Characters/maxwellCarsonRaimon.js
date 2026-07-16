import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "maxwellCarsonRaimon");

export const charData = {
    ...baseInfo,
    name: "Maxwell Carson",
    romanizedName: "Matsuno Kusuke",
    japaneseName: "松野 空介",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 109,

    zones: [
        { code: 1, rank: 'A' },
        { code: 4, rank: 'A' },
        { code: 5, rank: 'B' }
    ],

    myTechniques: ["クロスドライブ", "イリュージョンボール"],

    myBasicPassivesIds: ["100000101", "101009001", "101009003"],
    myRarityPassivesIds: ["100000501", "101009004"]
};