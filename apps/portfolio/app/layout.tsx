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
  title: "Keanu Harrell - DevOps Engineer & iOS Developer",
  description: "Portfolio of Keanu Harrell, DevOps Engineer and iOS Developer specializing in multi-cloud infrastructure, Kubernetes, and Swift development.",
  keywords: ["DevOps", "iOS", "AWS", "GCP", "Kubernetes", "Terraform", "Swift", "SwiftUI"],
  authors: [{ name: "Keanu Harrell" }],
  openGraph: {
    title: "Keanu Harrell - DevOps Engineer & iOS Developer",
    description: "Portfolio showcasing infrastructure automation, cloud architecture, and iOS development projects.",
    type: "website",
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
          <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
            <Navigation />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
