// pages/[group]/outfits.js
import { useRouter } from 'next/router';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { events } from '../../data/events';
import { Crown, Sparkles, Camera, Clock, Palette, Lightbulb, ShoppingBag } from 'lucide-react';
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

// Helper functions for event data
const getEventTitle = (event, userGroup) => {
  if (typeof event.title === 'string') {
    return event.title;
  }
  return event.title[userGroup] || event.title.FRIENDS || event.title.BRIDE || event.title.GROOM;
};

const getEventDescription = (event, userGroup) => {
  if (typeof event.description === 'string') {
    return event.description;
  }
  return event.description[userGroup] || event.description.FRIENDS || event.description.BRIDE || event.description.GROOM;
};

// Event-specific background colors based on their color palettes
const getEventBackgroundColor = (eventId) => {
  const eventColors = {
    'aastha-mehndi': 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
    'aastha-mamera': 'bg-gradient-to-br from-pink-50 to-amber-50 border-pink-200',
    'sangeet': 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200',
    'after-party': 'bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200',
    'baraat-welcome': 'bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200',
    'baraat': 'bg-gradient-to-br from-red-50 to-amber-50 border-red-200',
    'phere': 'bg-gradient-to-br from-red-50 to-amber-50 border-red-300',
    'family-reception': 'bg-gradient-to-br from-red-100 to-amber-50 border-red-200',
    'reception': 'bg-gradient-to-br from-blue-50 to-green-50 border-blue-200'
  };
  return eventColors[eventId] || 'bg-ivory border-neutral/20';
};



