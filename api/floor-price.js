export default async function handler(req, res) {
  try {
    // Get ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Try the v1 endpoint
    const statsRes = await fetch('https://api.opensea.io/api/v1/collection/cartoonsnft/stats');
    const statsData = await statsRes.json();

    let floorEth = 0;

    if (statsData.stats && statsData.stats.floor_price) {
      floorEth = statsData.stats.floor_price;
    }

    const floorUsd = Math.round(floorEth * ethUsd);

    res.json({
      floorEth: floorEth.toFixed(4),
      floorUsd: floorUsd
    });

  } catch (err) {
    console.error('Floor price error:', err);
    res.json({
      floorEth: '—',
      floorUsd: '—'
    });
  }
}