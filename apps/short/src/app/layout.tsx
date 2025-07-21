import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getShortDomain = () => {
  return process.env.NEXT_PUBLIC_SHORT_URL ? new URL(process.env.NEXT_PUBLIC_SHORT_URL).hostname : 'ksh.link';
};

export const metadata: Metadata = {
  title: `${getShortDomain()} - URL Shortener by Keanu Harrell`,
  description: "Create and manage short URLs with analytics. Built by Keanu Harrell.",
  keywords: ["URL Shortener", "Link Management", "Analytics", "Short Links"],
  authors: [{ name: "Keanu Harrell" }],
  creator: "Keanu Harrell",
  openGraph: {
    title: `${getShortDomain()} - URL Shortener`,
    description: "Fast and reliable URL shortening service with analytics",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SHORT_URL || "https://ksh.link",
    siteName: getShortDomain(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to main content link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-all duration-200"
          >
            Skip to main content
          </a>
          
          <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
            <Navigation />
            <main id="main-content" className="flex-1 w-full max-w-full overflow-x-hidden pt-20">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
