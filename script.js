// ====================== WALLET CONNECT (Clean Session + Fresh Handshake) ======================
let currentAddress = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Cartoons.io loaded', 'color:#2b2263; font-weight:bold');

    const loginBtn = document.getElementById('dynamicLoginBtn');

    // Load from sessionStorage (persists during active tab use)
    const saved = sessionStorage.getItem('connectedWallet');
    if (saved) {
        currentAddress = saved;
        loginBtn.innerHTML = `0x${currentAddress.slice(2,6)}...${currentAddress.slice(-4)}`;
    } else {
        loginBtn.textContent = 'login';
    }

    loginBtn.addEventListener('click', async (e) => {
        if (currentAddress) {
            e.preventDefault();
            toggleDropdown();
            return;
        }

        // Always force a fresh handshake when clicking login
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask or Phantom (Ethereum)!");
                return;
            }

            // Force permission prompt
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }]
            });

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAddress = accounts[0];

            // Save to sessionStorage (clears when tab is closed)
            sessionStorage.setItem('connectedWallet', currentAddress);

            loginBtn.innerHTML = `0x${currentAddress.slice(2,6)}...${currentAddress.slice(-4)}`;

        } catch (error) {
            console.error(error);
            alert("Failed to connect wallet.");
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
        sessionStorage.removeItem('connectedWallet');
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

        // ==================== FLOOR PRICE (using OpenSea API) ====================
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
                console.error(err);
                floorItem.textContent = 'Floor: —';
            }
        }

        updateFloorPrice();
        setInterval(updateFloorPrice, 300000); // every 5 minutes
    }
});