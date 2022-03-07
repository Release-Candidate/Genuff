/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.ts", "./assets/*.html"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      height: {
        "fit-content": "fit-content",
      },
      spacing: {
        128: "32rem",
        136: "34rem",
        144: "36rem",
        152: "38rem",
        160: "40rem",
        168: "42rem",
      },
    },
  },
  extend: {},

  darkMode: "media",

  plugins: [require("@tailwindcss/forms")],
};

// My colors:
// Dark brown: BFAB91
// Light brown: F2D8B8
// Lighter brown: F6DCBC
// Dark red: 8B2A02
// Light Background: #F2D8B8 ?
