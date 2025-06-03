// File: pages/[group]/faqs.js
import React, { useState } from "react";
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

// Single FAQ Item component
function FAQItem({ question, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-300 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-4 flex justify-between items-center font-semibold text-navy hover:text-burgundy"
        aria-expanded={isOpen}
      >
        {question}
        <span className={`transform transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
          ▶
        </span>
      </button>
      {isOpen && <div className="pb-4 text-gray-700">{children}</div>}
    </div>
  );
}

export default function FAQPage({ group }) {
  const [openIndex, setOpenIndex] = useState(0); // Open first item by default
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-cream pt-24 px-4 mx-auto max-w-4xl scroll-py-32">
        <h1 className="text-3xl font-serif text-navy text-center mb-6">FAQs</h1>
        <div className="border-l-2 border-burgundy pl-6 space-y-8">
<p className="text-black/80 mt-1"> Here you'll find answers to the questions we get asked the most about the event and RSVP. If your question isn’t here, just reach out — we’re always happy to help!</p>

          {/* RSVP and Invitations */}
          <section>
            <h2 className="text-xl font-semibold text-black">RSVP & Invitations</h2>
            <FAQItem
              question="Do I need to RSVP?"
              isOpen={openIndex === 0}
              onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}>
              It’s not mandatory, but it will make it so much easier for us to get a headcount and sort out the logistics and accommodations, so if you could RSVP by <strong>OCTOBER 15</strong> on our RSVP page, we’d really appreciate it!
            </FAQItem>
          </section>

          {/* Lodging */}
          <section>
            <h2 className="text-xl font-semibold text-black">Lodging</h2>
            <FAQItem
              question="Where can I stay for the wedding dates?"
              isOpen={openIndex === 1}
              onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
            >
              Our wedding venue has rooms reserved for family, and we’ve blocked off a nearby property just for our friends. We’ll cover your stay on the nights of December 23 & 24, and there’ll be shuttle service running between the two—so just unpack and relax!
            </FAQItem>
            <FAQItem
              question="What if I’m arriving early or sticking around later—any recs?"
              isOpen={openIndex === 2}
              onToggle={() => setOpenIndex(openIndex === 2 ? null : 2)}
            >
              If you need extra nights, our go-to spots are Hotel ShreeMaya or LemonTree, or you can hunt down a cozy Superhost Airbnb in Vijay Nagar or South Tukoganj.
            </FAQItem>
          </section>

          {/* Event Timeline & Venues */}
          <section>
            <h2 className="text-xl font-semibold text-black">Event Timeline & Venues</h2>
            <FAQItem
              question="Where and when is each ceremony?"
              isOpen={openIndex === 3}
              onToggle={() => setOpenIndex(openIndex === 3 ? null : 3)}
            >
              Except for our December 22nd events, all wedding ceremonies take place at{" "}
              <a
                href="https://www.google.com/maps/place/Shri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust/@22.6420739,75.8978692,17z/data=!4m17!1m10!3m9!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!2sShri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust!8m2!3d22.64203!4d75.8978915!10e5!14m1!1BCgIYEw!16s%2Fg%2F11h3l5csyj!3m5!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!8m2!3d22.64203!4d75.8978915!16s%2Fg%2F11h3l5csyj?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-burgundy hover:underline"
              >
                Shri Anandam, Maheshwari Jankalyan Trust
              </a>
              . For exact dates and times, check out our Events page.
            </FAQItem>
          </section>

          {/* Packing & Dress Code */}
          <section>
            <h2 className="text-xl font-semibold text-black">Packing & Dress Code</h2>
            <FAQItem
              question="What should I wear to each event?"
              isOpen={openIndex === 4}
              onToggle={() => setOpenIndex(openIndex === 4 ? null : 4)}
            >
              We’ll have a wardrobe planner live soon on our Outfits page—definitely check that for inspo. You don’t have to stick to any theme unless you want to; any lovely Indian outfit you feel great in will work. And if you need a hand picking or tailoring, there’s a spot in the RSVP form to let us know—we can suggest stores and even coordinate quick alterations and delivery so you look and feel your best.
            </FAQItem>
            <FAQItem
              question="What's the weather like in December?"
              isOpen={openIndex === 5}
              onToggle={() => setOpenIndex(openIndex === 5 ? null : 5)}
            >
              December in Indore is pretty mild—daytime highs hover around 25 °C (77 °F), while nights dip to about 12 °C (54 °F). Layers are your best friend: a light jacket or shawl for after dark, and maybe a compact umbrella in case of surprise drizzles—though we’re all hoping the clouds sit this one out!🤞
            </FAQItem>
          </section>

          {/* Gift Registry & Gifting */}
          <section>
            <h2 className="text-xl font-semibold text-black">Gifts & Registry</h2>
            <FAQItem
              question="Do you have a gift registry?"
              isOpen={openIndex === 6}
              onToggle={() => setOpenIndex(openIndex === 6 ? null : 6)}
            >
              We’ll be adding a Registry page to our website soon—feel free to browse once it’s live, but honestly, having you there in person is the best gift we could ask for!
            </FAQItem>
            <FAQItem
              question="Where should I send gifts?"
              isOpen={openIndex === 7}
              onToggle={() => setOpenIndex(openIndex === 7 ? null : 7)}
            >
              <p>Your presence at our wedding is truly the greatest gift we could ask for!</p>
              <p>
                If you’d like to send something extra, we’d love to have it delivered to our Seattle apartment (just drop us a line for the address) or to our parents’ homes in Indore:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
                <div>
                  <strong>Aastha Hurkat</strong>
                  <br />
                  c/o Ramniwas Hurkat
                  <br />
                  132 Hilink City
                  <br />
                  Chhota Bangarda Road, Indore 452005
                </div>
                <div>
                  <strong>Preetesh Patodi</strong>
                  <br />
                  c/o Neetesh Patodi
                  <br />
                  111 Ramchandra Nagar
                  <br />
                  Airport Road, Indore 452005
                </div>
              </div>

              <p className="mt-4">
                Of course, if you’d rather bring it by hand at the celebration, that’s wonderful too—deliveries just help us keep everything organized!
              </p>
            </FAQItem>
          </section>
        </div>
      </main>
      <div className="h-12" />
      <Footer />
    </div>
  );
}

FAQPage.noLayout = true;
