/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        iexblk: "rgb(13 13 18)",
        iexyellow: "#fcd15a",
        iexwhite: "#f1f2f0",
        nav: "#8c8c90",
      },
      spacing: {
        xs: "15px",
        s: "30px",
        m: "60px",
        l: "90px",
      },
      fontFamily: {
        logo: ["Space Mono"],
      },
      maxWidth: {
        "2/10": "20%",
        "3/10": "30%"
      },
      borderRadius: {
        "lg": "9px",
      },
      height: {
        "6": "24px",
        "8": "32px",
        "1/10": "10%"
      },
      minHeight: {
        "8": "32px",
      },
      fontSize: {
        "l": "15px",
        xl: ["1.3rem", "0.2rem"],
        xl2: ["1.25rem", "2.25rem"],
        "2xl": ["1.5rem", "2.5rem"],
        "6xl": ["3.75rem", "5.25rem"],
        "8xl": ["6rem", "8.5rem"]
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
