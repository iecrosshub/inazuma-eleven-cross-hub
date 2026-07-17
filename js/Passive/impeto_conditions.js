// --- js/Passive/impeto_conditions.js ---

export const conditionPassives = [
    {
        title: "[Impeto] Potenza Tiro + (【決定機】シュートパワー＋)",
        id: "103010003",
        template: "Quando effettua una tecnica di tiro in area di rigore, aumenta la Potenza della Tecnica di {VAL}.<br>Condizione di reset: stare fuori dall'area di rigore.",
        levels: [
            { val: 19, req: "Si sblocca con personaggio Lv. 41" },
            { val: 29, req: "Si sblocca con personaggio Lv. 61" },
            { val: 39, req: "Si sblocca con personaggio Lv. 91" },
            { val: 49, req: "Si sblocca con personaggio Lv. 121" },
            { val: 59, req: "Si sblocca con personaggio Lv. 151" },
            { val: 69, req: "Si sblocca con personaggio Lv. 181" },
            { val: 79, req: "Si sblocca con personaggio Lv. 211" },
            { val: 89, req: "Si sblocca con personaggio Lv. 241" },
            { val: 99, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Condition",
        conditions: {
            position: "penalty_area"
        },
        effects: [
            {
                targetScope: "self",
                targetRoles: [],
                targetElements: [],
                type: "power",
                moveKind: "Tiro",
                moveElement: null,
                valueRef: "val"
            }
        ]
    },
    {
        title: "[Impeto] Potenza Dribbling MF + (【攻勢】ＭＦドリブルパワー＋)",
        id: "103014003",
        template: "Quando si trova nella metà campo avversaria, aumenta la Potenza delle tecniche di Dribbling dei compagni MF di {VAL}.<br>Condizione di reset: tornare nella propria metà campo.",
        levels: [
            { val: 6, req: "Si sblocca con personaggio Lv. 41" },
            { val: 9, req: "Si sblocca con personaggio Lv. 61" },
            { val: 12, req: "Si sblocca con personaggio Lv. 91" },
            { val: 15, req: "Si sblocca con personaggio Lv. 121" },
            { val: 18, req: "Si sblocca con personaggio Lv. 151" },
            { val: 21, req: "Si sblocca con personaggio Lv. 181" },
            { val: 24, req: "Si sblocca con personaggio Lv. 211" },
            { val: 27, req: "Si sblocca con personaggio Lv. 241" },
            { val: 30, req: "Si sblocca con personaggio Lv. 271" }
        ],
        category: "Condition",
        conditions: {
            position: "opponent_half"
        },
        effects: [
            {
                targetScope: "allies",
                targetRoles: ["MF"],
                targetElements: [],
                type: "power",
                moveKind: "Dribbling",
                moveElement: null,
                valueRef: "val"
            }
        ]
    },
    {
        title: "[Impeto] Blocco DF + (【守勢】ＤＦブロック＋)",
        id: "103014004",
        template: "Quando si trova nella propria metà campo, aumenta la statistica Blocco dei compagni DF di {VAL}.<br>Condizione di reset: entrare nella metà campo avversaria.",
        levels: [
            { val: 1097, req: "Si sblocca a: Advanced Player +" },
            { val: 1463, req: "Si sblocca a: Top Player +" },
            { val: 1829, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Condition",
        conditions: {
            position: "own_half"
        },
        effects: [
            {
                targetScope: "allies",
                targetRoles: ["DF"],
                targetElements: [],
                type: "stat",
                statName: "Blocco",
                valueRef: "val"
            }
        ]
    },
    {
        title: "[Cumulativa] Tiro Team + (【劣勢】チームキック＋)",
        id: "103013003",
        template: "Quando la squadra sta perdendo con 1 o più gol di scarto, aumenta il Tiro dei compagni di {VAL}. Condizione di reset: Pareggio.",
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
        category: "Condition",
        conditions: { matchState: "losing" },
        effects: [
            { targetScope: "allies", targetRoles: [], targetElements: [], type: "stat", statName: "Tiro", valueRef: "val" }
        ]
    },
    {
        title: "[Cumulativa] Tecnica & Velocità + (【劣勢】テクニック＆スピード＋)",
        id: "103013004",
        template: "Quando la squadra sta perdendo con 1 o più gol di scarto, aumenta la propria Tecnica di {VAL} e la propria Velocità di {VAL2}. Condizione di reset: Pareggio.",
        levels: [
            { val: 1755, val2: 1, req: "Si sblocca a: Advanced Player +" },
            { val: 2340, val2: 2, req: "Si sblocca a: Top Player +" },
            { val: 2926, val2: 2, req: "Si sblocca a: Legendary Player +" }
        ],
        category: "Condition",
        conditions: { matchState: "losing" },
        effects: [
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Tecnica", valueRef: "val" },
            { targetScope: "self", targetRoles: [], targetElements: [], type: "stat", statName: "Velocità", valueRef: "val2" }
        ]
    }
];