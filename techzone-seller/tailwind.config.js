/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  safelist: [
    // Some dynamic class names
    "bg-[#78716c]",
    "bg-[#3b82f6]",
    "bg-[#ec4899]",
    "bg-[#10b981]",
    "bg-[#f97316]",
    "bg-[#0ea5e9]",
    "bg-[#10b981]",
    "border-[#78716c]",
    "border-[#3b82f6]",
    "border-[#ec4899]",
    "border-[#10b981]",
    "border-[#f97316]",
    "border-[#0ea5e9]",
    "border-[#10b981]",
    "border-blue-500",
    { pattern: /(bg|text|border)-./ },
    { pattern: /^\-?m(\w?)-/ },
  ],
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
