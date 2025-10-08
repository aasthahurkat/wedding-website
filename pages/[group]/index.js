import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { getGroupTheme } from '../../lib/groupThemes';

export default function HomePage() {
  const router = useRouter();
  const { group } = router.query;
  const fallbackGroup = router.asPath?.split('/')?.[1] || '';
  const access = (group || fallbackGroup || '').toLowerCase();
  const valid = ACCESS_GROUPS.some((g) => g.key === access);
  const theme = getGroupTheme(access);
  const isThemed = theme?.themed;

  // Redirect invalid groups to 404
  useEffect(() => {
    if (router.isReady && !valid) {
      router.replace('/404');
    }
  }, [router, router.isReady, valid]);

  // While loading or invalid, render nothing
  if (!router.isReady || !valid) return null;

  return (
    <>
      <Head>
        <title>Aastha & Preetesh Wedding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`relative flex min-h-screen flex-col pt-8 ${isThemed ? 'overflow-hidden' : ''}`}
        style=
          {isThemed
            ? {
                backgroundColor: theme.background,
                backgroundImage: `url('${theme.texture}')`,
                backgroundRepeat: 'repeat',
                backgroundSize: '540px',
              }
            : undefined}
      >
        {isThemed && (
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-80 mix-blend-normal"
            style={{
              backgroundImage: `url('${theme.gradient}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
            aria-hidden="true"
          />
        )}

        <Navbar currentGroup={access} />

        <div className="flex-grow">
          {/* Mobile/Tablet: full-screen hero */}
          <section
            className={`relative md:hidden ${isThemed ? 'mt-20 h-[80vh] min-h-[520px] overflow-hidden rounded-b-[56px] shadow-2xl' : 'mt-0 h-screen'} bg-center bg-cover`}
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${access === 'bride' ? "/images/welcome-photo.JPG" : "/images/welcome-photo.JPG"})`,
              }}
            />
            {isThemed && (
              <div
                className="absolute inset-0 bg-gradient-to-t from-[rgba(15,48,95,0.55)] via-transparent to-transparent"
                aria-hidden="true"
              />
            )}
            {isThemed && (
              <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
                
              </div>
            )}
          </section>

          {/* Mobile/Tablet: single-column, centered welcome */}
          <section className={`md:hidden px-4 py-12 ${isThemed ? 'pt-16' : 'bg-ivory'}`}>
            <div className="mx-auto max-w-prose space-y-6 text-center">
              {access === 'bride' ? (
                isThemed ? (
                  <figure className="mx-auto w-full max-w-[420px] sm:max-w-[460px] animate-fade-up">
                    <Image
                      src="/images/bride/bride-final.svg"
                      alt="Wedding invitation for Aastha and Preetesh with blessings from elders and family deities"
                      width={393}
                      height={719}
                      priority
                      className="w-full h-auto"
                    />
                    <figcaption className="sr-only">
                      श्रीमते रामानुजाय नमः । श्री गणेशाय नमः । सर्वेश्वर भगवान श्री पद्मावती वेंकटेशजी एवम अनन्त श्री विभूषित स्वामीजी श्री केशवाचार्यजी बालक स्वामीजी महाराज की कृपा से आपको आमंत्रित करने का शुभ अवसर प्राप्त हुआ है। आस्था प्रपौत्री श्री लक्ष्मीनारायणजी पार्वती देवी हुरकट, पुत्री राम प्रीति हुरकट एवं प्रीतेश प्रपौत्र सुरेशजी उषाजी पाटोदी, पुत्र नितेशजी प्रीतिजी पाटोदी। विनीत - श्रीमती पार्वती देवी हुरकट, राम प्रीति निष्ठा हेमांक हुरकट एवम परिवार।
                    </figcaption>
                  </figure>
                ) : (
                  <div className="relative mx-auto max-w-[50ch] text-center">
                    <div
                      className="rounded-xl border shadow-sm text-navy/90"
                      style={{
                        borderColor: '#C5A15D',
                        backgroundImage: "url('/images/ivory-watercolor.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="px-5 py-6 sm:px-6 sm:py-7 space-y-3">
                        <div className="text-sm text-burgundy tracking-wide">श्रीमते रामानुजाय नमः</div>
                        <div className="text-sm text-burgundy tracking-wide">श्री गणेशाय नमः</div>

                        <div className="text-base leading-relaxed text-navy/90 text-justify whitespace-pre-line">
                          सर्वेश्वर भगवान श्री पद्मावती वेंकटेशजी एवम अनन्त श्री विभूषित स्वामीजी श्री केशवाचार्यजी <span className="font-medium">बालक स्वामीजी</span> महाराज की कृपा से आपको आमंत्रित करने का शुभ अवसर प्राप्त हुआ है
                        </div>

                        <div className="text-2xl font-serif text-burgundy">आस्था</div>
                        <div className="text-sm text-navy/80">सुपौत्री (श्री लक्ष्मीनारायणजी पार्वती देवी हुरकट) · सुपुत्री राम प्रीति हुरकट</div>

                        <div className="text-sm text-navy/70">एवं</div>

                        <div className="text-2xl font-serif text-burgundy">प्रीतेश</div>
                        <div className="text-sm text-navy/80">सुपौत्र ( बड़े पापा ओर दादी का नाम) · सुपुत्र नीतेशजी प्रीतिजी पटौदी</div>

                        <div className="text-base leading-relaxed text-navy/90 text-justify whitespace-pre-line">
                          अग्निदेव एवम अनन्त देवताओं तथा आचार्य श्री की पावन उपस्थिति एवम पूर्वजों के आशीर्वाद के साथ विवाह के पवित्र बंधन में बंधने जा रहे है। हमें सादर आपको इस पवित्र मिलन समारोह में आमंत्रित करने का सौभाग्य प्राप्त हुआ है। कृपया अपनी गरिमामयी उपस्थिति एवम आशीर्वाद से हमें गौरवान्वित करें।
                        </div>

                        <div className="pt-2 text-sm text-navy/80">
                          विनीत
                          <br />
                          श्रीमती पार्वती देवी हुरकट · राम प्रीति निष्ठा हेमांक हुरकट एवम परिवार
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : access === 'groom' ? (
              <div className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px] text-center">
                <div
                  className={`relative mx-auto overflow-hidden ${
                    isThemed ? 'rounded-[48px]' : 'rounded-xl border shadow-sm text-navy/90'
                  }`}
                  style=
                    {isThemed
                      ? {
                          color: theme.textPrimary,
                          backgroundImage: "url('/images/bride/message-box.svg')",
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center',
                          minHeight: '560px',
                        }
                      : undefined}
                >
                    {isThemed && (
                      <div className="pointer-events-none absolute inset-3 rounded-[44px] border border-[#71B7E7]/30" />
                    )}
                    {!isThemed && (
                      <img
                        src="/images/indore-plate.png"
                        alt="Indore license plate reading MP09 INDORE — December 2025"
                        className="w-40 mx-auto mb-3"
                      />
                    )}
                    {isThemed && (
                      <img
                        src="/images/bride/initials.svg"
                        alt="Aastha & Preetesh initials"
                        className="mx-auto w-20 sm:w-24 mt-8"
                      />
                    )}
                    <div className={`${isThemed ? 'relative space-y-5 text-left md:text-center px-8 sm:px-10 pt-8 pb-16' : ''}`}>
                      <div className={`text-sm ${isThemed ? 'font-semibold text-center text-[#1D4F84]' : 'text-burgundy mb-2'}`}>
                        श्री गणेशाय नमः
                      </div>
                      <p className={`${isThemed ? 'mx-auto max-w-[38ch] text-[#1E4675] opacity-90 leading-8 tracking-[0.015em] text-justify' : 'mb-2'}`}>
                        With the blessings of our elders and the grace of God,
                        we cordially invite you to celebrate the auspicious occasion of the wedding
                        celebrations of our beloved children
                      </p>
                      <p className={`${isThemed ? 'text-[#1E4675] font-medium text-center' : 'mb-1'}`}>
                        <span className={`text-xl font-serif ${isThemed ? 'text-[#1D4F84]' : 'text-burgundy'}`}>Preetesh</span>
                        <br />
                        son of Mr. Neetesh Patodi &amp; Mrs. Preeti Patodi
                      </p>
                      <p className={`${isThemed ? 'text-[#3B6BA3] uppercase tracking-[0.4em] text-sm text-center' : 'mb-1 font-medium'}`}>
                        with
                      </p>
                      <p className={`${isThemed ? 'text-[#1E4675] font-medium text-center' : 'mb-2'}`}>
                        <span className={`text-xl font-serif ${isThemed ? 'text-[#1D4F84]' : 'text-burgundy'}`}>Aastha</span>
                        <br />
                        daughter of Mr. Ram Hurkat &amp; Mrs. Preeti Hurkat
                      </p>
                      <p className={`${isThemed ? 'mx-auto max-w-[38ch] text-[#1E4675] opacity-90 leading-8 tracking-[0.015em] text-justify' : 'mb-2'}`}>
                        In the divine presence of our family deities and with the blessings of our
                        ancestors,
                        <br />
                        we invite you to join us in this sacred union.
                      </p>
                      <p className={`${isThemed ? 'text-[#1E4675] font-medium text-center' : 'mb-2'}`}>
                        Kindly grace the occasion with your presence.
                        <br />
                        Your blessings are humbly solicited.
                      </p>
                      {isThemed && (
                        <div className="flex flex-col items-center justify-center gap-3 pt-4">
                          <img
                            src={theme.lotusDivider}
                            alt="Lotus divider"
                            className="w-28 sm:w-40 opacity-85 animate-fade-up"
                          />
                          <span className="h-px w-24 bg-gradient-to-r from-transparent via-[#71B7E7]/80 to-transparent" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Original content for other groups
                <>
                  <img
                    src="/images/indore-plate.png"
                    alt="Indore license plate reading MP09 INDORE — December 2025"
                    className="w-40 mx-auto mb-4"
                  />

                  <h1 className="text-3xl font-serif text-navy">Welcome to our wedding website!</h1>

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
                  className={`${
                    isThemed
                      ? 'inline-block px-6 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-[#1D4F84] to-[#71B7E7] text-white shadow-[0_20px_44px_rgba(29,79,132,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_54px_rgba(29,79,132,0.36)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71B7E7]'
                      : 'inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2'
                  } ${isThemed ? 'animate-fade-up delay-[120ms]' : ''}`}
                >
                  View Events
                </a>
                {access === 'bride' && (
                  <a
                    href={`/${access}/family`}
                    className={`${
                      isThemed
                        ? 'inline-block px-6 py-3 min-h-[44px] rounded-full border border-[#1D4F84] border-opacity-40 bg-white/80 text-[#1D4F84] shadow-[0_14px_30px_rgba(29,79,132,0.18)] transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_38px_rgba(29,79,132,0.22)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71B7E7] backdrop-blur-sm'
                        : 'inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2'
                    } ${isThemed ? 'animate-fade-up delay-[200ms]' : ''}`}
                  >
                    Hosts &amp; Family
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Desktop: two-column welcome with vertical centering */}
          <section className={`relative hidden md:block px-8 ${isThemed ? 'py-20' : 'py-16 bg-ivory'}`}>
            {isThemed &&
              theme.lotusCorners?.map((lotus, index) => (
                <img
                  key={`${lotus.src}-${index}`}
                  src={lotus.src}
                  alt="Blue lotus accent"
                  className={`${lotus.className} animate-float-slow`}
                  aria-hidden="true"
                />
              ))}

            <div className={`container mx-auto flex items-center gap-12 ${isThemed ? 'lg:gap-16' : ''}`}>
              {/* Left column */}
              <div className="w-1/2 flex flex-col items-center text-center">
                {access === 'bride' ? (
                  isThemed ? (
                    <figure className="mx-auto w-full max-w-[460px] animate-fade-up text-center">
                      <Image
                        src="/images/bride/bride-final.svg"
                        alt="Wedding invitation for Aastha and Preetesh with blessings from elders and family deities"
                        width={393}
                        height={719}
                        className="w-full h-auto"
                        priority
                      />
                      <figcaption className="sr-only">
                        श्रीमते रामानुजाय नमः । श्री गणेशाय नमः । सर्वेश्वर भगवान श्री पद्मावती वेंकटेशजी एवम अनन्त श्री विभूषित स्वामीजी श्री केशवाचार्यजी बालक स्वामीजी महाराज की कृपा से आपको आमंत्रित करने का शुभ अवसर प्राप्त हुआ है। आस्था प्रपौत्री श्री लक्ष्मीनारायणजी पार्वती देवी हुरकट, पुत्री राम प्रीति हुरकट एवं प्रीतेश प्रपौत्र सुरेशजी उषाजी पाटोदी, पुत्र नितेशजी प्रीतिजी पाटोदी। विनीत - श्रीमती पार्वती देवी हुरकट, राम प्रीति निष्ठा हेमांक हुरकट एवम परिवार।
                      </figcaption>
                    </figure>
                  ) : (
                    <div className="relative w-full max-w-[54ch] text-center">
                      <div
                        className="rounded-xl border shadow-sm text-navy/90"
                        style={{
                          borderColor: '#C5A15D',
                          backgroundImage: "url('/images/ivory-watercolor.png')",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="px-6 py-8 space-y-3 text-base leading-relaxed">
                          <div className="text-sm text-burgundy tracking-wide">श्रीमते रामानुजाय नमः</div>
                          <div className="text-sm text-burgundy tracking-wide">श्री गणेशाय नमः</div>

                          <div className="text-justify whitespace-pre-line">
                            सर्वेश्वर भगवान श्री पद्मावती वेंकटेशजी एवम अनन्त श्री विभूषित स्वामीजी श्री केशवाचार्यजी <span className="font-medium">बालक स्वामीजी</span> महाराज की कृपा से आपको आमंत्रित करने का शुभ अवसर प्राप्त हुआ है
                          </div>

                          <div className="text-3xl font-serif text-burgundy">आस्था</div>
                          <div className="text-sm text-navy/80">सुपौत्री (श्री लक्ष्मीनारायणजी पार्वती देवी हुरकट) · सुपुत्री राम प्रीति हुरकट</div>

                          <div className="text-sm text-navy/70">एवं</div>

                          <div className="text-3xl font-serif text-burgundy">प्रीतेश</div>
                          <div className="text-sm text-navy/80">सुपौत्र ( बड़े पापा ओर दादी का नाम) · सुपुत्र नीतेशजी प्रीतिजी पटौदी</div>

                          <div className="text-justify whitespace-pre-line">
                            अग्निदेव एवम अनन्त देवताओं तथा आचार्य श्री की पावन उपस्थिति एवम पूर्वजों के आशीर्वाद के साथ विवाह के पवित्र बंधन में बंधने जा रहे है। हमें सादर आपको इस पवित्र मिलन समारोह में आमंत्रित करने का सौभाग्य प्राप्त हुआ है। कृपया अपनी गरिमामयी उपस्थिति एवम आशीर्वाद से हमें गौरवान्वित करें।
                          </div>

                          <div className="pt-2 text-sm text-navy/80">
                            विनीत — श्रीमती पार्वती देवी हुरकट · राम प्रीति निष्ठा हेमांक हुरकट एवम परिवार
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : access === 'groom' ? (
                  <div className="relative w-full max-w-[50ch] text-center">
                    {isThemed && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                        <img
                          src={theme.crest}
                          alt="Aastha & Preetesh crest"
                          className="mx-auto w-32 drop-shadow-[0_18px_50px_rgba(29,79,132,0.35)]"
                        />
                      </div>
                    )}
                    <div
                      className={`relative overflow-hidden ${
                        isThemed
                          ? 'rounded-[56px] border border-white/70 bg-white/75 px-10 py-14 shadow-[0_32px_80px_rgba(29,79,132,0.28)] backdrop-blur-xl text-left'
                          : ''
                      }`}
                      style={isThemed ? { color: theme.textPrimary } : undefined}
                    >
                      {!isThemed && (
                        <img
                          src="/images/indore-plate.png"
                          alt="Indore license plate reading MP09 INDORE — December 2025"
                          className="w-40 mx-auto mb-3"
                        />
                      )}
                      {isThemed && (
                        <div className="flex justify-center pb-8">
                          <img
                            src="/images/indore-plate.png"
                            alt="Indore license plate reading MP09 INDORE — December 2025"
                            className="w-36"
                          />
                        </div>
                      )}
                      <div className={`${isThemed ? 'space-y-5 text-lg leading-8 text-left' : 'space-y-2'}`}>
                        <div className={`text-sm ${isThemed ? 'font-semibold text-center text-[#1D4F84]' : 'text-burgundy mb-2'}`}>
                          श्री गणेशाय नमः
                        </div>
                        <p className={`${isThemed ? 'text-[#1E4675] opacity-90 leading-relaxed text-justify' : 'mb-2'}`}>
                          With the blessings of our elders and the grace of God,
                          we cordially invite you to celebrate the auspicious occasion of the wedding
                          celebrations of our beloved children
                        </p>
                        <p className={`${isThemed ? 'text-[#1E4675] font-medium text-center' : 'mb-1'}`}>
                          <span className={`text-2xl font-serif ${isThemed ? 'text-[#1D4F84]' : 'text-burgundy'}`}>Preetesh</span>
                          <br />
                          son of Mr. Neetesh Patodi &amp; Mrs. Preeti Patodi
                        </p>
                        <p className={`${isThemed ? 'text-[#3B6BA3] uppercase tracking-[0.45em] text-sm text-center' : 'mb-1 font-medium'}`}>
                          with
                        </p>
                        <p className={`${isThemed ? 'text-[#1E4675] font-medium text-center' : 'mb-2'}`}>
                          <span className={`text-2xl font-serif ${isThemed ? 'text-[#1D4F84]' : 'text-burgundy'}`}>Aastha</span>
                          <br />
                          daughter of Mr. Ram Hurkat &amp; Mrs. Preeti Hurkat
                        </p>
                        <p className={`${isThemed ? 'text-[#1E4675] opacity-90 leading-relaxed text-justify' : 'mb-2'}`}>
                          In the divine presence of our family deities and with the blessings of our
                          ancestors,
                          <br />
                          we invite you to join us in this sacred union.
                        </p>
                        <p className={`${isThemed ? 'text-[#1E4675] font-medium text-center' : 'mb-2'}`}>
                          Kindly grace the occasion with your presence.
                          <br />
                          Your blessings are humbly solicited.
                        </p>
                      </div>
                      {isThemed && (
                        <div className="flex justify-center pt-10">
                          <img
                            src={theme.lotusDivider}
                            alt="Lotus divider"
                            className="w-32 sm:w-40 opacity-80"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Original content for other groups
                  <>
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

                <div className={`mt-10 flex items-center justify-center gap-4 ${isThemed ? 'flex-wrap' : ''}`}>
                  <a
                    href={`/${access}/events`}
                    className={`${
                      isThemed
                        ? 'inline-block px-6 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-[#1D4F84] to-[#71B7E7] text-white shadow-[0_24px_50px_rgba(29,79,132,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_28px_60px_rgba(29,79,132,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71B7E7]'
                        : 'inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2'
                    } ${isThemed ? 'animate-fade-up delay-[120ms]' : ''}`}
                  >
                    View Events
                  </a>
                  {access === 'bride' && (
                    <a
                      href={`/${access}/family`}
                      className={`${
                        isThemed
                          ? 'inline-block px-6 py-3 min-h-[44px] rounded-full border border-[#1D4F84] border-opacity-40 bg-white/80 text-[#1D4F84] shadow-[0_18px_36px_rgba(29,79,132,0.18)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_44px_rgba(29,79,132,0.22)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71B7E7] backdrop-blur-sm'
                          : 'inline-block px-6 py-3 min-h-[44px] bg-burgundy text-ivory rounded-full shadow-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2'
                      } ${isThemed ? 'animate-fade-up delay-[200ms]' : ''}`}
                    >
                      Hosts &amp; Family
                    </a>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="w-1/2">
                <div
                  className={`relative overflow-hidden ${
                    isThemed
                      ? 'rounded-[48px] border border-white/70 shadow-[0_32px_80px_rgba(29,79,132,0.25)]'
                      : 'rounded-lg shadow-lg'
                  }`}
                >
                  <img
                    src={access === 'bride' ? "/images/welcome-photo.JPG" : "/images/welcome-photo.JPG"}
                    alt="Aastha & Preetesh smiling by the water"
                    className="h-full w-full object-cover aspect-[2/3]"
                  />
                  {isThemed && (
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[rgba(15,48,95,0.45)] via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  )}
                </div>
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
