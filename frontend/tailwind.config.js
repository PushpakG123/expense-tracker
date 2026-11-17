/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0f172a',
        card: '#111827',
        accent: '#22d3ee',
        accent2: '#a855f7',
        muted: '#94a3b8',
        success: '#22c55e',
        danger: '#ef4444'
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
};
