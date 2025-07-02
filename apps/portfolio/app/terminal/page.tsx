import { Metadata } from "next"
import { PortfolioTerminal } from "@/components/terminal"

export const metadata: Metadata = {
  title: "Portfolio Terminal | Keanu Harrell",
  description: "Explore my portfolio through an interactive terminal interface. A unique way to discover my projects, skills, and experience.",
  keywords: ["Terminal", "Portfolio", "Interactive", "Command Line", "Developer", "iOS"]
}

export default function TerminalPage() {
  return <PortfolioTerminal />
}