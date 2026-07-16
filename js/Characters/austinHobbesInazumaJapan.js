import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "austinHobbesInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Austin Hobbes",
    romanizedName: "Utsunomiya Toramaru",
    japaneseName: "宇都宮 虎丸",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    zones: [
        { code: 2, rank: 'A' }, 
        { code: 5, rank: 'A' }, 
        { code: 1, rank: 'B' }  
    ],

    growth_pattern_code: 105,

    myTechniques: ["ひとりワンツー", "タイガードライブ"],

    myBasicPassivesIds: ["100000101", "103011001", "103011003"],
    myRarityPassivesIds: ["100000501", "103011004"]
};