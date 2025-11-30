// data/navItems.js

export const NAV_ITEMS = [
  // everyone - core information first
  {
    key: 'home',
    label: 'Home',
    href: '/[group]',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
  },
  {
    key: 'events',
    label: 'Events',
    href: '/[group]/events',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
  },
  {
    key: 'outfits',
    label: 'Outfits',
    href: '/[group]/outfits',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
  },
  // Bride-specific family tab
  {
    key: 'family',
    label: 'Family',
    href: '/[group]/family',
    allowedGroups: ['BRIDE'],
  },
  //friends and invitees - action items
  {
    key: 'rsvp',
    label: 'RSVP',
    href: '/[group]/rsvp',
    allowedGroups: ['FRIENDS', 'INVITEES', 'GUESTS'],
  },
  {
    key: 'travel',
    label: 'Travel',
    href: '/[group]/travel',
    allowedGroups: ['FRIENDS', 'GUESTS'],
  },
  // Shopping guide accessible only through outfits page call-to-action
  // {
  //   key: 'shopping',
  //   label: 'Shopping',
  //   href: '/[group]/shopping',
  //   allowedGroups: ['FRIENDS'],
  // },
  // TEMPORARILY COMMENTED OUT - UNCOMMENT BEFORE FINAL LAUNCH
  // {
  //   key: 'registry',
  //   label: 'Registry',
  //   href: '/[group]/registry',
  //   allowedGroups: ['FRIENDS', 'INVITEES', 'GUESTS'],
  // },
  {
    key: 'faqs',
    label: 'FAQs',
    href: '/[group]/faqs',
    allowedGroups: ['FRIENDS', 'INVITEES', 'GUESTS'],
  },
  // gallery for viewing photos (at the end)
  {
    key: 'gallery',
    label: 'Gallery',
    href: '/[group]/gallery',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
  },
];
