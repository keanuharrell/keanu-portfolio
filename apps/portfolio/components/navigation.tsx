"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortfolioTerminal } from "@/components/terminal"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
    { href: "#cv", label: "CV" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-green-400 transition-colors">
            Keanu Harrell
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
              onClick={() => setShowTerminal(true)}
            >
              <Terminal className="w-4 h-4 mr-2" />
              Developer Mode
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black w-full"
                  onClick={() => setShowTerminal(true)}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Developer Mode
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-[9999] bg-black">
          {/* Mac-style window controls */}
          <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTerminal(false)}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                title="Close terminal"
              />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="text-gray-300 text-sm font-mono">
              Terminal — Developer Mode
            </div>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
          <PortfolioTerminal onExit={() => setShowTerminal(false)} />
        </div>
      )}
    </nav>
  )
}