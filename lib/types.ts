export type RoomType = 'deluxe' | 'suite' | 'villa' | 'penthouse';
export type RoomStatus = 'available' | 'maintenance';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type UserRole = 'customer' | 'admin';

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  room_type: RoomType;
  price: number;
  capacity: number;
  bed_type: string;
  size: string;
  amenities: string[];
  images: string[];
  status: RoomStatus;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  room_id: string;
  user_id?: string | null;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  special_requests?: string | null;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  room?: Room;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface SearchFilterParams {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}
