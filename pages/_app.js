// pages/_app.js
import Head from 'next/head';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { Playfair_Display, Oswald } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GroupProvider } from '../lib/context/GroupContext';
import { getGroupTheme } from '../lib/groupThemes';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
});

export default function MyApp({ Component, pageProps, router }) {
  // If the page component has noLayout=true, skip Navbar/Footer
  const noLayout = Component.noLayout;
  const initialGroup = (pageProps?.group || '').toString().toLowerCase();
  const routeGroup = (router?.query?.group || '').toString().toLowerCase();
  const groupKey = routeGroup || initialGroup;
  const theme = getGroupTheme(groupKey);
  const isThemed = theme.themed;
  const themeClass = isThemed ? 'theme-blue' : '';

  return (
    <GroupProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aastha & Preetesh Wedding</title>
      </Head>
      <div className={`${playfair.variable} ${oswald.variable} font-sans ${themeClass}`}>
        {!noLayout && <Navbar currentGroup={(router.query.group || '').toLowerCase()} />}

        <LayoutGroup id="shared-layout">
          <AnimatePresence mode="sync" initial={false}>
            {isThemed ? (
              <div
                key={router.asPath}
                className="relative min-h-screen overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute inset-0 -z-20"
                  style={{
                    backgroundImage: `url('${theme.gradient}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    opacity: 0.95,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    backgroundColor: theme.background,
                    backgroundImage: `url('${theme.texture}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '520px',
                    mixBlendMode: 'normal',
                  }}
                  aria-hidden="true"
                />
                <Component {...pageProps} />
              </div>
            ) : (
              <Component {...pageProps} key={router.asPath} />
            )}
          </AnimatePresence>
        </LayoutGroup>

        {!noLayout && <Footer currentGroup={(router.query.group || '').toLowerCase()} />}
      </div>
      <Analytics />
    </GroupProvider>
  );
}
