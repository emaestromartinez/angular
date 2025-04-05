/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css,scss}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      ringWidth: ["focus"],
      ringColor: ["focus"],
    },
  },
  plugins: [],
};
