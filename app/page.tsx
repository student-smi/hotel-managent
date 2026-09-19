import Link from 'next/link';
import Image from 'next/image';
import BookingSearchWidget from '@/components/home/BookingSearchWidget';
import { getAvailableRooms } from '@/lib/actions/booking';
import { Wifi, Sparkles, Utensils, Coffee, Dumbbell, Car, Compass, Waves, ArrowRight, Star, MapPin } from 'lucide-react';

export default async function HomePage() {
  const rooms = await getAvailableRooms({});
  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="bg-[#0F0E0D] min-h-screen text-[#F4F1EA]">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90"
            alt="LUXORA Luxury Estate"
            fill
            priority
            className="object-cover object-center animate-subtle-zoom brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-[#0F0E0D]/60 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 pt-24">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 glass-luxury border border-[#D4AF37]/40 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-medium">
              SANCTUARY OF ELEGANCE & BESPOKE COMFORT
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight text-gold-gradient">
            YOUR STAY, ELEVATED
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 font-light leading-relaxed">
            Where refined architecture, organic serenity, and uncompromised European hospitality meet in perfect harmony.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <Link
              href="/rooms"
              className="w-full sm:w-auto px-9 py-4.5 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] hover:brightness-110 text-[#0F0E0D] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Explore Rooms & Suites
            </Link>
            <Link
              href="#experience"
              className="w-full sm:w-auto px-9 py-4.5 glass-luxury text-white hover:text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
            >
              Discover LUXORA
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH WIDGET */}
      <div className="px-6 relative z-20">
        <BookingSearchWidget />
      </div>

      {/* 3. FEATURED ROOMS */}
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
            ACCOMMODATIONS
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-light text-gold-gradient">
            Sanctuaries of Quiet Luxury
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light pt-2">
            Each suite at LUXORA is curated with organic silk linen, acoustic soundproofing, and panoramic ocean terraces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="group glass-luxury-card border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute top-4 right-4 glass-luxury text-[#D4AF37] text-[10px] uppercase tracking-widest px-3 py-1 border border-[#D4AF37]/30">
                  {room.room_type}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-[#D4AF37] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs text-gray-400 ml-2 font-light">5.0 Exception</span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-normal text-white group-hover:text-[#D4AF37] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                    <span>Capacity: {room.capacity} Guests</span>
                    <span>{room.bed_type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs text-gray-400 font-light">From </span>
                    <span className="font-serif-luxury text-2xl font-medium text-[#D4AF37]">
                      ₹{Number(room.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-400 font-light"> / night</span>
                  </div>

                  <Link
                    href={`/rooms/${room.slug || room.id}`}
                    className="inline-flex items-center text-xs uppercase tracking-widest text-white group-hover:text-[#D4AF37] font-medium transition-colors"
                  >
                    View Suite <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-16">
          <Link
            href="/rooms"
            className="inline-block px-9 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0E0D] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
          >
            Explore All Accommodations
          </Link>
        </div>
      </section>

      {/* 4. THE LUXORA EXPERIENCE */}
      <section id="experience" className="py-28 bg-[#161412] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              HERITAGE & HOSPITALITY
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-5xl font-light text-gold-gradient leading-tight">
              An Architectural Oasis of Unrivaled Elegance
            </h2>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light">
              Situated on private coastal bluffs, LUXORA harmonizes classic European architectural grandiosity with modern minimalist tranquility. From private wine cellars to Michelin-starred dining, every moment is curated to elevate your senses.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <span className="font-serif-luxury text-3xl text-[#D4AF37]">24/7</span>
                <p className="text-xs text-gray-400 font-light mt-1 uppercase tracking-wider">Dedicated Butler Service</p>
              </div>
              <div>
                <span className="font-serif-luxury text-3xl text-[#D4AF37]">3 Michelin</span>
                <p className="text-xs text-gray-400 font-light mt-1 uppercase tracking-wider">Starred Dining Venues</p>
              </div>
            </div>
          </div>

          <div className="relative h-[480px] w-full border-4 border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
              alt="LUXORA Experience"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. AMENITIES */}
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
            CURATED AMENITIES
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-light text-gold-gradient">
            Designed for Absolute Comfort
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Wifi, title: 'High-Speed Wi-Fi', desc: 'Seamless optical fiber connectivity' },
            { icon: Waves, title: 'Infinity Pool', desc: 'Heated oceanfront reflection pool' },
            { icon: Sparkles, title: 'Serene Spa', desc: 'Holistic organic rituals & therapies' },
            { icon: Utensils, title: 'Gourmet Dining', desc: 'Farm-to-table culinary creations' },
            { icon: Coffee, title: '24/7 Room Service', desc: 'Customized epicurean room menus' },
            { icon: Dumbbell, title: 'Fitness Studio', desc: 'Technogym equipped Wellness Studio' },
            { icon: Car, title: 'Valet Parking', desc: 'Chauffeur and electric charging' },
            { icon: Compass, title: 'Private Concierge', desc: 'Bespoke yacht & island excursions' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 glass-luxury-card text-center space-y-4 hover:border-[#D4AF37]/50 transition-colors group"
            >
              <item.icon className="w-8 h-8 mx-auto text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <h3 className="font-serif-luxury text-base font-normal text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MASONRY GALLERY */}
      <section className="py-24 bg-[#161412] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              VISUAL JOURNAL
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-5xl font-light text-gold-gradient">
              Moments at LUXORA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 border border-white/10 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                alt="Hotel Exterior"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
            </div>
            <div className="relative h-80 border border-white/10 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Lounge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
            </div>
            <div className="relative h-80 border border-white/10 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
                alt="Ocean Suite"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-28 max-w-5xl mx-auto px-6 text-center space-y-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
          GUEST REFLECTIONS
        </span>
        <blockquote className="font-serif-luxury text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
          "LUXORA redefining luxury hospitality is an understatement. From the moment our private chauffeur arrived to the evening terrace sunsets, every detail exuded perfection."
        </blockquote>
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Victoria Sterling
          </p>
          <p className="text-[11px] text-gray-400 font-light mt-1">London, United Kingdom</p>
        </div>
      </section>

      {/* 8. LOCATION SECTION */}
      <section className="py-24 bg-[#161412] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              THE DESTINATION
            </span>
            <h2 className="font-serif-luxury text-3xl font-light text-gold-gradient">
              Prime Oceanfront Estate
            </h2>
            <div className="space-y-4 text-xs text-gray-300 font-light leading-relaxed">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                742 Ocean Boulevard, Grand Sanctuary Estate, FL 33139
              </p>
              <p>
                Located 20 minutes from Miami International Airport, our secluded estate provides immediate access to private white-sand beaches, championship golf courses, and luxury fashion districts.
              </p>
            </div>
          </div>

          <div className="relative h-80 border border-white/10 overflow-hidden flex items-center justify-center text-center p-6">
            <Image
              src="https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=1200&q=80"
              alt="Location View"
              fill
              className="object-cover opacity-60"
            />
            <div className="relative z-10 glass-luxury p-6 max-w-sm border border-[#D4AF37]/30">
              <h4 className="font-serif-luxury text-lg text-[#D4AF37] mb-2">LUXORA Estate</h4>
              <p className="text-xs font-light text-gray-300">Complimentary private airport transfer provided for all Suite & Villa guests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-28 bg-[#0F0E0D] text-white text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-tight text-gold-gradient">
            Make Your Stay Extraordinary
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
            Reserve your sanctuary today and discover the pinnacle of European hospitality.
          </p>
          <div className="pt-4">
            <Link
              href="/rooms"
              className="inline-block px-10 py-4.5 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] hover:brightness-110 text-[#0F0E0D] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Reserve Your Suite
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
