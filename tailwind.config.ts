import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        'custom-lg': '36px'
      },
      colors: {
        custom: {
          'extra-light-blue': "#E0F4F6",
          'light-blue': '#C0E5E4',
          'medium-blue': '#45B3AF',
          'dark-blue': "#196966",
        }
      }
    },
  },
  plugins: [],
};
export default config;
