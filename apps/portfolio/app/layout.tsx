import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
  title: "Keanu Harrell - DevOps Engineer & Cloud Architect",
  description: "Portfolio of Keanu Harrell - DevOps Engineer specializing in cloud infrastructure, SRE, automation, and scalable systems. Explore interactive monitoring dashboards and live infrastructure.",
  keywords: ["DevOps", "Cloud Architecture", "SRE", "AWS", "Kubernetes", "Infrastructure", "Terraform", "Docker", "Monitoring", "Analytics"],
  authors: [{ name: "Keanu Harrell" }],
  creator: "Keanu Harrell",
  openGraph: {
    title: "Keanu Harrell - DevOps Engineer & Cloud Architect",
    description: "Explore my live infrastructure, monitoring dashboards, and DevOps expertise through an interactive portfolio experience.",
    type: "website",
    locale: "en_US",
    url: "https://keanuharrell.dev",
    siteName: "Keanu Harrell Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keanu Harrell - DevOps Engineer & Cloud Architect",
    description: "Interactive DevOps portfolio with live infrastructure monitoring",
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
            {/* <Navigation /> */}
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
