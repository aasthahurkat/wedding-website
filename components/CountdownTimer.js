// components/CountdownTimer.jsx
import Countdown from "react-countdown";

export default function CountdownTimer({ targetDate }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="col-span-full text-center text-secondary font-header text-2xl">
          We’re married! 🎉
        </div>
      );
    }
    const units = [
      { value: days, label: "Days" },
      { value: hours, label: "Hours" },
      { value: minutes, label: "Minutes" },
      { value: seconds, label: "Seconds" },
    ];

    return units.map(({ value, label }) => (
      <div key={label} className="flex flex-col items-center">
        <span className="text-3xl sm:text-5xl font-header text-secondary">
          {value}
        </span>
        <span className="mt-1 text-xs sm:text-sm uppercase tracking-widest text-card-black">
          {label}
        </span>
      </div>
    ));
  };

  return (
    <section
      role="timer"
      aria-live="off"
      aria-atomic="true"
      className="container grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center py-8"
    >
      <Countdown date={new Date(targetDate)} renderer={renderer} />
    </section>
  );
}
