export default async function handler(req, res) {
  // Simple redirect back to home - Supabase will handle the rest from the URL
  res.redirect('https://cartoons-orpin.vercel.app');
}