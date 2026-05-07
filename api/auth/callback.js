export default async function handler(req, res) {
  res.setHeader('Set-Cookie', 'sb-access-token=; Path=/; Max-Age=0'); // clear old cookies
  res.redirect('https://cartoons-orpin.vercel.app');
}