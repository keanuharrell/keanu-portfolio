import { test, expect, describe, beforeEach } from "bun:test"
import { CommandRegistry, CommandPlugin, BasicCommandValidator } from '../core/commandRegistry'
import { CommandHandler, ParsedCommand } from '../types'

describe('CommandRegistry', () => {
  let registry: CommandRegistry

  beforeEach(() => {
    registry = new CommandRegistry()
  })

  test('should register and retrieve commands', () => {
    const testCommand: CommandHandler = {
      name: 'test',
      description: 'Test command',
      category: 'system',
      handler: async () => ['test output']
    }

    registry.registerCommand(testCommand)
    const retrieved = registry.getCommand('test')
    
    expect(retrieved).toBeDefined()
    expect(retrieved?.name).toBe('test')
    expect(retrieved?.description).toBe('Test command')
  })

  test('should register multiple commands', () => {
    const commands = {
      cmd1: {
        name: 'cmd1',
        description: 'Command 1',
        category: 'system' as const,
        handler: async () => ['output 1']
      },
      cmd2: {
        name: 'cmd2',
        description: 'Command 2',
        category: 'portfolio' as const,
        handler: async () => ['output 2']
      }
    }

    registry.registerCommands(commands)
    
    expect(registry.getCommand('cmd1')).toBeDefined()
    expect(registry.getCommand('cmd2')).toBeDefined()
    expect(registry.getAllCommands()).toHaveLength(2)
  })

  test('should get commands by category', () => {
    const systemCmd: CommandHandler = {
      name: 'sys',
      description: 'System command',
      category: 'system',
      handler: async () => ['sys output']
    }

    const portfolioCmd: CommandHandler = {
      name: 'port',
      description: 'Portfolio command',
      category: 'portfolio',
      handler: async () => ['port output']
    }

    registry.registerCommand(systemCmd)
    registry.registerCommand(portfolioCmd)

    const systemCommands = registry.getCommandsByCategory('system')
    const portfolioCommands = registry.getCommandsByCategory('portfolio')

    expect(systemCommands).toHaveLength(1)
    expect(portfolioCommands).toHaveLength(1)
    expect(systemCommands[0].name).toBe('sys')
    expect(portfolioCommands[0].name).toBe('port')
  })

  test('should register and unregister plugins', async () => {
    const plugin: CommandPlugin = {
      name: 'test-plugin',
      description: 'Test plugin',
      commands: {
        pluginCmd: {
          name: 'pluginCmd',
          description: 'Plugin command',
          category: 'system',
          handler: async () => ['plugin output']
        }
      }
    }

    await registry.registerPlugin(plugin)
    
    expect(registry.getCommand('pluginCmd')).toBeDefined()
    expect(registry.getPlugins()).toHaveLength(1)

    await registry.unregisterPlugin('test-plugin')
    
    expect(registry.getCommand('pluginCmd')).toBeUndefined()
    expect(registry.getPlugins()).toHaveLength(0)
  })

  test('should call plugin initialize and cleanup', async () => {
    let initialized = false
    let cleaned = false

    const plugin: CommandPlugin = {
      name: 'lifecycle-plugin',
      description: 'Lifecycle test plugin',
      commands: {},
      initialize: async () => { initialized = true },
      cleanup: async () => { cleaned = true }
    }

    await registry.registerPlugin(plugin)
    expect(initialized).toBe(true)

    await registry.unregisterPlugin('lifecycle-plugin')
    expect(cleaned).toBe(true)
  })

  test('should execute commands with validation', async () => {
    const testCommand: CommandHandler = {
      name: 'echo',
      description: 'Echo command',
      category: 'system',
      handler: async (parsed) => [`Echo: ${parsed.args.join(' ')}`]
    }

    registry.registerCommand(testCommand)

    const parsed: ParsedCommand = {
      command: 'echo',
      args: ['hello', 'world'],
      flags: {},
      rawInput: 'echo hello world'
    }

    const result = await registry.executeCommand(parsed)
    expect(result).toEqual(['Echo: hello world'])
  })

  test('should handle command execution errors', async () => {
    const errorCommand: CommandHandler = {
      name: 'error',
      description: 'Error command',
      category: 'system',
      handler: async () => {
        throw new Error('Test error')
      }
    }

    registry.registerCommand(errorCommand)

    const parsed: ParsedCommand = {
      command: 'error',
      args: [],
      flags: {},
      rawInput: 'error'
    }

    const result = await registry.executeCommand(parsed)
    expect(result[0]).toBe('❌ Command execution failed:')
    expect(result[1]).toContain('Test error')
  })

  test('should handle unknown commands', async () => {
    const parsed: ParsedCommand = {
      command: 'unknown',
      args: [],
      flags: {},
      rawInput: 'unknown'
    }

    const result = await registry.executeCommand(parsed)
    expect(result).toEqual(['❌ Command not found: unknown'])
  })
})

describe('BasicCommandValidator', () => {
  let validator: BasicCommandValidator

  beforeEach(() => {
    validator = new BasicCommandValidator()
  })

  test('should validate normal commands', () => {
    const parsed: ParsedCommand = {
      command: 'help',
      args: [],
      flags: {},
      rawInput: 'help'
    }

    const result = validator.validate(parsed)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test('should reject empty commands', () => {
    const parsed: ParsedCommand = {
      command: '',
      args: [],
      flags: {},
      rawInput: ''
    }

    const result = validator.validate(parsed)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Command cannot be empty')
  })

  test('should reject overly long commands', () => {
    const longCommand = 'a'.repeat(101)
    const parsed: ParsedCommand = {
      command: longCommand,
      args: [],
      flags: {},
      rawInput: longCommand
    }

    const result = validator.validate(parsed)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Command is too long (max 100 characters)')
  })

  test('should reject dangerous characters', () => {
    const dangerousCommands = ['rm -rf; ls', 'echo `whoami`', 'ls | grep test', 'cat $(ls)']

    dangerousCommands.forEach(cmd => {
      const parsed: ParsedCommand = {
        command: cmd,
        args: [],
        flags: {},
        rawInput: cmd
      }

      const result = validator.validate(parsed)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Command contains potentially dangerous characters')
    })
  })
})