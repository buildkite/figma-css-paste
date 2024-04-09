/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "figma-blue": "#0d99ff",
        "figma-gray-light": "#555555",
        "figma-gray": "#444444",
      },
    },
  },
  plugins: [],
  darkMode: ["class", ".figma-dark"],
};
