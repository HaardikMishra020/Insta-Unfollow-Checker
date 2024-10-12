/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37A39E',
        secondary: '#e45858',
        dark: '#3A3A3A',
        offwhite: '#fffffe',
        background: '#f7f7f7',
      },
    },
  },
  plugins: [],
};
