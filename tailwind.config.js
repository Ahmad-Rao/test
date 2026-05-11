/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        psych: {
          purple: "#7000ff",
          black: "#050505",
        }
      }
    },
  },
  plugins: [],
}
