module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary-gray': '#f6f6f6',
      'secondary-gray': '#e8e8e8',
      'primary-black': '#333533',
      'secondary-black': '#242423',
      'primary-red': '#b90504',
      'secondary-red': '#990100',
      }),
    fontFamily: {
      'display': ['Karla', 'sans-serif']
     },
     textColor: theme => ({
      ...theme('colors'),
      'primary-gray': '#f6f6f6',
      'secondary-gray': '#e8e8e8',
      'primary-black': '#333533',
      'secondary-black': '#242423',
      'primary-red': '#b90504',
      'secondary-red': '#990100',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary-gray': '#f6f6f6',
      'secondary-gray': '#e8e8e8',
      'primary-black': '#333533',
      'secondary-black': '#242423',
      'primary-red': '#b90504',
      'secondary-red': '#990100',
     }),

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
