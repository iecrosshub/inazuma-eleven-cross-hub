import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thomasFeldtBrainwashing");

export const charData = {
    ...baseInfo,
    name: "Thomas Feldt",
    romanizedName: "Sugimori Takeshi",
    japaneseName: "杉森 威",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Brainwashing.png",
        "img/TagTitle/Icon_Tag_Ability_Buffer.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 407,

    // Griglia base di esempio per un Portiere (GK)
    zones: [
        { code: 10, rank: 'B' },
        { code: 8, rank: 'A' },
        { code: 11, rank: 'A' }
    ],

    myTechniques: ["シュートポケット", "ロケットこぶし"],
    myBasicPassivesIds: ["100000401", "101100001", "101100003"],
    myRarityPassivesIds: ["100000501", "101100004"]
};