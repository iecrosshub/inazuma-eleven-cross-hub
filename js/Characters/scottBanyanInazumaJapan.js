import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "scottBanyanInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Scott Banyan",
    romanizedName: "Kogure Yuya",
    japaneseName: "木暮 夕弥",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 306,

    zones: [
        { code: 6, rank: 'A' }, 
        { code: 10, rank: 'A' }, 
        { code: 5, rank: 'B' }  
    ],

    myTechniques: ["旋風陣", "竜巻旋風"],
    myBasicPassivesIds: ["100000301", "103006001", "103006003"],
    myRarityPassivesIds: ["100000501", "103006004"]
};