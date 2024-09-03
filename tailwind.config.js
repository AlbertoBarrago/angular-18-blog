/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      primary: '#2577c1',
      'secondary-bg': '#fff',
      theme: '#fff',
      'header-color': '#c23fe2',
      'route-link-active': '#fff',
      'link-color': '#555050',
      'border-color': '#555050',

      'dark-primary': '#ff500b',
      'dark-secondary-bg': '#424242',
      'dark-theme': '#424242',
      'dark-header-color': '#424242',
      'dark-route-link-active': '#ff500b',
      'dark-link-color': '#fff',
      'dark-border-color': '#1cd61c',
    },
    extend: {},
  },
  plugins: [],
};
