document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Art Page Loaded', 'color:#2b2263; font-weight:bold');

    // ==================== NFT GALLERY ====================
    const grid = document.getElementById('nft-grid');
    
    if (!grid) {
        console.error("NFT Grid not found! Check if #nft-grid exists in HTML.");
        return;
    }

    // Fetch real NFTs from OpenSea
    async function loadNfts() {
        try {
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; padding: 60px 20px;">Loading 50 random Cartoons NFTs...</p>';

            const response = await fetch('https://api.opensea.io/api/v2/collection/cartoonsnft/nfts?limit=50');
            const data = await response.json();

            const nfts = data.nfts || [];

            if (nfts.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center;">No NFTs loaded. Try refreshing.</p>';
                return;
            }

            renderGallery(nfts);

        } catch (err) {
            console.error(err);
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; color:red;">Failed to load NFTs from OpenSea.</p>';
        }
    }

    function renderGallery(nfts) {
        grid.innerHTML = '';
        nfts.forEach(nft => {
            const card = document.createElement('div');
            card.className = 'nft-card';
            card.innerHTML = `
                <img src="${nft.image_url || 'https://via.placeholder.com/300x300/2b2263/ffffff?text=No+Image'}" 
                     alt="${nft.name || 'Cartoons NFT'}">
            `;
            card.onclick = () => openNftModal(nft);
            grid.appendChild(card);
        });
    }

    function openNftModal(nft) {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:2000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div style="background:white; max-width:720px; width:90%; border-radius:16px; overflow:hidden; position:relative;">
                <button onclick="this.closest('.nft-modal').remove()" style="position:absolute; top:15px; right:15px; font-size:32px; background:none; border:none; cursor:pointer; z-index:10; color:#2b2263;">×</button>
                <img src="${nft.image_url}" style="width:100%; display:block;" alt="${nft.name}">
                <div style="padding:25px;">
                    <h3 style="margin:0 0 12px 0;">${nft.name || 'Cartoons NFT'}</h3>
                    <a href="${nft.opensea_url || 'https://opensea.io/collection/cartoonsnft'}" 
                       target="_blank" 
                       style="color:#2b2263; text-decoration:underline;">View on OpenSea →</a>
                    <button onclick="downloadImage('${nft.image_url}', '${nft.name}')" 
                            style="margin-left:15px; padding:10px 20px; background:#2b2263; color:white; border:none; border-radius:8px; cursor:pointer;">
                        Download Image
                    </button>
                </div>
            </div>
        `;
        modal.className = 'nft-modal';
        document.body.appendChild(modal);
    }

    window.downloadImage = (url, name) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = name ? `${name}.png` : 'cartoons-nft.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Load the gallery
    loadNfts();

    // Filter buttons (basic for now)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // TODO: Add real trait filtering later
        });
    });

    // ==================== LEGAL MODAL ====================
    const modal = document.getElementById('legalModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');

    if (modal && titleEl && bodyEl && closeBtn) {
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
                    modal.classList.add('open');
                }
            });
        });

        closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('open');
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