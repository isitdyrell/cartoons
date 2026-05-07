// ====================== SUPABASE CONFIG ======================
const SUPABASE_URL = 'https://rcuxlkyqnwouobitojso.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';   // ← YOUR REAL ANON KEY HERE
// ============================================================

let supabaseClient = null;

function initSupabase() {
    if (!supabaseClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: { detectSessionInUrl: true, persistSession: true }
        });
    }
    return supabaseClient;
}

// Stronger manual session recovery from URL hash
async function recoverSessionFromHash() {
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token')) return null;

    console.log('🔑 OAuth token found in URL – attempting manual recovery...');
    const supabase = initSupabase();

    try {
        // Extract tokens from hash
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
            const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
            });

            if (error) console.error('setSession error:', error);
            if (data.session) {
                console.log('✅ Session manually set successfully!');
                // Clean the URL
                window.history.replaceState({}, document.title, window.location.pathname);
                return data.session;
            }
        }
    } catch (e) {
        console.error('Manual recovery failed:', e);
    }
    return null;
}

// ==================== MAIN INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🚀 Cartoons.io script loaded', 'color:#2b2263; font-weight:bold');

    const supabase = initSupabase();

    // Try to recover session from hash first
    let session = await recoverSessionFromHash();

    // Fallback
    if (!session) {
        const { data } = await supabase.auth.getSession();
        session = data.session;
    }

    updateLoginUI(session);

    supabase.auth.onAuthStateChange((event, session) => {
        console.log('🔄 Auth event:', event);
        updateLoginUI(session);
    });

    // Login button
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
                    options: { redirectTo: window.location.origin + window.location.pathname }
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
            faq: `<p>Q: What is Cartoons NFT? ... (your full FAQ)</p>`,
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

    // ==================== FLOOR PRICE (fixed CORS) ====================
    const floorItem = document.getElementById('floorPriceItem');
    if (floorItem) {
        async function updateFloorPrice() {
            try {
                floorItem.textContent = 'Floor: Loading...';
                const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                const ethData = await ethRes.json();
                const ethUsd = ethData.ethereum?.usd || 3400;

                // Use a more reliable proxy or direct (for now fallback)
                floorItem.textContent = `Floor: Check OpenSea ($${ethUsd})`;
                console.log('Floor price updated (simplified)');
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
        const discordName = metadata.full_name || metadata.global_name || metadata.name || 'dyrell';
        let avatarUrl = metadata.avatar_url || metadata.picture;

        if (!avatarUrl && metadata.id && metadata.avatar) {
            avatarUrl = `https://cdn.discordapp.com/avatars/${metadata.id}/${metadata.avatar}.png`;
        }

        loginBtn.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 12px; border-radius:10px;">
                <img src="${avatarUrl}" 
                     style="width:28px; height:28px; border-radius:50%; border:2px solid #2b2263;" 
                     onerror="this.src='https://via.placeholder.com/28?text=👤'">
                <span>${discordName}</span>
            </div>
        `;

        console.log(`✅ Logged in as ${discordName}`);
    } else {
        loginBtn.textContent = 'login';
        console.log('👤 Not logged in - storage still blocked');
    }
}