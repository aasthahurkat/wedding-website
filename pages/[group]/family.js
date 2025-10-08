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
    heroTitle: 'Family & Blessings',
    heroSubtitle:
      'Every wedding is held together by the love and blessings of family — from the elders who guide us to the cousins who celebrate with us.',
    heroIcon: Heart,
    sections: [
      {
        key: 'hosts',
        title: 'Hosts & Immediate Family',
        icon: Home,
        description:
          'Names that appear on the invitation as the primary hosts and the closest circle holding the rituals together.',
        layout: 'centered',
        groups: [
          {
            label: 'Formal Hosts',
            translate: false,
            photo: '/images/family.jpg',
            photoAlt: 'Immediate Hurkat family portrait placeholder',
            layout: 'centered',
            columns: 2,
            names: [
              'Shri Laxminarayanji & Smt. Parvati Devi Hurkat',
              'Ram Hurkat & Preeti Hurkat',
              'Nishtha Hurkat',
              'Hemank Hurkat',
            ],
          },
        ],
      },
      {
        key: 'extended',
        title: 'Extended Family & Inviting Households',
        icon: Users,
        description:
          'Chachas, masis, jijus, bhabhis, cousins, and beloved family friends who stand as co-hosts. Add as many households as needed — we will keep expanding.',
        groups: [
          {
            label: 'Hurkat Parivar',
            photo: '/images/paternal-fam.jpg',
            photoAlt: 'Hurkat family celebration photo placeholder',
            names: [
              'Shri Manoharlal ji & Smt. Padma Soni',
              'Shri Balramji & Smt. Brajbala Samdani',
              'Shri Shyamji & Smt. Vinita Maheshwari',
              'Shri Prakashji & Smt. Rama Laddha',
              'Shri Loveji & Smt. Radha Surjan',
              'Shri Shyamji & Smt. Trapti Singi',
            ],
          },
          {
            label: 'Maternal Side',
            photo: '/images/maternal-fam.jpg',
            photoAlt: 'Maternal family gathering photo placeholder',
            names: [
              'Nani Kusumlata Heda',
              'Shri Priteshji & Smt. Priti Heda',
              'Shri Rakeshji Heda',
              'Shri Manishji Heda',     
              'Shri Maheshji Heda',
            ],
          },
        ],
      },
    ],
    closing:
      'हम सभी स्वागतातुर हैं — your presence and blessings at the wedding mean the world to every family listed here.',
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

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Family | Aastha &amp; Preetesh</title>
      </Head>
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-cream pt-24 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header with decorative elements */}
          <section className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40"></div>
            <div className="flex justify-center mb-6 mt-8">
              <div className="relative">
                <HeroIcon className="h-10 w-10 text-burgundy" />
                <div className="absolute inset-0 blur-xl opacity-20 bg-burgundy"></div>
              </div>
            </div>
            <h1 className="text-4xl font-serif text-navy mb-4 tracking-wide">
              {content.heroTitle}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold/60"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40"></div>
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
                  <div className="text-center mb-10 relative">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 rounded-full border border-burgundy/10 shadow-sm">
                      <Icon className="w-5 h-5 text-burgundy" />
                      <h2 className="text-xl font-serif text-navy tracking-wide">{section.title}</h2>
                    </div>
                    <p className="text-sm text-navy/60 mt-4 max-w-2xl mx-auto leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Family Groups */}
                  <div className={`${isFirst ? 'space-y-12' : 'grid md:grid-cols-2 gap-8 md:gap-12'}`}>
                    {section.groups?.map((group, groupIdx) => (
                      <div
                        key={`${section.key}-${groupIdx}`}
                        className="bg-white/40 rounded-2xl p-8 border border-burgundy/10 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* Group Label with decorative accent */}
                        {group.label && (
                          <div className="mb-6 pb-3 border-b border-gold/20 relative">
                            <div className="absolute left-0 top-0 w-12 h-px bg-gradient-to-r from-gold/60 to-transparent"></div>
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-burgundy/70 pt-3">
                              {group.label}
                            </h3>
                          </div>
                        )}

                        {/* Names List - elegant and spacious */}
                        <ul className="space-y-3.5">
                          {group.names?.map((rawEntry, nameIdx) => {
                            const entry = normalizeEntry(rawEntry);
                            const preventTranslate =
                              entry.translate === false || group.translate === false;
                            const translationProps = preventTranslate ? { translate: 'no' } : {};

                            return (
                              <li
                                key={`${section.key}-${groupIdx}-name-${nameIdx}`}
                                className="flex items-start gap-3 group"
                              >
                                <span className="text-gold/60 mt-1.5 flex-shrink-0 text-sm">✦</span>
                                <div className="flex-1">
                                  <span
                                    className={`text-navy/90 font-medium text-base leading-relaxed group-hover:text-burgundy transition-colors ${
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
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing with decorative elements */}
          <div className="mt-20 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40"></div>
              <div className="w-2 h-2 rounded-full bg-gold/60"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40"></div>
            </div>
            <p className="mx-auto max-w-2xl text-navy/70 leading-relaxed italic text-base">
              {content.closing}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

FamilyPage.noLayout = true;
