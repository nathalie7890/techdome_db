/** @type {import('tailwindcss').Config} */
import { colors } from "tailwindcss/colors";

export const content = [
  "./src/**/*.{html,js}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  colors: {
    lightBlue: "#cfd6e7",
    mediumBlue: "#525d7d",
    darkBlue: "#1D283A",
    cyan: colors.cyan,
  },
  extend: {
    backgroundImage: {
      landing: "url(/public/blue_gradient.jpg)",
      landing2: "url(/public/2682640.jpg)",
      landing3: "url(/public/2664083.jpg)",
      landing4: "url(/public/gradient.jpg)",
    },
  },
};
export const plugins = [require("flowbite/plugin"), require("daisyui")];
