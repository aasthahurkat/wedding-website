// data/navItems.js

export const NAV_ITEMS = [
  // everyone
  {
    key: "home",
    label: "Home",
    href: "/[group]",
    allowedGroups: ["BRIDE", "GROOM", "FRIENDS"],
  },
  {
    key: "events",
    label: "Events",
    href: "/[group]/events",
    allowedGroups: ["BRIDE", "GROOM", "FRIENDS"],
  },
  // bride & groom only
  {
    key: "outfits",
    label: "Outfits",
    href: "/[group]/outfits",
    allowedGroups: ["BRIDE", "GROOM"],
  },
  // friends only
  {
    key: "rsvp",
    label: "RSVP",
    href: "/[group]/rsvp",
    allowedGroups: ["FRIENDS"],
  },
  {
    key: "outfits",
    label: "Outfits",
    href: "/[group]/outfits",
    allowedGroups: ["FRIENDS"],
  },
  {
    key: "travel",
    label: "Travel",
    href: "/[group]/travel",
    allowedGroups: ["FRIENDS"],
  },
  {
    key: "faqs",
    label: "FAQs",
    href: "/[group]/faqs",
    allowedGroups: ["FRIENDS"],
  },
];
