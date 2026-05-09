export default async function handler(req, res) {
  try {
    // Get current ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Get OpenSea page
    const proxy = 'https://api.allorigins.win/raw?url=';
    const url = 'https://opensea.io/collection/cartoonsnft';
    const pageRes = await fetch(proxy + encodeURIComponent(url));
    const html = await pageRes.text();

    // Multiple patterns to catch current floor price (0.0035 ETH etc.)
    let floorEth = 0;
    const patterns = [
      /0\.00[0-9]{2,4}/,                    // Matches 0.0035 style
      /(\d+\.\d{3,5})\s*ETH/i,              // Standard ETH format
      /"floor_price":\s*(\d+\.?\d*)/i,
      /floor price.*?(\d+\.?\d*)/i
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const value = match[1] || match[0];
        floorEth = parseFloat(value);
        if (floorEth > 0) break;
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