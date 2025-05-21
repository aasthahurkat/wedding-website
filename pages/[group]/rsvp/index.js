import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ACCESS_GROUPS } from "../../../data/accessGroups";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

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
    attending: "",
    arrival: "",
    returnDate: "",
    guest: "",
    outfitHelp: "",
    whatsappNumber: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!group) {
      console.error("Group is undefined!");
      return;
    }

    const normalizedGroup = group.toLowerCase();
    if (form.attending === "yes") {
      router.push(`/${normalizedGroup}/rsvp/thankyou`);
    } else {
      router.push(`/${normalizedGroup}/rsvp/thankyou-missyou`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar currentGroup={group} />

      {/* Main content grows to fill available space */}
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

              {/* Arrival & Return Dates */}
              {form.attending === "yes" && (
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

      {/* Footer stays at bottom thanks to flex layout */}
      <Footer />
    </div>
  );
}

// mark to skip your global layout wrapper
RSVPPage.noLayout = true;

export default RSVPPage;
