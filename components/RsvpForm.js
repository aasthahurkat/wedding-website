// components/RsvpForm.jsx
import { useState } from "react";

export default function RsvpForm({ accessGroup, onSubmitted }) {
  const [form, setForm] = useState({
    attending: "",
    arrival: "",
    return: "",
    guest: "",
    outfitHelp: "",
    email: "",
    dietary: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: send `form` + { accessGroup } to backend
    if (typeof onSubmitted === "function") onSubmitted(form);
  };

  const isAttending = form.attending === "yes";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-lg mx-auto px-4 sm:px-0"
      noValidate
    >
      {/* Attendance */}
      <fieldset className="space-y-2">
        <legend className="font-medium text-lg">Will you attend?</legend>
        <select
          id="attending"
          name="attending"
          value={form.attending}
          onChange={handleChange}
          required
          aria-required="true"
          className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
        >
          <option value="">Choose…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </fieldset>

      {isAttending && (
        <>
          {/* Travel Dates */}
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <legend className="sr-only">Travel Dates</legend>

            <div className="space-y-2">
              <label htmlFor="arrival" className="block font-medium">
                Arrival Date
              </label>
              <input
                type="date"
                id="arrival"
                name="arrival"
                value={form.arrival}
                onChange={handleChange}
                required
                aria-required="true"
                className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="return" className="block font-medium">
                Return Date
              </label>
              <input
                type="date"
                id="return"
                name="return"
                value={form.return}
                onChange={handleChange}
                className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
              />
            </div>
          </fieldset>

          {/* Guest & Outfit Help */}
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <legend className="sr-only">Guest &amp; Outfit Help</legend>

            <div className="space-y-2">
              <label htmlFor="guest" className="block font-medium">
                Bringing a guest?
              </label>
              <select
                id="guest"
                name="guest"
                value={form.guest}
                onChange={handleChange}
                required
                aria-required="true"
                className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
              >
                <option value="">Choose…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="outfitHelp" className="block font-medium">
                Need outfit help?
              </label>
              <select
                id="outfitHelp"
                name="outfitHelp"
                value={form.outfitHelp}
                onChange={handleChange}
                className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
              >
                <option value="">Choose…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </fieldset>

          {/* Additional Info */}
          <fieldset className="space-y-4">
            <legend className="font-medium text-lg">Additional Details</legend>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                aria-required="true"
                className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dietary" className="block font-medium">
                Dietary Restrictions
              </label>
              <input
                type="text"
                id="dietary"
                name="dietary"
                value={form.dietary}
                onChange={handleChange}
                className="mt-1 block w-full border-neutral rounded-md shadow-sm focus:ring-secondary focus:border-secondary"
                placeholder="e.g. vegetarian, gluten-free"
              />
            </div>
          </fieldset>
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!form.attending}
        className={`
          mt-2 w-full inline-flex justify-center py-3 px-6
          rounded-md shadow
          ${
            form.attending
              ? "bg-secondary hover:bg-secondary/90 text-white"
              : "bg-neutral text-gray-400 cursor-not-allowed"
          }
          transition
        `}
      >
        Submit RSVP
      </button>
    </form>
  );
}
