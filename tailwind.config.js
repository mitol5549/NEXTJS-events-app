import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#11181C', // or 50 to 900 DEFAULT
            primary: {
              100: '#F3DEFC',
              200: '#E5BDFA',
              300: '#CE99F1',
              400: '#338ef7',
              500: '#B57CE4',
              600: '#005bc4',
              700: '#004493',
              800: '#002e62',
              900: '#001731',
              foreground: '##FF4ECD',
              DEFAULT: '#006FEE',
            },
          },
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: {
              200: '#9353D3',
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
          },
        },
      },
    }),
  ],
};
