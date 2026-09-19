'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, AlertCircle, Loader2, Sparkles, Eye, EyeOff, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (email === 'admin@luxora.com') {
      router.push('/admin');
    } else {
      router.push('/my-bookings');
    }
    router.refresh();
  };

  const handleDemoFill = async (demoEmail: string, demoPass: string, redirectPath: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: demoEmail,
      password: demoPass,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirectPath);
    router.refresh();
  };

  return (
    <div className="bg-[#0F0E0D] min-h-screen pt-24 pb-12 flex items-center justify-center px-6">
      <div className="w-full max-w-5xl glass-luxury border border-[#D4AF37]/30 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 my-auto">
        {/* Left Side: Luxury Imagery & Privileges */}
        <div className="relative p-10 flex flex-col justify-between hidden md:flex overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
            alt="LUXORA Sanctuary"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-serif-luxury text-3xl tracking-[0.2em] text-white">
                LUXORA
              </span>
            </Link>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Your Stay, Elevated. Access bespoke reservation management, private butler requests, and executive administration.
            </p>
          </div>

          <div className="relative z-10 space-y-3 pt-8 border-t border-white/20 text-xs text-gray-300 font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Encrypted guest session & instant confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Complimentary champagne welcome on arrival</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form & Demo Buttons */}
        <div className="p-8 md:p-12 space-y-8 bg-[#181614]/90 flex flex-col justify-center">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              GUEST PORTAL
            </span>
            <h1 className="font-serif-luxury text-3xl font-light text-gold-gradient">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-gray-400 font-light">
              Enter your credentials or use 1-Click Demo Login below.
            </p>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="grid grid-cols-2 gap-3 p-4 glass-luxury border border-[#D4AF37]/30">
            <button
              type="button"
              onClick={() => handleDemoFill('admin@luxora.com', 'Admin@123456', '/admin')}
              className="px-3 py-2.5 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider border border-[#D4AF37]/40 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> 1-Click Admin
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('guest@luxora.com', 'Guest@123456', '/my-bookings')}
              className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold uppercase tracking-wider border border-white/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> 1-Click Guest
            </button>
          </div>

          {error && (
            <div className="flex items-start space-x-2 text-xs text-red-400 bg-red-950/50 border border-red-800/60 p-4">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@domain.com"
                className="w-full bg-black/40 border border-white/10 text-xs px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 text-xs px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] text-[#0F0E0D] text-xs font-semibold uppercase tracking-[0.25em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign In</span>}
            </button>
          </form>

          <div className="text-center text-xs text-gray-400 font-light pt-4 border-t border-white/10">
            <p>
              Do not have an account?{' '}
              <Link href="/signup" className="text-[#D4AF37] hover:underline font-medium">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
