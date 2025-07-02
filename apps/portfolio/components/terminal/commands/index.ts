import { systemCommands } from './system'
import { portfolioCommands } from './portfolio'
import { navigationCommands } from './navigation'
import { socialCommands } from './social'
import { CommandHandler } from '../core/commandParser'

export const allCommands: Record<string, CommandHandler> = {
  ...systemCommands,
  ...portfolioCommands,
  ...navigationCommands,
  ...socialCommands
}

export { systemCommands, portfolioCommands, navigationCommands, socialCommands }

// ASCII Art for welcome screen
export const asciiArt = [
  "██╗  ██╗███████╗ █████╗ ███╗   ██╗██╗   ██╗",
  "██║ ██╔╝██╔════╝██╔══██╗████╗  ██║██║   ██║",
  "█████╔╝ █████╗  ███████║██╔██╗ ██║██║   ██║",
  "██╔═██╗ ██╔══╝  ██╔══██║██║╚██╗██║██║   ██║",
  "██║  ██╗███████╗██║  ██║██║ ╚████║╚██████╔╝",
  "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝",
  "",
  "    DevOps Engineer & iOS Developer",
  ""
]

// Easter egg commands for fun
export const easterEggCommands = [
  "sudo rm -rf /",
  "hack nasa.gov",
  "download more ram",
  "format c:",
  "delete system32",
  "sudo chmod 777 /",
  "telnet towel.blinkenlights.nl",
  "curl parrot.live"
] 