'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Booking } from '@/lib/types';
import { getUserBookings, cancelBookingAction } from '@/lib/actions/booking';
import { createClient } from '@/lib/supabase/client';
import { Calendar, Users, Ban, Search, Loader2, CheckCircle2 } from 'lucide-react';

export default function MyBookingsClient() {
  const [emailInput, setEmailInput] = useState('');
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'cancelled'>('all');

  const supabase = createClient();

  useEffect(() => {
    async function loadAuthUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) {
        setActiveEmail(data.user.email);
        fetchBookings(data.user.email);
      }
    }
    loadAuthUser();
  }, [supabase.auth]);

  async function fetchBookings(email: string) {
    setLoading(true);
    const data = await getUserBookings(email);
    setBookings(data);
    setLoading(false);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setActiveEmail(emailInput.trim());
    fetchBookings(emailInput.trim());
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this luxury reservation?')) return;

    setCancellingId(id);
    const res = await cancelBookingAction(id);
    setCancellingId(null);

    if (res.success && activeEmail) {
      fetchBookings(activeEmail);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Email Search Lookup if not signed in */}
      {!activeEmail && (
        <div className="bg-white border border-[#E5DFD5] p-8 shadow-sm max-w-xl mx-auto space-y-4">
          <h3 className="font-serif-luxury text-xl font-light text-center">
            Lookup Reservation by Email
          </h3>
          <p className="text-xs text-gray-500 font-light text-center">
            Enter the email address used during booking to access your stay itinerary.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="email"
              placeholder="guest@domain.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 bg-[#FAF8F5] border border-[#E5DFD5] text-xs px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A880] hover:bg-[#B39264] text-[#1C1917] text-xs uppercase tracking-widest font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {activeEmail && (
        <>
          {/* Email Info Bar */}
          <div className="bg-[#1C1917] text-white p-4 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <span>
              Showing reservations for: <strong className="text-[#C5A880]">{activeEmail}</strong>
            </span>
            <button
              onClick={() => {
                setActiveEmail(null);
                setBookings([]);
              }}
              className="text-gray-400 hover:text-white underline text-[11px]"
            >
              Change Email Lookup
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E5DFD5] space-x-6 text-xs uppercase tracking-widest font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-[#C5A880] text-[#1C1917]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              All Reservations ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-[#C5A880] text-[#1C1917]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Upcoming ({bookings.filter((b) => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'cancelled'
                  ? 'border-[#C5A880] text-[#1C1917]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
            </button>
          </div>

          {/* List */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#C5A880] mx-auto" />
              <p className="text-xs text-gray-500 font-light">Loading reservation itinerary...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white border border-[#E5DFD5] p-12 text-center space-y-4">
              <h3 className="font-serif-luxury text-2xl font-light">No Reservations Found</h3>
              <p className="text-xs text-gray-500 font-light">
                You do not have any {activeTab !== 'all' ? activeTab : ''} reservations at LUXORA yet.
              </p>
              <div className="pt-2">
                <Link
                  href="/rooms"
                  className="px-6 py-3 bg-[#C5A880] text-[#1C1917] text-xs uppercase tracking-widest font-semibold inline-block"
                >
                  Explore Rooms & Reserve
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-[#E5DFD5] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                >
                  {/* Image & Title */}
                  <div className="flex gap-6 items-center">
                    {b.room && (
                      <div className="relative h-24 w-32 shrink-0 overflow-hidden border border-[#E5DFD5]">
                        <Image
                          src={b.room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
                          alt={b.room.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest">
                          ID: {b.id.substring(0, 8)}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-semibold ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <h4 className="font-serif-luxury text-xl font-normal">
                        {b.room?.name || 'Luxury Suite'}
                      </h4>

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-light pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> {b.check_in} to {b.check_out}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#C5A880]" /> {b.guests} Guests
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 gap-4">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-gray-400 font-light block">Total Price</span>
                      <span className="font-serif-luxury text-2xl font-medium text-[#D4AF37]">
                        ₹{Number(b.total_price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        disabled={cancellingId === b.id}
                        className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1.5"
                      >
                        {cancellingId === b.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Ban className="w-3.5 h-3.5" />
                        )}
                        <span>Cancel Booking</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
