import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Heart, Users, Sparkles, Feather, Scroll, Gem, Home, ChevronDown } from 'lucide-react';

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({ params: { group: g.key.toLowerCase() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group.toLowerCase();
  const isValid = ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group);
  if (!isValid) {
    return { notFound: true };
  }

  return {
    props: { group },
  };
}

const FAMILY_CONTENT = {
  bride: {
    heroTitle: 'Awaiting Your Presence',
    heroSubtitle:
      'With Reverence and Warm Invitation',
    heroIcon: Heart,
    sections: [
      {
        key: 'hosts',
        title: '',
        icon: Home,
        description: '',
        layout: 'centered',
        groups: [
          {
            label: 'Cordial Invitation',
            translate: false,
            layout: 'centered',
            columns: 1,
            names: [
              'Mrs. Parvati Devi Hurkat',
              'Mr. Ram & Mrs. Preeti Hurkat',
              'Nishtha, Hemank Hurkat',
              '',
              'cordially invite you to join us in the joyous celebration of this sacred union with blessings from our elders and the love of our family and friends.',
            ],
          },
        ],
      },
      {
        key: 'affectionate',
        title: '',
        icon: Heart,
        description: '',
        layout: 'two-column',
        groups: [
          {
            label: 'With Affectionate Regards',
            translate: false,
            layout: 'centered-no-bullets',
            names: [
              'Mrs. Padma & Mr. Manohar Soni',
              'Mrs. Braj & Mr. Balram Samdani',
              'Mrs. Vinita & Mr. Shyam Soni',
              'Mrs. Rama & Mr. Prakash Laddha',
              'Mrs. Radha & Mr. Lavkumar Surjan',
              'Mrs. Tripti & Mr. Shyam Singi',
            ],
          },
          {
            label: 'With Sincere Solicitation',
            translate: false,
            layout: 'centered-no-bullets',
            names: [
              'Dr. Ishwarchandra, Ratanlal, Dewanand, Kishorchandra, Kamlakishor, Krishnadas, Sanjaykumar, Ravikumar Hurkat & Family',
            ],
          },
        ],
      },
      {
        key: 'maternal',
        title: '',
        icon: Users,
        description: '',
        layout: 'centered',
        groups: [
          {
            label: 'Maternal Family (Nanihaal Side)',
            translate: false,
            layout: 'centered-no-bullets',
            names: [
              'Mr. Rajmal & Mrs. Krishnadevi',
              'Mrs. Kusumdevi & Late Mr. Kailashchandra',
              'Mr. Murlidhar & Mrs. Ramila',
              'Mr. Mahesh & Mrs. Sarla',
              'Mr. Rakesh & Mrs. Sunita',
              'Mr. Preetesh & Mrs. Preeti',
              'Mr. Manish & Mrs. Divya',
              'Rahul, Avadh, Tanay, Khushi, Gargi Heda & Family',
            ],
          },
        ],
      },
    ],
    closing:
      '',
  },
  default: {
    heroTitle: 'Family & Blessings',
    heroSubtitle:
      'We are preparing a dedicated family roll call for this group. Once the households confirm their preferred listings, they will appear here.',
    heroIcon: Feather,
    highlights: [
      {
        key: 'elders',
        icon: Scroll,
        title: 'Honouring Our Elders',
        description:
          'Blessing messages, ancestral notes, and elders’ names will be added once confirmed.',
      },
      {
        key: 'parents',
        icon: Heart,
        title: 'Parents & Guardians',
        description: 'Primary hosts and guardians will be introduced here soon.',
      },
      {
        key: 'extended',
        icon: Users,
        title: 'Extended Family',
        description: 'Cousins, aunts, uncles, and co-hosts will feature in their own sections shortly.',
      },
    ],
    sections: [
      {
        key: 'placeholder',
        title: 'Family Directory',
        icon: Gem,
        description: 'A staging area while names are being verified. Expect this to evolve into multiple household cards.',
        groups: [
          {
            label: 'Status',
            names: [
              'Collecting names and relationship notes',
              'Ensuring every household is represented as requested',
            ],
          },
        ],
      },
    ],
    closing:
      'Need an introduction or a point of contact before this list is ready? Message Aastha or Preetesh and they will connect you right away.',
  },
};

function normalizeEntry(entry) {
  if (typeof entry === 'string') {
    return { text: entry };
  }
  return entry;
}

export default function FamilyPage({ group }) {
  const content = FAMILY_CONTENT[group] || FAMILY_CONTENT.default;
  const HeroIcon = content.heroIcon || Heart;
  const isBride = group === 'bride' || group === 'groom';
  const theme = isBride
    ? {
        pageBackground: 'bg-sky-50',
        heroLine: 'bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-60',
        heroIcon: 'text-sky-600',
        heroGlow: 'bg-sky-400',
        sectionChip: 'bg-white/70 rounded-full border border-sky-200 shadow-sm',
        sectionIcon: 'text-sky-600',
        heroDividerLeft: 'bg-gradient-to-r from-transparent to-sky-200',
        heroDividerRight: 'bg-gradient-to-l from-transparent to-sky-200',
        heroDot: 'bg-sky-300',
        cardBorder: 'border-sky-200',
        labelDivider: 'border-sky-200',
        labelAccent: 'bg-gradient-to-r from-sky-300 to-transparent',
        labelText: 'text-sky-700',
        bullet: 'text-sky-400',
        nameHover: 'group-hover:text-sky-600',
        closingLineLeft: 'bg-gradient-to-r from-transparent to-sky-300',
        closingLineRight: 'bg-gradient-to-l from-transparent to-sky-300',
        closingDot: 'bg-sky-400',
      }
    : {
        pageBackground: 'bg-cream',
        heroLine: 'bg-gradient-to-r from-transparent via-gold to-transparent opacity-40',
        heroIcon: 'text-burgundy',
        heroGlow: 'bg-burgundy',
        sectionChip: 'bg-white/60 rounded-full border border-burgundy/10 shadow-sm',
        sectionIcon: 'text-burgundy',
        heroDividerLeft: 'bg-gradient-to-r from-transparent to-gold/40',
        heroDividerRight: 'bg-gradient-to-l from-transparent to-gold/40',
        heroDot: 'bg-gold/60',
        cardBorder: 'border-burgundy/10',
        labelDivider: 'border-gold/20',
        labelAccent: 'bg-gradient-to-r from-gold/60 to-transparent',
        labelText: 'text-burgundy/70',
        bullet: 'text-gold/60',
        nameHover: 'group-hover:text-burgundy',
        closingLineLeft: 'bg-gradient-to-r from-transparent to-gold/40',
        closingLineRight: 'bg-gradient-to-l from-transparent to-gold/40',
        closingDot: 'bg-gold/60',
      };

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Family | Aastha &amp; Preetesh</title>
      </Head>
      <Navbar currentGroup={group} />
      <main className={`flex-1 pt-24 pb-12 px-4 ${isBride ? '' : theme.pageBackground}`} style={isBride ? {
        backgroundImage: "url('/blue-watercolor-bg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {}}>
        <div className="mx-auto max-w-4xl">
          {/* Header with decorative elements */}
          <section className="text-center mb-16 relative">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 ${theme.heroLine}`}></div>
            <div className="flex justify-center mb-6 mt-8">
              <div className="relative">
                <HeroIcon className={`h-10 w-10 ${theme.heroIcon}`} />
                <div className={`absolute inset-0 blur-xl opacity-20 ${theme.heroGlow}`}></div>
              </div>
            </div>
            <h1 className="text-4xl font-serif text-navy mb-4 tracking-wide">
              {content.heroTitle}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-12 h-px ${theme.heroDividerLeft}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${theme.heroDot}`}></div>
              <div className={`w-12 h-px ${theme.heroDividerRight}`}></div>
            </div>
            <p className="mx-auto max-w-2xl text-navy/70 leading-relaxed">
              {content.heroSubtitle}
            </p>
          </section>

          {/* Family Sections */}
          <div className="space-y-16">
            {content.sections.map((section, sectionIdx) => {
              const Icon = section.icon;
              const isFirst = sectionIdx === 0;

              return (
                <div key={section.key}>
                  {/* Section Header with decorative border */}
                  {section.title && (
                    <div className="text-center mb-10 relative">
                      <div className={`inline-flex items-center gap-3 px-6 py-3 ${theme.sectionChip}`}>
                        <Icon className={`w-5 h-5 ${theme.sectionIcon}`} />
                        <h2 className="text-xl font-serif text-navy tracking-wide">{section.title}</h2>
                      </div>
                      <p className="text-sm text-navy/60 mt-4 max-w-2xl mx-auto leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  )}

                  {/* Family Groups */}
                  <div className={`${
                    section.layout === 'two-column'
                      ? 'grid md:grid-cols-2 gap-8 md:gap-12'
                      : section.layout === 'centered' || isFirst
                      ? 'space-y-12'
                      : 'grid md:grid-cols-2 gap-8 md:gap-12'
                  }`}>
                    {section.groups?.map((group, groupIdx) => {
                      // Special styling for different sections
                      const isCordialInvitation = section.key === 'hosts';
                      const isMaternalFamily = section.key === 'maternal';
                      const isNoBullets = group.layout === 'centered-no-bullets';

                      return (
                        <div
                          key={`${section.key}-${groupIdx}`}
                          className={`${
                            isCordialInvitation
                              ? 'bg-white/60 rounded-xl p-10 border border-sky-200/50 shadow-md max-w-2xl mx-auto'
                              : isMaternalFamily
                              ? 'bg-white/60 rounded-xl p-10 border border-sky-200/50 shadow-md max-w-2xl mx-auto'
                              : `bg-white/40 rounded-2xl p-8 border ${theme.cardBorder} shadow-sm hover:shadow-md transition-shadow`
                          }`}
                        >
                          {/* Group Label with decorative accent */}
                          {group.label && (
                            <div className={`mb-6 pb-3 border-b relative ${theme.labelDivider} text-center`}>
                              <h3 className={`text-base font-semibold tracking-wide ${theme.labelText}`}>
                                {group.label}
                              </h3>
                            </div>
                          )}

                          {/* Names List - elegant and spacious */}
                          <div className={`${
                            isCordialInvitation
                              ? 'space-y-2 text-center'
                              : isNoBullets
                              ? 'space-y-3 text-center'
                              : 'space-y-3.5'
                          }`}>
                            {group.names?.map((rawEntry, nameIdx) => {
                              const entry = normalizeEntry(rawEntry);
                              const preventTranslate =
                                entry.translate === false || group.translate === false;
                              const translationProps = preventTranslate ? { translate: 'no' } : {};

                              // Check if this is the invitation text (longer text)
                              const isInvitationText = entry.text.includes('cordially invite');
                              const isEmpty = !entry.text || entry.text.trim() === '';

                              if (isCordialInvitation) {
                                if (isEmpty) {
                                  return <div key={`${section.key}-${groupIdx}-name-${nameIdx}`} className="h-3" />;
                                }

                                return (
                                  <div
                                    key={`${section.key}-${groupIdx}-name-${nameIdx}`}
                                    className={`${
                                      isInvitationText
                                        ? 'text-sky-700/80 text-base leading-relaxed mt-6 max-w-xl mx-auto'
                                        : 'text-navy font-medium text-lg'
                                    }`}
                                    {...translationProps}
                                  >
                                    {entry.text}
                                  </div>
                                );
                              }

                              if (isNoBullets) {
                                return (
                                  <div
                                    key={`${section.key}-${groupIdx}-name-${nameIdx}`}
                                    className="text-navy/90 font-medium text-base leading-relaxed"
                                    {...translationProps}
                                  >
                                    {entry.text}
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={`${section.key}-${groupIdx}-name-${nameIdx}`}
                                  className="flex items-start gap-3 group"
                                >
                                  <span className={`${theme.bullet} mt-1.5 flex-shrink-0 text-sm`}>✦</span>
                                  <div className="flex-1">
                                    <span
                                      className={`text-navy/90 font-medium text-base leading-relaxed transition-colors ${theme.nameHover} ${
                                        preventTranslate ? 'notranslate' : ''
                                      }`}
                                      {...translationProps}
                                    >
                                      {entry.text}
                                    </span>
                                    {entry.note && (
                                      <span className="block text-sm text-navy/50 mt-1 italic">{entry.note}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing with decorative elements */}
          {content.closing && (
            <div className="mt-20 text-center relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`w-16 h-px ${theme.closingLineLeft}`}></div>
                <div className={`w-2 h-2 rounded-full ${theme.closingDot}`}></div>
                <div className={`w-16 h-px ${theme.closingLineRight}`}></div>
              </div>
              <p className="mx-auto max-w-2xl text-navy/70 leading-relaxed italic text-base">
                {content.closing}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer currentGroup={group} />
    </div>
  );
}

FamilyPage.noLayout = true;
