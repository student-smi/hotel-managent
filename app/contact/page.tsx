'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Sparkles, Send, CheckCircle2, HelpCircle, Car, Utensils, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryType, setInquiryType] = useState('Private Suite Reservation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What are the check-in and check-out times?',
      a: 'Check-in begins at 3:00 PM and check-out is by 12:00 PM. Express Butler check-in can be arranged prior to arrival.',
    },
    {
      q: 'Is private airport transfer included?',
      a: 'Yes, complimentary private chauffeur transfer to/from Miami International Airport is provided for all Suite & Villa reservations.',
    },
    {
      q: 'What is the cancellation policy?',
      a: 'Cancellations made up to 48 hours prior to check-in are eligible for a full refund without penalty.',
    },
    {
      q: 'Are children and pets accommodated?',
      a: 'LUXORA welcomes families and offers bespoke children butler services. Small pets are permitted in designated garden villas.',
    },
  ];

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-28 text-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {/* 1. HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 glass-luxury border border-[#D4AF37]/40 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              24/7 BUTLER CONCIERGE
            </span>
          </div>
          <h1 className="font-serif-luxury text-4xl md:text-6xl font-light text-gold-gradient">
            Contact & Location
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
            Our private butler desk is available 24/7 for airport transfer arrangements, private dining reservations, and bespoke guest itineraries.
          </p>
        </div>

        {/* 2. DIRECT ACTION BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-luxury-card p-6 border border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium block">Direct Butler Desk</span>
              <span className="font-serif-luxury text-lg text-white block">+1 (800) 589-6721</span>
              <span className="text-[11px] text-muted-foreground font-light">24/7 Priority Line</span>
            </div>
          </div>

          <div className="glass-luxury-card p-6 border border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium block">Airport Transfer</span>
              <span className="font-serif-luxury text-lg text-white block">Chauffeur Service</span>
              <span className="text-[11px] text-muted-foreground font-light">Complimentary for Suites</span>
            </div>
          </div>

          <div className="glass-luxury-card p-6 border border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium block">Michelin Dining</span>
              <span className="font-serif-luxury text-lg text-white block">Table Reservation</span>
              <span className="text-[11px] text-muted-foreground font-light">Sommelier Cellar Access</span>
            </div>
          </div>
        </div>

        {/* 3. MAIN FORM & INFO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="glass-luxury-card p-6 border border-white/10 space-y-3">
              <MapPin className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-xl">Sanctuary Address</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                742 Ocean Boulevard, Grand Sanctuary Estate, FL 33139, United States
              </p>
            </div>

            <div className="glass-luxury-card p-6 border border-white/10 space-y-3">
              <Mail className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-xl">Electronic Desks</h3>
              <p className="text-xs text-muted-foreground font-light">concierge@luxorahotel.com</p>
              <p className="text-xs text-muted-foreground font-light">reservations@luxorahotel.com</p>
            </div>

            <div className="glass-luxury p-6 border border-[#D4AF37]/30 space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium uppercase tracking-wider">Privacy Guarantee</span>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed">
                All guest inquiries and reservation requests are handled with absolute confidentiality by our Head Butler.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 glass-luxury-card p-8 md:p-10 border border-white/10 space-y-6 shadow-2xl">
            <h2 className="font-serif-luxury text-2xl font-light pb-4 border-b border-white/10 text-gold-gradient">
              Send a Message to Head Butler
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/40 border border-emerald-800/60 p-8 text-center space-y-4"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-serif-luxury text-2xl text-emerald-300">Inquiry Received</h3>
                <p className="text-xs text-emerald-200 font-light max-w-md mx-auto leading-relaxed">
                  Thank you. Our Head Butler will review your inquiry and contact you within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-3 bg-[#D4AF37] text-[#0F0E0D] text-xs uppercase tracking-widest font-semibold"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="Lord / Lady / Guest Name"
                      className="w-full bg-black/40 border border-white/10 text-xs px-4 py-3.5 text-foreground focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Email Address *</label>
                    <input
                      type="email"
                      placeholder="guest@domain.com"
                      className="w-full bg-black/40 border border-white/10 text-xs px-4 py-3.5 text-foreground focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Nature of Inquiry *</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 text-xs px-4 py-3.5 text-foreground focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Private Suite Reservation">Private Suite Reservation</option>
                    <option value="Chauffeur / Helicopter Transfer">Chauffeur / Helicopter Transfer</option>
                    <option value="Private Event & Wedding">Private Event & Wedding</option>
                    <option value="Gourmet Dining & Wine Cellar">Gourmet Dining & Wine Cellar</option>
                    <option value="General Concierge Question">General Concierge Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Message Details *</label>
                  <textarea
                    rows={5}
                    placeholder="How may our head butler assist your upcoming stay at LUXORA?"
                    className="w-full bg-black/40 border border-white/10 text-xs p-4 text-foreground focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-9 py-4 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] text-[#0F0E0D] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  <Send className="w-4 h-4" /> Dispatch Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4. MAP VIEW & LOCATION HIGHLIGHT */}
        <div className="glass-luxury-card border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              ESTATE LOCATION
            </span>
            <h3 className="font-serif-luxury text-3xl font-light text-gold-gradient">
              Secluded Coastal Bluff
            </h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Located 20 minutes from Miami International Airport, our secluded estate provides immediate access to private white-sand beaches, championship golf courses, and luxury fashion districts.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#D4AF37]">
              <MapPin className="w-4 h-4" />
              <span>Helipad Coordinates: 25.7617° N, 80.1918° W</span>
            </div>
          </div>

          <div className="relative h-64 border border-white/10 overflow-hidden rounded-none shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=1200&q=80"
              alt="LUXORA Location Overview"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="glass-luxury p-4 border border-[#D4AF37]/40 text-center">
                <span className="font-serif-luxury text-sm text-[#D4AF37] block">LUXORA Private Estate</span>
                <span className="text-[10px] text-gray-300">Complimentary Chauffeur Airport Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. FAQ ACCORDION */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif-luxury text-3xl font-light text-gold-gradient">
              Concierge Guidance
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-luxury-card border border-white/10 p-6 space-y-2 cursor-pointer transition-all hover:border-[#D4AF37]/40"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-luxury text-base font-normal flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> {faq.q}
                  </h4>
                  <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-muted-foreground font-light leading-relaxed pt-3 border-t border-white/10">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
