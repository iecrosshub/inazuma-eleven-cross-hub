import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "derekSwingRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Derek Swing",
    romanizedName: "Hōmen Shūichirō",
    japaneseName: "洞面 秀一郎",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 209,

    zones: [
        { code: 3, rank: 'A' },
        { code: 5, rank: 'B' },
        { code: 7, rank: 'A' }
    ],

    myTechniques: ["分身フェイント", "デスゾーン"],

    myBasicPassivesIds: ["100000101", "101099001", "101024003"],
    myRarityPassivesIds: ["100000501", "101024004"]
};