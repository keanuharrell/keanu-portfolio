export interface ParsedCommand {
  command: string
  args: string[]
  flags: Record<string, boolean | string>
  raw: string
}

export interface CommandHandler {
  name: string
  description: string
  category: 'system' | 'portfolio' | 'social' | 'navigation'
  handler: (parsed: ParsedCommand) => Promise<string[]>
  usage?: string
  examples?: string[]
}

export class CommandParser {
  static parse(input: string): ParsedCommand {
    const parts = input.trim().split(/\s+/)
    const command = parts[0] || ''
    const rest = parts.slice(1)
    
    const flags: Record<string, boolean | string> = {}
    const args: string[] = []
    
    for (let i = 0; i < rest.length; i++) {
      const part = rest[i]
      
      if (part.startsWith('--')) {
        // Long flag: --flag or --flag=value
        const [flagName, flagValue] = part.slice(2).split('=')
        flags[flagName] = flagValue || true
      } else if (part.startsWith('-') && part.length > 1) {
        // Short flags: -la or -l -a
        const flagChars = part.slice(1)
        for (const char of flagChars) {
          flags[char] = true
        }
      } else {
        // Regular argument
        args.push(part)
      }
    }
    
    return { command, args, flags, raw: input }
  }
}

export const executeCommand = async (input: string, commandHandlers: Record<string, CommandHandler>): Promise<string[]> => {
  const parsed = CommandParser.parse(input)
  
  if (!parsed.command) {
    return []
  }
  
  const handler = commandHandlers[parsed.command]
  if (!handler) {
    return [`bash: ${parsed.command}: command not found`, "Type 'help' to see available commands"]
  }
  
  try {
    return await handler.handler(parsed)
  } catch (error) {
    return [`Error executing ${parsed.command}: ${error instanceof Error ? error.message : 'Unknown error'}`]
  }
} 