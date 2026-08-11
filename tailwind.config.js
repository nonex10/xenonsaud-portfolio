/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        ink: "#19171A",
        mute: "#6E6862",
        line: "#E7E1D6",
        plum: {
          DEFAULT: "#4A1E32",
          light: "#6B2D48",
          dark: "#301422",
        },
      },
      fontFamily: {
        display: ["'Manrope'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      maxWidth: {
        canvas: "1280px",
      },
      letterSpacing: {
        tightest2: "-0.04em",
      },
    },
  },
  plugins: [],
};
