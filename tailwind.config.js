 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./*.html", "./src/**/*.js"],

  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"]
      },
    },
  },
  plugins: [],
}