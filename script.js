// ====================== DYNAMIC WALLET CONFIG ======================
const DYNAMIC_ENV_ID = '7aed5475-3b05-400a-a575-b757fca5b134';   // ← Paste your Dynamic Environment ID
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🚀 Cartoons.io loaded with Dynamic Wallet', 'color:#2b2263; font-weight:bold');

    // Load Dynamic SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.dynamic.xyz/sdk/v0.0.0/dynamic.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
        console.log('✅ Dynamic SDK loaded');

        // Initialize Dynamic
        const dynamic = new window.Dynamic({
            environmentId: DYNAMIC_ENV_ID,
            wallets: ['metamask', 'phantom', 'rainbow', 'walletconnect'],
        });

        const loginBtn = document.getElementById('dynamicLoginBtn');

        loginBtn.addEventListener('click', async () => {
            try {
                const result = await dynamic.connect();
                if (result.address) {
                    console.log('✅ Wallet connected:', result.address);
                    loginBtn.innerHTML = `
                        <div style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 12px; border-radius:10px;">
                            <span>👛 ${result.address.slice(0,6)}...${result.address.slice(-4)}</span>
                        </div>
                    `;
                    // TODO: Later we will check if they own a Cartoons NFT here
                }
            } catch (err) {
                console.error('Wallet connect failed', err);
            }
        });
    };

    // ==================== LEGAL MODAL ====================
    const modal = document.getElementById('legalModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');

    if (modal && titleEl && bodyEl && closeBtn) {
        const content = {
            faq: `<p>Q: What is Cartoons NFT? <br>A: ... (your full FAQ)</p>`,
            disclaimer: `<p>Cryptocurrencies... (your disclaimer)</p>`,
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