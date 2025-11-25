/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinnamon: {
          DEFAULT: "#B07050",
          dark: "#A06040",
          light: "#D78A5F",
        },
        ink: "#303040",
        sand: "#F5F2ED",
      },
    },
  },
  plugins: [],
};
