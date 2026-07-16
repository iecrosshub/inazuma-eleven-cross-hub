import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "byronLoveZeus");

export const charData = {
    ...baseInfo,
    name: "Byron Love",
    romanizedName: "Afuro Terumi",
    japaneseName: "亜風炉 照美",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Zeus.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 201,

    zones: [
        { code: 5, rank: 'S' }, 
        { code: 2, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["ゴッドノウズ", "ヘブンズタイム"],
    myBasicPassivesIds: ["100000201", "101164001", "101164003"],
    myRarityPassivesIds: ["100000501", "101164004"]
};