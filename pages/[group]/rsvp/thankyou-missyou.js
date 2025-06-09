import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heart, MessageCircleHeart, Camera } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ThankYouMissYou() {
  const router = useRouter();
  const group = (router.query.group || '').toLowerCase();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />

      <main className="flex-1 bg-cream pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-6">
            <MessageCircleHeart className="w-8 h-8 text-burgundy mx-auto mb-4" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-6">
            We'll Miss You!
          </h1>

          <p className="text-navy/80 mb-8 leading-relaxed">
            Thank you for letting us know. We completely understand and wish you could be there with
            us.
            <br />
            You'll be in our hearts on our special day! 💕
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-neutral/10 p-6 mb-8">
            <h3 className="text-lg font-semibold text-navy mb-3">Stay Connected</h3>
            <p className="text-navy/70 mb-4">
              Even though you can't join us in person, we'd love to share some moments
              with you through photos and updates.
            </p>
            <Link
              href={`/${group}/gallery`}
              className="inline-flex items-center px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>View Our Gallery</span>
              <span className="transition-transform hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-navy/60">
            <Heart className="w-4 h-4 text-burgundy" />
            <span className="text-sm">Sending you love from our celebration! 💕</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

ThankYouMissYou.noLayout = true;
