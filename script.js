// ====================== WALLET CONNECT (Multi-Wallet Support) ======================
let currentAddress = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Cartoons.io loaded', 'color:#2b2263; font-weight:bold');

    const loginBtn = document.getElementById('dynamicLoginBtn');

    // Always start fresh
    currentAddress = null;
    loginBtn.textContent = 'login';

    loginBtn.addEventListener('click', async (e) => {
        if (currentAddress) {
            e.preventDefault();
            toggleDropdown();
            return;
        }

        try {
            let accounts;

            // Try Phantom first (Solana)
            if (window.solana && window.solana.isPhantom) {
                const resp = await window.solana.connect();
                currentAddress = resp.publicKey.toString();
                console.log('✅ Phantom connected:', currentAddress);
            } 
            // Then try MetaMask / other EVM wallets
            else if (window.ethereum) {
                await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                currentAddress = accounts[0];
                console.log('✅ MetaMask/EVM connected:', currentAddress);
            } 
            else {
                alert("Please install MetaMask or Phantom wallet!");
                return;
            }

            loginBtn.innerHTML = `0x${currentAddress.slice(2,6)}...${currentAddress.slice(-4)}`;

        } catch (error) {
            console.error(error);
            alert("Failed to connect wallet. Please try again.");
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
            e.stopImmediatePropagation();
            logoutWallet();
        });

        setTimeout(() => {
            document.addEventListener('click', function handler(ev) {
                if (!loginBtn.contains(ev.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', handler);
                }
            });
        }, 10);
    }

    function logoutWallet() {
        currentAddress = null;
        loginBtn.textContent = 'login';
        loginBtn.style.position = '';
        document.querySelectorAll('.wallet-dropdown').forEach(d => d.remove());
        console.log('✅ Wallet fully logged out');
    }

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