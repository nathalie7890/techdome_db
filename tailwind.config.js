/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      lightBlue: "#cfd6e7",
      mediumBlue: "#525d7d",
      darkBlue: "#1D283A",
    },
    extend: {
      backgroundImage: {
        'landing': "url(/public/blue_gradient.jpg)",
        'landing2': "url(/public/2682640.jpg)",
        "landing3": "url(/public/2664083.jpg)",
        "landing4": "url(/public/gradient.jpg)"
      }
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
