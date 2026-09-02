// js/Coaches/davidEvans.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "davidEvans");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/DavidEvans.png",
    level: 10,
    formationName: "Young Inazuma",
    formationConditions: [
        { slotCode: 2, icon: "img/Element/Icon_Element_Fire.png" },
        { slotCode: 6, icon: "img/Element/Icon_Element_Mountain.png" },
        { slotCode: 11, icon: "img/Element/Icon_Element_Mountain.png" }
    ],
    formationPassive: {
        title: "Attiva F-Young Inazuma (アクティブ・F-ヤングイナズマ)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        text: "Durante la partita:<br>Ogni volta che una tecnica di parata alleata ha successo, la potenza delle <strong>tecniche di tiro alleate</strong> aumenta di +50.<br><em>Condizione di fine: quando un alleato segna un gol.</em>",
        actions: [
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: [], type: "power", moveKind: "Tiro", amount: 50, condition: "ally_catch_success", resetCondition: "ally_goal" }
        ]
    },
    coachPassive: {
        id: "coach_passive_evans",
        title: "DF & GK Power Boost (DF&GKパワーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        template: "All'inizio della partita:<br><strong>Alleati DF consigliati:</strong> potenza delle tecniche di blocco +{VAL}<br><strong>Alleati GK di elemento Montagna consigliati:</strong> potenza delle tecniche di parata +{VAL2}",
        levels: [
            { val: 6, val2: 8, req: "Niv.1" },
            { val: 12, val2: 16, req: "Niv.2" },
            { val: 18, val2: 24, req: "Niv.3" },
            { val: 24, val2: 32, req: "Niv.4" },
            { val: 30, val2: 40, req: "Niv.5" },
            { val: 36, val2: 48, req: "Niv.6" },
            { val: 42, val2: 56, req: "Niv.7" },
            { val: 48, val2: 64, req: "Niv.8" },
            { val: 54, val2: 72, req: "Niv.9" },
            { val: 60, val2: 80, req: "Niv.10" }
        ],
        actions: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], targetTags: [], type: "power", moveKind: "Blocco", amount: "{VAL}", condition: "always" },
            { targetScope: "team", targetRoles: ["GK"], targetElements: ["Mountain"], targetTags: [], type: "power", moveKind: "Parata", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        // ... gli slots vanno benissimo
        { number: 1, position: "FW", x: 37, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 67, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 3, position: "MF", x: 15, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 50, y: 37, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 90, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "DF", x: 21, y: 62, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 7, position: "DF", x: 50, y: 62, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 86, y: 62, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 25, y: 80, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 75, y: 80, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};