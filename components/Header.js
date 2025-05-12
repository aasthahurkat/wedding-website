// components/Header.jsx
import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_ITEMS } from "../data/navItems";

export default function Header({ currentGroup }) {
  const { asPath } = useRouter();

  return (
    <header className="bg-ivory py-6 sm:py-8">
      <div className="container">
        {/* Site Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-header text-center text-primary mb-4">
          Aastha&nbsp;&amp;&nbsp;Preetesh
        </h1>

        {/* Navigation */}
        <nav aria-label="Primary">
          <ul className="flex flex-wrap justify-center gap-x-4 sm:gap-x-10 gap-y-2">
            {NAV_ITEMS.filter(item =>
              item.allowedGroups.includes(currentGroup)
            ).map(item => {
              const href = item.href.replace(
                "[group]",
                currentGroup.toLowerCase()
              );
              const isActive = asPath === href;

              return (
                <li key={item.key}>
                  <Link
                    href={href}
                    className={`
                      px-1 pb-1 text-base sm:text-lg font-medium transition-colors duration-200
                      ${
                        isActive
                          ? "text-secondary border-b-4 border-secondary"
                          : "text-card-black hover:text-primary hover:border-b-4 hover:border-neutral"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Section Divider */}
      <hr className="section-divider" />
    </header>
  );
}
