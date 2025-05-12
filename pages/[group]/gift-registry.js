
// pages/gift‑registry.js

import Navbar from '../components/Navbar';

export default function GiftRegistry() {
  const items = [
    { name: 'Placeholder Item 1', link: '#' },
    { name: 'Placeholder Item 2', link: '#' },
    { name: 'Placeholder Item 3', link: '#' },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-heading text-maroon mb-6">Gift Registry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="p-4 bg-beige rounded-lg">
              <h3 className="font-heading text-xl mb-2">{item.name}</h3>
              <a href={item.link} className="text-saffron underline">View</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
