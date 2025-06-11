// Legacy API endpoint - forwards to new Supabase-based API
// This maintains backwards compatibility for any existing code

const supabaseHandler = require('./supabase.js').default;

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Forward to the Supabase handler directly instead of redirecting
    return supabaseHandler(req, res);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 