// ====================== SUPABASE CONFIG ======================
const SUPABASE_URL = 'https://rcuxlkyqnwouobitojso.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';   // ← YOUR REAL ANON KEY HERE
// ============================================================

let supabaseClient = null;

function initSupabase() {
    if (!supabaseClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🚀 Cartoons.io loaded', 'color:#2b2263; font-weight:bold');

    const supabase = initSupabase();

    // Try to get session
    const { data: { session } } = await supabase.auth.getSession();
    updateLoginUI(session);

    supabase.auth.onAuthStateChange((event, session) => {
        console.log('🔄 Auth event:', event);
        updateLoginUI(session);
    });

    // ==================== LOGIN BUTTON ====================
    const loginBtn = document.getElementById('dynamicLoginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                await supabase.auth.signOut();
            } else {
                await supabase.auth.signInWithOAuth({
                    provider: 'discord',
                    options: {
                        redirectTo: 'https://cartoons-orpin.vercel.app/api/auth/callback'
                    }
                });
            }
        });
    }

    // ==================== LEGAL MODAL ====================
    const modal = document.getElementById('legalModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');

    if (modal && titleEl && bodyEl && closeBtn) {
        const content = {
            faq: `<p>Q: What is Cartoons NFT? <br>A: Cartoons NFT is a collection of 7,777 cosmic-themed cartoon NFTs on Ethereum...</p>`,
            disclaimer: `<p>Cryptocurrencies, NFTs, and blockchain-based assets are highly speculative and volatile. Always do your own research (DYOR).</p>`,
            terms: `<h4>Terms of Use</h4><p>Full terms coming soon!</p>`,
            privacy: `<h4>Privacy Policy</h4><p>We respect your data. Full policy coming soon!</p>`
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
                console.error('Floor price failed:', err);
                floorItem.textContent = 'Floor: —';
            }
        }
        updateFloorPrice();
        setInterval(updateFloorPrice, 300000);
    }
});

// ==================== UPDATE LOGIN UI ====================
function updateLoginUI(session) {
    const loginBtn = document.getElementById('dynamicLoginBtn');
    if (!loginBtn) return;

    if (session?.user) {
        const metadata = session.user.user_metadata || {};
        const name = metadata.full_name || metadata.global_name || metadata.name || 'User';
        let avatar = metadata.avatar_url;

        if (!avatar && metadata.id && metadata.avatar) {
            avatar = `https://cdn.discordapp.com/avatars/${metadata.id}/${metadata.avatar}.png`;
        }

        loginBtn.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 12px; border-radius:10px;">
                <img src="${avatar}" style="width:28px;height:28px;border-radius:50%;border:2px solid #2b2263;" onerror="this.src='https://via.placeholder.com/28?text=👤'">
                <span>${name}</span>
            </div>
        `;
        console.log(`✅ Logged in as ${name}`);
    } else {
        loginBtn.textContent = 'login';
    }
}