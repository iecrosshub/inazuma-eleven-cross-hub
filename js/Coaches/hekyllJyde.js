// js/Coaches/hekyllJyde.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "hekyllJyde");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/HekyllJyde.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Occult",
    formationConditions: [
        { slotCode: 1, icon: "img/Element/Icon_Element_Forest.png" },
        { slotCode: 2, icon: "img/Position/Icon_Position_MF.png" },
        { slotCode: 3, icon: "img/Position/Icon_Position_MF.png" }
    ],
    formationPassive: {
        title: "Attiva F-Occult (アクティブ・F-オカルト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddTechnic.png", "img/Coaches/PassiveEffectIcon_AddBlock.png"],
        text: "All'inizio della partita:<br><strong>Alleati MF consigliati:</strong> statistica di Tecnica +2000<br><strong>Alleati DF consigliati:</strong> statistica di Blocco +1200",
        actions: [
            { target: "team_recommended_MF", stat: "Tecnica", type: "base_stat", amount: 2000, condition: "always" },
            { target: "team_recommended_DF", stat: "Blocco", type: "base_stat", amount: 1200, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_jyde",
        icons: ["img/Coaches/PassiveEffectIcon_SubCatch.png"],
        title: "Rottura GK (GKブレイク)",
        template: "Ogni volta che una tecnica di dribbling di un alleato MF ha successo:<br><strong>GK Avversario:</strong> statistica di Parata -{VAL}<br><strong>Condizione di reset:</strong> quando un alleato segna un gol",
        levels: [
            { val: 60, req: "Niv.1" },
            { val: 120, req: "Niv.2" },
            { val: 180, req: "Niv.3" },
            { val: 240, req: "Niv.4" },
            { val: 300, req: "Niv.5" },
            { val: 360, req: "Niv.6" },
            { val: 420, req: "Niv.7" },
            { val: 480, req: "Niv.8" },
            { val: 540, req: "Niv.9" },
            { val: 600, req: "Niv.10" }
        ],
        actions: [
            { target: "enemy_GK", stat: "Parata", type: "base_stat_reduction", amount: "{VAL}", condition: "ally_MF_dribble_success" }
        ]
    },
    slots: [
        // Attaccante (FW) - Unica punta
        { number: 1, position: "FW", x: 50, y: 15, baseAsset: "img/Position/Img_FWBase.png" },

        // Centrocampisti Avanzati (MF)
        { number: 3, position: "MF", x: 25, y: 30, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 2, position: "MF", x: 75, y: 30, baseAsset: "img/Position/Img_MFBase.png" },

        // Centrocampisti Arretrati (MF)
        { number: 6, position: "MF", x: 15, y: 50, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 51, y: 50, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 85, y: 50, baseAsset: "img/Position/Img_MFBase.png" },

        // Difensori (DF) - Linea a 4
        { number: 7, position: "DF", x: 10, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 37, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 67, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 95, y: 75, baseAsset: "img/Position/Img_DFBase.png" },

        // Portiere (GK)
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};