// ==========================================
// BLOCCHI (BLOCK)
// ==========================================

export const blockLibrary = {
    "ブルーサイクロン": {
        name: "Ciclone Blu (ブルーサイクロン)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [123, 128, 133, 138, 143, 148, 153, 158, 163, 168],
        tp: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        crit: [12, 12, 12, 12, 15, 15, 15, 15, 15, 18],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: false
    },

    "ザ・ウォール": {
        name: "Muro di Roccia (ザ・ウォール)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Mountain.png",
        kind: "Blocco",
        element: "Montagna",
        power: [84, 89, 94, 99, 104, 109, 114, 119, 124, 129],
        tp: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        crit: [11, 11, 11, 11, 14, 14, 14, 14, 14, 17],
        foul: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        shootBlock: true
    },

    "ザ・マウンテン": {
        name: "Montagna di Roccia (ザ・マウンテン)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Mountain.png",
        kind: "Blocco",
        element: "Montagna",
        power: [127, 132, 137, 142, 147, 152, 157, 162, 167, 172],
        tp: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        crit: [3, 3, 3, 3, 6, 6, 6, 6, 6, 9],
        foul: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        shootBlock: true
    },

    "真空魔": {
        name: "Attacco Volante (真空魔)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [127, 132, 137, 142, 147, 152, 157, 162, 167, 172],
        tp: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        crit: [10, 10, 10, 10, 13, 13, 13, 13, 13, 16],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: true
    },

    "スーパー四股踏み": {
        name: "Super Blocco Difensivo (スーパー四股踏み)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Fire.png",
        kind: "Blocco",
        element: "Fuoco",
        power: [100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
        tp: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        crit: [12, 12, 12, 12, 15, 15, 15, 15, 15, 18],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: true
    },

    "ブレードアタック": {
        name: "Lama d'Energia (ブレードアタック)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [95, 100, 105, 110, 115, 120, 125, 130, 135, 140],
        tp: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        crit: [13, 13, 13, 13, 16, 16, 16, 16, 16, 19],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: false
    },

    "旋風陣": {
        name: "Turbina Rotante (旋風陣)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [106, 111, 116, 121, 126, 131, 136, 141, 146, 151],
        tp: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        crit: [10, 10, 10, 10, 13, 13, 13, 13, 13, 16],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: true
    },

    "スピニングカット": {
        name: "Taglio Roteante (スピニングカット)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [78, 83, 88, 93, 98, 103, 108, 113, 118, 123],
        tp: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        crit: [13, 13, 13, 13, 16, 16, 16, 16, 16, 19],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: true
    },

    "キラースライド": {
        name: "Scivolata Micidiale (キラースライド)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Forest.png",
        kind: "Blocco",
        element: "Foresta",
        power: [123, 128, 133, 138, 143, 148, 153, 158, 163, 168],
        tp: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        crit: [20, 20, 20, 20, 23, 23, 23, 23, 23, 26],
        foul: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        shootBlock: false
    },

    "クイックドロウ": {
        name: "Tackle Fulmineo (クイックドロウ)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Forest.png",
        kind: "Blocco",
        element: "Foresta",
        power: [82, 87, 92, 97, 102, 107, 112, 117, 122, 127],
        tp: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        crit: [7, 7, 7, 7, 10, 10, 10, 10, 10, 13],
        foul: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        shootBlock: false
    },

    "怨霊": {
        name: "Palude di Mani (怨霊)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Forest.png",
        kind: "Blocco",
        element: "Foresta",
        power: [98, 103, 108, 113, 118, 123, 128, 133, 138, 143],
        tp: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        crit: [9, 9, 9, 9, 12, 12, 12, 12, 12, 15],
        foul: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        shootBlock: false
    },

    "コイルターン": {
        name: "Difesa a Spirale (コイルターン)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [82, 87, 92, 97, 102, 107, 112, 117, 122, 127],
        tp: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        crit: [7, 7, 7, 7, 10, 10, 10, 10, 10, 13],
        foul: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        shootBlock: false
    },

    "サイクロン": {
        name: "Ciclone (サイクロン)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Wind.png",
        kind: "Blocco",
        element: "Vento",
        power: [123, 128, 133, 138, 143, 148, 153, 158, 163, 168],
        tp: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        crit: [12, 12, 12, 12, 15, 15, 15, 15, 15, 18],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: false
    },

    "アースクェイク": {
        name: "Terremoto (アースクェイク)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Mountain.png",
        kind: "Blocco",
        element: "Montagna",
        power: [92, 97, 102, 107, 112, 117, 122, 127, 132, 137],
        tp: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        crit: [14, 14, 14, 14, 17, 17, 17, 17, 17, 20],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: false
    },
    "裁きの鉄槌": {
        name: "Martello del Giudizio (裁きの鉄槌)",
        icon: "img/MoveSkill/Icon_MoveSkill_Block.png",
        elementIcon: "img/Element/Icon_Element_Fire.png",
        kind: "Blocco",
        element: "Fuoco",
        power: [125, 130, 135, 140, 145, 150, 155, 160, 165, 170],
        tp: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        crit: [10, 10, 10, 10, 13, 13, 13, 13, 13, 16],
        foul: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        shootBlock: true
    }
};