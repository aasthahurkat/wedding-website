// pages/_app.js
import Head from "next/head";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { Playfair_Display, Oswald } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
});

export default function MyApp({ Component, pageProps, router }) {
  // If the page component has noLayout=true, skip Navbar/Footer
  const noLayout = Component.noLayout;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aastha & Preetesh Wedding</title>
      </Head>
      <div className={`${playfair.variable} ${oswald.variable} font-sans`}>
        {!noLayout && <Navbar currentGroup={(router.query.group || "").toLowerCase()} />}

        <LayoutGroup id="shared-layout">
          <AnimatePresence mode="sync" initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </LayoutGroup>

        {!noLayout && <Footer />}
      </div>
    </>
  );
}
