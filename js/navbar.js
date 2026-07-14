// js/navbar.js

const navbarHTML = `
<div class="inazuma-nav-container">
    <div class="inazuma-nav">
        <a href="index.html" class="inazuma-nav-item">Giocatori</a>
        
        <div class="nav-dropdown">
            <button class="dropbtn">Simulatori <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
                <a href="teamBuilder.html"><i class="fas fa-users me-1"></i> Team Builder</a>
                <a href="mode5vs1.html"><i class="fas fa-hand-rock me-1"></i> Simulatore 5vs1</a>
                <a href="simulator.html"><i class="fas fa-bolt me-1"></i> Simulatore Tecniche</a>
            </div>
        </div>

        <div class="nav-dropdown">
            <button class="dropbtn">Info & Utility <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
                <a href="coaches.html"><i class="fas fa-user-tie me-1"></i> Allenatori</a>
                <a href="stats.html"><i class="fas fa-chart-bar me-1"></i> Database Statistiche</a>
                <a href="techniques.html"><i class="fas fa-fire me-1"></i> Database Tecniche</a>
                <a href="passive.html"><i class="fas fa-book-open me-1"></i> Database Passive</a>
                <a href="calendar.html"><i class="fas fa-calendar-alt me-1"></i> Calendario Sfide</a>
            </div>
        </div>

        <a href="collection.html" class="inazuma-nav-item">Collezione</a>
    </div>
</div>
`;

class InazumaNavbar extends HTMLElement {
    connectedCallback() {
        // Inserisce il codice HTML della navbar
        this.innerHTML = navbarHTML;

        // Prende l'ultima parte dell'URL, rimuove parametri (?) e ancore (#)
        let path = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];

        // Rimuove l'estensione .html per far combaciare l'URL di GitHub Pages
        let currentPage = path.replace('.html', '');

        // Fallback: se siamo nella home o stiamo guardando un singolo giocatore, illumina "Giocatori"
        if (currentPage === '' || currentPage === 'index' || currentPage === 'character') {
            currentPage = 'index';
        }

        this.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');

            if (href && href !== '#') {
                // Pulisce anche l'href del link rimuovendo il .html
                let linkPage = href.split('?')[0].split('#')[0].replace('.html', '');

                if (linkPage === currentPage) {
                    // Illumina il link specifico all'interno dei menu
                    link.classList.add('active');

                    // Se il link si trova dentro un menu a tendina, illumina la voce genitore
                    const dropdown = link.closest('.nav-dropdown');
                    if (dropdown) {
                        dropdown.classList.add('active');
                        const dropbtn = dropdown.querySelector('.dropbtn');
                        if (dropbtn) {
                            dropbtn.classList.add('active');
                            // Applica testo bianco pulito come per gli altri pulsanti
                            dropbtn.style.color = '#ffffff';
                            dropbtn.style.textShadow = 'none';
                        }
                    }
                }
            }
        });
    }
}

// Registra il nuovo tag HTML personalizzato
customElements.define('inazuma-navbar', InazumaNavbar);