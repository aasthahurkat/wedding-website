import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link"; 

ThankYouExcited.noLayout = true;

export default function ThankYouExcited() {
  const router = useRouter();
  const group = (router.query.group || "").toLowerCase();

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar currentGroup={group} />

      {/* Main Content */}
 // add this at the top
<main className="flex-1 overflow-auto flex items-center justify-center bg-gradient-to-b from-ivory to-white px-4 text-center">
  <div>
    <h1 className="text-4xl font-bold text-navy">We’re Excited!</h1>
    <p className="mt-4 text-lg text-navy">
      We can’t wait to celebrate with you! Join our WhatsApp group for event updates and discussions.
    </p>

    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
      <a
        href="https://wa.me/your-whatsapp-group-link"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-saffron text-black rounded-lg"
      >
        Join the WhatsApp Group
      </a>
    </div>
    <div>
    <Link
     href={`/${group}/travel`}
     className="inline-block px-6 py-2 bg-burgundy text-ivory rounded hover:bg-burgundy/90 transition focus:outline-none focus:ring-2 focus:ring-burgundy ">
     View Travel Info
     </Link>
   </div>
  </div>
</main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
