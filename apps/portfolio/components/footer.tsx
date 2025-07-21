"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} Keanu Harrell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}