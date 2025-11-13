/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from official brandbook
        'stake-black': {
          DEFAULT: '#2A2C2F',      // Official brand dark
          light: '#35373A',        // Slightly lighter variant
          dark: '#1F2123',         // Deeper variant
        },
        'stake-red': {
          DEFAULT: '#EF3124',      // Official brand red
          dark: '#C22719',         // Darker variant
          light: '#F24D3E',        // Lighter variant
          glow: 'rgba(239, 49, 36, 0.25)', // For shadows/glows
        },
        'stake-white': '#FFFFFF',  // Official white

        // Extended palette (use sparingly per brandbook)
        'accent': {
          green: {
            light: '#A8F000',
            DEFAULT: '#31E300',
            teal: '#00F064',
          },
          cyan: {
            DEFAULT: '#00E8F0',
            blue: '#17A0E5',
          },
          blue: {
            DEFAULT: '#266FFF',
            purple: '#6A4DFF',
          },
          purple: '#9933FF',
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
