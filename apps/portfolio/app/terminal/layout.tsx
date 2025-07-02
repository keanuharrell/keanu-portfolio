export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Override parent layout styles for terminal
  return (
    <div className="fixed inset-0 bg-black z-50">
      {children}
    </div>
  )
}