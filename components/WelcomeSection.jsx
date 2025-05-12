// components/WelcomeSection.jsx
import Link from "next/link";

export default function WelcomeSection({ access }) {
  return (
    <section
      id="welcome"
      aria-labelledby="welcome-heading"
      className="prose mx-auto py-12 px-4 sm:px-6 lg:px-8 relative"
    >
      <h2
        id="welcome-heading"
        className="font-header text-3xl text-center text-secondary"
      >
        Welcome to Our Wedding
      </h2>
      {/* ... your paragraphs ... */}
      <div className="text-center mt-8 space-x-4">
        <Link href={`/${access}/events`} className="btn-primary inline-block">
          View Events
        </Link>
        {/* Back to Hero */}
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="text-secondary underline"
        >
          Back to Hero ↑
        </button>
      </div>
    </section>
  );
}
