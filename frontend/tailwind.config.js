/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blanc-1": "#F6F6F6",
        "rouge-52":
          "linear-gradient(45deg, #0e0d0d 6%, #ec0b0b 30%, #bf0909 46%)",
      },
    },
  },
  plugins: [],
};
