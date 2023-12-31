/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3E2B",
        secondary: "#D0EA51",
        tertiary: "#0BA94B",
      },
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
        "eskell-small": ["Eskell Small", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      zIndex: {
        header: 10,
        "mobile-nav": 9,
        cta: 8,
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
      },
    },
  },
  plugins: [],
};
