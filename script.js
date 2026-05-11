document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Art Page Loaded', 'color:#2b2263; font-weight:bold');

    const grid = document.getElementById('nft-grid');
    if (!grid) return;

    // ==================== 1/1s ====================
    const oneOfOnes = [
        { name: "Cartoon 7721", filename: "DrGrinspoon.png", type: "image" },
        { name: "Cartoon 4052", filename: "VERONICA.jpg", type: "image" },
        { name: "Cartoon 1999", filename: "WILDXVIKING.jpg", type: "image" },
        { name: "Cartoon 4007", filename: "JLEMA.jpg", type: "image" },
        { name: "Cartoon 5984", filename: "DAN.jpg", type: "image" },
        { name: "Cartoon 3616", filename: "PAPA.jpg", type: "image" },
        { name: "Cartoon 3233", filename: "COSO.mp4", type: "video" },
        { name: "Cartoon 7463", filename: "corai.jpg", type: "image" },
        { name: "Cartoon 7444", filename: "franky.gif", type: "image" },
        { name: "Cartoon 6893", filename: "0fish0.jpg", type: "image" },
        { name: "Cartoon 2045", filename: "petio.gif", type: "image" },
        { name: "Cartoon 4399", filename: "Arbo.png", type: "image" },
        { name: "Cartoon 4875", filename: "Agirlhasnoname.jpg", type: "image" },
        { name: "Cartoon 3279", filename: "FabQuilp.jpg", type: "image" },
        { name: "Cartoon 3666", filename: "Serge.png", type: "image" },
        { name: "Cartoon 1255", filename: "CAB.png", type: "image" },
        { name: "Cartoon 1130", filename: "m a s.png", type: "image" },
        { name: "Cartoon 1409", filename: "Ryhead.png", type: "image" },
        { name: "Cartoon 55453", filename: "james mendenhall.gif", type: "image" },
        { name: "Cartoon 5180", filename: "iwwon.png", type: "image" },
        { name: "Cartoon 1671", filename: "Darhk.png", type: "image" },
        { name: "Cartoon 7770", filename: "MoM.jpg", type: "image" },
        { name: "Cartoon 4613", filename: "DUMPSTERAPE.png", type: "image" },
        { name: "Cartoon 4101", filename: "GIO.png", type: "image" },
        { name: "Cartoon 6735", filename: "TENEBRINI.png", type: "image" },
        { name: "Cartoon 5039", filename: "dznts.png", type: "image" },
        { name: "Cartoon 6744", filename: "monkeytown.png", type: "image" },
        { name: "Cartoon 3459", filename: "FALY.png", type: "image" },
        { name: "Cartoon 769", filename: "dyrell.gif", type: "image" },
        { name: "Cartoon 3835", filename: "SQUATCHY.jpg", type: "image" },
        { name: "Cartoon 1450", filename: "mechsicko.png", type: "image" },
        { name: "Cartoon 2280", filename: "propaganda.png", type: "image" },
        { name: "Cartoon 7749", filename: "missi.jpg", type: "image" },
        { name: "Cartoon 4794", filename: "alexmdc.jpg", type: "image" },
        { name: "Cartoon 2354", filename: "PICASSO.jpg", type: "image" },
        { name: "Cartoon 111", filename: "Anna.jpg", type: "image" },
        { name: "Cartoon 6286", filename: "CAPS.jpg", type: "image" },
        { name: "Cartoon 2597", filename: "Deadformatmc.png", type: "image" },
    ];

    // ==================== CURATED (Coming Soon) ====================
    const curated = []; // Add items here later in the same format

    // ==================== FAVORITES (Coming Soon) ====================
    const favorites = [
        { name: "Cartoon 7141", filename: "Cartoon 7141.jpg", type: "image" },
    ]; // Add items here later in the same format    

                function createMediaElement(item, folder = "1of1") {
        const fullPath = `assets/${folder}/${item.filename}`;
        
        if (item.filename.toLowerCase().endsWith('.mp4')) {
            return `
                <video 
                    src="${fullPath}" 
                    autoplay 
                    loop 
                    muted 
                    playsinline 
                    style="width:100%; height:100%; object-fit:cover; object-position:center; background:#000;">
                </video>`;
        } else {
            return `<img src="${fullPath}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">`;
        }
    }

    function renderGallery(items, folder = "1of1") {
        grid.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'nft-card';
            card.innerHTML = createMediaElement(item, folder);
            grid.appendChild(card);
        });
    }

    function openModal(item) {
        const fullPath = `assets/1of1/${item.filename}`;
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:2000; display:flex; align-items:center; justify-content:center;`;
        
        modal.innerHTML = `
            <div style="background:white; max-width:800px; width:90%; border-radius:16px; overflow:hidden; position:relative;">
                <button onclick="this.closest('div[style*=\"position:fixed\"]').remove()" style="position:absolute;top:15px;right:15px;font-size:32px;background:none;border:none;cursor:pointer;color:#2b2263;z-index:10;">×</button>
                
                ${item.filename.toLowerCase().endsWith('.mp4') ? 
    `<video src="${fullPath}" autoplay loop muted controls style="width:100%; display:block; background:#000;"></video>` : 
    `<img src="${fullPath}" style="width:100%; display:block;" alt="${item.name}">`}
                
                <div style="padding:25px;">
                    <h3 style="margin:0 0 15px 0;">${item.name}</h3>
                    <a href="#" target="_blank" style="color:#2b2263; text-decoration:underline;">View on OpenSea →</a>
                    <button onclick="downloadFile('${fullPath}', '${item.name}')" 
                            style="margin-left:15px; padding:10px 20px; background:#2b2263; color:white; border:none; border-radius:8px; cursor:pointer;">
                        Download
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.downloadFile = (url, name) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };

    // Default to 1/1s
    renderGallery(oneOfOnes);

                // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.filter === "1of1") {
                renderGallery(oneOfOnes, "1of1");
            } 
            else if (btn.dataset.filter === "curated") {
                if (curated.length > 0) {
                    renderGallery(curated, "curated");
                } else {
                    grid.innerHTML = `<p style="grid-column: 1 / -1; text-align:center; padding: 80px 20px; font-size:1.2rem;">CURATED coming soon...</p>`;
                }
            } 
            else if (btn.dataset.filter === "favorites") {
                if (favorites.length > 0) {
                    renderGallery(favorites, "favorites");   // ← looks in assets/favorites/
                } else {
                    grid.innerHTML = `<p style="grid-column: 1 / -1; text-align:center; padding: 80px 20px; font-size:1.2rem;">FAVORITES coming soon...</p>`;
                }
            }
        });
    });

