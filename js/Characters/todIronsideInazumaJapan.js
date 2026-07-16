import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "todIronsideInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Tod Ironside",
    romanizedName: "Kurimatsu Teppei",
    japaneseName: "栗松 鉄平",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 306,

    zones: [
        { code: 6, rank: 'A' }, 
        { code: 10, rank: 'A' }, 
        { code: 3, rank: 'B' }  
    ],

    myTechniques: ["まぼろしドリブル", "スピニングカット"],
    myBasicPassivesIds: ["100000301", "103005001", "103005003"],
    myRarityPassivesIds: ["100000501", "103005004"]
};