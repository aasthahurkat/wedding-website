// components/Navbar.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from '../data/navItems';
import { useState } from 'react';

export default function Navbar({ currentGroup }) {
  const { asPath, query } = useRouter();
  const groupParam = (currentGroup || query.group || '').toString().toLowerCase();
  const filteredItems = NAV_ITEMS.filter((item) =>
    item.allowedGroups.map((g) => g.toLowerCase()).includes(groupParam)
  );
  const [open, setOpen] = useState(false);

  return (
    <nav
      role="navigation"
      className="fixed inset-x-0 top-0 bg-ivory/90 backdrop-blur-sm shadow-card z-30"
    >
      <div className="container flex items-center justify-between py-4">
        {/* Branding or Logo could go here if needed */}

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {filteredItems.map((item) => {
            const href = item.href.replace('[group]', groupParam);
            const isActive = asPath === href;
            return (
              <Link
                key={item.key}
                href={href}
                className={`
                  px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-card-black hover:text-primary hover:bg-neutral/50'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-primary mb-1"></span>
          <span className="block w-6 h-0.5 bg-primary mb-1"></span>
          <span className="block w-6 h-0.5 bg-primary"></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-ivory/95 backdrop-blur-sm shadow-inner">
          <div className="space-y-1 px-4 pb-4">
            {filteredItems.map((item) => {
              const href = item.href.replace('[group]', groupParam);
              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-card-black rounded-md hover:text-primary hover:bg-neutral/50"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
