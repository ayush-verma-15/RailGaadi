import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import QueryProvider from '@/providers/query-provider';
import { CommandNavbar } from '@/components/layout/CommandNavbar';
import { TelemetryFooter } from '@/components/layout/TelemetryFooter';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'RailPulse AI — Transit Telemetry & Route Intelligence Platform',
  description:
    'Next-gen railway telemetry engine featuring real-time GIS vector tracking, AI delay risk evaluation, carbon footprint metrics, and fleet dispatch matrix.',
  keywords: ['RailPulse AI', 'transit telemetry', 'live train status', 'Indian Railways', 'delay predictor AI', 'route map'],
  authors: [{ name: 'RailPulse AI Team' }],
  openGraph: {
    title: 'RailPulse AI — Transit Telemetry Engine',
    description: 'Enterprise transit intelligence, live vector radar, and delay risk AI.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://api.railradar.in" />
        <link rel="preconnect" href="https://api.maptiler.com" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-400`}>
        <QueryProvider>
          <CommandNavbar />
          <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <TelemetryFooter />
        </QueryProvider>
      </body>
    </html>
  );
}
