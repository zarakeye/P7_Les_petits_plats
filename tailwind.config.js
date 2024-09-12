import { plugin } from 'postcss';

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
    // plugin(function ({ addUtilities }) {
    //   const newUtilities = {
    //     '.scrollbar-hide': {
    //       '&::-webkit-scrollbar': {
    //         display: 'none',
    //       },
    //     },
        
    //     '.selectable-filter': {
    //       'font-size': '14px',
    //       'background-color': white
    //     },
        
    //     '.active-filter': {
    //       'font-size': '14px',
    //       'text-align': 'left',
    //       'padding': '9px 16px',
    //       'mb': '1px',
    //     }//text-[14px] text-left px-[16px] py-[9px] mb-px
    //   };
    //   addUtilities(newUtilities, ['responsive']);
    // })
  ],
}
