import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from '../data/navItems';
import { useState, useEffect } from 'react';
import { getGroupTheme } from '../lib/groupThemes';

export default function Navbar({ currentGroup }) {
  const { asPath, query } = useRouter();
  const groupParam = (currentGroup || query.group || '').toString().toLowerCase();
  const filteredItems = NAV_ITEMS.filter((item) =>
    item.allowedGroups.map((g) => g.toLowerCase()).includes(groupParam)
  );
  const [open, setOpen] = useState(false);
  const theme = getGroupTheme(groupParam);
  const isThemed = theme.themed;
  const brandMark = theme.initials || theme.crest;
  const brandAlt = theme.initials ? 'Aastha & Preetesh initials' : theme.crestAlt || 'Aastha & Preetesh crest';

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
      className={`fixed inset-x-0 top-0 z-30 notranslate transition-[background,box-shadow] duration-500 ${
        isThemed ? 'backdrop-blur-md border-b border-transparent' : 'bg-ivory/90 backdrop-blur-sm shadow-card'
      }`}
      style={
        isThemed
          ? {
              background: 'linear-gradient(135deg, rgba(15,48,95,0.88) 0%, rgba(29,79,132,0.82) 70%)',
              boxShadow: '0 14px 38px rgba(15, 48, 95, 0.24)',
            }
          : undefined
      }
    >
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          {isThemed && brandMark && (
            <Link
              href={`/${groupParam || 'bride'}`}
              className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 shadow-[0_10px_24px_rgba(15,48,95,0.3)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 sm:inline-flex"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-70" aria-hidden="true" />
              <Image src={brandMark} alt={brandAlt} width={32} height={32} className="relative h-8 w-auto" priority />
            </Link>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {filteredItems.map((item) => {
            const href = item.href.replace('[group]', groupParam);
            const isActive = asPath === href;

            return (
              <Link
                key={item.key}
                href={href}
                className={`
                  px-3 py-2 text-sm sm:text-base font-medium rounded-md border-b-2 border-transparent transition-colors duration-200
                  ${
                    isActive
                      ? isThemed
                        ? 'text-[#EFF8FF] border-[#71B7E7]'
                        : 'text-secondary border-secondary'
                      : isThemed
                      ? 'text-white/80 hover:text-white hover:border-[#71B7E7]/60'
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
          className={`md:hidden p-2 rounded focus:outline-none focus:ring-2 ${
            isThemed ? 'focus:ring-[#71B7E7]/60' : 'focus:ring-primary'
          }`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 mb-1 transition-colors ${isThemed ? 'bg-[#EFF8FF]' : 'bg-primary'}`} />
          <span className={`block w-6 h-0.5 mb-1 transition-colors ${isThemed ? 'bg-[#EFF8FF]' : 'bg-primary'}`} />
          <span className={`block w-6 h-0.5 transition-colors ${isThemed ? 'bg-[#EFF8FF]' : 'bg-primary'}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          className={`md:hidden shadow-inner ${
            isThemed ? 'border-t border-[#71B7E7]/30' : 'bg-ivory/95 backdrop-blur-sm'
          }`}
          style={
            isThemed
              ? {
                  background: 'linear-gradient(135deg, rgba(15,48,95,0.95) 0%, rgba(29,79,132,0.9) 70%)',
                  backdropFilter: 'blur(14px)',
                }
              : undefined
          }
        >
          <div className="space-y-1 px-4 pb-4">
            {filteredItems.map((item) => {
              const href = item.href.replace('[group]', groupParam);

              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isThemed
                      ? 'text-white/80 hover:text-white hover:bg-[#71B7E7]/20'
                      : 'text-card-black hover:text-primary hover:bg-neutral/50'
                  }`}
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