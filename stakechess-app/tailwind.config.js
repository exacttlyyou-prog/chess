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
          DEFAULT: '#0A0A0A',
          light: '#141414',
          medium: '#1F1F1F',
        },
        'stake-red': {
          DEFAULT: '#ef3124', // Primary brand accent
          dark: '#c72819',
          light: '#ff5a4d',
          neon: '#ff1f0f',
        },
        'stake-gray': {
          DEFAULT: '#2E2E2E',
          light: '#4A4A4A',
          dark: '#1A1A1A',
        },
        'stake-accent': {
          purple: '#C724E5',
          blue: '#2E9CFF',
          cyan: '#00D9FF',
          green: '#00FF9F',
          yellow: '#FFD700',
          orange: '#FF6B35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
