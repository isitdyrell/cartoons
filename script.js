// ====================== SUPABASE CONFIG ======================
const SUPABASE_URL = 'https://rcuxlkyqnwouobitojso.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';   // ← PASTE YOUR REAL ANON KEY HERE
// ============================================================

let supabaseClient = null;

function initSupabase() {
    if (!supabaseClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🚀 Cartoons.io loaded on Vercel', 'color:#2b2263; font-weight:bold');

    const supabase = initSupabase();

    // Check current session
    const { data: { session } } = await supabase.auth.getSession();
    updateLoginUI(session);

    // Listen for login/logout
    supabase.auth.onAuthStateChange((event, session) => {
        updateLoginUI(session);
    });

    // Login Button
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
                        redirectTo: 'https://cartoons-orpin.vercel.app'
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
            faq: `<p>Q: What is Cartoons NFT?<br>A: ... (your full text)</p>`,
            disclaimer: `<p>Cryptocurrencies, NFTs... (your disclaimer)</p>`,
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
        floorItem.textContent = 'Floor: Loading...';
    }
});

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
        console.log('👤 Not logged in');
    }
}