/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172328',
        sand: '#f2e9da',
        coral: '#ff4d31',
        lime: '#d4ff66'
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      }
    }
  },
  plugins: []
};
