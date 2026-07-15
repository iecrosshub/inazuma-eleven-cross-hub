// js/Components/filters.js

const filtersHTML = `
<div class="row g-3">
    <!-- RICERCA NOME -->
    <div class="col-12">
        <div class="filter-group">
            <label>Nome Giocatore</label>
            <input type="text" id="search-name" placeholder="Cerca nome..." style="width: 100%; border: 1px solid #d4e1f1; border-radius: 6px; padding: 8px 12px; font-size: 0.95rem;">
        </div>
    </div>

    <!-- RIGA 1: Elemento, Ruolo, Rarità -->
    <div class="col-12 col-md-4">
        <div class="filter-group">
            <label>Elemento</label>
            <div class="custom-select" id="filter-element" data-value="All">
                <div class="select-selected"><span>Tutti gli Elementi</span> <i class="fas fa-chevron-down"></i></div>
                <div class="select-items select-hide">
                    <div data-value="All">Tutti gli Elementi</div>
                    <div data-value="Fire"><img src="img/Element/Icon_Element_Fire.png" style="width: 20px; margin-right: 6px; vertical-align: middle;" alt=""> Fuoco</div>
                    <div data-value="Wind"><img src="img/Element/Icon_Element_Wind.png" style="width: 20px; margin-right: 6px; vertical-align: middle;" alt=""> Vento</div>
                    <div data-value="Forest"><img src="img/Element/Icon_Element_Forest.png" style="width: 20px; margin-right: 6px; vertical-align: middle;" alt=""> Foresta</div>
                    <div data-value="Mountain"><img src="img/Element/Icon_Element_Mountain.png" style="width: 20px; margin-right: 6px; vertical-align: middle;" alt=""> Montagna</div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="filter-group">
            <label>Ruolo</label>
            <div class="custom-select" id="filter-position" data-value="All">
                <div class="select-selected"><span>Tutti i Ruoli</span> <i class="fas fa-chevron-down"></i></div>
                <div class="select-items select-hide">
                    <div data-value="All">Tutti i Ruoli</div>
                    <div data-value="FW"><img src="img/Position/Icon_Position_FW.png" style="height: 18px; margin-right: 6px; vertical-align: middle;" alt=""> Attaccanti (FW)</div>
                    <div data-value="MF"><img src="img/Position/Icon_Position_MF.png" style="height: 18px; margin-right: 6px; vertical-align: middle;" alt=""> Centrocampisti (MF)</div>
                    <div data-value="DF"><img src="img/Position/Icon_Position_DF.png" style="height: 18px; margin-right: 6px; vertical-align: middle;" alt=""> Difensori (DF)</div>
                    <div data-value="GK"><img src="img/Position/Icon_Position_GK.png" style="height: 18px; margin-right: 6px; vertical-align: middle;" alt=""> Portieri (GK)</div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="filter-group">
            <label>Rarità</label>
            <div class="custom-select" id="filter-rarity" data-value="All">
                <div class="select-selected"><span>Tutte le Rarità</span> <i class="fas fa-chevron-down"></i></div>
                <div class="select-items select-hide">
                    <div data-value="All">Tutte le Rarità</div>
                    <div data-value="3"><img src="img/Frm_GachaIcon/Icon_GradeStar.png" style="height: 16px;" alt=""> 3 Stelle</div>
                    <div data-value="2"><img src="img/Frm_GachaIcon/Icon_GradeStar.png" style="height: 16px;" alt=""> 2 Stelle</div>
                    <div data-value="1"><img src="img/Frm_GachaIcon/Icon_GradeStar.png" style="height: 16px;" alt=""> 1 Stella</div>
                </div>
            </div>
        </div>
    </div>

    <!-- RIGA 2: Stile Abilità, Squadra, Stagione -->
    <div class="col-12 col-md-4">
        <div class="filter-group">
            <label>Stile Abilità</label>
            <div class="custom-select" id="filter-style" data-value="">
                <div class="select-selected"><span>Tutti gli Stili</span> <i class="fas fa-chevron-down"></i></div>
                <div class="select-items select-hide">
                    <div data-value="">Tutti gli Stili</div>
                    <div data-value="Striker"><img src="img/TagTitle/Icon_Tag_Ability_Striker.png" alt=""> Striker</div>
                    <div data-value="Playmaker"><img src="img/TagTitle/Icon_Tag_Ability_Playmaker.png" alt=""> Playmaker</div>
                    <div data-value="Stopper"><img src="img/TagTitle/Icon_Tag_Ability_Stopper.png" alt=""> Stopper</div>
                    <div data-value="Keeper"><img src="img/TagTitle/Icon_Tag_Ability_Keeper.png" alt=""> Keeper</div>
                    <div data-value="Buffer"><img src="img/TagTitle/Icon_Tag_Ability_Buffer.png" alt=""> Buffer</div>
                    <div data-value="Defensivehalf"><img src="img/TagTitle/Icon_Tag_Ability_Defensivehalf.png" alt=""> Defensive Half</div>
                    <div data-value="Longshooter"><img src="img/TagTitle/Icon_Tag_Ability_Longshooter.png" alt=""> Long Shooter</div>
                    <div data-value="SecondTop"><img src="img/TagTitle/Icon_Tag_Ability_SecondTop.png" alt=""> Second Top</div>
                    <div data-value="Shootblocker"><img src="img/TagTitle/Icon_Tag_Ability_Shootblocker.png" alt=""> Shoot Blocker</div>
                    <div data-value="SideBack"><img src="img/TagTitle/Icon_Tag_Ability_SideBack.png" alt=""> Side Back</div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="filter-group">
            <label>Squadra</label>
            <div class="custom-select" id="filter-team" data-value="">
                <div class="select-selected"><span>Tutte le Squadre</span> <i class="fas fa-chevron-down"></i></div>
                <div class="select-items select-hide">
                    <div data-value="">Tutte le Squadre</div>
                    <div data-value="RaimonGO"><img src="img/TagTitle/Icon_Tag_Team_RaimonGO.png" alt=""> RaimonGO</div>
                    <div data-value="Raimon"><img src="img/TagTitle/Icon_Tag_Team_Raimon.png" alt=""> Raimon</div>
                    <div data-value="RoyalAcademy"><img src="img/TagTitle/Icon_Tag_Team_RoyalAcademy.png" alt=""> Royal Academy</div>
                    <div data-value="Zeus"><img src="img/TagTitle/Icon_Tag_Team_Zeus.png" alt=""> Zeus</div>
                    <div data-value="Brainwashing"><img src="img/TagTitle/Icon_Tag_Team_Brainwashing.png" alt=""> Brainwashing</div>
                    <div data-value="Kirkwood"><img src="img/TagTitle/Icon_Tag_Team_Kirkwood.png" alt=""> Kirkwood</div>
                    <div data-value="Occult"><img src="img/TagTitle/Icon_Tag_Team_Occult.png" alt=""> Occult</div>
                    <div data-value="Otaku"><img src="img/TagTitle/Icon_Tag_Team_Otaku.png" alt=""> Otaku</div>
                    <div data-value="Shuriken"><img src="img/TagTitle/Icon_Tag_Team_Shuriken.png" alt=""> Shuriken</div>
                    <div data-value="Wild"><img src="img/TagTitle/Icon_Tag_Team_Wild.png" alt=""> Wild</div>
                    <div data-value="InazumaJapan"><img src="img/TagTitle/Icon_Tag_Team_InazumaJapan.png" alt=""> Inazuma Japan</div>
                    <div data-value="InazumaKidsFC"><img src="img/TagTitle/Icon_Tag_Team_InazumaKidsFC.png" alt=""> Inazuma Kids FC</div>
                    <div data-value="JapanNationalTeam2026"><img src="img/TagTitle/Icon_Tag_Team_JapanNationalTeam2026.png" alt=""> Japan 2026</div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="filter-group">
            <label>Stagione</label>
            <div class="custom-select" id="filter-season" data-value="">
                <div class="select-selected"><span>Tutte le Stagioni</span> <i class="fas fa-chevron-down"></i></div>
                <div class="select-items select-hide">
                    <div data-value="">Tutte le Stagioni</div>
                    <div data-value="InaEle1"><img src="img/TagTitle/Icon_Tag_Title_InaEle1.png" alt=""> Inazuma Eleven 1</div>
                    <div data-value="InaEle2"><img src="img/TagTitle/Icon_Tag_Title_InaEle2.png" alt=""> Inazuma Eleven 2</div>
                    <div data-value="InaEle3"><img src="img/TagTitle/Icon_Tag_Title_InaEle3.png" alt=""> Inazuma Eleven 3</div>
                    <div data-value="Cross"><img src="img/TagTitle/Icon_Tag_Title_Cross.png" alt=""> Cross</div>
                    <div data-value="InaEleGO"><img src="img/TagTitle/Icon_Tag_Title_InaEleGO.png" alt=""> GO</div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

class InazumaFilters extends HTMLElement {
    connectedCallback() {
        this.innerHTML = filtersHTML;
    }
}

customElements.define('inazuma-filters', InazumaFilters);