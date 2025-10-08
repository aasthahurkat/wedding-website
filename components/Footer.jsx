import { useRouter } from 'next/router';
import { getGroupTheme } from '../lib/groupThemes';

export default function Footer({ currentGroup }) {
  const { query } = useRouter();
  const groupParam = (currentGroup || query.group || '').toString().toLowerCase();
  const theme = getGroupTheme(groupParam);
  const isThemed = theme.themed;

  return (
    <footer
      role="contentinfo"
      className={`relative overflow-hidden py-6 text-center transition-colors duration-300 ${
        isThemed ? 'text-[#EFF8FF]' : 'bg-primary text-cream'
      }`}
      style={
        isThemed
          ? {
              background: 'linear-gradient(140deg, rgba(15,48,95,0.96) 0%, rgba(29,79,132,0.9) 100%)',
              boxShadow: '0 -18px 48px rgba(15,48,95,0.35)',
              borderTop: '1px solid rgba(113,183,231,0.4)',
            }
          : undefined
      }
    >
      {isThemed && (
        <div
          className="pointer-events-none absolute -top-24 right-10 hidden sm:block opacity-70"
          aria-hidden="true"
        >
          <img src="/images/bride/blue-lotus-right.svg" alt="Blue lotus accent" className="w-32" />
        </div>
      )}
      {isThemed && (
        <div
          className="pointer-events-none absolute bottom-[-32px] left-12 hidden sm:block opacity-70"
          aria-hidden="true"
        >
          <img src="/images/bride/blue-lotus-left.svg" alt="Blue lotus accent" className="w-28" />
        </div>
      )}
      <div
        className={`container font-body text-sm sm:text-base ${
          isThemed ? 'text-[#EFF8FF]/90' : ''
        }`}
      >
        <p>
          Questions?{' '}
          <a
            href="mailto:aasthahurkat@gmail.com"
            className={
              isThemed
                ? 'underline decoration-[#71B7E7] decoration-2 underline-offset-4 hover:text-white'
                : 'underline'
            }
          >
            Get in&nbsp;touch
          </a>
        </p>
        <p className="mt-3">
          <span className="block sm:inline">Aastha&nbsp;&amp;&nbsp;Preetesh’s Wedding</span>
          <span className="hidden sm:inline sm:mx-1">&mdash;</span>
          <span className="block sm:inline">December&nbsp;23&ndash;24,&nbsp;2025</span>
        </p>
      </div>
    </footer>
  );
}
