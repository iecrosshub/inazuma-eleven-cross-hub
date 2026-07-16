import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "thorStoutbergInazumaJapan");

export const charData = {
    ...baseInfo,
    name: "Thor Stoutberg",
    romanizedName: "Hijikata Raiden",
    japaneseName: "土方 雷電",

    tags: [
        "img/TagTitle/Icon_Tag_Team_InazumaJapan.png",
        "img/TagTitle/Icon_Tag_Ability_Shootblocker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle3.png"
    ],

    growth_pattern_code: 306,

    zones: [
        { code: 7, rank: 'A' }, 
        { code: 6, rank: 'A' }, 
        { code: 4, rank: 'B' }  
    ],

    myTechniques: ["スーパー四股踏み", "ブレードアタック"],
    myBasicPassivesIds: ["100000201", "103012001", "103012003"],
    myRarityPassivesIds: ["100000501", "103012004"]
};