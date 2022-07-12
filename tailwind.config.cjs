/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.svelte", './src/lib/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      width: {
        '1280': '1280px',
        '720' : '720px'
      },
      maxWidth: {
        '1280': '1280px',
        '720' : '720px'
      }
    },
  },
  plugins: [],
}
