// components/Footer.jsx
import { isBrideTheme, getTheme } from '../lib/theme';

export default function Footer({ variant, currentGroup }) {
  const normalizedGroup = (currentGroup || '').toLowerCase();
  const computedVariant =
    variant ??
    (isBrideTheme(normalizedGroup) ? 'bride' : 'default');

  const isBride = computedVariant === 'bride';
  const theme = getTheme(isBride ? 'bride' : 'default');
  const backgroundClass = theme.footerBackground;
  const linkClass = theme.footerLink;

  return (
    <footer
      role="contentinfo"
      className={`${backgroundClass} bg-cover bg-center py-4 sm:py-6 text-center`}
    >
      <div className="container font-body text-sm sm:text-base">
        <p>
          Questions?{' '}
          <a href="mailto:aasthahurkat@gmail.com" className={linkClass}>
            Get in&nbsp;touch
          </a>
        </p>
        <p className="mt-2">
          <span className="block sm:inline">Aastha&nbsp;&amp;&nbsp;Preetesh’s Wedding</span>
          <span className="hidden sm:inline sm:mx-1">&mdash;</span>
          <span className="block sm:inline">December&nbsp;23&ndash;24,&nbsp;2025</span>
        </p>
      </div>
    </footer>
  );
}
