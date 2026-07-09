// js/Coaches/personaggioPrincipale.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "personaggioPrincipale");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/PersonaggioPrincipale.png", // Modifica con la tua immagine a figura intera
    level: 10,
    formationName: "F-Beginner",
    formationConditions: [
        { slotCode: 2, icon: "img/Position/Icon_Position_FW.png" },
        { slotCode: 5, icon: "img/Position/Icon_Position_MF.png" },
        { slotCode: 11, icon: "img/Position/Icon_Position_GK.png" }
    ],
    formationPassive: {
        title: "Attiva F-Beginner (アクティブ・F-ビギナー)",
        icons: ["img/Coaches/PassiveEffectIcon_AddKick.png", "img/Coaches/PassiveEffectIcon_AddTechnic.png"],
        text: "All'inizio della partita:<br><strong>Tutti gli alleati:</strong> statistica di Tiro +600<br><strong>Tutti gli alleati:</strong> statistica di Tecnica +600",
        actions: [
            { target: "team", stat: "Tiro", type: "base_stat", amount: 600, condition: "always" },
            { target: "team", stat: "Tecnica", type: "base_stat", amount: 600, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_main",
        title: "Boost DF & GK (DF&GKブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddBlock.png", "img/Coaches/PassiveEffectIcon_AddCatch.png"],
        template: "All'inizio della partita:<br><strong>Alleati DF consigliati:</strong> statistica di Blocco +{VAL}<br><strong>Alleati GK consigliati:</strong> statistica di Parata +{VAL2}",
        levels: [
            { val: 280, val2: 400, req: "Niv.1" },
            { val: 560, val2: 800, req: "Niv.2" },
            { val: 840, val2: 1200, req: "Niv.3" },
            { val: 1120, val2: 1600, req: "Niv.4" },
            { val: 1400, val2: 2000, req: "Niv.5" },
            { val: 1680, val2: 2400, req: "Niv.6" },
            { val: 1960, val2: 2800, req: "Niv.7" },
            { val: 2240, val2: 3200, req: "Niv.8" },
            { val: 2520, val2: 3600, req: "Niv.9" },
            { val: 2800, val2: 4000, req: "Niv.10" }
        ],
        actions: [
            { target: "team_recommended_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_recommended_GK", stat: "Parata", type: "base_stat", amount: "{VAL2}", condition: "always" }
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