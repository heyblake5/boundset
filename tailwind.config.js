/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1B4332',
      },
      fontFamily: {
        serif: ['var(--serif)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
