import { allCommands } from '../commands/index'
import { getFileSystemNode, getCurrentDir, resolvePath } from './fileSystem'

export interface TabCompletionResult {
  completed: string
  suggestions: string[]
  showSuggestions: boolean
}

export class TabCompletion {
  private static lastTabTime = 0
  private static lastInput = ''
  private static doubleTabThreshold = 500 // ms

  static complete(input: string, cursorPosition: number = input.length): TabCompletionResult {
    const now = Date.now()
    const isDoubleTab = (now - this.lastTabTime < this.doubleTabThreshold) && input === this.lastInput
    
    this.lastTabTime = now
    this.lastInput = input

    const beforeCursor = input.slice(0, cursorPosition)
    const afterCursor = input.slice(cursorPosition)
    
    // Parse the current input to understand context
    const parts = beforeCursor.trim().split(/\s+/)
    const currentWord = parts[parts.length - 1] || ''
    
    if (parts.length === 1) {
      // Completing command name
      return this.completeCommand(currentWord, afterCursor, isDoubleTab)
    } else {
      // Completing arguments (files/directories)
      const commandPart = parts.slice(0, -1).join(' ') // Everything before the current word
      return this.completeArgument(commandPart, currentWord, afterCursor, isDoubleTab)
    }
  }

  private static completeCommand(partial: string, afterCursor: string, isDoubleTab: boolean): TabCompletionResult {
    const commands = Object.keys(allCommands)
    const matches = commands.filter(cmd => cmd.startsWith(partial))

    if (matches.length === 0) {
      return { completed: partial + afterCursor, suggestions: [], showSuggestions: false }
    }

    if (matches.length === 1) {
      // Single match - complete it
      const completed = matches[0] + ' '
      return { completed: completed + afterCursor, suggestions: [], showSuggestions: false }
    }

    // Multiple matches
    if (isDoubleTab || partial === '') {
      // Show all matches
      return { 
        completed: partial + afterCursor, 
        suggestions: matches, 
        showSuggestions: true 
      }
    } else {
      // Complete to common prefix
      const commonPrefix = this.findCommonPrefix(matches)
      if (commonPrefix.length > partial.length) {
        return { completed: commonPrefix + afterCursor, suggestions: [], showSuggestions: false }
      } else {
        return { 
          completed: partial + afterCursor, 
          suggestions: matches, 
          showSuggestions: true 
        }
      }
    }
  }

  private static completeArgument(commandPart: string, partial: string, afterCursor: string, isDoubleTab: boolean): TabCompletionResult {
    // For file/directory completion
    const currentDir = getCurrentDir()
    
    // Handle paths
    let searchDir = currentDir
    let searchPattern = partial
    
    if (partial.includes('/')) {
      const lastSlash = partial.lastIndexOf('/')
      const dirPath = partial.slice(0, lastSlash + 1)
      searchPattern = partial.slice(lastSlash + 1)
      searchDir = resolvePath(dirPath)
    }

    const dirNode = getFileSystemNode(searchDir)
    if (!dirNode || dirNode.type !== 'directory') {
      return { completed: commandPart + ' ' + partial + afterCursor, suggestions: [], showSuggestions: false }
    }

    const files = Object.keys(dirNode.files || {})
    const matches = files.filter(name => name.startsWith(searchPattern))

    if (matches.length === 0) {
      return { completed: commandPart + ' ' + partial + afterCursor, suggestions: [], showSuggestions: false }
    }

    if (matches.length === 1) {
      // Single match - complete it
      const match = matches[0]
      const node = dirNode.files?.[match]
      const suffix = node?.type === 'directory' ? '/' : ' '
      
      let completedPath = partial
      if (partial.includes('/')) {
        const lastSlash = partial.lastIndexOf('/')
        completedPath = partial.slice(0, lastSlash + 1) + match + suffix
      } else {
        completedPath = match + suffix
      }
      
      // Return the full command with completed argument
      return { completed: commandPart + ' ' + completedPath + afterCursor, suggestions: [], showSuggestions: false }
    }

    // Multiple matches
    if (isDoubleTab || searchPattern === '') {
      // Show all matches with type indicators
      const suggestions = matches.map(name => {
        const node = dirNode.files?.[name]
        return node?.type === 'directory' ? `${name}/` : name || ''
      })
      return { 
        completed: commandPart + ' ' + partial + afterCursor, 
        suggestions, 
        showSuggestions: true 
      }
    } else {
      // Complete to common prefix
      const commonPrefix = this.findCommonPrefix(matches)
      if (commonPrefix.length > searchPattern.length) {
        let completedPath = partial
        if (partial.includes('/')) {
          const lastSlash = partial.lastIndexOf('/')
          completedPath = partial.slice(0, lastSlash + 1) + commonPrefix
        } else {
          completedPath = commonPrefix
        }
        return { completed: commandPart + ' ' + completedPath + afterCursor, suggestions: [], showSuggestions: false }
      } else {
        const suggestions = matches.map(name => {
          const node = dirNode.files?.[name]
          return node?.type === 'directory' ? `${name}/` : name
        })
        return { 
          completed: commandPart + ' ' + partial + afterCursor, 
          suggestions, 
          showSuggestions: true 
        }
      }
    }
  }

  private static findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return ''
    if (strings.length === 1) return strings[0]

    let prefix = strings[0]
    for (let i = 1; i < strings.length; i++) {
      while (strings[i].indexOf(prefix) !== 0) {
        prefix = prefix.slice(0, -1)
        if (prefix === '') return ''
      }
    }
    return prefix
  }

  static formatSuggestions(suggestions: string[]): string[] {
    // Format suggestions for display in terminal
    const maxCols = 4
    const colWidth = Math.max(...suggestions.map(s => s.length)) + 2
    const result: string[] = []
    
    for (let i = 0; i < suggestions.length; i += maxCols) {
      const row = suggestions.slice(i, i + maxCols)
      const formattedRow = row.map(item => item.padEnd(colWidth)).join('')
      result.push(formattedRow.trimEnd())
    }
    
    return result
  }
} 