/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Mobile-first breakpoints
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    // Default container settings for consistent centering & padding
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
    },
    extend: {
      colors: {
        // Base palette
        ivory: '#F8F4F0',
        cream: '#FAF5F0',
        burgundy: '#8B1E3F',
        navy: '#1F3A47',
        gold: '#C49C48',
        champagne: '#F5E1B9',
        chocolate: '#5A3E36',
        coral: '#D35C4E',
        scrabble: '#F5EAD6',
        card: '#FFFFFF',
        'card-black': '#232020',
        'card-red': '#AC2E3E',
        // Semantic aliases
        primary: '#8B1E3F', // burgundy
        secondary: '#C49C48', // gold
        accent: '#D35C4E', // coral
        neutral: '#F5EAD6', // scrabble
      },
      fontFamily: {
        header: ['var(--font-playfair)'],
        body: ['Montserrat', 'sans-serif'],
        din: ['"DIN Condensed"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        lg: '1.5rem',
      },
      spacing: {
        18: '4.5rem', // Custom spacing value
        72: '18rem', // Example for larger spacing
        84: '21rem',
        96: '24rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
