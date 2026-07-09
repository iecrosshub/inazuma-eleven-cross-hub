// js/Coaches/sethNichols.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "sethNichols");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/SethNichols.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Kirkwood",
    formationConditions: [
        { slotCode: 1, icon: "img/Element/Icon_Element_Mountain.png" },
        { slotCode: 2, icon: "img/Element/Icon_Element_Fire.png" },
        { slotCode: 3, icon: "img/Element/Icon_Element_Wind.png" }
    ],
    formationPassive: {
        title: "Attiva F-Kirkwood (アクティブ・F-キドカワセイシュウ)",
        icons: ["img/Coaches/PassiveEffectIcon_AddKick.png"],
        text: "Quando il tiro di un alleato viene parato:<br><strong>Tutti gli alleati:</strong> statistica di Tiro +400<br><strong>Condizione di reset:</strong> un alleato segna un gol",
        actions: [
            { target: "team", stat: "Tiro", type: "base_stat", amount: 400, condition: "ally_shot_stopped" }
        ]
    },
    coachPassive: {
        id: "coach_passive_nichols",
        title: "Power Boost FW & Striker (FW&ストライカーパワーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        template: "All'inizio della partita:<br><strong>Alleati FW consigliati:</strong> potenza delle tecniche di tiro +{VAL}<br><strong>Alleati con tag Buteur (Attaccante):</strong> potenza delle tecniche di tiro +{VAL2}",
        levels: [
            { val: 6, val2: 8, req: "Niv.1" },
            { val: 12, val2: 17, req: "Niv.2" },
            { val: 18, val2: 25, req: "Niv.3" },
            { val: 24, val2: 34, req: "Niv.4" },
            { val: 30, val2: 42, req: "Niv.5" },
            { val: 36, val2: 51, req: "Niv.6" },
            { val: 42, val2: 59, req: "Niv.7" },
            { val: 48, val2: 68, req: "Niv.8" },
            { val: 54, val2: 76, req: "Niv.9" },
            { val: 60, val2: 85, req: "Niv.10" }
        ],
        actions: [
            { target: "team_recommended_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" },
            { target: "team_Striker", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        // Attaccanti (FW) - Riga alta
        { number: 3, position: "FW", x: 25, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 50, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 1, position: "FW", x: 75, y: 15, baseAsset: "img/Position/Img_FWBase.png" },

        // Centrocampisti (MF) - Riga centrale
        { number: 6, position: "MF", x: 20, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 50, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 80, y: 45, baseAsset: "img/Position/Img_MFBase.png" },

        // Difensori (DF) - Riga bassa, allineati diversamente
        { number: 7, position: "DF", x: 15, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 38, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 62, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 85, y: 75, baseAsset: "img/Position/Img_DFBase.png" },

        // Portiere (GK)
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};