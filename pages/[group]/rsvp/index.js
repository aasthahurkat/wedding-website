import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { ACCESS_GROUPS } from '../../../data/accessGroups';

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({ params: { group: g.key.toLowerCase() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group?.toLowerCase() || '';
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

function RSVPPage({ group }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    attending: '',
    email: '',
    needsPickup: '',
    arrival: '',
    returnDate: '',
    guest: '',
    whatsappNumber: '',
    outfitHelp: '',
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, group }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || `HTTP ${response.status}: Something went wrong.`);
        return;
      }

      if (form.attending === 'yes') {
        router.push(`/${group}/rsvp/thankyou`);
      } else {
        router.push(`/${group}/rsvp/thankyou-missyou`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Sorry, there was a problem submitting your RSVP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />

      <main className="flex-1 bg-cream pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Heart className="w-8 h-8 text-burgundy mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-serif text-navy mb-4">RSVP</h1>
            <p className="text-navy/70">
              Please let us know if you&apos;ll be joining us for our special day
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral/10 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block mb-2 font-medium text-navy">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-neutral/30 rounded-lg py-3 px-4 focus:outline-none focus:border-burgundy transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Attendance Question */}
              <div>
                <label className="block mb-3 font-medium text-navy">
                  Will you be able to join us?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'yes', label: 'Yes, I&apos;ll be there!' },
                    { value: 'no', label: 'Sorry, I can&apos;t make it' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                        form.attending === opt.value
                          ? 'border-burgundy bg-burgundy/5 text-burgundy'
                          : 'border-neutral/20 hover:border-neutral/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={opt.value}
                        checked={form.attending === opt.value}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <span className="font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Conditional fields for "yes" responses */}
              {form.attending === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 pt-4 border-t border-neutral/10"
                >
                  {/* Email */}
                  <div>
                    <label className="block mb-2 font-medium text-navy">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-neutral/30 rounded-lg py-3 px-4 focus:outline-none focus:border-burgundy transition-colors"
                      placeholder="your.email@example.com"
                      required={form.attending === 'yes'}
                    />
                  </div>

                  {/* Transportation */}
                  <div>
                    <label className="block mb-3 font-medium text-navy">
                      Do you need pickup and drop-off from airport or railway station?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['yes', 'no'].map((opt) => (
                        <label
                          key={opt}
                          className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                            form.needsPickup === opt
                              ? 'border-navy bg-navy/5 text-navy'
                              : 'border-neutral/20 hover:border-neutral/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="needsPickup"
                            value={opt}
                            checked={form.needsPickup === opt}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <span className="font-medium capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Travel Dates */}
                  {form.needsPickup === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="bg-neutral/5 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-navy mb-4">Travel Dates</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-navy">
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            name="arrival"
                            value={form.arrival}
                            onChange={handleChange}
                            className="w-full border border-neutral/30 rounded-lg py-2 px-3 focus:outline-none focus:border-burgundy transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-navy">
                            Return Date
                          </label>
                          <input
                            type="date"
                            name="returnDate"
                            value={form.returnDate}
                            onChange={handleChange}
                            className="w-full border border-neutral/30 rounded-lg py-2 px-3 focus:outline-none focus:border-burgundy transition-colors"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Guest Question */}
                  <div>
                    <label className="block mb-3 font-medium text-navy">
                      Will you be bringing a guest?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['yes', 'no'].map((opt) => (
                        <label
                          key={opt}
                          className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                            form.guest === opt
                              ? 'border-burgundy bg-burgundy/5 text-burgundy'
                              : 'border-neutral/20 hover:border-neutral/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="guest"
                            value={opt}
                            checked={form.guest === opt}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <span className="font-medium capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block mb-2 font-medium text-navy">
                      WhatsApp Contact Number
                    </label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={form.whatsappNumber}
                      onChange={handleChange}
                      className="w-full border border-neutral/30 rounded-lg py-3 px-4 focus:outline-none focus:border-burgundy transition-colors"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  {/* Outfit Help */}
                  <div>
                    <label className="block mb-3 font-medium text-navy">
                      Need help with outfit choices?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['yes', 'no'].map((opt) => (
                        <label
                          key={opt}
                          className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                            form.outfitHelp === opt
                              ? 'border-navy bg-navy/5 text-navy'
                              : 'border-neutral/20 hover:border-neutral/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="outfitHelp"
                            value={opt}
                            checked={form.outfitHelp === opt}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <span className="font-medium capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-burgundy text-white font-semibold py-3 px-6 rounded-lg hover:bg-burgundy/90 transition-colors"
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <div className="text-center mt-6">
            <p className="text-navy/60 text-sm">We can&apos;t wait to celebrate with you! 💕</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RSVPPage;
RSVPPage.noLayout = true;
