/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,ts,tsx}"],
  theme: {
          screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
          },
          fontFamily: {
            // sans: ['Helvetica Neue', 'sans-serif'],
            // serif: ['Helvetica Neue', 'serif'],
          },
    extend: {
          colors: {
            mygreen: "#4ade80",
            myorgane: "#E64A19",
          },
    },
  },
  plugins: [],
}
