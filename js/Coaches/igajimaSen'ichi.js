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
        { slotCode: 1, icon: "img/TagTitle/Icon_Tag_Team_Shuriken.png" },
        { slotCode: 5, icon: "img/TagTitle/Icon_Tag_Ability_DefensiveMF.png" }, // FIX dal tagDictionary (Mediano difensivo)
        { slotCode: 10, icon: "img/TagTitle/Icon_Tag_Ability_Stopper.png" }     // Devi aggiungere Stopper al tuo TagMap
    ],
    formationPassive: {
        title: "Attiva F-Shuriken (アクティブ・F-センゴクイガジマ)",
        icons: ["img/Coaches/PassiveEffectIcon_AddTechnic.png", "img/Coaches/PassiveEffectIcon_AddKick.png"],
        text: "Ogni volta che una tecnica di dribbling o blocco di un alleato riesce:<br><strong>Tutti gli alleati:</strong> statistica di Tecnica +250<br><strong>Tutti gli alleati:</strong> statistica di Tiro +250<br><strong>Condizione di reset:</strong> quando un alleato segna un gol",
        actions: [
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: [], statName: "Tecnica", type: "stat", amount: 250, condition: "ally_dribble_or_block_success", resetCondition: "ally_goal" },
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: [], statName: "Tiro", type: "stat", amount: 250, condition: "ally_dribble_or_block_success", resetCondition: "ally_goal" }
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
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: ["Defensive MF", "Stopper"], statName: "Blocco", type: "stat", amount: "{VAL}", condition: "always" },
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: ["Defensive MF", "Stopper"], statName: "Tecnica", type: "stat", amount: "{VAL}", condition: "always" }
        ]
    },
    slots: [
        // ... slot invariati
        { number: 1, position: "FW", x: 75, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 25, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 3, position: "MF", x: 75, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 25, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 75, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 25, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 9, position: "DF", x: 50, y: 55, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 7, position: "DF", x: 15, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 50, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 85, y: 75, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};