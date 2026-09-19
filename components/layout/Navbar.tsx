'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Calendar, LogOut, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserDropdownOpen(false);
    window.location.href = '/';
  };

  const isHome = pathname === '/';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'glass-luxury py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent text-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Emblem Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E6CA65] to-[#D4AF37] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <div className="w-full h-full bg-[#0F0E0D] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="font-serif-luxury text-2xl md:text-3xl font-light tracking-[0.25em] text-white group-hover:text-[#D4AF37] transition-colors">
            LUXORA
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.25em] font-medium">
          {[
            { label: 'Home', href: '/' },
            { label: 'Rooms & Suites', href: '/rooms' },
            { label: 'Experience', href: '/#experience' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative py-1 text-gray-300 hover:text-[#D4AF37] transition-colors group"
              >
                <span className={isActive ? 'text-[#D4AF37] font-semibold' : ''}>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 text-xs uppercase tracking-wider text-gray-200 hover:text-[#D4AF37] transition-colors py-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-60 glass-luxury border border-[#D4AF37]/40 py-2 z-50 text-xs shadow-2xl"
                  >
                    <div className="px-4 py-2 border-b border-white/10 text-gray-400">
                      Signed in as <span className="text-white block font-medium truncate">{user.email}</span>
                    </div>
                    <Link
                      href="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-3 text-[#D4AF37]" />
                      My Bookings
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 mr-3 text-[#D4AF37]" />
                      Admin Console
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/rooms"
            className="px-6 py-2.5 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] hover:brightness-110 text-[#0F0E0D] font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
          >
            Reserve Suite
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#D4AF37] transition-colors p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-luxury border-b border-[#D4AF37]/30 px-6 py-8 space-y-6 text-center"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-widest text-white hover:text-[#D4AF37]"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-widest text-white hover:text-[#D4AF37]"
            >
              Rooms & Suites
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-widest text-white hover:text-[#D4AF37]"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-widest text-white hover:text-[#D4AF37]"
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-widest text-[#D4AF37]"
                >
                  My Bookings
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-widest text-[#D4AF37]"
                >
                  Admin Console
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-xs uppercase tracking-widest text-red-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-widest text-white hover:text-[#D4AF37]"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full py-3 bg-gradient-to-r from-[#E6CA65] to-[#D4AF37] text-[#0F0E0D] font-bold text-xs tracking-widest uppercase"
            >
              Reserve Suite
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
