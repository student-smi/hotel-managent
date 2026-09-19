'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room } from '@/lib/types';
import { createBookingAction } from '@/lib/actions/booking';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MessageSquare, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Full name is required (min 2 characters).'),
  guestEmail: z.string().email('Please enter a valid email address.'),
  guestPhone: z.string().min(6, 'Please enter a valid phone number.'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormClientProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
}

export default function BookingFormClient({
  room,
  checkIn,
  checkOut,
  guests,
  nights,
  totalPrice,
}: BookingFormClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (values: BookingFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await createBookingAction({
        roomId: room.id,
        guestName: values.guestName,
        guestEmail: values.guestEmail,
        guestPhone: values.guestPhone,
        checkIn,
        checkOut,
        guests,
        specialRequests: values.specialRequests,
      });

      if (!result.success) {
        setServerError(result.error || 'Failed to create reservation.');
        setIsSubmitting(false);
        return;
      }

      // Redirect to confirmation page
      router.push(`/booking/confirmation/${result.bookingId}`);
    } catch (err: any) {
      setServerError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E5DFD5] p-8 md:p-10 shadow-sm">
      <h2 className="font-serif-luxury text-2xl font-light mb-8 pb-4 border-b border-[#E5DFD5]">
        Guest Information
      </h2>

      {serverError && (
        <div className="mb-6 flex items-start space-x-2 text-xs text-red-500 bg-red-50 border border-red-200 p-4">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-700 font-medium flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#C5A880]" /> Full Name *
          </label>
          <input
            {...register('guestName')}
            type="text"
            placeholder="Lord / Lady / Mr. / Ms. Full Name"
            className="w-full bg-[#FAF8F5] border border-[#E5DFD5] text-xs px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
          />
          {errors.guestName && (
            <p className="text-[11px] text-red-500">{errors.guestName.message}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-700 font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" /> Email Address *
            </label>
            <input
              {...register('guestEmail')}
              type="email"
              placeholder="guest@domain.com"
              className="w-full bg-[#FAF8F5] border border-[#E5DFD5] text-xs px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
            />
            {errors.guestEmail && (
              <p className="text-[11px] text-red-500">{errors.guestEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-700 font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> Phone Number *
            </label>
            <input
              {...register('guestPhone')}
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#FAF8F5] border border-[#E5DFD5] text-xs px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
            />
            {errors.guestPhone && (
              <p className="text-[11px] text-red-500">{errors.guestPhone.message}</p>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-700 font-medium flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" /> Special Requests & Preferences (Optional)
          </label>
          <textarea
            {...register('specialRequests')}
            rows={4}
            placeholder="Acoustic pillow preferences, champagne on arrival, dietary restrictions, airport transfer details..."
            className="w-full bg-[#FAF8F5] border border-[#E5DFD5] text-xs p-4 text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Guarantee Info */}
        <div className="bg-[#FAF8F5] p-4 border border-[#E5DFD5] flex items-center space-x-3 text-xs text-gray-600 font-light">
          <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
          <span>Payment is collected upon check-in at the hotel front desk. Your credit card is not charged today.</span>
        </div>

        {/* Submit CTA */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#C5A880] hover:bg-[#B39264] text-[#1C1917] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Confirming Reservation...</span>
              </>
            ) : (
              <span>Confirm & Book Reservation</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
