/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'iexblk': '#0d0d12',
        'iexyellow': '#fcd15a',
        'iexwhite': "#f3f4f2"
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
