export default async function handler(req, res) {
  try {
    // Get current ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Direct scrape using a better proxy
    const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://opensea.io/collection/cartoonsnft'));
    const html = await response.text();

    // Better regex to find floor price
    const match = html.match(/(\d+\.?\d*)\s*ETH/i);
    
    let floorEth = 0;
    if (match && match[1]) {
      floorEth = parseFloat(match[1]);
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