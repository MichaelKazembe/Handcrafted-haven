
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar, Footer } from '@/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Handcrafted Haven | Unique Handmade Products',
    template: '%s | Handcrafted Haven',
  },
  description: 'Discover unique, handcrafted products made with passion by local artisans. From home décor to accessories, every item tells a story.',
  keywords: ['handcrafted', 'handmade', 'artisan', 'local', 'unique products', 'pottery', 'jewelry', 'textiles'],
  authors: [{ name: 'Handcrafted Haven' }],
  creator: 'Handcrafted Haven',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://handcraftedhaven.com',
    siteName: 'Handcrafted Haven',
    title: 'Handcrafted Haven | Unique Handmade Products',
    description: 'Discover unique, handcrafted products made with passion by local artisans.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Handcrafted Haven',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handcrafted Haven | Unique Handmade Products',
    description: 'Discover unique, handcrafted products made with passion by local artisans.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#7c2d12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


