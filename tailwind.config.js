/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      'dark-background': '#0a0a0f',
      'dark-primary': '#6134cf',
      'dark-secondary': '#1f1f2c',
      'dark-text': '#f1f1f1',
      'dark-text-secondary': '#b4b4b4',
      'dark-text-tertiary': '#838383',
      'dark-text-quaternary': '#646464',
      'dark-neon-cyan': '#00ffff',
      'dark-neon-magenta': '#ff00ff',
      'dark-neon-yellow': '#ffff00',
      'dark-neon-green': '#39ff14',
      'dark-electric-blue': '#0892d0',
      'dark-cyber-purple': '#8a2be2',
      'dark-neon-red': '#ff0000',

      //light theme colors
      'light-background': '#f5f5fa',
      'light-primary': '#9e6bff',
      'light-secondary': '#e0e0f3',
      'light-text': '#0e0e0e',
      'light-text-secondary': '#4b4b4b',
      'light-text-tertiary': '#7c7c7c',
      'light-text-quaternary': '#9b9b9b',
      'light-pastel-cyan': '#a0ffff',
      'light-pastel-magenta': '#ffa0ff',
      'light-pastel-yellow': '#ffffa0',
      'light-pastel-green': '#a0ffa0',
      'light-sky-blue': '#87ceeb',
      'light-lavender': '#e6e6fa',
      'light-red': '#ff6347',
    },
    extend: {
      boxShadow: {
        'neon-glow':
          '0 0 5px theme("colors.neon-cyan"), 0 0 20px theme("colors.neon-cyan")',
      },
      textShadow: {
        cyber:
          '0 0 5px theme("colors.neon-magenta"), 0 0 10px theme("colors.neon-magenta")',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
