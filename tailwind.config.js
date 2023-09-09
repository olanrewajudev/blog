/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "notfound": "url('/src/asset/images/404.jpg')"
      }
    },
  },
  plugins: [],
}