import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "markEvansJapanNationalTeam2026");

export const charData = {
    ...baseInfo,
    tags: [
        "img/TagTitle/Icon_Tag_Team_JapanNationalTeam2026.png",
        "img/TagTitle/Icon_Tag_Ability_Playmaker.png",
        "img/TagTitle/Icon_Tag_Title_Cross.png"
    ],
    growth_pattern_code: 202,


    zones: [
        { code: 6, rank: 'S' }, 
        { code: 5, rank: 'A' }, 
        { code: 7, rank: 'B' }  
    ],

    myTechniques: ["サムライショット", "サムライフェイント"],
    myBasicPassivesIds: ["100000201", "1010004001", "1010004003"],
    myRarityPassivesIds: ["100000501", "1010004004"]
};