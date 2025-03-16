import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-background": "#161616",
        "dark-background": "#111111",
        surface: "#1C1C1C",
        primary: "#E31C25",
        "primary-dark": "#BB000E",
        gray: "#545454",
        white: "#FFFFFF",
      },
      fontSize: {
        h1: ["2.5em", "auto"],
        h2: ["2em", "auto"],
        h3: ["1.5em", "auto"],
        subtitle: ["1em", "auto"],
        body: ["1em", "auto"],
        "body-2": ["0.875em", "auto"],
        overline: ["0.875em", "auto"],
      },
    },
  },
} satisfies Config;
