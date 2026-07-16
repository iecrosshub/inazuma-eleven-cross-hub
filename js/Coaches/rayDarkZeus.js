// js/Coaches/rayDarkZeus.js
import { coachRegistry } from './registry.js';

// Recuperiamo la base se necessario, ma è meglio definirlo come entità a sé stante
const baseInfo = coachRegistry.find(coach => coach.id === "rayDarkZeus") || { id: "rayDarkZeus", name: "Ray Dark (Zeus)", title: "Zeus" };

export const coachData = {
    ...baseInfo,
    artwork: "img/Coaches/RayDark.png", // Assicurati di avere o rinominare l'immagine corretta
    level: 10,
    teamBonusScore: 19200,
    formationName: "F-Zeus",
    formationConditions: [
        { slotCode: 1, icon: "img/Position/Icon_Position_FW.png" }, // Condizione 1: FW
        { slotCode: 4, icon: "img/TagTitle/Icon_Tag_Team_Zeus.png" }, // Condizione 4: Tag Zeus
        { slotCode: 11, icon: "img/Element/Icon_Element_Mountain.png" } // Condizione 11: Elemento Montagna
    ],
    formationPassive: {
        title: "Attiva F-Zeus (アクティブ・F-ゼウス)",
        icons: ["img/Coaches/PassiveEffectIcon_AddMovePower.png"], // Icona generica per la potenza mossa
        text: "Ogni volta che una tecnica di Dribbling di un alleato MF ha successo:<br>Potenza delle tecniche di tutti gli alleati +10<br><strong>Condizione di fine:</strong> Quando un alleato segna un gol.",
        actions: [] // Lasciamo vuoto perché le passive "in-game" dinamiche di solito non si applicano alle statistiche base nel builder
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
            // Targetta i Centrocampisti (MF) e aumenta il Dribbling
            { target: "team_MF", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "always" },
            // Targetta chi ha il tag Zeus e aumenta il Tiro
            { target: "team_zeus", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL2}", condition: "always" }
        ]
    },
    slots: [
        // Attaccante (FW)
        { number: 1, position: "FW", x: 50, y: 15, baseAsset: "img/Position/Img_FWBase.png" },

        // Centrocampisti (MF) - 5 Giocatori
        { number: 2, position: "MF", x: 18, y: 25, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 6, position: "MF", x: 82, y: 25, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 3, position: "MF", x: 22, y: 45, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 4, position: "MF", x: 50, y: 40, baseAsset: "img/Position/Img_MFBase.png" },
        { number: 5, position: "MF", x: 78, y: 45, baseAsset: "img/Position/Img_MFBase.png" },

        // Difensori (DF) - 4 Giocatori
        { number: 7, position: "DF", x: 20, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 8, position: "DF", x: 80, y: 65, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 9, position: "DF", x: 35, y: 78, baseAsset: "img/Position/Img_DFBase.png" },
        { number: 10, position: "DF", x: 65, y: 78, baseAsset: "img/Position/Img_DFBase.png" },

        // Portiere (GK)
        { number: 11, position: "GK", x: 50, y: 90, baseAsset: "img/Position/Img_GKBase.png" }
    ]
};