import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "judeSharpJapanNationalTeam2026");

export const charData = {
    ...baseInfo,
    name: "Jude Sharp",
    romanizedName: "Kidō Yūto",
    japaneseName: "鬼道 有人",

    tags: [
        "img/TagTitle/Icon_Tag_Team_JapanNationalTeam2026.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_Cross.png"
    ],

    zones: [
        { code: 4, rank: 'S' }, 
        { code: 5, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    growth_pattern_code:201,

    myTechniques: ["サムライペンギン2号", "ブルーサイクロン"],

    myBasicPassivesIds: ["100000201", "1010005001", "1010005003"],
    myRarityPassivesIds: ["100000501", "1010005004"]
};