import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUXORA — Luxury Hotel & Sanctuary',
  description: 'Your Stay, Elevated. Discover bespoke accommodations, oceanfront penthouses, 3-Michelin dining, and private butler hospitality at LUXORA.',
  keywords: ['luxury hotel', 'resort', 'penthouses', 'ocean suites', 'spa', 'fine dining', 'LUXORA'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col transition-colors duration-500">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
