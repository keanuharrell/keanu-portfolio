export interface Command {
  command: string
  description: string
  output: string[]
  category: 'system' | 'portfolio' | 'social' | 'navigation'
}

export interface ParsedCommand {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
  rawInput: string
}

export interface CommandHandler {
  name: string
  description: string
  category: 'system' | 'portfolio' | 'social' | 'navigation'
  handler: (parsed: ParsedCommand) => Promise<string[]>
  usage?: string
  examples?: string[]
}

export interface TerminalLine {
  id: number
  type: 'command' | 'output' | 'ascii' | 'prompt'
  content: string
  timestamp: Date
}

export const categoryColors = {
  system: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  portfolio: 'bg-green-500/10 text-green-400 border-green-500/20',
  social: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  navigation: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
}

export type FileSystemNode = {
  type: 'file' | 'directory'
  content?: string[]
  files?: Record<string, FileSystemNode>
}

export type FileSystem = {
  [key: string]: FileSystemNode
}