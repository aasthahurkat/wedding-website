import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

ThankYouMissYou.noLayout = true;
export default function ThankYouMissYou() {
  const router = useRouter();
  const group = (router.query.group || "").toLowerCase();

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar currentGroup={group} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex items-center justify-center bg-gradient-to-b from-ivory to-white px-4 text-center">
        <div>
          <h1 className="text-4xl font-bold text-navy">We’ll Miss You!</h1>
          <p className="mt-4 text-lg text-navy">
            We wish you could be there! We’ll miss you at the celebration!
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
