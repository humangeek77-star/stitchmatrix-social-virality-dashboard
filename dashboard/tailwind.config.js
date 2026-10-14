/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          925: '#121214',
          950: '#09090B',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          accent: '#3B82F6',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
};
