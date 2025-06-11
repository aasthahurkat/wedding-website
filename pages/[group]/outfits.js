// pages/[group]/outfits.js
import { useRouter } from 'next/router';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Crown, Sparkles, Calendar, Bell } from 'lucide-react';
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
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-4xl mx-auto">
          
          {/* Coming Soon Content */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Crown className="w-16 h-16 text-burgundy" />
                <Sparkles className="w-6 h-6 text-burgundy/60 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif text-navy mb-6">
              Dress Code & Outfit Guide
            </h1>
            
            <div className="bg-burgundy/10 border border-burgundy/20 rounded-xl p-8 max-w-2xl mx-auto mb-8">
              <div className="flex justify-center mb-4">
                <Calendar className="w-8 h-8 text-burgundy" />
              </div>
              <h2 className="text-xl font-serif text-burgundy mb-4">Coming Soon!</h2>
              <p className="text-navy/80 leading-relaxed mb-6">
                We're putting together a beautiful guide with outfit recommendations, color palettes, 
                and styling tips for each of our celebration events. This will help you look and feel 
                amazing throughout our wedding festivities!
              </p>
              
              <div className="bg-white/60 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-navy mb-3">What's Coming:</h3>
                <ul className="text-sm text-navy/70 space-y-2 text-left">
                  <li>• Event-specific dress code recommendations</li>
                  <li>• Color palette suggestions for each celebration</li>
                  <li>• Shopping tips and local store recommendations</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-burgundy">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">We'll update this page soon with all the details!</span>
              </div>
            </div>

            {/* Contact for urgent questions */}
            <div className="mt-8">
              <p className="text-navy/60 text-sm">
                Have urgent outfit questions? Feel free to reach out to us directly!
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
