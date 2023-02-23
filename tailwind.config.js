/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      'baloo2-regular': ['Baloo2 Regular'],
      'baloo2-medium': ['Baloo2 Medium'],
      'baloo2-bold': ['Baloo2 Bold'],
      'baloo2-semibold': ['Baloo2 SemiBold'],
      'baloo2-extrabold': ['Baloo2 ExtraBold'],
    },
  },
  plugins: [],
};
