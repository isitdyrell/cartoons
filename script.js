// ====================== DYNAMIC CONFIG ======================
const DYNAMIC_ENV_ID = '7aed5475-3b05-400a-a575-b757fca5b134';   // ← Replace with your actual Environment ID
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Cartoons.io with Dynamic Wallet', 'color:#2b2263; font-weight:bold');

    // Load Dynamic SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.dynamic.xyz/sdk/v2/dynamic.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
        console.log('✅ Dynamic SDK loaded');

        const loginBtn = document.getElementById('dynamicLoginBtn');

        // Initialize Dynamic Widget
        const dynamicWidget = new window.Dynamic({
            environmentId: DYNAMIC_ENV_ID,
            walletConnectors: ['metamask', 'phantom', 'rainbow', 'walletconnect'],
        });

        loginBtn.addEventListener('click', async () => {
            try {
                const result = await dynamicWidget.connect();
                console.log('✅ Wallet connected:', result);

                if (result.address) {
                    loginBtn.innerHTML = `
                        <div style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 12px; border-radius:10px;">
                            👛 ${result.address.slice(0,6)}...${result.address.slice(-4)}
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Dynamic connect failed:', error);
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
        floorItem.textContent = 'Floor: Loading...';
        // Your existing floor price logic here if you want
    }
});