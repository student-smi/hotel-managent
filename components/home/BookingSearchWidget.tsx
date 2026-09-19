'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Users, Search, AlertCircle, Sparkles } from 'lucide-react';
import { addDays, format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

export default function BookingSearchWidget() {
  const router = useRouter();
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const tomorrowStr = format(addDays(new Date(), 2), 'yyyy-MM-dd');

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const start = parseISO(checkIn);
    const end = parseISO(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError('Please select valid check-in and check-out dates.');
      return;
    }

    if (start >= end) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    if (guests < 1 || guests > 10) {
      setError('Guest count must be between 1 and 10.');
      return;
    }

    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
    });

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-5xl mx-auto glass-luxury p-6 md:p-8 -mt-20 md:-mt-24 relative z-30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-[#D4AF37]/30"
    >
      <div className="flex items-center space-x-2 mb-4 text-[#D4AF37]">
        <Sparkles className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Bespoke Reservation Search</span>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        {/* Check-In */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Check-In Date
          </label>
          <input
            type="date"
            min={todayStr}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-[#181614] border border-white/10 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-[#D4AF37] transition-all focus:ring-1 focus:ring-[#D4AF37]"
            required
          />
        </div>

        {/* Check-Out */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Check-Out Date
          </label>
          <input
            type="date"
            min={checkIn || todayStr}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-[#181614] border border-white/10 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-[#D4AF37] transition-all focus:ring-1 focus:ring-[#D4AF37]"
            required
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-[#181614] border border-white/10 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-[#D4AF37] transition-all focus:ring-1 focus:ring-[#D4AF37]"
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
            <option value={6}>6+ Guests</option>
          </select>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] hover:brightness-110 text-[#0F0E0D] text-xs font-semibold uppercase tracking-[0.25em] py-4 px-6 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Find Available Suite
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 flex items-center space-x-2 text-xs text-red-400 bg-red-950/50 border border-red-800/60 p-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </motion.div>
  );
}
