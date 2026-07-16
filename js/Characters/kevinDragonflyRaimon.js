import { characterRegistry } from './registry.js';

const baseInfo = characterRegistry.find(char => char.id === "kevinDragonflyRaimon");

export const charData = {
    ...baseInfo,
    name: "Kevin Dragonfly",
    romanizedName: "Someoka Ryūgo",
    japaneseName: "染岡 竜吾",

    tags: [
        "img/TagTitle/Icon_Tag_Team_Raimon.png",
        "img/TagTitle/Icon_Tag_Ability_SecondTop.png",
        "img/TagTitle/Icon_Tag_Title_InaEle1.png"
    ],

    growth_pattern_code: 106,

    zones: [
        { code: 1, rank: 'A' },
        { code: 2, rank: 'A' },
        { code: 3, rank: 'B' }
    ],

    myTechniques: ["ドラゴンクラッシュ", "ジグザグスパーク"],
    myBasicPassivesIds: ["100000101", "101011001", "101011003"],
    myRarityPassivesIds: ["100000501", "101011004"]
};