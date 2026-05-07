// get-floor.js
require('dotenv').config();

const OPENSEA_KEY = process.env.OPENSEA_API_KEY;

console.log('Your OpenSea API Key:', OPENSEA_KEY ? 'Loaded successfully' : 'Not found');

if (!OPENSEA_KEY) {
  console.log('Add OPENSEA_API_KEY=sk_live_... to your .env file');
}