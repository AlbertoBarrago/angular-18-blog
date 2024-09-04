/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      'dark-background': '#0a0a0f',
      'dark-primary': '#15151e',
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
