// ====================== WALLET CONNECT (ethers.js) ======================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Cartoons.io - Wallet Connect Ready', 'color:#2b2263; font-weight:bold');

    let currentAddress = null;

    const loginBtn = document.getElementById('dynamicLoginBtn');

    loginBtn.addEventListener('click', async () => {
        if (currentAddress) {
            // Logout
            currentAddress = null;
            loginBtn.textContent = 'login';
            return;
        }

        try {
            if (!window.ethereum) {
                alert("Please install MetaMask, Phantom, or another wallet!");
                return;
            }

            // Request connection
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAddress = accounts[0];

            console.log('✅ Wallet connected:', currentAddress);

            loginBtn.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 12px; border-radius:10px;">
                    👛 ${currentAddress.slice(0,6)}...${currentAddress.slice(-4)}
                </div>
            `;

            // Future: Check NFT ownership here

        } catch (error) {
            console.error(error);
            alert("Failed to connect wallet. Please try again.");
        }
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
                const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                const ethData = await ethRes.json();
                const ethUsd = ethData.ethereum?.usd || 3400;
                floorItem.textContent = `Floor: Check OpenSea ($${ethUsd})`;
            } catch (err) {
                floorItem.textContent = 'Floor: —';
            }
        }
        updateFloorPrice();
        setInterval(updateFloorPrice, 300000);
    }
});