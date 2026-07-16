import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "jackWallsideRaimon");

export const charData = {
    ...baseInfo,
    name: "Jack Wallside",
    romanizedName: "Kabeyama Heigorō",
    japaneseName: "壁山 塀吾郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 307,

    zones: [
        { code: 9, rank: 'A' }, 
        { code: 7, rank: 'A' }, 
        { code: 8, rank: 'B' }  
    ],

    myTechniques: ["ザ・ウォール", "ジグザグスパーク"],

    myBasicPassivesIds: ["100000301", "101003001", "101003003"],
    myRarityPassivesIds: ["100000501", "101003004"]
};