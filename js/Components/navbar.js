const navbarHTML = `
<div class="inazuma-nav-container">
    <div class="inazuma-nav">
        <a href="index.html" class="inazuma-nav-item">Giocatori</a>
        
        <div class="nav-dropdown" id="tour-simulators">
            <button class="dropbtn">Simulatori <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
                <a href="teamBuilder.html"><i class="fas fa-users me-1"></i> Team Builder</a>
                <a href="mode5vs1.html"><i class="fas fa-hand-rock me-1"></i> Simulatore 5vs1</a>
                <a href="simulator.html"><i class="fas fa-bolt me-1"></i> Simulatore Tecniche</a>
            </div>
        </div>

        <div class="nav-dropdown" id="tour-info">
            <button class="dropbtn">Info & Utility <i class="fas fa-caret-down"></i></button>
            <div class="dropdown-content">
                <a href="meta5vs1.html"><i class="fas fa-crown me-1"></i> Meta Formazioni 5vs1</a>
                <a href="calendar.html"><i class="fas fa-calendar-alt me-1"></i> Calendario Sfide</a>
                <a href="stats.html"><i class="fas fa-chart-bar me-1"></i> Database Statistiche</a>
                <a href="passive.html"><i class="fas fa-book-open me-1"></i> Database Passive</a>
                <a href="techniques.html"><i class="fas fa-fire me-1"></i> Database Tecniche</a>
                <a href="coaches.html"><i class="fas fa-user-tie me-1"></i> Database Allenatori</a>
            </div>
        </div>

        <a href="community.html" class="inazuma-nav-item" id="nav-community-link" style="display: flex; align-items: center; gap: 6px;">
            Community
            <span id="community-badge" style="color: #FF3B30; font-size: 1rem; display: none; text-shadow: none;">
                <i class="fas fa-circle"></i>
            </span>
        </a>

        <a href="collection.html" class="inazuma-nav-item" id="tour-collection">Collezione</a>
        
        <a href="#" class="inazuma-nav-item" id="btn-profile-settings" style="display: none;">
            <i class="fas fa-user-circle me-1"></i> Profilo
        </a>
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
            if (href && href !== '#' && !link.id.includes('btn-profile-settings')) {
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

        // 2. Controllo vero delle notifiche Community
        const communityBadge = this.querySelector('#community-badge');

        const checkNewPosts = async () => {
            if (window.firebaseDb && currentPage !== 'community') {
                try {
                    const { collection, query, orderBy, limit, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");
                    const postsRef = collection(window.firebaseDb, "community_posts");
                    const q = query(postsRef, orderBy("createdAt", "desc"), limit(1));
                    const snapshot = await getDocs(q);

                    if (!snapshot.empty) {
                        const latestPost = snapshot.docs[0].data();
                        const latestTime = latestPost.createdAt ? latestPost.createdAt.toMillis() : 0;
                        const lastVisit = parseInt(localStorage.getItem('last_community_visit') || '0');

                        // Se c'è un post più recente dell'ultima visita, mostra il pallino
                        if (latestTime > lastVisit) {
                            communityBadge.style.display = 'inline-block';
                        }
                    }
                } catch(e) { console.error("Errore notifica:", e); }
            }
        };

        const fbInterval = setInterval(() => {
            if(window.firebaseDb) {
                clearInterval(fbInterval);
                checkNewPosts();
            }
        }, 1000);

        // 3. Gestione Profilo
        const profileBtn = this.querySelector('#btn-profile-settings');
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-profile-settings'));
            });

            const checkFirebaseInterval = setInterval(() => {
                if (window.firebaseOnAuth && window.firebaseAuth) {
                    clearInterval(checkFirebaseInterval);
                    window.firebaseOnAuth(window.firebaseAuth, (user) => {
                        if (user) profileBtn.style.display = 'inline-block';
                        else profileBtn.style.display = 'none';
                    });
                }
            }, 200);
        }
    }
}

if (!customElements.get('inazuma-navbar')) {
    customElements.define('inazuma-navbar', InazumaNavbar);
}