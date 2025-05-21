import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ACCESS_GROUPS } from "../../data/accessGroups";

export default function HomePage() {
  const router = useRouter();
  const { group } = router.query;
  const access = (group || "").toLowerCase();
  const valid = ACCESS_GROUPS.some((g) => g.key === access);

  // Redirect invalid groups to 404
  useEffect(() => {
    if (router.isReady && !valid) {
      router.replace("/404");
    }
  }, [router.isReady, valid]);

  // While loading or invalid, render nothing
  if (!router.isReady || !valid) return null;

  return (
    <>
      <Head>
        <title>Aastha & Preetesh Wedding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen pt-8">
        <Navbar currentGroup={access} />

        <div className="flex-grow">
          {/* Mobile/Tablet: full-screen hero */}
          <section
            className="md:hidden h-screen bg-center bg-cover"
            style={{ backgroundImage: "url('/images/welcome-photo.JPG')" }}
          />

          {/* Mobile/Tablet: single-column, centered welcome */}
          <section className="md:hidden bg-ivory px-4 py-12">
            <div className="max-w-prose mx-auto space-y-4 text-center">
              <img
                src="/images/indore-plate.png"
                alt="Indore license plate reading MP09 INDORE — December 2025"
                className="w-40 mx-auto mb-4"
              />

              <h1 className="text-3xl font-serif text-navy">
                Welcome to our wedding website!
              </h1>

              <div className="prose prose-md mx-auto space-y-4">
                <p>
                 We’re so excited to finally share this little corner of the internet with you—a space that holds all the details, emotions, and joyful chaos leading up to our big day. <br />

<p>In December 2025, we’re coming home to Indore—where our roots are, where our families are, and where this beautiful new chapter will begin.

Over the next few days, this site will be your guide to everything: the celebrations, the colors, the outfits, and a few surprises we’ve planned along the way. </p>

We’ve built this site with love (and a little nerdy fun)—you might spot bits of us in the design, in the themes, and in the words. It’s not just a schedule. It’s our story, shared with the people who matter most.

<p> We can’t wait to dance, laugh, cry (a little), and celebrate with you. </p>
                </p>

                <p className="mt-6">
                  With love,
                  <br />
                  Aastha &amp; Preetesh
                </p>
              </div>

              <a
                href={`/${access}/events`}
                className="mt-8 inline-block px-8 py-3 bg-burgundy text-ivory rounded-full shadow hover:bg-burgundy-dark"
              >
                View Events
              </a>
            </div>
          </section>

          {/* Desktop: two-column welcome with vertical centering */}
          <section className="hidden md:block bg-ivory px-8 py-16">
            <div className="container mx-auto flex items-center gap-12">
              {/* Left column */}
              <div className="w-1/2 flex flex-col items-center text-center">
                <img
                  src="/images/indore-plate.png"
                  alt="Indore license plate reading MP09 INDORE — December 2025"
                  className="h-28 mb-4"
                />

                <h1 className="text-4xl font-serif text-navy mb-6">
                  Welcome to our wedding website!
                </h1>

                <div className="prose prose-lg max-w-[50ch] space-y-4">
                  <p>
                  
We’re so excited to finally share this little corner of the internet with you—a space that holds all the details, emotions, and joyful chaos leading up to our big day. <br />

<p>In December 2025, we’re coming home to Indore—where our roots are, where our families are, and where this beautiful new chapter will begin.

Over the next few days, this site will be your guide to everything: the celebrations, the colors, the outfits, and a few surprises we’ve planned along the way. </p>

We’ve built this site with love (and a little nerdy fun)—you might spot bits of us in the design, in the themes, and in the words. It’s not just a schedule. It’s our story, shared with the people who matter most.

<p> We can’t wait to dance, laugh, cry (a little), and celebrate with you. </p>

                  </p>

                  <p className="mt-6 leading-snug">
                    With love,
                    <br />
                    Aastha
                 
                    &amp; Preetesh
                  </p>
                </div>

                <a
                  href={`/${access}/events`}
                  className="mt-8 inline-block px-8 py-3 bg-burgundy text-ivory rounded-full shadow hover:bg-burgundy-dark"
                >
                  View Events
                </a>
              </div>

              {/* Right column */}
              <div className="w-1/2">
                <img
                  src="/images/welcome-photo.jpg"
                  alt="Aastha & Preetesh smiling by the water"
                  className="rounded-lg shadow-lg w-full object-cover aspect-[4/5]"
                />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

HomePage.noLayout = true;
