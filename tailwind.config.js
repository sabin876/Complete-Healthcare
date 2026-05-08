/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#08709d',
        'secondary-color': '#1a294a',
        'accent-color': '#5eb63b',
        'bg-alt': '#F8F9FA',
      },
    },
  },
  plugins: [],
}
