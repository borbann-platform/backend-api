/*
========================================
File: frontend/app/layout.tsx
========================================
*/
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Example using Inter font
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider"; // Correct path
import { ThemeController } from "@/components/common/ThemeController"; // Correct path
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Sonner for notifications
import { Toaster as RadixToaster } from "@/components/ui/toaster"; // Shadcn Toaster (if using useToast hook)

// Setup font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Define CSS variable

export const metadata: Metadata = {
  title: "Borbann - Data Platform", // More specific title
  description: "Data integration, analysis, and visualization platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {" "}
      {/* suppressHydrationWarning needed for next-themes */}
      <body className={`${inter.variable} font-sans`}>
        {" "}
        {/* Apply font class */}
        {/* ThemeProvider should wrap everything for theme context */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* ThemeController can wrap specific parts or the whole app */}
          {/* If placed here, it controls the base theme and color scheme */}
          <ThemeController defaultColorScheme="Blue">{children}</ThemeController>
          {/* Include Toaster components for notifications */}
          <SonnerToaster />
          <RadixToaster /> {/* Include if using the useToast hook */}
        </ThemeProvider>
      </body>
    </html>
  );
}
