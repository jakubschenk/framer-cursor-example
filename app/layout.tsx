import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { CursorProvider } from "@/components/context/cursor-provider";
import { ThemeProvider } from "@/components/context/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Framer Motion Animated Cursor Demo",
  description:
    "Framer Motion animated cursor demo brought to you by Webscope.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CursorProvider accentColor="#23F12A">{children}</CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
