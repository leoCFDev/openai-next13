/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlack: "#0d0d0d",
        mainPurple: "#5465ff",
        secondPurple: "#bfd7ff",
        mainWhite: "#f8f7ff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
