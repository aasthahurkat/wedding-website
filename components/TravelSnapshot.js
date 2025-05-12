// components/TravelSnapshot.jsx
import Image from "next/image";

const STATIC_MAP_URL = (query) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    query
  )}&zoom=12&size=600x400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

export default function TravelSnapshot() {
  const hotelLinks = [
    { name: "Luxe Hotel", url: "https://example.com/luxe" },
    { name: "Heritage Inn", url: "https://example.com/heritage" },
  ];

  return (
    <section aria-labelledby="travel-snapshot" className="space-y-8">
      <h2
        id="travel-snapshot"
        className="font-header text-2xl sm:text-3xl text-primary text-center"
      >
        Travel & Stay
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Getting There */}
        <article role="region" aria-labelledby="getting-there" className="p-4 bg-card rounded-lg shadow-card">
          <h3 id="getting-there" className="font-heading text-lg sm:text-xl text-secondary mb-2">
            Getting There
          </h3>
          <a
            href="https://maps.google.com/?q=Indore+Airport"
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-md"
          >
            <Image
              src={STATIC_MAP_URL("Indore Airport")}
              alt="Map to Indore Airport"
              width={600}
              height={400}
              className="object-cover w-full h-40"
              placeholder="blur"
              blurDataURL="/images/map-placeholder.png"
            />
          </a>
          <p className="mt-2 text-sm text-card-black">
            Click map to open directions.
          </p>
        </article>

        {/* Where to Stay */}
        <article role="region" aria-labelledby="where-to-stay" className="p-4 bg-card rounded-lg shadow-card">
          <h3 id="where-to-stay" className="font-heading text-lg sm:text-xl text-secondary mb-2">
            Where to Stay
          </h3>
          <ul className="list-disc list-inside space-y-1 text-card-black">
            {hotelLinks.map((hotel) => (
              <li key={hotel.name}>
                {hotel.name} —{" "}
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium text-secondary hover:text-secondary/80"
                >
                  Book here
                </a>
              </li>
            ))}
          </ul>
        </article>

        {/* Placeholder cards */}
        <article className="p-4 bg-card rounded-lg shadow-card flex items-center justify-center text-gray-400 italic">
          Local Transfers (coming soon)
        </article>
        <article className="p-4 bg-card rounded-lg shadow-card flex items-center justify-center text-gray-400 italic">
          Tips & FAQs (coming soon)
        </article>
      </div>
    </section>
  );
}
