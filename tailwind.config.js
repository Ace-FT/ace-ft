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
        iexwhite: "#f2f3f1",
        nav: "#8c8c90",
      },
      margin: {
        s: "30px",
        m: "60px",
      },
      fontFamily: {
        logo: ["Space Mono"],
      },
      maxWidth: {
        "2/10": "20%",
      },
      fontSize: {
        xl: ["1.3rem", "0.2rem"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
