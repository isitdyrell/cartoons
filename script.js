// ====================== WALLET CONNECT (Clean & Secure) ======================
let currentAddress = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Cartoons.io loaded', 'color:#2b2263; font-weight:bold');

    const loginBtn = document.getElementById('dynamicLoginBtn');

    // Always start with clean state
    currentAddress = null;
    loginBtn.textContent = 'login';

    loginBtn.addEventListener('click', async (e) => {
        if (currentAddress) {
            e.preventDefault();
            toggleDropdown();
            return;
        }

        try {
            if (!window.ethereum) {
                alert("Please install MetaMask or Phantom (Ethereum)!");
                return;
            }

            // Fresh handshake every time user clicks "login"
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }]
            });

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAddress = accounts[0];

            console.log('✅ Wallet connected:', currentAddress);

            loginBtn.innerHTML = `0x${currentAddress.slice(2,6)}...${currentAddress.slice(-4)}`;

        } catch (error) {
            console.error(error);
            alert("Connection cancelled or failed.");
        }
    });

    function toggleDropdown() {
        document.querySelectorAll('.wallet-dropdown').forEach(d => d.remove());

        const dropdown = document.createElement('div');
        dropdown.className = 'wallet-dropdown';
        dropdown.innerHTML = `
            <a href="#" class="dropdown-item">Profile</a>
            <a href="#" id="logout-btn" class="dropdown-item">Logout</a>
        `;

        loginBtn.style.position = 'relative';
        loginBtn.appendChild(dropdown);

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            logoutWallet();
        });
    }

    function logoutWallet() {
        currentAddress = null;
        loginBtn.textContent = 'login';
        loginBtn.style.position = '';
        document.querySelectorAll('.wallet-dropdown').forEach(d => d.remove());
        console.log('✅ Wallet logged out');
    }

    // ==================== LEGAL MODAL + FLOOR PRICE ====================
    // (your existing code - unchanged)
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