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
      event: 'Mehendi & Haldi',
      colors: ['Bright yellows', 'Oranges', 'Marigold', 'Vibrant greens'],
      description: 'Think festive and fun! Bright colors that celebrate the joy of the occasion.',
      notes: 'Comfortable fabrics recommended as these are outdoor ceremonies.',
    },
    {
      event: 'Sangam & Evening Events',
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

          {/* Outfit Sections */}
          <div className="space-y-8">
            {outfitData.sections.map((section, index) => (
              <div
                key={index}
                className="bg-ivory rounded-lg shadow-lg p-4 sm:p-6 border border-neutral/20"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-serif text-navy mb-3">
                      {section.event}
                    </h3>
                    <p className="text-navy/80 mb-4">{section.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-navy mb-2">Recommended Colors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {section.colors.map((color, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-burgundy/10 text-burgundy rounded-full text-sm"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-navy/60 text-sm italic">{section.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Store Recommendations (for friends only) */}
          {current === 'friends' && (
            <div className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-serif text-navy text-center mb-6 sm:mb-8 px-4">
                Shopping Recommendations in Indore
              </h2>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {outfitData.stores.map((store, index) => (
                  <div
                    key={index}
                    className="bg-ivory rounded-lg shadow-lg p-6 border border-neutral/20"
                  >
                    <h3 className="text-lg font-serif text-navy mb-2">{store.name}</h3>
                    <p className="text-burgundy text-sm font-medium mb-2">{store.type}</p>
                    <p className="text-navy/70 text-sm mb-2">📍 {store.location}</p>
                    <p className="text-navy/80 text-sm mb-3">{store.specialty}</p>
                    <p className="text-navy/60 text-xs italic">{store.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rental Options (for friends only) */}
          {current === 'friends' && (
            <div className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-serif text-navy text-center mb-6 sm:mb-8 px-4">
                Rental Options in Indore
              </h2>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {outfitData.rentals.map((rental, index) => (
                  <div
                    key={index}
                    className="bg-ivory rounded-lg shadow-lg p-6 border border-neutral/20"
                  >
                    <h3 className="text-lg font-serif text-navy mb-2">{rental.name}</h3>
                    <p className="text-burgundy text-sm font-medium mb-2">📞 {rental.contact}</p>
                    <p className="text-navy/80 text-sm mb-3">{rental.specialty}</p>
                    <p className="text-navy/60 text-xs italic">{rental.note}</p>
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
