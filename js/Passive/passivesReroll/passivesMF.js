export const rerollPassivesMF = [
    {
        title: "Calcio + [キック＋]",
        id: "REROLL_MF_KICK",
        template: "Aumenta la statistica di Tiro di {VAL}.",
        levels: [
            { val: 25, req: "Livello 1" },
            { val: 40, req: "Livello 2" },
            { val: 60, req: "Livello 3" },
            { val: 80, req: "Livello 4" },
            { val: 100, req: "Livello 5" },
            { val: 125, req: "Livello 6" },
            { val: 150, req: "Livello 7" },
            { val: 175, req: "Livello 8" },
            { val: 200, req: "Livello 9" },
            { val: 250, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Tiro + (Generica) [シュートパワー＋]",
        id: "REROLL_MF_SHOOT_POWER",
        template: "Aumenta la potenza delle tecniche di Tiro di {VAL}.",
        levels: [
            { val: 1, req: "Livello 1" },
            { val: 2, req: "Livello 2" },
            { val: 3, req: "Livello 3" },
            { val: 4, req: "Livello 4" },
            { val: 5, req: "Livello 5" },
            { val: 6, req: "Livello 6" },
            { val: 7, req: "Livello 7" },
            { val: 8, req: "Livello 8" },
            { val: 9, req: "Livello 9" },
            { val: 10, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Tiro", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Tecnica + [テクニック＋]",
        id: "REROLL_MF_TECH",
        template: "Aumenta la statistica di Tecnica di {VAL}.",
        levels: [
            { val: 50, req: "Livello 1" },
            { val: 75, req: "Livello 2" },
            { val: 100, req: "Livello 3" },
            { val: 150, req: "Livello 4" },
            { val: 200, req: "Livello 5" },
            { val: 250, req: "Livello 6" },
            { val: 300, req: "Livello 7" },
            { val: 350, req: "Livello 8" },
            { val: 400, req: "Livello 9" },
            { val: 500, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Dribbling + (Generica) [ドリブルパワー＋]",
        id: "REROLL_MF_DRIBBLE_POWER",
        template: "Aumenta la potenza delle tecniche di Dribbling di {VAL}.",
        levels: [
            { val: 2, req: "Livello 1" },
            { val: 4, req: "Livello 2" },
            { val: 6, req: "Livello 3" },
            { val: 8, req: "Livello 4" },
            { val: 10, req: "Livello 5" },
            { val: 12, req: "Livello 6" },
            { val: 14, req: "Livello 7" },
            { val: 16, req: "Livello 8" },
            { val: 18, req: "Livello 9" },
            { val: 20, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Dribbling", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Dribbling + (Fuoco) [ドリブルパワー＋〈火〉]",
        id: "REROLL_MF_DRIBBLE_POWER_FIRE",
        template: "Aumenta la potenza delle tecniche di Dribbling di elemento Fuoco di {VAL}.",
        levels: [
            { val: 3, req: "Livello 1" },
            { val: 5, req: "Livello 2" },
            { val: 8, req: "Livello 3" },
            { val: 11, req: "Livello 4" },
            { val: 14, req: "Livello 5" },
            { val: 17, req: "Livello 6" },
            { val: 21, req: "Livello 7" },
            { val: 25, req: "Livello 8" },
            { val: 31, req: "Livello 9" },
            { val: 35, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Dribbling", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Dribbling + (Montagna) [ドリブルパワー＋〈山〉]",
        id: "REROLL_MF_DRIBBLE_POWER_MOUNTAIN",
        template: "Aumenta la potenza delle tecniche di Dribbling di elemento Montagna di {VAL}.",
        levels: [
            { val: 3, req: "Livello 1" },
            { val: 5, req: "Livello 2" },
            { val: 8, req: "Livello 3" },
            { val: 11, req: "Livello 4" },
            { val: 14, req: "Livello 5" },
            { val: 17, req: "Livello 6" },
            { val: 21, req: "Livello 7" },
            { val: 25, req: "Livello 8" },
            { val: 31, req: "Livello 9" },
            { val: 35, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Dribbling", moveElement: "Mountain", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Dribbling + (Vento) [ドリブルパワー＋〈風〉]",
        id: "REROLL_MF_DRIBBLE_POWER_WIND",
        template: "Aumenta la potenza delle tecniche di Dribbling di elemento Vento di {VAL}.",
        levels: [
            { val: 3, req: "Livello 1" },
            { val: 5, req: "Livello 2" },
            { val: 8, req: "Livello 3" },
            { val: 11, req: "Livello 4" },
            { val: 14, req: "Livello 5" },
            { val: 17, req: "Livello 6" },
            { val: 21, req: "Livello 7" },
            { val: 25, req: "Livello 8" },
            { val: 31, req: "Livello 9" },
            { val: 35, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Dribbling", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Dribbling + (Bosco) [ドリブルパワー＋〈林〉]",
        id: "REROLL_MF_DRIBBLE_POWER_FOREST",
        template: "Aumenta la potenza delle tecniche di Dribbling di elemento Bosco di {VAL}.",
        levels: [
            { val: 3, req: "Livello 1" },
            { val: 5, req: "Livello 2" },
            { val: 8, req: "Livello 3" },
            { val: 11, req: "Livello 4" },
            { val: 14, req: "Livello 5" },
            { val: 17, req: "Livello 6" },
            { val: 21, req: "Livello 7" },
            { val: 25, req: "Livello 8" },
            { val: 31, req: "Livello 9" },
            { val: 35, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Dribbling", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Blocco + [ブロック＋]",
        id: "REROLL_MF_BLOCK",
        template: "Aumenta la statistica di Blocco di {VAL}.",
        levels: [
            { val: 25, req: "Livello 1" },
            { val: 40, req: "Livello 2" },
            { val: 60, req: "Livello 3" },
            { val: 80, req: "Livello 4" },
            { val: 100, req: "Livello 5" },
            { val: 125, req: "Livello 6" },
            { val: 150, req: "Livello 7" },
            { val: 175, req: "Livello 8" },
            { val: 200, req: "Livello 9" },
            { val: 250, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Blocco", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Blocco + (Generica) [ブロックパワー＋]",
        id: "REROLL_MF_BLOCK_POWER",
        template: "Aumenta la potenza delle tecniche di Blocco di {VAL}.",
        levels: [
            { val: 1, req: "Livello 1" },
            { val: 2, req: "Livello 2" },
            { val: 3, req: "Livello 3" },
            { val: 4, req: "Livello 4" },
            { val: 5, req: "Livello 5" },
            { val: 6, req: "Livello 6" },
            { val: 7, req: "Livello 7" },
            { val: 8, req: "Livello 8" },
            { val: 9, req: "Livello 9" },
            { val: 10, req: "Livello 10" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Blocco", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "[Secondo tempo] TP + [【後半】TP＋]",
        id: "REROLL_MF_SECOND_HALF_TP",
        template: "All'inizio del secondo tempo, aumenta il limite massimo di TP di {VAL}.",
        levels: [
            { val: 5, req: "Livello 1" },
            { val: 10, req: "Livello 2" },
            { val: 15, req: "Livello 3" },
            { val: 20, req: "Livello 4" },
            { val: 25, req: "Livello 5" },
            { val: 30, req: "Livello 6" },
            { val: 35, req: "Livello 7" },
            { val: 40, req: "Livello 8" }
        ],
        category: "Reroll",
        conditions: { time: "second_half" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "TP", valueRef: "val" }
        ]
    },
    {
        title: "Limite massimo TP + [TP上限＋]",
        id: "REROLL_MF_MAX_TP",
        template: "Aumenta il limite massimo di TP di {VAL}.",
        levels: [
            { val: 5, req: "Livello 1" },
            { val: 10, req: "Livello 2" },
            { val: 15, req: "Livello 3" },
            { val: 20, req: "Livello 4" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "TP", valueRef: "val" }
        ]
    },
    {
        title: "Velocità + [スピード＋]",
        id: "REROLL_MF_SPEED",
        template: "Aumenta la statistica di Velocità di {VAL}.",
        levels: [
            { val: 1, req: "Livello 1" },
            { val: 2, req: "Livello 2" }
        ],
        category: "Reroll",
        conditions: null,
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Velocità", valueRef: "val" }
        ]
    }
];