// Event-specific outfit recommendations
const eventOutfitGuide = {
  'aastha-mehndi': {
    title: 'Mehndi',
    outfit: 'Bright, comfortable cotton or lightweight fabrics',
    description: {
      BRIDE: 'Join in a joyous pre-wedding celebration centered around the application of beautiful henna designs. This intimate gathering will be filled with laughter, traditional music, and the artistry of intricate mehndi patterns.',
      GROOM: 'Join in a joyous pre-wedding celebration centered around the application of henna designs. Come celebrate this beautiful tradition with music and festivities.',
      FRIENDS: 'Join the bride in a joyous pre-wedding celebration centered around the application of henna designs. Experience the beautiful tradition of mehndi with music, laughter, and celebration!'
    },
    colors: ['Bright yellows', 'Oranges', 'Marigold', 'Vibrant greens']
  },
  'aastha-mamera': {
    title: 'Mayra',
    outfit: 'Traditional or contemporary Indian wear in vibrant colors',
    description: {
      BRIDE: 'A heartwarming ceremony where maternal relatives present gifts and blessings—honoring family bonds and showering the couple with love.',
      GROOM: 'A heartwarming ceremony where maternal relatives present gifts and blessings—honoring family bonds and showering the couple with love.',
      FRIENDS: 'A heartwarming ceremony where maternal relatives present gifts and blessings. Friends are welcome to join or enjoy a casual mixer happening simultaneously—choose your vibe!'
    },
    colors: ['Bright pinks', 'Golden yellows', 'Coral']
  },
  'sangeet': {
    title: 'Sangeet Night',
    outfit: 'Party-ready traditional or fusion wear perfect for dancing',
    description: {
      BRIDE: 'An unforgettable evening of spectacle and style: live music, electrifying dance performances, and dazzling family showcases. Your chance to shine on the dance floor before the big day!',
      GROOM: 'An unforgettable evening of spectacle and style: live music, electrifying dance performances, and dazzling family showcases. Time to show off those dance moves!',
      FRIENDS: 'Get ready to party! An unforgettable evening of live music, electrifying dance performances, and dazzling showcases. Come dressed to impress and ready to dance the night away!'
    },
    colors: ['Rich jewel tones', 'Deep blues', 'Emerald', 'Royal purple']
  },
  'after-party': {
    title: 'Late Night Celebrations',
    outfit: 'Comfortable party wear or stylish Indo-western outfits',
    description: "Keep the energy alive with late-night music, dancing, and cocktails as we toast to Aastha and Preetesh's new journey together.",
    colors: ['Midnight blues', 'Silver', 'Black with accents']
  },
  'baraat-welcome': {
    title: 'Groom Welcome Ceremony',
    outfit: 'Traditional Indian attire in welcoming, bright colors',
    description: "A warm welcome ceremony for the groom's procession, where the bride's family receives Preetesh with traditional rituals and celebration.",
    colors: ['Sunshine yellow', 'Festive orange']
  },
  'baraat': {
    title: 'Groom Procession',
    outfit: 'Band baaja outfit with ethnic footwear - ready to celebrate!',
    description: {
      GROOM: "Your big moment! Experience the groom's joyous procession with music, dancing, and celebration as you arrive to take Aastha to the pheras venue. This is your time to shine!",
      FRIENDS: "Join Preetesh's epic procession! Experience the groom's joyous baraat with music, dancing, and celebration. Come ready to dance and celebrate as we escort the groom to meet his bride!"
    },
    colors: ['Festive reds', 'Golden yellows', 'Royal blues']
  },
  'phere': {
    title: 'Wedding Ceremony',
    outfit: 'Traditional Indian formal wear - this is the main event!',
    description: {
      BRIDE: 'The most sacred moment - your wedding vows (pheras) around the holy fire, where you and Preetesh promise a lifelong partnership surrounded by the love of family and friends.',
      GROOM: 'The most sacred moment - your wedding vows (pheras) around the holy fire, where you and Aastha promise a lifelong partnership surrounded by the love of family and friends.',
      FRIENDS: 'Witness the sacred wedding vows (pheras) around the holy fire, where Aastha and Preetesh promise a lifelong partnership. Be part of this beautiful and meaningful ceremony.'
    },
    colors: ['Traditional reds', 'Golds', 'Maroons', 'Rich silks']
  },
  'family-reception': {
    title: 'Family Reception',
    outfit: 'Elegant traditional wear for intimate family celebration',
    description: 'An intimate celebration with immediate family and close relatives, featuring traditional blessings, dinner, and heartfelt moments with the newlyweds.',
    colors: ['Deep burgundy', 'Rich gold']
  },
  'reception': {
    title: 'Friends Reception',
    outfit: 'Cocktail attire - Indian or Western, perfect for dinner and dancing',
    description: 'A festive dinner and dance under the stars, complete with toasts, and a chance to celebrate with the newlyweds.',
    colors: ['Evening blues', 'Champagne gold', 'Emerald green']
  }
};

