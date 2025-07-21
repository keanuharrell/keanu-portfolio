"use client"

import { useState, useEffect } from "react"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { auth, login, logout } from "@/app/(auth)/actions"
import type { User as AuthUser } from "@portfolio/core"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | false | null>(null)
  const [loading, setLoading] = useState(true)

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const authResult = await auth()
      setUser(authResult)
    } catch (error) {
      console.error("Auth check failed:", error)
      setUser(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    await login()
  }

  const handleLogout = async () => {
    await logout()
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => scrollToSection('#hero')}
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Keanu Harrell
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user.properties.email?.split('@')[0] || user.properties.id}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogin}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {!loading && user && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded-full">
                <User className="w-3 h-3" />
                <span className="text-xs font-medium">
                  {user.properties.email?.split('@')[0] || user.properties.id}
                </span>
              </div>
            )}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="px-4 pt-2 border-t">
                {loading ? (
                  <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
                ) : user ? (
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    className="w-full justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}