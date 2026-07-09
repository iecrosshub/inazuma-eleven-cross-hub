// js/renderUI.js
import { parsePassiveText } from './utils.js';

export function renderStats(db, level) {
    const statsList = document.getElementById('stats-list');
    statsList.innerHTML = '';
    document.getElementById('btn-lv1').classList.toggle('active', level === 'lv1');
    document.getElementById('btn-lv300').classList.toggle('active', level === 'lv300');

    Object.entries(db.stats).forEach(([key, data]) => {
        // Pulito da stili inline: ora ci pensa interamente il CSS globale!
        statsList.innerHTML += `
            <li>
                <div class="d-flex align-items-center gap-2">
                    <img src="${data.icon}" style="height: 24px;" alt="${key}">
                    <span>${key}</span>
                </div>
                <span>${data[level]}</span>
            </li>`;
    });

    const zonesContainer = document.getElementById('zones-container');
    if (zonesContainer) zonesContainer.innerHTML = createZonesGrid(db.zones || []);
}

export function renderTechniques(db) {
    const tecContainer = document.getElementById('tecniche-container');
    if (!tecContainer) return;
    tecContainer.innerHTML = '';

    Object.values(db.techniques).forEach((t, tIdx) => {
        let tabs = '', content = '';
        for (let i = 0; i < 10; i++) {
            const active = i === 0 ? 'active' : '';
            tabs += `<li class="nav-item"><button class="nav-link ${active}" data-bs-toggle="tab" data-bs-target="#t-${tIdx}-lv-${i}">Lv. ${i + 1}</button></li>`;

            // Rimossa la classe 'text-info' fissa: il CSS colora automaticamente di ciano la seconda colonna
            let rows = t.details.map(d => `<tr><td style="width:40%">${d.label}</td><td>${d.values[i]}</td></tr>`).join('');

            // Tolto 'table-dark' per far funzionare i colori Inazuma
            content += `<div class="tab-pane fade ${i === 0 ? 'show active' : ''}" id="t-${tIdx}-lv-${i}">
                            <table class="table table-sm mt-2 mb-0"><tbody>${rows}</tbody></table>
                        </div>`;
        }
        tecContainer.innerHTML += `
        <div class="card border-secondary mb-4 shadow">
            <div class="card-header d-flex align-items-center gap-2">
                <img src="${t.icon}" style="height: 28px;" alt="Tipo">
                <img src="${t.elementIcon}" style="height: 28px;" alt="Elemento">
                <h5 class="mb-0 ms-2">${t.name}</h5>
            </div>
            <div class="card-body">
                <ul class="nav nav-tabs border-secondary">${tabs}</ul>
                <div class="tab-content p-2">${content}</div>
            </div>
        </div>`;
    });
}

export function renderPassives(db) {
    const passContainer = document.getElementById('passive-container');
    if (!passContainer) return;
    passContainer.innerHTML = '';

    const drawGroup = (title, passiveList) => {
        if (passiveList.length === 0) return;
        passContainer.innerHTML += `<h3 class="mb-4 mt-5 text-info">${title}</h3>`;

        passiveList.forEach((p) => {
            let tabs = '', content = '';
            p.levels.forEach((lv, lvIdx) => {
                const active = lvIdx === 0 ? 'active' : '';
                const tabId = `p-${p.id}-${lvIdx}`;
                const descrizione = parsePassiveText(p.template, lv);

                tabs += `<li class="nav-item"><button class="nav-link ${active}" data-bs-toggle="tab" data-bs-target="#${tabId}">Lv. ${lvIdx + 1}</button></li>`;

                // Cambiato in 'bg-light' e tolti gli style="color: #ffffff !important" che rompevano tutto
                content += `
                    <div class="tab-pane fade ${lvIdx === 0 ? 'show active' : ''}" id="${tabId}">
                        <div class="mb-2 mt-2">
                            <span class="badge border border-info" style="background-color: #102247; color: #0dcaf0;">${lv.req}</span>
                        </div>
                        <div class="bg-light">
                            <p class="mb-0" style="font-size: 1.05rem; line-height: 1.5;">${descrizione}</p>
                        </div>
                    </div>`;
            });
            passContainer.innerHTML += `
                <div class="card border-secondary mb-4 shadow">
                    <div class="card-header d-flex justify-content-between">
                        <strong>${p.title}</strong><small class="opacity-75">ID: ${p.id}</small>
                    </div>
                    <div class="card-body">
                        <ul class="nav nav-tabs border-secondary mb-3">${tabs}</ul>
                        <div class="tab-content">${content}</div>
                    </div>
                </div>`;
        });
    };

    drawGroup("Passive di Livello", db.basicPassives);
    drawGroup("Passive di Risveglio", db.rarityPassives);
}

function createZonesGrid(playerZones) {
    if (!playerZones || playerZones.length === 0) return '';
    const areaByCode = new Map(playerZones.map(area => [area.code, area]));

    const layout = [
        { code: 1, row: "1", col: "1" }, { code: 2, row: "1", col: "2 / span 2" }, { code: 3, row: "1", col: "4" },
        { code: 4, row: "2 / span 2", col: "1" }, { code: 5, row: "2", col: "2 / span 2" }, { code: 6, row: "2 / span 2", col: "4" },
        { code: 7, row: "3", col: "2 / span 2" }, { code: 8, row: "4", col: "1" }, { code: 9, row: "4", col: "2 / span 2" },
        { code: 10, row: "4", col: "4" }, { code: 11, row: "5", col: "2 / span 2" }
    ];

    const cells = layout.map(cell => {
        const area = areaByCode.get(cell.code);
        const rankClass = area ? `rank-${area.rank.toLowerCase()}` : "rank-empty";
        return `<span class="zone-cell ${rankClass}" style="grid-row:${cell.row}; grid-column:${cell.col}">${area ? area.rank : ""}</span>`;
    });

    return `
        <div class="field-zone">
            <div class="field-zone-title">Zone</div>
            <div class="position-grid">${cells.join("")}</div>
        </div>`;
}