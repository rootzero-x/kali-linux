/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kali: {
          50: '#f2f8fc',
          100: '#e1eff8',
          200: '#c6def0',
          300: '#9ec4e6',
          400: '#6fa2d8',
          500: '#4d84c8',
          600: '#3868a8',
          700: '#2e5488',
          800: '#28476f',
          900: '#243b5b',
          950: '#19263c',
        },
        dark: {
            bg: '#0d1117',
            card: '#161b22',
            border: '#30363d',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
