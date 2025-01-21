import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

const config: Config = withTV({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "display-2xl": [
          "4.5rem",
          {
            lineHeight: "5.625rem",
          },
        ],
        "display-xl": [
          "3.75rem",
          {
            lineHeight: "4.5rem",
          },
        ],
        "display-lg": [
          "3rem",
          {
            lineHeight: "3.75rem",
          },
        ],
        "display-md": [
          "2.5rem",
          {
            lineHeight: "2.75rem",
          },
        ],
        "display-sm": [
          "1.875rem",
          {
            lineHeight: "2.375rem",
          },
        ],
        "display-xs": [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
      },
      colors: {
        background: "hsl(var(--color-base-white) / <alpha-value>)",
        base: {
          white: "hsl(var(--color-base-white) / <alpha-value>)",
          black: "hsl(var(--color-base-black) / <alpha-value>)",
        },
        primary: {
          50: "hsl(var(--color-primary-50) / <alpha-value>)",
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
          800: "hsl(var(--color-primary-800) / <alpha-value>)",
          900: "hsl(var(--color-primary-900) / <alpha-value>)",
          950: "hsl(var(--color-primary-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-primary-950) / <alpha-value>)",
        },
        secondary: {
          50: "hsl(var(--color-secondary-50) / <alpha-value>)",
          100: "hsl(var(--color-secondary-100) / <alpha-value>)",
          200: "hsl(var(--color-secondary-200) / <alpha-value>)",
          300: "hsl(var(--color-secondary-300) / <alpha-value>)",
          400: "hsl(var(--color-secondary-400) / <alpha-value>)",
          500: "hsl(var(--color-secondary-500) / <alpha-value>)",
          600: "hsl(var(--color-secondary-600) / <alpha-value>)",
          700: "hsl(var(--color-secondary-700) / <alpha-value>)",
          800: "hsl(var(--color-secondary-800) / <alpha-value>)",
          900: "hsl(var(--color-secondary-900) / <alpha-value>)",
          950: "hsl(var(--color-secondary-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-secondary-300) / <alpha-value>)",
        },
        neutral: {
          50: "hsl(var(--color-neutral-50) / <alpha-value>)",
          100: "hsl(var(--color-neutral-100) / <alpha-value>)",
          200: "hsl(var(--color-neutral-200) / <alpha-value>)",
          300: "hsl(var(--color-neutral-300) / <alpha-value>)",
          400: "hsl(var(--color-neutral-400) / <alpha-value>)",
          500: "hsl(var(--color-neutral-500) / <alpha-value>)",
          600: "hsl(var(--color-neutral-600) / <alpha-value>)",
          700: "hsl(var(--color-neutral-700) / <alpha-value>)",
          800: "hsl(var(--color-neutral-800) / <alpha-value>)",
          900: "hsl(var(--color-neutral-900) / <alpha-value>)",
          950: "hsl(var(--color-neutral-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-neutral-950) / <alpha-value>)",
        },
        success: {
          50: "hsl(var(--color-success-50) / <alpha-value>)",
          100: "hsl(var(--color-success-100) / <alpha-value>)",
          200: "hsl(var(--color-success-200) / <alpha-value>)",
          300: "hsl(var(--color-success-300) / <alpha-value>)",
          400: "hsl(var(--color-success-400) / <alpha-value>)",
          500: "hsl(var(--color-success-500) / <alpha-value>)",
          600: "hsl(var(--color-success-600) / <alpha-value>)",
          700: "hsl(var(--color-success-700) / <alpha-value>)",
          800: "hsl(var(--color-success-800) / <alpha-value>)",
          900: "hsl(var(--color-success-900) / <alpha-value>)",
          950: "hsl(var(--color-success-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-success-950) / <alpha-value>)",
        },
        error: {
          50: "hsl(var(--color-error-50) / <alpha-value>)",
          100: "hsl(var(--color-error-100) / <alpha-value>)",
          200: "hsl(var(--color-error-200) / <alpha-value>)",
          300: "hsl(var(--color-error-300) / <alpha-value>)",
          400: "hsl(var(--color-error-400) / <alpha-value>)",
          500: "hsl(var(--color-error-500) / <alpha-value>)",
          600: "hsl(var(--color-error-600) / <alpha-value>)",
          700: "hsl(var(--color-error-700) / <alpha-value>)",
          800: "hsl(var(--color-error-800) / <alpha-value>)",
          900: "hsl(var(--color-error-900) / <alpha-value>)",
          950: "hsl(var(--color-error-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-error-950) / <alpha-value>)",
        },
        warning: {
          50: "hsl(var(--color-warning-50) / <alpha-value>)",
          100: "hsl(var(--color-warning-100) / <alpha-value>)",
          200: "hsl(var(--color-warning-200) / <alpha-value>)",
          300: "hsl(var(--color-warning-300) / <alpha-value>)",
          400: "hsl(var(--color-warning-400) / <alpha-value>)",
          500: "hsl(var(--color-warning-500) / <alpha-value>)",
          600: "hsl(var(--color-warning-600) / <alpha-value>)",
          700: "hsl(var(--color-warning-700) / <alpha-value>)",
          800: "hsl(var(--color-warning-800) / <alpha-value>)",
          900: "hsl(var(--color-warning-900) / <alpha-value>)",
          950: "hsl(var(--color-warning-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-warning-700) / <alpha-value>)",
        },
        info: {
          50: "hsl(var(--color-info-50) / <alpha-value>)",
          100: "hsl(var(--color-info-100) / <alpha-value>)",
          200: "hsl(var(--color-info-200) / <alpha-value>)",
          300: "hsl(var(--color-info-300) / <alpha-value>)",
          400: "hsl(var(--color-info-400) / <alpha-value>)",
          500: "hsl(var(--color-info-500) / <alpha-value>)",
          600: "hsl(var(--color-info-600) / <alpha-value>)",
          700: "hsl(var(--color-info-700) / <alpha-value>)",
          800: "hsl(var(--color-info-800) / <alpha-value>)",
          900: "hsl(var(--color-info-900) / <alpha-value>)",
          950: "hsl(var(--color-info-950) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-info-950) / <alpha-value>)",
        },
      },
      dropShadow: {
        xs: "0 1 2px hsl(var(--color-neutral-950) / 0.05",
        sm: "0px 1px 3px hsl(var(--color-neutral-950) / 0.1), 0px 1px 2px hsl(var(--color-neutral-950) / 0.06",
        md: "0px 4px 8px -2px hsl(var(--color-neutral-950) / 0.1), 0px 2px 4px -2px hsl(var(--color-neutral-950) / 0.06",
        lg: "0px 12px 16px -4px hsl(var(--color-neutral-950) / 0.08), 0px 4px 6px -2px hsl(var(--color-neutral-950) / 0.03",
        xl: "0px 20px 24px -4px hsl(var(--color-neutral-950) / 0.08), 0px 8px 8px -4px hsl(var(--color-neutral-950) / 0.03",
        "2xl": "0px 24px 48px -12px hsl(var(--color-neutral-950) / 0.18)",
        "3xl": "0px 32px 64px -12px hsl(var(--color-neutral-950) / 0.14)",
      },
    },
  },
  plugins: [],
});

export default config;
