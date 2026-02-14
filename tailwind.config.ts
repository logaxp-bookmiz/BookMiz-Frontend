import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f0f9e8",
          200: "#d8f2c4",
          300: "#b8e69c",
          400: "#8dd46a",
          500: "#98e521", // Your brand primary color
          600: "#7bc817",
          700: "#5ea012",
          800: "#4a7f0e",
          900: "#3d660b",
        },
        secondary: {
          100: "#e6e8eb",
          200: "#bcc2c9",
          300: "#929ba7",
          400: "#687485",
          500: "#011c39", // Your brand secondary color
          600: "#01172f",
          700: "#011225",
          800: "#010d1b",
          900: "#000811",
        },
        gray: {
          400: "#767676",
          500: "#000000",
        },
      },

      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },

      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out forwards",
      },

      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "100%",
          md: "90%",
          lg: "80%",
          xl: "70%",
          "2xl": "1200px",
        },
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
      lg: "1024px",
    },
  },
  plugins: [],
};

export default config;