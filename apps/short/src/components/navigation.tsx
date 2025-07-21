"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all ${
        isScrolled
          ? "bg-background/80 backdrop-blur-custom border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
        >
          {process.env.NEXT_PUBLIC_SHORT_URL ? new URL(process.env.NEXT_PUBLIC_SHORT_URL).hostname : 'ksh.link'}
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Create Link
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://www.keanuharrell.com"} className="hover:text-primary transition-colors">
            Portfolio
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-custom border-b p-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Link
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://www.keanuharrell.com"}
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}