// File: pages/[group]/faqs.js
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Calendar, Gift, Home, Crown, Camera } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ACCESS_GROUPS } from '../../data/accessGroups';

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

// Simple category styling - just for headers
const categoryStyles = {
  rsvp: {
    headerColor: 'text-purple-700',
    icon: Calendar,
  },
  lodging: {
    headerColor: 'text-blue-700',
    icon: Home,
  },
  events: {
    headerColor: 'text-amber-700',
    icon: Calendar,
  },
  dressCode: {
    headerColor: 'text-pink-700',
    icon: Crown,
  },
  gifts: {
    headerColor: 'text-emerald-700',
    icon: Gift,
  },
  photos: {
    headerColor: 'text-pink-700',
    icon: Camera,
  }
};

// Simple FAQ Item component
function FAQItem({ question, children, isOpen, onToggle }) {
  return (
    <div className="bg-ivory/50 rounded-lg mb-4 border border-neutral/20 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex justify-between items-center font-semibold text-navy hover:text-burgundy transition-colors"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{question}</span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-burgundy transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 text-navy transition-transform duration-200" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-navy/80 leading-relaxed border-t border-neutral/10 pt-3 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}

// Simple Category Section component
function CategorySection({ title, category, children, description }) {
  const style = categoryStyles[category];
  const IconComponent = style.icon;
  
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <IconComponent className={`w-6 h-6 ${style.headerColor}`} />
        <div>
          <h2 className={`text-xl font-serif ${style.headerColor}`}>{title}</h2>
          {description && <p className="text-navy/60 text-sm mt-1">{description}</p>}
        </div>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function FAQPage({ group }) {
  const [openIndex, setOpenIndex] = useState(null);

  const allFAQs = [
    // RSVP & Invitations
    {
      id: 0,
      category: 'rsvp',
      question: "Do I need to RSVP?",
      content: (
        <>
          It's not mandatory, but it will make it so much easier for us to get a headcount and
          sort out the logistics and accommodations, so if you could RSVP by{' '}
          <strong>OCTOBER 15</strong> on our RSVP page, we'd really appreciate it!
        </>
      )
    },
    
    // Lodging
    {
      id: 1,
      category: 'lodging',
      question: "Where can I stay for the wedding dates?",
      content: (
        <>
          Our wedding venue has rooms reserved for family, and we've blocked off a nearby
          property just for our friends. We'll cover your stay on the nights of December 23 &
          24, and there'll be shuttle service running between the two—so just unpack and relax!
        </>
      )
    },
    {
      id: 2,
      category: 'lodging',
      question: "What if I'm arriving early or sticking around later—any recs?",
      content: (
        <>
          If you need extra nights, our go-to spots are{' '}
          <a
            href="https://www.shreemaya.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:underline font-medium"
          >
            Hotel Shreemaya
          </a>{' '}
          or{' '}
          <a
            href="https://www.lemontreehotels.com/lemon-tree-hotel/indore/hotel-indore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:underline font-medium"
          >
            Lemon Tree Hotel
          </a>
          , or you can hunt down a cozy Superhost Airbnb in Vijay Nagar or South Tukoganj.
        </>
      )
    },
    
    // Events & Timeline
    {
      id: 3,
      category: 'events',
      question: "Where and when is each ceremony?",
      content: (
        <>
          {group === 'guests' ? (
            <>All wedding ceremonies take place at{' '}
            <a
              href="https://www.google.com/maps/place/Shri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust/@22.6420739,75.8978692,17z/data=!4m17!1m10!3m9!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!2sShri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust!8m2!3d22.64203!4d75.8978915!10e5!14m1!1BCgIYEw!16s%2Fg%2F11h3l5csyj!3m5!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!8m2!3d22.64203!4d75.8978915!16s%2Fg%2F11h3l5csyj?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-burgundy hover:underline"
            >
              Shri Anandam, Maheshwari Jankalyan Trust
            </a>. For exact dates and times, check out our Events page.</>
          ) : (
            <>Except for our December 22nd events, all wedding ceremonies take place at{' '}
            <a
              href="https://www.google.com/maps/place/Shri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust/@22.6420739,75.8978692,17z/data=!4m17!1m10!3m9!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!2sShri+Anandam+Pro.+Shri+Maheshwari+Jankalyan+Trust!8m2!3d22.64203!4d75.8978915!10e5!14m1!1BCgIYEw!16s%2Fg%2F11h3l5csyj!3m5!1s0x3962fb1e3f28ceff:0x16945c477d0fa625!8m2!3d22.64203!4d75.8978915!16s%2Fg%2F11h3l5csyj?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-burgundy hover:underline"
            >
              Shri Anandam, Maheshwari Jankalyan Trust
            </a>
            . For exact dates and times, check out our Events page.</>
          )}
        </>
      )
    },
    
    // Dress Code & Packing
    {
      id: 4,
      category: 'dressCode',
      question: "What should I wear to each event?",
      content: (
        <>
          We will have information on our{' '}
          <a
            href={`/${group}/outfits`}
            className="text-burgundy hover:underline font-medium"
          >
            Outfits page
          </a>
          {' '}soon with event-specific recommendations! You don't have to stick to any strict theme—any lovely outfit you feel great in will work. Need help with shopping or tailoring? Let us know in your RSVP and we can suggest stores and coordinate quick alterations.
        </>
      )
    },
    {
      id: 5,
      category: 'dressCode',
      question: "What's the weather like in December?",
      content: (
        <>
          December in Indore is pretty mild—daytime highs hover around 25 °C (77 °F), while
          nights dip to about 12 °C (54 °F). Layers are your best friend: a light jacket or
          shawl for after dark, and maybe a compact umbrella in case of surprise drizzles—though
          we're all hoping the clouds sit this one out!🤞
        </>
      )
    },
    
    // Gifts & Registry
    {
      id: 6,
      category: 'gifts',
      question: "What if I'd like to give a gift?",
      content: (
        <>
          <p>
            Your presence at our wedding is truly the greatest gift we could ask for! Whatever you think would be best for us would be wonderful. We will put together some ideas as a gift registry soon for those who've asked. Honestly though, just having you there to celebrate with us means the world.
          </p>
        </>
      )
    },
    // TEMPORARILY COMMENTED OUT - UNCOMMENT BEFORE FINAL LAUNCH
    // {
    //   id: 7,
    //   category: 'gifts',
    //   question: "If someone wants to send something, where should it go?",
    //   content: (
    //     <>
    //       <p>
    //         If you'd like to send something, we'd love to have it delivered to our Seattle apartment (just drop us a line for the address) or to our parents' homes in Indore:
    //       </p>

    //       <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
    //         <div className="bg-white/50 p-3 rounded-lg">
    //           <strong>Aastha Hurkat</strong>
    //           <br />
    //           c/o Ramniwas Hurkat
    //           <br />
    //           132 Hilink City
    //           <br />
    //           Chhota Bangarda Road, Indore 452005
    //         </div>
    //         <div className="bg-white/50 p-3 rounded-lg">
    //           <strong>Preetesh Patodi</strong>
    //           <br />
    //           c/o Neetesh Patodi
    //           <br />
    //           111 Ramchandra Nagar, Indore 452001
    //         </div>
    //       </div>
    //     </>
    //   )
    // },
    
    // Photo Sharing
    {
      id: 8,
      category: 'photos',
      question: "How can I share wedding photos with you?",
      content: (
        <>
          <p>
            We'd absolutely love to see the wedding through your eyes! We have a special Gallery where everyone can view our favorite wedding moments.
          </p>
          <p className="mt-3">
            <strong>How to share your photos:</strong>
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Upload your photos to our shared Google Drive folder</li>
            <li>All photos will remain accessible to everyone in the shared folder</li>
            <li>We'll also feature a rotating selection of photos here on the website to keep page loading smooth and showcase different perspectives</li>
            <li>This way, everyone can enjoy the full collection on the Drive while we highlight various moments on the site</li>
          </ul>
          <p className="mt-3">
            Your photos help us capture the complete story of our special day from every angle!
          </p>
        </>
      )
    },
    {
      id: 9,
      category: 'photos',
      question: "What kind of photos should I share?",
      content: (
        <>
          <p>
            Honestly, we want to see it all! Every moment you captured means something to us. Whether it's the chaos of getting ready, candid reactions during the ceremonies, or everyone dancing their hearts out—we want to see our celebrations through your eyes.
          </p>
          <p className="mt-3">
            Candid moments, group shots, behind-the-scenes madness, detail pics of the decorations and outfits, dance floor energy, ritual moments we might have missed—whatever caught your attention is exactly what we want to relive. Even the blurry, imperfect shots often capture the best emotions and memories.
          </p>
          <p className="mt-3">
            Share whatever made you smile, laugh, or feel the joy of our festivities. That's our wedding story right there!
          </p>
        </>
      )
    }
  ];

  // Group FAQs by category
  const faqsByCategory = {
    rsvp: allFAQs.filter(faq => faq.category === 'rsvp'),
    lodging: allFAQs.filter(faq => faq.category === 'lodging'),
    events: allFAQs.filter(faq => faq.category === 'events'),
    dressCode: allFAQs.filter(faq => faq.category === 'dressCode'),
    gifts: allFAQs.filter(faq => faq.category === 'gifts'),
    photos: allFAQs.filter(faq => faq.category === 'photos')
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      
      <main className="flex-1 bg-cream pt-24 pb-12 px-4">
        {/* CONSISTENT WIDTH CONTAINER */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-burgundy" />
            </div>
            <h1 className="text-3xl font-serif text-navy mb-4">Frequently Asked Questions</h1>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Here you'll find answers to the questions we get asked the most about the event and
              RSVP. If your question isn't here, just reach out — we're always happy to help!
            </p>
          </div>

          <div className="border-l-2 border-burgundy pl-6 space-y-8">
            {/* RSVP & Invitations */}
            <CategorySection 
              title="RSVP & Invitations" 
              category="rsvp"
            >
              {faqsByCategory.rsvp.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  isOpen={openIndex === faq.id}
                  onToggle={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </FAQItem>
              ))}
            </CategorySection>

            {/* Lodging */}
            <CategorySection 
              title="Lodging" 
              category="lodging"
            >
              {faqsByCategory.lodging.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  isOpen={openIndex === faq.id}
                  onToggle={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </FAQItem>
              ))}
            </CategorySection>

            {/* Event Timeline & Venues */}
            <CategorySection 
              title="Event Timeline & Venues" 
              category="events"
            >
              {faqsByCategory.events.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  isOpen={openIndex === faq.id}
                  onToggle={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </FAQItem>
              ))}
            </CategorySection>

            {/* Packing & Dress Code */}
            <CategorySection 
              title="Packing & Dress Code" 
              category="dressCode"
            >
              {faqsByCategory.dressCode.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  isOpen={openIndex === faq.id}
                  onToggle={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </FAQItem>
              ))}
            </CategorySection>

            {/* Gift Registry & Gifting */}
            <CategorySection 
              title="Gift Registry & Gifting" 
              category="gifts"
            >
              {faqsByCategory.gifts.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  isOpen={openIndex === faq.id}
                  onToggle={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </FAQItem>
              ))}
            </CategorySection>

            {/* Photo Sharing */}
            <CategorySection 
              title="Photo Sharing" 
              category="photos"
            >
              {faqsByCategory.photos.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  isOpen={openIndex === faq.id}
                  onToggle={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                >
                  {faq.content}
                </FAQItem>
              ))}
            </CategorySection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

FAQPage.noLayout = true;

