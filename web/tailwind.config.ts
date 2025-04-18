import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

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
        // BLOG==========-----------------------------------
        "blog-background-1": "var(--blog-background-1)",
        "blog-background-2": "var(--blog-background-2)",
        "blog-background-3": "var(--blog-background-3)",
        "blog-border": "var(--blog-border)",
        "blog-ring": "var(--blog-ring)",
        "blog-background-backdrop": "var(--blog-background-backdrop)",
        "blog-background-backdrop-hover":
          "var(--blog-background-backdrop-hover)",
        "blog-foreground-readable": "var(--blog-foreground-readable)",
        "blog-foreground-readable-hover":
          "var(--blog-foreground-readable-hover)",
        "blog-foreground-highlight": "var(--blog-foreground-highlight)",

        // SHADCN/UI==========--------------------------------------------------
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
      backgroundImage: {
        "blog-moving-gradient":
          "conic-gradient(from var(--angle), transparent, var(--blog-foreground-highlight))",
        "blog-fade-dot-up":
          "linear-gradient(0deg, transparent, var(--blog-background-1) 100%)",
        "blog-fade-dot-down":
          "linear-gradient(0deg, var(--blog-background-1), transparent 100%)",
      },
      boxShadow: {
        "blog-highlight":
          "rgba(0, 0, 0, 0.05) 0px 0px 0px 2px, var(--blog-foreground-highlight) 0px 0px 0px 2px;",
      },
      gridTemplateColumns: {
        // SHADCN/UI==========--------------------------------------------------
        article: "minmax(0,300px) minmax(500px,1fr) minmax(0,300px)",
        "article-1024": "300px minmax(0px,1fr)",
        "article-800": "minmax(0px,1fr)",
      },
      borderRadius: {
        // SHADCN/UI==========--------------------------------------------------
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // BLOG-BackToTopButton==========-----------------------------------
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
        },
        "clip-pop-up-and-bounce": {
          "0": { top: "8px" },
          "30%": { top: "-4px" },
          "40%": { top: "0px" },
        },
        "profile-border-spin": {
          from: {
            "--angle": "0deg",
          },
          to: {
            "--angle": "360deg",
          },
        },
        "blog-pulse": {
          "0%": {
            transform: "scale(0.8)",
            "box-shadow": "0 0 0 0 rgba(242, 166, 90, 1)",
          },
          "70%": {
            transform: "scale(1)",
            "box-shadow": "0 0 0 60px rgba(229, 62, 62, 0)",
          },
          "100%": {
            transform: "scale(0.8)",
          },
        },
        prixClipFix: {
          "0%": {
            "clip-path": "polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)",
          },
          "25%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)",
          },
          "50%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)",
          },
          "75%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)",
          },
          "100%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
          },
        },
        // SHADCN/UI==========--------------------------------------------------
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
      },
      animation: {
        // BLOG-BackToTopButton==========--------------------------------------------------
        "bouncing-arrow-up": "bouncing-arrow-up 1s infinite",
        "clip-pop-up-and-bounce": "clip-pop-up-and-bounce 0.2s ease-out",
        "border-spin": "profile-border-spin 3s linear infinite",
        "blog-pulse": "blog-pulse 2s infinite",
        prixClipFix: "prixClipFix 2s linear infinite",

        // SHADCN/UI==========--------------------------------------------------
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
