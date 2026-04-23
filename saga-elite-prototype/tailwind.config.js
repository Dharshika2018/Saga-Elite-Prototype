module.exports = {
  content: [
    "./pages/**/*.{html,js}",
    "./assets/**/*.{html,js,css}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1D4ED8',
        'secondary': '#9333EA',
        'accent': '#FBBF24',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}