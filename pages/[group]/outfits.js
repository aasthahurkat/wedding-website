// pages/[group]/outfits.js
import { useRouter } from 'next/router';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { events } from '../../data/events';
import { Crown, Sparkles, Camera, Clock, Palette, Lightbulb, ShoppingBag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import React from 'react'; // Added for React.useMemo
import { getGroupTheme } from '../../lib/groupThemes';

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
    'mehndi': 'bg-gradient-to-br from-emerald-50 via-yellow-50 to-orange-50 border-emerald-200',
    'mayra': 'bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border-rose-200',
    'sangeet': 'bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border-violet-200',
    'after-party': 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-slate-200',
    'baraat-welcome': 'bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 border-red-200',
    'baraat': 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-yellow-200',
    'phere': 'bg-gradient-to-br from-red-100 via-rose-100 to-amber-100 border-red-300',
    'family-reception': 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 border-slate-200',
    'reception': 'bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50 border-sky-200',
    // Combined tiles
    'baraat-phere': 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-yellow-200',
    'baraat-welcome-phere': 'bg-gradient-to-br from-red-100 via-rose-100 to-amber-100 border-red-300',
  };
  return eventColors[eventId] || 'bg-gradient-to-br from-ivory to-cream border-neutral/20';
};

const getThemedEventBackgroundColor = (eventId) => {
  const themed = {
    mehndi: 'bg-gradient-to-br from-[#ecf4ff] via-[#fef6d2] to-[#d6f0d5] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    mayra: 'bg-gradient-to-br from-[#ecf4ff] via-[#fde2ef] to-[#ffe7cc] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    sangeet: 'bg-gradient-to-br from-[#ecf4ff] via-[#e7ddff] to-[#f0f4ff] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    'after-party': 'bg-gradient-to-br from-[#e4efff] via-[#d9e3ff] to-[#ecf4ff] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    'baraat-welcome': 'bg-gradient-to-br from-[#ecf4ff] via-[#ffe9df] to-[#fdf0f2] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    baraat: 'bg-gradient-to-br from-[#ecf4ff] via-[#fff4de] to-[#ffe5e2] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    phere: 'bg-gradient-to-br from-[#ecf4ff] via-[#ffe5e8] to-[#fff2da] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    'family-reception': 'bg-gradient-to-br from-[#ecf4ff] via-[#f5f5f5] to-white border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    reception: 'bg-gradient-to-br from-[#e0f0ff] via-[#e8fbff] to-[#ecf4ff] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    'baraat-phere': 'bg-gradient-to-br from-[#ecf4ff] via-[#ffe9df] to-[#f7f1ff] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
    'baraat-welcome-phere': 'bg-gradient-to-br from-[#ecf4ff] via-[#ffe3ec] to-[#fff2da] border border-[#8ecae6]/30 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm',
  };
  return themed[eventId] || 'bg-gradient-to-br from-[#ecf4ff] to-white border border-[#8ecae6]/25 shadow-[0_16px_36px_rgba(15,48,95,0.14)] backdrop-blur-sm';
};

// Event-specific outfit recommendations
const eventOutfitGuide = {
  'mehndi': {
    title: 'Mehndi',
    outfit: 'Bright, joyful attire in breathable fabrics — think flowy silhouettes, vibrant prints, and styles that keep you comfortable for an afternoon of fun and celebration.',
    colors: ['Shades of Yellow', 'Shades of Green']
  },
  'mayra': {
    title: 'Mayra',
    outfit: 'Traditional Indian wear in bright, festive tones. Bandhani prints are a beautiful choice for the Mayra, adding a touch of heritage and elegance.',
    colors: ['Shades of Pink', 'Shades of Orange', 'Shades of Red']
  },
  'sangeet': {
    title: 'Sangeet Night',
    outfit: 'Dress for celebration! Think vibrant, festive attire with embellishments or sparkle. Choose something elegant yet comfortable that\'s comfortable for dancing!',
    colors: ['Jewel Tones', 'Gold', 'Silver']
  },
  'baraat-phere': {
    title: 'Baraat & Phere',
    outfit: 'Traditional Indian attire is recommended — vibrant sarees, lehengas, sherwanis, or kurtas. Comfortable footwear will make it easier to join in the joy of the procession and rituals.',
    colors: ['Red', 'Maroon', 'Blush Pink', 'Soft Pastels']
  },
  'baraat-welcome-phere': {
    title: 'Baraat Welcome & Phere',
    outfit: 'Traditional Indian attire is recommended — vibrant sarees, lehengas, sherwanis, or kurtas. Comfortable footwear will make it easier to join in the joy of the procession and rituals.',
    colors: ['Red', 'Maroon', 'Blush Pink', 'Soft Pastels']
  },
  'family-reception': {
    title: 'Family Reception',
    outfit: 'Elegant formalwear for an intimate family celebration.',
    colors: ['Blush', 'Ivory', 'Gold']
  },
    'reception': {
      title: 'Friends Reception',
      outfit: 'Festive evening wear. Options include sharp suits, tuxedos, elegant gowns, cocktail sarees — or simply whatever makes you feel polished and ready to celebrate.',
      colors: ['Navy', 'Burgundy', 'Black']
    }
  };

export default function OutfitsPage({ group }) {
  const router = useRouter();
  const current = group || router.query.group;
  const upperGroup = current.toUpperCase();
  const { themed: isThemed } = getGroupTheme(current);

  const contentWrapperClass = 'max-w-6xl mx-auto';

  const outfitCopyClass = isThemed
    ? 'text-[#1E4675] text-sm bg-white/70 border border-[#71B7E7]/20 p-3 rounded-lg backdrop-blur-sm'
    : 'text-navy/80 text-sm bg-neutral/5 p-3 rounded-lg';

  // Filter events based on group access
  const accessibleEvents = events.filter(event => 
    event.allowedGroups.includes(upperGroup)
  );

  // Helper: color class mapping
  const getColorClass = (colorName) => {
    const c = (colorName || '').toLowerCase().trim();
    // Specific two-word matches first
    if (c.includes('royal blue')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (c.includes('midnight blue')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (c.includes('dusty rose')) return 'bg-pink-100 text-pink-800 border-pink-200';
    if (c.includes('pastel')) return 'bg-purple-50 text-purple-700 border-purple-200';

    // Category terms
    if (c.includes('jewel')) return 'bg-violet-100 text-violet-800 border-violet-200';

    // Singles and families
    if (c.includes('yellow') || c.includes('marigold') || c.includes('amber') || c.includes('gold')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (c.includes('orange') || c.includes('coral') || c.includes('tangerine')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (c.includes('red') || c.includes('crimson') || c.includes('maroon')) return 'bg-red-100 text-red-800 border-red-200';
    if (c.includes('burgundy')) return 'bg-red-50 text-red-700 border-red-200';
    if (c.includes('pink') || c.includes('blush') || c.includes('rose')) return 'bg-pink-100 text-pink-800 border-pink-200';
    if (c.includes('green') || c.includes('emerald') || c.includes('mint') || c.includes('turquoise')) return 'bg-green-100 text-green-800 border-green-200';
    if (c.includes('blue') || c.includes('navy') || c.includes('sapphire')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (c.includes('purple') || c.includes('violet') || (c.includes('royal') && c.includes('purple'))) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (c.includes('silver') || c.includes('charcoal') || c.includes('slate')) return 'bg-slate-100 text-slate-800 border-slate-200';
    if (c.includes('black')) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (c.includes('white') || c.includes('pearl') || c.includes('ivory')) return 'bg-gray-50 text-gray-700 border-gray-200';
    return 'bg-burgundy/15 text-burgundy border-burgundy/20';
  };

  // Group-specific merging with original ordering
  const displayEvents = React.useMemo(() => {
    const idsToSkip = new Set();
    const result = [];

    for (const e of accessibleEvents) {
      if (idsToSkip.has(e.id)) continue;


      if (upperGroup === 'BRIDE') {
        // Combine baraat-welcome + family-reception into baraat-welcome-phere
        if ((e.id === 'baraat-welcome' || e.id === 'family-reception') &&
            accessibleEvents.some(ev => ev.id === 'baraat-welcome') &&
            accessibleEvents.some(ev => ev.id === 'family-reception')) {
          result.push({ id: 'baraat-welcome-phere' });
          idsToSkip.add('baraat-welcome');
          idsToSkip.add('family-reception');
          // Also skip phere if present in the block (since title says '& Phere')
          idsToSkip.add('phere');
          continue;
        }
      } else if (upperGroup === 'GROOM') {
        // Combine baraat + family-reception into baraat-phere
        if ((e.id === 'baraat' || e.id === 'family-reception') &&
            accessibleEvents.some(ev => ev.id === 'baraat') &&
            accessibleEvents.some(ev => ev.id === 'family-reception')) {
          result.push({ id: 'baraat-phere' });
          idsToSkip.add('baraat');
          idsToSkip.add('family-reception');
          idsToSkip.add('phere');
          continue;
        }
      } else if (upperGroup === 'FRIENDS' || upperGroup === 'INVITEES' || upperGroup === 'GUESTS') {
        // Combine baraat + phere into baraat-phere, ensure reception comes after
        if ((e.id === 'baraat' || e.id === 'phere') &&
            accessibleEvents.some(ev => ev.id === 'baraat') &&
            accessibleEvents.some(ev => ev.id === 'phere')) {
          result.push({ id: 'baraat-phere' });
          idsToSkip.add('baraat');
          idsToSkip.add('phere');
          continue;
        }
      }

      result.push(e);
    }

    // For FRIENDS/GUESTS, ensure reception is after the combined tile (already by order, but safeguard)
    if (upperGroup === 'FRIENDS' || upperGroup === 'GUESTS') {
      const rec = result.filter(r => r.id === 'reception');
      const others = result.filter(r => r.id !== 'reception');
      return [...others, ...rec];
    }

    return result;
  }, [accessibleEvents, upperGroup]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={current} />
      <main className={`flex-1 relative ${isThemed ? '' : 'bg-cream'}`}>
        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          @keyframes metallic-shine { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
          .fabric-overlay { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; }
          .silk-texture { background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%); background-size: 200% 200%; animation: shimmer 3s ease-in-out infinite; }
          .velvet-texture { background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 4px 4px; }
          .metallic-texture { background: linear-gradient(45deg, rgba(255,255,255,0.4), transparent, rgba(255,255,255,0.4)); background-size: 20px 20px; animation: metallic-shine 2s ease-in-out infinite; }
          .cotton-texture { background: repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px); }
          .tooltip { visibility: hidden; opacity: 0; transition: all 0.3s ease; transform: translateY(10px); }
          .tooltip-trigger:hover .tooltip { visibility: visible; opacity: 1; transform: translateY(0); }
        `}</style>

        {!isThemed && (
          <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm" aria-hidden="true" />
        )}
        <div className="relative z-10 pt-24 pb-12 px-4">
          <div className={contentWrapperClass}>
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
              {displayEvents.map((event) => {
                const outfitInfo = eventOutfitGuide[event.id];
                if (!outfitInfo) return null;
                const cardBackground = isThemed
                  ? getThemedEventBackgroundColor(event.id)
                  : getEventBackgroundColor(event.id);

                return (
                  <div
                    key={event.id}
                    className={`rounded-xl p-6 hover:shadow-xl transition-all duration-300 ${cardBackground}`}
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
                      <p className={outfitCopyClass}>
                        {outfitInfo.outfit}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-navy mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Recommended Colors
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {(outfitInfo.colors || []).map((color, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getColorClass(color)}`}
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 mb-8 mt-12">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>💡 Pro Tip:</strong> Bring extra outfits! Between our main events, expect smaller family rituals, lots of mingling, and those moments when you'll want to swap your heavier outfits for something breezier. Your future self will thank you. 😉
              </p>
            </div>
          </div>

          {/* Shopping Guide Call-to-Action - COMMENTED OUT FOR NOW */}
          {/* {current === 'friends' && (
            <div className="text-center mt-12">
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
          )} */}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

OutfitsPage.noLayout = true;
