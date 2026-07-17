// --- js/Passive/stats_always.js ---

export const alwaysPassives = [
    {
        title: "Tiro + (キック＋)",
        id: "100000101",
        template: "All'inizio della partita, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 67, req: "Si sblocca con personaggio Lv. 11" },
            { val: 134, req: "Si sblocca con personaggio Lv. 51" },
            { val: 201, req: "Si sblocca con personaggio Lv. 81" },
            { val: 268, req: "Si sblocca con personaggio Lv. 111" },
            { val: 403, req: "Si sblocca con personaggio Lv. 141" },
            { val: 537, req: "Si sblocca con personaggio Lv. 171" },
            { val: 672, req: "Si sblocca con personaggio Lv. 201" },
            { val: 806, req: "Si sblocca con personaggio Lv. 231" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 261" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 291" }
        ],
        category: "Always",
        conditions: null,
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
        title: "TP Massimi + (最大ＴＰ＋)",
        id: "100000501",
        template: "All'inizio della partita, aumenta i propri TP massimi di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca a: Advanced Player" },
            { val: 20, req: "Si sblocca a: Top Player" },
            { val: 30, req: "Si sblocca a: Legendary Player" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "stat",
                statName: "TP",
                valueRef: "val"
            }
        ]
    },
    {
        title: "Tecnica + (テクニック＋)",
        id: "100000201",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL}.",
        levels: [
            { val: 67, req: "Si sblocca con personaggio Lv. 11" },
            { val: 134, req: "Si sblocca con personaggio Lv. 51" },
            { val: 201, req: "Si sblocca con personaggio Lv. 81" },
            { val: 268, req: "Si sblocca con personaggio Lv. 111" },
            { val: 403, req: "Si sblocca con personaggio Lv. 141" },
            { val: 537, req: "Si sblocca con personaggio Lv. 171" },
            { val: 672, req: "Si sblocca con personaggio Lv. 201" },
            { val: 806, req: "Si sblocca con personaggio Lv. 231" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 261" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 291" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "stat",
                statName: "Tecnica",
                valueRef: "val"
            }
        ]
    },
    {
        title: "Tecnica + (テクニック＋)",
        id: "103014001",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL}.",
        levels: [
            { val: 107, req: "Si sblocca con personaggio Lv. 1" },
            { val: 215, req: "Si sblocca con personaggio Lv. 21" },
            { val: 322, req: "Si sblocca con personaggio Lv. 71" },
            { val: 430, req: "Si sblocca con personaggio Lv. 101" },
            { val: 645, req: "Si sblocca con personaggio Lv. 131" },
            { val: 860, req: "Si sblocca con personaggio Lv. 161" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1720, req: "Si sblocca con personaggio Lv. 251" },
            { val: 2150, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "stat",
                statName: "Tecnica",
                valueRef: "val"
            }
        ]
    },
    {
        title: "Potenza & CRT + (Vento) (パワー＆ＣＲＴ＋〈風〉)",
        id: "103009003",
        template: "All'inizio della partita, aumenta la Potenza delle tecniche Vento di {POWER} e il tasso critico di {CRT}%.",
        levels: [
            { power: 7, crt: 200, req: "Si sblocca con personaggio Lv. 41" },
            { power: 10, crt: 300, req: "Si sblocca con personaggio Lv. 61" },
            { power: 14, crt: 400, req: "Si sblocca con personaggio Lv. 91" },
            { power: 18, crt: 500, req: "Si sblocca con personaggio Lv. 121" },
            { power: 21, crt: 600, req: "Si sblocca con personaggio Lv. 151" },
            { power: 25, crt: 700, req: "Si sblocca con personaggio Lv. 181" },
            { power: 28, crt: 800, req: "Si sblocca con personaggio Lv. 211" },
            { power: 32, crt: 900, req: "Si sblocca con personaggio Lv. 241" },
            { power: 36, crt: 1000, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "power",
                moveKind: "All",
                moveElement: "Wind",
                valueRef: "power"
            },
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "crit_rate",
                valueRef: "crt"
            }
        ]
    },
    {
        title: "Potenza Tiro + (シュートパワー＋)",
        id: "101164001",
        template: "All'inizio della partita, aumenta la Potenza delle Proprie Tecniche di Tiro di {VAL}.",
        levels: [
            { val: 8, req: "Si sblocca con personaggio Lv. 1" },
            { val: 11, req: "Si sblocca con personaggio Lv. 21" },
            { val: 13, req: "Si sblocca con personaggio Lv. 71" },
            { val: 16, req: "Si sblocca con personaggio Lv. 101" },
            { val: 22, req: "Si sblocca con personaggio Lv. 131" },
            { val: 27, req: "Si sblocca con personaggio Lv. 161" },
            { val: 33, req: "Si sblocca con personaggio Lv. 191" },
            { val: 38, req: "Si sblocca con personaggio Lv. 221" },
            { val: 46, req: "Si sblocca con personaggio Lv. 251" },
            { val: 55, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro (Fuoco) + (シュートパワー＋〈火〉)",
        id: "103018001",
        template: "All'inizio della partita, aumenta la Potenza delle proprie Tecniche di Tiro Fuoco di {VAL}.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 1" },
            { val: 6, req: "Si sblocca con personaggio Lv. 21" },
            { val: 9, req: "Si sblocca con personaggio Lv. 71" },
            { val: 12, req: "Si sblocca con personaggio Lv. 101" },
            { val: 18, req: "Si sblocca con personaggio Lv. 131" },
            { val: 24, req: "Si sblocca con personaggio Lv. 161" },
            { val: 31, req: "Si sblocca con personaggio Lv. 191" },
            { val: 37, req: "Si sblocca con personaggio Lv. 221" },
            { val: 49, req: "Si sblocca con personaggio Lv. 251" },
            { val: 62, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Blocco MF + (ＭＦブロックパワー＋)",
        id: "1010005001",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di Blocco degli MF di {VAL}.",
        levels: [
            { val: 1, req: "Si sblocca con personaggio Lv. 1" },
            { val: 3, req: "Si sblocca con personaggio Lv. 21" },
            { val: 5, req: "Si sblocca con personaggio Lv. 71" },
            { val: 7, req: "Si sblocca con personaggio Lv. 101" },
            { val: 9, req: "Si sblocca con personaggio Lv. 131" },
            { val: 10, req: "Si sblocca con personaggio Lv. 161" },
            { val: 12, req: "Si sblocca con personaggio Lv. 191" },
            { val: 14, req: "Si sblocca con personaggio Lv. 221" },
            { val: 16, req: "Si sblocca con personaggio Lv. 251" },
            { val: 18, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "team", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro FW + (Vento) (ＦＷシュートパワー＋〈風〉)",
        id: "1010005004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di tiro Vento degli FW di {VAL}.",
        levels: [
            { val: 21, req: "Si sblocca a: Advanced Player +" },
            { val: 28, req: "Si sblocca a: Top Player +" },
            { val: 35, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Potenza + (Vento) (パワー＋〈風〉)",
        id: "1010004001",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Vento di {VAL}.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 1" },
            { val: 5, req: "Si sblocca con personaggio Lv. 21" },
            { val: 7, req: "Si sblocca con personaggio Lv. 71" },
            { val: 10, req: "Si sblocca con personaggio Lv. 101" },
            { val: 15, req: "Si sblocca con personaggio Lv. 131" },
            { val: 20, req: "Si sblocca con personaggio Lv. 161" },
            { val: 26, req: "Si sblocca con personaggio Lv. 191" },
            { val: 31, req: "Si sblocca con personaggio Lv. 221" },
            { val: 41, req: "Si sblocca con personaggio Lv. 251" },
            { val: 52, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Potenza MF + (Vento) (ＭＦパワー＋〈風〉)",
        id: "1010004004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di Vento degli alleati MF di {VAL}.",
        levels: [
            { val: 26, req: "Si sblocca a: Advanced Player +" },
            { val: 35, req: "Si sblocca a: Top Player +" },
            { val: 44, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "All", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Probabilità Catena di Tiro & Tecnica + (シュートチェイン確率＆テクニック＋)",
        id: "103017001",
        template: "All'inizio della partita, aumenta la probabilità di Catena di Tiro di {VAL}% e la propria Tecnica di {VAL2}.",
        levels: [
            { val: 100, val2: 95, req: "Si sblocca con personaggio Lv. 1" },
            { val: 200, val2: 190, req: "Si sblocca con personaggio Lv. 21" },
            { val: 300, val2: 285, req: "Si sblocca con personaggio Lv. 71" },
            { val: 400, val2: 380, req: "Si sblocca con personaggio Lv. 101" },
            { val: 600, val2: 570, req: "Si sblocca con personaggio Lv. 131" },
            { val: 800, val2: 760, req: "Si sblocca con personaggio Lv. 161" },
            { val: 1000, val2: 951, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1200, val2: 1141, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1600, val2: 1521, req: "Si sblocca con personaggio Lv. 251" },
            { val: 2000, val2: 1902, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "chain_prob", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val2" }
        ]
    },
    {
        title: "Tecnica + (テクニック＋)",
        id: "103008001",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL}.",
        levels: [
            { val: 107, req: "Si sblocca con personaggio Lv. 1" },
            { val: 215, req: "Si sblocca con personaggio Lv. 21" },
            { val: 322, req: "Si sblocca con personaggio Lv. 71" },
            { val: 430, req: "Si sblocca con personaggio Lv. 101" },
            { val: 645, req: "Si sblocca con personaggio Lv. 131" },
            { val: 860, req: "Si sblocca con personaggio Lv. 161" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1720, req: "Si sblocca con personaggio Lv. 251" },
            { val: 2150, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica + / Riduzione Fallo Team (テクニック＋／チームファウル率減少)",
        id: "103008004",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL} e riduce il tasso di falli del team del {VAL2}%.",
        levels: [
            { val: 266, val2: 100, req: "Si sblocca a: Advanced Player +" },
            { val: 355, val2: 200, req: "Si sblocca a: Top Player +" },
            { val: 444, val2: 200, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" },
            { targetScope: "team", targetRoles: [], targetElements: [], type: "foul_reduction", valueRef: "val2" }
        ]
    },
    {
        title: "Blocco + (ブロック＋)",
        id: "100000301",
        template: "All'inizio della partita, aumenta il proprio Blocco di {VAL}.",
        levels: [
            { val: 67, req: "Si sblocca con personaggio Lv. 11" },
            { val: 134, req: "Si sblocca con personaggio Lv. 51" },
            { val: 201, req: "Si sblocca con personaggio Lv. 81" },
            { val: 268, req: "Si sblocca con personaggio Lv. 111" },
            { val: 403, req: "Si sblocca con personaggio Lv. 141" },
            { val: 537, req: "Si sblocca con personaggio Lv. 171" },
            { val: 672, req: "Si sblocca con personaggio Lv. 201" },
            { val: 806, req: "Si sblocca con personaggio Lv. 231" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 261" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 291" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Blocco (Montagna) + (ブロックパワー＋〈山〉)",
        id: "103003004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Blocco Montagna di {VAL}.",
        levels: [
            { val: 93, req: "Si sblocca a: Advanced Player +" },
            { val: 124, req: "Si sblocca a: Top Player +" },
            { val: 156, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Blocco", moveElement: "Mountain", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica & Velocità + (テクニック＆スピード＋)",
        id: "103002001",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL} e la propria Velocità di {VAL2}.",
        levels: [
            { val: 109, val2: 1, req: "Si sblocca con personaggio Lv. 1" },
            { val: 218, val2: 1, req: "Si sblocca con personaggio Lv. 21" },
            { val: 328, val2: 1, req: "Si sblocca con personaggio Lv. 71" },
            { val: 437, val2: 1, req: "Si sblocca con personaggio Lv. 101" },
            { val: 656, val2: 1, req: "Si sblocca con personaggio Lv. 131" },
            { val: 875, val2: 2, req: "Si sblocca con personaggio Lv. 161" },
            { val: 1094, val2: 2, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1313, val2: 2, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1751, val2: 2, req: "Si sblocca con personaggio Lv. 251" },
            { val: 2189, val2: 2, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Velocità", valueRef: "val2" }
        ]
    },
    {
        title: "Blocco + (ブロック＋)",
        id: "103007001",
        template: "All'inizio della partita, aumenta il proprio Blocco di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Potenza + (Vento) (パワー＋〈風〉)",
        id: "103007004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Vento di {VAL}.",
        levels: [
            { val: 39, req: "Si sblocca a: Advanced Player +" },
            { val: 52, req: "Si sblocca a: Top Player +" },
            { val: 65, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Parata + (キャッチ＋)",
        id: "100000401",
        template: "All'inizio della partita, aumenta la propria Parata di {VAL}.",
        levels: [
            { val: 67, req: "Si sblocca con personaggio Lv. 11" },
            { val: 134, req: "Si sblocca con personaggio Lv. 51" },
            { val: 201, req: "Si sblocca con personaggio Lv. 81" },
            { val: 268, req: "Si sblocca con personaggio Lv. 111" },
            { val: 403, req: "Si sblocca con personaggio Lv. 141" },
            { val: 537, req: "Si sblocca con personaggio Lv. 171" },
            { val: 672, req: "Si sblocca con personaggio Lv. 201" },
            { val: 806, req: "Si sblocca con personaggio Lv. 231" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 261" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 291" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "Potenza + (Foresta) (パワー＋〈林〉)",
        id: "103020003",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche Foresta di {VAL}.",
        levels: [
            { val: 17, req: "Si sblocca con personaggio Lv. 41" },
            { val: 26, req: "Si sblocca con personaggio Lv. 61" },
            { val: 35, req: "Si sblocca con personaggio Lv. 91" },
            { val: 44, req: "Si sblocca con personaggio Lv. 121" },
            { val: 53, req: "Si sblocca con personaggio Lv. 151" },
            { val: 62, req: "Si sblocca con personaggio Lv. 181" },
            { val: 71, req: "Si sblocca con personaggio Lv. 211" },
            { val: 80, req: "Si sblocca con personaggio Lv. 241" },
            { val: 89, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF / Parata + (ＤＦブロック＋／キャッチ＋)",
        id: "101017001",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL} e la propria Parata di {VAL2}.",
        levels: [
            { val: 22, val2: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, val2: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, val2: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, val2: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, val2: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, val2: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, val2: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, val2: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, val2: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, val2: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val2" }
        ]
    },
    {
        title: "Tiro + (キック＋)",
        id: "103013001",
        template: "All'inizio della partita, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF + (ＤＦブロック＋)",
        id: "103012001",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF / Parata GK + (ＤＦブロック＋／ＧＫキャッチ＋)",
        id: "103012003",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL} e la Parata del GK alleato di {VAL2}.",
        levels: [
            { val: 104, val2: 104, req: "Si sblocca con personaggio Lv. 41" },
            { val: 156, val2: 156, req: "Si sblocca con personaggio Lv. 61" },
            { val: 208, val2: 208, req: "Si sblocca con personaggio Lv. 91" },
            { val: 260, val2: 260, req: "Si sblocca con personaggio Lv. 121" },
            { val: 312, val2: 312, req: "Si sblocca con personaggio Lv. 151" },
            { val: 364, val2: 364, req: "Si sblocca con personaggio Lv. 181" },
            { val: 416, val2: 416, req: "Si sblocca con personaggio Lv. 211" },
            { val: 468, val2: 468, req: "Si sblocca con personaggio Lv. 241" },
            { val: 521, val2: 521, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "allies", targetRoles: ["GK"], targetElements: [], type: "stat", statName: "Parata", valueRef: "val2" }
        ]
    },
    {
        title: "Blocco & Parata DF/GK Foresta + (林ＤＦ・ＧＫブロック＆キャッチ＋)",
        id: "103006001",
        template: "All'inizio della partita, aumenta il Blocco e la Parata dei compagni DF e GK di attributo Foresta di {VAL}.",
        levels: [
            { val: 14, req: "Si sblocca con personaggio Lv. 1" },
            { val: 29, req: "Si sblocca con personaggio Lv. 21" },
            { val: 44, req: "Si sblocca con personaggio Lv. 71" },
            { val: 59, req: "Si sblocca con personaggio Lv. 101" },
            { val: 89, req: "Si sblocca con personaggio Lv. 131" },
            { val: 119, req: "Si sblocca con personaggio Lv. 161" },
            { val: 149, req: "Si sblocca con personaggio Lv. 191" },
            { val: 179, req: "Si sblocca con personaggio Lv. 221" },
            { val: 239, req: "Si sblocca con personaggio Lv. 251" },
            { val: 299, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF", "GK"], targetElements: ["Forest"], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "allies", targetRoles: ["DF", "GK"], targetElements: ["Forest"], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF + (味方ＤＦブロック＋)",
        id: "103004001",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Tiro Vento & Fuoco + (風・火キック＋)",
        id: "103004004",
        template: "All'inizio della partita, aumenta il Tiro dei compagni di attributo Vento e Fuoco di {VAL}.",
        levels: [
            { val: 230, req: "Si sblocca a: Advanced Player +" },
            { val: 307, req: "Si sblocca a: Top Player +" },
            { val: 384, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: ["Wind", "Fire"], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica + (テクニック＋)",
        id: "103005001",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF + (味方ＤＦブロック＋)",
        id: "101013001",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Blocco & Tecnica Raimon/Emperors + (雷門・帝国ブロック＆テクニック＋)",
        id: "101013004",
        template: "All'inizio della partita, aumenta il Blocco e la Tecnica dei compagni con tag Raimon ed Emperors di {VAL}.",
        levels: [
            { val: 149, req: "Si sblocca a: Advanced Player +" },
            { val: 199, req: "Si sblocca a: Top Player +" },
            { val: 249, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            {
                targetScope: "allies",
                targetRoles: [],
                targetElements: [],
                targetTags: ["Icon_Tag_Team_Raimon", "Icon_Tag_Team_Emperors"],
                type: "stat",
                statName: "Blocco",
                valueRef: "val"
            },
            {
                targetScope: "allies",
                targetRoles: [],
                targetElements: [],
                targetTags: ["Icon_Tag_Team_Raimon", "Icon_Tag_Team_Emperors"],
                type: "stat",
                statName: "Tecnica",
                valueRef: "val"
            }
        ]
    },
    {
        title: "Potenza Dribbling + (ドリブルパワー＋)",
        id: "101002001",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 1, req: "Si sblocca con personaggio Lv. 1" },
            { val: 3, req: "Si sblocca con personaggio Lv. 21" },
            { val: 5, req: "Si sblocca con personaggio Lv. 71" },
            { val: 7, req: "Si sblocca con personaggio Lv. 101" },
            { val: 11, req: "Si sblocca con personaggio Lv. 131" },
            { val: 15, req: "Si sblocca con personaggio Lv. 161" },
            { val: 19, req: "Si sblocca con personaggio Lv. 191" },
            { val: 23, req: "Si sblocca con personaggio Lv. 221" },
            { val: 31, req: "Si sblocca con personaggio Lv. 251" },
            { val: 39, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza MF/DF + (ＭＦ・ＤＦパワー＋)",
        id: "101016003",
        template: "All'inizio della partita, aumenta la potenza delle tecniche dei compagni MF e DF di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["MF", "DF"], targetElements: [], type: "power", moveKind: "All", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Blocco + (ブロック＋)",
        id: "101154001",
        template: "All'inizio della partita, aumenta il proprio Blocco di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro (Fuoco) + (シュートパワー＋〈火〉)",
        id: "101153001",
        template: "All'inizio della partita, aumenta la Potenza delle Tecniche di Tiro Fuoco di {VAL}.",
        levels: [
            { val: 2, req: "Si sblocca con personaggio Lv. 1" },
            { val: 4, req: "Si sblocca con personaggio Lv. 21" },
            { val: 6, req: "Si sblocca con personaggio Lv. 71" },
            { val: 9, req: "Si sblocca con personaggio Lv. 101" },
            { val: 13, req: "Si sblocca con personaggio Lv. 131" },
            { val: 18, req: "Si sblocca con personaggio Lv. 161" },
            { val: 23, req: "Si sblocca con personaggio Lv. 191" },
            { val: 27, req: "Si sblocca con personaggio Lv. 221" },
            { val: 36, req: "Si sblocca con personaggio Lv. 251" },
            { val: 46, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "Tiro + (キック＋)",
        id: "101152001",
        template: "All'inizio della partita, aumenta il proprio Tiro di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro (Foresta) + (シュートパワー＋〈林〉)",
        id: "101040004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Tiro Foresta di {VAL}.",
        levels: [
            { val: 46, req: "Si sblocca a: Advanced Player +" },
            { val: 62, req: "Si sblocca a: Top Player +" },
            { val: 78, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Tiro Raimon + (雷門キック＋)",
        id: "101011001",
        template: "All'inizio della partita, aumenta il Tiro degli alleati con tag Raimon di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: [], targetTags: ["Icon_Tag_Team_Raimon"], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica Foresta + (林テクニック＋)",
        id: "101011003",
        template: "All'inizio della partita, aumenta la Tecnica degli alleati di attributo Foresta di {VAL}.",
        levels: [
            { val: 67, req: "Si sblocca con personaggio Lv. 41" },
            { val: 100, req: "Si sblocca con personaggio Lv. 61" },
            { val: 134, req: "Si sblocca con personaggio Lv. 91" },
            { val: 168, req: "Si sblocca con personaggio Lv. 121" },
            { val: 201, req: "Si sblocca con personaggio Lv. 151" },
            { val: 235, req: "Si sblocca con personaggio Lv. 181" },
            { val: 268, req: "Si sblocca con personaggio Lv. 211" },
            { val: 302, req: "Si sblocca con personaggio Lv. 241" },
            { val: 336, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: ["Forest"], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Potenza + (Foresta) (パワー＋〈林〉)",
        id: "101011004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche Foresta di {VAL}.",
        levels: [
            { val: 39, req: "Si sblocca a: Advanced Player +" },
            { val: 52, req: "Si sblocca a: Top Player +" },
            { val: 66, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica + (テクニック＋)",
        id: "101027001",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro + (シュートパワー＋)",
        id: "101027004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Tiro di {VAL}.",
        levels: [
            { val: 39, req: "Si sblocca a: Advanced Player +" },
            { val: 52, req: "Si sblocca a: Top Player +" },
            { val: 65, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza + (Fuoco) (パワー＋〈火〉)",
        id: "101010003",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di elemento Fuoco di {VAL}.",
        levels: [
            { val: 9, req: "Si sblocca con personaggio Lv. 41" },
            { val: 14, req: "Si sblocca con personaggio Lv. 61" },
            { val: 19, req: "Si sblocca con personaggio Lv. 91" },
            { val: 24, req: "Si sblocca con personaggio Lv. 121" },
            { val: 29, req: "Si sblocca con personaggio Lv. 151" },
            { val: 34, req: "Si sblocca con personaggio Lv. 181" },
            { val: 39, req: "Si sblocca con personaggio Lv. 211" },
            { val: 44, req: "Si sblocca con personaggio Lv. 241" },
            { val: 49, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro FW (Fuoco/Foresta) + (ＦＷシュートパワー＋〈火＆林〉)",
        id: "101010004",
        template: "All'inizio della partita, aumenta la Potenza delle tecniche di Tiro di elemento Fuoco e Foresta degli FW alleati di {VAL}.",
        levels: [
            { val: 15, req: "Si sblocca a: Advanced Player +" },
            { val: 20, req: "Si sblocca a: Top Player +" },
            { val: 26, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "val" },
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica + (テクニック＋)",
        id: "101143001",
        template: "All'inizio della partita, aumenta la propria Tecnica di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Tiro FW + (ＦＷキック＋)",
        id: "101110001",
        template: "All'inizio della partita, aumenta il Tiro degli FW alleati di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza FW (Fuoco) + (ＦＷパワー＋〈火〉)",
        id: "101110003",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di elemento Fuoco degli FW alleati di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "All", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica FW + (ＦＷテクニック＋)",
        id: "101086001",
        template: "All'inizio della partita, aumenta la Tecnica degli FW alleati di {VAL}.",
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
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF / Parata + (ＤＦブロック＋／キャッチ＋)",
        id: "101100001",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL} e la propria Parata di {VAL2}.",
        levels: [
            { val: 18, val2: 18, req: "Si sblocca con personaggio Lv. 1" },
            { val: 37, val2: 37, req: "Si sblocca con personaggio Lv. 21" },
            { val: 56, val2: 56, req: "Si sblocca con personaggio Lv. 71" },
            { val: 74, val2: 74, req: "Si sblocca con personaggio Lv. 101" },
            { val: 112, val2: 112, req: "Si sblocca con personaggio Lv. 131" },
            { val: 149, val2: 149, req: "Si sblocca con personaggio Lv. 161" },
            { val: 187, val2: 187, req: "Si sblocca con personaggio Lv. 191" },
            { val: 224, val2: 224, req: "Si sblocca con personaggio Lv. 221" },
            { val: 299, val2: 299, req: "Si sblocca con personaggio Lv. 251" },
            { val: 374, val2: 374, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val2" }
        ]
    },
    {
        title: "Potenza Tiro FW + (ＦＷシュートパワー＋)",
        id: "101001004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 13, req: "Si sblocca a: Advanced Player +" },
            { val: 17, req: "Si sblocca a: Top Player +" },
            { val: 22, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF + (ＤＦブロック＋)",
        id: "101003001",
        template: "All'inizio della partita, aumenta il Blocco dei compagni DF di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Potenza DF/GK + (Foresta) (ＤＦ・ＧＫパワー＋〈林〉)",
        id: "101004004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di elemento Foresta degli alleati DF e GK di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca a: Advanced Player +" },
            { val: 14, req: "Si sblocca a: Top Player +" },
            { val: 18, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF", "GK"], targetElements: [], type: "power", moveKind: "All", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Potenza DF/GK + (Foresta) (ＤＦ・ＧＫパワー＋〈林〉)",
        id: "101005004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di elemento Foresta degli alleati DF e GK di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca a: Advanced Player +" },
            { val: 14, req: "Si sblocca a: Top Player +" },
            { val: 18, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF", "GK"], targetElements: [], type: "power", moveKind: "All", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Tiro Team + (チームキック＋)",
        id: "101006001",
        template: "All'inizio della partita, aumenta il Tiro di tutti gli alleati di {VAL}.",
        levels: [
            { val: 8, req: "Si sblocca con personaggio Lv. 1" },
            { val: 16, req: "Si sblocca con personaggio Lv. 21" },
            { val: 25, req: "Si sblocca con personaggio Lv. 71" },
            { val: 33, req: "Si sblocca con personaggio Lv. 101" },
            { val: 50, req: "Si sblocca con personaggio Lv. 131" },
            { val: 67, req: "Si sblocca con personaggio Lv. 161" },
            { val: 84, req: "Si sblocca con personaggio Lv. 191" },
            { val: 100, req: "Si sblocca con personaggio Lv. 221" },
            { val: 134, req: "Si sblocca con personaggio Lv. 251" },
            { val: 168, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro FW + (ＦＷシュートパワー＋)",
        id: "101001004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 13, req: "Si sblocca a: Advanced Player +" },
            { val: 17, req: "Si sblocca a: Top Player +" },
            { val: 22, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling + (ドリブルパワー＋)",
        id: "101007004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 31, req: "Si sblocca a: Advanced Player +" },
            { val: 41, req: "Si sblocca a: Top Player +" },
            { val: 52, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Tiro Team + (チームキック＋)",
        id: "101008001",
        template: "All'inizio della partita, aumenta il Tiro di tutti gli alleati di {VAL}.", // Per le 'Team Kick +' che parlano di squadra intera
        levels: [
            { val: 8, req: "Si sblocca con personaggio Lv. 1" },
            { val: 16, req: "Si sblocca con personaggio Lv. 21" },
            { val: 25, req: "Si sblocca con personaggio Lv. 71" },
            { val: 33, req: "Si sblocca con personaggio Lv. 101" },
            { val: 50, req: "Si sblocca con personaggio Lv. 131" },
            { val: 67, req: "Si sblocca con personaggio Lv. 161" },
            { val: 84, req: "Si sblocca con personaggio Lv. 191" },
            { val: 100, req: "Si sblocca con personaggio Lv. 221" },
            { val: 134, req: "Si sblocca con personaggio Lv. 251" },
            { val: 168, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling DF (Vento) + (ＤＦドリブルパワー＋〈風〉)",
        id: "101041003",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di Dribbling di elemento Vento dei compagni DF di {VAL}.",
        levels: [
            { val: 3, req: "Si sblocca con personaggio Lv. 41" },
            { val: 4, req: "Si sblocca con personaggio Lv. 61" },
            { val: 6, req: "Si sblocca con personaggio Lv. 91" },
            { val: 7, req: "Si sblocca con personaggio Lv. 121" },
            { val: 9, req: "Si sblocca con personaggio Lv. 151" },
            { val: 10, req: "Si sblocca con personaggio Lv. 181" },
            { val: 12, req: "Si sblocca con personaggio Lv. 211" },
            { val: 13, req: "Si sblocca con personaggio Lv. 241" },
            { val: 15, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Potenza DF (Vento) + (ＤＦパワー＋〈風〉)",
        id: "101041004",
        template: "All'inizio della partita, aumenta la potenza delle tecniche di elemento Vento dei compagni DF di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca a: Advanced Player +" },
            { val: 14, req: "Si sblocca a: Top Player +" },
            { val: 18, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "power", moveKind: "All", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Tiro FW + (ＦＷキック＋)",
        id: "101077003",
        template: "All'inizio della partita, aumenta il Tiro degli FW alleati di {VAL}.",
        levels: [
            { val: 107, req: "Si sblocca con personaggio Lv. 41" },
            { val: 161, req: "Si sblocca con personaggio Lv. 61" },
            { val: 215, req: "Si sblocca con personaggio Lv. 91" },
            { val: 269, req: "Si sblocca con personaggio Lv. 121" },
            { val: 322, req: "Si sblocca con personaggio Lv. 151" },
            { val: 376, req: "Si sblocca con personaggio Lv. 181" },
            { val: 430, req: "Si sblocca con personaggio Lv. 211" },
            { val: 484, req: "Si sblocca con personaggio Lv. 241" },
            { val: 538, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

    {
        title: "Tecnica FW + (ＦＷテクニック＋)",
        id: "101099001",
        template: "All'inizio della partita, aumenta la Tecnica degli FW alleati di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF Avversario - (敵ＤＦブロック－)",
        id: "101120001",
        template: "All'inizio della partita, riduce il Blocco dei DF avversari di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "enemy", targetRoles: ["DF"], targetElements: [], type: "stat_debuff", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Tiro FW (Foresta) + (林ＦＷキック＋)",
        id: "101078003",
        template: "All'inizio della partita, aumenta il Tiro degli FW alleati di elemento Foresta di {VAL}.",
        levels: [
            { val: 161, req: "Si sblocca con personaggio Lv. 41" },
            { val: 241, req: "Si sblocca con personaggio Lv. 61" },
            { val: 322, req: "Si sblocca con personaggio Lv. 91" },
            { val: 403, req: "Si sblocca con personaggio Lv. 121" },
            { val: 483, req: "Si sblocca con personaggio Lv. 151" },
            { val: 564, req: "Si sblocca con personaggio Lv. 181" },
            { val: 644, req: "Si sblocca con personaggio Lv. 211" },
            { val: 725, req: "Si sblocca con personaggio Lv. 241" },
            { val: 806, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: ["Forest"], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica FW + (ＦＷテクニック＋)",
        id: "101025001",
        template: "All'inizio della partita, aumenta la Tecnica degli FW alleati di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["FW"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro Foresta + (シュートパワー＋〈林〉)",
        id: "101025003",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Tiro Foresta di {VAL}.",
        levels: [
            { val: 9, req: "Si sblocca con personaggio Lv. 41" },
            { val: 14, req: "Si sblocca con personaggio Lv. 61" },
            { val: 18, req: "Si sblocca con personaggio Lv. 91" },
            { val: 23, req: "Si sblocca con personaggio Lv. 121" },
            { val: 28, req: "Si sblocca con personaggio Lv. 151" },
            { val: 32, req: "Si sblocca con personaggio Lv. 181" },
            { val: 37, req: "Si sblocca con personaggio Lv. 211" },
            { val: 42, req: "Si sblocca con personaggio Lv. 241" },
            { val: 47, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling MF + (ＭＦドリブルパワー＋)",
        id: "101024004",
        template: "All'inizio della partita, aumenta la potenza del Dribbling degli MF alleati di {VAL}.",
        levels: [
            { val: 10, req: "Si sblocca a: Advanced Player +" },
            { val: 13, req: "Si sblocca a: Top Player +" },
            { val: 17, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Tecnica MF Vento + (風ＭＦテクニック＋)",
        id: "101022001",
        template: "All'inizio della partita, aumenta la Tecnica degli MF alleati di elemento Vento di {VAL}.",
        levels: [
            { val: 33, req: "Si sblocca con personaggio Lv. 1" },
            { val: 67, req: "Si sblocca con personaggio Lv. 21" },
            { val: 100, req: "Si sblocca con personaggio Lv. 71" },
            { val: 134, req: "Si sblocca con personaggio Lv. 101" },
            { val: 201, req: "Si sblocca con personaggio Lv. 131" },
            { val: 268, req: "Si sblocca con personaggio Lv. 161" },
            { val: 336, req: "Si sblocca con personaggio Lv. 191" },
            { val: 403, req: "Si sblocca con personaggio Lv. 221" },
            { val: 537, req: "Si sblocca con personaggio Lv. 251" },
            { val: 672, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: ["Wind"], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica RoyalAcademy + (帝国テクニック＋)",
        id: "101020001",
        template: "All'inizio della partita, aumenta la Tecnica degli alleati con tag RoyalAcademy di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: [], targetTags: ["Icon_Tag_Team_Emperors"], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling + (ドリブルパワー＋)",
        id: "101020004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 31, req: "Si sblocca a: Advanced Player +" },
            { val: 41, req: "Si sblocca a: Top Player +" },
            { val: 52, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF + (ＤＦブロック＋)",
        id: "101019001",
        template: "All'inizio della partita, aumenta il Blocco dei DF alleati di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Blocco DF + (ＤＦブロック＋)",
        id: "101023001",
        template: "All'inizio della partita, aumenta il Blocco dei DF alleati di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Tasso Fallo DF Avversario + / Tecnica + (敵ＤＦファウル率増／テクニック＋)",
        id: "101023004",
        template: "All'inizio della partita, aumenta il tasso di fallo dei DF avversari di {FOUL}% e aumenta la propria Tecnica di {TECH}.",
        levels: [
            { foul: 100, tech: 189, req: "Si sblocca a: Advanced Player +" },
            { foul: 200, tech: 252, req: "Si sblocca a: Top Player +" },
            { foul: 300, tech: 316, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "enemy", targetRoles: ["DF"], targetElements: [], type: "foul_rate", valueRef: "foul" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "tech" }
        ]
    },
    {
        title: "Tecnica & Blocco DF + (ＤＦテクニック＆ブロック＋)",
        id: "101018001",
        template: "All'inizio della partita, aumenta la Tecnica e il Blocco dei DF alleati di {VAL}.",
        levels: [
            { val: 12, req: "Si sblocca con personaggio Lv. 1" },
            { val: 24, req: "Si sblocca con personaggio Lv. 21" },
            { val: 37, req: "Si sblocca con personaggio Lv. 71" },
            { val: 49, req: "Si sblocca con personaggio Lv. 101" },
            { val: 74, req: "Si sblocca con personaggio Lv. 131" },
            { val: 99, req: "Si sblocca con personaggio Lv. 161" },
            { val: 124, req: "Si sblocca con personaggio Lv. 191" },
            { val: 149, req: "Si sblocca con personaggio Lv. 221" },
            { val: 199, req: "Si sblocca con personaggio Lv. 251" },
            { val: 249, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" },
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Tasso Fallo - / Potenza Blocco + (ファウル率減少＆ブロックパワー＋)",
        id: "101018004",
        template: "All'inizio della partita, riduce il proprio tasso di fallo di {FOUL}% e aumenta la potenza delle proprie tecniche di Blocco di {BLOCK}.",
        levels: [
            { foul: 300, block: 9, req: "Si sblocca a: Advanced Player +" },
            { foul: 400, block: 12, req: "Si sblocca a: Top Player +" },
            { foul: 500, block: 16, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "foul_reduction", valueRef: "foul" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "block" }
        ]
    },
    {
        title: "Potenza + (Vento) / Tecnica + (パワー＋〈風〉／テクニック＋)",
        id: "103030001",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di elemento Vento di {POWER} e la propria Tecnica di {VAL}.",
        levels: [
            { power: 98, val: 350, req: "Si sblocca a: Advanced Player +" },
            { power: 119, val: 425, req: "Si sblocca a: Top Player +" },
            { power: 140, val: 500, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Wind", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling + (ドリブルパワー＋)",
        id: "103030003",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 8, req: "Si sblocca con personaggio Lv. 1" },
            { val: 15, req: "Si sblocca con personaggio Lv. 21" },
            { val: 20, req: "Si sblocca con personaggio Lv. 71" },
            { val: 25, req: "Si sblocca con personaggio Lv. 101" },
            { val: 30, req: "Si sblocca con personaggio Lv. 131" },
            { val: 35, req: "Si sblocca con personaggio Lv. 161" },
            { val: 40, req: "Si sblocca con personaggio Lv. 191" },
            { val: 45, req: "Si sblocca con personaggio Lv. 221" },
            { val: 50, req: "Si sblocca con personaggio Lv. 251" },
            { val: 55, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Tiro + (キック＋)",
        id: "101200001",
        template: "All'inizio della partita, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 134, req: "Si sblocca con personaggio Lv. 1" },
            { val: 268, req: "Si sblocca con personaggio Lv. 21" },
            { val: 403, req: "Si sblocca con personaggio Lv. 71" },
            { val: 537, req: "Si sblocca con personaggio Lv. 101" },
            { val: 672, req: "Si sblocca con personaggio Lv. 131" },
            { val: 806, req: "Si sblocca con personaggio Lv. 161" },
            { val: 940, req: "Si sblocca con personaggio Lv. 191" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1209, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro (Fuoco) + / Tiro + (シュートパワー＋〈火〉／キック＋)",
        id: "101200004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Tiro di elemento Fuoco di {POWER} e il proprio Tiro di {VAL}.",
        levels: [
            { power: 87, val: 405, req: "Si sblocca a: Advanced Player +" },
            { power: 100, val: 463, req: "Si sblocca a: Top Player +" },
            { power: 125, val: 579, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Fire", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },

    {
        title: "Tiro Vento + (風キック＋)",
        id: "101009001",
        template: "All'inizio della partita, aumenta il Tiro degli alleati di attributo Vento di {VAL}.",
        levels: [
            { val: 11, req: "Si sblocca con personaggio Lv. 1" },
            { val: 22, req: "Si sblocca con personaggio Lv. 21" },
            { val: 33, req: "Si sblocca con personaggio Lv. 71" },
            { val: 44, req: "Si sblocca con personaggio Lv. 101" },
            { val: 67, req: "Si sblocca con personaggio Lv. 131" },
            { val: 89, req: "Si sblocca con personaggio Lv. 161" },
            { val: 112, req: "Si sblocca con personaggio Lv. 191" },
            { val: 134, req: "Si sblocca con personaggio Lv. 221" },
            { val: 179, req: "Si sblocca con personaggio Lv. 251" },
            { val: 224, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: ["Wind"], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza + (Vento) (パワー＋〈風〉)",
        id: "101009004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di tiro di Vento di {VAL}.",
        levels: [
            { val: 37, req: "Si sblocca a: Advanced Player +" },
            { val: 49, req: "Si sblocca a: Top Player +" },
            { val: 62, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Blocco + (ブロックパワー＋)",
        id: "101158004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di Blocco di {VAL}.",
        levels: [
            { val: 31, req: "Si sblocca a: Advanced Player +" },
            { val: 41, req: "Si sblocca a: Top Player +" },
            { val: 52, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Blocco + (ブロック＋)",
        id: "101158001",
        template: "All'inizio della partita, aumenta il proprio Blocco di {VAL}.",
        levels: [
            { val: 67, req: "Si sblocca con personaggio Lv. 11" },
            { val: 134, req: "Si sblocca con personaggio Lv. 51" },
            { val: 201, req: "Si sblocca con personaggio Lv. 81" },
            { val: 268, req: "Si sblocca con personaggio Lv. 111" },
            { val: 403, req: "Si sblocca con personaggio Lv. 141" },
            { val: 537, req: "Si sblocca con personaggio Lv. 171" },
            { val: 672, req: "Si sblocca con personaggio Lv. 201" },
            { val: 806, req: "Si sblocca con personaggio Lv. 231" },
            { val: 1075, req: "Si sblocca con personaggio Lv. 261" },
            { val: 1344, req: "Si sblocca con personaggio Lv. 291" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },

    {
        title: "Tecnica DF + (ＤＦテクニック＋)",
        id: "101156001",
        template: "All'inizio della partita, aumenta la Tecnica dei compagni DF di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["DF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Tecnica MF + (味方ＭＦテクニック＋)",
        id: "101160001",
        template: "All'inizio della partita, aumenta la Tecnica dei compagni MF di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },

    {
        title: "Potenza + (Vento) (パワー＋〈風〉)",
        id: "101160004",
        template: "All'inizio della partita, aumenta la potenza delle proprie tecniche di elemento Vento di {VAL}.",
        levels: [
            { val: 31, req: "Si sblocca a: Advanced Player +" },
            { val: 41, req: "Si sblocca a: Top Player +" },
            { val: 52, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "All", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Blocco MF + (ＭＦブロック＋)",
        id: "101161003",
        template: "All'inizio della partita, aumenta il Blocco dei compagni MF di {VAL}.",
        levels: [
            { val: 22, req: "Si sblocca con personaggio Lv. 1" },
            { val: 44, req: "Si sblocca con personaggio Lv. 21" },
            { val: 67, req: "Si sblocca con personaggio Lv. 71" },
            { val: 89, req: "Si sblocca con personaggio Lv. 101" },
            { val: 134, req: "Si sblocca con personaggio Lv. 131" },
            { val: 179, req: "Si sblocca con personaggio Lv. 161" },
            { val: 224, req: "Si sblocca con personaggio Lv. 191" },
            { val: 268, req: "Si sblocca con personaggio Lv. 221" },
            { val: 358, req: "Si sblocca con personaggio Lv. 251" },
            { val: 448, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "allies", targetRoles: ["MF"], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Parata + (キャッチ＋)",
        id: "101155001",
        template: "All'inizio della partita, aumenta la propria Parata di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "Tiro + (キック＋)",
        id: "101165001",
        template: "All'inizio della partita, aumenta il proprio Tiro di {VAL}.",
        levels: [
            { val: 80, req: "Si sblocca con personaggio Lv. 1" },
            { val: 161, req: "Si sblocca con personaggio Lv. 21" },
            { val: 241, req: "Si sblocca con personaggio Lv. 71" },
            { val: 322, req: "Si sblocca con personaggio Lv. 101" },
            { val: 483, req: "Si sblocca con personaggio Lv. 131" },
            { val: 645, req: "Si sblocca con personaggio Lv. 161" },
            { val: 806, req: "Si sblocca con personaggio Lv. 191" },
            { val: 967, req: "Si sblocca con personaggio Lv. 221" },
            { val: 1290, req: "Si sblocca con personaggio Lv. 251" },
            { val: 1613, req: "Si sblocca con personaggio Lv. 281" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    }
];