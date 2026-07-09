// js/Coaches/percivalTravis.js
import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "percivalTravis");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/PercivalTravis.png",
    level: 10,
    formationName: "Inazuma Japan",
    formationConditions: [
        { slotCode: 1, icon: "img/TagTitle/Icon_Tag_Team_InazumaJapan.png" },
        { slotCode: 4, icon: "img/TagTitle/Icon_Tag_Team_InazumaJapan.png" },
        { slotCode: 9, icon: "img/TagTitle/Icon_Tag_Team_InazumaJapan.png" }
    ],
    formationPassive: {
        title: "Attiva F-Inazuma Japan (アクティブ・F-イナズマジャパン)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        text: "All'inizio della partita:<br><strong>Alleati FW consigliati:</strong> potenza delle tecniche di tiro +40<br><strong>Alleati DF consigliati:</strong> potenza delle tecniche di blocco +40",
        actions: [
            { target: "team_recommended_FW", stat: "Potenza_Tiro", type: "move_power", amount: 40, condition: "always" },
            { target: "team_recommended_DF", stat: "Potenza_Blocco", type: "move_power", amount: 40, condition: "always" }
        ]
    },
    coachPassive: {
        id: "coach_passive_travis",
        title: "Inazuma Japan Boost Potenza (イナズマジャパンパワーブースト)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png", "img/Coaches/PassiveEffectIcon_AddMovePower.png"],
        template: "All'inizio della partita:<br>Per gli alleati con tag <strong>Inazuma Japan</strong>:<br><strong>Alleati FW consigliati:</strong> potenza delle tecniche di tiro +{VAL}<br><strong>Alleati MF consigliati:</strong> potenza delle tecniche di dribbling +{VAL}",
        levels: [
            { val: 8, req: "Niv.1" },
            { val: 17, req: "Niv.2" },
            { val: 26, req: "Niv.3" },
            { val: 34, req: "Niv.4" },
            { val: 43, req: "Niv.5" },
            { val: 52, req: "Niv.6" },
            { val: 60, req: "Niv.7" },
            { val: 69, req: "Niv.8" },
            { val: 78, req: "Niv.9" },
            { val: 87, req: "Niv.10" }
        ],
        actions: [
            { target: "team_InazumaJapan_recommended_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" },
            { target: "team_InazumaJapan_recommended_MF", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "always" }
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