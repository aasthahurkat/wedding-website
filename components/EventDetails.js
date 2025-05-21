// components/EventDetails.jsx
import { CalendarIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function EventDetails({ ev }) {
  const eventDate = new Date(ev.datetime);
  const formattedWeekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(eventDate);
  const formattedDay = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
  }).format(eventDate);
  const formattedMonthYear = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(eventDate);

  const handleAddToCalendar = () => {
    const dtStart = eventDate
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
    const dtEnd = new Date(eventDate.getTime() + 60 * 60 * 1000) // +1 hour
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `UID:${ev.id}@yourdomain.com`,
      `DTSTAMP:${dtStart}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${ev.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Static map thumbnail (replace YOUR_API_KEY with a real key in env)
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    ev.mapQuery
  )}&zoom=15&size=300x300&markers=color:red%7C${encodeURIComponent(
    ev.mapQuery
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <section
      aria-labelledby="event-title"
      className="mx-auto w-full max-w-lg bg-card rounded-lg shadow-card overflow-hidden
                 px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8"
    >
      {/* Header */}
      <header className="text-center mb-4">
        <h2
          id="event-title"
          className="font-script text-2xl sm:text-3xl text-secondary mb-2"
        >
          {ev.title}
        </h2>
        <div className="text-primary uppercase text-sm sm:text-base font-medium">
          {formattedWeekday}
        </div>
        <div className="mt-1 grid grid-flow-row gap-0 leading-tight">
          <span className="text-3xl sm:text-5xl font-serif text-primary">
            {formattedDay}
          </span>
          <span className="text-sm sm:text-base font-medium">
            {formattedMonthYear}
          </span>
        </div>
      </header>

      <div className="border-t border-gray-200 my-4" />

      {/* Time & Add to Calendar */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 px-0 sm:px-6">
        <span className="text-xl sm:text-2xl font-semibold text-primary">
          {new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(eventDate)}
        </span>
        <CalendarIcon className="w-6 h-6 text-gray-500" />
        <button
          onClick={handleAddToCalendar}
          aria-label={`Add ${ev.title} to your calendar`}
          className="text-sm text-gray-600 hover:underline"
        >
          Add to Calendar
        </button>
      </div>

      <div className="border-t border-gray-200 my-4" />

      {/* Venue */}
      <div className="text-center px-4 sm:px-6">
        <p className="text-gray-700">
          <strong>{ev.location}</strong>
        </p>
      </div>

      <div className="border-t border-gray-200 my-4" />

      {/* Map Thumbnail */}
      <div className="flex flex-col items-center pb-8">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(ev.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-32 h-32 rounded-full overflow-hidden shadow-md"
        >
          <Image
            src={staticMapUrl}
            alt={`Map of ${ev.location}`}
            width={300}
            height={300}
            className="object-cover"
            placeholder="blur"
            blurDataURL="/images/map-placeholder.png"
          />
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(ev.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-xs text-gray-600 hover:underline"
        >
          Map to venue →
        </a>
      </div>
    </section>
  );
}
