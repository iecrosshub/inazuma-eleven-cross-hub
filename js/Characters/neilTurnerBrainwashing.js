import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "neilTurnerBrainwashing");

export const charData = {
    ...baseInfo,
    name: "Neil Turner",
    romanizedName: "Shimozuru Arata",
    japaneseName: "下鶴 改",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Brainwashing.png",
        "img/TagTitle/Icon_Tag_Ability_Striker.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 105,

    zones: [
        { code: 2, rank: 'A' },
        { code: 3, rank: 'A' },
        { code: 1, rank: 'B' }
    ],

    myTechniques: ["パトリオットシュート", "ファイアトルネード"],
    myBasicPassivesIds: ["100000101", "101110001", "101110003"],
    myRarityPassivesIds: ["100000501", "101110004"]
};