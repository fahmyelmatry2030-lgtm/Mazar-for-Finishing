/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#121212',
        'bg-tertiary': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#a3a3a3',
        'text-muted': '#737373',
        'accent-gold': '#d4af37',
        'border-gold': 'rgba(212, 175, 55, 0.3)',
        'border-light': 'rgba(255, 255, 255, 0.08)'
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
