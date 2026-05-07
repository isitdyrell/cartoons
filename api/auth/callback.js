export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.redirect('https://cartoons-orpin.vercel.app');
  }

  // Redirect back with code so Supabase can process it server-side friendly
  return res.redirect(`https://cartoons-orpin.vercel.app?code=${code}`);
}