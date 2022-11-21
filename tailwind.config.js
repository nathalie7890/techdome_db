/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url(/public/2682640.jpg)",
        homepage: "url(/public/papercutbackground.png)",
        profile: "url(/public/editprofile.png)",
        notFound: "url(/public/4043.gif)",
        resetPass: "url(/public/resetpass.png)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
