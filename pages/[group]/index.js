import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ACCESS_GROUPS } from '../../data/accessGroups';

export default function HomePage() {
  const router = useRouter();
  const { group } = router.query;
  const access = (group || '').toLowerCase();
  const valid = ACCESS_GROUPS.some((g) => g.key === access);

  // Redirect invalid groups to 404
  useEffect(() => {
    if (router.isReady && !valid) {
      router.replace('/404');
    }
  }, [router, router.isReady, valid]);

  // While loading or invalid, render nothing
  if (!router.isReady || !valid) return null;

  // Special case for bride and groom: use blue theme with same layout as friends
  if (access === 'bride' || access === 'groom') {
    return (
      <>
        <Head>
          <title>Aastha & Preetesh Wedding</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="flex flex-col min-h-screen">
          <Navbar currentGroup={access} />

          <div className="flex-grow">
            {/* Mobile/Tablet: single-column, centered welcome */}
            <section
              className="md:hidden px-4 pt-24 pb-12"
              style={{
                backgroundImage: "url('/blue-watercolor-bg.svg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="max-w-prose mx-auto space-y-4 text-center">
                <img
                  src="/hero-image.svg"
                  alt="Aastha & Preetesh"
                  className="mx-auto mb-8 w-full max-w-md drop-shadow-xl"
                />

                <img
                  src="/images/indore-plate.png"
                  alt="Indore license plate reading MP09 INDORE — December 2025"
                  className="w-40 mx-auto mb-4"
                />

                <div className="space-y-6 text-center text-navy">
                  {/* Opening blessing */}
                  <p className="text-base leading-relaxed px-4">
                    With hearts full of gratitude and the blessings of our elders, we joyfully invite you to witness and celebrate the sacred union of
                  </p>

                  {access === 'bride' ? (
                    <>
                      {/* Bride */}
                      <div className="space-y-2">
                        <h2 className="text-4xl font-prida text-sky-600">Aastha</h2>
                        <p className="text-sm leading-relaxed">
                          Granddaughter of Mrs. Parvati Devi Hurkat &<br />
                          Late Mr. Lakshminarayan ji Hurkat<br />
                          Daughter of Mr. Ram Hurkat & Mrs. Preeti Hurkat
                        </p>
                      </div>

                      {/* Ampersand */}
                      <div className="text-3xl font-serif text-sky-600">&</div>

                      {/* Groom */}
                      <div className="space-y-2">
                        <h2 className="text-4xl font-prida text-sky-600">Preetesh</h2>
                        <p className="text-sm leading-relaxed">
                          Grandson of Mr. Suresh ji Patodi & Late<br />
                          Mrs. Usha Patodi<br />
                          Son of Mr. Neetesh ji Patodi & Mrs. Preeti ji Patodi
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Groom */}
                      <div className="space-y-2">
                        <h2 className="text-4xl font-prida text-sky-600">Preetesh</h2>
                        <p className="text-sm leading-relaxed">
                          Grandson of Mr. Suresh Patodi & Late<br />
                          Mrs. Usha Patodi<br />
                          Son of Mr. Neetesh Patodi & Mrs. Preeti Patodi
                        </p>
                      </div>

                      {/* Ampersand */}
                      <div className="text-3xl font-serif text-sky-600">&</div>

                      {/* Bride */}
                      <div className="space-y-2">
                        <h2 className="text-4xl font-prida text-sky-600">Aastha</h2>
                        <p className="text-sm leading-relaxed">
                          Granddaughter of Mrs. Parvati Devi ji Hurkat &<br />
                          Late Mr. Lakshminarayan ji Hurkat<br />
                          Daughter of Mr. Ram ji Hurkat & Mrs. Preeti ji Hurkat
                        </p>
                      </div>
                    </>
                  )}

                  {/* Message */}
                  <p className="text-base leading-relaxed px-4 pt-2">
                    Two souls who grew up in the warmth of family, found friendship in laughter, and discovered love in each other.  <br /> As they begin this beautiful journey together, your presence would mean the world to us. Join us in blessing this union with your love and good wishes.
                  </p>

                  {/* Lotus Divider */}
                  <div className="pt-2 pb-1">
                    <img
                      src="/images/bride/center-petal.svg"
                      alt="Decorative divider"
                      className="w-16 h-16 mx-auto"
                    />
                  </div>

                  {/* Closing */}
                  <div className="space-y-1">
                    <p className="text-sm italic">With Love,</p>
                    {access === 'bride' ? (
                      <p className="text-lg font-serif">Parvati Devi Hurkat & Family</p>
                    ) : (
                      <div className="text-lg font-serif space-y-0.5">
                        <p>Suresh Patodi</p>
                        <p>Neetesh - Preeti Patodi</p>
                        <p>& Family</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3">
                  <a
                    href={`/${access}/events`}
                    className="inline-block px-6 py-3 min-h-[44px] bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                  >
                    View Events
                  </a>
                  {access === 'bride' && (
                    <a
                      href={`/${access}/family`}
                      className="inline-block px-6 py-3 min-h-[44px] bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                    >
                      Hosts & Family
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* Desktop: two-column welcome with vertical centering */}
            <section
              className="hidden md:block px-8 pt-24 pb-16"
              style={{
                backgroundImage: "url('/blue-watercolor-bg.svg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="container mx-auto flex items-center gap-12">
                {/* Left column */}
                <div className="w-1/2 flex flex-col items-center text-center">
                  <img
                    src="/images/indore-plate.png"
                    alt="Indore license plate reading MP09 INDORE — December 2025"
                    className="h-28 mb-4"
                  />

                  <div className="space-y-6 text-center text-navy max-w-[50ch]">
                    {/* Opening blessing */}
                    <p className="text-lg leading-relaxed">
                      With hearts full of gratitude and the blessings of our elders, we joyfully invite you to witness and celebrate the sacred union of
                    </p>

                    {access === 'bride' ? (
                      <>
                        {/* Bride */}
                        <div className="space-y-3">
                          <h2 className="text-5xl font-prida text-sky-600">Aastha</h2>
                          <p className="text-base leading-relaxed">
                            Granddaughter of Mrs. Parvati Devi Hurkat &<br />
                            Late Mr. Lakshminarayan ji Hurkat<br />
                            Daughter of Mr. Ram Hurkat & Mrs. Preeti Hurkat
                          </p>
                        </div>

                        {/* Ampersand */}
                        <div className="text-4xl font-serif text-sky-600">&</div>

                        {/* Groom */}
                        <div className="space-y-3">
                          <h2 className="text-5xl font-prida text-sky-600">Preetesh</h2>
                          <p className="text-base leading-relaxed">
                            Grandson of Mr. Suresh ji Patodi & Late<br />
                            Mrs. Usha Patodi<br />
                            Son of Mr. Neetesh ji Patodi & Mrs. Preeti ji Patodi
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Groom */}
                        <div className="space-y-3">
                          <h2 className="text-5xl font-prida text-sky-600">Preetesh</h2>
                          <p className="text-base leading-relaxed">
                            Grandson of Mr. Suresh Patodi & Late<br />
                            Mrs. Usha Patodi<br />
                            Son of Mr. Neetesh Patodi & Mrs. Preeti Patodi
                          </p>
                        </div>

                        {/* Ampersand */}
                        <div className="text-4xl font-serif text-sky-600">&</div>

                        {/* Bride */}
                        <div className="space-y-3">
                          <h2 className="text-5xl font-prida text-sky-600">Aastha</h2>
                          <p className="text-base leading-relaxed">
                            Granddaughter of Mrs. Parvati Devi ji Hurkat &<br />
                            Late Mr. Lakshminarayan ji Hurkat<br />
                            Daughter of Mr. Ram ji Hurkat & Mrs. Preeti ji Hurkat
                          </p>
                        </div>
                      </>
                    )}

                    {/* Message */}
                    <p className="text-base leading-relaxed pt-4">
                      Two souls who grew up in the warmth of family, found friendship in laughter, and discovered love in each other. As they begin this beautiful journey together, your presence would mean the world to us. Join us in blessing this union with your love and good wishes.
                    </p>

                    {/* Lotus Divider */}
                    <div className="pt-8 pb-2">
                      <img
                        src="/images/bride/center-petal.svg"
                        alt="Decorative divider"
                        className="w-20 h-20 mx-auto opacity-70"
                      />
                    </div>

                    {/* Closing */}
                    <div className="space-y-2">
                      <p className="text-base italic">With Love,</p>
                      {access === 'bride' ? (
                        <p className="text-2xl font-serif">Parvati Devi Hurkat & Family</p>
                      ) : (
                        <div className="text-2xl font-serif space-y-1">
                          <p>Suresh Patodi</p>
                          <p>Neetesh - Preeti Patodi</p>
                          <p>& Family</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <a
                      href={`/${access}/events`}
                      className="inline-block px-6 py-3 min-h-[44px] bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                    >
                      View Events
                    </a>
                    {access === 'bride' && (
                      <a
                        href={`/${access}/family`}
                        className="inline-block px-6 py-3 min-h-[44px] bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                      >
                        Hosts & Family
                      </a>
                    )}
                  </div>
                </div>

                {/* Right column */}
                <div className="w-1/2 flex justify-center">
                  <img
                    src="/hero-image.svg"
                    alt="Aastha & Preetesh"
                    className="w-full max-w-[480px] h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </section>
          </div>
          <Footer currentGroup={access} />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Aastha & Preetesh Wedding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen pt-8">
        <Navbar currentGroup={access} />

        <div className="flex-grow">
          {/* Mobile/Tablet: full-screen hero (always show photo) */}
          <section
            className="md:hidden h-screen bg-center bg-cover"
            style={{ backgroundImage: `url(${access === 'bride' ? "/images/welcome-photo-bride.png" : "/images/welcome-photo.JPG"})` }}
          />

          {/* Mobile/Tablet: single-column, centered welcome */}
          <section className="md:hidden bg-ivory px-4 py-12">
            <div className="max-w-prose mx-auto space-y-4 text-center">
              {access === 'bride' ? (
                <div className="max-w-[50ch] mx-auto text-center">
                  <div
                    className="rounded-xl border shadow-sm mx-auto text-navy/90"
                    style={{
                      borderColor: '#C5A15D',
                      backgroundImage: "url('/images/ivory-watercolor.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="px-5 py-6 sm:px-6 sm:py-7 space-y-3 font-ams-aditya">
                      <div className="text-sm text-burgundy tracking-wide">श्रीमते रामानुजाय नमः</div>
                      <div className="text-sm text-burgundy tracking-wide">श्री गणेशाय नमः</div>

                      <div className="text-base leading-relaxed text-navy/90 text-justify whitespace-pre-line">
                        सर्वेश्वर भगवान श्री पद्मावती वेंकटेशजी एवम अनन्त श्री विभूषित स्वामीजी श्री केशवाचार्यजी <span className="font-medium">बालक स्वामीजी</span> महाराज की कृपा से आपको आमंत्रित करने का शुभ अवसर प्राप्त हुआ है
                      </div>

                      <div className="text-2xl font-semibold text-burgundy">आस्था</div>
                      <div className="text-sm text-navy/80">सुपौत्री (श्री लक्ष्मीनारायणजी पार्वती देवी हुरकट) · सुपुत्री राम प्रीति हुरकट</div>

                      <div className="text-sm text-navy/70">एवं</div>

                      <div className="text-2xl font-semibold text-burgundy">प्रीतेश</div>
                      <div className="text-sm text-navy/80">सुपौत्र ( बड़े पापा ओर दादी का नाम) · सुपुत्र नीतेशजी प्रीतिजी पटौदी</div>

                      <div className="text-base leading-relaxed text-navy/90 text-justify whitespace-pre-line">
                        अग्निदेव एवम अनन्त देवताओं तथा आचार्य श्री की पावन उपस्थिति एवम पूर्वजों के आशीर्वाद के साथ विवाह के पवित्र बंधन में बंधने जा रहे है। हमें सादर आपको इस पवित्र मिलन समारोह में आमंत्रित करने का सौभाग्य प्राप्त हुआ है। कृपया अपनी गरिमामयी उपस्थिति एवम आशीर्वाद से हमें गौरवान्वित करें।
                      </div>

                      <div className="pt-2 text-sm text-navy/80">
                        विनीत<br />
                        श्रीमती पार्वती देवी हुरकट · राम प्रीति निष्ठा हेमांक हुरकट एवम परिवार
                      </div>
                    </div>
                  </div>
                </div>
              ) : access === 'groom' ? (
                <div className="max-w-[50ch] mx-auto text-center">
                  <img
                    src="/images/indore-plate.png"
                    alt="Indore license plate reading MP09 INDORE — December 2025"
                    className="w-40 mx-auto mb-3"
                  />
                  <div className="text-sm text-burgundy mb-2">श्री गणेशाय नमः</div>
                  <p className="mb-2">
                    With the blessings of our elders and the grace of God,
                    we cordially invite you to celebrate the auspicious occasion of
                    the wedding celebrations of our beloved children
                  </p>
                  <p className="mb-1">
                    <span className="text-xl font-serif text-burgundy">Preetesh</span> <br /> son of Mr. Neetesh Patodi & Mrs. Preeti Patodi
                  </p>
                  <p className="mb-1 font-medium">with</p>
                  <p className="mb-2">
                    <span className="text-xl font-serif text-burgundy">Aastha</span> <br /> daughter of Mr. Ram Hurkat & Mrs. Preeti Hurkat
                  </p>
                  <p className="mb-2">
                    In the divine presence of our family deities and with the blessings of our ancestors,<br />
                    we invite you to join us in this sacred union.
                  </p>
          
                  <p className="mb-2">
                    Kindly grace the occasion with your presence.<br />
                    Your blessings are humbly solicited.
                  </p>
                </div>
              ) : (
                // Original content for other groups
                <>
                  <img
                    src="/images/indore-plate.png"
                    alt="Indore license plate reading MP09 INDORE — December 2025"
                    className="w-40 mx-auto mb-4"
                  />

                  <h1 className="text-4xl sm:text-5xl font-serif text-navy">Welcome to our wedding website!</h1>

                  <div className="prose prose-md mx-auto space-y-4">
                    <div className="space-y-4">
                      We're so excited to finally share this little corner of the internet with you—a
                      space that holds all the details, emotions, and joyful chaos leading up to our big
                      day. <br />
                      <p>
                        In December 2025, we're coming home to Indore—where our roots are, where our
                        families are, and where this beautiful new chapter will begin. This site will be your guide to everything: the celebrations, the colors,
                        the outfits, and a few surprises we've planned along the way.{' '}
                      </p>
                      We've built this site with love (and a little nerdy fun)—you might spot bits of us
                      in the design, in the themes, and in the words. It's not just a schedule. It's our
                      story, shared with the people who matter most.
                      <p> We can't wait to dance, laugh, cry (a little), and celebrate with you. </p>
                    </div>

                    <p className="mt-6">
                      With love,
                      <br />
                      Aastha &amp; Preetesh
                    </p>
                  </div>
                </>
              )}

              <div className="mt-8 flex items-center justify-center gap-3">
                <a
                  href={`/${access}/events`}
                  className="inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2"
                >
                  View Events
                </a>
                {access === 'bride' && (
                  <a
                    href={`/${access}/family`}
                    className="inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2"
                  >
                    Hosts & Family
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Desktop: two-column welcome with vertical centering */}
          <section className="hidden md:block bg-ivory px-8 py-16">
            <div className="container mx-auto flex items-center gap-12">
              {/* Left column */}
              <div className="w-1/2 flex flex-col items-center text-center">
                {access === 'bride' ? (
                  // Printed-invite style panel for Bride
                  <div className="max-w-[52ch] mx-auto text-center">
                    <div
                      className="rounded-xl border shadow-sm mx-auto text-navy/90"
                      style={{
                        borderColor: '#C5A15D',
                        backgroundImage: "url('/images/ivory-watercolor.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="px-6 py-8 space-y-3 font-ams-aditya">
                        <div className="text-sm text-burgundy tracking-wide">श्रीमते रामानुजाय नमः</div>
                        <div className="text-sm text-burgundy tracking-wide">श्री गणेशाय नमः</div>

                        <div className="text-base leading-relaxed text-justify whitespace-pre-line">
                          सर्वेश्वर भगवान श्री पद्मावती वेंकटेशजी एवम अनन्त श्री विभूषित स्वामीजी श्री केशवाचार्यजी <span className="font-medium">बालक स्वामीजी</span> महाराज की कृपा से आपको आमंत्रित करने का शुभ अवसर प्राप्त हुआ है
                        </div>

                        <div className="text-2xl font-semibold text-burgundy">आस्था</div>
                        <div className="text-sm text-navy/80">सुपौत्री (श्री लक्ष्मीनारायणजी पार्वती देवी हुरकट) · सुपुत्री राम प्रीति हुरकट</div>

                        <div className="text-sm text-navy/70">एवं</div>

                        <div className="text-2xl font-semibold text-burgundy">प्रीतेश</div>
                        <div className="text-sm text-navy/80">सुपौत्र ( बड़े पापा ओर दादी का नाम) · सुपुत्र नीतेशजी प्रीतिजी पटौदी</div>

                        <div className="text-base leading-relaxed text-justify whitespace-pre-line">
                          अग्निदेव एवम अनन्त देवताओं तथा आचार्य श्री की पावन उपस्थिति एवम पूर्वजों के आशीर्वाद के साथ विवाह के पवित्र बंधन में बंधने जा रहे है। हमें सादर आपको इस पवित्र मिलन समारोह में आमंत्रित करने का सौभाग्य प्राप्त हुआ है। कृपया अपनी गरिमामयी उपस्थिति एवम आशीर्वाद से हमें गौरवान्वित करें।
                        </div>

                        <div className="pt-2 text-sm text-navy/80">
                          विनीत — श्रीमती पार्वती देवी हुरकट · राम प्रीति निष्ठा हेमांक हुरकट एवम परिवार
                        </div>
                      </div>
                    </div>
                  </div>
                ) : access === 'groom' ? (
                  // Traditional English Wedding Invitation for Groom (names swapped)
                  <div className="max-w-[50ch] mx-auto text-center">
                  <img
                    src="/images/indore-plate.png"
                    alt="Indore license plate reading MP09 INDORE — December 2025"
                    className="w-40 mx-auto mb-3"
                  />
                  <div className="text-sm text-burgundy mb-2">श्री गणेशाय नमः</div>
                  <p className="mb-2">
                    With the blessings of our elders and the grace of God,
                    we cordially invite you to celebrate the auspicious occasion of
                    the wedding celebrations of our beloved children
                  </p>
                  <p className="mb-1">
                    <span className="text-xl font-serif text-burgundy">Preetesh</span> <br /> son of Mr. Neetesh Patodi & Mrs. Preeti Patodi
                  </p>
                  <p className="mb-1 font-medium">with</p>
                  <p className="mb-2">
                    <span className="text-xl font-serif text-burgundy">Aastha</span> <br /> daughter of Mr. Ram Hurkat & Mrs. Preeti Hurkat
                  </p>
                  <p className="mb-2">
                    In the divine presence of our family deities and with the blessings of our ancestors,<br />
                    we invite you to join us in this sacred union.
                  </p>
          
                  <p className="mb-2">
                    Kindly grace the occasion with your presence.<br />
                    Your blessings are humbly solicited.
                  </p>
                </div>
                ) : (
                  // Original content for other groups
                  <>
                    <img
                      src="/images/indore-plate.png"
                      alt="Indore license plate reading MP09 INDORE — December 2025"
                      className="h-28 mb-4"
                    />

                    <h1 className="text-4xl sm:text-5xl font-serif text-navy mb-6">
                      Welcome to our wedding website!
                    </h1>

                    <div className="prose prose-lg max-w-[50ch] space-y-4">
                      <p>
                        We're so excited to finally share this little corner of the internet with you—a
                        space that holds all the details, emotions, and joyful chaos leading up to our
                        big day. <br />
                        <p>
                          In December 2025, we're coming home to Indore—where our roots are, where our
                          families are, and where this beautiful new chapter will begin. This site will be your guide to everything: the celebrations, the
                          colors, the outfits, and a few surprises we've planned along the way.{' '}
                        </p>
                        We've built this site with love (and a little nerdy fun)—you might spot bits of
                        us in the design, in the themes, and in the words. It's not just a schedule.
                        It's our story, shared with the people who matter most.
                        <p> We can't wait to dance, laugh, cry (a little), and celebrate with you. </p>
                      </p>

                      <p className="mt-6 leading-snug">
                        With love,
                        <br />
                        Aastha &amp; Preetesh
                      </p>
                    </div>
                  </>
                )}

                <div className="mt-8 flex items-center justify-center gap-4">
                  <a
                    href={`/${access}/events`}
                    className="inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2"
                  >
                    View Events
                  </a>
                  {access === 'bride' && (
                    <a
                      href={`/${access}/family`}
                      className="inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2"
                    >
                      Hosts & Family
                    </a>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="w-1/2">
                <img
                  src={access === 'bride' ? "/images/welcome-photo-bride.png" : "/images/welcome-photo.JPG"}
                  alt="Aastha & Preetesh smiling by the water"
                  className="rounded-lg shadow-lg w-full object-cover aspect-[4/5]"
                />
              </div>
            </div>
          </section>
        </div>
        <Footer currentGroup={access} />
      </div>
    </>
  );
}

HomePage.noLayout = true;
