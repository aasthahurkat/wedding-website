import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Gift, ExternalLink, Heart } from 'lucide-react';

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({ params: { group: g.key.toLowerCase() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // TEMPORARILY DISABLED - UNCOMMENT BEFORE FINAL LAUNCH
  return { notFound: true };
  
  // const group = params.group.toLowerCase();
  // const valid = ACCESS_GROUPS.map((g) => g.key.toLowerCase());
  // if (!valid.includes(group)) return { notFound: true };

  // // Only allow friends to access this page
  // if (group.toUpperCase() !== 'FRIENDS') {
  //   return { notFound: true };
  // }

  // return { props: { group } };
}

// TEMPORARILY COMMENTED OUT - UNCOMMENT BEFORE FINAL LAUNCH
// Dummy registry data - replace with real registries later
// const registryItems = [
//   {
//     id: 1,
//     name: 'Kitchen Essentials',
//     store: 'Williams Sonoma',
//     url: 'https://www.williams-sonoma.com',
//     description: 'Everything we need to cook together as newlyweds',
//     image: '/images/registry/kitchen.jpg',
//     color: 'bg-rose-100',
//   },
//   {
//     id: 2,
//     name: 'Home & Decor',
//     store: 'Pottery Barn',
//     url: 'https://www.potterybarn.com',
//     description: 'Beautiful pieces to make our house a home',
//     image: '/images/registry/home.jpg',
//     color: 'bg-blue-100',
//   },
//   {
//     id: 3,
//     name: 'Adventures Together',
//     store: 'REI Co-op',
//     url: 'https://www.rei.com',
//     description: 'Gear for all our future adventures and travels',
//     image: '/images/registry/adventure.jpg',
//     color: 'bg-green-100',
//   },
//   {
//     id: 4,
//     name: 'General Registry',
//     store: 'Amazon',
//     url: 'https://www.amazon.com',
//     description: 'A variety of items for our new life together',
//     image: '/images/registry/general.jpg',
//     color: 'bg-purple-100',
//   },
// ];

export default function RegistryPage() {
  // TEMPORARILY DISABLED - UNCOMMENT BEFORE FINAL LAUNCH
  return null;
  
  // return (
  //   <div className="relative bg-cream min-h-screen">
  //     <div
  //       className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
  //       aria-hidden="true"
  //     />
  //     <div className="relative z-10 pt-20 pb-24 px-4 max-w-6xl mx-auto">
  //       {/* Header */}
  //       <div className="text-center mb-12">
  //         <div className="flex justify-center mb-4">
  //           <Gift className="w-12 h-12 text-burgundy" />
  //         </div>
  //         <h1 className="text-3xl font-serif text-navy mb-4">Gift Registry</h1>
  //         <p className="text-navy/70 max-w-2xl mx-auto mb-6">
  //           For those who've asked for some inspiration, we've put together a few ideas below. We're just excited to celebrate with you!
  //         </p>
  //         <div className="flex items-center justify-center gap-2 text-burgundy">
  //           <Heart className="w-5 h-5" />
  //           <span className="font-medium">With love and gratitude</span>
  //           <Heart className="w-5 h-5" />
  //         </div>
  //       </div>

  //       {/* Registry Cards */}
  //       <div className="grid gap-8 md:grid-cols-2">
  //         {registryItems.map((item) => (
  //           <div
  //             key={item.id}
  //             className="bg-ivory rounded-lg shadow-lg overflow-hidden border border-neutral/20 hover:shadow-xl transition-shadow"
  //           >
  //             {/* Card Header */}
  //             <div className={`${item.color} p-6 text-center`}>
  //               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <Gift className="w-8 h-8 text-burgundy" />
  //               </div>
  //               <h3 className="text-xl font-serif text-navy mb-2">{item.name}</h3>
  //               <p className="text-sm text-navy/80 font-medium">{item.store}</p>
  //             </div>

  //             {/* Card Content */}
  //             <div className="p-6">
  //               <p className="text-navy/70 mb-6 text-center">{item.description}</p>

  //               {/* CTA Button */}
  //               <div className="text-center">
  //                 <a
  //                   href={item.url}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   className="inline-flex items-center px-6 py-3 bg-burgundy text-ivory rounded-lg hover:bg-burgundy/90 transition-colors gap-2"
  //                 >
  //                   <span>View Registry</span>
  //                   <ExternalLink className="w-4 h-4" />
  //                 </a>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Additional Notes */}
  //       <div className="mt-12 text-center">
  //         <div className="bg-ivory/80 rounded-lg p-6 max-w-2xl mx-auto border border-neutral/20">
  //           <h3 className="text-lg font-serif text-navy mb-3">A Note About Gifts</h3>
  //           <p className="text-navy/70 text-sm leading-relaxed">
  //             We're so grateful for your love and support as we begin this new chapter. If you
  //             prefer to give a monetary gift, we've also set up options for contributions
  //             toward our honeymoon fund and future home. Most importantly, we just can't wait
  //             to celebrate with you!
  //           </p>
  //         </div>
  //       </div>

  //       {/* Placeholder Notice */}
  //       <div className="mt-8 text-center">
  //         <div className="inline-block bg-amber-50 border border-amber-200 rounded-lg p-4">
  //           <p className="text-amber-800 text-sm">
  //             <strong>Coming Soon:</strong> We're still finalizing our registry details. Check
  //             back soon for updated links and more specific wish lists!
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
