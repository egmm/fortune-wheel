import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--color-background)",
        "spinred": "var(--color-spinred)",
      },
    },
  },
} satisfies Config;
