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
    colors: {
      'yellow': '#FFD15B',
      'black': '#000000',
      'white': '#FFFFFF',
      'gray': '#7A7A7A',
      'light-gray': '#E5E5E5',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
