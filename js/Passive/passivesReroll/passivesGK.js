export const rerollPassivesGK = [
    {
        title: "Potenza di Cattura + (Generica) [キャッチパワー＋]",
        id: "REROLL_GK_CATCH_POWER",
        template: "Aumenta la potenza delle tecniche di Parata di {VAL}.",
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "power", moveKind: "Parata", moveElement: null, valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Cattura + (Fuoco) [キャッチパワー＋〈火〉]",
        id: "REROLL_GK_CATCH_POWER_FIRE",
        template: "Aumenta la potenza delle tecniche di Parata di elemento Fuoco di {VAL}.",
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
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Parata", moveElement: "Fire", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Cattura + (Montagna) [キャッチパワー＋〈山〉]",
        id: "REROLL_GK_CATCH_POWER_MOUNTAIN",
        template: "Aumenta la potenza delle tecniche di Parata di elemento Montagna di {VAL}.",
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
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Parata", moveElement: "Mountain", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Cattura + (Vento) [キャッチパワー＋〈風〉]",
        id: "REROLL_GK_CATCH_POWER_WIND",
        template: "Aumenta la potenza delle tecniche di Parata di elemento Vento di {VAL}.",
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
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Parata", moveElement: "Wind", valueRef: "val" }
        ]
    },
    {
        title: "Potenza di Cattura + (Bosco) [キャッチパワー＋〈林〉]",
        id: "REROLL_GK_CATCH_POWER_FOREST",
        template: "Aumenta la potenza delle tecniche di Parata di elemento Bosco di {VAL}.",
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
            { targetScope: "self", targetRoles: [], targetElements: [], /* FIX */ type: "power", moveKind: "Parata", moveElement: "Forest", valueRef: "val" }
        ]
    },
    {
        title: "Presa + [キャッチ＋]",
        id: "REROLL_GK_CATCH",
        template: "Aumenta la statistica di Parata di {VAL}.",
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
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Parata", valueRef: "val" }
        ]
    },
    {
        title: "[Secondo tempo] TP + [【後半】TP＋]",
        id: "REROLL_GK_SECOND_HALF_TP",
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
        id: "REROLL_GK_MAX_TP",
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
        id: "REROLL_GK_SPEED",
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