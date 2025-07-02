// Main terminal export
export { PortfolioTerminal } from './components/PortfolioTerminal'

// Components
export { TerminalInput } from './components/TerminalInput'
export { TerminalOutput } from './components/TerminalOutput'
export { QuickCommands } from './components/QuickCommands'

// Commands
export { allCommands, asciiArt, easterEggCommands } from './commands/index'

// Core functionality
export { CommandParser, executeCommand } from './core/commandParser'
export { TabCompletion } from './core/tabCompletion'
export { getCurrentDir, setCurrentDir, getFileSystemNode } from './core/fileSystem'

// Hooks
export { useTerminal } from './hooks/useTerminal'

// Types
export type { TerminalLine, FileSystemNode, FileSystem } from './types'
export type { CommandHandler, ParsedCommand } from './core/commandParser'
