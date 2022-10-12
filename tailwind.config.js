/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      lightBlue: "#cfd6e7",
      mediumBlue:"#525d7d",
      darkBlue: "#1D283A",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
