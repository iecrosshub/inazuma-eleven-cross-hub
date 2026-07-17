// js/Components/navbar.js

const navbarHTML = `
<div class="inazuma-nav-container">
    <div class="inazuma-nav">
        <a href="index.html" class="inazuma-nav-item">Giocatori</a>
        
        <!-- Aggiunto ID per il Tutorial -->
        <div class="nav-dropdown" id="tour-simulators">
            <button class="dropbtn">Simulatori <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
                <a href="teamBuilder.html"><i class="fas fa-users me-1"></i> Team Builder</a>
                <a href="mode5vs1.html"><i class="fas fa-hand-rock me-1"></i> Simulatore 5vs1</a>
                <a href="simulator.html"><i class="fas fa-bolt me-1"></i> Simulatore Tecniche</a>
            </div>
        </div>

        <!-- Aggiunto ID per il Tutorial -->
        <div class="nav-dropdown" id="tour-info">
            <button class="dropbtn">Info & Utility <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
                <a href="meta5vs1.html"><i class="fas fa-crown me-1"></i> Meta Formazioni 5vs1</a>
                <a href="calendar.html"><i class="fas fa-calendar-alt me-1"></i> Calendario Sfide</a>
                <a href="stats.html"><i class="fas fa-chart-bar me-1"></i> Database Statistiche</a>
                <a href="passive.html"><i class="fas fa-book-open me-1"></i> Database Passive</a>
                <a href="techniques.html"><i class="fas fa-fire me-1"></i> Database Tecniche</a>
                <a href="coaches.html"><i class="fas fa-user-tie me-1"></i> Allenatori</a>
            </div>
        </div>

        <!-- Aggiunto ID per il Tutorial -->
        <a href="collection.html" class="inazuma-nav-item" id="tour-collection">Collezione</a>
    </div>
</div>
`;

class InazumaNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = navbarHTML;

        let path = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
        let currentPage = path.replace('.html', '');
        if (currentPage === '' || currentPage === 'index' || currentPage === 'character') currentPage = 'index';

        this.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                let linkPage = href.split('?')[0].split('#')[0].replace('.html', '');
                if (linkPage === currentPage) {
                    link.classList.add('active');
                    const dropdown = link.closest('.nav-dropdown');
                    if (dropdown) {
                        dropdown.classList.add('active');
                        const dropbtn = dropdown.querySelector('.dropbtn');
                        if (dropbtn) {
                            dropbtn.classList.add('active');
                            dropbtn.style.color = '#ffffff';
                            dropbtn.style.textShadow = 'none';
                        }
                    }
                }
            }
        });
    }
}
customElements.define('inazuma-navbar', InazumaNavbar);