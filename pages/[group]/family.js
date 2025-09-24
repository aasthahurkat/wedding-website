import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function FamilyPage() {
  const { query } = useRouter();
  const group = (query.group || '').toString().toLowerCase();

  return (
    <div className="flex flex-col min-h-screen pt-8">
      <Head>
        <title>Family | Aastha & Preetesh</title>
      </Head>
      <Navbar currentGroup={group} />
      <main className="flex-1 bg-ivory pt-20 md:pt-24">
        <div className="container px-4 pb-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif text-navy mb-2">कुल-परिवार व आमंत्रक</h1>
            <p className="text-navy/80 mb-8">Extended family names and blessings will appear here.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-burgundy mb-2">दादा–दादी / बड़े पापा–बड़ी मम्मी</h2>
              <p className="text-navy/80">Coming soon</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-burgundy mb-2">चाचा–चाची / मामा–मामी</h2>
              <p className="text-navy/80">Coming soon</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-burgundy mb-2">भाई–बहन / मित्र-परिवार</h2>
              <p className="text-navy/80">Coming soon</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

FamilyPage.noLayout = true;


