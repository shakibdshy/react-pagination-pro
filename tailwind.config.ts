import type { Config } from "tailwindcss";
import themePlugin from "@shakibdshy/tailwind-theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shakibdshy/tailwind-theme/dist/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shakibdshy/react-button-pro/dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {},
  plugins: [themePlugin],
};

export default config;
