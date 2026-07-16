import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "peterDrentRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Peter Drent",
    romanizedName: "Oono Densuke",
    japaneseName: "大野 伝助",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code:309,

    myTechniques: ["アースクェイク", "キラースライド"],

    myBasicPassivesIds: ["100000301", "101018001", "101018003"],
    myRarityPassivesIds: ["100000501", "101018004"]
};