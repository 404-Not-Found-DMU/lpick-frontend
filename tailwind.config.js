/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /^(bg|text|border|hover:bg|hover:text|hover:border)-primary(\/\d+)?$/,
    },
    {
      pattern: /^(h|px)-\d+$/,
    },
    {
      pattern: /^text-(sm|lg)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        'lavender': {
          '50': '#f6f2ff',
          '100': '#ede8ff',
          '200': '#ded4ff',
          '300': '#c5b2ff',
          '400': '#a985ff',
          '500': '#8f55fd',
          '600': '#8232f5',
          '700': '#7320e1',
          '800': '#611abd',
          '900': '#51189a',
          '950': '#310c69',
      },
      
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
