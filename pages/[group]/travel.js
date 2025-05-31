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
  const group = params.group?.toLowerCase();
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

export default function TravelPage({ group }) {
  const [selected, setSelected] = useState("goa");
  const title = `Travel & Logistics`;
  const steps = [
    {
      id: 1,
      title: "Pre-Trip Prep & Arrival",
      description: "Before you set off, here’s your survival guide",
      content: [
        { sub: "Visa & Entry", text: "We’re no immigration experts, so be sure to double-check official government websites for visa details. If you need a formal letter or printed invitation to make things easier, just holler—we’ve got you covered!" },
       { sub: "Getting to Indore", text: "Fly into Mumbai (BOM) or Delhi (DEL) and catch a quick domestic flight to Indore (IDR). Once you touch down, you can grab an Uber or Ola, or give us a heads-up and we’ll arrange a pickup if that’s easier." },
      ]
    },
    {
      id: 2,
      title: "In-City Essentials",
      description: "Settling in? Thrive in Indore city center with:",
      content: [
        { sub: "Accommodation", text: "Hotel Shreemaya, Lemon Tree,; Airbnb in South Tukoganj for a local vibe." },
        { sub: "Stay Connected", text: "Its Grab an Airtel or Jio SIM (₹299 for 30GB + unlimited calls) at the airport or local kiosks. You could also use Airalo app to get an esim." },
        { sub: "Currency & Apps", text: "Best Forex at City Union Bank or Ratlam Road; apps: Zomato/Swiggy, Ola/Uber, Paytm/Google Pay." },
        { sub: "Local Highlights", text: "Rajwada Palace, Kanch Mandir, Sarafa Bazaar (night food street), Patalpani Falls." }
      ]
    },
    {
      id: 3,
      description: "It’s so rare to have all our friends from different chapters of our lives in one place, and with the wedding just before New Year’s, we couldn’t think of a better time to keep the celebration rolling. We’ll be in Goa from <strong>December 28th, 2025 to January 2nd, 2026</strong> unwinding and shaking off wedding fatigue—hope you’ll join us to ring in the New Year together!",
      content: [
        { sub: "Stay & Travel", text: `We are heading from Indore to Goa on December 28th. We'll probably book a stay in South Goa. Feel free to book your travel and stay at your convenience. We will update this page with more information from our trip so that we can coordinate. Here's a 
    <a
      href="https://chat.whatsapp.com/yourInviteCode"
      target="_blank"
      rel="noopener noreferrer"
      class="text-burgundy hover:underline"
    >
      link to the WhatsApp group
    </a> for discussing the trip - if you would like to join.` },
        
      ]
    }
  ];

  const tabClasses = (tab) =>
    `px-4 py-2 rounded cursor-pointer ${
      selected === tab
        ? "bg-burgundy text-ivory"
        : "text-navy hover:bg-navy/10"
    }`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-cream pt-24 px-4 mx-auto max-w-4xl space-y-12 scroll-py-32">
        <h1 className="text-3xl font-serif text-navy text-center mb-6">{title}</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={() => setSelected("visitors")} className={tabClasses("visitors")}>Visiting Indore</button>
          <button onClick={() => setSelected("goa")} className={tabClasses("goa")}>New Years' Trip</button>
        </div>

        {/* Goa Section */}
        {selected === "goa" && (
          <section>
          <img
     	     src="/images/sized-plates/goa-plate.png"
     	     alt="Goa plate"
             className="w-40 mx-auto mb-2"/>
          <div className="relative border-l-2 border-burgundy pl-6 prose prose-md mx-auto space-y-8">            
              {steps.filter((s) => s.id === 3).map((step) => (
                <details key={step.id} open className="group">
                  <summary className="cursor-pointer list-none marker:content-none">
                    <h3 className="text-2xl font-semibold text-navy text-center">{step.title} </h3>
                    <p
                     className="text-black/80 mt-1"
                     dangerouslySetInnerHTML={{ __html: step.description }}/>
                  </summary>
                  <div className="pl-4 mt-2 space-y-2">
                    {step.content.map((item, idx) => (
                      <details key={idx} className="group">
                        <summary className="font-medium text-black cursor-pointer py-1">{item.sub}</summary>
<p
  className="text-black/80 mt-1"
  dangerouslySetInnerHTML={{ __html:item.text }}
/>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Visitors Section */}
        {selected === "visitors" && (
          <section>
            <div className="relative border-l-2 border-burgundy pl-6 space-y-8">
           <p className="text-black/80 mt-1">We know you can find everything on the internet these days, but we’ve done the legwork to round up the essentials here - because who really wants to juggle a dozen tabs? 😉 <br/> Consider this your cheat sheet to make the most of Indore. </p>
              {steps.filter((s) => s.id < 3).map((step) => (
                <details key={step.id} open={step.id === 1} className="group">
                  <summary className="cursor-pointer py-2 list-none marker:content-none">
                    <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                    <p className="text-black/80 mt-1">{step.description}</p>
                  </summary>
                  <div className="pl-4 mt-2 space-y-2">
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
          </section>
        )}



      </main>
<div className="h-12" /> 
      <Footer />
    </div>
  );
}

TravelPage.noLayout = true;
