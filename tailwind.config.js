/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    
      colors:{
        "darkmode":"#213555",
        "darkblue":"#11009E",
        "midblue":"#4942E4",
        "lightblue":"#E4E4F7",
        "gray":"#eee",
        "lightgray":"#F7F7F7",
      }
    },
  },
  plugins: [],
}

