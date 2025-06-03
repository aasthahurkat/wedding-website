import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ACCESS_GROUPS } from "../../../data/accessGroups";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { supabase } from "../../../lib/supabaseClient";

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({
      params: { group: g.key.toLowerCase() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group ? params.group.toLowerCase() : "";

  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }

  return {
    props: { group },
  };
}

function RSVPPage({ group }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    attending: "",
    needsPickup: "",
    arrival: "",
    returnDate: "",
    guest: "",
    outfitHelp: "",
    whatsappNumber: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!group) {
      console.error("Group is undefined!");
      return;
    }

    if (form.attending === "yes" && !form.email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const { data, error } = await supabase.from("rsvps").insert([
        {
          name: form.name,
          email: form.attending === "yes" ? form.email : null,
          attending: form.attending,
          needs_pickup: form.needsPickup || null,
          arrival: form.arrival || null,
          return_date: form.returnDate || null,
          guest: form.guest || null,
          outfit_help: form.outfitHelp || null,
          whatsapp_number: form.whatsappNumber || null,
          group: group,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert(
          "Sorry, there was a problem submitting your RSVP. Please try again."
        );
        return;
      }

      if (form.attending === "yes") {
        router.push(`/${group}/rsvp/thankyou`);
      } else {
        router.push(`/${group}/rsvp/thankyou-missyou`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Sorry, there was a problem submitting your RSVP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />

      <motion.div
        className="flex-grow bg-gradient-to-b from-ivory to-white py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="flex justify-center">
          <div className="w-full max-w-lg mx-auto p-4">
            <h2 className="text-3xl font-serif text-center text-navy mb-6 border-b border-gray-200 pb-2">
              RSVP
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block mb-2 font-medium text-navy">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                  required
                />
              </div>

              {/* Will you attend? */}
              <div>
                <label className="block mb-2 font-medium text-navy">
                  Will you attend?
                </label>
                <div className="flex space-x-6">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="attending"
                        value={opt}
                        checked={form.attending === opt}
                        onChange={handleChange}
                        className="form-radio text-saffron"
                        required
                      />
                      <span className="capitalize text-navy">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Email — only if attending is yes */}
              {form.attending === "yes" && (
                <div>
                  <label className="block mb-2 font-medium text-navy">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                    required
                  />
                </div>
              )}

              {/* Pickup required? */}
              {form.attending === "yes" && (
                <div>
                  <label className="block mb-2 font-medium text-navy">
                    Do you require pickup and drop-off from airport or railway station?
                  </label>
                  <div className="flex space-x-6">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="needsPickup"
                          value={opt}
                          checked={form.needsPickup === opt}
                          onChange={handleChange}
                          className="form-radio text-saffron"
                          required
                        />
                        <span className="capitalize text-navy">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Arrival & Return Dates */}
              {form.attending === "yes" && form.needsPickup === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-1 font-medium text-navy">
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      name="arrival"
                      value={form.arrival}
                      onChange={handleChange}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-navy">
                      Return Date
                    </label>
                    <input
                      type="date"
                      name="returnDate"
                      value={form.returnDate}
                      onChange={handleChange}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Bringing a guest */}
              {form.attending === "yes" && (
                <div>
                  <label className="block mb-2 font-medium text-navy">
                    Bringing a guest?
                  </label>
                  <div className="flex space-x-6">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="guest"
                          value={opt}
                          checked={form.guest === opt}
                          onChange={handleChange}
                          className="form-radio text-saffron"
                          required
                        />
                        <span className="capitalize text-navy">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp Contact Number */}
              {form.attending === "yes" && (
                <div>
                  <label className="block mb-2 font-medium text-navy">
                    WhatsApp Contact Number
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                    required
                  />
                </div>
              )}

              {/* Outfit Help */}
              {form.attending === "yes" && (
                <div>
                  <label className="block mb-2 font-medium text-navy">
                    Need help with outfits?
                  </label>
                  <div className="flex space-x-6">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="outfitHelp"
                          value={opt}
                          checked={form.outfitHelp === opt}
                          onChange={handleChange}
                          className="form-radio text-saffron"
                          required
                        />
                        <span className="capitalize text-navy">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

        {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full mt-6 py-3 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4c430] cursor-pointer text-center text-white"
                  style={{ backgroundColor: "#f4c430" }}
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          </div>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
}

RSVPPage.noLayout = true;
export default RSVPPage;
