import { ShoppingBag, MapPin, Globe, Clock, Phone, Star, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ShoppingPage() {
  const router = useRouter();
  const localStores = [
    {
      name: "Ranas Fashion",
      type: "Traditional & Designer Wear",
      location: "Palasia Square",
      phone: "+91 98765 43210",
      rating: 4.5,
      specialty: "Lehengas, Sarees, Indo-Western",
      mapQuery: "Ranas Fashion Palasia Square Indore"
    },
    {
      name: "Bombay Selection",
      type: "Premium Indian Wear",
      location: "Treasure Island Mall",
      phone: "+91 98765 43211",
      rating: 4.3,
      specialty: "Designer Suits, Sherwanis, Gowns",
      mapQuery: "Bombay Selection Treasure Island Mall Indore"
    },
    {
      name: "FabIndia",
      type: "Ethnic & Fusion",
      location: "Multiple Locations",
      phone: "+91 98765 43212",
      rating: 4.2,
      specialty: "Cotton Kurtas, Handloom Fabrics",
      mapQuery: "FabIndia Indore"
    },
    {
      name: "Meena Bazaar",
      type: "Traditional Wear",
      location: "Sarafa Bazaar",
      phone: "+91 98765 43213",
      rating: 4.4,
      specialty: "Sarees, Traditional Jewelry",
      mapQuery: "Meena Bazaar Sarafa Indore"
    }
  ];

  const onlineStores = [
    {
      name: "Myntra",
      url: "https://myntra.com",
      specialty: "Wide range of ethnic & western wear",
      delivery: "2-3 days",
      rating: 4.3
    },
    {
      name: "Ajio",
      url: "https://ajio.com",
      specialty: "Designer & traditional collections",
      delivery: "3-5 days",
      rating: 4.2
    },
    {
      name: "Nykaa Fashion",
      url: "https://nykaafashion.com",
      specialty: "Premium ethnic wear & accessories",
      delivery: "2-4 days",
      rating: 4.4
    },
    {
      name: "Amazon Fashion",
      url: "https://amazon.in",
      specialty: "Everything from budget to premium",
      delivery: "1-2 days",
      rating: 4.1
    }
  ];

  const rentalOptions = [
    {
      name: "Flyrobe",
      location: "Indore & Online",
      phone: "+91 98765 43220",
      specialty: "Designer lehengas, suits, gowns",
      priceRange: "₹2,000 - ₹15,000",
      rating: 4.3
    },
    {
      name: "Stage3",
      location: "Online Delivery",
      phone: "+91 98765 43221",
      specialty: "Premium designer wear",
      priceRange: "₹3,000 - ₹25,000",
      rating: 4.4
    },
    {
      name: "Rent It Bae",
      location: "Online",
      phone: "+91 98765 43222",
      specialty: "Indo-western & cocktail wear",
      priceRange: "₹1,500 - ₹12,000",
      rating: 4.2
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup="friends" />

      <main className="flex-1 relative bg-cream">
        <div
          className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <button 
              onClick={() => router.push('/friends/outfits')}
              className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Dress Code</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-burgundy" />
            </div>
            <h1 className="text-3xl font-serif text-navy mb-4">Shopping Guide</h1>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Find the perfect outfits for Aastha & Preetesh's wedding celebration! 
              From local stores in Indore to online shopping and rental options.
            </p>
          </div>

          {/* Local Stores */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-navy mb-8 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-burgundy" />
              Local Stores in Indore
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {localStores.map((store, idx) => (
                <div key={idx} className="bg-ivory rounded-lg shadow-sm p-6 border border-neutral/20 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{store.name}</h3>
                      <p className="text-burgundy/80 text-sm">{store.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-navy/80">{store.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-navy/70">
                      <MapPin className="w-3 h-3" />
                      {store.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-navy/70">
                      <Phone className="w-3 h-3" />
                      {store.phone}
                    </div>
                  </div>
                  
                  <p className="text-xs text-navy/60 mb-4">
                    <strong>Specialty:</strong> {store.specialty}
                  </p>
                  
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(store.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-burgundy hover:text-burgundy/80 transition"
                  >
                    <MapPin className="w-3 h-3" />
                    Get Directions
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Online Shopping */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-navy mb-8 flex items-center gap-3">
              <Globe className="w-6 h-6 text-burgundy" />
              Online Shopping
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {onlineStores.map((store, idx) => (
                <div key={idx} className="bg-ivory rounded-lg shadow-sm p-6 border border-neutral/20 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-navy">{store.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-navy/80">{store.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-navy/70 mb-3">{store.specialty}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-navy/60 mb-4">
                    <Clock className="w-3 h-3" />
                    Delivery: {store.delivery}
                  </div>
                  
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy/10 text-burgundy rounded-lg hover:bg-burgundy/20 transition text-sm"
                  >
                    <Globe className="w-3 h-3" />
                    Visit Website
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Rental Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-navy mb-8 flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-burgundy" />
              Rental Options
            </h2>
            <div className="space-y-4 mb-8">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  <strong>💡 Pro Tip:</strong> Rental is perfect for heavy lehengas or designer pieces you'll wear once. 
                  Book 2-3 weeks in advance and always have a backup option!
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {rentalOptions.map((rental, idx) => (
                <div key={idx} className="bg-ivory rounded-lg shadow-sm p-6 border border-neutral/20 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-navy">{rental.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-navy/80">{rental.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-navy/70">
                      <MapPin className="w-3 h-3" />
                      {rental.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-navy/70">
                      <Phone className="w-3 h-3" />
                      {rental.phone}
                    </div>
                  </div>
                  
                  <p className="text-xs text-navy/60 mb-2">
                    <strong>Specialty:</strong> {rental.specialty}
                  </p>
                  <p className="text-xs text-burgundy font-medium mb-4">
                    {rental.priceRange}
                  </p>
                  
                  <button className="w-full px-4 py-2 bg-burgundy/10 text-burgundy rounded-lg hover:bg-burgundy/20 transition text-sm">
                    Contact for Booking
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* General Tips */}
          
        </div>
      </main>

      <Footer />
    </div>
  );
}

ShoppingPage.noLayout = true; 