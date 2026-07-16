import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "judeSharpRoyalAcademy");

export const charData = {
    ...baseInfo,
    name: "Jude Sharp",
    romanizedName: "Kidō Yūto",
    japaneseName: "鬼道 有人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_RoyalAcademy.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 208,

    zones: [
        { code: 2, rank: 'A' }, 
        { code: 5, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["イリュージョンボール", "ツインブースト"],
    myBasicPassivesIds: ["100000201", "101026001", "101026003"],
    myRarityPassivesIds: ["100000501", "101026004"]
};