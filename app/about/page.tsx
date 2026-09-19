import Image from 'next/image';
import Link from 'next/link';
import { Award, Compass, Shield, Sparkles, ChefHat, HeartHandshake, History, Utensils } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-28 text-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28">
        {/* 1. HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 glass-luxury border border-[#D4AF37]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              HERITAGE & VISION
            </span>
          </div>
          <h1 className="font-serif-luxury text-4xl md:text-6xl font-light text-gold-gradient">
            Architectural Mastery & Bespoke Hospitality
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
            Founded with a vision to redefine luxury travel, LUXORA stands as a sanctuary where modern aesthetic meets timeless European grandiosity.
          </p>
        </div>

        {/* 2. EDITORIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] border-4 border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
              alt="LUXORA Sanctuary Estate"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl font-light text-gold-gradient">
              Quiet Luxury, Crafted for the Senses
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              At LUXORA, we believe true luxury is quiet, deliberate, and deeply personal. Every suite is insulated with soundproof acoustic architecture, furnished with organic silk linen, and tended to by a dedicated 24-hour butler team.
            </p>
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-6 text-xs">
              <div>
                <span className="font-serif-luxury text-3xl text-[#D4AF37] block">100%</span>
                <span className="text-muted-foreground font-light">Organic & Sustainable Linen</span>
              </div>
              <div>
                <span className="font-serif-luxury text-3xl text-[#D4AF37] block">3 Michelin</span>
                <span className="text-muted-foreground font-light">Starred Dining Venues</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. HERITAGE TIMELINE */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              CHRONICLE
            </span>
            <h2 className="font-serif-luxury text-3xl font-light text-gold-gradient">
              A Century of Hospitality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { year: '1924', title: 'The Coastal Manor', desc: 'Constructed as a private cliffside estate for European aristocrats.' },
              { year: '1978', title: 'Grand Expansion', desc: 'Introduced the iconic infinity reflection pool and private botanical gardens.' },
              { year: '2024', title: 'The Modern Sanctuary', desc: 'Redesigned into LUXORA: a modern 5-star haven combining quiet luxury and smart technology.' },
            ].map((milestone, idx) => (
              <div key={idx} className="glass-luxury-card p-8 border border-white/10 space-y-3 relative">
                <span className="font-serif-luxury text-4xl text-[#D4AF37] font-light block">
                  {milestone.year}
                </span>
                <h3 className="font-serif-luxury text-lg">{milestone.title}</h3>
                <p className="text-xs text-muted-foreground font-light">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MASTER TEAM SPOTLIGHT */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="font-serif-luxury text-3xl font-light text-gold-gradient">
              Curators of Your Stay
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: 'Antoine Laurent',
                role: 'Head Culinary Director',
                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
                desc: '3-Michelin star chef overseeing LUXORA organic farm-to-table menus.',
              },
              {
                name: 'Elena Rostova',
                role: 'Master Butler Concierge',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                desc: '20+ years managing royal estates and bespoke guest itineraries.',
              },
              {
                name: 'Marcus Vance',
                role: 'Wellness & Spa Curator',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
                desc: 'Pioneer of holistic organic rituals & Japanese soaking bath therapies.',
              },
            ].map((team, idx) => (
              <div key={idx} className="glass-luxury-card border border-white/10 overflow-hidden group">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium">
                    {team.role}
                  </span>
                  <h3 className="font-serif-luxury text-xl">{team.name}</h3>
                  <p className="text-xs text-muted-foreground font-light">{team.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CALL TO ACTION */}
        <div className="glass-luxury p-12 text-center space-y-6 border border-[#D4AF37]/40 shadow-2xl">
          <h2 className="font-serif-luxury text-3xl font-light text-gold-gradient">
            Begin Your LUXORA Journey
          </h2>
          <p className="text-xs text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
            Reserve your stay today and immerse yourself in an oceanfront sanctuary like no other.
          </p>
          <div>
            <Link
              href="/rooms"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#AA8726] text-[#0F0E0D] text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Explore Accommodations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