// ==================== GAMES PAGE ====================
    const gamesGrid = document.getElementById('games-grid');
    if (gamesGrid) {
        const games = [
            {
                title: "Lucky Slots",
                image: "assets/games/lucky-slots.jpg",   // replace with real image later
                tags: ["Holders Only", "Daily Spin"],
                description: "Spin once per day for a chance to win free NFTs, ETH, and exclusive rewards. Only verified Cartoons holders can play.",
                buttonText: "Play Now",
                buttonLink: "luckyspin.html"
            },
            {
                title: "Franky's Diner",
                image: "assets/games/frankys-diner.jpg",   // replace with real image later
                tags: ["Collab", "Mobile"],
                description: "Play as a Cartoons Cloudy skin in Franky's Adventure! A fun mobile game collab with the Franky's Diner team.",
                buttonText: "Play Now",
                buttonLink: "https://frankysdiner.com"
            }
        ];

        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-card-content">
                    <div class="game-tags">
                        ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                    <a href="${game.buttonLink}" class="play-btn">${game.buttonText}</a>
                </div>
            `;
            gamesGrid.appendChild(card);
        });
    }

    // ==================== LEGAL MODAL ====================
    const legalModal = document.getElementById('legalModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');

    if (legalModal && titleEl && bodyEl && closeBtn) {
        const content = {
            faq: `<p>Q: What is Cartoons NFT? <br>A: ... (your full FAQ)</p>`,
            disclaimer: `<p>Cryptocurrencies, NFTs... (your disclaimer)</p>`,
            terms: `<h4>Terms of Use</h4><p>Full terms coming soon!</p>`,
            privacy: `<h4>Privacy Policy</h4><p>We respect your data...</p>`
        };

        document.querySelectorAll('.legal-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const type = link.getAttribute('data-type');
                if (type && content[type]) {
                    titleEl.textContent = link.textContent.trim();
                    bodyEl.innerHTML = content[type];
                    legalModal.classList.add('open');
                }
            });
        });

        closeBtn.addEventListener('click', () => legalModal.classList.remove('open'));
        legalModal.addEventListener('click', e => {
            if (e.target === legalModal) legalModal.classList.remove('open');
        });
    }

    // ==================== FLOOR PRICE ====================
    const floorItem = document.getElementById('floorPriceItem');
    if (floorItem) {
        async function updateFloorPrice() {
            try {
                floorItem.textContent = 'Floor: Loading...';
                const response = await fetch('/api/floor-price');
                const data = await response.json();

                if (data.floorEth && data.floorEth !== '—') {
                    floorItem.textContent = `Floor: ${data.floorEth} ETH ($${data.floorUsd})`;
                } else {
                    floorItem.textContent = 'Floor: —';
                }
            } catch (err) {
                console.error('Floor price error:', err);
                floorItem.textContent = 'Floor: —';
            }
        }
        updateFloorPrice();
        setInterval(updateFloorPrice, 300000);
    }
});