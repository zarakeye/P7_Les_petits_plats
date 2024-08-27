/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,html,css,scss}'],
  theme: {
    extend: {  
    },
    fontFamily: {
      anton: ['anton-font-regular', 'sans-serif'],
      manrope: ['manrope-font-regular', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
