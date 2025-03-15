/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "achieve-pink": "#FFB6E7",
        "achieve-yellow":"#FFFCA6",
        "achieve-orange": "#FFA7A7",
        "achieve-purple": "#C894FF",
        "achieve-seagreen": "#B9FFE3",
        "achieve-bluepurple":"#B5E0FF",
        "achieve-grey": "#292C31",
        "achieve-white": "#FEFEFE",
        "achieve-green": "#ADEAA7",
        "achieve-darkgreen": "#B9FCBD",
        "achieve-orange2": "#FFDAA6",
        "achieve-darkorange": "#FEBA5A",
      },
    },
  },
  plugins: [],
};
