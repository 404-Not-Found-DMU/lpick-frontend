/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
