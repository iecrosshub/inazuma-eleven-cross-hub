// --- js/Passive/specific_moves.js ---

export const specificMovesPassives = [
    {
        title: "Potenza Richiamo del Lupo + (ウルフレジェンドパワー＋改)",
        id: "103009004",
        template: "All'inizio della partita, aumenta la Potenza di Richiamo del Lupo di {POWER} e la distanza di {DIST}.",
        levels: [
            { power: 21, dist: 6, req: "Si sblocca a: Advanced Player +" },
            { power: 28, dist: 8, req: "Si sblocca a: Top Player +" },
            { power: 35, dist: 10, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ウルフレジェンド", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Distanza", valueRef: "dist" }
        ]
    },
    {
        title: "Potenza Salto Temporale + (ヘブンズタイムパワー＋改)",
        id: "101164004",
        template: "Aumenta la potenza di Salto Temporale di {POWER} e riduce il costo TP di {TP}.",
        levels: [
            { power: 30, tp: 20, req: "Si sblocca a: Advanced Player +" },
            { power: 36, tp: 25, req: "Si sblocca a: Top Player +" },
            { power: 43, tp: 30, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ヘブンズタイム", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "tp_reduction", valueRef: "tp" }
        ]
    },
    {
        title: "Potenza Scarica Stellare + (天空落としパワー＋改)",
        id: "103018004",
        template: "Aumenta la potenza di Scarica Stellare di {POWER} e riduce il costo TP di {TP}.",
        levels: [
            { power: 48, tp: 10, req: "Si sblocca a: Advanced Player +" },
            { power: 64, tp: 15, req: "Si sblocca a: Top Player +" },
            { power: 80, tp: 20, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "天空落とし", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "tp_reduction", valueRef: "tp" }
        ]
    },

    {
        title: "Potenza Super Barriera di Forza + (フルパワーシールドパワー＋)",
        id: "101017003",
        template: "All'inizio della partita, aumenta la potenza di Scudo di Forza Totale di {VAL}.",
        levels: [
            { val: 13, req: "Si sblocca con personaggio Lv. 41" },
            { val: 20, req: "Si sblocca con personaggio Lv. 61" },
            { val: 26, req: "Si sblocca con personaggio Lv. 91" },
            { val: 33, req: "Si sblocca con personaggio Lv. 121" },
            { val: 40, req: "Si sblocca con personaggio Lv. 151" },
            { val: 46, req: "Si sblocca con personaggio Lv. 181" },
            { val: 53, req: "Si sblocca con personaggio Lv. 211" },
            { val: 60, req: "Si sblocca con personaggio Lv. 241" },
            { val: 67, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "フルパワーシールド", valueRef: "val" }
        ]
    },
    {
        title: "Max TP & Potenza Super Barriera di Forza + (フルパワーシールドパワー＋改)",
        id: "101017004",
        template: "All'inizio della partita, aumenta i propri TP massimi di {VAL} e la potenza di Scudo di Forza Totale di {VAL2}.",
        levels: [
            { val: 12, val2: 16, req: "Si sblocca a: Advanced Player +" },
            { val: 16, val2: 22, req: "Si sblocca a: Top Player +" },
            { val: 20, val2: 28, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "TP", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "フルパワーシールド", valueRef: "val2" }
        ]
    },
    {
        title: "Potenza Ruggito della Tigre + (タイガードライブパワー＋)",
        id: "103011004",
        template: "All'inizio della partita, aumenta la Potenza di Ruggito della Tigre di {VAL}.",
        levels: [
            { val: 53, req: "Si sblocca a: Advanced Player +" },
            { val: 71, req: "Si sblocca a: Top Player +" },
            { val: 89, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "タイガードライブ", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Turbina Rotante + (旋風陣パワー＋)",
        id: "103006004",
        template: "All'inizio della partita, aumenta la potenza di Turbina Rotante di {VAL}.",
        levels: [
            { val: 53, req: "Si sblocca a: Advanced Player +" },
            { val: 71, req: "Si sblocca a: Top Player +" },
            { val: 89, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "旋風陣", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Onda Inarrestabile + (ツナミブーストパワー＋)",
        id: "103004003",
        template: "All'inizio della partita, aumenta la potenza di Onda Inarrestabile di {VAL}.",
        levels: [
            { val: 13, req: "Si sblocca con personaggio Lv. 41" },
            { val: 20, req: "Si sblocca con personaggio Lv. 61" },
            { val: 26, req: "Si sblocca con personaggio Lv. 91" },
            { val: 33, req: "Si sblocca con personaggio Lv. 121" },
            { val: 40, req: "Si sblocca con personaggio Lv. 151" },
            { val: 46, req: "Si sblocca con personaggio Lv. 181" },
            { val: 53, req: "Si sblocca con personaggio Lv. 211" },
            { val: 60, req: "Si sblocca con personaggio Lv. 241" },
            { val: 67, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ツナミブースト", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Dribbling Illusorio + (まぼろしドリブルパワー＋改)",
        id: "103005004",
        template: "All'inizio della partita, aumenta la potenza di Dribbling Illusorio di {POWER} e riduce il costo TP di {TP}.",
        levels: [
            { power: 17, tp: 5, req: "Si sblocca a: Advanced Player +" },
            { power: 23, tp: 10, req: "Si sblocca a: Top Player +" },
            { power: 29, tp: 10, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "まぼろしドリブル", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "tp_reduction", valueRef: "tp" }
        ]
    },
    {
        title: "Potenza Grande Illusione + (イリュージョンボールパワー＋)",
        id: "101026004",
        template: "All'inizio della partita, aumenta la potenza di Grande Illusione di {VAL}.",
        levels: [
            { val: 53, req: "Si sblocca a: Advanced Player +" },
            { val: 71, req: "Si sblocca a: Top Player +" },
            { val: 89, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "イリュージョンボール", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro Roteante + (スピニングシュートパワー＋)",
        id: "101016004",
        template: "All'inizio della partita, aumenta la potenza di Tiro Roteante di {VAL}.",
        levels: [
            { val: 53, req: "Si sblocca a: Advanced Player +" },
            { val: 71, req: "Si sblocca a: Top Player +" },
            { val: 89, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "スピニングシュート", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro Ninja a Valanga + (つちだるまパワー＋改)",
        id: "101143004",
        template: "All'inizio della partita, aumenta la potenza di Tiro Ninja a Valanga di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 22, crt: 600, req: "Si sblocca a: Advanced Player +" },
            { power: 30, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 38, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "つちだるま", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "crit_rate", valueRef: "crt" }
        ]
    },
    {
        title: "Potenza Saetta Spiovente + (パトリオットシュートパワー＋改)",
        id: "101110004",
        template: "All'inizio della partita, aumenta la potenza di Saetta Spiovente di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 22, crt: 600, req: "Si sblocca a: Advanced Player +" },
            { power: 30, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 38, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "パトリオットシュート", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "crit_rate", valueRef: "crt" }
        ]
    },
    {
        title: "Potenza Tiro Fantasma + (ファントムシュートパワー＋改)",
        id: "101086004",
        template: "All'inizio della partita, aumenta la potenza di Tiro Fantasma di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 22, crt: 600, req: "Si sblocca a: Advanced Player +" },
            { power: 30, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 38, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ファントムシュート", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "crit_rate", valueRef: "crt" }
        ]
    },
    {
        title: "Potenza Pugno Propulsore + (ロケットこぶしパワー＋)",
        id: "101100004",
        template: "All'inizio della partita, aumenta la potenza di Pugno Propulsore di {VAL}.",
        levels: [
            { val: 42, req: "Si sblocca a: Advanced Player +" },
            { val: 56, req: "Si sblocca a: Top Player +" },
            { val: 71, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ロケットこぶし", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Tiro Cometa + (彗星シュートパワー＋改)",
        id: "101077004",
        template: "All'inizio della partita, aumenta la potenza di Tiro Cometa di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 15, crt: 500, req: "Si sblocca a: Advanced Player +" },
            { power: 20, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 26, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "彗星シュート", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "crit_rate", valueRef: "crt" }
        ]
    },
    {
        title: "Potenza Vortice Magnetico + (ゆがむ空間パワー＋)",
        id: "101078004",
        template: "All'inizio della partita, aumenta la potenza di Vortice Magnetico di {POWER}.",
        levels: [
            { power: 42, req: "Si sblocca a: Advanced Player +" },
            { power: 56, req: "Si sblocca a: Top Player +" },
            { power: 71, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ゆがむ空間", valueRef: "power" }
        ]
    },
    {
        title: "Potenza Scimmia Volante + (ターザンキックパワー＋改)",
        id: "101099004",
        template: "All'inizio della partita, aumenta la potenza di Scimmia Volante di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 22, crt: 300, req: "Si sblocca a: Advanced Player +" },
            { power: 30, crt: 400, req: "Si sblocca a: Top Player +" },
            { power: 38, crt: 500, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ターザンキック", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "crit_rate", valueRef: "crt" }
        ]
    },
    {
        title: "Potenza Tiro dai Cento Calci + (百烈ショットパワー＋)",
        id: "101025004",
        template: "All'inizio della partita, aumenta la potenza di Tiro dai Cento Calci di {VAL}.",
        levels: [
            { val: 42, req: "Si sblocca a: Advanced Player +" },
            { val: 56, req: "Si sblocca a: Top Player +" },
            { val: 71, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "百烈ショット", valueRef: "val" }
        ]
    },
    {
        title: "Potenza Calcio Stordente + (ジャッジスルーパワー＋改)",
        id: "101022004",
        template: "All'inizio della partita, aumenta la potenza di Calcio Stordente di {VAL} e riduce il tasso di fallo di {VAL2}.",
        levels: [
            { val: 6, val2: 300, req: "Si sblocca a: Advanced Player +" },
            { val: 8, val2: 400, req: "Si sblocca a: Top Player +" },
            { val: 11, val2: 600, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "specific_move", moveName: "ジャッジスルー", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "foul_reduction", valueRef: "val2" }
        ]
    }
];