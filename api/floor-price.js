export default async function handler(req, res) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

  console.log('OPENSEA_API_KEY present?', !!OPENSEA_API_KEY);

  if (!OPENSEA_API_KEY) {
    console.error('Missing OpenSea API Key in Vercel Environment Variables');
    return res.json({ floorEth: '—', floorUsd: '—' });
  }

  try {
    const response = await fetch('https://api.opensea.io/api/v2/collection/cartoonsnft/stats', {
      headers: {
        'X-API-KEY': OPENSEA_API_KEY,
        'Accept': 'application/json'
      }
    });

    console.log('OpenSea API status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenSea error:', errorText);
      throw new Error(`OpenSea returned ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenSea data received:', data);

    const floorEth = data.stats?.floor_price || 0;
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    const floorUsd = Math.round(floorEth * ethUsd);

    res.json({
      floorEth: floorEth.toFixed(4),
      floorUsd: floorUsd
    });

  } catch (err) {
    console.error('Full error:', err);
    res.json({ floorEth: '—', floorUsd: '—' });
  }
}