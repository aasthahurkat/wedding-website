// pages/_app.js
import Head from 'next/head';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { Playfair_Display, Oswald, Amita } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GroupProvider } from '../lib/context/GroupContext';

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

const amita = Amita({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '700'],
  variable: '--font-amita',
});

export default function MyApp({ Component, pageProps, router }) {
  // If the page component has noLayout=true, skip Navbar/Footer
  const noLayout = Component.noLayout;
  const currentGroup = (router.query.group || '').toString().toLowerCase();
  const isBride = currentGroup === 'bride';
  const brideBackgroundStyle = isBride
    ? {
        backgroundImage: "url('/blue-watercolor-bg.svg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundColor: '#EFF8FF',
      }
    : undefined;

  return (
    <GroupProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aastha & Preetesh Wedding</title>
      </Head>
      <div
        className={`${playfair.variable} ${oswald.variable} ${amita.variable} font-sans min-h-screen`}
        style={brideBackgroundStyle}
      >
        {!noLayout && <Navbar currentGroup={currentGroup} />}

        <LayoutGroup id="shared-layout">
          <AnimatePresence mode="sync" initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </LayoutGroup>

        {!noLayout && <Footer currentGroup={currentGroup} />}
      </div>
      <Analytics />
    </GroupProvider>
  );
}
