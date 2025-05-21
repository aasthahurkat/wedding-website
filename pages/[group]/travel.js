// File: pages/[group]/travel.js
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
  const group = params.group?.toLowerCase();
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

export default function TravelPage({ group }) {
  const title = `${group.toUpperCase()} Travel & Logistics`;

  const steps = [
    {
      id: 1,
      title: "Pre-Trip Prep",
      description: "Before you set off, here’s your survival guide (with a dash of sass):",
      content: [
        { sub: "Visa & Entry", text: "Apply online for an e-Visa at least 4 weeks before lift-off. Make sure your passport has 6+ months of validity, or they’ll send you home faster than a lost rickshaw." },
        { sub: "Packing Checklist", text: "Pack a light jacket, breathable layers, comfy shoes, and a power adapter (Type C/D). Dec nights dip to ~12°C, days climb to ~25°C—plus sunscreen!" },
        { sub: "Weather Forecast", text: "Expect sunny days and crisp nights. Rain is optional (but a mini umbrella won't hurt)." }
      ]
    },
    {
      id: 2,
      title: "Arrival Logistics",
      description: "Touchdown in India! Here’s your teleportation plan to Indore:",
      content: [
        { sub: "Initial Flight", text: "Fly into Mumbai (BOM) or Delhi (DEL)—both major hubs with global connections." },
        { sub: "Connecting Trip", text: "From BOM/DEL: Flight to Indore (1 hr, ₹2k–5k), Train (8–12 hr, ₹500–1.2k), or Overnight Volvo bus (₹800)." },
        { sub: "Final Mile", text: "At Indore Airport/Junction, catch an auto (₹50–100) or Ola/Uber (₹200–300) to South Tukoganj." }
      ]
    },
    {
      id: 3,
      title: "In-City Essentials",
      description: "Settling in? Here’s how to survive—and thrive—in Indore city center:",
      content: [
        { sub: "Accommodation", text: "Hotel Sayaji, Lemon Tree, or The Grand Bhagwati for hotels; Airbnb in Vijay Nagar for local charm." },
        { sub: "Getting Around", text: "Autos (~₹50/km) for short hops; Ola/Uber for door-to-door ease; Bounce scooters if you're feeling adventurous." },
        { sub: "Stay Connected", text: "Grab an Airtel or Jio SIM: ₹299 for 30GB + unlimited calls at the airport or local shops." },
        { sub: "Currency Exchange", text: "Best rates at City Union Bank or Ratlam Road exchangers; ICICI/HDFC ATMs are everywhere." },
        { sub: "Essential Apps", text: "Zomato/Swiggy/Blinkit for food, Ola/Uber for rides, Paytm for payments—your pocket sidekicks." },
        { sub: "Local Highlights", text: "Rajwada Palace, Kanch Mandir, Patalpani Falls, and Sarafa Bazaar's nighttime feast." }
      ]
    },
    {
      id: 4,
      title: "Side-Trip: Goa (Dec 28–Jan 2)",
      description: "Need beach therapy? Here’s your Indore → Goa escape plan:",
      content: [
        { sub: "Travel Options", text: "Flight (1 hr, ₹3k–5k), Train (12 hr, ₹600–1.5k), or Bus (14 hr, ₹800)." },
        { sub: "Where to Stay", text: "North Goa for parties (Calangute/Anjuna); South Goa for serenity (Colva/Cansaulim)." },
        { sub: "Must-Do", text: "Sunrise at Calangute, Dudhsagar Falls, Fontainhas walk in Panaji, plus a feni toast." },
        { sub: "Pro Tip", text: "Book a Mandovi River sunset cruise (bargain with local boatmen)." }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-cream pt-32 pb-16 px-4 mx-auto max-w-4xl scroll-py-32">
        <h1 className="text-3xl font-serif text-navy text-center mb-4">{title}</h1>
        <p className="text-center text-navy/70 mb-12">A fun, step-by-step journey to getting here, settling in, and exploring!</p>

        <div className="relative border-l-2 border-burgundy pl-6 space-y-8">
          {steps.map((step) => (
            <details key={step.id} open={step.id === 1} className="relative group">
              <summary className="flex items-start cursor-pointer py-2">
                <div className="w-6 h-6 flex-shrink-0 bg-burgundy text-ivory rounded-full flex items-center justify-center mr-4 mt-1">{step.id}</div>
                <div>
                  <h2 className="text-xl font-semibold text-navy">{step.title}</h2>
                  <p className="text-navy/80 mt-1">{step.description}</p>
                </div>
              </summary>
              <div className="pl-14 mt-2 space-y-4">
                {step.content.map((item, idx) => (
                  <details key={idx} className="group">
                    <summary className="font-medium text-navy cursor-pointer py-1">{item.sub}</summary>
                    <p className="text-navy/80 pl-4 mt-1">{item.text}</p>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Opt out of global sticky layout
TravelPage.noLayout = true;