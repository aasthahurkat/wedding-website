// pages/[group]/outfits.js
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ACCESS_GROUPS } from "../../data/accessGroups";

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({
      params: { group: g.key.toLowerCase() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group.toLowerCase();
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

export default function OutfitsPage({ group }) {
  const router = useRouter();
  const current = group || router.query.group;

  // Only bride & groom can eventually see outfits; for now everyone sees Coming Soon
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar currentGroup={current} />

      <main className="flex-grow pt-20 px-6 lg:px-24 flex items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-serif text-navy">
          Coming Soon!
        </h2>
      </main>

      <Footer />
    </div>
  );
}

OutfitsPage.noLayout = true;
