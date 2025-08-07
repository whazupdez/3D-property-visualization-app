/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'mobile-landscape': {'raw': '(max-height: 500px) and (orientation: landscape)'},
      'tablet-landscape': {'raw': '(min-width: 768px) and (max-height: 1024px) and (orientation: landscape)'},
    },
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1e40af',
          800: '#1e3a8a',
        },
        accent: {
          500: '#10b981',
          600: '#059669',
        },
        tv: {
          bg: '#000000',
          text: '#ffffff',
          border: '#374151',
        }
      },
      fontSize: {
        'tv-h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'tv-h2': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'tv-body': ['1.8rem', { lineHeight: '1.4', fontWeight: '400' }],
        'tv-button': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        'tv-safe': '2rem',
        'tv-section': '4rem',
        'mobile-safe': '1rem',
        'mobile-section': '2rem',
      },
      aspectRatio: {
        'tv': '16 / 9',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      minHeight: {
        'tv-button': '80px',
        'mobile-button': '44px',
      },
      minWidth: {
        'tv-button': '200px',
        'mobile-button': '120px',
      },
    },
  },
  plugins: [],
}