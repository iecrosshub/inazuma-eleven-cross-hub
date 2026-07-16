import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "nathanSwiftRaimon");

export const charData = {
    ...baseInfo,
    name: "Nathan Swift",
    romanizedName: "Kazemaru Ichirōta",
    japaneseName: "風丸 一郎太",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SideBack.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 306,

    zones: [
        { code: 4, rank: 'A' }, 
        { code: 8, rank: 'A' }, 
        { code: 1, rank: 'B' }  
    ],

    myTechniques: ["疾風ダッシュ", "クイックドロウ"],
    myBasicPassivesIds: ["100000301", "101002001", "101002003"],
    myRarityPassivesIds: ["100000501", "101002004"]
};