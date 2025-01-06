import type { Config } from "tailwindcss";
import * as tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "bouncing-arrow-up": {
          "0%, 100%": {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -65%)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -35%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
        }, // BackToTopButton
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bouncing-arrow-up": "bouncing-arrow-up 1s infinite", // BackToTopButton
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
