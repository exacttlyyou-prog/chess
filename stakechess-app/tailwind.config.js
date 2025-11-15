/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stake-black': {
          DEFAULT: '#121212',
          light: '#1a1a1a',
          medium: '#252525',
        },
        'stake-red': {
          DEFAULT: '#c72819', // Muted from #ef3124 for Apple HIG compliance
          dark: '#a01d13',
          light: '#d73d28',
        },
        'stake-gray': {
          DEFAULT: '#2E2E2E',
          light: '#4A4A4A',
          dark: '#1A1A1A',
        },
        'stake-accent': {
          purple: '#A020C0', // Muted from #C724E5
          blue: '#2680D9', // Muted from #2E9CFF
          cyan: '#00B8D4', // Muted from #00D9FF
          green: '#00CC7F', // Muted from #00FF9F
          yellow: '#D4AF37', // Muted from #FFD700
          orange: '#E65A2F', // Muted from #FF6B35
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Apple 8pt grid system
        '0': '0px',
        '1': '8px',   // 8pt
        '2': '16px',  // 16pt
        '3': '24px',  // 24pt
        '4': '32px',  // 32pt
        '5': '40px',  // 40pt
        '6': '48px',  // 48pt
        '7': '56px',  // 56pt
        '8': '64px',  // 64pt
        '10': '80px', // 80pt
        '12': '96px', // 96pt
        '16': '128px', // 128pt
        '20': '160px', // 160pt
        '24': '192px', // 192pt
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
