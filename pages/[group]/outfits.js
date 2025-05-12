// pages/[group]/outfits.js
import { useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { ACCESS_GROUPS } from "../../data/accessGroups";
import { events } from "../../data/events";

// 1) Tell Next which URLs to pre-render
export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({
      params: { group: g.key.toLowerCase() },
    })),
    fallback: false,
  };
}

// 2) Validate the `group` param and pass it to the page
export async function getStaticProps({ params }) {
  const group = params.group.toLowerCase();
  if (!ACCESS_GROUPS.some((g) => g.key.toLowerCase() === group)) {
    return { notFound: true };
  }
  return { props: { group } };
}

export default function OutfitsPage({ group }) {
  const router = useRouter();
  // While Next is building, router.query might be undefined, but since fallback=false, this is safe:
  const current = group || router.query.group;

  // Only bride & groom should see this page
  if (!["bride", "groom"].includes(current)) {
    return (
      <div className="p-8 text-center text-gray-500">
        Nothing to see here.
      </div>
    );
  }

  // Filter your events data for those that include this group
  const upperGroup = current.toUpperCase();
  const myEvents = useMemo(
    () => events.filter((e) => e.allowedGroups.includes(upperGroup)),
    [upperGroup]
  );

  return (
    <>
      {/* 3) Render the shared Navbar */}
      <Navbar currentGroup={current} />

      {/* 4) Page content */}
      <main className="bg-ivory min-h-screen pt-20 px-6 lg:px-24 pb-12">
        <h1 className="text-3xl font-serif text-center text-navy mb-12">
          What to Wear
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white p-6 rounded-2xl shadow-sm text-center"
            >
              <h2 className="font-semibold text-xl mb-2">{ev.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{ev.date}</p>

              {ev.outfits?.length ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {ev.outfits.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-gray-400">Coming soon!</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
