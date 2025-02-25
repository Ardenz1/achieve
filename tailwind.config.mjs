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
        "achieve-pink": "#C06BA4",
        "achieve-yellow":"#FBE285",
        "achieve-orange": "#EB6D51",
        "achieve-purple": "#9B51EB",
        "achieve-seagreen": "#6BC0BA",
        "achieve-bluepurple":"#858BFB",
        "achieve-grey": "#292C31",
        "achieve-white": "#FEFEFE",
        "achieve-green": "#ADEAA7",
        "achieve-darkgreen": "#80C978",
      },
    },
  },
  plugins: [],
};
