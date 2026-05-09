document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Art Page Loaded', 'color:#2b2263; font-weight:bold');

    // ==================== NFT GALLERY ====================
    const grid = document.getElementById('nft-grid');
    
    if (!grid) {
        console.error("NFT Grid not found! Check if #nft-grid exists in HTML.");
        return;
    }

    // Sample data (placeholders for now)
    const nftData = [
    { id: 1, name: "Cartoons #1", image: "https://picsum.photos/id/1015/300/300", traits: [] },
    { id: 2, name: "Cartoons #42", image: "https://picsum.photos/id/237/300/300", traits: ["1of1"] },
    { id: 3, name: "Cartoons #777", image: "https://picsum.photos/id/180/300/300", traits: ["bat"] },
    { id: 4, name: "Cartoons #1234", image: "https://picsum.photos/id/201/300/300", traits: [] },
    { id: 5, name: "Cartoons #5555", image: "https://picsum.photos/id/251/300/300", traits: ["1of1"] }
];

    function renderGallery(data) {
        grid.innerHTML = '';
        data.forEach(token => {
            const card = document.createElement('div');
            card.className = 'nft-card';
            card.innerHTML = `<img src="${token.image}" alt="${token.name}">`;
            card.onclick = () => alert(`Clicked ${token.name} — modal coming soon`);
            grid.appendChild(card);
        });
    }

    // Initial render
    renderGallery(nftData);

    // Filter buttons
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

    console.log('✅ Gallery should now be visible with 5 placeholder cards');

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