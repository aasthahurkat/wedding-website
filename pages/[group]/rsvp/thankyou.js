import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heart, PartyPopper, Plane, Sparkles } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ThankYouExcited() {
  const router = useRouter();
  const group = (router.query.group || '').toLowerCase();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />

      <main className="flex-1 bg-cream pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-6">
            <PartyPopper className="w-8 h-8 text-burgundy mx-auto mb-4" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-6">
            We're So Excited!
          </h1>

          <p className="text-navy/80 mb-8 leading-relaxed">
            Thank you for your RSVP! We can't wait to celebrate with you.
            <br />
            Here are some next steps to help you prepare for our special day.
          </p>

          <div className="space-y-4 mb-8">
            <Link
              href={`/${group}/travel`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-burgundy text-white font-medium rounded-lg hover:bg-burgundy/90 transition-colors"
            >
              <Plane className="w-4 h-4" />
              <span>Travel Information</span>
            </Link>

            <Link
              href={`/${group}/outfits`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-burgundy text-white font-medium rounded-lg hover:bg-burgundy/90 transition-colors ml-0 sm:ml-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Outfit Recommendations</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-neutral/10 p-6">
            <h3 className="text-lg font-semibold text-navy mb-3">Stay Connected</h3>
            <p className="text-navy/70 mb-4">
              We'll send updates about the celebration and any last-minute details via
              WhatsApp.
            </p>
            <a
              href="https://wa.me/your-whatsapp-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors gap-2"
            >
              <span>Join WhatsApp Group</span>
              <span className="transition-transform hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-navy/60">
            <Heart className="w-4 h-4 text-burgundy" />
            <span className="text-sm">Can't wait to celebrate with you! 💕</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

ThankYouExcited.noLayout = true;
