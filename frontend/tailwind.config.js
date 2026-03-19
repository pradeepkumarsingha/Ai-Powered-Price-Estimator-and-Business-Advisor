/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(14, 165, 233, 0.18)"
      },
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1"
        }
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(14,165,233,0.22), transparent 30%), radial-gradient(circle at top right, rgba(249,115,22,0.18), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)"
      }
    }
  },
  plugins: []
};
