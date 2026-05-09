document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Art Page Loaded', 'color:#2b2263; font-weight:bold');

    // ==================== NFT GALLERY DATA ====================
    const nftData = [
        { id: 1, name: "Cartoons #1", image: "https://openseauserdata.com/files/...1.png", traits: ["1of1"] },
        { id: 2, name: "Cartoons #42", image: "https://openseauserdata.com/files/...42.png", traits: ["bat"] },
        // Add more tokens here (I'll help you expand this list)
        // For now, we'll use placeholders. You can replace with real OpenSea image URLs.
    ];

    const grid = document.getElementById('nft-grid');
    const modal = document.getElementById('nft-modal') || createModal();

    function createModal() {
        const m = document.createElement('div');
        m.id = 'nft-modal';
        m.style.cssText = `
            display:none; position:fixed; top:0; left:0; width:100%; height:100%;
            background:rgba(0,0,0,0.9); z-index:2000; align-items:center; justify-content:center;
        `;
        m.innerHTML = `
            <div style="background:white; max-width:800px; width:90%; border-radius:15px; overflow:hidden; position:relative;">
                <button id="modal-close" style="position:absolute; top:15px; right:15px; font-size:28px; background:none; border:none; cursor:pointer; z-index:10;">×</button>
                <img id="modal-image" style="width:100%; display:block;">
                <div style="padding:20px;">
                    <h3 id="modal-name" style="margin:0 0 10px 0;"></h3>
                    <a id="modal-opensea" href="#" target="_blank" style="color:#2b2263; text-decoration:underline;">View on OpenSea →</a>
                    <button id="modal-download" style="margin-left:15px; padding:8px 16px; background:#2b2263; color:white; border:none; border-radius:8px; cursor:pointer;">Download Image</button>
                </div>
            </div>
        `;
        document.body.appendChild(m);
        return m;
    }

    // Render gallery
    function renderGallery(filteredData) {
        grid.innerHTML = '';
        filteredData.forEach(token => {
            const card = document.createElement('div');
            card.className = 'nft-card';
            card.innerHTML = `<img src="${token.image}" alt="${token.name}">`;
            card.onclick = () => openModal(token);
            grid.appendChild(card);
        });
    }

    function openModal(token) {
        document.getElementById('modal-image').src = token.image;
        document.getElementById('modal-name').textContent = token.name;
        document.getElementById('modal-opensea').href = `https://opensea.io/assets/ethereum/0x.../${token.id}`; // Update contract address
        document.getElementById('nft-modal').style.display = 'flex';

        document.getElementById('modal-download').onclick = () => {
            const a = document.createElement('a');
            a.href = token.image;
            a.download = `${token.name}.png`;
            a.click();
        };
    }

    // Close modal
    document.addEventListener('click', e => {
        if (e.target.id === 'modal-close' || e.target.id === 'nft-modal') {
            document.getElementById('nft-modal').style.display = 'none';
        }
    });

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let filtered = nftData;

            if (filter === '1of1') filtered = nftData.filter(t => t.traits.includes('1of1'));
            if (filter === 'bat') filtered = nftData.filter(t => t.traits.includes('bat'));

            renderGallery(filtered);
        });
    });

    // Initial render
    renderGallery(nftData);

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