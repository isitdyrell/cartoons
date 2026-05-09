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

    // Improved regex to catch current OpenSea floor price format
    let floorEth = 0;
    const floorMatch = html.match(/(\d+\.?\d*)\s*ETH/i);

    if (floorMatch && floorMatch[1]) {
      floorEth = parseFloat(floorMatch[1]);
    }

    const floorUsd = Math.round(floorEth * ethUsd);

    res.json({
      floorEth: floorEth.toFixed(4),
      floorUsd: floorUsd
    });

  } catch (err) {
    console.error(err);
    res.json({
      floorEth: '—',
      floorUsd: '—'
    });
  }
}