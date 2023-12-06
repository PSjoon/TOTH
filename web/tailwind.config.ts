import withMT from '@material-tailwind/react/utils/withMT'
import { config } from 'react-transition-group'

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        // easeOutSine: '',
      },
      variants: {
        scrollbar: ['rounded'],
      },

      fontFamily: {
        sans: 'var(--font-nunito)',
      },
      colors: {
        orange: {
          500: '#F56B07',
        },
        white: {
          50: '#FFFFFF',
          200: '#EFEFEF',
          300: '#D9D9D9',
        },
        gray: {
          200: '#404040', // background Post
          300: '#3B3B3B',
          400: '#292929',
          600: '#303030', // background geral
          700: '#2E2E2E',
          800: '#232323', // background header
          900: '#181818',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
})
export default config
