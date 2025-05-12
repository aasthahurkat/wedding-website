// components/MapEmbed.jsx
import Image from "next/image";

export default function MapEmbed({ address }) {
  const q = encodeURIComponent(address);
  // Use Google Static Maps for performance (replace API key in env)
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${q}&zoom=14&size=600x400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <figure className="mt-4 w-full max-w-xl mx-auto aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-card">
      <Image
        src={staticMapUrl}
        alt={`Map of ${address}`}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL="/images/map-placeholder.png"
        loading="lazy"
      />
      <figcaption className="sr-only">
        Static map showing location for {address}. Click to open interactive map.
      </figcaption>
      <a
        href={`https://maps.google.com/?q=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={`Open Google Maps for ${address}`}
      />
    </figure>
  );
}
