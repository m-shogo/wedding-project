/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3f9",
          100: "#d9e0f0",
          200: "#b3c1e0",
          300: "#8da2d1",
          400: "#6783c1",
          500: "#4164b2",
          600: "#34508e",
          700: "#273c6b",
          800: "#1a2847",
          900: "#0d1424",
        },
        gold: {
          50: "#fdf9ef",
          100: "#f9efd3",
          200: "#f3dfa7",
          300: "#edcf7b",
          400: "#e7bf4f",
          500: "#d4a934",
          600: "#a9872a",
          700: "#7f651f",
          800: "#544315",
          900: "#2a210a",
        },
        sand: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e7dfd1",
          300: "#dbcfba",
          400: "#cfbfa3",
          500: "#c3af8c",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', "Georgia", "serif"],
        sans: ['"Noto Sans JP"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
