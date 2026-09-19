'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Room } from '@/lib/types';
import { checkRoomAvailability } from '@/lib/actions/booking';
import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, Users, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface RoomBookingCardProps {
  room: Room;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export default function RoomBookingCard({
  room,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}: RoomBookingCardProps) {
  const router = useRouter();

  const defaultCheckIn = initialCheckIn || format(new Date(), 'yyyy-MM-dd');
  const defaultCheckOut = initialCheckOut || format(addDays(new Date(), 2), 'yyyy-MM-dd');

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(Math.min(initialGuests, room.capacity));
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Calculate nights & total price
  const startDate = parseISO(checkIn);
  const endDate = parseISO(checkOut);

  const isValidDates = !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate < endDate;
  const nights = isValidDates ? differenceInDays(endDate, startDate) : 0;
  const subtotal = nights * room.price;

  // Real-time availability check when dates change
  useEffect(() => {
    let isMounted = true;
    async function verifyAvailability() {
      if (!isValidDates) {
        setIsAvailable(false);
        setError('Check-out date must be after check-in date.');
        return;
      }

      setError(null);
      setIsChecking(true);

      const available = await checkRoomAvailability(room.id, checkIn, checkOut);
      if (isMounted) {
        setIsAvailable(available);
        if (!available) {
          setError('This room is reserved for the selected dates. Please pick another date range.');
        }
        setIsChecking(false);
      }
    }

    verifyAvailability();

    return () => {
      isMounted = false;
    };
  }, [room.id, checkIn, checkOut, isValidDates]);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDates || !isAvailable) return;

    const params = new URLSearchParams({
      roomId: room.id,
      checkIn,
      checkOut,
      guests: guests.toString(),
    });

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="bg-[#1C1917] text-white p-8 border border-[#C5A880]/30 shadow-2xl">
      {/* Price Header */}
      <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-800">
        <div>
          <span className="font-serif-luxury text-3xl font-light text-white">₹{Number(room.price).toLocaleString('en-IN')}</span>
          <span className="text-xs text-gray-400 font-light"> / night</span>
        </div>
        <span className="text-[10px] bg-[#C5A880]/20 text-[#C5A880] px-3 py-1 border border-[#C5A880]/30 uppercase tracking-widest">
          Best Rate Guaranteed
        </span>
      </div>

      <form onSubmit={handleReserve} className="space-y-6">
        {/* Dates Selection */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" /> Check-In
            </label>
            <input
              type="date"
              min={format(new Date(), 'yyyy-MM-dd')}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#2A2421] border border-gray-700 text-xs px-3 py-3 text-white rounded-none focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" /> Check-Out
            </label>
            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#2A2421] border border-gray-700 text-xs px-3 py-3 text-white rounded-none focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>
        </div>

        {/* Guest Selector */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium flex items-center gap-1">
            <Users className="w-3 h-3" /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-[#2A2421] border border-gray-700 text-xs px-3 py-3 text-white rounded-none focus:outline-none focus:border-[#C5A880]"
          >
            {[...Array(room.capacity)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'Guest' : 'Guests'} (Max {room.capacity})
              </option>
            ))}
          </select>
        </div>

        {/* Real-time Status */}
        {isChecking ? (
          <div className="text-xs text-gray-400 animate-pulse">Checking date availability...</div>
        ) : isAvailable === true ? (
          <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 border border-emerald-800/50">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Available for requested dates</span>
          </div>
        ) : error ? (
          <div className="flex items-start space-x-2 text-xs text-red-400 bg-red-950/40 p-3 border border-red-800/50">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        ) : null}

        {/* Calculation Table */}
        {isValidDates && nights > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-800 text-xs text-gray-300 font-light">
            <div className="flex justify-between">
              <span>₹{Number(room.price).toLocaleString('en-IN')} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Luxury Hospitality Tax & Fees</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-800 text-sm font-semibold text-white">
              <span>Total Stay Price</span>
              <span className="font-serif-luxury text-xl text-[#C5A880]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        {/* Action CTA */}
        <button
          type="submit"
          disabled={!isValidDates || !isAvailable || isChecking}
          className="w-full py-4 bg-[#C5A880] hover:bg-[#B39264] disabled:bg-gray-700 disabled:cursor-not-allowed text-[#1C1917] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl"
        >
          {isChecking ? 'Checking...' : 'Reserve Now'}
        </button>
      </form>

      <div className="mt-6 text-center text-[10px] text-gray-400 font-light flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>No upfront payment required • Instant confirmation</span>
      </div>
    </div>
  );
}
