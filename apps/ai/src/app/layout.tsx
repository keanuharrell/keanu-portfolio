import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orchestr.ai - AI Agent Orchestration Platform",
  description: "Build and deploy AI agent workflows with a visual drag-and-drop interface. Create powerful automation using multiple AI agents working together.",
  keywords: ["AI Agents", "Automation", "Workflow", "LangChain", "OpenAI", "No-Code"],
  authors: [{ name: "Keanu Harrell" }],
  creator: "Keanu Harrell",
  openGraph: {
    title: "Orchestr.ai - AI Agent Orchestration Platform",
    description: "Visual platform for building AI agent workflows",
    type: "website",
    locale: "en_US",
    url: "https://orchestr.ai",
    siteName: "Orchestr.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orchestr.ai - AI Agent Orchestration Platform",
    description: "Visual platform for building AI agent workflows",
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
        <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
