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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "ヘブンズタイム", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "ヘブンズタイム", valueRef: "tp" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "天空落とし", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "天空落とし", valueRef: "tp" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "フルパワーシールド", valueRef: "val2" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "まぼろしドリブル", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "まぼろしドリブル", valueRef: "tp" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "つちだるま", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "crit_buff", moveName: "つちだるま", valueRef: "crt" }
        ]
    },
    {
        title: "Potenza Razzo Spiovente + (パトリオットシュートパワー＋改)",
        id: "101110004",
        template: "All'inizio della partita, aumenta la potenza di Razzo Spiovente di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 22, crt: 600, req: "Si sblocca a: Advanced Player +" },
            { power: 30, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 38, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "パトリオットシュート", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "crit_buff", moveName: "パトリオットシュート", valueRef: "crt" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "ファントムシュート", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "crit_buff", moveName: "ファントムシュート", valueRef: "crt" }
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
        title: "Potenza Tiro della Cometa + (彗星シュートパワー＋改)",
        id: "101077004",
        template: "All'inizio della partita, aumenta la potenza di Tiro della Cometa di {POWER} e il suo tasso critico di {CRT}%.",
        levels: [
            { power: 15, crt: 500, req: "Si sblocca a: Advanced Player +" },
            { power: 20, crt: 800, req: "Si sblocca a: Top Player +" },
            { power: 26, crt: 1000, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "彗星シュート", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "crit_buff", moveName: "彗星シュート", valueRef: "crt" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "ターザンキック", valueRef: "power" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "crit_buff", moveName: "ターザンキック", valueRef: "crt" }
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "ジャッジスルー", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "foul_debuff", moveName: "ジャッジスルー", valueRef: "val2" }
        ]
    },

    {
        title: "Potenza Ali di Fuoco (炎の風見鶏パワー＋改)",
        id: "102045004",
        template: "All'inizio della partita, aumenta la potenza della propria tecnica Ali di Fuoco di {VAL1} e ne riduce il consumo TP di {VAL2}.",
        levels: [
            { val1: 18, val2: 5, req: "Si sblocca con: Advanced Player +" },
            { val1: 24, val2: 5, req: "Si sblocca con: Top Player +" },
            { val1: 30, val2: 10, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "炎の風見鶏", moveElement: null, valueRef: "val1" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "炎の風見鶏", valueRef: "val2" }
        ]
    },

    {
        title: "Potenza Mano di Luce + (ゴッドハンドパワー＋)",
        id: "102044003",
        template: "All'inizio della partita, aumenta la potenza della propria tecnica Mano di Luce di elemento Montagna di {VAL}.",
        levels: [
            { val: 13, req: "Si sblocca con personaggio Lv. 41" },
            { val: 20, req: "Si sblocca con personaggio Lv. 61" },
            { val: 26, req: "Si sblocca con personaggio Lv. 91" },
            { val: 33, req: "Si sblocca con personaggio Lv. 121" },
            { val: 40, req: "Si sblocca con personaggio Lv. 151" },
            { val: 46, req: "Si sblocca con personaggio Lv. 181" },
            { val: 53, req: "Si sblocca con personaggio Lv. 211" },
            { val: 60, req: "Si sblocca con personaggio Lv. 241" },
            { val: 67, req: "Si sblocca con personaggio Lv. 271" },
            { val: 73, req: "Si sblocca con personaggio Lv. 301" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "ゴッドハンド", moveElement: "Mountain", valueRef: "val" }
        ]
    },

    {
        title: "Potenza Impasto di Goldie (Fuochi d'artificio) (もちもち黄粉餅（花火）パワー＋改)",
        id: "102055004",
        template: "All'inizio della partita, aumenta la potenza della propria tecnica Impasto di Goldie (Fuochi d'artificio) di {VAL1} e ne riduce il consumo TP di {VAL2}.",
        levels: [
            { val1: 90, val2: 5, req: "Si sblocca con: Advanced Player +" },
            { val1: 109, val2: 5, req: "Si sblocca con: Top Player +" },
            { val1: 129, val2: 10, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "もちもち黄粉餅（花火）", moveElement: null, valueRef: "val1" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "もちもち黄粉餅（花火）", valueRef: "val2" }
        ]
    },

    {
        title: "Potenza Tiro Rimbalzante (Fuochi d'artificio) + / Tiro Albero + (バウンサーラビット（花火）パワー＋／林キック＋)",
        id: "110003004",
        template: "All'inizio della partita, aumenta la potenza della propria tecnica Tiro Rimbalzante (Fuochi d'artificio) di {VAL1} e il Tiro dei compagni di elemento Albero di {VAL2}.",
        levels: [
            { val1: 65, val2: 412, req: "Si sblocca con: Advanced Player +" },
            { val1: 79, val2: 500, req: "Si sblocca con: Top Player +" },
            { val1: 93, val2: 589, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "バウンサーラビット（花火）", moveElement: null, valueRef: "val1" },
            { targetScope: "team", targetRoles: [], targetElements: ["Forest"], type: "stat", statName: "Tiro", valueRef: "val2" }
        ]
    },

    {
        title: "Potenza Ali di Fuoco + (炎の風見鶏パワー＋)",
        id: "102054003",
        template: "All'inizio della partita, aumenta la potenza della propria tecnica Ali di Fuoco (炎の風見鶏) di {VAL}.",
        levels: [
            { val: 13, req: "Lv. 41" },
            { val: 20, req: "Lv. 61" },
            { val: 26, req: "Lv. 91" },
            { val: 33, req: "Lv. 121" },
            { val: 40, req: "Lv. 151" },
            { val: 46, req: "Lv. 181" },
            { val: 53, req: "Lv. 211" },
            { val: 60, req: "Lv. 241" },
            { val: 67, req: "Lv. 271" },
            { val: 73, req: "Lv. 301" },
            { val: 80, req: "Lv. 331" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "炎の風見鶏", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "Potenza Dragon Crash FW + (ＦＷドラゴンクラッシュパワー＋)",
        id: "102047003",
        template: "All'inizio della partita, aumenta la potenza della tecnica Dragon Crash  dei compagni FW di {VAL}.",
        levels: [
            { val: 4, req: "Si sblocca con personaggio Lv. 41" },
            { val: 6, req: "Si sblocca con personaggio Lv. 61" },
            { val: 8, req: "Si sblocca con personaggio Lv. 91" },
            { val: 11, req: "Si sblocca con personaggio Lv. 121" },
            { val: 13, req: "Si sblocca con personaggio Lv. 151" },
            { val: 15, req: "Si sblocca con personaggio Lv. 181" },
            { val: 17, req: "Si sblocca con personaggio Lv. 211" },
            { val: 19, req: "Si sblocca con personaggio Lv. 241" },
            { val: 22, req: "Si sblocca con personaggio Lv. 271" },
            { val: 24, req: "Si sblocca con personaggio Lv. 301" },
            { val: 26, req: "Si sblocca con personaggio Lv. 331" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "team", targetRoles: ["FW"], targetElements: [], type: "power", moveName: "ドラゴンクラッシュ", moveElement: null, valueRef: "val" }
        ]
    },

    {
        title: "Potenza Mano di Luce (ゴッドハンドパワー＋改)",
        id: "101166004",
        template: "All'inizio della partita, aumenta la potenza della propria tecnica Mano di Luce di elemento Montagna di {VAL1} e ne riduce il consumo TP di {VAL2}.",
        levels: [
            { val1: 81, val2: 5, req: "Si sblocca con: Advanced Player +" },
            { val1: 99, val2: 5, req: "Si sblocca con: Top Player +" },
            { val1: 117, val2: 5, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Always",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "ゴッドハンド", moveElement: "Mountain", valueRef: "val1" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "ゴッドハンド", valueRef: "val2" }
        ]
    },

    {
        title: "[Risonanza] Potenza Pinguino Imperatore 2 + (【共鳴】皇帝ペンギン2号パワー＋改)",
        id: "102173005",
        template: "All'inizio della partita, se ci sono 3 o più alleati di elemento Albero, aumenta la potenza della propria tecnica Pinguino Imperatore 2 di {VAL1} e ne riduce il consumo TP di {VAL2}.",
        levels: [
            { val1: 136, val2: 20, req: "Si sblocca con: Legendary Player +" }
        ],
        category: "Bonds",
        conditions: { requiresElements: ["Forest"], requiresCount: 3 },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveName: "皇帝ペンギン2号", moveElement: null, valueRef: "val1" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "move_modifier", modifierType: "tp_reduction", moveName: "皇帝ペンギン2号", valueRef: "val2" }
        ]
    }
];