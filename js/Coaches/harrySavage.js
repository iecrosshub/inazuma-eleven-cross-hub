// js/Coaches/harrySavage.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "harrySavage");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/HarrySavage.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Wild",
    formationConditions: [
        { slotCode: 3, icon: "img/Element/Icon_Element_Wind.png" },
        { slotCode: 6, icon: "img/Element/Icon_Element_Wind.png" },
        { slotCode: 7, icon: "img/Element/Icon_Element_Wind.png" }
    ],
    formationPassive: {
        title: "Attiva F-Wild (アクティブ・F-ノセ)",
        icons: ["img/Coaches/PassiveEffectIcon_AddKick.png", "img/Coaches/PassiveEffectIcon_AddTechnic.png"],
        text: "All'inizio della partita:<br><strong>Alleati elemento Vento:</strong> statistica di Tiro +900<br><strong>Alleati elemento Vento:</strong> statistica di Tecnica +900",
        actions: [
            { target: "team_Wind", stat: "Tiro", type: "base_stat", amount: 900, condition: "always" },
            { target: "team_Wind", stat: "Tecnica", type: "base_stat", amount: 900, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_savage",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        title: "Power Boost Vento (風パワーブースト)",
        template: "All'inizio della partita:<br><strong>Tutti gli alleati:</strong> potenza delle tecniche di Vento +{VAL}",
        levels: [
            { val: 4, req: "Niv.1" },
            { val: 8, req: "Niv.2" },
            { val: 12, req: "Niv.3" },
            { val: 16, req: "Niv.4" },
            { val: 20, req: "Niv.5" },
            { val: 24, req: "Niv.6" },
            { val: 28, req: "Niv.7" },
            { val: 32, req: "Niv.8" },
            { val: 36, req: "Niv.9" },
            { val: 40, req: "Niv.10" }
        ],
        actions: [
            { target: "team", stat: "Potenza_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
        ]
    },
    slots: [
        // Attaccanti (FW) - Linea alta
        { number: 3, position: "FW", x: 20, y: 20, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 1, position: "FW", x: 50, y: 20, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 80, y: 20, baseAsset: "img/Position/Img_FWBase.png" },

        // Centrocampisti (MF)
        { number: 6, position: "MF", x: 10, y: 50, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 35, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 65, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 7, position: "MF", x: 90, y: 50, baseAsset: "img/Position/Img_MFBase.png" },

        // Difensori (DF)
        { number: 9, position: "DF", x: 25, y: 70, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 50, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 75, y: 70, baseAsset: "img/Position/Img_DFBase.png" },

        // Portiere (GK)
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};