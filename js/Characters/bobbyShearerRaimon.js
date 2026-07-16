import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "bobbyShearerRaimon");

export const charData = {
    ...baseInfo,
    name: "Bobby Shearer",
    romanizedName: "Domon Asuka",
    japaneseName: "土門 飛鳥",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_Stopper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 305,

    zones: [
        { code: 5, rank: 'A' }, 
        { code: 8, rank: 'A' }, 
        { code: 9, rank: 'B' }  
    ],

    myTechniques: ["キラースライド", "スピニングカット"],
    myBasicPassivesIds: ["100000301", "101013001", "101013003"],
    myRarityPassivesIds: ["100000501", "101013004"]
};