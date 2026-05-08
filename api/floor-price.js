export default async function handler(req, res) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

  if (!OPENSEA_API_KEY) {
    return res.status(500).json({ error: 'OpenSea API key not configured' });
  }

  try {
    // Get collection stats from OpenSea
    const statsRes = await fetch('https://api.opensea.io/api/v2/collection/cartoonsnft/stats', {
      headers: {
        'X-API-KEY': OPENSEA_API_KEY,
      }
    });

    const stats = await statsRes.json();

    const floorEth = stats.stats?.floor_price || 0;

    // Get current ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    const floorUsd = Math.round(floorEth * ethUsd);

    res.status(200).json({
      floorEth: floorEth.toFixed(4),
      floorUsd: floorUsd
    });

  } catch (err) {
    console.error(err);
    res.status(200).json({
      floorEth: '—',
      floorUsd: '—'
    });
  }
}