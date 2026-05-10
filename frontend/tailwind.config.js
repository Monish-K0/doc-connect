/** @type {import('tailwindcss').Config} */

export default {

  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(220px, 1fr))'
      },

      colors: {

        primary: '#6366F1',

        secondary: '#06B6D4',

        darkbg: '#020617',

        darkcard: '#0F172A'

      },

      boxShadow: {

        soft: '0 10px 30px rgba(0,0,0,0.08)',

        glow: '0 0 40px rgba(99,102,241,0.25)'

      }

    },

  },

  plugins: [],

}