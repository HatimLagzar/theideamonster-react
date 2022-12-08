/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#5a62cf'
      },
      fontFamily: {
        montserrat: '"Montserrat", sans-serif'
      }
    },
  },
  plugins: [],
}
