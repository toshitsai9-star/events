/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#171717',
          light: '#262626',
        },
        forest: {
          DEFAULT: '#06110C',
          light: '#0D1F17',
        },
        crimson: {
          DEFAULT: '#A31C18',
          hover: '#871612',
          light: '#BA221E',
        },
        ivory: {
          DEFAULT: '#F8F6F1',
          pure: '#FFFFFF',
        },
        beige: {
          DEFAULT: '#EDE7DD',
          dark: '#DDD4C5',
        },
        sage: {
          DEFAULT: '#A8B09A',
          light: '#C4CABA',
        },
        gold: {
          DEFAULT: '#B49A70',
          light: '#C7B18E',
          dark: '#988057',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
      },
    },
  },
  plugins: [],
};

