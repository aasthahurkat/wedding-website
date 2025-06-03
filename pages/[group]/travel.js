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
      description: "Before you set off, here’s your survival guide.",
      content: [
        {
          sub: "Visa & Entry",
          text: "We’re no immigration experts, so be sure to double-check official government websites for visa details. If you need a formal letter or printed invitation to make things easier, just holler—we’ve got you covered!",
        },
        {
          sub: "Getting to Indore",
          text: "Fly into Mumbai (BOM) or Delhi (DEL) and catch a quick domestic flight to Indore (IDR). Domestic flights in India have different weight limits from international flights. We'd recommend checking that before booking the flights. Once you touch down in Indore, you can grab an Uber or Ola, or give us a heads-up and we’ll arrange a pickup if that’s easier.",
        },
      ],
    },
    {
      id: 2,
      title: "In-City Essentials",
      description:
        "Whether you're flying in just for the wedding or extending your stay, here’s everything you need to settle in comfortably and explore like a local:",
      content: [
        {
          sub: "Accommodation",
          text: "No need to stress about where to stay on December 23 and 24—we’ve got those nights covered for you. If you're arriving earlier or staying longer, feel free to book a place that suits your plans. Not sure which neighborhood is ideal? Message us—we’re happy to suggest cozy and convenient areas close to key spots.",
        },
        {
          sub: "Stay Connected",
          text:
            "Wi-Fi isn't a given in India, so staying online might need a little prep. <br>Grab a local SIM (Airtel or Jio) right at the airport or nearby kiosks. Prefer eSIMs? Download Airalo and you’ll be connected in minutes.",
        },
        {
          sub: "Must Have Apps",
          text:
            "India’s delivery scene is next level. Seriously—you can get anything in under 10 minutes. Here are your new best friends:<br><ul><li><strong>Blinkit</strong> – Groceries, snacks, toiletries, you name it</li><li><strong>Zomato & Swiggy</strong> – Your go-to for food delivery, from street-style chaat to five-star meals.</li><li><strong>Uber, Ola & Rapido</strong> – For rides. Two-wheelers on Rapido are a fun (and fast!) way to get around short distances.</li></ul>Bonus tip: install Google Pay or PhonePe for super smooth payments almost everywhere.",
        },
        {
          sub: "Local Highlights",
          text: "We’ll be sharing a curated list of Aastha & Preetesh’s favorite food spots, cafes, and chill corners soon—straight from two people who know Indore’s heart. But until then, feel free to use Google Maps, TripAdvisor, or even ChatGPT to scout experiences, markets, and local eats.",
        },
        {
          sub: "Emergency Info",
          text: "In case of any emergency, dial 112. We’ll also share a few local contact numbers in the welcome kit—people you can reach out to if you need help while you’re in town.",
        },
      ],
    },
    {
      id: 3,
      description: "",
      content: [
        {
          sub: "Stay & Travel",
          text: `We are heading from Indore to Goa on December 28th. We'll probably book a stay in South Goa. Feel free to book your travel and stay at your convenience. We will update this page with more information from our trip so that we can coordinate. Here's a 
        <a
          href="https://chat.whatsapp.com/yourInviteCode"
          target="_blank"
          rel="noopener noreferrer"
          class="text-burgundy hover:underline"
        >
          link to the WhatsApp group
        </a> for discussing the trip - if you would like to join.`,
        },
      ],
    },
  ];

  const tabClasses = (tab) =>
    `px-4 py-2 rounded cursor-pointer ${
      selected === tab
        ? "bg-burgundy text-ivory"
        : "text-black bg-navy/10 hover:bg-navy/10"
    }`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-cream pt-24 px-4 mx-auto max-w-4xl space-y-12 scroll-py-32">
        <h1 className="text-3xl font-serif text-black text-center mb-6">{title}</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setSelected("visitors")}
            className={tabClasses("visitors")}
          >
            Visiting Indore
          </button>
          <button onClick={() => setSelected("goa")} className={tabClasses("goa")}>
            New Years' Trip
          </button>
        </div>

        {/* Goa Section */}
        {selected === "goa" && (
          <section>
            <img
              src="/images/sized-plates/goa-plate.png"
              alt="Goa plate"
              className="w-40 mx-auto mb-2"
            />
            <div className="relative border-l-2 border-burgundy pl-6 prose prose-md mx-auto space-y-8">
              <p className="text-black/80 mt-1">
                It’s so rare to have all your friends from different chapters of our
                lives in one place, and with the wedding just before New Year’s, we
                couldn’t think of a better time to keep the celebration rolling.
                We’ll be in Goa from <strong>December 28th, 2025 to January 2nd, 2026</strong>{" "}
                unwinding and shaking off wedding fatigue—hope you’ll join us to ring
                in the New Year together!
              </p>
              {steps
                .filter((s) => s.id === 3)
                .map((step) => (
                  <details key={step.id} open className="group">
                    <summary className="cursor-pointer list-none marker:content-none">
                      <h3 className="text-2xl font-semibold text-black text-center">
                        {step.title}{" "}
                      </h3>
                      <p
                        className="text-black/80 mt-1"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    </summary>
                    <div className="pl-4 mt-2 space-y-2">
                      {step.content.map((item, idx) => (
                        <details key={idx} className="group">
                          <summary className="font-medium text-black cursor-pointer py-1">
                            {item.sub}
                          </summary>
                          <p
                            className="text-black/80 mt-1"
                            dangerouslySetInnerHTML={{ __html: item.text }}
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
              <p className="text-black/80 mt-1">
                We know you can find everything on the internet these days, but we’ve
                done the legwork to round up the essentials here - because who really
                wants to juggle a dozen tabs? 😉 <br />
                Consider this your cheat sheet to make the most of Indore.{" "}
              </p>
              {steps
                .filter((s) => s.id < 3)
                .map((step) => (
                  <details key={step.id} open className="group">
                    <summary
                      className="cursor-default py-2 list-none marker:content-none"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h3 className="text-xl font-semibold text-black">{step.title}</h3>
                      <p
                        className="text-black/80 mt-1"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    </summary>
                    <div className="pl-4 mt-2 space-y-2">
                      {step.content.map((item, idx) => (
                        <details key={idx} className="group">
                          <summary className="font-medium text-black cursor-pointer py-1">
                            {item.sub}
                          </summary>
                          <p
                            className="text-black/80 mt-1"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
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
