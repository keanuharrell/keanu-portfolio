// Main terminal export
export { PortfolioTerminal } from './components/PortfolioTerminal'

// Components
export { TerminalInput } from './components/TerminalInput'
export { TerminalOutput } from './components/TerminalOutput'
export { QuickCommands } from './components/QuickCommands'
export { TerminalErrorBoundary } from './components/TerminalErrorBoundary'

// Commands
export { allCommands, asciiArt, easterEggCommands } from './commands/index'

// Core functionality
export { CommandParser, executeCommand } from './core/commandParser'
export { TabCompletion } from './core/tabCompletion'
export { getCurrentDir, setCurrentDir, getFileSystemNode } from './core/fileSystem'
export { CommandRegistry, globalCommandRegistry, BasicCommandValidator } from './core/commandRegistry'
export { TerminalStorage, terminalStorage } from './core/terminalStorage'

// Hooks
export { useTerminal } from './hooks/useTerminal'

// Types
export type { TerminalLine, FileSystemNode, FileSystem, Command, CommandHandler, ParsedCommand } from './types'
export type { CommandPlugin, ValidationResult, CommandValidator } from './core/commandRegistry'
export type { TerminalPreferences, TerminalSession } from './core/terminalStorage'
