import Link from 'next/link';
import Image from 'next/image';
import { getAvailableRooms } from '@/lib/actions/booking';
import { Star, ArrowRight, Filter, Sparkles } from 'lucide-react';

interface RoomsPageProps {
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    type?: string;
  }>;
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const resolvedParams = await searchParams;

  const checkIn = resolvedParams.checkIn;
  const checkOut = resolvedParams.checkOut;
  const guestsCount = resolvedParams.guests ? parseInt(resolvedParams.guests, 10) : undefined;
  const roomType = resolvedParams.type || 'all';

  const rooms = await getAvailableRooms({
    checkIn,
    checkOut,
    guests: guestsCount,
    roomType: roomType !== 'all' ? roomType : undefined,
  });

  return (
    <div className="bg-[#0F0E0D] min-h-screen pt-32 pb-28 text-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 glass-luxury border border-[#D4AF37]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              ACCOMMODATIONS COLLECTION
            </span>
          </div>
          <h1 className="font-serif-luxury text-4xl md:text-6xl font-light text-gold-gradient">
            Rooms & Suites
          </h1>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
            Select from our refined collection of oceanfront suites, garden villas, and rooftop penthouses.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="glass-luxury p-6 mb-12 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37]">
            <Filter className="w-4 h-4" />
            <span>Filter Category</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Categories', value: 'all' },
              { label: 'Deluxe Rooms', value: 'deluxe' },
              { label: 'Suites', value: 'suite' },
              { label: 'Villas', value: 'villa' },
              { label: 'Penthouses', value: 'penthouse' },
            ].map((cat) => (
              <Link
                key={cat.value}
                href={`/rooms?type=${cat.value}${checkIn ? `&checkIn=${checkIn}` : ''}${
                  checkOut ? `&checkOut=${checkOut}` : ''
                }${guestsCount ? `&guests=${guestsCount}` : ''}`}
                className={`px-5 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 ${
                  roomType === cat.value
                    ? 'bg-gradient-to-r from-[#E6CA65] to-[#D4AF37] text-[#0F0E0D] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'glass-luxury-card text-gray-300 hover:text-[#D4AF37]'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Selected Date Notice */}
        {checkIn && checkOut && (
          <div className="glass-luxury border border-[#D4AF37]/40 text-white p-4 mb-8 text-xs flex items-center justify-between">
            <span>
              Showing available rooms for stay: <strong className="text-[#D4AF37]">{checkIn}</strong> to{' '}
              <strong className="text-[#D4AF37]">{checkOut}</strong> ({guestsCount || 2} Guests)
            </span>
            <Link href="/rooms" className="text-gray-400 hover:text-white underline">
              Clear Dates
            </Link>
          </div>
        )}

        {/* Rooms Grid */}
        {rooms.length === 0 ? (
          <div className="text-center py-20 glass-luxury border border-white/10 p-12 space-y-4">
            <h3 className="font-serif-luxury text-2xl font-light text-[#D4AF37]">
              No Accommodations Available
            </h3>
            <p className="text-xs text-gray-400 font-light">
              No accommodations match your selected category or date parameters.
            </p>
            <div className="pt-4">
              <Link
                href="/rooms"
                className="px-6 py-3 bg-gradient-to-r from-[#E6CA65] to-[#D4AF37] text-[#0F0E0D] text-xs uppercase tracking-widest font-semibold inline-block"
              >
                View All Rooms
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group glass-luxury-card border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Room Image */}
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

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-[#D4AF37] text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-light">{room.size}</span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-normal text-white group-hover:text-[#D4AF37] transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] glass-luxury border border-white/10 px-2.5 py-1 text-gray-300 font-light"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 font-light">From </span>
                      <span className="font-serif-luxury text-2xl font-medium text-[#D4AF37]">
                        ₹{Number(room.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 font-light"> / night</span>
                    </div>

                    <Link
                      href={`/rooms/${room.slug || room.id}${
                        checkIn && checkOut
                          ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guestsCount}`
                          : ''
                      }`}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#E6CA65] to-[#D4AF37] hover:brightness-110 text-[#0F0E0D] text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                    >
                      View Suite
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
