export default async function handler(req, res) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

  if (!OPENSEA_API_KEY) {
    return res.json({ floorEth: '—', floorUsd: '—' });
  }

  try {
    // Get collection stats from OpenSea API
    const response = await fetch('https://api.opensea.io/api/v2/collection/cartoonsnft/stats', {
      headers: {
        'X-API-KEY': OPENSEA_API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('OpenSea API error');
    }

    const data = await response.json();
    const floorEth = data.stats?.floor_price || 0;

    // Get current ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    const floorUsd = Math.round(floorEth * ethUsd);

    res.json({
      floorEth: floorEth.toFixed(4),
      floorUsd: floorUsd
    });

  } catch (err) {
    console.error('Floor price API error:', err);
    res.json({
      floorEth: '—',
      floorUsd: '—'
    });
  }
}