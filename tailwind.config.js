/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa"],
        playfair: ["Playfair"],
        solitreo: ["Solitreo"],
        dancingscript: ["Dancing-Script"],
        optimaroman: ["Optima-Roman"]
    }
    }
  },
  plugins: [],
}