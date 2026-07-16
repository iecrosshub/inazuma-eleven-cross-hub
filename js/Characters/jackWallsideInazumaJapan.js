import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "jackWallsideInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Jack Wallside",
    romanizedName: "Kabeyama Heigorō",
    japaneseName: "壁山 塀吾郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 303,

    myTechniques: ["ザ・ウォール", "ザ・マウンテン"],

    zones: [
        { code: 9, rank: 'S' }, 
        { code: 7, rank: 'A' }, 
        { code: 10, rank: 'B' }  
    ],

    myBasicPassivesIds: ["100000301", "103003001", "103003003"],
    myRarityPassivesIds: ["100000501", "103003004"]
};