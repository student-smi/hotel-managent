'use client';

import { useState } from 'react';
import { Booking } from '@/lib/types';
import { updateBookingStatusAdmin } from '@/lib/actions/booking';
import { Calendar, Users, Filter, Loader2, CheckCircle2, Ban, Search, User } from 'lucide-react';

interface AdminBookingsClientProps {
  initialBookings: Booking[];
}

export default function AdminBookingsClient({ initialBookings }: AdminBookingsClientProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (bookingId: string, status: Booking['status']) => {
    setUpdatingId(bookingId);
    const success = await updateBookingStatusAdmin(bookingId, status);
    setUpdatingId(null);

    if (success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.guest_name.toLowerCase().includes(q);
      const matchEmail = b.guest_email.toLowerCase().includes(q);
      const matchRoom = (b.room?.name || '').toLowerCase().includes(q);
      return matchName || matchEmail || matchRoom;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filters Bar */}
      <div className="glass-luxury border border-[#D4AF37]/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by guest, email or suite..."
            className="w-full bg-black/60 border border-white/10 text-xs pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Status Filter:
          </span>
          {['all', 'confirmed', 'completed', 'cancelled', 'pending'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider transition-all border ${
                statusFilter === st
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              {st} ({st === 'all' ? bookings.length : bookings.filter((b) => b.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Data Grid */}
      <div className="glass-luxury border border-[#D4AF37]/30 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-light">
            <thead className="bg-[#100F0E] uppercase tracking-wider text-gray-400 text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-[#D4AF37]">Reference ID</th>
                <th className="p-4 font-medium text-[#D4AF37]">Guest Information</th>
                <th className="p-4 font-medium text-[#D4AF37]">Residence</th>
                <th className="p-4 font-medium text-[#D4AF37]">Itinerary Dates</th>
                <th className="p-4 font-medium text-[#D4AF37]">Party Size</th>
                <th className="p-4 font-medium text-[#D4AF37]">Total (₹ INR)</th>
                <th className="p-4 font-medium text-[#D4AF37]">Status</th>
                <th className="p-4 font-medium text-[#D4AF37] text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-300">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-400 font-light">
                    No guest reservations found matching search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-[11px] text-[#D4AF37] tracking-wider">
                      #{b.id.substring(0, 8)}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {b.guest_name}
                      </div>
                      <div className="text-[10px] text-gray-400 pl-5">{b.guest_email}</div>
                      <div className="text-[10px] text-gray-400 pl-5">{b.guest_phone}</div>
                    </td>
                    <td className="p-4 font-serif-luxury text-sm text-white">
                      {b.room?.name || 'Luxury Suite'}
                    </td>
                    <td className="p-4 text-gray-300 whitespace-nowrap font-mono text-[11px]">
                      {b.check_in} → {b.check_out}
                    </td>
                    <td className="p-4 text-gray-300">{b.guests} Guests</td>
                    <td className="p-4 font-serif-luxury text-base text-[#D4AF37]">
                      ₹{Number(b.total_price).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-[10px] uppercase tracking-widest font-semibold border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
                            : b.status === 'cancelled'
                            ? 'bg-red-950/60 text-red-400 border-red-800/60'
                            : b.status === 'completed'
                            ? 'bg-blue-950/60 text-blue-400 border-blue-800/60'
                            : 'bg-amber-950/60 text-amber-400 border-amber-800/60'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {updatingId === b.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37] inline-block" />
                      ) : (
                        <select
                          value={b.status}
                          onChange={(e) =>
                            handleStatusChange(b.id, e.target.value as Booking['status'])
                          }
                          className="bg-black/80 border border-[#D4AF37]/30 text-[11px] px-3 py-1.5 text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="confirmed">Confirm</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                          <option value="pending">Pending</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
