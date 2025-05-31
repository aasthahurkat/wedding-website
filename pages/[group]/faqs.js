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
      <main className="flex-1 bg-cream pt-24 px-4 mx-auto max-w-4xl space-y-12 scroll-py-32">
        <h1 className="text-3xl font-serif text-navy text-center">FAQs</h1>


       {/* RSVP and Invitations */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">RSVP & Invitations</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium font-bold">Do I need to RSVP?</dt>
              <dd>
               It’s not mandatory, but it will make it so much easier for us to get a headcount and sort out the logistics and accommodations — so if you could RSVP by <strong>October 15 </strong> on our RSVP page, we’d really appreciate it!
              </dd>
            </div>
          </dl>
        </section>
        {/* Lodging */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Lodging</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">Where can I stay for the wedding dates?</dt>
              <dd>
               Our wedding venue has rooms reserved for family, and we’ve blocked off a nearby property just for our friends. We’ll cover your stay on the nights of December 23 & 24, and there’ll be shuttle service running between the two—so just unpack and relax!
              </dd>
            </div>
            <div>
              <dt className="font-medium"> What if I’m arriving early or sticking around later—any recs?</dt>
              <dd>
                If you need extra nights, our go-to spots are Hotel ShreeMaya or LemonTree, or you can hunt down a cozy Superhost Airbnb in Vijay Nagar or South Tukoganj.
              </dd>
            </div>
          </dl>
        </section>

        {/* Event Timeline & Venues */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Event Timeline & Venues</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">Where and when is each ceremony?</dt>
              <dd>
               Except for our December 22nd events, all wedding ceremonies take place at <a
    href="https://www.google.com/maps/place/Shri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust/@22.6420739,75.8978692,17z/data=!4m17!1m10!3m9!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!2sShri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust!8m2!3d22.64203!4d75.8978915!10e5!14m1!1BCgIYEw!16s%2Fg%2F11h3l5csyj!3m5!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!8m2!3d22.64203!4d75.8978915!16s%2Fg%2F11h3l5csyj?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="text-burgundy hover:underline"
  >
    Shri Anandam, Maheshwari Jankalyan Trust
  </a>. For exact dates and times, check out our Events page.
              </dd>
            </div>
          </dl>
        </section>

        {/* Packing & Dress Code */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Packing & Dress Code</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">What should I wear to each event?</dt>
              <dd>
                We’ll have a wardrobe planner live soon on our Outfits page—definitely check that for inspo. You don’t have to stick to any theme unless you want to; any lovely Indian outfit you feel great in will work. And if you need a hand picking or tailoring, there’s a spot in the RSVP form to let us know—we can suggest stores and even coordinate quick alterations and delivery so you look and feel your best.
              </dd>
            </div>
            <div>
              <dt className="font-medium">What's the weather like in December?</dt>
              <dd>
               December in Indore is pretty mild—daytime highs hover around 25 °C (77 °F), while nights dip to about 12 °C (54 °F). Layers are your best friend: a light jacket or shawl for after dark, and maybe a compact umbrella in case of surprise drizzles—though we’re all hoping the clouds sit this one out!🤞 
              </dd>
            </div>
          </dl>
        </section>

        {/* Gift Registry & Gifting */}
        <section>
          <h2 className="text-2xl font-semibold text-navy mb-4">Gifts & Registry</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium">Do you have a gift registry?</dt>
              <dd>
                We’ll be adding a Registry page to our website soon—feel free to browse once it’s live, but honestly, having you there in person is the best gift we could ask for!
              </dd>
            </div>
            <div>
              <dt className="font-medium">Where should I send gifts?</dt>
              <dd>
<p>Your presence at our wedding is truly the greatest gift we could ask for!</p>
  <p>If you’d like to send something extra, we’d love to have it delivered to our Seattle apartment (just drop us a line for the address) or to our parents’ homes in Indore:</p>

  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
    <div>
      <strong>Aastha Hurkat</strong><br/>
      c/o Ramniwas Hurkat<br/>
      132 Hilink City <br/>
      Chhota Bangarda Road, Indore 452005
    </div>
    <div>
      <strong>Preetesh Patodi</strong><br/>
      c/o Neetesh Patodi<br/>
      111 Ramchandra Nagar<br/>
      Airport Road, Indore 452005
    </div>
  </div>

  <p className="mt-4">Of course, if you’d rather bring it by hand at the celebration, that’s wonderful too—deliveries just help us keep everything organized!</p>

              </dd>
            </div>
          </dl>
        </section>
      </main>
<div className="h-12" /> 
      <Footer />
    </div>
  );
}

// Opt out of global sticky layout
FAQPage.noLayout = true;
