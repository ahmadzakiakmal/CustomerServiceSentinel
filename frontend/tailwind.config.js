/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-brown": "#39311D",
        "light-brown": "#7E7474",
        yellow: "#FFDD93",
        "light-yellow": "#FFF3D9",
        "green-edit": "#73B125",
        "red-delete": "#B12525",
        "light-gray": "#EBEBEB",
        "bright-yellow": "FEF2D8",
      },
      fontFamily: {
        rubik: "Rubik",
      },
    },
  },
  plugins: [],
};
