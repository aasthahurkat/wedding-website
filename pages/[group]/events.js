// File: pages/[group]/events/index.js
import Image from "next/image";
import { Clock, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { events } from '../../data/events';
import { ACCESS_GROUPS } from '../../data/accessGroups';

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({ params: { group: g.key.toLowerCase() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group.toLowerCase();
  const valid = ACCESS_GROUPS.map((g) => g.key.toLowerCase());
  if (!valid.includes(group)) return { notFound: true };
  return { props: { group } };
}

export default function EventsPage({ group }) {
  const upper = group.toUpperCase();
  const myEvents = events.filter((e) => e.allowedGroups.includes(upper));

  // Track which card is flipped
  const [flippedId, setFlippedId] = useState(null);

 // Group events by date
const grouped = myEvents.reduce((acc, evt) => {
  acc[evt.date] = acc[evt.date] || [];
  acc[evt.date].push(evt);
  return acc;
}, {});

// Simply sort the ISO-strings lexically
const sortedDates = Object
  .keys(grouped)
  .sort();


  return (
    <div className="relative bg-cream min-h-screen">
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative z-10 pt-20 pb-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-navy mb-2 capitalize">
          Wedding Festivities!
        </h1>
        <p className="text-center text-navy/70 mb-4">
          We’re so excited for you to join our wedding festivities! <br /> Below you will find the when and where for each celebration—just flip any plate to dive into all the details.
        </p>

        <div className="text-center mb-8">
          <a
            href={`/${group}/rsvp`}
            className="inline-block px-6 py-2 bg-burgundy text-ivory rounded hover:bg-burgundy/90 transition focus:outline-none focus:ring-2 focus:ring-burgundy"
          >
            RSVP now!
          </a>
        </div>

        {sortedDates.map((date) => (
          <section key={date} className="mb-12">
            <h2 className="text-2xl font-semibold text-navy mb-4 text-center">
              {new Date(date + "T00:00").toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[date].map((evt) => (
                <EventCard
                  key={evt.id}
                  evt={evt}
                  isFlipped={flippedId === evt.id}
                  onFlip={() => setFlippedId(flippedId === evt.id ? null : evt.id)}
                />
              ))}
            </div>
          </section>
        ))}

        {sortedDates.length === 0 && (
          <p className="text-center text-sm text-navy/70">No events available for this group.</p>
        )}
      </div>
    </div>
  );
}

function EventCard({ evt, isFlipped, onFlip }) {
  const cardStyle = {
    width: '100%',
    paddingBottom: '50%',
    position: 'relative',
    perspective: '1000px',
    cursor: 'pointer'
  };

  const panelStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const faceStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  return (
    <div
      className="w-full"
      style={cardStyle}
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? `Show front of ${evt.title}` : `Show details of ${evt.title}`}
    >
      <div style={panelStyle}>
        {/* Front Face */}
        <div style={faceStyle}>
          <Image
            src={`/images/named-plates/stretched_${evt.id}.png`}
            alt={evt.title}
            fill
            className="object-cover"
            quality={75}
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
  
          </div>
        </div>

        {/* Back Face */}
  <div style={{ ...faceStyle, transform: 'rotateY(180deg)', backgroundColor: '#F7F2E9' }}>
          <div className="flex flex-col justify-between h-full p-6">
            <div>
              <h3 className="text-xl font-semibold text-navy mb-2">{evt.title}</h3>
              <p className="text-sm text-navy/80 mb-4">{evt.description}</p>
              {/* View on Map CTA */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-burgundy hover:underline space-x-1"
              >
                <MapPin className="w-4 h-4" />
                <span>View on Map</span>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Tailwind utilities:
.perspective { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.transition-transform { transition-property: transform; }
.duration-600 { transition-duration: 600ms; }
.ease-in-out { transition-timing-function: ease-in-out; }
*/
