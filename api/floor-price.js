export default async function handler(req, res) {
  try {
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    const proxy = 'https://api.allorigins.win/raw?url=';
    const url = 'https://opensea.io/collection/cartoonsnft';
    const pageRes = await fetch(proxy + encodeURIComponent(url));
    const html = await pageRes.text();

    // Multiple attempts to find the floor price
    let floorEth = 0;

    const patterns = [
      /0\.003[0-9]/,                    // Current known range
      /(\d+\.\d{3,4})\s*ETH/i,          // Standard ETH format
      /"floor_price":\s*(\d+\.?\d*)/i,
      /Floor price.*?>(\d+\.?\d*)/i
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        floorEth = parseFloat(match[1] || match[0]);
        break;
      }
    }

    const floorUsd = Math.round(floorEth * ethUsd);

    res.json({
      floorEth: floorEth.toFixed(4),
      floorUsd: floorUsd || 0
    });

  } catch (err) {
    console.error(err);
    res.json({ floorEth: '—', floorUsd: '—' });
  }
}