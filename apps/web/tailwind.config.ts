import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          500: "var(--brand-500)",
        },
        accent: {
          500: "var(--accent-500)",
        },
        success: {
          500: "var(--success-500)",
        },
        warning: {
          500: "var(--warning-500)",
        },
        danger: {
          500: "var(--danger-500)",
        },
        surface: "var(--surface)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        md: "var(--radius-md)",
      },
      boxShadow: {
        soft: "var(--shadow-md)",
      },
    },
  },
  plugins: [animate],
};

export default config;
