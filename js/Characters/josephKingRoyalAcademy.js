import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "josephKingRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Joseph King",
    romanizedName: "Genda Kōjirō",
    japaneseName: "源田 幸次郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 405,

    zones: [
        { code: 11, rank: 'A' }, 
        { code: 9, rank: 'A' }, 
        { code: 10, rank: 'B' }  
    ],

    myTechniques: ["パワーシールド", "フルパワーシールド"],
    myBasicPassivesIds: ["100000401", "101017001", "101017003"],
    myRarityPassivesIds: ["100000501", "101017004"]
};