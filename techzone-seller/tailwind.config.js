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
    { pattern: /(bg|text|border)-./ },
    { pattern: /^\-?m(\w?)-/ },
  ],
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {},
  },
  plugins: [],
};
