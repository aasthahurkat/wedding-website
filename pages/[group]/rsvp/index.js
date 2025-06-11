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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    attending: '',
    email: '',
    needsPickup: '',
    arrival: '',
    returnDate: '',
    guest: '',
    countryCode: '+91',
    mobileNumber: '',
    outfitHelp: '',
    message: '',
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...form,
        group,
        whatsappNumber: `${form.countryCode} ${form.mobileNumber}`.trim(),
      };
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({})); // Gracefully handle non-JSON responses
        alert(data.message || `HTTP ${response.status}: Something went wrong. The server returned an unexpected response.`);
        return;
      }
      
      const data = await response.json();

      if (form.attending === 'yes') {
        router.push(`/${group}/rsvp/thankyou`);
      } else {
        router.push(`/${group}/rsvp/thankyou-missyou`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Sorry, there was a problem submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
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
              Please let us know if you'll be joining us for our special day
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
                    { value: 'yes', label: "Yes, I'll be there!" },
                    { value: 'no', label: "Sorry, I can't make it" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`p-4 sm:p-3 min-h-[48px] border-2 rounded-lg cursor-pointer text-center transition-all duration-200 flex justify-center items-center hover:scale-105 hover:shadow-md ${
                        form.attending === opt.value
                          ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-md'
                          : 'border-neutral/20 hover:border-burgundy/30 hover:bg-burgundy/5'
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
                      <span className="font-medium text-sm sm:text-base">{opt.label}</span>
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
                          className={`p-4 sm:p-3 min-h-[48px] border rounded-lg cursor-pointer text-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                            form.needsPickup === opt
                              ? 'border-navy bg-navy/5 text-navy shadow-md'
                              : 'border-neutral/20 hover:border-navy/30 hover:bg-navy/5'
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
                          className={`p-4 sm:p-3 min-h-[48px] border rounded-lg cursor-pointer text-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                            form.guest === opt
                              ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-md'
                              : 'border-neutral/20 hover:border-burgundy/30 hover:bg-burgundy/5'
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
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="countryCode"
                        value={form.countryCode}
                        onChange={handleChange}
                        className="w-24 border border-neutral/30 rounded-lg py-3 px-4 focus:outline-none focus:border-burgundy transition-colors"
                        placeholder="+91"
                        title="Country code (e.g. +91 for India, +1 for USA)"
                        required={form.attending === 'yes'}
                      />
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={form.mobileNumber}
                        onChange={handleChange}
                        className="flex-1 border border-neutral/30 rounded-lg py-3 px-4 focus:outline-none focus:border-burgundy transition-colors"
                        placeholder="Mobile number without country code"
                        required={form.attending === 'yes'}
                      />
                    </div>
                    <p className="mt-1 text-sm text-navy/60">
                      Include country code with + (e.g. +91 for India, +1 for USA)
                    </p>
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
                          className={`p-4 sm:p-3 min-h-[48px] border rounded-lg cursor-pointer text-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                            form.outfitHelp === opt
                              ? 'border-navy bg-navy/5 text-navy shadow-md'
                              : 'border-neutral/20 hover:border-navy/30 hover:bg-navy/5'
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

                  {/* Message Field */}
                  <div>
                    <label className="block mb-2 font-medium text-navy">
                      Anything else you'd like to let us know?
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full border border-neutral/30 rounded-lg py-3 px-4 focus:outline-none focus:border-burgundy transition-colors"
                      placeholder="e.g. food allergies, travel details, or just a sweet message!"
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-burgundy text-white font-semibold py-4 px-6 rounded-lg hover:bg-burgundy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[48px] relative"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit RSVP'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <div className="text-center mt-6">
            <p className="text-navy/60 text-sm">We can't wait to celebrate with you! 💕</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RSVPPage;
RSVPPage.noLayout = true;
