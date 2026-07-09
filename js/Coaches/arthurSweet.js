// js/Coaches/arthurSweet.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "arthurSweet");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/ArthurSweet.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Inazuma KFC",

    formationConditions: [
        { slotCode: 3, icons: ["img/TagTitle/Icon_Tag_Team_InazumaKidsFC.png"] },
        { slotCode: 7, icons: ["img/TagTitle/Icon_Tag_Team_InazumaKidsFC.png", "img/TagTitle/Icon_Tag_Team_Raimon.png"] },
        { slotCode: 11, icons: ["img/TagTitle/Icon_Tag_Team_InazumaKidsFC.png", "img/TagTitle/Icon_Tag_Team_Raimon.png"] }
    ],
    formationPassive: {
        title: "Attiva F-Inazuma KFC (アクティブ・F-イナズマKFC)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        text: "All'inizio della partita:<br><strong>Alleati elemento Bosco:</strong> potenza tecniche di tiro +22<br><strong>Alleati elemento Montagna:</strong> potenza tecniche di blocco +20",
        actions: [
            { target: "team_Wood", stat: "Potenza_Tiro", type: "move_power", amount: 22, condition: "always" },
            { target: "team_Mountain", stat: "Potenza_Blocco", type: "move_power", amount: 20, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_sweet",
        title: "Boost Raimon & Inazuma KFC (雷門＆稲妻KFCブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddKick.png", "img/Coaches/PassiveEffectIcon_AddCatch.png"],
        template: "All'inizio della partita:<br>Per gli alleati con tag <strong>Raimon</strong> e <strong>Inazuma KFC</strong>:<br><strong>Alleati FW consigliati:</strong> statistica di Tiro +{VAL}<br><strong>Alleati GK consigliati:</strong> statistica di Parata +{VAL2}",
        levels: [
            { val: 330, val2: 300, req: "Niv.1" },
            { val: 660, val2: 600, req: "Niv.2" },
            { val: 990, val2: 900, req: "Niv.3" },
            { val: 1320, val2: 1200, req: "Niv.4" },
            { val: 1650, val2: 1500, req: "Niv.5" },
            { val: 1980, val2: 1800, req: "Niv.6" },
            { val: 2310, val2: 2100, req: "Niv.7" },
            { val: 2640, val2: 2400, req: "Niv.8" },
            { val: 2970, val2: 2700, req: "Niv.9" },
            { val: 3300, val2: 3000, req: "Niv.10" }
        ],
        actions: [
            { target: "team_Raimon_KFC_recommended_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_Raimon_KFC_recommended_GK", stat: "Parata", type: "base_stat", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        { number: 1, position: "FW", x: 35, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 65, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 3, position: "MF", x: 20, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 50, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 80, y: 37, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "DF", x: 20, y: 57, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 7, position: "DF", x: 50, y: 55, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 75, y: 57, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 37, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 67, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};