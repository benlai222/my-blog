import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          pink: '#FF00CC',
          orange: '#FF9900',
        },
        space: {
          dark: '#14001A',
          light: '#2E003E',
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#CCAC00',
        }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
