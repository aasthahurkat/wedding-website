import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heart, PartyPopper } from 'lucide-react';
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

          <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-6">We&apos;re So Excited!</h1>

          <p className="text-navy/80 mb-8 leading-relaxed">
            Thank you for your RSVP! We can&apos;t wait to celebrate with you.
            <br />
            Here are some next steps to help you prepare for our special day.
          </p>

          <div className="space-y-4 mb-8">
            <Link
              href={`/${group}/travel`}
              className="inline-block w-full sm:w-auto px-8 py-3 bg-burgundy text-white font-medium rounded-lg hover:bg-burgundy/90 transition-colors"
            >
              View Travel Information
            </Link>

            <Link
              href={`/${group}/outfits`}
              className="inline-block w-full sm:w-auto px-8 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy/90 transition-colors ml-0 sm:ml-4"
            >
              Check Outfit Guidelines
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-neutral/10 p-6">
            <h3 className="text-lg font-semibold text-navy mb-3">Stay Connected</h3>
            <p className="text-navy/70 mb-4">
              We&apos;ll send updates about the celebration and any last-minute details via
              WhatsApp.
            </p>
            <a
              href="https://wa.me/your-whatsapp-group-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Join WhatsApp Group
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-navy/60">
            <Heart className="w-4 h-4 text-burgundy" />
            <span className="text-sm">Can&apos;t wait to celebrate with you! 💕</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

ThankYouExcited.noLayout = true;
