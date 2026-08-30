// --- js/Passive/bonds.js ---

export const bondPassives = [
    {
        title: "[Legame] Tiro + (【結束】キック＋)",
        id: "103010001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon o Inazuma Japan, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 109, req: "Si sblocca con personaggio Lv. 1" },
            { val: 219, req: "Si sblocca con personaggio Lv. 21" },
            { val: 329, req: "Si sblocca con personaggio Lv. 71" },
            { val: 438, req: "Si sblocca con personaggio Lv. 101" },
            { val: 658, req: "Si sblocca con personaggio Lv. 131" },
            { val: 877, req: "Si sblocca con personaggio Lv. 161" },
            { val: 1097, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1316, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1755, req: "Si sblocca con personaggio Lv. 251" },
            { val: 2194, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_InazumaJapan", "Icon_Tag_Team_Raimon"],
            requiresCount: 3
        },
        effects: [
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "stat",
                statName: "Tiro",
                valueRef: "val"
            }
        ]
    },
    {
        title: "[Legame] Potenza Dribbling + (【結束】ドリブルパワー＋)",
        id: "103008003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Inazuma Japan, aumenta la potenza del Dribbling di {VAL}.",
        levels: [
            { val: 18, req: "Si sblocca con personaggio Lv. 41" },
            { val: 27, req: "Si sblocca con personaggio Lv. 61" },
            { val: 36, req: "Si sblocca con personaggio Lv. 91" },
            { val: 46, req: "Si sblocca con personaggio Lv. 121" },
            { val: 55, req: "Si sblocca con personaggio Lv. 151" },
            { val: 64, req: "Si sblocca con personaggio Lv. 181" },
            { val: 73, req: "Si sblocca con personaggio Lv. 211" },
            { val: 82, req: "Si sblocca con personaggio Lv. 241" },
            { val: 92, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_InazumaJapan"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Dribbling + (【結束】ドリブルパワー＋)",
        id: "103002004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Inazuma Japan, aumenta la potenza del proprio Dribbling di {VAL}.",
        levels: [
            { val: 82, req: "Si sblocca a: Advanced Player +" },
            { val: 109, req: "Si sblocca a: Top Player +" },
            { val: 137, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_InazumaJapan"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tiro FW + (【結束】ＦＷキック＋)",
        id: "103011001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Inazuma Japan, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 26, req: "Si sblocca con personaggio Lv. 1" },
            { val: 53, req: "Si sblocca con personaggio Lv. 21" },
            { val: 80, req: "Si sblocca con personaggio Lv. 71" },
            { val: 107, req: "Si sblocca con personaggio Lv. 101" },
            { val: 161, req: "Si sblocca con personaggio Lv. 131" },
            { val: 215, req: "Si sblocca con personaggio Lv. 161" },
            { val: 269, req: "Si sblocca con personaggio Lv. 191" },
            { val: 322, req: "Si sblocca con personaggio Lv. 221" },
            { val: 430, req: "Si sblocca con personaggio Lv. 251" },
            { val: 538, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_InazumaJapan"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Blocco DF + (【結束】味方ＤＦブロック技威力＋)",
        id: "101013003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la potenza delle tecniche di Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 5, req: "Si sblocca con personaggio Lv. 61" },
            { val: 6, req: "Si sblocca con personaggio Lv. 91" },
            { val: 8, req: "Si sblocca con personaggio Lv. 121" },
            { val: 10, req: "Si sblocca con personaggio Lv. 151" },
            { val: 11, req: "Si sblocca con personaggio Lv. 181" },
            { val: 13, req: "Si sblocca con personaggio Lv. 211" },
            { val: 15, req: "Si sblocca con personaggio Lv. 241" },
            { val: 17, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_Raimon"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco DF + (【結束】味方ＤＦブロック＋)",
        id: "101002003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 140, req: "Si sblocca con personaggio Lv. 41" },
            { val: 210, req: "Si sblocca con personaggio Lv. 61" },
            { val: 280, req: "Si sblocca con personaggio Lv. 91" },
            { val: 350, req: "Si sblocca con personaggio Lv. 121" },
            { val: 420, req: "Si sblocca con personaggio Lv. 151" },
            { val: 490, req: "Si sblocca con personaggio Lv. 181" },
            { val: 560, req: "Si sblocca con personaggio Lv. 211" },
            { val: 630, req: "Si sblocca con personaggio Lv. 241" },
            { val: 700, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_Raimon"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco & Tiro Foresta + (【結束】林ブロック＆キック＋)",
        id: "101016001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Blocco e il Tiro dei compagni di attributo Foresta di {VAL}.",
        levels: [
            { val: 7, req: "Si sblocca con personaggio Lv. 1" },
            { val: 15, req: "Si sblocca con personaggio Lv. 21" },
            { val: 23, req: "Si sblocca con personaggio Lv. 71" },
            { val: 31, req: "Si sblocca con personaggio Lv. 101" },
            { val: 46, req: "Si sblocca con personaggio Lv. 131" },
            { val: 62, req: "Si sblocca con personaggio Lv. 161" },
            { val: 78, req: "Si sblocca con personaggio Lv. 191" },
            { val: 93, req: "Si sblocca con personaggio Lv. 221" },
            { val: 124, req: "Si sblocca con personaggio Lv. 251" },
            { val: 156, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_Raimon"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: ["Forest"], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "allies", targetRoles: [], targetElements: ["Forest"], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco FW + (【結束】味方ＦＷブロック＋)",
        id: "101154003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Kirkwood, aumenta il Blocco degli FW alleati di {VAL}.",
        levels: [
            { val: 140, req: "Si sblocca con personaggio Lv. 41" },
            { val: 210, req: "Si sblocca con personaggio Lv. 61" },
            { val: 280, req: "Si sblocca con personaggio Lv. 91" },
            { val: 350, req: "Si sblocca con personaggio Lv. 121" },
            { val: 420, req: "Si sblocca con personaggio Lv. 151" },
            { val: 490, req: "Si sblocca con personaggio Lv. 181" },
            { val: 560, req: "Si sblocca con personaggio Lv. 211" },
            { val: 630, req: "Si sblocca con personaggio Lv. 241" },
            { val: 700, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Kirkwood"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tiro FW + (【結束】ＦＷキック＋)",
        id: "101153003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Kirkwood, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 140, req: "Si sblocca con personaggio Lv. 41" },
            { val: 210, req: "Si sblocca con personaggio Lv. 61" },
            { val: 280, req: "Si sblocca con personaggio Lv. 91" },
            { val: 350, req: "Si sblocca con personaggio Lv. 121" },
            { val: 420, req: "Si sblocca con personaggio Lv. 151" },
            { val: 490, req: "Si sblocca con personaggio Lv. 181" },
            { val: 560, req: "Si sblocca con personaggio Lv. 211" },
            { val: 630, req: "Si sblocca con personaggio Lv. 241" },
            { val: 700, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Kirkwood"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Triangolo Z + (【結束】トライアングルZパワー＋改)",
        id: "101153004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Kirkwood, aumenta la potenza di Triangolo Z di {POWER} e riduce il costo TP di {TP}.",
        levels: [
            { power: 13, tp: 5, req: "Si sblocca a: Advanced Player +" },
            { power: 17, tp: 10, req: "Si sblocca a: Top Player +" },
            { power: 22, tp: 15, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Kirkwood"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "トライアングルＺ", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "tp_reduction", valueRef: "tp" }
        ]
    },
    {
        title: "[Legame] Tecnica FW + (【結束】ＦＷテクニック＋)",
        id: "101152003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Kirkwood, aumenta la Tecnica degli FW alleati di {VAL}.",
        levels: [
            { val: 134, req: "Si sblocca con personaggio Lv. 41" },
            { val: 201, req: "Si sblocca con personaggio Lv. 61" },
            { val: 268, req: "Si sblocca con personaggio Lv. 91" },
            { val: 336, req: "Si sblocca con personaggio Lv. 121" },
            { val: 403, req: "Si sblocca con personaggio Lv. 151" },
            { val: 470, req: "Si sblocca con personaggio Lv. 181" },
            { val: 537, req: "Si sblocca con personaggio Lv. 211" },
            { val: 604, req: "Si sblocca con personaggio Lv. 241" },
            { val: 672, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Kirkwood"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Tiro Fuoco FW + (【結束】ＦＷシュートパワー＋〈火〉)",
        id: "101152004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Kirkwood, aumenta la Potenza delle Tecniche di Tiro Fuoco degli FW alleati di {VAL}.",
        levels: [
            { val: 15, req: "Si sblocca a: Advanced Player +" },
            { val: 20, req: "Si sblocca a: Top Player +" },
            { val: 26, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Kirkwood"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tiro FW + (【共鳴】ＦＷキック＋)",
        id: "101040001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati di attributo Foresta, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 28, req: "Si sblocca con personaggio Lv. 1" },
            { val: 56, req: "Si sblocca con personaggio Lv. 21" },
            { val: 84, req: "Si sblocca con personaggio Lv. 71" },
            { val: 112, req: "Si sblocca con personaggio Lv. 101" },
            { val: 168, req: "Si sblocca con personaggio Lv. 131" },
            { val: 224, req: "Si sblocca con personaggio Lv. 161" },
            { val: 280, req: "Si sblocca con personaggio Lv. 191" },
            { val: 336, req: "Si sblocca con personaggio Lv. 221" },
            { val: 448, req: "Si sblocca con personaggio Lv. 251" },
            { val: 560, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresElements: ["Forest"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Tornado Oscuro + (【結束】ダークトルネードパワー＋改)",
        id: "101040003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la potenza di Tornado Oscuro di {POWER} e la sua distanza di {DIST}.",
        levels: [
            { power: 4, dist: 1, req: "Si sblocca con personaggio Lv. 41" },
            { power: 6, dist: 1, req: "Si sblocca con personaggio Lv. 61" },
            { power: 9, dist: 1, req: "Si sblocca con personaggio Lv. 91" },
            { power: 11, dist: 2, req: "Si sblocca con personaggio Lv. 121" },
            { power: 13, dist: 2, req: "Si sblocca con personaggio Lv. 151" },
            { power: 16, dist: 2, req: "Si sblocca con personaggio Lv. 181" },
            { power: 18, dist: 3, req: "Si sblocca con personaggio Lv. 211" },
            { power: 20, dist: 3, req: "Si sblocca con personaggio Lv. 241" },
            { power: 23, dist: 3, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ダークトルネード", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Distanza", valueRef: "dist" }
        ]
    },
    {
        title: "[Legame] Tiro FW + (【結束】ＦＷキック＋)",
        id: "101010001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 28, req: "Si sblocca con personaggio Lv. 1" },
            { val: 56, req: "Si sblocca con personaggio Lv. 21" },
            { val: 84, req: "Si sblocca con personaggio Lv. 71" },
            { val: 112, req: "Si sblocca con personaggio Lv. 101" },
            { val: 168, req: "Si sblocca con personaggio Lv. 131" },
            { val: 224, req: "Si sblocca con personaggio Lv. 161" },
            { val: 280, req: "Si sblocca con personaggio Lv. 191" },
            { val: 336, req: "Si sblocca con personaggio Lv. 221" },
            { val: 448, req: "Si sblocca con personaggio Lv. 251" },
            { val: 560, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Risonanza] Potenza Dribbling + (【共鳴】ドリブルパワー＋)",
        id: "101143003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati di elemento Fuoco, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca con personaggio Lv. 41" },
            { val: 15, req: "Si sblocca con personaggio Lv. 61" },
            { val: 20, req: "Si sblocca con personaggio Lv. 91" },
            { val: 25, req: "Si sblocca con personaggio Lv. 121" },
            { val: 30, req: "Si sblocca con personaggio Lv. 151" },
            { val: 35, req: "Si sblocca con personaggio Lv. 181" },
            { val: 40, req: "Si sblocca con personaggio Lv. 211" },
            { val: 45, req: "Si sblocca con personaggio Lv. 241" },
            { val: 51, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresElements: ["Fire"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tecnica MF/DF Avversari - (【共鳴】敵ＭＦ・ＤＦテクニック－)",
        id: "101100003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati di elemento Foresta, riduce la Tecnica dei MF e DF avversari di {VAL}.",
        levels: [
            { val: 56, req: "Si sblocca con personaggio Lv. 41" },
            { val: 84, req: "Si sblocca con personaggio Lv. 61" },
            { val: 112, req: "Si sblocca con personaggio Lv. 91" },
            { val: 140, req: "Si sblocca con personaggio Lv. 121" },
            { val: 168, req: "Si sblocca con personaggio Lv. 151" },
            { val: 196, req: "Si sblocca con personaggio Lv. 181" },
            { val: 224, req: "Si sblocca con personaggio Lv. 211" },
            { val: 252, req: "Si sblocca con personaggio Lv. 241" },
            { val: 280, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresElements: ["Forest"], requiresCount: 3 },
        effects: [
            { targetScope: "enemy", targetRoles: ["MF", "DF"], targetElements: [], type: "stat_debuff", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tecnica Team + (【結束】チームテクニック＋)",
        id: "101001001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la Tecnica di tutti gli alleati di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca con personaggio Lv. 1" },
            { val: 21, req: "Si sblocca con personaggio Lv. 21" },
            { val: 31, req: "Si sblocca con personaggio Lv. 71" },
            { val: 42, req: "Si sblocca con personaggio Lv. 101" },
            { val: 63, req: "Si sblocca con personaggio Lv. 131" },
            { val: 84, req: "Si sblocca con personaggio Lv. 161" },
            { val: 105, req: "Si sblocca con personaggio Lv. 191" },
            { val: 126, req: "Si sblocca con personaggio Lv. 221" },
            { val: 168, req: "Si sblocca con personaggio Lv. 251" },
            { val: 210, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tiro Team + (【結束】チームキック＋)",
        id: "101001003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Tiro di tutti gli alleati di {VAL}.",
        levels: [
            { val: 52, req: "Si sblocca con personaggio Lv. 41" },
            { val: 78, req: "Si sblocca con personaggio Lv. 61" },
            { val: 105, req: "Si sblocca con personaggio Lv. 91" },
            { val: 131, req: "Si sblocca con personaggio Lv. 121" },
            { val: 157, req: "Si sblocca con personaggio Lv. 151" },
            { val: 184, req: "Si sblocca con personaggio Lv. 181" },
            { val: 210, req: "Si sblocca con personaggio Lv. 211" },
            { val: 236, req: "Si sblocca con personaggio Lv. 241" },
            { val: 263, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tecnica Team + (【結束】チームテクニック＋)",
        id: "101003003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la Tecnica di tutti gli alleati di {VAL}.",
        levels: [
            { val: 42, req: "Si sblocca con personaggio Lv. 41" },
            { val: 63, req: "Si sblocca con personaggio Lv. 61" },
            { val: 84, req: "Si sblocca con personaggio Lv. 91" },
            { val: 105, req: "Si sblocca con personaggio Lv. 121" },
            { val: 126, req: "Si sblocca con personaggio Lv. 151" },
            { val: 147, req: "Si sblocca con personaggio Lv. 181" },
            { val: 168, req: "Si sblocca con personaggio Lv. 211" },
            { val: 189, req: "Si sblocca con personaggio Lv. 241" },
            { val: 210, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco DF + (【結束】ＤＦブロック＋)",
        id: "101004001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 23, req: "Si sblocca con personaggio Lv. 1" },
            { val: 46, req: "Si sblocca con personaggio Lv. 21" },
            { val: 70, req: "Si sblocca con personaggio Lv. 71" },
            { val: 93, req: "Si sblocca con personaggio Lv. 101" },
            { val: 140, req: "Si sblocca con personaggio Lv. 131" },
            { val: 186, req: "Si sblocca con personaggio Lv. 161" },
            { val: 233, req: "Si sblocca con personaggio Lv. 191" },
            { val: 280, req: "Si sblocca con personaggio Lv. 221" },
            { val: 373, req: "Si sblocca con personaggio Lv. 251" },
            { val: 467, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco DF + (【結束】味方ＤＦブロック＋)",
        id: "101005001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 23, req: "Si sblocca con personaggio Lv. 1" },
            { val: 46, req: "Si sblocca con personaggio Lv. 21" },
            { val: 70, req: "Si sblocca con personaggio Lv. 71" },
            { val: 93, req: "Si sblocca con personaggio Lv. 101" },
            { val: 140, req: "Si sblocca con personaggio Lv. 131" },
            { val: 186, req: "Si sblocca con personaggio Lv. 161" },
            { val: 233, req: "Si sblocca con personaggio Lv. 191" },
            { val: 280, req: "Si sblocca con personaggio Lv. 221" },
            { val: 373, req: "Si sblocca con personaggio Lv. 251" },
            { val: 467, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Dribbling + (【結束】ドリブルパワー＋)",
        id: "101005003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la potenza della propria tecnica di Dribbling di {VAL}.",
        levels: [
            { val: 8, req: "Si sblocca con personaggio Lv. 41" },
            { val: 12, req: "Si sblocca con personaggio Lv. 61" },
            { val: 16, req: "Si sblocca con personaggio Lv. 91" },
            { val: 20, req: "Si sblocca con personaggio Lv. 121" },
            { val: 24, req: "Si sblocca con personaggio Lv. 151" },
            { val: 28, req: "Si sblocca con personaggio Lv. 181" },
            { val: 32, req: "Si sblocca con personaggio Lv. 211" },
            { val: 36, req: "Si sblocca con personaggio Lv. 241" },
            { val: 41, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco DF + (【結束】ＤＦブロック＋)",
        id: "101006003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 112, req: "Si sblocca con personaggio Lv. 41" },
            { val: 168, req: "Si sblocca con personaggio Lv. 61" },
            { val: 224, req: "Si sblocca con personaggio Lv. 91" },
            { val: 280, req: "Si sblocca con personaggio Lv. 121" },
            { val: 336, req: "Si sblocca con personaggio Lv. 151" },
            { val: 392, req: "Si sblocca con personaggio Lv. 181" },
            { val: 448, req: "Si sblocca con personaggio Lv. 211" },
            { val: 504, req: "Si sblocca con personaggio Lv. 241" },
            { val: 560, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Tiro FW Foresta + (【結束】林ＦＷシュートパワー＋)",
        id: "101006004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la potenza delle tecniche di tiro degli FW alleati di attributo Foresta di {VAL}.",
        levels: [
            { val: 16, req: "Si sblocca a: Advanced Player +" },
            { val: 21, req: "Si sblocca a: Top Player +" },
            { val: 27, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tecnica MF + (【結束】ＭＦテクニック＋)",
        id: "101007003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la Tecnica degli alleati MF di {VAL}.",
        levels: [
            { val: 149, req: "Si sblocca con personaggio Lv. 41" },
            { val: 224, req: "Si sblocca con personaggio Lv. 61" },
            { val: 298, req: "Si sblocca con personaggio Lv. 91" },
            { val: 373, req: "Si sblocca con personaggio Lv. 121" },
            { val: 448, req: "Si sblocca con personaggio Lv. 151" },
            { val: 522, req: "Si sblocca con personaggio Lv. 181" },
            { val: 597, req: "Si sblocca con personaggio Lv. 211" },
            { val: 672, req: "Si sblocca con personaggio Lv. 241" },
            { val: 747, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tiro Personale + (【結束】キック＋)",
        id: "101008003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 336, req: "Si sblocca con personaggio Lv. 41" },
            { val: 504, req: "Si sblocca con personaggio Lv. 61" },
            { val: 672, req: "Si sblocca con personaggio Lv. 91" },
            { val: 840, req: "Si sblocca con personaggio Lv. 121" },
            { val: 1008, req: "Si sblocca con personaggio Lv. 151" },
            { val: 1176, req: "Si sblocca con personaggio Lv. 181" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 211" },
            { val: 1512, req: "Si sblocca con personaggio Lv. 241" },
            { val: 1680, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Fuoco + (【結束】パワー＋〈火〉)",
        id: "101008004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la propria potenza delle tecniche Fuoco di {VAL}.",
        levels: [
            { val: 33, req: "Si sblocca a: Advanced Player +" },
            { val: 44, req: "Si sblocca a: Top Player +" },
            { val: 55, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Tiro + (【結束】シュートパワー＋)",
        id: "101012001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la propria potenza di Tiro di {VAL}.",
        levels: [
            { val: 1, req: "Si sblocca con personaggio Lv. 1" },
            { val: 3, req: "Si sblocca con personaggio Lv. 21" },
            { val: 5, req: "Si sblocca con personaggio Lv. 71" },
            { val: 6, req: "Si sblocca con personaggio Lv. 101" },
            { val: 10, req: "Si sblocca con personaggio Lv. 131" },
            { val: 13, req: "Si sblocca con personaggio Lv. 161" },
            { val: 17, req: "Si sblocca con personaggio Lv. 191" },
            { val: 20, req: "Si sblocca con personaggio Lv. 221" },
            { val: 27, req: "Si sblocca con personaggio Lv. 251" },
            { val: 34, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Risonanza] Potenza Tiro + (【共鳴】シュートパワー＋)",
        id: "101012003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati di elemento Foresta, aumenta la propria potenza di Tiro di {VAL}.",
        levels: [
            { val: 8, req: "Si sblocca con personaggio Lv. 41" },
            { val: 12, req: "Si sblocca con personaggio Lv. 61" },
            { val: 16, req: "Si sblocca con personaggio Lv. 91" },
            { val: 20, req: "Si sblocca con personaggio Lv. 121" },
            { val: 24, req: "Si sblocca con personaggio Lv. 151" },
            { val: 28, req: "Si sblocca con personaggio Lv. 181" },
            { val: 32, req: "Si sblocca con personaggio Lv. 211" },
            { val: 36, req: "Si sblocca con personaggio Lv. 241" },
            { val: 41, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresElements: ["Forest"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Schianto del Viso + (【結束】メガネクラッシュパワー＋改)",
        id: "101012004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la potenza di Schianto del Viso di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 39, crt: 600, req: "Si sblocca a: Advanced Player +" },
            { power: 52, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 66, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "メガネクラッシュ", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "crit_rate", valueRef: "crt" }
        ]
    },
    {
        title: "[Legame] Tecnica DF + (【結束】ＤＦテクニック＋)",
        id: "101041001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta la Tecnica dei compagni DF di {VAL}.",
        levels: [
            { val: 23, req: "Si sblocca con personaggio Lv. 1" },
            { val: 46, req: "Si sblocca con personaggio Lv. 21" },
            { val: 70, req: "Si sblocca con personaggio Lv. 71" },
            { val: 93, req: "Si sblocca con personaggio Lv. 101" },
            { val: 140, req: "Si sblocca con personaggio Lv. 131" },
            { val: 186, req: "Si sblocca con personaggio Lv. 161" },
            { val: 233, req: "Si sblocca con personaggio Lv. 191" },
            { val: 280, req: "Si sblocca con personaggio Lv. 221" },
            { val: 373, req: "Si sblocca con personaggio Lv. 251" },
            { val: 467, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tiro + (【結束】キック＋)",
        id: "101077001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon o Inazuma Kids FC, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 68, req: "Si sblocca con personaggio Lv. 1" },
            { val: 137, req: "Si sblocca con personaggio Lv. 21" },
            { val: 205, req: "Si sblocca con personaggio Lv. 71" },
            { val: 274, req: "Si sblocca con personaggio Lv. 101" },
            { val: 411, req: "Si sblocca con personaggio Lv. 131" },
            { val: 548, req: "Si sblocca con personaggio Lv. 161" },
            { val: 685, req: "Si sblocca con personaggio Lv. 191" },
            { val: 822, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1096, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1371, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_Raimon", "Icon_Tag_Team_InazumaKidsFC"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Risonanza] Potenza + (Foresta) (【共鳴】パワー＋〈林〉)",
        id: "101078001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati di elemento Foresta, aumenta la potenza delle proprie tecniche di elemento Foresta di {VAL}.",
        levels: [
            { val: 1, req: "Si sblocca con personaggio Lv. 1" },
            { val: 3, req: "Si sblocca con personaggio Lv. 21" },
            { val: 5, req: "Si sblocca con personaggio Lv. 71" },
            { val: 6, req: "Si sblocca con personaggio Lv. 101" },
            { val: 10, req: "Si sblocca con personaggio Lv. 131" },
            { val: 13, req: "Si sblocca con personaggio Lv. 161" },
            { val: 17, req: "Si sblocca con personaggio Lv. 191" },
            { val: 20, req: "Si sblocca con personaggio Lv. 221" },
            { val: 27, req: "Si sblocca con personaggio Lv. 251" },
            { val: 34, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Bond",
        conditions: { requiresElements: ["Forest"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Blocco MF/DF + (【結束】ＭＦ・ＤＦブロック＋)",
        id: "101020003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Teikoku (Royal Academy), aumenta il Blocco degli MF e DF alleati di {VAL}.",
        levels: [
            { val: 56, req: "Si sblocca con personaggio Lv. 41" },
            { val: 84, req: "Si sblocca con personaggio Lv. 61" },
            { val: 112, req: "Si sblocca con personaggio Lv. 91" },
            { val: 140, req: "Si sblocca con personaggio Lv. 121" },
            { val: 168, req: "Si sblocca con personaggio Lv. 151" },
            { val: 196, req: "Si sblocca con personaggio Lv. 181" },
            { val: 224, req: "Si sblocca con personaggio Lv. 211" },
            { val: 252, req: "Si sblocca con personaggio Lv. 241" },
            { val: 280, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Emperors"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["MF", "DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tecnica MF Vento + (【結束】風ＭＦテクニック＋)",
        id: "101023003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Royal Academy, aumenta la Tecnica degli MF alleati di elemento Vento di {VAL}.",
        levels: [
            { val: 168, req: "Si sblocca con personaggio Lv. 41" },
            { val: 252, req: "Si sblocca con personaggio Lv. 61" },
            { val: 336, req: "Si sblocca con personaggio Lv. 91" },
            { val: 420, req: "Si sblocca con personaggio Lv. 121" },
            { val: 504, req: "Si sblocca con personaggio Lv. 151" },
            { val: 588, req: "Si sblocca con personaggio Lv. 181" },
            { val: 672, req: "Si sblocca con personaggio Lv. 211" },
            { val: 756, req: "Si sblocca con personaggio Lv. 241" },
            { val: 840, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Emperors"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: ["Wind"], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Tiro FW + (【結束】ＦＷキック＋)",
        id: "101009003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Raimon, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 149, req: "Si sblocca con personaggio Lv. 41" },
            { val: 224, req: "Si sblocca con personaggio Lv. 61" },
            { val: 298, req: "Si sblocca con personaggio Lv. 91" },
            { val: 373, req: "Si sblocca con personaggio Lv. 121" },
            { val: 448, req: "Si sblocca con personaggio Lv. 151" },
            { val: 522, req: "Si sblocca con personaggio Lv. 181" },
            { val: 597, req: "Si sblocca con personaggio Lv. 211" },
            { val: 672, req: "Si sblocca con personaggio Lv. 241" },
            { val: 747, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Raimon"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Parata GK + (【結束】ＧＫキーパーパワー＋)",
        id: "101158003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Zeus, aumenta la potenza delle tecniche di parata dei GK alleati di {VAL}.",
        levels: [
            { val: 5, req: "Si sblocca con personaggio Lv. 41" },
            { val: 8, req: "Si sblocca con personaggio Lv. 61" },
            { val: 11, req: "Si sblocca con personaggio Lv. 91" },
            { val: 13, req: "Si sblocca con personaggio Lv. 121" },
            { val: 16, req: "Si sblocca con personaggio Lv. 151" },
            { val: 19, req: "Si sblocca con personaggio Lv. 181" },
            { val: 21, req: "Si sblocca con personaggio Lv. 211" },
            { val: 24, req: "Si sblocca con personaggio Lv. 241" },
            { val: 27, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_Zeus"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "allies", targetRoles: ["GK"], targetElements: [], type: "power", moveKind: "Parata", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Dribbling + (【結束】ドリブルパワー＋)",
        id: "101157004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Zeus, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 33, req: "Si sblocca a: Advanced Player +" },
            { val: 44, req: "Si sblocca a: Top Player +" },
            { val: 55, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: {
            requiresTags: ["Icon_Tag_Team_Zeus"],
            requiresCount: 3
        },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Blocco + (【結束】ブロックパワー＋)",
        id: "101156004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Zeus, aumenta la potenza delle proprie tecniche di Blocco di {VAL}.",
        levels: [
            { val: 33, req: "Si sblocca a: Advanced Player +" },
            { val: 44, req: "Si sblocca a: Top Player +" },
            { val: 55, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Zeus"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Blocco MF + (【結束】ＭＦブロックパワー＋)",
        id: "101161001",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Zeus, aumenta la potenza delle tecniche di blocco dei compagni MF di {VAL}.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 4, req: "Si sblocca con personaggio Lv. 61" },
            { val: 5, req: "Si sblocca con personaggio Lv. 91" },
            { val: 7, req: "Si sblocca con personaggio Lv. 121" },
            { val: 8, req: "Si sblocca con personaggio Lv. 151" },
            { val: 9, req: "Si sblocca con personaggio Lv. 181" },
            { val: 11, req: "Si sblocca con personaggio Lv. 211" },
            { val: 12, req: "Si sblocca con personaggio Lv. 241" },
            { val: 13, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Zeus"], requiresCount: 3 },
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Tiro + (【結束】シュートパワー＋)",
        id: "101163003",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Zeus, aumenta la potenza delle proprie tecniche di Tiro di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca con personaggio Lv. 41" },
            { val: 15, req: "Si sblocca con personaggio Lv. 61" },
            { val: 20, req: "Si sblocca con personaggio Lv. 91" },
            { val: 25, req: "Si sblocca con personaggio Lv. 121" },
            { val: 30, req: "Si sblocca con personaggio Lv. 151" },
            { val: 35, req: "Si sblocca con personaggio Lv. 181" },
            { val: 40, req: "Si sblocca con personaggio Lv. 211" },
            { val: 45, req: "Si sblocca con personaggio Lv. 241" },
            { val: 51, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Zeus"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Legame] Potenza Parata + (【結束】キーパーパワー＋)",
        id: "101155004",
        template: "All'inizio della partita, se ci sono almeno 3 alleati con tag Zeus, aumenta la potenza delle proprie tecniche di Parata di {VAL}.",
        levels: [
            { val: 40, req: "Si sblocca a: Advanced Player +" },
            { val: 54, req: "Si sblocca a: Top Player +" },
            { val: 68, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Bond",
        conditions: { requiresTags: ["Icon_Tag_Team_Zeus"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Parata", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Blocco DF + (Young Inazuma) [【結束】ＤＦブロック＋]",
        id: "102045001",
        template: "All'inizio della partita, se ci sono 3 o più compagni con il tag 'Young Inazuma', aumenta la statistica di Difesa (Block) dei compagni DF di {VAL}.",
        levels: [
            { val: 28, req: "Si sblocca con personaggio Lv. 1" },
            { val: 56, req: "Si sblocca con personaggio Lv. 21" },
            { val: 84, req: "Si sblocca con personaggio Lv. 71" },
            { val: 112, req: "Si sblocca con personaggio Lv. 101" },
            { val: 168, req: "Si sblocca con personaggio Lv. 131" },
            { val: 224, req: "Si sblocca con personaggio Lv. 161" },
            { val: 280, req: "Si sblocca con personaggio Lv. 191" },
            { val: 336, req: "Si sblocca con personaggio Lv. 221" },
            { val: 448, req: "Si sblocca con personaggio Lv. 251" },
            { val: 560, req: "Si sblocca con personaggio Lv. 281" },
            { val: 616, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { tag: "Young Inazuma", count: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Difesa", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tiro FW + (Young Inazuma) [【結束】ＦＷキック＋]",
        id: "102052001",
        template: "All'inizio della partita, se ci sono 3 o più compagni con il tag 'Young Inazuma', aumenta il Tiro (Kick) dei compagni FW di {VAL}.",
        levels: [
            { val: 23, req: "Si sblocca con personaggio Lv. 1" },
            { val: 46, req: "Si sblocca con personaggio Lv. 21" },
            { val: 70, req: "Si sblocca con personaggio Lv. 71" },
            { val: 93, req: "Si sblocca con personaggio Lv. 101" },
            { val: 140, req: "Si sblocca con personaggio Lv. 131" },
            { val: 186, req: "Si sblocca con personaggio Lv. 161" },
            { val: 233, req: "Si sblocca con personaggio Lv. 191" },
            { val: 280, req: "Si sblocca con personaggio Lv. 221" },
            { val: 373, req: "Si sblocca con personaggio Lv. 251" },
            { val: 467, req: "Si sblocca con personaggio Lv. 281" },
            { val: 513, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { tag: "Young Inazuma", count: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tecnica MF + (Young Inazuma) [【結束】ＭＦテクニック＋]",
        id: "102051001",
        template: "All'inizio della partita, se ci sono 3 o più compagni con il tag 'Young Inazuma', aumenta la Tecnica dei compagni MF di {VAL}.",
        levels: [
            { val: 23, req: "Si sblocca con personaggio Lv. 1" },
            { val: 46, req: "Si sblocca con personaggio Lv. 21" },
            { val: 70, req: "Si sblocca con personaggio Lv. 71" },
            { val: 93, req: "Si sblocca con personaggio Lv. 101" },
            { val: 140, req: "Si sblocca con personaggio Lv. 131" },
            { val: 186, req: "Si sblocca con personaggio Lv. 161" },
            { val: 233, req: "Si sblocca con personaggio Lv. 191" },
            { val: 280, req: "Si sblocca con personaggio Lv. 221" },
            { val: 373, req: "Si sblocca con personaggio Lv. 251" },
            { val: 467, req: "Si sblocca con personaggio Lv. 281" },
            { val: 513, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { tag: "Young Inazuma", count: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },

    {
        title: "[Legame/Rarità] Potenza Dribbling MF + (Young Inazuma) [【結束】ＭＦドリブルパワー＋]",
        id: "102051004",
        template: "All'inizio della partita, se ci sono 3 o più compagni con il tag 'Young Inazuma', aumenta la potenza delle tecniche di Dribbling dei compagni MF di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca con: Advanced Player +" },
            { val: 14, req: "Si sblocca con: Top Player +" },
            { val: 18, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Bonds",
        conditions: { tag: "Young Inazuma", count: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tiro & Tecnica FW + (【結束】ＦＷキック＆テクニック＋)",
        id: "102054001",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Young Inazuma', aumenta il Tiro e la Tecnica dei compagni FW di {VAL}.",
        levels: [
            { val: 14, req: "Lv. 1" },
            { val: 29, req: "Lv. 21" },
            { val: 44, req: "Lv. 71" },
            { val: 59, req: "Lv. 101" },
            { val: 89, req: "Lv. 131" },
            { val: 119, req: "Lv. 161" },
            { val: 149, req: "Lv. 191" },
            { val: 179, req: "Lv. 221" },
            { val: 239, req: "Lv. 251" },
            { val: 299, req: "Lv. 281" },
            { val: 328, req: "Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Young Inazuma", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" },
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },

    {
        title: "[Legame/Rarità] Tiro FW + (【結束】ＦＷキック＋)",
        id: "102054004",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Young Inazuma', aumenta il Tiro dei compagni FW di {VAL}.",
        levels: [
            { val: 559, req: "Advanced Player +" },
            { val: 746, req: "Top Player +" },
            { val: 933, req: "Legendary Player +" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Young Inazuma", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tiro FW + / Blocco DF + (【結束】ＦＷキック＋／ＤＦブロック＋)",
        id: "102047001",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Young Inazuma', aumenta il Tiro dei compagni FW di {VAL} e il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 15, req: "Si sblocca con personaggio Lv. 1" },
            { val: 31, req: "Si sblocca con personaggio Lv. 21" },
            { val: 46, req: "Si sblocca con personaggio Lv. 71" },
            { val: 62, req: "Si sblocca con personaggio Lv. 101" },
            { val: 93, req: "Si sblocca con personaggio Lv. 131" },
            { val: 125, req: "Si sblocca con personaggio Lv. 161" },
            { val: 156, req: "Si sblocca con personaggio Lv. 191" },
            { val: 187, req: "Si sblocca con personaggio Lv. 221" },
            { val: 250, req: "Si sblocca con personaggio Lv. 251" },
            { val: 313, req: "Si sblocca con personaggio Lv. 281" },
            { val: 344, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Young Inazuma", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" },
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Blocco DF + / Parata GK + (【結束】ＤＦブロック＋／ＧＫキャッチ＋)",
        id: "102049003",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Young Inazuma', aumenta il Blocco dei compagni DF di {VAL} e la Parata dei compagni GK di {VAL}.",
        levels: [
            { val: 19, req: "Si sblocca con personaggio Lv. 1" },
            { val: 39, req: "Si sblocca con personaggio Lv. 21" },
            { val: 59, req: "Si sblocca con personaggio Lv. 71" },
            { val: 79, req: "Si sblocca con personaggio Lv. 101" },
            { val: 119, req: "Si sblocca con personaggio Lv. 131" },
            { val: 159, req: "Si sblocca con personaggio Lv. 161" },
            { val: 199, req: "Si sblocca con personaggio Lv. 191" },
            { val: 238, req: "Si sblocca con personaggio Lv. 221" },
            { val: 318, req: "Si sblocca con personaggio Lv. 251" },
            { val: 398, req: "Si sblocca con personaggio Lv. 281" },
            { val: 437, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Young Inazuma", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "team", targetRoles: ["GK"], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tiro FW + (【結束】ＦＷキック＋)",
        id: "102050003",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Young Inazuma', aumenta il Tiro dei compagni FW di {VAL}.",
        levels: [
            { val: 112, req: "Si sblocca con personaggio Lv. 41" },
            { val: 168, req: "Si sblocca con personaggio Lv. 61" },
            { val: 224, req: "Si sblocca con personaggio Lv. 91" },
            { val: 280, req: "Si sblocca con personaggio Lv. 121" },
            { val: 336, req: "Si sblocca con personaggio Lv. 151" },
            { val: 392, req: "Si sblocca con personaggio Lv. 181" },
            { val: 448, req: "Si sblocca con personaggio Lv. 211" },
            { val: 504, req: "Si sblocca con personaggio Lv. 241" },
            { val: 560, req: "Si sblocca con personaggio Lv. 271" },
            { val: 616, req: "Si sblocca con personaggio Lv. 301" },
            { val: 672, req: "Si sblocca con personaggio Lv. 331" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Young Inazuma", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Blocco + / Parata GK + (【結束】ブロック＋／ＧＫキャッチ＋)",
        id: "102046001",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Young Inazuma', aumenta il proprio Blocco di {VAL} e la Parata dei compagni GK di {VAL}.",
        levels: [
            { val: 31, req: "Si sblocca con personaggio Lv. 1" },
            { val: 62, req: "Si sblocca con personaggio Lv. 21" },
            { val: 93, req: "Si sblocca con personaggio Lv. 71" },
            { val: 125, req: "Si sblocca con personaggio Lv. 101" },
            { val: 187, req: "Si sblocca con personaggio Lv. 131" },
            { val: 250, req: "Si sblocca con personaggio Lv. 161" },
            { val: 312, req: "Si sblocca con personaggio Lv. 191" },
            { val: 375, req: "Si sblocca con personaggio Lv. 221" },
            { val: 500, req: "Si sblocca con personaggio Lv. 251" },
            { val: 625, req: "Si sblocca con personaggio Lv. 281" },
            { val: 687, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Young Inazuma", minCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "team", targetRoles: ["GK"], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Parata + (【結束】キャッチ＋)",
        id: "101166001",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Raimon', aumenta la propria Parata (Catch) di {VAL}.",
        levels: [
            { val: 352, req: "Si sblocca con personaggio Lv. 1" },
            { val: 470, req: "Si sblocca con personaggio Lv. 21" },
            { val: 588, req: "Si sblocca con personaggio Lv. 71" },
            { val: 705, req: "Si sblocca con personaggio Lv. 101" },
            { val: 940, req: "Si sblocca con personaggio Lv. 131" },
            { val: 1176, req: "Si sblocca con personaggio Lv. 161" },
            { val: 1411, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1646, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1999, req: "Si sblocca con personaggio Lv. 251" },
            { val: 2352, req: "Si sblocca con personaggio Lv. 281" },
            { val: 2704, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Raimon", minCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Blocco DF - (【結束】ＤＦブロック－)",
        id: "101168001",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Raimon', riduce il Blocco dei DF avversari di {VAL}.",
        levels: [
            { val: -117, req: "Si sblocca con personaggio Lv. 1" },
            { val: -156, req: "Si sblocca con personaggio Lv. 21" },
            { val: -196, req: "Si sblocca con personaggio Lv. 71" },
            { val: -235, req: "Si sblocca con personaggio Lv. 101" },
            { val: -313, req: "Si sblocca con personaggio Lv. 131" },
            { val: -392, req: "Si sblocca con personaggio Lv. 161" },
            { val: -470, req: "Si sblocca con personaggio Lv. 191" },
            { val: -548, req: "Si sblocca con personaggio Lv. 221" },
            { val: -666, req: "Si sblocca con personaggio Lv. 251" },
            { val: -784, req: "Si sblocca con personaggio Lv. 281" },
            { val: -901, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Raimon", minCount: 3 },
        effects: [
            { targetScope: "enemy_team", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Blocco DF + (【結束】ＤＦブロック＋)",
        id: "101170003",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Raimon', aumenta il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 210, req: "Si sblocca con personaggio Lv. 41" },
            { val: 280, req: "Si sblocca con personaggio Lv. 61" },
            { val: 350, req: "Si sblocca con personaggio Lv. 91" },
            { val: 420, req: "Si sblocca con personaggio Lv. 121" },
            { val: 490, req: "Si sblocca con personaggio Lv. 151" },
            { val: 560, req: "Si sblocca con personaggio Lv. 181" },
            { val: 630, req: "Si sblocca con personaggio Lv. 211" },
            { val: 665, req: "Si sblocca con personaggio Lv. 241" },
            { val: 700, req: "Si sblocca con personaggio Lv. 271" },
            { val: 770, req: "Si sblocca con personaggio Lv. 301" },
            { val: 840, req: "Si sblocca con personaggio Lv. 331" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Raimon", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },

    {
        title: "[Risonanza] Potenza Tiro MF Foresta + (【共鳴】林ＭＦシュートパワー＋)",
        id: "101175003",
        template: "All'inizio della partita, se ci sono 3 o più alleati di elemento Foresta, aumenta la potenza delle tecniche di Tiro dei compagni MF di elemento Foresta di {VAL}.",
        levels: [
            { val: 7, req: "Si sblocca con personaggio Lv. 41" },
            { val: 10, req: "Si sblocca con personaggio Lv. 61" },
            { val: 13, req: "Si sblocca con personaggio Lv. 91" },
            { val: 15, req: "Si sblocca con personaggio Lv. 121" },
            { val: 18, req: "Si sblocca con personaggio Lv. 151" },
            { val: 20, req: "Si sblocca con personaggio Lv. 181" },
            { val: 23, req: "Si sblocca con personaggio Lv. 211" },
            { val: 24, req: "Si sblocca con personaggio Lv. 241" },
            { val: 26, req: "Si sblocca con personaggio Lv. 271" },
            { val: 28, req: "Si sblocca con personaggio Lv. 301" },
            { val: 31, req: "Si sblocca con personaggio Lv. 331" }
        ],
        category: "Bonds",
        conditions: { type: "element_count", element: "Forest", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: ["Forest"], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "[Risonanza] Potenza Tecniche DF Montagna + (【共鳴】ＤＦパワー＋〈山〉)",
        id: "101172004",
        template: "All'inizio della partita, se ci sono 3 o più alleati di elemento Montagna, aumenta la potenza delle tecniche di elemento Montagna dei compagni DF di {VAL}.",
        levels: [
            { val: 12, req: "Si sblocca con: Advanced Player +" },
            { val: 15, req: "Si sblocca con: Top Player +" },
            { val: 18, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Bonds",
        conditions: { type: "element_count", element: "Mountain", minCount: 3 },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: null, moveElement: "Mountain", valueRef: "val" }
        ]
    },

    {
        title: "[Risonanza] Potenza Tiro FW Foresta - (【共鳴】ＦＷシュートパワー－〈林〉)",
        id: "101174004",
        template: "All'inizio della partita, se ci sono 3 o più alleati di elemento Fuoco, riduce la potenza delle tecniche di Tiro di elemento Foresta dei FW avversari di {VAL}.",
        levels: [
            { val: -15, req: "Si sblocca con: Advanced Player +" },
            { val: -18, req: "Si sblocca con: Top Player +" },
            { val: -22, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Bonds",
        conditions: { type: "element_count", element: "Fire", minCount: 3 },
        effects: [
            { targetScope: "enemy_team", targetRoles: ["FW"], targetElements: ["Wood"], type: "power", moveKind: "Tiro", moveElement: "Wood", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tecnica MF - (【結束】ＭＦテクニック－)",
        id: "101173001",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Raimon', riduce la Tecnica dei MF avversari di {VAL}.",
        levels: [
            { val: -70, req: "Si sblocca con personaggio Lv. 1" },
            { val: -93, req: "Si sblocca con personaggio Lv. 21" },
            { val: -116, req: "Si sblocca con personaggio Lv. 71" },
            { val: -140, req: "Si sblocca con personaggio Lv. 101" },
            { val: -186, req: "Si sblocca con personaggio Lv. 131" },
            { val: -233, req: "Si sblocca con personaggio Lv. 161" },
            { val: -280, req: "Si sblocca con personaggio Lv. 191" },
            { val: -326, req: "Si sblocca con personaggio Lv. 221" },
            { val: -396, req: "Si sblocca con personaggio Lv. 251" },
            { val: -467, req: "Si sblocca con personaggio Lv. 281" },
            { val: -537, req: "Si sblocca con personaggio Lv. 311" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Raimon", minCount: 3 },
        effects: [
            { targetScope: "enemy_team", targetRoles: ["MF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Potenza Blocco DF - (【結束】ＤＦブロックパワー－)",
        id: "101173004",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Raimon', riduce la potenza delle tecniche di Blocco dei DF avversari di {VAL}.",
        levels: [
            { val: -12, req: "Si sblocca con: Advanced Player +" },
            { val: -15, req: "Si sblocca con: Top Player +" },
            { val: -18, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Raimon", minCount: 3 },
        effects: [
            { targetScope: "enemy_team", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "[Legame] Tiro + (【結束】キック＋)",
        id: "102173003",
        template: "All'inizio della partita, se ci sono 3 o più alleati con il tag 'Inazuma Japan', aumenta il proprio Tiro di {VAL}.",
        levels: [
            // ... inserire gli altri livelli intermedi
            { val: 2704, req: "Si sblocca con personaggio Lv. 340" }
        ],
        category: "Bonds",
        conditions: { type: "tag_count", tag: "Inazuma Japan", minCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

];