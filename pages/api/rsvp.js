import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    attending,
    needsPickup,
    arrival,
    returnDate,
    guest,
    outfitHelp,
    whatsappNumber,
    message,
    group,
    email,              // added email here
  } = req.body;

  if (!name || !attending || !group || !email) {    // require email too
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase.from("rsvps").insert([
      {
        name,
        attending,
        needs_pickup: needsPickup || null,
        arrival_date: arrival || null,
        return_date: returnDate || null,
        guest,
        outfit_help: outfitHelp || null,
        whatsapp_number: whatsappNumber || null,
        message: message || null,
        group,
        email,                // insert email here
        created_at: new Date(),
      },
    ]);

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}
