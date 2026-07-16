// --- js/Passive/impeto_stacking.js ---

export const stackingPassives = [
    {
        title: "[Legame] Raimon/Inazuma Japan + (【自得点/累】雷門・イナズマジャパン＋)",
        id: "103010004",
        template: "Ogni volta che segna un Gol, aumenta Tutte le Statistiche degli Alleati con tag Raimon o Inazuma Japan di {VAL}.",
        levels: [
            { val: 119, req: "Si sblocca a: Advanced Player +" },
            { val: 159, req: "Si sblocca a: Top Player +" },
            { val: 199, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: {
            triggerEvent: "scored_goal_self"
        },
        effects: [
            {
                targetScope: "team",
                targetRoles: [],
                targetElements: [],
                targetTags: ["Icon_Tag_Team_InazumaJapan", "Icon_Tag_Team_Raimon"],
                type: "stat",
                statName: "All",
                valueRef: "val"
            }
        ]
    },
    {
        title: "[Impeto] Potenza Tiro + (【破竹/累】シュートパワー＋)",
        id: "101164003",
        template: "Ogni volta che il dribbling ha successo, aumenta la Potenza della Tecnica di Tiro di {VAL}. <br>Condizione reset: Gol segnato.",
        levels: [
            { val: 21, req: "Si sblocca con personaggio Lv. 41" },
            { val: 29, req: "Si sblocca con personaggio Lv. 61" },
            { val: 36, req: "Si sblocca con personaggio Lv. 91" },
            { val: 43, req: "Si sblocca con personaggio Lv. 121" },
            { val: 51, req: "Si sblocca con personaggio Lv. 151" },
            { val: 58, req: "Si sblocca con personaggio Lv. 181" },
            { val: 65, req: "Si sblocca con personaggio Lv. 211" },
            { val: 69, req: "Si sblocca con personaggio Lv. 241" },
            { val: 73, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Potenza Dribbling FW + (【連動/累】ＦＷドリブルパワー＋)",
        id: "103018003",
        template: "Ogni volta che il dribbling ha successo, aumenta la Potenza del Tiro degli FW di {VAL}. <br>Condizione reset: Gol segnato.",
        levels: [
            { val: 4, req: "Si sblocca con personaggio Lv. 41" },
            { val: 6, req: "Si sblocca con personaggio Lv. 61" },
            { val: 8, req: "Si sblocca con personaggio Lv. 91" },
            { val: 11, req: "Si sblocca con personaggio Lv. 121" },
            { val: 13, req: "Si sblocca con personaggio Lv. 151" },
            { val: 15, req: "Si sblocca con personaggio Lv. 181" },
            { val: 17, req: "Si sblocca con personaggio Lv. 211" },
            { val: 19, req: "Si sblocca con personaggio Lv. 241" },
            { val: 22, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Potenza Dribbling MF + (【破竹/累】ＭＦドリブルパワー＋)",
        id: "1010005003",
        template: "Ogni volta che la tecnica di dribbling/blocco ha successo, aumenta la potenza del Dribbling degli MF di {VAL}. <br>Condizione reset: Gol segnato.",
        levels: [
            { val: 4, req: "Si sblocca con personaggio Lv. 41" },
            { val: 7, req: "Si sblocca con personaggio Lv. 61" },
            { val: 9, req: "Si sblocca con personaggio Lv. 91" },
            { val: 12, req: "Si sblocca con personaggio Lv. 121" },
            { val: 14, req: "Si sblocca con personaggio Lv. 151" },
            { val: 16, req: "Si sblocca con personaggio Lv. 181" },
            { val: 19, req: "Si sblocca con personaggio Lv. 211" },
            { val: 21, req: "Si sblocca con personaggio Lv. 241" },
            { val: 24, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_or_block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Potenza Tiro + (【破竹/累】シュートパワー＋)",
        id: "1010004003",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, aumenta la potenza della propria tecnica di tiro di {VAL}. <br>Condizione reset: Gol segnato.",
        levels: [
            { val: 14, req: "Si sblocca con personaggio Lv. 41" },
            { val: 21, req: "Si sblocca con personaggio Lv. 61" },
            { val: 28, req: "Si sblocca con personaggio Lv. 91" },
            { val: 35, req: "Si sblocca con personaggio Lv. 121" },
            { val: 42, req: "Si sblocca con personaggio Lv. 151" },
            { val: 49, req: "Si sblocca con personaggio Lv. 181" },
            { val: 56, req: "Si sblocca con personaggio Lv. 211" },
            { val: 63, req: "Si sblocca con personaggio Lv. 241" },
            { val: 70, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Potenza Tiro & Tecnica + (【受球/累】シュートパワー＆テクニック＋)",
        id: "103017003",
        template: "Ogni volta che riceve un passaggio, aumenta la Potenza della Tecnica di Tiro di {VAL} e la propria Tecnica di {VAL2}. <br>Condizione reset: Gol segnato.",
        levels: [
            { val: 5, val2: 218, req: "Si sblocca con personaggio Lv. 41" },
            { val: 7, val2: 327, req: "Si sblocca con personaggio Lv. 61" },
            { val: 10, val2: 437, req: "Si sblocca con personaggio Lv. 91" },
            { val: 12, val2: 546, req: "Si sblocca con personaggio Lv. 121" },
            { val: 15, val2: 655, req: "Si sblocca con personaggio Lv. 151" },
            { val: 17, val2: 765, req: "Si sblocca con personaggio Lv. 181" },
            { val: 20, val2: 874, req: "Si sblocca con personaggio Lv. 211" },
            { val: 22, val2: 983, req: "Si sblocca con personaggio Lv. 241" },
            { val: 25, val2: 1093, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "receive_pass" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val2" }
        ]
    },
    {
        title: "[Impeto] Tiro FW + (【連鎖/累】ＦＷキック＋)",
        id: "103017004",
        template: "Ogni volta che si attiva una Catena di Tiro, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 632, req: "Si sblocca a: Advanced Player +" },
            { val: 843, req: "Si sblocca a: Top Player +" },
            { val: 1054, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "chain_shoot_active" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Avversità] Blocco & Parata DF/GK + (【逆境】ＤＦ・ＧＫブロック＆キャッチ＋)",
        id: "103003001",
        template: "Quando la propria tecnica di Blocco Tiri fallisce, aumenta il Blocco e la Parata degli alleati DF e GK di {VAL}.",
        levels: [
            { val: 11, req: "Si sblocca con personaggio Lv. 1" },
            { val: 23, req: "Si sblocca con personaggio Lv. 21" },
            { val: 35, req: "Si sblocca con personaggio Lv. 71" },
            { val: 47, req: "Si sblocca con personaggio Lv. 101" },
            { val: 71, req: "Si sblocca con personaggio Lv. 131" },
            { val: 95, req: "Si sblocca con personaggio Lv. 161" },
            { val: 119, req: "Si sblocca con personaggio Lv. 191" },
            { val: 143, req: "Si sblocca con personaggio Lv. 221" },
            { val: 191, req: "Si sblocca con personaggio Lv. 251" },
            { val: 239, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "block_fail" },
        effects: [
            { targetScope: "team", targetRoles: ["DF", "GK"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "team", targetRoles: ["DF", "GK"], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Tiro FW + (【破竹】ＦＷキック＋)",
        id: "103003003",
        template: "Quando la propria tecnica di Blocco Tiri ha successo, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 284, req: "Si sblocca con personaggio Lv. 41" },
            { val: 426, req: "Si sblocca con personaggio Lv. 61" },
            { val: 569, req: "Si sblocca con personaggio Lv. 91" },
            { val: 711, req: "Si sblocca con personaggio Lv. 121" },
            { val: 853, req: "Si sblocca con personaggio Lv. 151" },
            { val: 996, req: "Si sblocca con personaggio Lv. 181" },
            { val: 1138, req: "Si sblocca con personaggio Lv. 211" },
            { val: 1280, req: "Si sblocca con personaggio Lv. 241" },
            { val: 1423, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Tiro FW + (【破竹】ＦＷキック＋)",
        id: "103002003",
        template: "Quando si esegue con successo una tecnica di dribbling, aumenta il Tiro degli FW alleati di {VAL}. <br>Condizione di reset: Segnatura di un gol (alleato o nemico).",
        levels: [
            { val: 284, req: "Si sblocca con personaggio Lv. 41" },
            { val: 426, req: "Si sblocca con personaggio Lv. 61" },
            { val: 569, req: "Si sblocca con personaggio Lv. 91" },
            { val: 711, req: "Si sblocca con personaggio Lv. 121" },
            { val: 853, req: "Si sblocca con personaggio Lv. 151" },
            { val: 996, req: "Si sblocca con personaggio Lv. 181" },
            { val: 1138, req: "Si sblocca con personaggio Lv. 211" },
            { val: 1280, req: "Si sblocca con personaggio Lv. 241" },
            { val: 1423, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Tiro Team + (【破竹】チームキック＋)",
        id: "103007003",
        template: "Quando la propria tecnica di Blocco Tiri ha successo, aumenta il Tiro dei compagni di {VAL}. <br>Condizione di reset: Segnatura di un gol (alleato o nemico).",
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
        category: "Stacking",
        conditions: { triggerEvent: "block_success" },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

    {
        title: "[Cumulativa] Tecnica Foresta + (【破竹/累】林テクニック＋)",
        id: "103020001",
        template: "Ogni volta che la propria tecnica di portiere ha successo, aumenta la Tecnica degli alleati di elemento Foresta di {VAL}.",
        levels: [
            { val: 14, req: "Si sblocca con personaggio Lv. 1" },
            { val: 28, req: "Si sblocca con personaggio Lv. 21" },
            { val: 42, req: "Si sblocca con personaggio Lv. 71" },
            { val: 56, req: "Si sblocca con personaggio Lv. 101" },
            { val: 84, req: "Si sblocca con personaggio Lv. 131" },
            { val: 112, req: "Si sblocca con personaggio Lv. 161" },
            { val: 140, req: "Si sblocca con personaggio Lv. 191" },
            { val: 168, req: "Si sblocca con personaggio Lv. 221" },
            { val: 224, req: "Si sblocca con personaggio Lv. 251" },
            { val: 281, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "catch_success" },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: ["Forest"], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Tecnica FW/MF + (【連動/累】ＦＷ・ＭＦテクニック＋)",
        id: "103020004",
        template: "Ogni volta che il dribbling di un alleato ha successo, aumenta la Tecnica degli FW e MF alleati di {VAL}. <br>Condizione di reset: Gol segnato dagli alleati.",
        levels: [
            { val: 238, req: "Si sblocca a: Advanced Player +" },
            { val: 318, req: "Si sblocca a: Top Player +" },
            { val: 398, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "ally_dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW", "MF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Parata + (【失点/累】キャッチ＋)",
        id: "103001001",
        template: "Ogni volta che subisce un gol dagli avversari, aumenta la propria Parata di {VAL}.",
        levels: [
            { val: 59, req: "Si sblocca con personaggio Lv. 1" },
            { val: 119, req: "Si sblocca con personaggio Lv. 21" },
            { val: 179, req: "Si sblocca con personaggio Lv. 71" },
            { val: 239, req: "Si sblocca con personaggio Lv. 101" },
            { val: 358, req: "Si sblocca con personaggio Lv. 131" },
            { val: 478, req: "Si sblocca con personaggio Lv. 161" },
            { val: 597, req: "Si sblocca con personaggio Lv. 191" },
            { val: 717, req: "Si sblocca con personaggio Lv. 221" },
            { val: 956, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1195, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "concede_goal" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Tecnica Team + (【阻止/累】チームテクニック＋)",
        id: "103001003",
        template: "Ogni volta che para o blocca un tiro avversario, aumenta la Tecnica di tutti i compagni di squadra di {VAL}.",
        levels: [
            { val: 50, req: "Si sblocca con personaggio Lv. 41" },
            { val: 75, req: "Si sblocca con personaggio Lv. 61" },
            { val: 100, req: "Si sblocca con personaggio Lv. 91" },
            { val: 126, req: "Si sblocca con personaggio Lv. 121" },
            { val: 151, req: "Si sblocca con personaggio Lv. 151" },
            { val: 176, req: "Si sblocca con personaggio Lv. 181" },
            { val: 201, req: "Si sblocca con personaggio Lv. 211" },
            { val: 226, req: "Si sblocca con personaggio Lv. 241" },
            { val: 252, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "catch_or_block_success" },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Tiro FW + (【阻止/累】ＦＷキック＋)",
        id: "103001004",
        template: "Ogni volta che para o blocca un tiro avversario, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 597, req: "Si sblocca a: Advanced Player +" },
            { val: 796, req: "Si sblocca a: Top Player +" },
            { val: 996, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "catch_or_block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Potenza Tiro FW + (【破竹】ＦＷシュートパワー＋)",
        id: "103011003",
        template: "Ogni volta che il proprio dribbling ha successo, aumenta la Potenza della Tecnica di Tiro degli FW alleati di {VAL}. Condizione reset: Gol segnato.",
        levels: [
            { val: 4, req: "Si sblocca con personaggio Lv. 41" },
            { val: 6, req: "Si sblocca con personaggio Lv. 61" },
            { val: 8, req: "Si sblocca con personaggio Lv. 91" },
            { val: 10, req: "Si sblocca con personaggio Lv. 121" },
            { val: 12, req: "Si sblocca con personaggio Lv. 151" },
            { val: 14, req: "Si sblocca con personaggio Lv. 181" },
            { val: 16, req: "Si sblocca con personaggio Lv. 211" },
            { val: 18, req: "Si sblocca con personaggio Lv. 241" },
            { val: 20, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Potenza Blocco + (【失点/累】ブロックパワー＋)",
        id: "103012004",
        template: "Ogni volta che si subisce un gol dagli avversari, aumenta la Potenza delle proprie tecniche di Blocco di {VAL}. Condizione di reset: Gol segnato dagli alleati.",
        levels: [
            { val: 31, req: "Si sblocca a: Advanced Player +" },
            { val: 41, req: "Si sblocca a: Top Player +" },
            { val: 52, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "concede_goal" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Tiro Foresta + (【破竹】林キック＋)",
        id: "103006003",
        template: "Quando il proprio dribbling ha successo, aumenta il Tiro degli alleati di attributo Foresta di {VAL}.",
        levels: [
            { val: 74, req: "Si sblocca con personaggio Lv. 41" },
            { val: 111, req: "Si sblocca con personaggio Lv. 61" },
            { val: 149, req: "Si sblocca con personaggio Lv. 91" },
            { val: 186, req: "Si sblocca con personaggio Lv. 121" },
            { val: 223, req: "Si sblocca con personaggio Lv. 151" },
            { val: 261, req: "Si sblocca con personaggio Lv. 181" },
            { val: 298, req: "Si sblocca con personaggio Lv. 211" },
            { val: 335, req: "Si sblocca con personaggio Lv. 241" },
            { val: 373, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: [], targetElements: ["Forest"], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Tecnica & Velocità + (【破竹】テクニック＆スピード＋)",
        id: "103005003",
        template: "Quando una propria tecnica di Blocco Tiri ha successo, aumenta la propria Tecnica di {VAL} e la propria Velocità di {VAL2}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 497, val2: 1, req: "Si sblocca con personaggio Lv. 41" },
            { val: 746, val2: 1, req: "Si sblocca con personaggio Lv. 61" },
            { val: 995, val2: 1, req: "Si sblocca con personaggio Lv. 91" },
            { val: 1244, val2: 1, req: "Si sblocca con personaggio Lv. 121" },
            { val: 1492, val2: 1, req: "Si sblocca con personaggio Lv. 151" },
            { val: 1741, val2: 2, req: "Si sblocca con personaggio Lv. 181" },
            { val: 1990, val2: 2, req: "Si sblocca con personaggio Lv. 211" },
            { val: 2239, val2: 2, req: "Si sblocca con personaggio Lv. 241" },
            { val: 2488, val2: 2, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "block_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Velocità", valueRef: "val2" }
        ]
    },
    {
        title: "[Slancio] Potenza Dribbling + (【破竹/累】ドリブルパワー＋)",
        id: "101002004",
        template: "Ogni volta che si esegue con successo una tecnica di dribbling, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 10, req: "Si sblocca a: Advanced Player +" },
            { val: 14, req: "Si sblocca a: Top Player +" },
            { val: 18, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Tecnica + (【破竹/累】テクニック＋)",
        id: "101026001",
        template: "Ogni volta che un proprio dribbling ha successo, aumenta la propria Tecnica di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 29, req: "Si sblocca con personaggio Lv. 1" },
            { val: 59, req: "Si sblocca con personaggio Lv. 21" },
            { val: 89, req: "Si sblocca con personaggio Lv. 71" },
            { val: 119, req: "Si sblocca con personaggio Lv. 101" },
            { val: 179, req: "Si sblocca con personaggio Lv. 131" },
            { val: 238, req: "Si sblocca con personaggio Lv. 161" },
            { val: 298, req: "Si sblocca con personaggio Lv. 191" },
            { val: 358, req: "Si sblocca con personaggio Lv. 221" },
            { val: 477, req: "Si sblocca con personaggio Lv. 251" },
            { val: 597, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Tiro FW Foresta + (【破竹/累】ＦＷシュートパワー＋〈林〉)",
        id: "101026003",
        template: "Ogni volta che un proprio dribbling ha successo, aumenta la potenza delle tecniche di tiro di elemento Foresta degli FW alleati di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 6, req: "Si sblocca con personaggio Lv. 121" },
            { val: 7, req: "Si sblocca con personaggio Lv. 151" },
            { val: 8, req: "Si sblocca con personaggio Lv. 181" },
            { val: 9, req: "Si sblocca con personaggio Lv. 211" },
            { val: 10, req: "Si sblocca con personaggio Lv. 241" },
            { val: 12, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], /* FIX */ type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Tiro Fuoco FW + (【破竹/累】ＦＷシュートパワー＋〈火〉)",
        id: "101154004",
        template: "Ogni volta che la propria tecnica di contrasto (Dribbling/Blocco) ha successo, aumenta la potenza delle tecniche di tiro di elemento Fuoco degli FW alleati di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 12, req: "Si sblocca a: Advanced Player +" },
            { val: 16, req: "Si sblocca a: Top Player +" },
            { val: 21, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_or_block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], /* FIX */ type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Tiro Foresta + (【破竹/累】シュートパワー＋〈林〉)",
        id: "101027003",
        template: "Ogni volta che si esegue con successo una tecnica di dribbling, aumenta la potenza delle proprie tecniche di Tiro Foresta di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 5, req: "Si sblocca con personaggio Lv. 61" },
            { val: 7, req: "Si sblocca con personaggio Lv. 91" },
            { val: 9, req: "Si sblocca con personaggio Lv. 121" },
            { val: 10, req: "Si sblocca con personaggio Lv. 151" },
            { val: 12, req: "Si sblocca con personaggio Lv. 181" },
            { val: 14, req: "Si sblocca con personaggio Lv. 211" },
            { val: 16, req: "Si sblocca con personaggio Lv. 241" },
            { val: 18, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Blocco DF Avversari - (【破竹/累】敵ＤＦブロック－)",
        id: "101086003",
        template: "Ogni volta che una propria tecnica di dribbling o blocco ha successo, riduce il Blocco dei DF avversari di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 105, req: "Si sblocca con personaggio Lv. 41" },
            { val: 158, req: "Si sblocca con personaggio Lv. 61" },
            { val: 210, req: "Si sblocca con personaggio Lv. 91" },
            { val: 263, req: "Si sblocca con personaggio Lv. 121" },
            { val: 316, req: "Si sblocca con personaggio Lv. 151" },
            { val: 368, req: "Si sblocca con personaggio Lv. 181" },
            { val: 421, req: "Si sblocca con personaggio Lv. 211" },
            { val: 474, req: "Si sblocca con personaggio Lv. 241" },
            { val: 527, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_or_block_success" },
        effects: [
            { targetScope: "enemy", targetRoles: ["DF"], targetElements: [], type: "stat_debuff", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Dribbling DF + (【破竹】ＤＦドリブルパワー＋)",
        id: "101003004",
        template: "Quando effettua una tecnica di blocco con successo, aumenta la potenza del dribbling degli alleati DF di {VAL}. <br>Condizione di reset: Gol segnato.",
        levels: [
            { val: 12, req: "Si sblocca a: Advanced Player +" },
            { val: 16, req: "Si sblocca a: Top Player +" },
            { val: 21, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio/Cumulativa] Tecnica FW/MF Avversari - (【破竹/累】敵ＦＷ・ＭＦテクニック－)",
        id: "101004003",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, riduce la Tecnica degli FW e MF avversari di {VAL}. Condizione di reset: Gol segnato.",
        levels: [
            { val: 42, req: "Si sblocca con personaggio Lv. 41" },
            { val: 63, req: "Si sblocca con personaggio Lv. 61" },
            { val: 84, req: "Si sblocca con personaggio Lv. 91" },
            { val: 105, req: "Si sblocca con personaggio Lv. 121" },
            { val: 126, req: "Si sblocca con personaggio Lv. 151" },
            { val: 147, req: "Si sblocca con personaggio Lv. 181" },
            { val: 168, req: "Si sblocca con personaggio Lv. 211" },
            { val: 189, req: "Si sblocca con personaggio Lv. 241" },
            { val: 211, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "enemy", targetRoles: ["FW", "MF"], targetElements: [], type: "stat_debuff", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Dribbling DF + (【破竹】ＤＦドリブルパワー＋)",
        id: "101003004", // Questa era la passiva duplicata nello script originario, la lascio così!
        template: "Quando effettua una tecnica di blocco con successo, aumenta la potenza del dribbling degli alleati DF di {VAL}. <br>Condizione di reset: Gol segnato.",
        levels: [
            { val: 12, req: "Si sblocca a: Advanced Player +" },
            { val: 16, req: "Si sblocca a: Top Player +" },
            { val: 21, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Tiro FW + (【破竹/累】ＦＷシュートパワー＋)",
        id: "101099003",
        template: "Ogni volta che il proprio dribbling ha successo, aumenta la potenza delle tecniche di tiro degli FW alleati di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 5, req: "Si sblocca con personaggio Lv. 121" },
            { val: 6, req: "Si sblocca con personaggio Lv. 151" },
            { val: 7, req: "Si sblocca con personaggio Lv. 181" },
            { val: 8, req: "Si sblocca con personaggio Lv. 211" },
            { val: 9, req: "Si sblocca con personaggio Lv. 241" },
            { val: 11, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Blocco DF Avversario - (【破竹/累】敵ＤＦブロックパワー－)",
        id: "101120003",
        template: "Ogni volta che una propria tecnica di dribbling ha successo, riduce la potenza delle tecniche di blocco dei DF avversari di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 5, req: "Si sblocca con personaggio Lv. 121" },
            { val: 6, req: "Si sblocca con personaggio Lv. 151" },
            { val: 7, req: "Si sblocca con personaggio Lv. 181" },
            { val: 8, req: "Si sblocca con personaggio Lv. 211" },
            { val: 9, req: "Si sblocca con personaggio Lv. 241" },
            { val: 10, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "enemy", targetRoles: ["DF"], targetElements: [], type: "power_debuff", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Parata GK Avversario - (【破竹】敵ＧＫキャッチ－)",
        id: "101120004",
        template: "Ogni volta che una propria tecnica di dribbling ha successo, riduce la Parata del GK avversario di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 1012, req: "Si sblocca a: Advanced Player +" },
            { val: 1349, req: "Si sblocca a: Top Player +" },
            { val: 1687, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "enemy", targetRoles: ["GK"], targetElements: [], type: "stat_debuff", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Potenza Tiro FW Foresta + (【破竹/累】ＦＷシュートパワー＋〈林〉)",
        id: "101024003",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, aumenta la Potenza della Tecnica di Tiro degli FW alleati di elemento Foresta di {VAL}. <br>Condizione reset: Gol segnato.",
        levels: [
            { val: 1, req: "Si sblocca con personaggio Lv. 41" },
            { val: 2, req: "Si sblocca con personaggio Lv. 61" },
            { val: 3, req: "Si sblocca con personaggio Lv. 91" },
            { val: 4, req: "Si sblocca con personaggio Lv. 121" },
            { val: 5, req: "Si sblocca con personaggio Lv. 151" },
            { val: 6, req: "Si sblocca con personaggio Lv. 181" },
            { val: 7, req: "Si sblocca con personaggio Lv. 211" },
            { val: 8, req: "Si sblocca con personaggio Lv. 241" },
            { val: 9, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], /* FIX */ type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro FW (Foresta) + (【破竹/累】ＦＷシュートパワー＋〈林〉)",
        id: "101022003",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, aumenta la Potenza delle tecniche di tiro di elemento Foresta degli FW alleati di {VAL}. <br>Condizione di reset: Gol segnato.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 4, req: "Si sblocca con personaggio Lv. 61" },
            { val: 6, req: "Si sblocca con personaggio Lv. 91" },
            { val: 8, req: "Si sblocca con personaggio Lv. 121" },
            { val: 9, req: "Si sblocca con personaggio Lv. 151" },
            { val: 11, req: "Si sblocca con personaggio Lv. 181" },
            { val: 12, req: "Si sblocca con personaggio Lv. 211" },
            { val: 14, req: "Si sblocca con personaggio Lv. 241" },
            { val: 16, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], /* FIX */ type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica + (【連動】テクニック＋)",
        id: "101019003",
        template: "Ogni volta che una tecnica di Dribbling o Blocco di un DF alleato ha successo, aumenta la propria Tecnica di {VAL}. Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 358, req: "Si sblocca con personaggio Lv. 41" },
            { val: 537, req: "Si sblocca con personaggio Lv. 61" },
            { val: 716, req: "Si sblocca con personaggio Lv. 91" },
            { val: 896, req: "Si sblocca con personaggio Lv. 121" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 151" },
            { val: 1254, req: "Si sblocca con personaggio Lv. 181" },
            { val: 1433, req: "Si sblocca con personaggio Lv. 211" },
            { val: 1612, req: "Si sblocca con personaggio Lv. 241" },
            { val: 1792, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "ally_DF_dribble_block_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Tiro FW + (【破竹/累】ＦＷキック＋)",
        id: "101019004",
        template: "Ogni volta che una propria tecnica di dribbling ha successo, aumenta il Tiro degli FW alleati di {VAL}. <br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 337, req: "Si sblocca a: Advanced Player +" },
            { val: 449, req: "Si sblocca a: Top Player +" },
            { val: 562, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling MF + (【破竹/累】ＭＦドリブルパワー＋)",
        id: "101018003",
        template: "Ogni volta che una tecnica di blocco o dribbling di un DF alleato ha successo, aumenta la potenza delle tecniche di Dribbling degli MF alleati di {VAL}. Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 4, req: "Si sblocca con personaggio Lv. 61" },
            { val: 6, req: "Si sblocca con personaggio Lv. 91" },
            { val: 8, req: "Si sblocca con personaggio Lv. 121" },
            { val: 9, req: "Si sblocca con personaggio Lv. 151" },
            { val: 11, req: "Si sblocca con personaggio Lv. 181" },
            { val: 12, req: "Si sblocca con personaggio Lv. 211" },
            { val: 14, req: "Si sblocca con personaggio Lv. 241" },
            { val: 16, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "ally_DF_dribble_block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro FW + (【破竹/累】ＦＷシュートパワー＋)",
        id: "103030004",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, aumenta la potenza delle tecniche di tiro degli FW alleati di {VAL}. Condizione reset: Gol segnato.",
        levels: [
            { val: 9, req: "Si sblocca con personaggio Lv. 41" },
            { val: 11, req: "Si sblocca con personaggio Lv. 61" },
            { val: 13, req: "Si sblocca con personaggio Lv. 91" },
            { val: 16, req: "Si sblocca con personaggio Lv. 121" },
            { val: 19, req: "Si sblocca con personaggio Lv. 151" },
            { val: 21, req: "Si sblocca con personaggio Lv. 181" },
            { val: 24, req: "Si sblocca con personaggio Lv. 211" },
            { val: 27, req: "Si sblocca con personaggio Lv. 241" },
            { val: 31, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro + (【連動/累】シュートパワー＋)",
        id: "101200002",
        template: "Ogni volta che il dribbling di un alleato MF ha successo, aumenta la potenza delle proprie tecniche di Tiro di {VAL}. Condizione di reset: Gol segnato.",
        levels: [
            { val: 6, req: "Si sblocca con personaggio Lv. 1" },
            { val: 9, req: "Si sblocca con personaggio Lv. 21" },
            { val: 13, req: "Si sblocca con personaggio Lv. 71" },
            { val: 17, req: "Si sblocca con personaggio Lv. 101" },
            { val: 21, req: "Si sblocca con personaggio Lv. 131" },
            { val: 25, req: "Si sblocca con personaggio Lv. 161" },
            { val: 29, req: "Si sblocca con personaggio Lv. 191" },
            { val: 33, req: "Si sblocca con personaggio Lv. 221" },
            { val: 37, req: "Si sblocca con personaggio Lv. 251" },
            { val: 41, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "ally_MF_dribble_success" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro FW (Fuoco) + (【自得点/累】ＦＷシュートパワー＋〈火〉)",
        id: "101200003",
        template: "Ogni volta che segna un gol, aumenta la potenza delle tecniche di Tiro di elemento Fuoco degli FW alleati di {VAL}.",
        levels: [
            { val: 9, req: "Si sblocca con personaggio Lv. 41" },
            { val: 11, req: "Si sblocca con personaggio Lv. 61" },
            { val: 13, req: "Si sblocca con personaggio Lv. 91" },
            { val: 15, req: "Si sblocca con personaggio Lv. 121" },
            { val: 18, req: "Si sblocca con personaggio Lv. 151" },
            { val: 21, req: "Si sblocca con personaggio Lv. 181" },
            { val: 24, req: "Si sblocca con personaggio Lv. 211" },
            { val: 27, req: "Si sblocca con personaggio Lv. 241" },
            { val: 30, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "scored_goal" },
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], /* FIX */ type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Dribbling DF + (【破竹/累】ＤＦドリブルパワー＋)",
        id: "101157003",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, aumenta la potenza delle tecniche di Dribbling dei compagni DF di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 5, req: "Si sblocca con personaggio Lv. 121" },
            { val: 6, req: "Si sblocca con personaggio Lv. 151" },
            { val: 7, req: "Si sblocca con personaggio Lv. 181" },
            { val: 8, req: "Si sblocca con personaggio Lv. 211" },
            { val: 9, req: "Si sblocca con personaggio Lv. 241" },
            { val: 10, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "[Cumulativa] Potenza Tiro MF + (【阻止/累】ＭＦシュートパワー＋)",
        id: "101156003", // Sostituire con l'ID reale
        template: "Ogni volta che para o blocca un tiro avversario, aumenta la potenza delle tecniche di tiro degli MF alleati di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 5, req: "Si sblocca con personaggio Lv. 121" },
            { val: 6, req: "Si sblocca con personaggio Lv. 151" },
            { val: 7, req: "Si sblocca con personaggio Lv. 181" },
            { val: 8, req: "Si sblocca con personaggio Lv. 211" },
            { val: 9, req: "Si sblocca con personaggio Lv. 241" },
            { val: 10, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "catch_or_block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Impeto] Potenza Tiro MF + (【破竹/累】ＭＦシュートパワー＋)",
        id: "101160003",
        template: "Ogni volta che la propria tecnica di dribbling ha successo, aumenta la potenza delle tecniche di tiro dei compagni MF di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 5, req: "Si sblocca con personaggio Lv. 121" },
            { val: 6, req: "Si sblocca con personaggio Lv. 151" },
            { val: 7, req: "Si sblocca con personaggio Lv. 181" },
            { val: 8, req: "Si sblocca con personaggio Lv. 211" },
            { val: 9, req: "Si sblocca con personaggio Lv. 241" },
            { val: 10, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Potenza Dribbling MF (Vento) + (【破竹/累】ＭＦドリブルパワー＋〈風〉)",
        id: "101155003",
        template: "Ogni volta che una propria tecnica di parata ha successo, aumenta la potenza delle tecniche di Dribbling di elemento Vento dei compagni MF di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 4, req: "Si sblocca con personaggio Lv. 61" },
            { val: 6, req: "Si sblocca con personaggio Lv. 91" },
            { val: 8, req: "Si sblocca con personaggio Lv. 121" },
            { val: 9, req: "Si sblocca con personaggio Lv. 151" },
            { val: 11, req: "Si sblocca con personaggio Lv. 181" },
            { val: 12, req: "Si sblocca con personaggio Lv. 211" },
            { val: 14, req: "Si sblocca con personaggio Lv. 241" },
            { val: 16, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "catch_success" },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], /* FIX */ type: "power", moveKind: "Dribbling", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Potenza Tiro + (【自得点/累】シュートパワー＋)",
        id: "101165003",
        template: "Ogni volta che segna un gol, aumenta la potenza delle proprie tecniche di Tiro di {VAL}.<br>Condizione di reset: l'avversario segna un gol.",
        levels: [
            { val: 7, req: "Si sblocca con personaggio Lv. 41" },
            { val: 11, req: "Si sblocca con personaggio Lv. 61" },
            { val: 15, req: "Si sblocca con personaggio Lv. 91" },
            { val: 19, req: "Si sblocca con personaggio Lv. 121" },
            { val: 23, req: "Si sblocca con personaggio Lv. 151" },
            { val: 27, req: "Si sblocca con personaggio Lv. 181" },
            { val: 31, req: "Si sblocca con personaggio Lv. 211" },
            { val: 35, req: "Si sblocca con personaggio Lv. 241" },
            { val: 39, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "scored_goal_self" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Potenza Tiro MF + (【阻止/累】ＭＦシュートパワー＋)",
        id: "101162003",
        template: "Ogni volta che para o blocca un tiro avversario, aumenta la potenza delle tecniche di tiro degli MF alleati di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 4, req: "Si sblocca con personaggio Lv. 41" },
            { val: 5, req: "Si sblocca con personaggio Lv. 61" },
            { val: 6, req: "Si sblocca con personaggio Lv. 91" },
            { val: 7, req: "Si sblocca con personaggio Lv. 121" },
            { val: 8, req: "Si sblocca con personaggio Lv. 151" },
            { val: 9, req: "Si sblocca con personaggio Lv. 181" },
            { val: 10, req: "Si sblocca con personaggio Lv. 211" },
            { val: 11, req: "Si sblocca con personaggio Lv. 241" },
            { val: 12, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "catch_or_block_success" },
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Slancio] Potenza Blocco DF + (【破竹/累】ＤＦブロックパワー＋)",
        id: "101159004",
        template: "Ogni volta che la propria tecnica di blocco o dribbling ha successo, aumenta la potenza delle tecniche di Blocco dei compagni DF di {VAL}.<br>Condizione di reset: un alleato segna un gol.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 41" },
            { val: 3, req: "Si sblocca con personaggio Lv. 61" },
            { val: 4, req: "Si sblocca con personaggio Lv. 91" },
            { val: 5, req: "Si sblocca con personaggio Lv. 121" },
            { val: 6, req: "Si sblocca con personaggio Lv. 151" },
            { val: 7, req: "Si sblocca con personaggio Lv. 181" },
            { val: 8, req: "Si sblocca con personaggio Lv. 211" },
            { val: 9, req: "Si sblocca con personaggio Lv. 241" },
            { val: 10, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Stacking",
        conditions: { triggerEvent: "block_or_dribble_success" },
        effects: [
            { targetScope: "team", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    }
];