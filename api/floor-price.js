export default async function handler(req, res) {
  try {
    // Get ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Scrape the actual OpenSea page
    const proxy = 'https://api.allorigins.win/raw?url=';
    const url = 'https://opensea.io/collection/cartoonsnft';
    const pageRes = await fetch(proxy + encodeURIComponent(url));
    const html = await pageRes.text();

    // Look for the floor price in the HTML (0.0035 ETH etc.)
    let floorEth = 0;
    const match = html.match(/0\.00[0-9]{2,4}/) || html.match(/(\d+\.\d{3,5})\s*ETH/i);

    if (match) {
      floorEth = parseFloat(match[0]);
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