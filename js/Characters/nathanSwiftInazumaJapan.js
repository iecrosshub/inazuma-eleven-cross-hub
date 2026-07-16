import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "nathanSwiftInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Nathan Swift",
    romanizedName: "Kazemaru Ichirōta",
    japaneseName: "風丸 一郎太",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_SideBack.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 302,


    zones: [
        { code: 8, rank: 'S' }, 
        { code: 4, rank: 'A' }, 
        { code: 10, rank: 'B' }  
    ],

    myTechniques: ["疾風ダッシュ", "風神の舞"],
    myBasicPassivesIds: ["100000301", "103002001", "103002003"],
    myRarityPassivesIds: ["100000501", "103002004"]
};