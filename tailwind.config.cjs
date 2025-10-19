/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores originais (dark mode)
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        // Cores de acento
        accent: {
          purple: "#915EFF",
          violet: "#804dee", 
          green: "#00cea8",
          pink: "#bf61ff",
          orange: "#f12711",
          yellow: "#f5af19"
        },
        // Cores de status
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444", 
          info: "#3b82f6"
        }
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
