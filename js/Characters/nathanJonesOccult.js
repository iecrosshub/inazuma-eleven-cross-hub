import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "nathanJonesOccult");

export const charData = {
    ...baseInfo,
    name: "Nathan Jones",
    romanizedName: "Nata Juzou",
    japaneseName: "鉈 十三",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Occult.png",
        "img/TagTitle/Icon_Tag_Ability_Keeper.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 410,


    zones: [
        { code: 11, rank: 'A' },
        { code: 9, rank: 'A' },
        { code: 10, rank: 'B' }
    ],

    myTechniques: ["キラーブレード", "ゆがむ空間"],

    myBasicPassivesIds: ["100000401", "101078001", "101078003"],
    myRarityPassivesIds: ["100000501", "101078004"]
};