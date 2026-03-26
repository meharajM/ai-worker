/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        gray: {
          50:  'oklch(98% 0.01 250)',
          100: 'oklch(95% 0.01 250)',
          200: 'oklch(90% 0.01 250)',
          300: 'oklch(80% 0.01 250)',
          400: 'oklch(70% 0.01 250)',
          500: 'oklch(60% 0.01 250)',
          600: 'oklch(50% 0.01 250)',
          700: 'oklch(40% 0.01 250)',
          800: 'oklch(30% 0.01 250)',
          900: 'oklch(20% 0.01 250)',
          950: 'oklch(15% 0.01 250)'
        },
        brand: {
          dark: 'oklch(15% 0.01 250)',
          primary: 'oklch(60% 0.15 250)',
          teal: 'oklch(60% 0.12 170)',
          tealHover: 'oklch(55% 0.12 170)',
        },
        mac: {
          red: 'oklch(60% 0.15 20)',
          yellow: 'oklch(75% 0.15 80)',
          green: 'oklch(65% 0.12 140)',
        },
        surface: {
          base: 'oklch(15% 0.01 250)',
          card: 'oklch(18% 0.01 250)',
          elevated: 'oklch(22% 0.01 250)',
          hover: 'oklch(26% 0.01 250)',
          active: 'oklch(30% 0.01 250)',
          sidebar: 'oklch(16% 0.01 250)',
          border: 'oklch(25% 0.01 250)'
        },
        logo: {
          drive: { bg: 'oklch(30% 0.05 150)', text: 'oklch(80% 0.1 150)' },
          calendar: { bg: 'oklch(30% 0.05 50)', text: 'oklch(80% 0.1 80)' },
        }
      }
    }
  },
  plugins: [],
}
