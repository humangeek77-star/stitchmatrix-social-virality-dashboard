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
        slate: {
          850: '#141E33',
          900: '#0F172A',
          950: '#090E17',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          electric: '#3B82F6',
          sky: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
};
