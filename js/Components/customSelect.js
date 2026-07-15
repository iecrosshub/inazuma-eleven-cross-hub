// js/Components/customSelect.js

export function initCustomSelect(customSelectEl, onChangeCallback = null) {
    const selectedDiv = customSelectEl.querySelector('.select-selected');
    const itemsDiv = customSelectEl.querySelector('.select-items');
    if (!selectedDiv || !itemsDiv) return;

    // Cloniamo l'elemento per distruggere vecchi EventListener ed evitare doppi click
    const newSelected = selectedDiv.cloneNode(true);
    selectedDiv.parentNode.replaceChild(newSelected, selectedDiv);

    newSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.select-items').forEach(el => {
            if (el !== itemsDiv) el.classList.add('select-hide');
        });
        itemsDiv.classList.toggle('select-hide');
    });

    itemsDiv.querySelectorAll('div').forEach(option => {
        option.addEventListener('click', () => {
            const oldVal = customSelectEl.dataset.value;
            const newVal = option.dataset.value;

            customSelectEl.dataset.value = newVal;

            const span = newSelected.querySelector('span');
            if (span) {
                span.innerHTML = option.innerHTML;
            } else {
                newSelected.innerHTML = option.innerHTML;
            }

            itemsDiv.classList.add('select-hide');

            if (oldVal !== newVal) {
                if (onChangeCallback) onChangeCallback(newVal);
                // Lancia anche l'evento nativo per i controller che usano addEventListener('change')
                customSelectEl.dispatchEvent(new Event('change'));
            }
        });
    });
}

// Chiude tutte le tendine se clicchi fuori
export function setupGlobalSelectClose() {
    if (!window.customSelectGlobalListenerAdded) {
        document.addEventListener('click', () => {
            document.querySelectorAll('.select-items').forEach(el => el.classList.add('select-hide'));
        });
        window.customSelectGlobalListenerAdded = true;
    }
}