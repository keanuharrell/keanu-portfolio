import { CommandHandler, ParsedCommand } from '../core/commandParser'
import { getFileSystemNode, listDirectory, getCurrentDir } from '../core/fileSystem'

export const systemCommands: Record<string, CommandHandler> = {
  ls: {
    name: 'ls',
    description: 'List directory contents',
    category: 'system',
    usage: 'ls [OPTION]... [FILE]...',
    examples: ['ls', 'ls -la', 'ls -l projects/', 'ls -a'],
    handler: async (parsed: ParsedCommand) => {
      const path = parsed.args[0] || getCurrentDir()
      // Filter flags to only boolean values
      const booleanFlags = Object.fromEntries(
        Object.entries(parsed.flags).filter(([, value]) => typeof value === 'boolean')
      ) as Record<string, boolean>
      return listDirectory(path, booleanFlags)
    }
  },

  cat: {
    name: 'cat',
    description: 'Display file contents',
    category: 'system', 
    usage: 'cat [FILE]...',
    examples: ['cat about.md', 'cat skills.json', 'cat contact.txt'],
    handler: async (parsed: ParsedCommand) => {
      if (parsed.args.length === 0) {
        return ["cat: no files specified"]
      }

      const results: string[] = []
      for (const filename of parsed.args) {
        const node = getFileSystemNode(filename)
        if (!node) {
          results.push(`cat: ${filename}: No such file or directory`)
        } else if (node.type === 'directory') {
          results.push(`cat: ${filename}: Is a directory`)
        } else {
          results.push(...(node.content || []))
        }
        if (parsed.args.length > 1 && filename !== parsed.args[parsed.args.length - 1]) {
          results.push("") // Blank line between files
        }
      }
      return results
    }
  },

  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    category: 'system',
    usage: 'pwd',
    examples: ['pwd'],
    handler: async () => {
      return [getCurrentDir()]
    }
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal screen',
    category: 'system',
    usage: 'clear',
    examples: ['clear'],
    handler: async () => {
      return ['__CLEAR_TERMINAL__']
    }
  },

  history: {
    name: 'history',
    description: 'Display command history',
    category: 'system',
    usage: 'history [n]',
    examples: ['history', 'history 10'],
    handler: async () => {
      // This would be implemented by the terminal component
      return [
        "Command history:",
        "1  whoami",
        "2  ls -la", 
        "3  cat about.md",
        "4  cd projects",
        "5  ls",
        "6  history"
      ]
    }
  },

  grep: {
    name: 'grep',
    description: 'Search text patterns in files',
    category: 'system',
    usage: 'grep [OPTION]... PATTERN [FILE]...',
    examples: ['grep "DevOps" about.md', 'grep -i "aws" skills.json'],
    handler: async (parsed: ParsedCommand) => {
      if (parsed.args.length === 0) {
        return ["grep: missing pattern"]
      }
      
      const pattern = parsed.args[0]
      const filename = parsed.args[1] || 'about.md'
      const caseInsensitive = parsed.flags.i || parsed.flags.ignorecase
      
      const node = getFileSystemNode(filename)
      if (!node || node.type !== 'file') {
        return [`grep: ${filename}: No such file or directory`]
      }
      
      const regex = new RegExp(pattern, caseInsensitive ? 'i' : '')
      const matches = node.content?.filter((line: string) => regex.test(line)) || []
      
      return matches.length > 0 ? matches : [`grep: no matches found for "${pattern}"`]
    }
  },

  man: {
    name: 'man',
    description: 'Display manual pages',
    category: 'system',
    usage: 'man COMMAND',
    examples: ['man ls', 'man cat', 'man grep'],
    handler: async (parsed: ParsedCommand) => {
      const command = parsed.args[0]
      if (!command) {
        return ["man: no command specified"]
      }
      
      // This would reference allCommands but we'll import it when needed
      return [
        `NAME`,
        `    ${command} - command description`,
        ``,
        `SYNOPSIS`,
        `    ${command} [options]`,
        ``,
        `DESCRIPTION`,
        `    Use 'help ${command}' for detailed information`,
        ``
      ]
    }
  },

  help: {
    name: 'help',
    description: 'Show available commands',
    category: 'system',
    usage: 'help [COMMAND]',
    examples: ['help', 'help ls'],
    handler: async (parsed: ParsedCommand) => {
      const specificCommand = parsed.args[0]
      
      if (specificCommand) {
        return [
          `Help for: ${specificCommand}`,
          `Use 'man ${specificCommand}' for detailed manual page`,
          ``
        ]
      }
      
      return [
        "Available commands:",
        "",
        "📋 NAVIGATION:",
        "├── ls [options] [path]    - List directory contents",
        "├── cd [directory]         - Change directory", 
        "├── pwd                    - Print working directory",
        "└── find [path] [options]  - Search for files",
        "",
        "📄 FILE OPERATIONS:",
        "├── cat [file...]          - Display file contents",
        "├── grep [pattern] [file]  - Search text patterns",
        "└── man [command]          - Show manual pages",
        "",
        "👤 PORTFOLIO:",
        "├── whoami                 - Display user information",
        "└── wget cv.pdf            - Download CV/Resume",
        "",
        "⚙️  SYSTEM:",
        "├── clear                  - Clear terminal screen",
        "├── history [n]            - Show command history",
        "├── help [command]         - Show this help or command help",
        "└── exit                   - Exit terminal",
        "",
        "💡 Tips:",
        "• Use Tab for auto-completion",
        "• Use ↑↓ arrows for command history", 
        "• Most commands support --help flag",
        "• Try 'man <command>' for detailed help"
      ]
    }
  }
} 