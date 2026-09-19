import MyBookingsClient from '@/components/booking/MyBookingsClient';

export default function MyBookingsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-24 text-[#1C1917]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
            LUXORA GUEST PORTAL
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-light">
            My Reservations
          </h1>
          <p className="text-xs text-gray-500 font-light">
            Review, manage, or cancel your upcoming luxury stays at LUXORA.
          </p>
        </div>

        <MyBookingsClient />
      </div>
    </div>
  );
}
