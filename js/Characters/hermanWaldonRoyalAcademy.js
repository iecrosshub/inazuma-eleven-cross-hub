import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "hermanWaldonRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Herman Waldon",
    romanizedName: "Henmi Wataru",
    japaneseName: "辺見 渡",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 209,

    zones: [
        { code: 2, rank: 'A' },
        { code: 5, rank: 'A' },
        { code: 7, rank: 'B' }
    ],


    myTechniques: ["ジャッジスルー", "デスゾーン"],

    myBasicPassivesIds: ["100000201", "101022001", "101022003"],
    myRarityPassivesIds: ["100000501", "101022004"]
};