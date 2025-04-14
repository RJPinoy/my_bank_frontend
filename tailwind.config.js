/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mybanklogo1': "url('/src/assets/myBank_logo1.png')",
      },
      colors: {
        'mybank-darkblue': '#0D1C25',
        'mybank-blue': '#1C274C',
        'mybank-orange': '#FCA311',
        'mybank-green': '#59E5A9',
        'mybank-red': '#EC0B43',
      },
    },
  },
  plugins: [],
}