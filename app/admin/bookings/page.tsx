import Link from 'next/link';
import { getAllBookingsAdmin } from '@/lib/actions/booking';
import AdminBookingsClient from '@/components/admin/AdminBookingsClient';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default async function AdminBookingsPage() {
  const bookings = await getAllBookingsAdmin();

  return (
    <div className="bg-[#0F0E0D] min-h-screen pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-[#D4AF37]/30 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                RESERVATION DESK
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl md:text-5xl font-light text-gold-gradient">
              Master Guest Itineraries
            </h1>
            <p className="text-xs text-gray-400 font-light mt-1">
              Filter, search, and update status for all guest reservations across LUXORA.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-5 py-3 bg-[#181614] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        <AdminBookingsClient initialBookings={bookings} />
      </div>
    </div>
  );
}
