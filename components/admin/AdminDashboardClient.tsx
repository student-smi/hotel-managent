'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Booking, Room } from '@/lib/types';
import { updateBookingStatusAdmin } from '@/lib/actions/booking';
import { Calendar, Bed, CheckCircle2, Ban, Clock, Loader2, IndianRupee, TrendingUp, Sparkles, User, ArrowUpRight } from 'lucide-react';

interface AdminDashboardClientProps {
  initialBookings: Booking[];
  initialRooms: Room[];
}

export default function AdminDashboardClient({
  initialBookings,
  initialRooms,
}: AdminDashboardClientProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Compute stats
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.total_price), 0);

  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  const occupancyRate = initialRooms.length > 0 
    ? Math.round((confirmedCount / initialRooms.length) * 100) 
    : 0;

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

  return (
    <div className="space-y-10">
      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Total Revenue */}
        <div className="glass-luxury border border-[#D4AF37]/30 p-6 relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
              Total Portfolio Revenue
            </span>
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif-luxury text-3xl font-light text-gold-gradient block">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last period</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Bookings */}
        <div className="glass-luxury border border-[#D4AF37]/30 p-6 relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
              Active Reservations
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif-luxury text-3xl font-light text-white block">
              {bookings.length}
            </span>
            <p className="text-[10px] text-gray-400 mt-2 font-light">
              {confirmedCount} Confirmed • {completedCount} Completed
            </p>
          </div>
        </div>

        {/* Metric 3: Active Rooms */}
        <div className="glass-luxury border border-[#D4AF37]/30 p-6 relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
              Residences Occupancy
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Bed className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif-luxury text-3xl font-light text-white block">
              {occupancyRate}%
            </span>
            <p className="text-[10px] text-gray-400 mt-2 font-light">
              {initialRooms.length} Luxury Suites & Villas Listed
            </p>
          </div>
        </div>

        {/* Metric 4: Status Breakdown */}
        <div className="glass-luxury border border-[#D4AF37]/30 p-6 relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
              Conversion & Status
            </span>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif-luxury text-2xl font-light text-white block">
              {confirmedCount} <span className="text-xs text-gray-400 font-sans">Active</span> / <span className="text-red-400 font-serif-luxury">{cancelledCount}</span> <span className="text-xs text-gray-400 font-sans">Cancelled</span>
            </span>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden flex">
              <div className="bg-emerald-400 h-full" style={{ width: `${(confirmedCount / Math.max(bookings.length, 1)) * 100}%` }} />
              <div className="bg-blue-400 h-full" style={{ width: `${(completedCount / Math.max(bookings.length, 1)) * 100}%` }} />
              <div className="bg-red-500 h-full" style={{ width: `${(cancelledCount / Math.max(bookings.length, 1)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Quick Overview Banner */}
      <div className="glass-luxury border border-[#D4AF37]/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-xl font-light text-white">LUXORA Guest Experience Center</h4>
            <p className="text-xs text-gray-400 font-light">
              Managing luxury hospitality operations with real-time status updates and guest privilege controls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-300">
          <div className="text-right">
            <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Avg Daily Rate (ADR)</span>
            <span className="font-serif-luxury text-lg text-[#D4AF37] font-medium">₹38,500</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right">
            <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Guest Satisfaction</span>
            <span className="font-serif-luxury text-lg text-emerald-400 font-medium">99.4%</span>
          </div>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="glass-luxury border border-[#D4AF37]/30 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-luxury text-2xl font-light text-white">Live Guest Reservations</h3>
            <p className="text-xs text-gray-400 font-light">
              Review guest itineraries and modify reservation status instantly.
            </p>
          </div>

          <Link
            href="/admin/bookings"
            className="text-xs uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
          >
            All Bookings ({bookings.length}) <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-light">
            <thead className="bg-[#100F0E] uppercase tracking-wider text-gray-400 text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-[#D4AF37]">Guest Details</th>
                <th className="p-4 font-medium text-[#D4AF37]">Residence</th>
                <th className="p-4 font-medium text-[#D4AF37]">Stay Dates</th>
                <th className="p-4 font-medium text-[#D4AF37]">Guests</th>
                <th className="p-4 font-medium text-[#D4AF37]">Total Amount</th>
                <th className="p-4 font-medium text-[#D4AF37]">Status</th>
                <th className="p-4 font-medium text-[#D4AF37] text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-300">
              {bookings.slice(0, 8).map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {b.guest_name}
                    </div>
                    <div className="text-[10px] text-gray-400 pl-5">{b.guest_email}</div>
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
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
