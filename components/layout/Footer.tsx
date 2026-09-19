'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-gray-300 pt-20 pb-12 border-t border-[#C5A880]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <span className="font-serif-luxury text-3xl tracking-[0.2em] text-white">
              LUXORA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] inline-block ml-1"></span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Your Stay, Elevated. Experience bespoke hospitality, quiet luxury, and culinary mastery in an atmosphere of timeless sophistication.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors">
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif-luxury text-sm uppercase tracking-widest text-[#C5A880] mb-6">
            Navigation
          </h4>
          <ul className="space-y-3 text-xs tracking-wider uppercase font-light">
            <li>
              <Link href="/rooms" className="hover:text-[#C5A880] transition-colors">
                Rooms & Suites
              </Link>
            </li>
            <li>
              <Link href="/#experience" className="hover:text-[#C5A880] transition-colors">
                The LUXORA Experience
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C5A880] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C5A880] transition-colors">
                Contact & Location
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="hover:text-[#C5A880] transition-colors">
                Guest Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-serif-luxury text-sm uppercase tracking-widest text-[#C5A880] mb-6">
            Concierge
          </h4>
          <ul className="space-y-4 text-xs font-light text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>742 Ocean Boulevard, Grand Sanctuary Estate, FL 33139</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>+1 (800) 589-6721</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>concierge@luxorahotel.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-serif-luxury text-sm uppercase tracking-widest text-[#C5A880] mb-6">
            The Journal
          </h4>
          <p className="text-xs text-gray-400 mb-4 font-light leading-relaxed">
            Subscribe to receive private invitations, seasonal retreat offers, and culinary stories.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-900 border border-gray-800 text-xs px-4 py-3 text-white focus:outline-none focus:border-[#C5A880] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#C5A880] text-[#1C1917] text-xs uppercase tracking-widest font-medium py-3 hover:bg-[#B39264] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-light">
        <p>© {new Date().getFullYear()} LUXORA Luxury Hotels & Resorts. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Hospitality</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
