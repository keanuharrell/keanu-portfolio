import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Shortener - Keanu Portfolio",
  description: "High-performance URL shortener with analytics and QR codes",
  keywords: ["url shortener", "analytics", "qr codes", "keanu harrell"],
  authors: [{ name: "Keanu Harrell" }],
  creator: "Keanu Harrell",
  publisher: "Keanu Harrell",
  openGraph: {
    title: "URL Shortener - Keanu Portfolio",
    description: "High-performance URL shortener with analytics and QR codes",
    url: "https://short.keanu.dev",
    siteName: "Keanu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Shortener - Keanu Portfolio",
    description: "High-performance URL shortener with analytics and QR codes",
    creator: "@keanuharrell",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen bg-background">
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
