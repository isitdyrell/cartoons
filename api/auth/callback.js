export default function handler(req, res) {
  // This handles the Discord callback and redirects back to home
  res.redirect('https://cartoons-orpin.vercel.app');
}