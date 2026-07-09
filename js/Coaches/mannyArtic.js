// js/Coaches/mannyArtic.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "mannyArtic");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/MannyArtic.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Otaku",
    formationConditions: [
        { slotCode: 2, icons: ["img/TagTitle/Icon_Tag_Team_Otaku.png"] },
        { slotCode: 4, icons: ["img/TagTitle/Icon_Tag_Ability_SecondTop.png"] },
        { slotCode: 5, icons: ["img/TagTitle/Icon_Tag_Ability_SecondTop.png"] }
    ],
    formationPassive: {
        title: "Attiva F-Otaku (アクティブ・F-シュウヨウメイト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddBlock.png", "img/Coaches/PassiveEffectIcon_AddCatch.png"],
        text: "All'inizio del secondo tempo:<br><strong>Alleati DF consigliati:</strong> statistica di Blocco +2700<br><strong>Alleati GK consigliati:</strong> statistica di Parata +2700",
        actions: [
            { target: "team_recommended_DF", stat: "Blocco", type: "base_stat", amount: 2700, condition: "turn_21" },
            { target: "team_recommended_GK", stat: "Parata", type: "base_stat", amount: 2700, condition: "turn_21" }
        ]
    },
    coachPassive: {
        id: "coach_passive_artic",
        title: "Boost FW & MF (FW&MFブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddKick.png", "img/Coaches/PassiveEffectIcon_AddTechnic.png"],
        template: "All'inizio del secondo tempo:<br><strong>Alleati FW consigliati:</strong> statistica di Tiro +{VAL}<br><strong>Alleati MF consigliati:</strong> statistica di Tecnica +{VAL2}",
        levels: [
            { val: 420, val2: 420, req: "Niv.1" },
            { val: 840, val2: 840, req: "Niv.2" },
            { val: 1260, val2: 1260, req: "Niv.3" },
            { val: 1680, val2: 1680, req: "Niv.4" },
            { val: 2100, val2: 2100, req: "Niv.5" },
            { val: 2520, val2: 2520, req: "Niv.6" },
            { val: 2940, val2: 2940, req: "Niv.7" },
            { val: 3360, val2: 3360, req: "Niv.8" },
            { val: 3780, val2: 3780, req: "Niv.9" },
            { val: 4200, val2: 4200, req: "Niv.10" }
        ],
        actions: [
            { target: "team_recommended_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "turn_21" },
            { target: "team_recommended_MF", stat: "Tecnica", type: "base_stat", amount: "{VAL2}", condition: "turn_21" }
        ]
    },
    slots: [
        // FW (1, 2, 3, 5, 4) - Note: L'immagine mostra una configurazione offensiva densa
        { number: 1, position: "FW", x: 25, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 50, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 3, position: "FW", x: 75, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 5, position: "FW", x: 35, y: 35, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 4, position: "FW", x: 65, y: 35, baseAsset: "img/Position/Img_FWBase.png" },

        // MF (7, 6, 8)
        { number: 7, position: "MF", x: 15, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 50, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 8, position: "MF", x: 85, y: 55, baseAsset: "img/Position/Img_MFBase.png" },

        // DF (10, 9)
        { number: 10, position: "DF", x: 30, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 70, y: 75, baseAsset: "img/Position/Img_DFBase.png" },

        // GK
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};