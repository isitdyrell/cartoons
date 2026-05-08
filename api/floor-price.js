export default async function handler(req, res) {
  try {
    // Get current ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Scrape OpenSea page
    const proxy = 'https://api.allorigins.win/raw?url=';
    const url = 'https://opensea.io/collection/cartoonsnft';
    const pageRes = await fetch(proxy + encodeURIComponent(url));
    const html = await pageRes.text();

    // Try to extract floor price
    const ethMatch = html.match(/(\d+\.?\d*)\s*ETH/i);
    let floorEth = 0;

    if (ethMatch && ethMatch[1]) {
      floorEth = parseFloat(ethMatch[1]);
    }

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