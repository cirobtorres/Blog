import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aria: {
        current: "current=page",
      },
      colors: {
        "blog-silver": "var(--blog-silver)",
        "blog-toxic-green": "var(--blog-toxic-green)",
        "blog-error": "var(--blog-error)",
        "blog-light-purple": "var(--blog-light-purple)",
        "blog-placeholder": "var(--blog-placeholder)",
        "blog-dark-background": "var(--blog-dark-background)",
        "blog-dark-widgets": "var(--blog-dark-widgets)",
        "blog-publication-hero": "var(--blog-publication-hero)",
      },
    },
  },
  plugins: [],
} satisfies Config;
