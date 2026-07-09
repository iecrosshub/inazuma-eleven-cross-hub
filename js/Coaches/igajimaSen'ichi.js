// js/Coaches/shuriken.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "igajimaSen'ichi");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/IgajimaSen'ichi.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "Shuriken",
    formationConditions: [
        { slotCode: 1, icon: "img/TagTitle/Icon_Tag_Team_Shuriken.png" }, // Ipotizzo il tag team
        { slotCode: 5, icon: "img/TagTitle/Icon_Tag_Ability_Defensivehalf.png" },
        { slotCode: 10, icon: "img/TagTitle/Icon_Tag_Ability_Stopper.png" }
    ],
    formationPassive: {
        title: "Attiva F-Shuriken (アクティブ・F-センゴクイガジマ)",
        icons: ["img/Coaches/PassiveEffectIcon_AddTechnic.png", "img/Coaches/PassiveEffectIcon_AddKick.png"],
        text: "Ogni volta che una tecnica di dribbling o blocco di un alleato riesce:<br><strong>Tutti gli alleati:</strong> statistica di Tecnica +250<br><strong>Tutti gli alleati:</strong> statistica di Tiro +250<br><strong>Condizione di reset:</strong> quando un alleato segna un gol",
        actions: [
            { target: "team", stat: "Tecnica", type: "base_stat", amount: 250, condition: "dribble_or_block_success" },
            { target: "team", stat: "Tiro", type: "base_stat", amount: 250, condition: "dribble_or_block_success" }
        ]
    },
    coachPassive: {
        id: "coach_passive_shuriken",
        title: "Boost Mediano Difensivo & Stopper (ディフェンシブハーフ＆ストッパーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddBlock.png", "img/Coaches/PassiveEffectIcon_AddTechnic.png"],
        template: "All'inizio della partita:<br><strong>Alleati Mediano Difensivo o Stopper:</strong> statistica di Blocco +{VAL}<br><strong>Alleati Mediano Difensivo o Stopper:</strong> statistica di Tecnica +{VAL}",
        levels: [
            { val: 225, req: "Niv.1" },
            { val: 450, req: "Niv.2" },
            { val: 675, req: "Niv.3" },
            { val: 900, req: "Niv.4" },
            { val: 1125, req: "Niv.5" },
            { val: 1350, req: "Niv.6" },
            { val: 1575, req: "Niv.7" },
            { val: 1800, req: "Niv.8" },
            { val: 2025, req: "Niv.9" },
            { val: 2250, req: "Niv.10" }
        ],
        actions: [
            { target: "team_DefensiveHalf_Stopper", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_DefensiveHalf_Stopper", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
        ]
    },
    slots: [
        // FW (1, 2)
        { number: 1, position: "FW", x: 75, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 25, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        // MF (3, 4, 5, 6)
        { number: 3, position: "MF", x: 75, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 25, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 75, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 25, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        // DF (7, 8, 9, 10)
        { number: 9, position: "DF", x: 50, y: 55, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 7, position: "DF", x: 15, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 50, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 85, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        // GK
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};