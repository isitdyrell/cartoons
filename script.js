document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Cartoons.io Loaded', 'color:#2b2263; font-weight:bold');

    // ==================== ART GALLERY ====================
    const nftGrid = document.getElementById('nft-grid');
    if (nftGrid) {
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

        function createMediaElement(item, folder = "1of1") {
            const fullPath = `assets/${folder}/${item.filename}`;
            if (item.filename.toLowerCase().endsWith('.mp4')) {
                return `<video src="${fullPath}" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover; object-position:center; background:#000;"></video>`;
            } else {
                return `<img src="${fullPath}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">`;
            }
        }

        function renderGallery(items, folder = "1of1") {
            nftGrid.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'nft-card';
                card.innerHTML = createMediaElement(item, folder);
                nftGrid.appendChild(card);
            });
        }

        renderGallery(oneOfOnes);

        // Filter buttons for Art page
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.dataset.filter === "1of1") renderGallery(oneOfOnes, "1of1");
                else if (btn.dataset.filter === "curated") {
                    nftGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:80px 20px;font-size:1.2rem;">CURATED coming soon...</p>`;
                } else if (btn.dataset.filter === "favorites") {
                    nftGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:80px 20px;font-size:1.2rem;">FAVORITES coming soon...</p>`;
                }
            });
        });
    }

    // ==================== GAMES PAGE ====================
    const gamesGrid = document.getElementById('games-grid');
    if (gamesGrid) {
                const games = [
            {
                title: "Lucky Stars",
                image: "assets/activations/luckystars.gif",
                tags: ["Daily Spin", ],
                description: "Spin once per day for a chance to win free NFTs, ETH, and exclusive rewards. Only verified Cartoons holders can play.",
                buttons: [
                    { text: "Play Now", link: "luckystars.html" }
                ]
            },
            {
                title: "Franky's Adventures (Cloudy Skin)",
                image: "assets/activations/frankysadventures.gif",
                tags: ["Collab"],
                description: "Play as Cloudy in Franky's Adventures! A fun mobile game collab with the Franky's Diner team.",
                buttons: [
                    { text: "Play on Android", link: "https://play.google.com/store/apps/details?id=com.LonelyLilyStudios.FrankysAdventures&hl=en-US" },
                    { text: "Play on iOS", link: "https://apps.apple.com/ca/app/frankys-adventures/id6478423690" }
                ]
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
                    <div class="game-buttons">
                        ${game.buttons.map(btn => `
                            <a href="${btn.link}" target="_blank" class="play-btn">${btn.text}</a>
                        `).join('')}
                    </div>
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

   // ==================== LUCKY STARS GAME ====================
    const luckyGrid = document.getElementById('game-grid');
    if (luckyGrid) {
        
        const cloudImg = "assets/activations/CLOUD.png";
        const starImg  = "assets/activations/STAR.png";
        const heartImg = "assets/activations/HEART.png";
        const boltImg  = "assets/activations/BOLT.png";

        const allIcons = [
            { src: cloudImg, name: "Cloud" },
            { src: starImg,  name: "Star" },
            { src: heartImg, name: "Heart" },
            { src: boltImg,  name: "Bolt" }
        ];

        let spinsLeft = 0;   // ← Starts at 0 (no spins until connected)

        // ==================== WIN PROBABILITIES ====================
        const winProbabilities = {
            boltRow: 10,      // % chance per row for 3 Bolts
            fullStars: 25,   // % chance for full 9 Stars
        };
        // ========================================================

        function createGrid() {
            luckyGrid.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const tile = document.createElement('div');
                tile.className = 'game-tile';
                const randomIcon = allIcons[Math.floor(Math.random() * allIcons.length)];
                tile.innerHTML = `<img src="${randomIcon.src}" alt="${randomIcon.name}">`;
                luckyGrid.appendChild(tile);
            }
        }

        function clearWinAnimations() {
            const tiles = luckyGrid.querySelectorAll('.game-tile');
            tiles.forEach(tile => {
                tile.classList.remove('winning');
                const img = tile.querySelector('img');
                if (img) img.style.animation = '';
            });
        }

                function spinAnimation() {
            console.log('🎰 Starting slot-machine spin...');
            clearWinAnimations();

            const tiles = Array.from(luckyGrid.querySelectorAll('.game-tile'));
            const rows = [tiles.slice(0, 3), tiles.slice(3, 6), tiles.slice(6, 9)];

            const flipSpeed = 55;
            const stopDelays = [1100, 1700, 2300];

            // Decide if we're going for full stars this spin
            const triggerFullStars = Math.random() * 100 < winProbabilities.fullStars;

            rows.forEach((row, rowIndex) => {
                let flipInterval = setInterval(() => {
                    row.forEach(tile => {
                        const randomIcon = allIcons[Math.floor(Math.random() * allIcons.length)];
                        tile.innerHTML = `<img src="${randomIcon.src}" alt="${randomIcon.name}">`;
                    });
                }, flipSpeed);

                setTimeout(() => {
                    clearInterval(flipInterval);

                    row.forEach(tile => {
                        let finalIcon;

                        if (triggerFullStars) {
                            // Force stars for full board win
                            finalIcon = starImg;
                        } 
                        else if (Math.random() * 100 < winProbabilities.boltRow) {
                            finalIcon = boltImg;
                        } 
                        else {
                            finalIcon = allIcons[Math.floor(Math.random() * allIcons.length)].src;
                        }

                        tile.innerHTML = `<img src="${finalIcon}" alt="">`;
                    });

                    if (rowIndex === 2) {
                        setTimeout(checkWinConditions, 400);
                    }
                }, stopDelays[rowIndex]);
            });
        }

        function checkWinConditions() {
            const tiles = Array.from(luckyGrid.querySelectorAll('.game-tile'));
            const grid = [tiles.slice(0,3), tiles.slice(3,6), tiles.slice(6,9)];

            let boltRows = 0;
            let isFullStars = true;
            let winningTiles = [];

            grid.forEach(row => {
                const srcs = row.map(t => t.querySelector('img').src);
                
                if (srcs.every(s => s.includes('BOLT'))) {
                    boltRows++;
                    winningTiles.push(...row);
                }
                if (!srcs.every(s => s.includes('STAR'))) {
                    isFullStars = false;
                }
            });

            if (isFullStars) winningTiles = tiles;

            const statusEl = document.getElementById('status-text');
            let message = `Spins Left: <span>${spinsLeft}</span>`;

            if (boltRows > 0) {
                spinsLeft += boltRows;
                message = `+${boltRows} FREE SPIN${boltRows > 1 ? 'S' : ''}!`;
            }
            if (isFullStars) {
                message = "🌟 BIG WIN! 🌟";
            }

            if (statusEl) statusEl.innerHTML = message;

            if (winningTiles.length > 0) {
                winningTiles.forEach(tile => {
                    tile.classList.add('winning');
                    const img = tile.querySelector('img');
                    if (img) img.style.animation = 'winCelebration 0.75s ease-in-out infinite alternate';
                });

                setTimeout(() => {
                    winningTiles.forEach(tile => {
                        tile.classList.remove('winning');
                        const img = tile.querySelector('img');
                        if (img) img.style.animation = '';
                    });
                }, 20000);
            }
        }

        // ==================== INITIAL SETUP ====================
        createGrid();

        // Disable SPIN button by default
        const spinBtn = document.getElementById('spin-btn');
        if (spinBtn) {
            spinBtn.disabled = true;
            const statusEl = document.getElementById('status-text');
            if (statusEl) statusEl.innerHTML = `Spins Left: <span>0</span> <span style="color:#aaaaaa">(CONNECT TO PLAY)</span>`;
        }

        // Test button always works (for development)
        const testSpinBtn = document.getElementById('test-spin-btn');
        if (testSpinBtn) {
            testSpinBtn.addEventListener('click', spinAnimation);
        }

        // Real SPIN button (disabled until we add connect logic)
        if (spinBtn) {
            spinBtn.addEventListener('click', () => {
                if (spinBtn.disabled || spinsLeft <= 0) return;

                spinBtn.disabled = true;
                spinBtn.textContent = "SPINNING...";

                spinsLeft--;
                spinAnimation();

                setTimeout(() => {
                    spinBtn.disabled = false;
                    spinBtn.textContent = "SPIN";
                }, 2800);
            });
        }
    }

});