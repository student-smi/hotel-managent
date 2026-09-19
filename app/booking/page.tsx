import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { getRoomByIdOrSlug } from '@/lib/actions/booking';
import BookingFormClient from '@/components/booking/BookingFormClient';
import { differenceInDays, parseISO } from 'date-fns';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface BookingPageProps {
  searchParams: Promise<{
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { roomId, checkIn, checkOut, guests } = await searchParams;

  if (!roomId || !checkIn || !checkOut) {
    redirect('/rooms');
  }

  const room = await getRoomByIdOrSlug(roomId);

  if (!room) {
    notFound();
  }

  const startDate = parseISO(checkIn);
  const endDate = parseISO(checkOut);
  const nights = differenceInDays(endDate, startDate);

  if (isNaN(nights) || nights <= 0) {
    redirect(`/rooms/${room.slug || room.id}`);
  }

  const guestCount = guests ? parseInt(guests, 10) : 2;
  const totalPrice = nights * room.price;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-24 text-[#1C1917]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
            RESERVATION SUMMARY & DETAILS
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-light">
            Complete Your Luxury Reservation
          </h1>
          <p className="text-xs text-gray-500 font-light">
            Please provide guest credentials to finalize your stay at LUXORA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Guest Info Form */}
          <div className="lg:col-span-2">
            <BookingFormClient
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guestCount}
              nights={nights}
              totalPrice={totalPrice}
            />
          </div>

          {/* Right Column: Reservation Summary Card */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E5DFD5] p-6 shadow-md space-y-6">
              <h3 className="font-serif-luxury text-xl border-b border-[#E5DFD5] pb-4">
                Stay Details
              </h3>

              <div className="relative h-44 w-full overflow-hidden border border-[#E5DFD5]">
                <Image
                  src={room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium">
                  {room.room_type}
                </span>
                <h4 className="font-serif-luxury text-xl">{room.name}</h4>
                <p className="text-xs text-gray-500 font-light mt-1">{room.size} • {room.bed_type}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5DFD5] text-xs text-gray-700 font-light">
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-In</span>
                  <span className="font-medium text-[#1C1917]">{checkIn} (3:00 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-Out</span>
                  <span className="font-medium text-[#1C1917]">{checkOut} (12:00 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-[#1C1917]">{nights} Nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium text-[#1C1917]">{guestCount} Guests</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DFD5] space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>₹{Number(room.price).toLocaleString('en-IN')} × {nights} nights</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Taxes & Hospitality Fees</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-semibold text-white">
                  <span>Total Amount Due</span>
                  <span className="font-serif-luxury text-2xl text-[#D4AF37]">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1917] text-white p-6 space-y-3">
              <div className="flex items-center space-x-2 text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-medium">Included Privileges</span>
              </div>
              <ul className="text-xs text-gray-300 font-light space-y-2">
                <li>• Complimentary Welcome Champagne</li>
                <li>• 24/7 Personal Butler Concierge</li>
                <li>• Daily Organic Breakfast Buffet</li>
                <li>• Spa & Wellness Pass</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
