// data/navItems.js

export const NAV_ITEMS = [
  // everyone - core information first
  {
    key: 'home',
    label: 'Home',
    href: '/[group]',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
  },
  {
    key: 'events',
    label: 'Events',
    href: '/[group]/events',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
  },
  {
    key: 'outfits',
    label: 'Outfits',
    href: '/[group]/outfits',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
  },
  //friends only - action items
  {
    key: 'rsvp',
    label: 'RSVP',
    href: '/[group]/rsvp',
    allowedGroups: ['FRIENDS'],
  },
  {
    key: 'travel',
    label: 'Travel',
    href: '/[group]/travel',
    allowedGroups: ['FRIENDS'],
  },
  // TEMPORARILY COMMENTED OUT - UNCOMMENT BEFORE FINAL LAUNCH
  // {
  //   key: 'registry',
  //   label: 'Registry',
  //   href: '/[group]/registry',
  //   allowedGroups: ['FRIENDS'],
  // },
  {
    key: 'faqs',
    label: 'FAQs',
    href: '/[group]/faqs',
    allowedGroups: ['FRIENDS'],
  },
  // gallery for viewing photos (at the end)
  {
    key: 'gallery',
    label: 'Gallery',
    href: '/[group]/gallery',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
  },
];
