// js/Coaches/rayDark.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "rayDark");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/RayDark.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Royale Academy",
    formationConditions: [
        { slotCode: 2, icon: "img/TagTitle/Icon_Tag_Team_RoyaleAcademy.png" },
        { slotCode: 5, icon: "img/TagTitle/Icon_Tag_Team_RoyaleAcademy.png" },
        { slotCode: 7, icon: "img/TagTitle/Icon_Tag_Team_RoyaleAcademy.png" }
    ],
    formationPassive: {
        title: "Attiva F-Royale Academy (アクティブ・F-デスゾーン)",
        icons: ["img/Coaches/PassiveEffectIcon_AddKick.png", "img/Coaches/PassiveEffectIcon_AddBlock.png"],
        text: "All'inizio della partita:<br><strong>Alleati FW consigliati:</strong> statistica di Tiro +600<br><strong>Alleati DF consigliati:</strong> statistica di Blocco +600",
        actions: [
            { target: "team_recommended_FW", stat: "Tiro", type: "base_stat", amount: 600, condition: "always" },
            { target: "team_recommended_DF", stat: "Blocco", type: "base_stat", amount: 600, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_dark",
        title: "Power Boost Playmaker / Regista (プレイメーカーパワーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        template: "All'inizio della partita:<br>Per gli alleati con tag <strong>Regista (Playmaker)</strong>:<br>Potenza delle tecniche di tiro +{VAL}<br>Potenza delle tecniche di dribbling +{VAL2}",
        levels: [
            { val: 5, val2: 5, req: "Niv.1" },
            { val: 11, val2: 11, req: "Niv.2" },
            { val: 17, val2: 17, req: "Niv.3" },
            { val: 23, val2: 23, req: "Niv.4" },
            { val: 29, val2: 29, req: "Niv.5" },
            { val: 35, val2: 35, req: "Niv.6" },
            { val: 41, val2: 41, req: "Niv.7" },
            { val: 47, val2: 47, req: "Niv.8" },
            { val: 53, val2: 53, req: "Niv.9" },
            { val: 59, val2: 59, req: "Niv.10" }
        ],
        actions: [
            { target: "team_Playmaker", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" },
            { target: "team_Playmaker", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        // Attaccanti (FW)
        { number: 1, position: "FW", x: 35, y: 20, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 65, y: 20, baseAsset: "img/Position/Img_FWBase.png" },

        // Centrocampisti (MF)
        { number: 3, position: "MF", x: 15, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 50, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 85, y: 40, baseAsset: "img/Position/Img_MFBase.png" },

        // Difensori (DF) - Linea a 3 centrale
        { number: 6, position: "DF", x: 15, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 7, position: "DF", x: 50, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 85, y: 65, baseAsset: "img/Position/Img_DFBase.png" },

        // Difensori (DF) - Linea a 2 arretrata
        { number: 9, position: "DF", x: 35, y: 80, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 65, y: 80, baseAsset: "img/Position/Img_DFBase.png" },

        // Portiere (GK)
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};