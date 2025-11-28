import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from '../data/navItems';
import { useState, useEffect, useMemo } from 'react';

export default function Navbar({ currentGroup }) {
  const { asPath, query } = useRouter();
  const groupParam = (currentGroup || query.group || '').toString().toLowerCase();
  const filteredItems = NAV_ITEMS.filter((item) =>
    item.allowedGroups.map((g) => g.toLowerCase()).includes(groupParam)
  );
  const [open, setOpen] = useState(false);

  const theme = useMemo(() => {
    if (groupParam === 'bride' || groupParam === 'groom') {
      return {
        navBackground: 'bg-sky-100/90',
        mobileBackground: 'bg-sky-100/95',
        linkText: 'text-sky-900',
        linkHover: 'hover:text-sky-700 hover:bg-sky-50',
        activeText: 'text-sky-700',
        activeBorder: 'border-sky-700',
        hamburgerBar: 'bg-sky-600',
        focusRing: 'focus:ring-sky-500',
      };
    }

    return {
      navBackground: 'bg-ivory/90',
      mobileBackground: 'bg-ivory/95',
      linkText: 'text-card-black',
      linkHover: 'hover:text-primary hover:bg-neutral/50',
      activeText: 'text-secondary',
      activeBorder: 'border-secondary',
      hamburgerBar: 'bg-primary',
      focusRing: 'focus:ring-primary',
    };
  }, [groupParam]);

  // Close mobile menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        setOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  return (
    <nav
      role="navigation"
      translate="no"
      className={`fixed inset-x-0 top-0 backdrop-blur-sm shadow-card z-30 notranslate ${theme.navBackground}`}
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
                      ? `${theme.activeText} border-b-2 ${theme.activeBorder}`
                      : `${theme.linkText} ${theme.linkHover}`
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
          className={`md:hidden p-2 focus:outline-none focus:ring-2 ${theme.focusRing} rounded`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 ${theme.hamburgerBar} mb-1`}></span>
          <span className={`block w-6 h-0.5 ${theme.hamburgerBar} mb-1`}></span>
          <span className={`block w-6 h-0.5 ${theme.hamburgerBar}`}></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className={`md:hidden backdrop-blur-sm shadow-inner ${theme.mobileBackground}`}>
          <div className="space-y-1 px-4 pb-4">
            {filteredItems.map((item) => {
              const href = item.href.replace('[group]', groupParam);

              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${theme.linkText} ${theme.linkHover}`}
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
