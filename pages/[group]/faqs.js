// File: pages/[group]/faqs.js
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ACCESS_GROUPS } from "../../data/accessGroups";

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({ params: { group: g.key.toLowerCase() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group?.toLowerCase() || "";
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

export default function FAQPage({ group }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-cream py-16 px-4 mx-auto max-w-4xl space-y-12 scroll-py-32">
        <h1 className="text-3xl font-serif text-navy text-center">FAQs</h1>

        {/* Lodging */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Lodging</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">Where are the wedding hotels?</dt>
              <dd>
                We’ve reserved room blocks at Hotel Sayaji, Lemon Tree, and The Grand Bhagwati. Use code <em>WEDDING25</em> when booking, or email the hotel front desk with our wedding name.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Are there Airbnb options?</dt>
              <dd>
                Yes—Vijay Nagar and South Tukoganj neighborhoods have great apartments. We recommend checking Superhost listings near city center for easy access to all events.
              </dd>
            </div>
          </dl>
        </section>

        {/* Getting Around */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Getting Around</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">What’s the best local transport?</dt>
              <dd>
                Auto‐rickshaws (₹50/km) are fun for short hops; for door-to-door convenience, use Ola or Uber app. Always ask for meter fare on autos or agree on a price beforehand.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Can I rent a car or bike?</dt>
              <dd>
                Yes—Bounce scooters and Zoomcar rentals are available. Note that traffic can be hectic; international licenses are required for cars.
              </dd>
            </div>
          </dl>
        </section>

        {/* Food & Dining */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Food & Dining</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">What’s served at the wedding?</dt>
              <dd>
                We’ll have a mix of local Indori favorites (poha, jalebi) alongside North Indian and South Indian buffet stations. Vegetarian, vegan, and gluten-free options are clearly marked.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Where to find local street food?</dt>
              <dd>
                Head to Sarafa Bazaar after dark for mouth-watering treats: bhutte ka kees, mohanthal, and garama garam chai. Bring cash and your appetite!
              </dd>
            </div>
          </dl>
        </section>

        {/* Packing & Dress Code */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Packing & Dress Code</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">What should I wear?</dt>
              <dd>
                Day events are cocktail attire; evening sangeet and reception are traditional Indian dress (lehenga/sherwani welcome!). Comfortable shoes recommended for meerkat‐style dancing.
              </dd>
            </div>
            <div>
              <dt className="font-medium">What about weather?</dt>
              <dd>
                December days are warm (~25°C) with cooler nights (~12°C). Pack a light jacket and layers, plus a compact umbrella just in case.
              </dd>
            </div>
          </dl>
        </section>

        {/* Culture & Customs */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Culture & Customs</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">Can I bring a gift?</dt>
              <dd>
                Your presence is the best gift! If you’d like, traditional monetary gifts in an envelope are customary. Please do not bring extravagantly wrapped presents.
              </dd>
            </div>
            <div>
              <dt className="font-medium">What are the wedding traditions?</dt>
              <dd>
                Expect a baraat procession, vibrant mehndi ceremony, and saat phere (seven vows) under a floral mandap. We’ll explain on-site with a program booklet.
              </dd>
            </div>
          </dl>
        </section>

        {/* Health & Safety */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Health & Safety</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">Pharmacies & Clinics</dt>
              <dd>
                A 24/7 pharmacy is located next to Hotel Sayaji; QuickCare Clinic on AB Road handles walk-ins. Always carry bottled water and hand sanitizer.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Emergency Contacts</dt>
              <dd>
                Hosts: Aastha (📞 +91 98765 43210), Preetesh (📞 +91 91234 56789), Wedding Planner: Sunita (📞 +91 77665 44332).
              </dd>
            </div>
          </dl>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Opt out of global sticky layout
FAQPage.noLayout = true;
