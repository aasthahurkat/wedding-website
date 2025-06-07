// pages/[group]/outfits.js
import { useRouter } from 'next/router';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Crown, Sparkles, Camera } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({
      params: { group: g.key.toLowerCase() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group.toLowerCase();
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

// Universal outfit data for all groups
const outfitData = {
  title: 'Dress Code & Outfit Inspiration',
  subtitle: 'Help us make our celebration picture-perfect!',
  sections: [
    {
      event: 'Mehendi',
      colors: ['Bright yellows', 'Oranges', 'Marigold', 'Vibrant greens'],
      description: 'Think festive and fun! Bright colors that celebrate the joy of the occasion.',
      notes: 'Comfortable fabrics recommended as these are outdoor ceremonies.',
    },
    {
      event: 'Evening Events',
      colors: ['Rich jewel tones', 'Deep blues', 'Emerald', 'Royal purple'],
      description: 'Elegant and sophisticated. Think cocktail party meets Indian celebration.',
      notes: 'Semi-formal to formal Indian or Western attire welcome.',
    },
    {
      event: 'Wedding Ceremony',
      colors: ['Traditional reds', 'Golds', 'Maroons', 'Rich silks'],
      description: 'Our most formal celebration. Traditional Indian attire preferred.',
      notes: 'Please avoid white, black, or very light colors for the main ceremony.',
    },
  ],
  
  storesSummary: "If you're looking to shop in Indore, here are some wonderful stores that offer beautiful traditional and contemporary Indian wear for wedding celebrations:",
  
  stores: [
    {
      name: 'Manish Malhotra Indore',
      type: 'Designer',
      location: 'Vijay Nagar',
      specialty: 'Bridal lehengas and sherwanis',
      note: 'Premium designer collection',
    },
    {
      name: 'Ritu Kumar',
      type: 'Brand Store',
      location: 'Palasia Square',
      specialty: 'Traditional and fusion wear',
      note: 'Quality fabrics and craftsmanship',
    },
    {
      name: 'FabIndia',
      type: 'Ethnic Wear',
      location: 'Multiple locations',
      specialty: 'Cotton and silk traditional wear',
      note: 'Comfortable and elegant options',
    },
    {
      name: 'Manyavar Indore',
      type: "Men's Ethnic",
      location: 'Treasure Island Mall',
      specialty: 'Sherwanis and kurtas',
      note: 'Wide range for all budgets',
    },
    {
      name: 'Mohanlal Sons',
      type: 'Traditional',
      location: 'Sarafa Bazaar',
      specialty: 'Custom sherwanis and suits',
      note: 'Established family business since 1960',
    },
  ],
  
  onlineStores: [
    {
      name: 'Lashkaraa',
      website: 'lashkaraa.com',
      specialty: 'Designer ethnic wear for men and women',
      note: 'Beautiful collection of lehengas, sarees, and sherwanis',
    },
    {
      name: 'Aza Fashion',
      website: 'azafashions.com', 
      specialty: 'Contemporary Indian wear',
      note: 'Trendy fusion pieces and traditional outfits',
    },
    {
      name: 'Kalki Fashion',
      website: 'kalkifashion.com',
      specialty: 'Wedding and Festive wear',
      note: 'Luxurious designs perfect for wedding celebrations',
    },
  ],
  
  rentalsSummary: "If you don't want to purchase multiple outfits for the different wedding celebrations, rental is definitely the way to go! It's a fantastic option that lets you wear stunning designer pieces without the commitment of buying. Here are some wonderful places that some of our friends have recommended for rental outfits:",
  
  rentals: [
    {
      name: 'Rent It Bae Indore',
      contact: '+91 98765 43210',
      specialty: 'Designer lehengas and suits',
      note: 'Affordable luxury rentals',
    },
    {
      name: 'Flyrobe Indore',
      contact: '+91 87654 32109',
      specialty: 'Wedding and party wear',
      note: 'Wide range of sizes and styles',
    },
    {
      name: 'The Man Company Rentals',
      contact: '+91 98765 43211',
      specialty: 'Designer sherwanis and bandhgalas',
      note: 'Premium rentals with accessories',
    },
    {
      name: "Groom's Closet",
      contact: '+91 87654 32108',
      specialty: 'Traditional and indo-western',
      note: 'Complete styling packages available',
    },
  ],
};

export default function OutfitsPage({ group }) {
  const router = useRouter();
  const current = group || router.query.group;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={current} />

      <main className="flex-1 relative bg-cream">
        <div
          className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-burgundy" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-4">{outfitData.title}</h1>
            <p className="text-navy/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
              {outfitData.subtitle}
            </p>
          </div>

          {/* SECTION 1: DRESS CODE */}
          <div className="mb-16">
            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-burgundy" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-navy mb-2">Dress Code</h2>
              <div className="w-24 h-1 bg-burgundy mx-auto mb-4"></div>
              <p className="text-navy/70 max-w-lg mx-auto">
                Here's what to wear for each celebration to look your absolute best!
              </p>
            </div>

            {/* Outfit Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {outfitData.sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-ivory rounded-xl shadow-lg p-6 border border-neutral/20 hover:shadow-xl transition-shadow"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-serif text-navy mb-2">
                      {section.event}
                    </h3>
                    <p className="text-navy/80 text-sm mb-4">{section.description}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-navy mb-3 text-center">Recommended Colors</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {section.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-burgundy/15 text-burgundy rounded-full text-sm font-medium"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-navy/60 text-xs italic text-center bg-neutral/5 p-3 rounded-lg">
                    {section.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: SHOPPING RECOMMENDATIONS (for friends only) */}
          {current === 'friends' && (
            <div className="mb-16">
              {/* Section Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                  <svg className="w-8 h-8 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-navy mb-2">Shopping Guide</h2>
                <div className="w-24 h-1 bg-burgundy mx-auto mb-4"></div>
                <div className="bg-burgundy/5 rounded-lg p-6 max-w-4xl mx-auto">
                  <p className="text-navy/80 text-center leading-relaxed">
                    {outfitData.storesSummary}
                  </p>
                </div>
              </div>

              {/* Physical Stores in Indore */}
              <div className="mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-px bg-burgundy/20"></div>
                  <h3 className="px-6 text-lg sm:text-xl font-serif text-navy bg-cream">
                    🏪 Physical Stores in Indore
                  </h3>
                  <div className="flex-1 h-px bg-burgundy/20"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {outfitData.stores.map((store, index) => (
                    <div
                      key={index}
                      className="bg-ivory rounded-xl shadow-lg p-6 border border-neutral/20 hover:shadow-xl transition-shadow"
                    >
                      <h4 className="text-lg font-serif text-navy mb-2">{store.name}</h4>
                      <p className="text-burgundy text-sm font-medium mb-2">{store.type}</p>
                      <p className="text-navy/70 text-sm mb-2">📍 {store.location}</p>
                      <p className="text-navy/80 text-sm mb-3">{store.specialty}</p>
                      <p className="text-navy/60 text-xs italic bg-neutral/5 p-3 rounded-lg">{store.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online Stores */}
              <div>
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-px bg-burgundy/20"></div>
                  <h3 className="px-6 text-lg sm:text-xl font-serif text-navy bg-cream">
                    🌐 Online Shopping Portals
                  </h3>
                  <div className="flex-1 h-px bg-burgundy/20"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                  {outfitData.onlineStores.map((store, index) => (
                    <div
                      key={index}
                      className="bg-ivory rounded-xl shadow-lg p-6 border border-neutral/20 hover:shadow-xl transition-shadow"
                    >
                      <h4 className="text-lg font-serif text-navy mb-2">{store.name}</h4>
                      <p className="text-burgundy text-sm font-medium mb-2">🌐 {store.website}</p>
                      <p className="text-navy/80 text-sm mb-3">{store.specialty}</p>
                      <p className="text-navy/60 text-xs italic bg-neutral/5 p-3 rounded-lg">{store.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: RENTAL OPTIONS (for friends only) */}
          {current === 'friends' && (
            <div className="mb-16">
              {/* Section Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                  <svg className="w-8 h-8 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-navy mb-2">Rental Options</h2>
                <div className="w-24 h-1 bg-burgundy mx-auto mb-4"></div>
                <div className="bg-burgundy/5 rounded-lg p-6 max-w-4xl mx-auto">
                  <p className="text-navy/80 text-center leading-relaxed">
                    {outfitData.rentalsSummary}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {outfitData.rentals.map((rental, index) => (
                  <div
                    key={index}
                    className="bg-ivory rounded-xl shadow-lg p-6 border border-neutral/20 hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-lg font-serif text-navy mb-2">{rental.name}</h3>
                    <p className="text-burgundy text-sm font-medium mb-2">📞 {rental.contact}</p>
                    <p className="text-navy/80 text-sm mb-3">{rental.specialty}</p>
                    <p className="text-navy/60 text-xs italic bg-neutral/5 p-3 rounded-lg">{rental.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Note */}
          <div className="mt-12 text-center">
            <div className="bg-burgundy/10 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-navy/80 text-sm leading-relaxed">
                We can't wait to see you dressed up and celebrating with us! If you have any
                questions about outfits or need shopping recommendations, please don't hesitate
                to ask.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

OutfitsPage.noLayout = true;
