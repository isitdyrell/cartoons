export default async function handler(req, res) {
  try {
    // Get ETH price
    const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethRes.json();
    const ethUsd = ethData.ethereum?.usd || 3400;

    // Get NFT floor price from CoinGecko (more reliable for many collections)
    const nftRes = await fetch('https://api.coingecko.com/api/v3/nfts/cartoonsnft');
    const nftData = await nftRes.json();

    let floorEth = 0;
    if (nftData && nftData.floor_price) {
      floorEth = nftData.floor_price;
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