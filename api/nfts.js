export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.opensea.io/api/v1/assets?collection=cartoonsnft&limit=50&order_direction=desc'
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ assets: [] });
  }
}