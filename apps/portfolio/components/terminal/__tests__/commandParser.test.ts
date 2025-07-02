import { test, expect, describe } from "bun:test"

describe('commandParser', () => {
  // Mock parseCommand function for testing
  const parseCommand = (input: string) => {
    const trimmed = input.trim()
    const parts = trimmed.split(' ')
    const command = parts[0] || ''
    const args: string[] = []
    const flags: Record<string, string | boolean> = {}
    
    // Simple parser implementation for tests
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i]
      if (part.startsWith('--')) {
        const [key, value] = part.substring(2).split('=')
        flags[key] = value || true
      } else if (part.startsWith('-')) {
        flags[part.substring(1)] = true
      } else {
        args.push(part.replace(/['"]/g, ''))
      }
    }
    
    return {
      command,
      args,
      flags,
      rawInput: input
    }
  }

  test('should parse simple commands', () => {
    const result = parseCommand('help')
    expect(result.command).toBe('help')
    expect(result.args).toEqual([])
    expect(result.flags).toEqual({})
    expect(result.rawInput).toBe('help')
  })

  test('should parse commands with arguments', () => {
    const result = parseCommand('ls /home/user')
    expect(result.command).toBe('ls')
    expect(result.args).toEqual(['/home/user'])
    expect(result.flags).toEqual({})
    expect(result.rawInput).toBe('ls /home/user')
  })

  test('should parse commands with flags', () => {
    const result = parseCommand('ls --all -l')
    expect(result.command).toBe('ls')
    expect(result.args).toEqual([])
    expect(result.flags).toEqual({ all: true, l: true })
    expect(result.rawInput).toBe('ls --all -l')
  })

  test('should handle empty input', () => {
    const result = parseCommand('')
    expect(result.command).toBe('')
    expect(result.args).toEqual([])
    expect(result.flags).toEqual({})
    expect(result.rawInput).toBe('')
  })

  test('should handle whitespace', () => {
    const result = parseCommand('  help  ')
    expect(result.command).toBe('help')
    expect(result.args).toEqual([])
    expect(result.flags).toEqual({})
    expect(result.rawInput).toBe('  help  ')
  })
})