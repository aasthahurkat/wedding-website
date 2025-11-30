// lib/theme.js
// Centralized theme configuration for bride/groom vs. default groups

/**
 * Check if a group should use the bride theme
 * @param {string} group - The group identifier (bride, groom, friends, etc.)
 * @returns {boolean}
 */
export const isBrideTheme = (group) => {
  const normalized = (group || '').toLowerCase();
  return normalized === 'bride' || normalized === 'groom';
};

/**
 * Background style for bride/groom pages
 */
export const BRIDE_BACKGROUND_STYLE = {
  backgroundImage: "url('/blue-watercolor-bg.svg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

/**
 * Bride/Groom theme configuration (sky blue theme)
 */
export const BRIDE_THEME = {
  // Navigation
  navBackground: 'bg-sky-100/90',
  mobileBackground: 'bg-sky-100/95',
  linkText: 'text-sky-900',
  linkHover: 'hover:text-sky-700 hover:bg-sky-50',
  activeText: 'text-sky-700',
  activeBorder: 'border-sky-700',
  hamburgerBar: 'bg-sky-600',
  focusRing: 'focus:ring-sky-500',

  // Page
  pageBackground: 'bg-sky-50',
  overlay: 'bg-sky-100/50',

  // Typography
  headingClass: 'text-4xl sm:text-5xl',
  heroIcon: 'text-sky-600',
  accentText: 'text-sky-700',

  // Components
  cardHighlight: 'bg-sky-50/70',
  cardBorder: 'border-sky-200',
  iconColor: 'text-sky-600',

  // Buttons
  buttonBase: 'inline-block px-6 py-3 min-h-[48px] bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2',
  buttonSecondary: 'inline-block px-6 py-3 min-h-[48px] bg-white text-sky-600 border-2 border-sky-600 rounded-full shadow-lg hover:bg-sky-50 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2',

  // Footer
  footerBackground: 'bg-sky-600 text-white',
  footerLink: 'underline decoration-white/80 hover:decoration-white',

  // Cards & Containers
  cardBackground: 'bg-white/70 border border-sky-100',
  cardShadow: 'shadow-lg hover:shadow-xl',

  // Event Cards
  eventCardFlipBackground: 'bg-gradient-to-br from-sky-50 to-sky-100',
  eventCardFrontBorder: 'border-2 border-sky-200',
  eventCardBackBorder: 'border-2 border-sky-300',
};

/**
 * Default theme configuration (burgundy/cream theme)
 */
export const DEFAULT_THEME = {
  // Navigation
  navBackground: 'bg-ivory/90',
  mobileBackground: 'bg-ivory/95',
  linkText: 'text-card-black',
  linkHover: 'hover:text-primary hover:bg-neutral/50',
  activeText: 'text-secondary',
  activeBorder: 'border-secondary',
  hamburgerBar: 'bg-primary',
  focusRing: 'focus:ring-primary',

  // Page
  pageBackground: 'bg-cream',
  overlay: 'bg-white bg-opacity-30',

  // Typography
  headingClass: 'text-2xl sm:text-3xl',
  heroIcon: 'text-burgundy',
  accentText: 'text-burgundy',

  // Components
  cardHighlight: 'bg-neutral/5',
  cardBorder: 'border-neutral/20',
  iconColor: 'text-burgundy',

  // Buttons
  buttonBase: 'inline-block px-6 py-3 min-h-[48px] bg-burgundy text-ivory rounded-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2',
  buttonSecondary: 'inline-block px-6 py-3 min-h-[48px] bg-ivory text-burgundy border-2 border-burgundy rounded-lg hover:bg-neutral/10 hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2',

  // Footer
  footerBackground: 'bg-primary text-cream',
  footerLink: 'underline',

  // Cards & Containers
  cardBackground: 'bg-neutral/5',
  cardShadow: 'shadow-md hover:shadow-lg',

  // Event Cards
  eventCardFlipBackground: 'bg-gradient-to-br from-ivory to-cream',
  eventCardFrontBorder: 'border-2 border-neutral/20',
  eventCardBackBorder: 'border-2 border-neutral/30',
};

/**
 * Get theme object based on group
 * @param {string} group - The group identifier
 * @returns {object} Theme configuration object
 */
export const getTheme = (group) => {
  return isBrideTheme(group) ? BRIDE_THEME : DEFAULT_THEME;
};

/**
 * Get background style based on group
 * @param {string} group - The group identifier
 * @returns {object} Background style object or empty object
 */
export const getBackgroundStyle = (group) => {
  return isBrideTheme(group) ? BRIDE_BACKGROUND_STYLE : {};
};

/**
 * Get heading class based on group
 * @param {string} group - The group identifier
 * @returns {string} Heading class name
 */
export const getHeadingClass = (group) => {
  return isBrideTheme(group) ? BRIDE_THEME.headingClass : DEFAULT_THEME.headingClass;
};
