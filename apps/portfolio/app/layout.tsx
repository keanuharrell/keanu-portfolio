import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keanu Harrell - Full Stack Engineer | Cloud & Platform Engineer",
  description: "Portfolio of Keanu Harrell - Full Stack Engineer with 3+ years designing cloud-native microservices and scalable data platforms. Expert in React/TypeScript, Golang/C#, AWS, and CI/CD.",
  keywords: ["Full Stack", "Cloud Engineering", "React", "TypeScript", "Golang", "AWS", "Microservices", "Data Platforms", "CI/CD", "DevOps"],
  authors: [{ name: "Keanu Harrell" }],
  creator: "Keanu Harrell",
  openGraph: {
    title: "Keanu Harrell - Full Stack Engineer | Cloud & Platform Engineer",
    description: "Explore my portfolio showcasing cloud-native applications, microservices architecture, and full-stack development expertise.",
    type: "website",
    locale: "en_US",
    url: "https://www.keanuharrell.com",
    siteName: "Keanu Harrell Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keanu Harrell - Full Stack Engineer | Cloud & Platform Engineer",
    description: "Interactive portfolio with terminal interface showcasing technical projects and expertise",
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
            <main id="main-content" className="flex-1 w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
