/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#4A72B2",
        "sage": "#7A9E7E",
        "warm-gray": "#71717A",
        "soft-cream": "#FDFCF9",
        "soft-green": "#F4F7F4",
        "charcoal": "#2D3436"
      },
      fontFamily: {
        "display": ["'Plus Jakarta Sans'", "sans-serif"],
        "body": ["'Plus Jakarta Sans'", "sans-serif"],
        "serif": ["'Instrument Serif'", "serif"]
      }
    },
  },
  plugins: [],
}
