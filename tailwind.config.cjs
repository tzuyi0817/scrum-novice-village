/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'bg-dark': '#0A0D14',
        'bg-transitions': 'rgba(28, 50, 69, 0.6)',
        primary: '#00FFE0',
        'primary-dark': '#008D96',
        'primary-deep-dark': '#005656',
        text: '#FFFFFF',
        'text-dark': '#1C3245',
        'text-tint': '#00FFE0',
        'role-sm': '#D355FF',
        'role-sm-dark': '#4C0071',
        'role-sm-tint': '#FF00F5',
        'role-team1': '#FFC700',
        'role-team2': '#FF5C00',
        'role-team-dark': '#933500',
        danger: '#FF0000',
      },
      backgroundImage: {
        'primary-linear': 'linear-gradient(rgba(0, 255, 224, 0) 0, rgba(0, 255, 224, 0.25) 60%, rgba(0, 255, 224, 0.45) 80%, rgba(0, 255, 224, 0.7) 90%, rgba(0, 255, 224, 0.9) 100%)',
        'role-sm-linear': 'linear-gradient(rgba(211, 85, 255, 0) 0, rgba(211, 85, 255, 0.05) 60%, rgba(211, 85, 255, 0.2) 80%, rgba(211, 85, 255, 0.6) 100%)',
        'role-team1-linear': 'linear-gradient(rgba(255, 199, 0, 0) 0, rgba(255, 199, 0, 0.05) 60%, rgba(255, 199, 0, 0.2) 80%, rgba(255, 199, 0, 0.6) 100%)',
        'role-team2-linear': 'linear-gradient(rgba(255, 122, 0, 0) 0, rgba(255, 122, 0, 0.05) 60%, rgba(255, 122, 0, 0.2) 80%, rgba(255, 122, 0, 0.6) 100%)',
      },
      bgGradientDeg: {
        0: '0deg',
        270: '270deg',
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme('bgGradientDeg', {}))
        }
      )
    }),
  ],
}