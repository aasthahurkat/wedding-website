import React, { useState } from 'react';
import { MapPin, ChevronDown, Plane, Smartphone, Home, Shield } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { isBrideTheme, getBackgroundStyle, getHeadingClass } from '../../lib/theme';
import { createGroupPaths, validateGroupProps } from '../../lib/staticGeneration';

export const getStaticPaths = createGroupPaths;
export const getStaticProps = validateGroupProps;

export default function TravelPage({ group }) {
  const [selected, setSelected] = useState('visitors');
  const [openSections, setOpenSections] = useState({});
  const title = `Travel & Logistics`;

  // Only show Goa trip for friends and invitees, not guests
  const showGoaTrip = group !== 'guests';
  const headingClass = getHeadingClass(group);
  
  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const steps = [
    {
      id: 1,
      title: 'Pre-Trip Prep & Arrival',
      description: "Before you set off, here's your survival guide.",
      content: [
        {
          sub: 'Visa & Entry',
          text: "We're no immigration experts, so be sure to double-check official government websites for visa details. If you need a formal letter or printed invitation to make things easier, just holler—we've got you covered!",
        },
        {
          sub: 'Getting to Indore',
          text: "Fly into Mumbai (BOM) or Delhi (DEL) and catch a quick domestic flight to Indore (IDR). Domestic flights in India have different weight limits from international flights. We'd recommend checking that before booking the flights. Once you touch down in Indore, you can grab an Uber or Ola, or give us a heads-up and we'll arrange a pickup if that's easier.",
        },
      ],
    },
    {
      id: 2,
      title: "In-City Essentials",
      description:
        "Whether you're flying in just for the wedding or extending your stay, here's everything you need to settle in comfortably and explore like a local:",
      content: [
        {
          sub: 'Accommodation',
          text: `No need to stress about where to stay on December 23 and 24—we've got those nights covered for you. If you're arriving earlier or staying longer, feel free to book a place that suits your plans. <br><br>
          <strong>Recommended Hotels:</strong><br>
          • <a href="https://www.shreemaya.com/" target="_blank" rel="noopener noreferrer" class="text-burgundy hover:underline font-medium">Hotel Shreemaya</a> - Luxury hotel with excellent service<br>
          • <a href="https://www.lemontreehotels.com/lemon-tree-hotel/indore/hotel-indore" target="_blank" rel="noopener noreferrer" class="text-burgundy hover:underline font-medium">Lemon Tree Hotel</a> - Contemporary hotel with great hospitality<br><br>
          Not sure which neighborhood is ideal? Message us—we're happy to suggest cozy and convenient areas close to key spots.`,
        },
        {
          sub: 'Stay Connected',
          text: "Wi-Fi isn't a given in India, so staying online might need a little prep. <br>Grab a local SIM (Airtel or Jio) right at the airport or nearby kiosks. Prefer eSIMs? Download Airalo and you'll be connected in minutes.",
        },
        {
          sub: 'Must Have Apps',
          text: "India's delivery scene is next level. Seriously—you can get anything in under 10 minutes. Here are your new best friends:<br><ul><li><strong>Blinkit</strong> – Groceries, snacks, toiletries, you name it</li><li><strong>Zomato & Swiggy</strong> – Your go-to for food delivery, from street-style chaat to five-star meals.</li><li><strong>Uber, Ola & Rapido</strong> – For rides. Two-wheelers on Rapido are a fun (and fast!) way to get around short distances.</li></ul><div class='bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4'><p class='text-amber-800 text-sm'><strong>💡 Pro Tip:</strong> Install Google Pay or PhonePe for super smooth payments almost everywhere!</p></div>",
        },
        {
          sub: 'Local Highlights',
          text: "We'll be sharing a curated list of Aastha & Preetesh's favorite food spots, cafes, and chill corners soon—straight from two people who know Indore's heart. But until then, feel free to use Google Maps, TripAdvisor, or even ChatGPT to scout experiences, markets, and local eats.",
        },
        {
          sub: 'Emergency Info',
          text: "In case of any emergency, dial 112. We'll also share a few local contact numbers in the welcome kit—people you can reach out to if you need help while you're in town.",
        },
      ],
    },
    {
      id: 3,
      title: 'New Year\'s Trip to Goa',
      description: '',
      content: [
        {
          sub: 'Stay & Travel',
          text: `We are heading from Indore to Goa on December 28th. We'll probably book a stay in South Goa. Feel free to book your travel and stay at your convenience. We will update this page with more information from our trip so that we can coordinate. Here's a <a href="https://chat.whatsapp.com/IAus6S5U3eW6lyaVRXSE8Z" target="_blank" rel="noopener noreferrer" class="text-burgundy hover:underline">link to the WhatsApp group</a> for discussing the trip - if you would like to join.`,
        },
      ],
    },
  ];



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />

      <main className="flex-1 bg-cream pt-24 pb-12 px-4" style={getBackgroundStyle(group)}>
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <MapPin className="w-8 h-8 text-burgundy" />
            </div>
            <h1 className={`${headingClass} font-serif text-navy mb-4`}>{title}</h1>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Your complete guide to getting here, staying connected, and {showGoaTrip ? 'joining us in Goa' : 'making the most of Indore'}
            </p>
          </div>

          {/* Tabs - only show if Goa trip is available */}
          {showGoaTrip && (
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
              <button
                onClick={() => setSelected('visitors')}
                className={`px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 font-medium w-full sm:w-auto text-center ${
                  selected === 'visitors' 
                    ? 'bg-burgundy text-ivory shadow-md' 
                    : 'text-navy bg-burgundy/10 hover:bg-burgundy/20'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Plane className="w-4 h-4" />
                  Visiting Indore
                </span>
              </button>
              <button
                onClick={() => setSelected('goa')}
                className={`px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 font-medium w-full sm:w-auto text-center ${
                  selected === 'goa' 
                    ? 'bg-burgundy text-ivory shadow-md' 
                    : 'text-navy bg-burgundy/10 hover:bg-burgundy/20'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  New Year's Trip
                </span>
              </button>
            </div>
          )}

          {/* CONTENT */}
          <div className="w-full">
            
            {/* Goa Section - only for friends and invitees */}
            {showGoaTrip && selected === 'goa' && (
              <section className="border-l-2 border-blue-500 pl-6">
                {/* Centered Goa Plate */}
                <div className="text-center mb-8">
                  <img
                    src="/images/sized-plates/goa-plate.png"
                    alt="Goa plate"
                    className="w-40 mx-auto"
                  />
                </div>
                
                <p className="text-navy/80 leading-relaxed mb-8">
                  It's so rare to have all our friends from different chapters of our lives in one
                  place, and with the wedding just before New Year's, we couldn't think of a better
                  time to keep the celebration rolling. We'll be in Goa from{' '}
                  <strong>December 28th, 2025 to January 2nd, 2026</strong> unwinding and shaking off
                  wedding fatigue—hope you'll join us to ring in the New Year together!
                </p>
                
                {steps
                  .filter((s) => s.id === 3)
                  .map((step) => (
                    <div key={step.id} className="space-y-6">
                      {step.content.map((item, idx) => {
                        const sectionKey = `goa-${idx}`;
                        const isOpen = openSections[sectionKey];
                        
                        return (
                          <div key={idx} className="mb-8">
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              className="w-full text-left flex items-center justify-between py-2 border-b border-blue-200 hover:border-blue-400 transition-colors"
                            >
                              <h3 className="font-semibold text-navy flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                {item.sub}
                              </h3>
                              <ChevronDown 
                                className={`w-4 h-4 text-burgundy transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                              />
                            </button>
                            {isOpen && (
                              <div className="text-navy/80 leading-relaxed pl-7 pt-4">
                                <p dangerouslySetInnerHTML={{ __html: item.text }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </section>
            )}

            {/* Indore Section */}
            {(!showGoaTrip || selected === 'visitors') && (
              <section className="border-l-2 border-amber-500 pl-6">
                <p className="text-navy/80 leading-relaxed mb-8">
                  We know you can find everything on the internet these days, but we've done the
                  legwork to round up the essentials here - because who really wants to juggle a dozen
                  tabs? 😉 <br />
                  Consider this your cheat sheet to make the most of Indore.{' '}
                </p>
                
                {steps
                  .filter((s) => s.id < 3)
                  .map((step) => (
                    <div key={step.id} className="mb-12">
                      {/* Main section headers stay visible for structure */}
                      <h2 className="text-xl font-serif text-navy mb-3 flex items-center gap-2">
                        {step.id === 1 ? <Plane className="w-5 h-5 text-amber-600" /> : <Home className="w-5 h-5 text-amber-600" />}
                        {step.title}
                      </h2>
                      <p className="text-navy/80 mb-6" dangerouslySetInnerHTML={{ __html: step.description }} />
                      
                      {/* Collapsible sub-items */}
                      <div className="space-y-4">
                        {step.content.map((item, idx) => {
                          const sectionKey = `${step.id}-${idx}`;
                          const isOpen = openSections[sectionKey];
                          
                          return (
                            <div key={idx} className="mb-4">
                              <button
                                onClick={() => toggleSection(sectionKey)}
                                className="w-full text-left flex items-center justify-between py-2 border-b border-amber-200 hover:border-amber-400 transition-colors"
                              >
                                <h3 className="font-semibold text-navy flex items-center gap-2">
                                  {item.sub === 'Visa & Entry' && <Shield className="w-4 h-4 text-amber-600" />}
                                  {item.sub === 'Getting to Indore' && <Plane className="w-4 h-4 text-amber-600" />}
                                  {item.sub === 'Accommodation' && <Home className="w-4 h-4 text-amber-600" />}
                                  {item.sub === 'Stay Connected' && <Smartphone className="w-4 h-4 text-amber-600" />}
                                  {item.sub === 'Must Have Apps' && <Smartphone className="w-4 h-4 text-amber-600" />}
                                  {item.sub === 'Local Highlights' && <MapPin className="w-4 h-4 text-amber-600" />}
                                  {item.sub === 'Emergency Info' && <Shield className="w-4 h-4 text-amber-600" />}
                                  {item.sub}
                                </h3>
                                <ChevronDown 
                                  className={`w-4 h-4 text-burgundy transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                                />
                              </button>
                              {isOpen && (
                                <div className="text-navy/80 leading-relaxed pl-6 pt-4">
                                  <p dangerouslySetInnerHTML={{ __html: item.text }} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </section>
            )}
            
          </div>
        </div>
      </main>

      <Footer currentGroup={group} />
    </div>
  );
}

TravelPage.noLayout = true;
