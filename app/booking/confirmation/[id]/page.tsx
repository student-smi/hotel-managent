import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBookingById } from '@/lib/actions/booking';
import { CheckCircle2, Calendar, Users, MapPin, ArrowLeft } from 'lucide-react';

interface ConfirmationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-24 text-[#1C1917]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Banner */}
        <div className="bg-[#1C1917] text-white p-10 text-center space-y-4 border-b-4 border-[#C5A880] shadow-2xl mb-12">
          <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto mb-2 border border-[#C5A880]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
            RESERVATION CONFIRMED
          </span>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light">
            Your Stay at LUXORA is Confirmed
          </h1>

          <p className="text-xs text-gray-300 font-light max-w-lg mx-auto">
            A confirmation receipt and butler itinerary have been dispatched to{' '}
            <strong className="text-[#C5A880]">{booking.guest_email}</strong>.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-white border border-[#E5DFD5] p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD5] pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-light block">
                Booking Reference ID
              </span>
              <span className="font-mono text-sm font-semibold text-[#C5A880] tracking-wider">
                {booking.id}
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-light block">
                Reservation Status
              </span>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-widest font-semibold">
                {booking.status}
              </span>
            </div>
          </div>

          {/* Room Info */}
          {booking.room && (
            <div className="flex flex-col sm:flex-row gap-6 items-center bg-[#FAF8F5] p-6 border border-[#E5DFD5]">
              <div className="relative h-28 w-full sm:w-44 shrink-0 overflow-hidden border border-[#E5DFD5]">
                <Image
                  src={booking.room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
                  alt={booking.room.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium">
                  {booking.room.room_type}
                </span>
                <h3 className="font-serif-luxury text-2xl font-light">{booking.room.name}</h3>
                <p className="text-xs text-gray-500 font-light">{booking.room.bed_type} • {booking.room.size}</p>
              </div>
            </div>
          )}

          {/* Grid Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 text-xs font-light text-gray-700">
            <div className="space-y-3">
              <span className="font-serif-luxury text-base font-normal text-[#1C1917] block mb-2">
                Guest Credentials
              </span>
              <p><strong className="font-medium text-[#1C1917]">Guest Name:</strong> {booking.guest_name}</p>
              <p><strong className="font-medium text-[#1C1917]">Email:</strong> {booking.guest_email}</p>
              <p><strong className="font-medium text-[#1C1917]">Phone:</strong> {booking.guest_phone}</p>
            </div>

            <div className="space-y-3">
              <span className="font-serif-luxury text-base font-normal text-[#1C1917] block mb-2">
                Stay Schedule
              </span>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <strong className="font-medium text-[#1C1917]">Check-In:</strong> {booking.check_in} (3:00 PM)
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <strong className="font-medium text-[#1C1917]">Check-Out:</strong> {booking.check_out} (12:00 PM)
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C5A880]" />
                <strong className="font-medium text-[#1C1917]">Guests:</strong> {booking.guests} Guests
              </p>
            </div>
          </div>

          {/* Payment Total */}
          <div className="pt-6 border-t border-[#E5DFD5] flex items-center justify-between">
            <span className="text-xs text-gray-500 font-light">Total Stay Amount (Pay on arrival)</span>
            <span className="font-serif-luxury text-3xl font-medium text-[#D4AF37]">
              ₹{Number(booking.total_price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/my-bookings"
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#B39264] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-semibold text-center shadow-lg transition-all"
          >
            View My Bookings
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white text-xs uppercase tracking-[0.2em] font-medium text-center transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
