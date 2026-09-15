import { coachRegistry } from './registry.js';

const baseInfo = coachRegistry.find(coach => coach.id === "linaSchiller");

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/LinaSchiller.png",
    level: 10,
    formationName: "F-Raimon 2 (F-ライモン2)",

    // Condizioni lette dall'immagine
    formationConditions: [
        { slotCode: 1, icon: "img/Element/Icon_Element_Forest.png" }, // Foresta
        { slotCode: 5, icon: "img/Element/Icon_Element_Wind.png" },   // Vento
        // Lo slot 6 accetta sia Foresta che Vento. Modifica la logica "icons" in base al tuo motore JS.
        { slotCode: 6, icons: ["img/Element/Icon_Element_Forest.png", "img/Element/Icon_Element_Wind.png"] }
    ],

    // --- SLOT DA COMPILARE PER LA PASSIVA DELLA FORMAZIONE ---
    formationPassive: {
        title: "??? (Da compilare)",
        icons: ["img/Coaches/PassiveEffectIcon_Placeholder.png"],
        text: "Testo della F-Passive da inserire qui...",
        actions: [
            // { targetScope: "team", ... }
        ]
    },

    // --- SLOT DA COMPILARE PER LA PASSIVA DELL'ALLENATORE ---
    coachPassive: {
        id: "coach_passive_schiller",
        title: "??? (Da compilare)",
        icons: ["img/Coaches/PassiveEffectIcon_Placeholder.png"],
        template: "Descrizione della passiva dell'allenatore con {VAL}...",
        levels: [
            { val: 0, req: "Niv.1" },
            { val: 0, req: "Niv.2" },
            { val: 0, req: "Niv.3" },
            { val: 0, req: "Niv.4" },
            { val: 0, req: "Niv.5" },
            { val: 0, req: "Niv.6" },
            { val: 0, req: "Niv.7" },
            { val: 0, req: "Niv.8" },
            { val: 0, req: "Niv.9" },
            { val: 0, req: "Niv.10" }
        ],
        actions: [
            // { targetScope: "team", ... }
        ]
    },

    // Griglia della F-Raimon 2 ricavata dall'immagine
    slots: [
        { number: 1, position: "FW", x: 30, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 2, position: "FW", x: 70, y: 15, baseAsset: "img/Position/Img_FWBase.png" },
        { number: 3, position: "MF", x: 50, y: 35, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 30, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 70, y: 55, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 7, position: "DF", x: 20, y: 70, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 5, position: "MF", x: 50, y: 70, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 10, position: "DF", x: 80, y: 70, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 35, y: 85, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 65, y: 85, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 11, position: "GK", x: 50, y: 95, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};