import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "../providers/themeProvider";
import { getGlobal } from "../lib/global";
import "../styles/globals.css";
import "../styles/shadcnui.css";

const { data: global } = await getGlobal();

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: global.siteName,
  description: global.siteDescription,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning is a prerequisite from shadcn/ui
  return (
    <html lang="pt" className="h-full" suppressHydrationWarning>
      <body
        id="body"
        className={`${openSans.variable} h-full min-h-svh scrollbar antialiased text-blog-foreground-readable bg-blog-background-1`}
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
