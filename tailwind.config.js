/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-green': '#2E7D32',
        'agro-light': '#A5D6A7',
        'soil-brown': '#8D6E63',
        'water-blue': '#1976D2',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
} 