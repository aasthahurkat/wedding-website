// File: pages/[group]/events.js
import Image from 'next/image';
import { Clock, MapPin, Download } from 'lucide-react';
import React, { useState, useMemo, useCallback } from 'react';
import { events } from '../../data/events';
import { ACCESS_GROUPS } from '../../data/accessGroups';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Lazy load jsPDF only when needed for better initial page load
const loadJsPDF = () => import('jspdf');

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

      // Original color palette - burgundy and navy focused
      const burgundy = [139, 69, 84];
      const navy = [31, 45, 62];
      const cream = [252, 250, 247];
      const gray = [120, 120, 120];
      const white = [255, 255, 255];

      // Helper function for simple divider
      const addDivider = (y, width = contentWidth * 0.4, color = burgundy) => {
        const x = (pageWidth - width) / 2;
        pdf.setDrawColor(...color);
        pdf.setLineWidth(0.5);
        pdf.line(x, y, x + width, y);
      };

      // Title page with centered content
      pdf.setFillColor(...cream);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Calculate vertical center
      const centerY = pageHeight / 2;

      // Main frame - centered
      const frameHeight = 100;
      const frameY = centerY - frameHeight / 2;
      pdf.setDrawColor(...burgundy);
      pdf.setLineWidth(2);
      pdf.rect(margin + 10, frameY, contentWidth - 20, frameHeight);
      pdf.setLineWidth(0.5);
      pdf.rect(margin + 12, frameY + 2, contentWidth - 24, frameHeight - 4);

      // Title - centered in frame
      pdf.setTextColor(...navy);
      pdf.setFontSize(38);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Wedding Celebration', pageWidth / 2, frameY + 30, { align: 'center' });

      // Decorative line
      addDivider(frameY + 40, contentWidth * 0.3, burgundy);

      // Couple names
      pdf.setTextColor(...burgundy);
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Aastha & Preetesh', pageWidth / 2, frameY + 60, { align: 'center' });

      // Date and location
      pdf.setTextColor(...navy);
      pdf.setFontSize(16);
      pdf.text('December 2025  •  Indore, India', pageWidth / 2, frameY + 80, { align: 'center' });

      // Schedule pages
      pdf.addPage();
      pdf.setFillColor(...cream);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Header
      pdf.setTextColor(...navy);
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
          pdf.setFillColor(...cream);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          yPosition = 30;
        }

        // Date header - centered above events
        pdf.setTextColor(...burgundy);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(dateStr, pageWidth / 2, yPosition, { align: 'center' });

        yPosition += 12;

        // Events for this date
        for (const evt of eventsForDate) {
          // Calculate card height based on content
          let cardHeight = 25; // Base height for name and bottom row
          if (evt.description) {
            const wrappedDesc = pdf.splitTextToSize(evt.description, contentWidth - 30);
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
          pdf.setDrawColor(...burgundy);
          pdf.setLineWidth(0.8);
          pdf.roundedRect(margin, yPosition, contentWidth, cardHeight, 2, 2, 'FD');

          // Event name - centered at top
          pdf.setTextColor(...navy);
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text(evt.title.toUpperCase(), pageWidth / 2, yPosition + 10, { align: 'center' });

          // Event description - centered
          let currentY = yPosition + 10;
          if (evt.description) {
            pdf.setTextColor(...gray);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const wrappedDesc = pdf.splitTextToSize(evt.description, contentWidth - 30);
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
            pdf.setTextColor(...navy);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.text(evt.time, margin + 10, bottomY);
          }

          // Venue on right (with link if available)
          if (evt.location) {
            pdf.setTextColor(...navy);
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
  }, [grouped, sortedDates, group]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />

      <main className="flex-1 relative bg-cream">
        <div
          className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-4">Wedding Events</h1>
            <p className="text-navy/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Join us for these beautiful celebrations as we begin our journey together
            </p>

            {/* Download PDF Button */}
            <div className="mt-6">
              <button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center px-6 py-3 bg-burgundy text-ivory rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download Schedule'}
              </button>
            </div>
          </div>

          {/* Events by Date */}
          <div className="space-y-8 sm:space-y-12">
            {sortedDates.map((date) => (
              <DateSection 
                key={date} 
                date={date} 
                events={grouped[date]} 
                flippedId={flippedId}
                setFlippedId={setFlippedId}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Memoized DateSection component for better performance
const DateSection = React.memo(({ date, events, flippedId, setFlippedId }) => {
  const dateObj = new Date(date + 'T00:00');
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div>
      {/* Date Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-serif text-burgundy mb-2">
          {dayName}
        </h2>
        <p className="text-navy/80 text-lg">{monthDay}</p>
      </div>

      {/* Events for this date */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {events.map((evt) => (
          <EventCard
            key={evt.id}
            evt={evt}
            isFlipped={flippedId === evt.id}
            onFlip={setFlippedId}
          />
        ))}
      </div>
    </div>
  );
});

DateSection.displayName = 'DateSection';

// Memoized EventCard component for better performance
const EventCard = React.memo(({ evt, isFlipped, onFlip }) => {
  const handleFlip = useCallback(() => {
    onFlip(isFlipped ? null : evt.id);
  }, [isFlipped, evt.id, onFlip]);

  return (
    <div className="relative h-64 sm:h-72 perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-ivory rounded-lg shadow-lg border border-neutral/20 p-4 sm:p-6">
          <div className="h-full flex flex-col">
            <div className="flex-grow">
              <h3 className="text-lg sm:text-xl font-serif text-navy mb-2 sm:mb-3">
                {evt.title}
              </h3>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex items-center text-navy/80">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-start text-navy/80">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-navy/60">Tap for details</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-burgundy/10 rounded-lg shadow-lg border border-burgundy/20 p-4 sm:p-6">
          <div className="h-full flex flex-col">
            <h3 className="text-lg sm:text-xl font-serif text-navy mb-3 sm:mb-4">
              {evt.title}
            </h3>
            <div className="flex-grow">
              <p className="text-navy/80 text-sm sm:text-base leading-relaxed">
                {evt.description}
              </p>
            </div>
            {evt.outfits && evt.outfits.length > 0 && (
              <div className="mt-4 pt-4 border-t border-burgundy/20">
                <h4 className="font-medium text-navy text-sm mb-2">Suggested Attire:</h4>
                <div className="flex flex-wrap gap-1">
                  {evt.outfits.map((outfit, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-burgundy/20 text-burgundy rounded text-xs"
                    >
                      {outfit}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 text-center">
              <span className="text-xs text-navy/60">Tap to go back</span>
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
