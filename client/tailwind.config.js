/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Tailwind blue-500
        accent: "#10b981", // emerald-500
        danger: "#ef4444", // red-500
        neutral: "#334155", // slate-700
      },
    },
  },
  plugins: [],
};
