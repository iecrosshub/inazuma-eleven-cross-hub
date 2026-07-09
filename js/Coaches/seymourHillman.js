// js/Coaches/seymourHillman.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "seymourHillman");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/SeymourHillman.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Raimon",
    formationConditions: [
        { slotCode: 3, icon: "img/TagTitle/Icon_Tag_Team_Raimon.png" },
        { slotCode: 7, icon: "img/TagTitle/Icon_Tag_Team_Raimon.png" },
        { slotCode: 11, icon: "img/TagTitle/Icon_Tag_Team_Raimon.png" }
    ],
    formationPassive: {
        title: "Attiva F-Raimon (アクティブ・F-ライモン)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        text: "All'inizio della partita:<br><strong>Alleati GK consigliati:</strong> potenza tecniche Parata +53<br><strong>Alleati DF consigliati:</strong> potenza tecniche di Blocco +53",
        actions: [
            { target: "team_recommended_GK", stat: "Potenza_Arrêt", type: "move_power", amount: 53, condition: "always" },
            { target: "team_recommended_DF", stat: "Potenza_Blocco", type: "move_power", amount: 53, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_hillman",
        icons: ["img/Coaches/PassiveEffectIcon_AddCatch.png", "img/Coaches/PassiveEffectIcon_AddTechnic.png"],
        title: "Boost Raimon (雷門ブースト)",
        template: "All'inizio della partita:<br>Per gli alleati con tag <strong>Raimon</strong>:<br><strong>Alleati GK consigliati:</strong> statistica di Parata +{VAL}<br><strong>Tutti gli alleati:</strong> statistica di Tecnica +{VAL2}",
        levels: [
            { val: 311, val2: 120, req: "Niv.1" },
            { val: 622, val2: 240, req: "Niv.2" },
            { val: 933, val2: 360, req: "Niv.3" },
            { val: 1245, val2: 480, req: "Niv.4" },
            { val: 1556, val2: 600, req: "Niv.5" },
            { val: 1867, val2: 720, req: "Niv.6" },
            { val: 2179, val2: 840, req: "Niv.7" },
            { val: 2490, val2: 960, req: "Niv.8" },
            { val: 2801, val2: 1080, req: "Niv.9" },
            { val: 3113, val2: 1200, req: "Niv.10" }
        ],
        actions: [
            { target: "team_Raimon_recommended_GK", stat: "Arrêt", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_Raimon", stat: "Tecnica", type: "base_stat", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        { number: 1, position: "FW", x: 37, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 67, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 5, position: "MF", x: 15, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 3, position: "MF", x: 37, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 67, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 90, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 7, position: "DF", x: 15, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 37, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 67, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 90, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};