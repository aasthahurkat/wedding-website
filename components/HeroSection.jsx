// components/HeroSection.jsx
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import tileData from "../data/tileData";
import Footer from "./Footer";

export default function HeroSection({ access }) {
  // burgundy/highlighted tiles (not used in welcome panel)
  const burgundyTiles = useMemo(
    () => tileData.filter((t) => t.highlight),
    []
  );

  return (
    <>
      {/* Welcome Panel */}
      <section className="bg-ivory px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-10">
          
          {/* Text Column */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <div className="flex justify-center md:justify-start">
              <div className="w-40 sm:w-56 md:w-60 mx-auto md:mx-0">
                <Image
                  src="/images/indore-plate.png"
                  alt="Indore Plate"
                  width={240}
                  height={144}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug">
              Welcome to our wedding website!
            </h1>
            <div className="prose prose-md sm:prose-lg mx-auto md:mx-0">
              <p>We’re thrilled to share this corner of the web with you—a space holding all the details, excitement, and sweet moments leading up to our big day.</p>
              <p>This December 2025, our journey brings us back to Indore—our home, our heritage, and where this next chapter begins.</p>
              <p>Let this site guide you through each celebration, every color, outfit choice, and a few heartfelt surprises we’ve tucked away.</p>
              <p>Built with love and a dash of nerdy flair—you’ll spot personal touches in the design, the themes, and our words. This isn’t just a schedule; it’s our story, shared with the people we cherish most.</p>
            </div>
            <div className="flex justify-center md:justify-start">
              <Link
                href={`/${access}/events`}
                className="inline-block px-6 py-2 bg-burgundy text-ivory font-semibold rounded-lg shadow hover:bg-burgundy-dark transition"
              >
                View Events
              </Link>
            </div>
          </div>

          {/* Photo Column */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 mt-8 md:mt-0">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/welcome-photo.jpg"
                alt="Couple by water"
                layout="responsive"
                width={800}
                height={600}
                objectFit="cover"
                objectPosition="center 20%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
