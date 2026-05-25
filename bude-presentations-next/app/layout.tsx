import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/chrome/Footer";
import { GlobalHeader } from "@/components/chrome/GlobalHeader";
import { ThemeProvider } from "@/components/chrome/ThemeProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppt.budeglobal.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bude Global Tech Presentations",
    template: "%s | Bude Global Tech Presentations",
  },
  description:
    "Open-source platform for technical presentations — dynamic content, beautiful slides, built for the enterprise.",
  keywords: [
    "Bude Global",
    "technical presentations",
    "open source",
    "knowledge sharing",
  ],
  authors: [
    { name: "Aravind Govindhasamy", url: "https://github.com/aravind-govindhasamy" },
  ],
  openGraph: {
    type: "website",
    url: "https://ppt.budeglobal.in",
    title: "Bude Global Tech Presentations",
    description: "Dynamic, open-source technical presentations.",
    siteName: "Bude Global Tech Presentations",
  },
  twitter: {
    card: "summary_large_image",
    site: "@budeglobalerp",
    creator: "@budeglobalerp",
  },
  icons: { icon: "/assets/images/budeglobal_logo.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0060a0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <GlobalHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
