import Link from 'next/link';
import { getAllBookingsAdmin, getAvailableRooms } from '@/lib/actions/booking';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';
import { Bed, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

export default async function AdminDashboardPage() {
  const bookings = await getAllBookingsAdmin();
  const rooms = await getAvailableRooms({});

  return (
    <div className="bg-[#0F0E0D] min-h-screen pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-[#D4AF37]/30 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                EXECUTIVE MANAGEMENT CONSOLE
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl md:text-5xl font-light text-gold-gradient">
              LUXORA Intelligence & Operations
            </h1>
            <p className="text-xs text-gray-400 font-light mt-1">
              Real-time guest reservations, residence inventory, and revenue overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/rooms"
              className="px-5 py-3 bg-[#181614] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
            >
              <Bed className="w-4 h-4" /> Manage Rooms
            </Link>
            <Link
              href="/admin/bookings"
              className="px-5 py-3 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] text-[#0F0E0D] hover:brightness-110 text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Manage Bookings
            </Link>
          </div>
        </div>

        <AdminDashboardClient initialBookings={bookings} initialRooms={rooms} />
      </div>
    </div>
  );
}
