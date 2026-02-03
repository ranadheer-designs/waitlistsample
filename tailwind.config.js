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
        "primary": "#f97316",
        "accent": "#fbbf24",
        "background-light": "#ffffff",
        "background-dark": "#0c0a09",
        "surface": "#fdfaf7"
      },
      fontFamily: {
        "sans": ["'Plus Jakarta Sans'", "sans-serif"]
      }
    },
  },
  plugins: [],
}