export default function OutfitsPage({ group }) {
  const router = useRouter();
  const current = group || router.query.group;
  const upperGroup = current.toUpperCase();

  // Filter events based on group access
  const accessibleEvents = events.filter(event => 
    event.allowedGroups.includes(upperGroup)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={current} />

      <main className="flex-1 relative bg-cream">
        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes metallic-shine {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .fabric-overlay {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            pointer-events: none;
          }

          .silk-texture {
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
            background-size: 200% 200%;
            animation: shimmer 3s ease-in-out infinite;
          }

          .velvet-texture {
            background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
            background-size: 4px 4px;
          }

          .metallic-texture {
            background: linear-gradient(45deg, rgba(255,255,255,0.4), transparent, rgba(255,255,255,0.4));
            background-size: 20px 20px;
            animation: metallic-shine 2s ease-in-out infinite;
          }

          .cotton-texture {
            background: repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.1) 1px,
              rgba(255,255,255,0.1) 2px
            );
          }

          .tooltip {
            visibility: hidden;
            opacity: 0;
            transition: all 0.3s ease;
            transform: translateY(10px);
          }

          .tooltip-trigger:hover .tooltip {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>

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
            <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-4">Dress Code</h1>
            <p className="text-navy/70 max-w-2xl mx-auto text-sm sm:text-base px-4 mb-6">
              Help us make our celebration picture-perfect! Here's your guide to what to wear for each event.
            </p>
            
            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-3xl mx-auto">
              <p className="text-amber-800 text-sm leading-relaxed">
                <span className="font-medium">💡 Friendly reminder:</span> These are suggestions to help you feel confident and comfortable! 
                Feel free to wear whatever makes you happy - the most important thing is that you're there to celebrate with us. 
                When in doubt, wear something that makes you smile! ✨
              </p>
            </div>
          </div>

          {/* Event-Specific Outfit Cards */}
          <div className="mb-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {accessibleEvents.map((event) => {
                const outfitInfo = eventOutfitGuide[event.id];
                if (!outfitInfo) return null;

                return (
                  <div
                    key={event.id}
                    className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${getEventBackgroundColor(event.id)}`}
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-serif text-navy mb-2">
                        {outfitInfo.title}
                      </h3>
                    
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-navy mb-2 flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Recommended Outfit
                      </h4>
                      <p className="text-navy/80 text-sm bg-neutral/5 p-3 rounded-lg">
                        {outfitInfo.outfit}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-navy mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Recommended Colors
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {outfitInfo.colors.map((color, idx) => {
                          // Get subtle background color based on color name
                          const getColorClass = (colorName) => {
                            const colorLower = colorName.toLowerCase();
                            if (colorLower.includes('yellow') || colorLower.includes('marigold')) {
                              return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                            } else if (colorLower.includes('orange') || colorLower.includes('coral')) {
                              return 'bg-orange-100 text-orange-800 border-orange-200';
                            } else if (colorLower.includes('red') || colorLower.includes('maroon')) {
                              return 'bg-red-100 text-red-800 border-red-200';
                            } else if (colorLower.includes('pink')) {
                              return 'bg-pink-100 text-pink-800 border-pink-200';
                            } else if (colorLower.includes('green') || colorLower.includes('emerald')) {
                              return 'bg-green-100 text-green-800 border-green-200';
                            } else if (colorLower.includes('blue') || colorLower.includes('navy')) {
                              return 'bg-blue-100 text-blue-800 border-blue-200';
                            } else if (colorLower.includes('purple') || colorLower.includes('royal')) {
                              return 'bg-purple-100 text-purple-800 border-purple-200';
                            } else if (colorLower.includes('gold') || colorLower.includes('champagne')) {
                              return 'bg-amber-100 text-amber-800 border-amber-200';
                            } else if (colorLower.includes('silver') || colorLower.includes('midnight')) {
                              return 'bg-slate-100 text-slate-800 border-slate-200';
                            } else if (colorLower.includes('black')) {
                              return 'bg-gray-100 text-gray-800 border-gray-200';
                            }
                            return 'bg-burgundy/15 text-burgundy border-burgundy/20';
                          };

                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getColorClass(color)}`}
                            >
                              {color}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shopping Guide Call-to-Action */}
          {current === 'friends' && (
            <div className="text-center">
              <div className="bg-burgundy/10 rounded-xl p-8 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/20 rounded-full mb-4">
                  <ShoppingBag className="w-8 h-8 text-burgundy" />
                </div>
                <h3 className="text-xl font-serif text-navy mb-3">Need Shopping Inspiration?</h3>
                <p className="text-navy/80 text-sm mb-6 leading-relaxed">
                  Discover the best stores in Indore, online shopping portals, and rental options 
                  to find your perfect wedding celebration outfits!
                </p>
                <button 
                  onClick={() => router.push('/friends/shopping')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-ivory rounded-lg hover:bg-burgundy/90 transition focus:outline-none focus:ring-2 focus:ring-burgundy"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Shopping Guide</span>
                </button>
              </div>
            </div>
          )}


        </div>
      </main>

      <Footer />
    </div>
  );
}

OutfitsPage.noLayout = true;
