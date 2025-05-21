
// pages/our‑story.js

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function OurStory() {
  const slides = [
    { id: 1, title: 'First Meeting', text: 'Our story begins when...' },
    { id: 2, title: 'First Date',    text: 'We went to...' },
    { id: 3, title: 'Proposal',       text: 'A surprise on the beach...' },
    { id: 4, title: 'Engagement',     text: 'Friends and family...' },
    { id: 5, title: 'Wedding Plans',  text: 'Now we plan...' }
  ];
  const [active, setActive] = useState(slides[0]);

  return (
    <div className="bg-ivory min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-heading text-maroon mb-6">Our Story</h2>
        <div className="flex space-x-4 overflow-x-auto mb-6">
          {slides.map(slide => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-32 h-32 bg-gray-200 cursor-pointer"
              onClick={() => setActive(slide)}
            />
          ))}
        </div>
        <div className="p-4 bg-beige rounded">
          <h3 className="font-heading text-2xl text-maroon mb-2">{active.title}</h3>
          <p>{active.text}</p>
        </div>
      </section>
    </div>
  );
}
