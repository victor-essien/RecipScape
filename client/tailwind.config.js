/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      bgColor: "rgb(var(--color-bg) / <alpha-value>)",
      hdColor: "rgb(var(--head-bg) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      ivory: "rgb(var(--color-bg) / <alpha-value>)",
      terra: "rgb(var(--color-terra) / <alpha-value>)",
      black:"rgb(var(--color-black) / <alpha-value>)",
      dark:"rgb(var(--color-dark) )",
      white: "rgb(var(--color-white) / <alpha-value>)",
      red: "rgb(var(--color-red) / <alpha-value>)",
      yellow:"rgb(var(--color-yellow) / <alpha-value>)",
      blue:"rgb(var(--color-blue) / <alpha-value>)",
      darj:"rgb(var(--color-gray) )",
      gray:"rgb(var(--color-gra) )",
      ascent: {
        1: "rgb(var(--color-ascent1) / <alpha-value>)",
        2: "rgb(var(--color-ascent2) / <alpha-value>)",
        3: "rgb(var(--color-ascent3) / <alpha-value>)",
        4: "rgb(var(--color-ascent4) / <alpha-value>)",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      inset: {
        '45p': '45%',
      },
      backgroundImage: {
        'custom-bg': "url('/src/assets/images/bg-img.jpg')", // Path to your image
        'custom-bg2': "url('/src/assets/images/bg2-img.jpeg')",
        'custom-bg3': "url('/src/assets/images/bg3-img.jpeg')",
        'custom-bg4': "url('/src/assets/images/bg4-img.jpeg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};