export const passivesLibrary = [
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
        actions: [
            { target: "self", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
        ]
    },
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
        actions: [
            { target: "self", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon_inazuma_japan" }
        ]
    },
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
        actions: [
            { target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "in_penalty_area" }
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
        actions: [
            { target: "self", stat: "TP", type: "tp_max", amount: "{VAL}", condition: "always" }
        ]
    },
    {
        title: "[Legame] Raimon/Inazuma Japan + (【自得点/累】雷門・イナズマジャパン＋)",
        id: "103010004",
        template: "Ogni volta che segna un Gol, aumenta Tutte le Statistiche degli Alleati con tag Raimon o Inazuma Japan di {VAL}.",
        levels: [
            { val: 119, req: "Si sblocca a: Advanced Player +" },
            { val: 159, req: "Si sblocca a: Top Player +" },
            { val: 199, req: "Si sblocca a: Legendary Player +" }
        ],
        actions: [
            { target: "allies_raimon_inazuma_japan", stat: "Tutte_le_Statistiche", type: "base_stat", amount: "{VAL}", condition: "scored_goal" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_MF", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "opponent_half" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "own_half" }
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
        actions: [
            { target: "self", stat: "Potenza_Vento", type: "move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "always" }
        ]
    },
    {
        title: "Potenza Richiamo del Lupo + (ウルフレジェンドパワー＋改)",
        id: "103009004",
        template: "All'inizio della partita, aumenta la Potenza di Richiamo del Lupo di {POWER} e la distanza di {DIST}.",
        levels: [
            { power: 21, dist: 6, req: "Si sblocca a: Advanced Player +" },
            { power: 28, dist: 8, req: "Si sblocca a: Top Player +" },
            { power: 35, dist: 10, req: "Si sblocca a: Legendary Player +" }
        ],
        actions: [
            { target: "self", stat: "Richiamo del Lupo (ウルフレジェンド)", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Distanza", type: "distance", amount: "{DIST}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "ヘブンズタイム", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "TP", type: "tp_reduction", amount: "{TP}", condition: "always" }
        ]
    },
    {
        title: "Potenza Tiro (Fuoco) + (シュートパワー＋〈火〉)",
        id: "103018001",
        template: "All'inizio della partita, aumenta la Potenza delle Tecniche di Tiro Fuoco di {VAL}.",
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
        actions: [
            { target: "self", stat: "Potenza_Tiro_Fuoco", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "Scarica Stellare (天空落とし)", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "TP", type: "tp_reduction", amount: "{TP}", condition: "always" }
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
        actions: [
            { target: "team_MF", stat: "Potenza_Blocco", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_MF", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "dribble_or_block_success" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Tiro_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "team_MF", stat: "Potenza_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
        ]
    },
    {
        title: "Probabilità Catena di Tiro & Tecnica + (シュートチェイン確率＆テクニック＋)",
        id: "103017001",
        template: "All'inizio della partita, aumenta la probabilità di Catena di Tiro di {VAL}% e la propria Tecnica di {VAL}.",
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
        actions: [
            { target: "self", stat: "Catena_Tiro", type: "chain_prob", amount: "{VAL}", condition: "always" },
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "receive_pass" },
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL2}", condition: "receive_pass" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "chain_shoot_active" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "3_allies_inazuma_japan" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team", stat: "Fallo_Team", type: "foul_reduction", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_DF_GK", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "block_fail" },
            { target: "team_DF_GK", stat: "Parata", type: "base_stat", amount: "{VAL}", condition: "block_fail" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "block_success" }
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
        actions: [
            { target: "self", stat: "Potenza_Blocco_Montagna", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "self", stat: "Velocità", type: "base_stat", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "3_allies_inazuma_japan" }
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
        actions: [
            { target: "self", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "block_success" }
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
        actions: [
            { target: "self", stat: "Potenza_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Parata", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_Forest", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "catch_success" }
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
        actions: [
            { target: "self", stat: "Potenza_Foresta", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW_MF", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "ally_dribble_success" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "self", stat: "Parata", type: "base_stat", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Super Barriera di Forza (フルパワーシールド)", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "TP", type: "tp_max", amount: "{VAL}", condition: "always" },
            { target: "self", stat: "Super Barriera di Forza (フルパワーシールド)", type: "specific_move_power", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Parata", type: "base_stat", amount: "{VAL}", condition: "concede_goal" }
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
        actions: [
            { target: "team", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "catch_or_block_success" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "catch_or_block_success" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_inazuma_japan" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "Ruggito della Tigre (タイガードライブ)", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "losing_match" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "losing_match" },
            { target: "self", stat: "Velocità", type: "base_stat", amount: "{VAL2}", condition: "losing_match" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_GK", stat: "Parata", type: "base_stat", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Blocco", type: "move_power", amount: "{VAL}", condition: "concede_goal" }
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
        actions: [
            { target: "team_Forest_DF_GK", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_Forest_DF_GK", stat: "Parata", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_Forest", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "Turbina Rotante (旋風陣)", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "ツナミブースト", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_Wind_Fire", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "block_success" },
            { target: "self", stat: "Velocità", type: "base_stat", amount: "{VAL2}", condition: "block_success" }
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
        actions: [
            { target: "self", stat: "まぼろしドリブル", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "TP", type: "tp_reduction", amount: "{TP}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Potenza_Blocco", type: "move_power", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "team_Raimon_Emperors", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "team_Raimon_Emperors", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "team_FW_Forest", stat: "Potenza_Tiro_Foresta", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "イリュージョンボール", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_Forest", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" },
            { target: "team_Forest", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "team_MF_DF", stat: "Potenza", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "スピニングシュート", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "3_allies_kirkwood" }
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
        actions: [
            { target: "team_FW_Fire", stat: "Potenza_Tiro_Fuoco", type: "move_power", amount: "{VAL}", condition: "dribble_or_block_success" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro_Fuoco", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_kirkwood" }
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
        actions: [
            { target: "self", stat: "Triangolo Z (トライアングルＺ)", type: "specific_move_power", amount: "{POWER}", condition: "3_allies_kirkwood" },
            { target: "self", stat: "TP", type: "tp_reduction", amount: "{TP}", condition: "3_allies_kirkwood" }
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
        actions: [
            { target: "self", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "3_allies_kirkwood" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Tiro_Fuoco", type: "move_power", amount: "{VAL}", condition: "3_allies_kirkwood" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_forest" }
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
        actions: [
            { target: "self", stat: "Tornado Oscuro (ダークトルネード)", type: "specific_move_power", amount: "{POWER}", condition: "3_allies_raimon" },
            { target: "self", stat: "Distanza", type: "distance", amount: "{DIST}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro_Foresta", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_Raimon", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_Forest", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Foresta", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro_Foresta", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "self", stat: "Potenza_Fuoco", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW_Fire_Forest", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "3_allies_fire" }
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
        actions: [
            { target: "self", stat: "Tiro Ninja a Valanga (つちだるま)", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Fuoco", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Saetta Spiovente (パトリオットシュート)", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "enemy_DF", stat: "Blocco", type: "base_stat", amount: "-{VAL}", condition: "dribble_or_block_success" }
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
        actions: [
            { target: "self", stat: "Tiro Fantasma (ファントムシュート)", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" },
            { target: "self", stat: "Parata", type: "base_stat", amount: "{VAL2}", condition: "always" }
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
        actions: [
            { target: "enemy_MF_DF", stat: "Tecnica", type: "base_stat", amount: "-{VAL}", condition: "3_allies_forest" }
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
        actions: [
            { target: "self", stat: "Pugno Propulsore (ロケットこぶし)", type: "specific_move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "team", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [{ target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "always" }]
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
        actions: [{ target: "team", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "team_DF", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "block_success" }]
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
        actions: [{ target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "enemy_FW_MF", stat: "Tecnica", type: "base_stat", amount: "-{VAL}", condition: "dribble_success" }]
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
        actions: [{ target: "team_Forest_DF_GK", stat: "Potenza_Foresta", type: "move_power", amount: "{VAL}", condition: "always" }]
    },

    {
        title: "[Legame] Blocco DF + (【結束】ＤＦブロック＋)",
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
        actions: [{ target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "team_Forest_DF_GK", stat: "Potenza_Foresta", type: "move_power", amount: "{VAL}", condition: "always" }]
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
        actions: [{ target: "team", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }]
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
        actions: [{ target: "team_DF", stat: "Blocco", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "team_FW_Forest", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "team_MF", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "self", stat: "Potenza_Dribbling", type: "move_power", amount: "{VAL}", condition: "always" }]
    },

    {
        title: "Tiro Team + (チームキック＋)",
        id: "101008001",
        template: "All'inizio della partita, aumenta il Tiro degli alleati di {VAL}.",
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
        actions: [{ target: "team", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }]
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
        actions: [{ target: "self", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "self", stat: "Potenza_Fuoco", type: "move_power", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "3_allies_raimon" }]
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
        actions: [{ target: "self", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "3_allies_forest" }]
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
        actions: [
            { target: "self", stat: "メガネクラッシュ", type: "specific_move_power", amount: "{POWER}", condition: "3_allies_raimon" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "team_DF", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon" }
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
        actions: [
            { target: "team_DF", stat: "Potenza_Dribbling_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_DF", stat: "Potenza_Vento", type: "move_power", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "3_allies_raimon_or_inazumakidsfc" }
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
        actions: [
            { target: "team_FW", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "彗星シュート", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "always" }
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
        actions: [
            { target: "self", stat: "Potenza_Foresta", type: "move_power", amount: "{VAL}", condition: "3_allies_forest" }
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
        actions: [
            { target: "team_FW_Forest", stat: "Tiro", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "self", stat: "ゆがむ空間", type: "specific_move_power", amount: "{POWER}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Tecnica", type: "base_stat", amount: "{VAL}", condition: "always" }
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
        actions: [
            { target: "team_FW", stat: "Potenza_Tiro", type: "move_power", amount: "{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "self", stat: "ターザンキック", type: "specific_move_power", amount: "{POWER}", condition: "always" },
            { target: "self", stat: "Critico", type: "crit_rate", amount: "{CRT}", condition: "always" }
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
        actions: [
            { target: "enemy_DF", stat: "Blocco", type: "base_stat", amount: "-{VAL}", condition: "always" }
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
        actions: [
            { target: "enemy_DF", stat: "Potenza_Blocco", type: "move_power", amount: "-{VAL}", condition: "dribble_success" }
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
        actions: [
            { target: "enemy_GK", stat: "Parata", type: "base_stat", amount: "-{VAL}", condition: "dribble_success" }
        ]
    }


];