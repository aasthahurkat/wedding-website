const GROUP_THEMES = {
  bride: {
    themed: true,
    background: '#EFF8FF',
    accent: '#71B7E7',
    accentDark: '#1D4F84',
    textPrimary: '#1E4675',
    textSecondary: '#2C5C94',
    textMuted: '#3B6BA3',
    gradient: '/images/bride/gradient-vertical.svg',
    texture: '/images/bride/blue-watercolor-bg-297x396.png',
    crest: '/images/bride/logo.svg',
    crestAlt: 'Aastha & Preetesh crest',
    initials: '/images/bride/initials.svg',
    lotusDivider: '/images/bride/blue-lotus-horizontal.svg',
    lotusCorners: [
      { src: '/images/bride/blue-lotus-left.svg', className: 'hidden lg:block absolute -left-28 top-16 w-56 opacity-80' },
      { src: '/images/bride/blue-lotus-right.svg', className: 'hidden lg:block absolute -right-28 top-24 w-56 opacity-80' },
      { src: '/images/bride/blue-lotus-bud.svg', className: 'hidden md:block absolute -left-10 bottom-6 w-28 opacity-80' },
    ],
  },
  groom: {
    themed: true,
    background: '#EFF8FF',
    accent: '#71B7E7',
    accentDark: '#1D4F84',
    textPrimary: '#1E4675',
    textSecondary: '#2C5C94',
    textMuted: '#3B6BA3',
    gradient: '/images/bride/gradient-vertical.svg',
    texture: '/images/bride/blue-watercolor-bg-297x396.png',
    crest: '/images/bride/initials.svg',
    crestAlt: 'Aastha & Preetesh initials',
    lotusDivider: '/images/bride/blue-lotus-horizontal.svg',
    lotusCorners: [
      { src: '/images/bride/blue-lotus-right.svg', className: 'hidden lg:block absolute -right-28 top-14 w-56 opacity-80' },
      { src: '/images/bride/blue-lotus-left.svg', className: 'hidden lg:block absolute -left-28 top-24 w-56 opacity-80' },
      { src: '/images/bride/blue-lotus-bud.svg', className: 'hidden md:block absolute right-10 bottom-4 w-28 opacity-80 rotate-3' },
    ],
  },
};

export function getGroupTheme(groupKey) {
  const key = (groupKey || '').toLowerCase();
  return GROUP_THEMES[key] || { themed: false };
}

export default GROUP_THEMES;
