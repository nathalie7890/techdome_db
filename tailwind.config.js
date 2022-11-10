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
        landing: "url(/public/2682640.jpg)",
        homepage: "url(/public/papercutbackground.png)",
        profile: "url(/public/profile3.png)",
        notFound: "url(/public/4043.gif)"
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
