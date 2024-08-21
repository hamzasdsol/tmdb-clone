/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      spacing:{
        '110px' : '110px',
      }
    },
  },
  plugins: [],
}
