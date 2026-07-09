// js/Coaches/toyamaShinochirou.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "toyamaShinochirou");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/ToyamaShinochirou.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Brainwashing",
    formationConditions: [
        { slotCode: 2, icon: "img/Element/Icon_Element_Fire.png" },
        { slotCode: 6, icon: "img/Position/Icon_Position_MF.png" },
        { slotCode: 11, icon: "img/Element/Icon_Element_Forest.png" }
    ],
    formationPassive: {
        title: "Attiva F-Brainwashing (アクティブ・F-ミカゲセンノウ)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        text: "All'inizio della partita:<br><strong>Alleati elemento Fuoco:</strong> potenza tecniche di tecnica +30<br><strong>Alleati elemento Foresta:</strong> potenza tecniche di tecnica +30",
        actions: [
            { target: "team_Fire", stat: "Tecnica", type: "move_power", amount: 30, condition: "always" },
            { target: "team_Wood", stat: "Tecnica", type: "move_power", amount: 30, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_toyama",
        title: "Power Boost FW & GK (FW&GKパワーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        template: "All'inizio della partita:<br><strong>Alleati FW elemento Fuoco:</strong> potenza tecniche di tiro +{VAL}<br><strong>Alleati GK elemento Foresta:</strong> potenza tecniche Foresta +{VAL2}",
        levels: [
            { val: 8, val2: 8, req: "Niv.1" },
            { val: 16, val2: 16, req: "Niv.2" },
            { val: 24, val2: 24, req: "Niv.3" },
            { val: 32, val2: 32, req: "Niv.4" },
            { val: 40, val2: 40, req: "Niv.5" },
            { val: 48, val2: 48, req: "Niv.6" },
            { val: 56, val2: 56, req: "Niv.7" },
            { val: 64, val2: 64, req: "Niv.8" },
            { val: 72, val2: 72, req: "Niv.9" },
            { val: 80, val2: 80, req: "Niv.10" }
        ],
        actions: [
            { target: "team_Fire_recommended_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" },
            { target: "team_Wood_recommended_GK", stat: "Potenza_Arrêt", type: "move_power", amount: "{VAL2}", condition: "always" }
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