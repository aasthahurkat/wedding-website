// File: pages/[group]/events.js
import Image from 'next/image';
import { Clock, MapPin, Download } from 'lucide-react';
import React, { useState, useMemo, useCallback } from 'react';
import { events } from '../../data/events';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { getGroupTheme } from '../../lib/groupThemes';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Lazy load jsPDF only when needed for better initial page load
const loadJsPDF = () => import('jspdf');

// Helper function to get the appropriate description based on user group
const getEventDescription = (event, userGroup) => {
  if (typeof event.description === 'string') {
    return event.description;
  } else if (typeof event.description === 'object' && event.description[userGroup]) {
    return event.description[userGroup];
  }
  return event.description?.FRIENDS || event.description?.BRIDE || event.description?.GROOM || '';
};

// Helper function to get the appropriate title based on user group
const getEventTitle = (event, userGroup) => {
  if (typeof event.title === 'string') {
    return event.title;
  } else if (typeof event.title === 'object' && event.title[userGroup]) {
    return event.title[userGroup];
  }
  return event.title?.FRIENDS || event.title?.BRIDE || event.title?.GROOM || '';
};

const getEventImage = (event, userGroup) => {
  if (typeof event.image === 'string') {
    return event.image;
  }
  if (typeof event.image === 'object' && event.image !== null) {
    return event.image[userGroup] || event.image.FRIENDS || event.image.BRIDE || event.image.GROOM;
  }
  return event.id;
};

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
  const { themed: isThemed } = getGroupTheme(group);

  const pdfPalette = useMemo(() => {
    if (isThemed) {
      return {
        primary: [29, 79, 132],
        accent: [113, 183, 231],
        surface: [239, 248, 255],
        muted: [96, 115, 138],
        deep: [15, 48, 95],
        white: [255, 255, 255],
      };
    }
    return {
      primary: [31, 45, 62],
      accent: [139, 69, 84],
      surface: [252, 250, 247],
      muted: [120, 120, 120],
      deep: [139, 69, 84],
      white: [255, 255, 255],
    };
  }, [isThemed]);

  const contentWrapperClass = 'max-w-7xl mx-auto';

  const ctaButtonClass = isThemed
    ? 'inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full bg-gradient-to-r from-[#1D4F84] to-[#71B7E7] text-white shadow-[0_18px_40px_rgba(15,48,95,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_24px_50px_rgba(15,48,95,0.32)] focus:outline-none focus:ring-2 focus:ring-[#71B7E7] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none'
    : 'inline-flex items-center gap-2 px-6 py-3 min-h-[48px] bg-burgundy text-ivory rounded-lg hover:bg-burgundy/90 hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none';

  // Memoize filtered events to prevent unnecessary recalculations
  const myEvents = useMemo(() => 
    events.filter((e) => e.allowedGroups.includes(upper)), 
    [upper]
  );

  // Track which card is flipped
  const [flippedId, setFlippedId] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Memoize grouped events to prevent recalculation on each render
  const { grouped, sortedDates } = useMemo(() => {
    const grouped = myEvents.reduce((acc, evt) => {
      acc[evt.date] = acc[evt.date] || [];
      acc[evt.date].push(evt);
      return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort();
    return { grouped, sortedDates };
  }, [myEvents]);

  // Memoized PDF generation function with lazy loading
  const generatePDF = useCallback(async () => {
    if (isGeneratingPDF) return; // Prevent multiple clicks
    
    try {
      setIsGeneratingPDF(true);

      // Lazy load jsPDF
      const { default: jsPDF } = await loadJsPDF();

      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      const { primary, accent, surface, muted, deep, white } = pdfPalette;

      // Helper function for simple divider
      const addDivider = (y, width = contentWidth * 0.4, color = accent) => {
        const x = (pageWidth - width) / 2;
        pdf.setDrawColor(...color);
        pdf.setLineWidth(0.5);
        pdf.line(x, y, x + width, y);
      };

      // Title page with centered content
      pdf.setFillColor(...surface);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Calculate vertical center
      const centerY = pageHeight / 2;

      // Main frame - centered
      const frameHeight = 100;
      const frameY = centerY - frameHeight / 2;
      pdf.setDrawColor(...accent);
      pdf.setLineWidth(2);
      pdf.rect(margin + 10, frameY, contentWidth - 20, frameHeight);
      pdf.setLineWidth(0.5);
      pdf.rect(margin + 12, frameY + 2, contentWidth - 24, frameHeight - 4);

      // Title - centered in frame
      pdf.setTextColor(...primary);
      pdf.setFontSize(38);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Wedding Celebration', pageWidth / 2, frameY + 30, { align: 'center' });

      // Decorative line
      addDivider(frameY + 40, contentWidth * 0.3, accent);

      // Couple names
      pdf.setTextColor(...accent);
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Aastha & Preetesh', pageWidth / 2, frameY + 60, { align: 'center' });

      // Date and location
      pdf.setTextColor(...primary);
      pdf.setFontSize(16);
      pdf.text('December 2025  •  Indore, India', pageWidth / 2, frameY + 80, { align: 'center' });

      // Schedule pages
      pdf.addPage();
      pdf.setFillColor(...surface);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Header
      pdf.setTextColor(...primary);
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Schedule of Events', pageWidth / 2, 30, { align: 'center' });

      addDivider(38);

      let yPosition = 50;

      // Process events grouped by date
      for (const date of sortedDates) {
        const eventsForDate = grouped[date];
        const dateObj = new Date(date + 'T00:00');
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const monthDay = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        const dateStr = `${dayName}, ${monthDay}`;

        // Check if we need space for date header + at least one event
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          pdf.setFillColor(...surface);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          yPosition = 30;
        }

        // Date header - centered above events
        pdf.setTextColor(...accent);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(dateStr, pageWidth / 2, yPosition, { align: 'center' });

        yPosition += 12;

        // Events for this date
        for (const evt of eventsForDate) {
          // Calculate card height based on content
          let cardHeight = 25; // Base height for name and bottom row
          const cardDescription = getEventDescription(evt, upper);
          if (cardDescription) {
            const wrappedDesc = pdf.splitTextToSize(cardDescription, contentWidth - 30);
            cardHeight += wrappedDesc.length * 4 + 8;
          }

          // Check if card fits on current page
          if (yPosition + cardHeight > pageHeight - 30) {
            pdf.addPage();
            pdf.setFillColor(...cream);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            yPosition = 30;
          }

          // Draw event card
          pdf.setFillColor(...white);
          pdf.setDrawColor(...accent);
          pdf.setLineWidth(0.8);
          pdf.roundedRect(margin, yPosition, contentWidth, cardHeight, 2, 2, 'FD');

          // Event name - centered at top
          pdf.setTextColor(...primary);
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text(getEventTitle(evt, upper).toUpperCase(), pageWidth / 2, yPosition + 10, { align: 'center' });

          // Event description - centered
          let currentY = yPosition + 10;
          const eventDescription = getEventDescription(evt, upper);
          if (eventDescription) {
            pdf.setTextColor(...muted);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const wrappedDesc = pdf.splitTextToSize(eventDescription, contentWidth - 30);
            currentY += 8;
            for (const line of wrappedDesc) {
              pdf.text(line, pageWidth / 2, currentY, { align: 'center' });
              currentY += 4;
            }
          }

          // Bottom row with time and venue
          const bottomY = yPosition + cardHeight - 7;

          // Time on left
          if (evt.time) {
            pdf.setTextColor(...primary);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.text(evt.time, margin + 10, bottomY);
          }

          // Venue on right (with link if available)
          if (evt.location) {
            pdf.setTextColor(...primary);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const venueText = evt.location;
            const venueWidth = pdf.getTextWidth(venueText);
            pdf.text(venueText, pageWidth - margin - 10 - venueWidth, bottomY);
          }

          yPosition += cardHeight + 8;
        }

        yPosition += 5; // Extra space between dates
      }

      // Save the PDF
      pdf.save(`Aastha-Preetesh-Wedding-${group.toUpperCase()}-Events.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [grouped, sortedDates, group, pdfPalette, isGeneratingPDF]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      
      <main className={`flex-1 relative ${isThemed ? '' : 'bg-cream'}`}>
        {!isThemed && (
          <div
            className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
        <div className="relative z-10 pt-24 pb-12 px-4">
          <div className={contentWrapperClass}>
            <h1 className="text-2xl sm:text-3xl font-serif text-center text-navy mb-4 capitalize">
              Wedding Festivities!
            </h1>
            <p className="text-center text-navy/70 mb-6">
              Get ready to celebrate with us across multiple magical events! <br /> Below you will find
              the When and Where for each celebration—{' '}
              <span className="text-burgundy">just tap to flip any plate</span> to dive into all the details.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {(upper === 'FRIENDS' || upper === 'INVITEES' || upper === 'GUESTS') && (
                <a href={`/${group}/rsvp`} className={ctaButtonClass}>
                  RSVP now!
                </a>
              )}

              {(upper === 'BRIDE' || upper === 'GROOM') && (
                <a href={`/${group}/outfits`} className={ctaButtonClass}>
                  View outfit guide
                </a>
              )}

              {upper !== 'BRIDE' && upper !== 'GROOM' && (
                <button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className={ctaButtonClass}
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Schedule</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {sortedDates.map((date) => (
              <section key={date} className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-navy mb-4 text-center">
                  {new Date(date + 'T00:00').toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h2>
                <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[date].map((evt) => (
                    <EventCard
                      key={evt.id}
                      evt={evt}
                      userGroup={upper}
                      isFlipped={flippedId === evt.id}
                      onFlip={() => setFlippedId(flippedId === evt.id ? null : evt.id)}
                      isThemed={isThemed}
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
      </main>
      <Footer />
    </div>
  );
}

// Memoized EventCard component for better performance
const EventCard = React.memo(({ evt, userGroup, isFlipped, onFlip, isThemed }) => {
  const cardStyle = {
    width: '100%',
    paddingBottom: '50%',
    position: 'relative',
    perspective: '1000px',
    cursor: 'pointer',
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
    boxShadow: isThemed
      ? '0 20px 48px rgba(15, 48, 95, 0.18)'
      : '0 4px 6px rgba(0,0,0,0.1)',
  };

  const backFaceColor = isThemed ? 'rgba(239, 248, 255, 0.94)' : '#F7F2E9';

  return (
    <div
      className="w-full hover-hover:hover:scale-105 transition-transform duration-200"
      style={cardStyle}
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? `Show front of ${getEventTitle(evt, userGroup)}` : `Show details of ${getEventTitle(evt, userGroup)}`}
    >
      <div style={panelStyle}>
        {/* Front Face */}
        <div style={faceStyle}>
          <Image
            src={`/images/final-event-plates/${getEventImage(evt, userGroup)}.png`}
            alt={getEventTitle(evt, userGroup)}
            fill
            className="object-cover"
            quality={75}
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"></div>
        </div>

        {/* Back Face */}
        <div style={{ ...faceStyle, transform: 'rotateY(180deg)', backgroundColor: backFaceColor }}>
          <div className="relative h-full p-4 sm:p-6">
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-lg sm:text-xl font-semibold text-navy mb-3">{getEventTitle(evt, userGroup)}</h3>

              {/* Time & Location Info */}
              <div className="space-y-2 mb-4 text-sm">
                {evt.time && (
                  <div className="flex items-center gap-2 text-navy/90">
                    <Clock className="w-4 h-4 text-burgundy flex-shrink-0" />
                    <span className="font-medium">{evt.time}</span>
                  </div>
                )}
                {evt.location && (
                  <div className="flex items-center gap-2 text-navy/90">
                    <MapPin className="w-4 h-4 text-burgundy flex-shrink-0" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-medium text-burgundy hover:underline"
                    >
                      {evt.location}
                    </a>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-navy/80">{getEventDescription(evt, userGroup)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

EventsPage.noLayout = true;

/* Tailwind utilities:
.perspective { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.transition-transform { transition-property: transform; }
.duration-600 { transition-duration: 600ms; }
.ease-in-out { transition-timing-function: ease-in-out; }
*/
