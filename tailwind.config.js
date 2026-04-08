/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow:  '#F5C800',
        orange:  '#E85D04',
        chili:   '#C1121F',
        dark:    '#1C1C1C',
        darker:  '#111111',
        cream:   '#FFF8EE',
        smoke:   '#2A2A2A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
