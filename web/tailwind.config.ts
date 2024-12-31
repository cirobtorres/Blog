import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blog-silver": "var(--blog-silver)",
        "blog-placeholder": "var(--blog-placeholder)",
      },
    },
  },
  plugins: [],
} satisfies Config;
