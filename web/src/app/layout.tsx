import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "../providers/themeProvider";
import "../styles/globals.css";
import "../styles/shadcnui.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning is a prerequisite from shadcn/ui
  return (
    <html lang="pt" className="h-full" suppressHydrationWarning>
      <body
        className={`${openSans.variable} dark:bg-blog-dark-background h-full min-h-svh scrollbar antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
