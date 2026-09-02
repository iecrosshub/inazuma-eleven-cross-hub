// js/Coaches/rayDarkZeus.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "rayDarkZeus") || { id: "rayDarkZeus", name: "Ray Dark (Zeus)", title: "Zeus" };

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/RayDark.png",
    level: 10,
    teamBonusScore: 19200,
    formationName: "F-Zeus",
    formationConditions: [
        { slotCode: 1, icon: "img/Position/Icon_Position_FW.png" },
        { slotCode: 4, icon: "img/TagTitle/Icon_Tag_Team_Zeus.png" },
        { slotCode: 11, icon: "img/Element/Icon_Element_Mountain.png" }
    ],
    formationPassive: {
        title: "Attiva F-Zeus (アクティブ・F-ゼウス)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        text: "Ogni volta che una tecnica di Dribbling di un alleato MF ha successo:<br>Potenza delle tecniche di tutti gli alleati +10<br><strong>Condizione di fine:</strong> Quando un alleato segna un gol.",
        actions: [
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: [], type: "power", moveKind: "All", amount: 10, condition: "ally_MF_dribble_success", resetCondition: "ally_goal" }
        ]
    },
    coachPassive: {
        id: "coach_passive_dark_zeus",
        title: "MF & Zeus Power Boost (MF＆世宇子パワーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        template: "All'inizio della partita:<br><strong>Alleati MF consigliati:</strong> Potenza delle tecniche di Dribbling +{VAL}<br><strong>Alleati con tag Zeus:</strong> Potenza delle tecniche di Tiro +{VAL2}",
        levels: [
            { val: 6, val2: 6, req: "Lv.1" },
            { val: 12, val2: 12, req: "Lv.2" },
            { val: 18, val2: 18, req: "Lv.3" },
            { val: 24, val2: 24, req: "Lv.4" },
            { val: 30, val2: 30, req: "Lv.5" },
            { val: 36, val2: 36, req: "Lv.6" },
            { val: 42, val2: 42, req: "Lv.7" },
            { val: 48, val2: 48, req: "Lv.8" },
            { val: 54, val2: 54, req: "Lv.9" },
            { val: 60, val2: 60, req: "Lv.10" }
        ],
        actions: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], targetTags: [], type: "power", moveKind: "Dribbling", amount: "{VAL}", condition: "always" },
            { targetScope: "team", targetRoles: [], targetElements: [], targetTags: ["Zeus"], type: "power", moveKind: "Tiro", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        // ... slots invariati ...
        { number: 1, position: "FW", x: 50, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "MF", x: 18, y: 25, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 82, y: 25, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 3, position: "MF", x: 22, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 50, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 78, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 7, position: "DF", x: 20, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 80, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 35, y: 78, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 65, y: 78, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};