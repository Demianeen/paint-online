// components heights
const toolbarHeight = "4rem";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f6f6f6",
      },
      height: {
        toolbar: toolbarHeight,
      },
      inset: {
        toolbar: toolbarHeight,
      },
    },
  },
  plugins: [],
};
