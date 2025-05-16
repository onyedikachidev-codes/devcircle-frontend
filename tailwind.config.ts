import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "xs-sm": "13px",
        md: "15px",
        "lg-xl": "17px",
      },
      fontFamily: {
        landing: ["CH_Custom_W_Bk", "sans-serif"],
        "app-normal": ["CH_Custom_W_Bk", "sans-serif"],
        "app-semibold": ["CH_Custom_W_XBd", "sans-serif"],
        "app-bold": ["CH_Custom_W_Blk", "sans-serif"],
        "app-light": ["CH_Custom_W_Lt", "sans-serif"],
        "app-medium": ["CH_Custom_W_Md", "sans-serif"],
      },
      colors: {
        "custom-gray-heading": "#222222",
        "custom-gray-paragraph": "#6A6A6A",
        "custom-gray-small-text": "#6B7280",
      },
      screens: {
        xxs: "250px",
        xs: "400px",
        s: "600px",
        xxl: "1500px",
      },
    },
  },
  plugins: [],
};

export default config;
