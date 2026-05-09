export default async function handler(req, res) {
  try {
    // Get current ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Scrape OpenSea
    const proxy = 'https://api.allorigins.win/raw?url=';
    const url = 'https://opensea.io/collection/cartoonsnft';
    const pageRes = await fetch(proxy + encodeURIComponent(url));
    const html = await pageRes.text();

    // Multiple regex attempts to catch floor price
    let floorEth = 0;
    const patterns = [
      /(\d+\.?\d*)\s*ETH/i,
      /"floor_price":\s*(\d+\.?\d*)/i,
      /floor price.*?(\d+\.?\d*)/i
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        floorEth = parseFloat(match[1]);
        break;
      }
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