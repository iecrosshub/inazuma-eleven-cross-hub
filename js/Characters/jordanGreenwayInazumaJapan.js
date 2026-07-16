import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "jordanGreenwayInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Jordan Greenway",
    romanizedName: "Midorikawa Ryūji",
    japaneseName: "緑川 リュウジ",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 206,

    myTechniques: ["アストロブレイク", "ライトニングアクセル"],

    zones: [
        { code: 4, rank: 'A' }, 
        { code: 6, rank: 'A' }, 
        { code: 3, rank: 'B' }  
    ],

    myBasicPassivesIds: ["100000201", "103013001", "103013003"],
    myRarityPassivesIds: ["100000501", "103013004"]
};