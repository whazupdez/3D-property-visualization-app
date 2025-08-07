import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RESIDENSI MADANI SERUNAI - Interactive Property Showcase',
  description: 'Experience luxury living with our interactive 3D property showcase. Explore floor plans, virtual tours, and premium amenities.',
  keywords: 'luxury apartments, 3D virtual tours, property showcase, real estate, modern living',
  authors: [{ name: 'RESIDENSI MADANI SERUNAI' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'RESIDENSI MADANI SERUNAI - Interactive Property Showcase',
    description: 'Experience luxury living with our interactive 3D property showcase',
    type: 'website',
    locale: 'en_US',
    siteName: 'RESIDENSI MADANI SERUNAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RESIDENSI MADANI SERUNAI - Interactive Property Showcase',
    description: 'Experience luxury living with our interactive 3D property showcase',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true, // Allow zooming for mobile accessibility
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* TV-optimized meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Responsive viewport for mobile and TV */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} h-full overflow-x-hidden bg-black text-white antialiased`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Skip to main content
        </a>
        
        {/* Main application */}
        <div id="main-content" className="h-full w-full">
          {children}
        </div>
        
        {/* Global loading indicator */}
        <div id="global-loading" className="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg font-semibold">Loading...</p>
          </div>
        </div>
        
        {/* Error boundary fallback */}
        <div id="error-fallback" className="hidden fixed inset-0 bg-red-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-red-200 mb-4">We're sorry, but there was an error loading the application.</p>
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
              Reload Page
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}