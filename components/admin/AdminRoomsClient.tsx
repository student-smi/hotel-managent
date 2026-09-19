'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Room } from '@/lib/types';
import { upsertRoomAdmin } from '@/lib/actions/booking';
import { Plus, Edit2, CheckCircle2, AlertCircle, Loader2, Sparkles, X, IndianRupee } from 'lucide-react';

interface AdminRoomsClientProps {
  initialRooms: Room[];
}

export default function AdminRoomsClient({ initialRooms }: AdminRoomsClientProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [editingRoom, setEditingRoom] = useState<Partial<Room> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingRoom({
      name: '',
      room_type: 'deluxe',
      price: 25000,
      capacity: 2,
      bed_type: 'King Bed',
      size: '50 sq m / 538 sq ft',
      description: '',
      amenities: ['Ocean View', 'Wi-Fi', 'Marble Bath', '24/7 Butler'],
      images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80'],
      status: 'available',
    });
    setError(null);
  };

  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom?.name || !editingRoom.price) return;

    setIsSubmitting(true);
    setError(null);

    const res = await upsertRoomAdmin(editingRoom);
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Failed to save room details.');
      return;
    }

    setEditingRoom(null);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Actions Bar */}
      <div className="glass-luxury p-6 border border-[#D4AF37]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-serif-luxury text-2xl font-light text-white">Hotel Portfolio Inventory</h3>
          <p className="text-xs text-gray-400 font-light">
            Total Inventory: {rooms.length} Suites & Villas Listed
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-6 py-3 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] text-[#0F0E0D] hover:brightness-110 text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Residence
        </button>
      </div>

      {/* Rooms Table */}
      <div className="glass-luxury border border-[#D4AF37]/30 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-light">
            <thead className="bg-[#100F0E] uppercase tracking-wider text-gray-400 text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-[#D4AF37]">Preview</th>
                <th className="p-4 font-medium text-[#D4AF37]">Residence Name</th>
                <th className="p-4 font-medium text-[#D4AF37]">Type</th>
                <th className="p-4 font-medium text-[#D4AF37]">Rate / Night (₹)</th>
                <th className="p-4 font-medium text-[#D4AF37]">Capacity</th>
                <th className="p-4 font-medium text-[#D4AF37]">Status</th>
                <th className="p-4 font-medium text-[#D4AF37] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-300">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="relative h-14 w-20 border border-[#D4AF37]/30 overflow-hidden">
                      <Image
                        src={room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-serif-luxury text-sm font-normal text-white">
                    {room.name}
                    <div className="text-[10px] text-gray-400 font-sans font-light">{room.bed_type} • {room.size}</div>
                  </td>
                  <td className="p-4 uppercase text-[10px] font-semibold text-[#D4AF37]">
                    {room.room_type}
                  </td>
                  <td className="p-4 font-serif-luxury text-base text-[#D4AF37]">
                    ₹{Number(room.price).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-gray-300">{room.capacity} Guests</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold border ${
                        room.status === 'available'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
                          : 'bg-amber-950/60 text-amber-400 border-amber-800/60'
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setEditingRoom(room)}
                      className="px-3.5 py-1.5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/20 text-[11px] uppercase tracking-wider flex items-center gap-1.5 ml-auto transition-colors"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Room Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#181614] border border-[#D4AF37]/40 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif-luxury text-2xl font-light text-gold-gradient">
                  {editingRoom.id ? 'Edit Residence Specifications' : 'Add New Luxury Residence'}
                </h3>
              </div>
              <button
                onClick={() => setEditingRoom(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-950/60 p-4 border border-red-800/60 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Residence Name</label>
                <input
                  type="text"
                  value={editingRoom.name || ''}
                  onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                  placeholder="e.g. Imperial Penthouse Suite"
                  className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Room Category</label>
                  <select
                    value={editingRoom.room_type || 'deluxe'}
                    onChange={(e) => setEditingRoom({ ...editingRoom, room_type: e.target.value as any })}
                    className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Suite</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Nightly Rate (₹ INR)</label>
                  <input
                    type="number"
                    value={editingRoom.price || ''}
                    onChange={(e) => setEditingRoom({ ...editingRoom, price: Number(e.target.value) })}
                    placeholder="38500"
                    className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Max Capacity</label>
                  <input
                    type="number"
                    value={editingRoom.capacity || 2}
                    onChange={(e) => setEditingRoom({ ...editingRoom, capacity: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Bed Type</label>
                  <input
                    type="text"
                    value={editingRoom.bed_type || 'King Bed'}
                    onChange={(e) => setEditingRoom({ ...editingRoom, bed_type: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Floor Dimensions</label>
                  <input
                    type="text"
                    value={editingRoom.size || '55 sq m'}
                    onChange={(e) => setEditingRoom({ ...editingRoom, size: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Description</label>
                <textarea
                  rows={3}
                  value={editingRoom.description || ''}
                  onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">Image Cover URL</label>
                <input
                  type="text"
                  value={editingRoom.images?.[0] || ''}
                  onChange={(e) => setEditingRoom({ ...editingRoom, images: [e.target.value] })}
                  className="w-full bg-black/50 border border-white/10 text-xs p-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
                  className="px-5 py-3 border border-white/20 text-xs uppercase tracking-widest text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] text-[#0F0E0D] text-xs uppercase tracking-widest font-bold flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
