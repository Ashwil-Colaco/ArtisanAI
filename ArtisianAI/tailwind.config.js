// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // Make sure to include this file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JSX, TSX files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
