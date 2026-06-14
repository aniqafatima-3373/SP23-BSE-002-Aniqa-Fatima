/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sproutBg: '#FDFBF7',     // Premium Off-white
        sproutDark: '#1B3022',   // Deep Forest Green
        sproutOlive: '#808000',  // Luxury Olive Green
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}