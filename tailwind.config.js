/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3E2B',
        secondary: '#D0EA51',
        tertiary:'#0BA94B'
      },
      fontFamily: {
        'body': ['Open Sans', 'sans-serif']
      }
    },
    container: {
      center: true,
      padding: {
        'DEFAULT': '20px',
      }
    }
  },
  plugins: [],
}
