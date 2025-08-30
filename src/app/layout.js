import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lucian Admin WS",
  description: "Created by Mebhevy Services",
  keywords: ['Next.js', 'SEO', 'Thumbnail', 'Tutorial'],
  authors: [{ name: 'Lucian-Florin' }],
  viewport: 'width=device-width, initial-scale=1.0',

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Lucian Admin WS",
    description: "Created by Mebhevy Services",
    url: 'https://admin.lucianws.com',
    siteName: 'LucianWSAdmin',
    images: [
      {
        url: '/images/thumbnail.png', // imaginea ta
        width: 1200,
        height: 630,
        alt: 'Mebhevy',
      },
    ],
    locale: 'en_EN',
    type: 'website',
  },

  // Twitter Cards
  twitter: {
    card: '/images/thumbnail.png',
    title: 'Lucian WS Admin',
    description: 'Lets built the web together',
    images: ['/images/thumbnail.png'],
    site: 'https://admin.lucianws.com',
    creator: 'Lucian-Florin',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
