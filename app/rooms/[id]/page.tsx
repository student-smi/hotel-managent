import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getRoomByIdOrSlug } from '@/lib/actions/booking';
import RoomBookingCard from '@/components/rooms/RoomBookingCard';
import { Star, CheckCircle2, ShieldCheck, Clock, Users, Maximize, Bed } from 'lucide-react';

interface RoomDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function RoomDetailPage({ params, searchParams }: RoomDetailPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const room = await getRoomByIdOrSlug(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#1C1917]">
      {/* 1. HERO GALLERY */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[420px] md:h-[500px]">
          <div className="md:col-span-2 relative h-full rounded-none overflow-hidden border border-[#E5DFD5]">
            <Image
              src={room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80'}
              alt={room.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            <div className="relative h-full overflow-hidden border border-[#E5DFD5]">
              <Image
                src={room.images[1] || room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'}
                alt={`${room.name} Interior`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-full overflow-hidden border border-[#E5DFD5]">
              <Image
                src={room.images[2] || room.images[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                alt={`${room.name} Bathroom`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT & STICKY BOOKING CARD */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left 2 Columns: Room Details */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-[#C5A880] mb-2 font-medium">
              <span>LUXORA {room.room_type} COLLECTION</span>
              <span>•</span>
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                <span>5.0 (48 Guest Reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-luxury text-3xl md:text-5xl font-light leading-tight mb-6">
              {room.name}
            </h1>

            {/* Specs Bar */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E5DFD5] text-xs text-gray-700">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#C5A880]" />
                <div>
                  <span className="block font-semibold">Capacity</span>
                  <span className="text-gray-500">{room.capacity} Guests Max</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-[#C5A880]" />
                <div>
                  <span className="block font-semibold">Bedding</span>
                  <span className="text-gray-500">{room.bed_type}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Maximize className="w-5 h-5 text-[#C5A880]" />
                <div>
                  <span className="block font-semibold">Room Size</span>
                  <span className="text-gray-500">{room.size}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-2xl font-light">Room Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {room.description}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Tailored for luxury connoisseurs, this residence features hand-woven silk drapery, an organic rain shower sanctuary, integrated Smart Climate Control, and private balcony seating over the reflections pool.
            </p>
          </div>

          {/* Amenities List */}
          <div className="space-y-6 pt-6 border-t border-[#E5DFD5]">
            <h2 className="font-serif-luxury text-2xl font-light">Bespoke Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs text-gray-700 bg-white p-3 border border-[#E5DFD5]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Policies */}
          <div className="space-y-6 pt-6 border-t border-[#E5DFD5]">
            <h2 className="font-serif-luxury text-2xl font-light">Stay Policies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600 font-light">
              <div className="flex items-start space-x-3 bg-white p-4 border border-[#E5DFD5]">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1C1917] mb-1">Check-in & Check-out</span>
                  <p>Check-in: 3:00 PM • Check-out: 12:00 PM (Express Butler Check-in available)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 border border-[#E5DFD5]">
                <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1C1917] mb-1">Cancellation Guarantee</span>
                  <p>Complimentary cancellation up to 48 hours prior to check-in date.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Sticky Booking Widget Card */}
        <div className="relative">
          <div className="sticky top-32">
            <RoomBookingCard
              room={room}
              initialCheckIn={resolvedSearchParams.checkIn}
              initialCheckOut={resolvedSearchParams.checkOut}
              initialGuests={resolvedSearchParams.guests ? parseInt(resolvedSearchParams.guests, 10) : 2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
