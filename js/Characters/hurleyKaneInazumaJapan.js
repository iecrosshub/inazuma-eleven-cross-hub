import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "hurleyKaneInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Hurley Kane",
    romanizedName: "Tsunami Jōsuke",
    japaneseName: "綱海 条介",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Longshooter.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 305,

    zones: [
        { code: 8, rank: 'A' }, 
        { code: 4, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["ツナミブースト", "スピニングカット"],
    myBasicPassivesIds: ["100000301", "103004001", "103004003"],
    myRarityPassivesIds: ["100000501", "103004004"]
};