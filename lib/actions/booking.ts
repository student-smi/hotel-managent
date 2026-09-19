'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { Booking, Room } from '@/lib/types';
import { differenceInDays, parseISO } from 'date-fns';
import { revalidatePath } from 'next/cache';

/**
 * Check if a room is available for requested dates
 */
export async function checkRoomAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const supabase = createAdminClient();

  // Overlap condition: (existing.check_in < requested.check_out) AND (existing.check_out > requested.check_in)
  const { data: overlappingBookings, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .neq('status', 'cancelled')
    .lt('check_in', checkOut)
    .gt('check_out', checkIn);

  if (error) {
    console.error('Error checking availability:', error);
    return false;
  }

  return (overlappingBookings?.length ?? 0) === 0;
}

/**
 * Query available rooms matching filters & date availability
 */
export async function getAvailableRooms(params: {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomType?: string;
}): Promise<Room[]> {
  const supabase = createAdminClient();

  let query = supabase.from('rooms').select('*').eq('status', 'available');

  if (params.guests) {
    query = query.gte('capacity', params.guests);
  }

  if (params.roomType && params.roomType !== 'all') {
    query = query.eq('room_type', params.roomType);
  }

  const { data: rooms, error } = await query;

  if (error || !rooms) {
    console.error('Error fetching rooms:', error);
    return [];
  }

  // If dates are provided, filter out unavailable rooms
  if (params.checkIn && params.checkOut) {
    const availableRooms: Room[] = [];
    for (const room of rooms) {
      const isAvailable = await checkRoomAvailability(
        room.id,
        params.checkIn,
        params.checkOut
      );
      if (isAvailable) {
        availableRooms.push(room);
      }
    }
    return availableRooms;
  }

  return rooms;
}

/**
 * Get room by ID or Slug
 */
export async function getRoomByIdOrSlug(idOrSlug: string): Promise<Room | null> {
  const supabase = createAdminClient();

  // Try fetching by id first or slug
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  const { data: room, error } = await supabase
    .from('rooms')
    .select('*')
    .eq(isUuid ? 'id' : 'slug', idOrSlug)
    .single();

  if (error) {
    console.error('Error getting room:', error);
    return null;
  }

  return room;
}

/**
 * Create a new booking with date overlap verification
 */
export async function createBookingAction(formData: {
  roomId: string;
  userId?: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  const supabase = createAdminClient();

  // 1. Verify date validity
  const start = parseISO(formData.checkIn);
  const end = parseISO(formData.checkOut);
  const nights = differenceInDays(end, start);

  if (nights <= 0) {
    return { success: false, error: 'Check-out date must be after check-in date.' };
  }

  // 2. Fetch room details
  const room = await getRoomByIdOrSlug(formData.roomId);
  if (!room) {
    return { success: false, error: 'Selected room does not exist.' };
  }

  if (formData.guests > room.capacity) {
    return {
      success: false,
      error: `This room accommodates up to ${room.capacity} guests.`,
    };
  }

  // 3. Strict Server-Side Overlap Availability Check
  const isAvailable = await checkRoomAvailability(
    room.id,
    formData.checkIn,
    formData.checkOut
  );

  if (!isAvailable) {
    return {
      success: false,
      error: 'This room is already reserved for the selected dates. Please select different dates.',
    };
  }

  // 4. Calculate total price server-side
  const totalPrice = nights * room.price;

  // 5. Insert booking into Supabase
  const { data: newBooking, error: insertError } = await supabase
    .from('bookings')
    .insert([
      {
        room_id: room.id,
        user_id: formData.userId || null,
        guest_name: formData.guestName,
        guest_email: formData.guestEmail,
        guest_phone: formData.guestPhone,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: formData.guests,
        special_requests: formData.specialRequests || null,
        total_price: totalPrice,
        status: 'confirmed',
      },
    ])
    .select('id')
    .single();

  if (insertError || !newBooking) {
    console.error('Booking insertion error:', insertError);
    return {
      success: false,
      error: 'Failed to create reservation. Please try again.',
    };
  }

  revalidatePath('/my-bookings');
  revalidatePath('/admin');
  revalidatePath('/rooms');

  return { success: true, bookingId: newBooking.id };
}

/**
 * Cancel a booking
 */
export async function cancelBookingAction(
  bookingId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', bookingId);

  if (error) {
    console.error('Error cancelling booking:', error);
    return { success: false, error: 'Could not cancel booking.' };
  }

  revalidatePath('/my-bookings');
  revalidatePath('/admin');
  return { success: true };
}

/**
 * Get user bookings by email or user ID
 */
export async function getUserBookings(emailOrUserId: string): Promise<Booking[]> {
  const supabase = createAdminClient();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*, room:rooms(*)')
    .or(`guest_email.eq.${emailOrUserId},user_id.eq.${emailOrUserId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting user bookings:', error);
    return [];
  }

  return bookings || [];
}

/**
 * Get single booking by ID with room info
 */
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const supabase = createAdminClient();

  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*, room:rooms(*)')
    .eq('id', bookingId)
    .single();

  if (error) {
    console.error('Error getting booking by id:', error);
    return null;
  }

  return booking;
}

/**
 * Admin: Get all bookings
 */
export async function getAllBookingsAdmin(): Promise<Booking[]> {
  const supabase = createAdminClient();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*, room:rooms(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting all bookings admin:', error);
    return [];
  }

  return bookings || [];
}

/**
 * Admin: Update booking status
 */
export async function updateBookingStatusAdmin(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
): Promise<boolean> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating status:', error);
    return false;
  }

  revalidatePath('/admin');
  return true;
}

/**
 * Admin: Create or update room
 */
export async function upsertRoomAdmin(roomData: Partial<Room>): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  if (roomData.id) {
    const { error } = await supabase
      .from('rooms')
      .update({ ...roomData, updated_at: new Date().toISOString() })
      .eq('id', roomData.id);

    if (error) return { success: false, error: error.message };
  } else {
    const slug = roomData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `room-${Date.now()}`;
    const { error } = await supabase.from('rooms').insert([
      {
        name: roomData.name || 'New Room',
        slug,
        description: roomData.description || 'Luxury room description.',
        room_type: roomData.room_type || 'deluxe',
        price: roomData.price || 300,
        capacity: roomData.capacity || 2,
        bed_type: roomData.bed_type || 'King Bed',
        size: roomData.size || '50 sq m',
        amenities: roomData.amenities || ['Wi-Fi', 'Spa'],
        images: roomData.images || ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80'],
        status: roomData.status || 'available',
      },
    ]);

    if (error) return { success: false, error: error.message };
  }

  revalidatePath('/rooms');
  revalidatePath('/admin');
  return { success: true };
}
