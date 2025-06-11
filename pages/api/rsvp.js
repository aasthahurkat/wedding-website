import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Function to send notification
// Notification system removed for clean launch

export default async function handler(req, res) {
  // Log request method for debugging
  console.log('Request method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log the received data for debugging
    console.log('Received request body:', req.body);

    const {
      name,
      attending,
      needsPickup,
      arrival,
      returnDate,
      guest,
      whatsappNumber,
      group,
      email,
      message,
    } = req.body;

    if (!name || !attending || !group) {
      return res.status(400).json({ error: 'Missing required fields', missing: { name: !name, attending: !attending, group: !group } });
    }

    // For "no" responses, only require name, attending, and group
    if (attending === 'yes' && !email) {
      return res.status(400).json({ error: 'Email is required for attendees' });
    }

    // Build record based on attendance status
    const rsvpRecord = {
      name,
      attending,
      group,
      created_at: new Date(),
    };

    if (attending === 'yes') {
      // For "yes" responses - email and whatsapp_number are required
      rsvpRecord.email = email;
      rsvpRecord.whatsapp_number = whatsappNumber;
      rsvpRecord.needs_pickup = needsPickup || 'no';
      rsvpRecord.arrival = needsPickup === 'yes' ? arrival : null;
      rsvpRecord.return_date = needsPickup === 'yes' ? returnDate : null;
      rsvpRecord.guest = guest || 'no';
      rsvpRecord.message = message || '';
    } else {
      // For "no" responses - use safe defaults for NOT NULL columns
      rsvpRecord.email = '';
      rsvpRecord.whatsapp_number = ''; // Empty string for NOT NULL constraint
      rsvpRecord.needs_pickup = 'no';
      rsvpRecord.arrival = null;
      rsvpRecord.return_date = null;
      rsvpRecord.guest = 'no';
      rsvpRecord.message = '';
    }

    // Log the record we're about to insert
    console.log('Attempting to insert record:', rsvpRecord);

    const { error } = await supabase.from('rsvps').insert([rsvpRecord]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    // Notification system removed for simplicity

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Database error',
      details: error.message,
      code: error.code 
    });
  }
}
