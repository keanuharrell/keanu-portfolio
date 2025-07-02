import { CommandHandler, ParsedCommand } from '../types'

export interface CommandPlugin {
  name: string
  description: string
  commands: Record<string, CommandHandler>
  initialize?: () => Promise<void>
  cleanup?: () => Promise<void>
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

export interface CommandValidator {
  validate(input: ParsedCommand): ValidationResult
}

export class CommandRegistry {
  private commands: Map<string, CommandHandler> = new Map()
  private plugins: Map<string, CommandPlugin> = new Map()
  private validators: CommandValidator[] = []

  // Register a single command
  registerCommand(command: CommandHandler): void {
    this.commands.set(command.name, command)
  }

  // Register multiple commands from an object
  registerCommands(commands: Record<string, CommandHandler>): void {
    Object.values(commands).forEach(command => {
      this.registerCommand(command)
    })
  }

  // Register a plugin with its commands
  async registerPlugin(plugin: CommandPlugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' is already registered`)
    }

    // Initialize plugin if needed
    if (plugin.initialize) {
      await plugin.initialize()
    }

    // Register plugin commands
    this.registerCommands(plugin.commands)
    this.plugins.set(plugin.name, plugin)
  }

  // Unregister a plugin and its commands
  async unregisterPlugin(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName)
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' is not registered`)
    }

    // Remove plugin commands
    Object.keys(plugin.commands).forEach(commandName => {
      this.commands.delete(commandName)
    })

    // Cleanup plugin if needed
    if (plugin.cleanup) {
      await plugin.cleanup()
    }

    this.plugins.delete(pluginName)
  }

  // Get a command by name
  getCommand(name: string): CommandHandler | undefined {
    return this.commands.get(name)
  }

  // Get all commands
  getAllCommands(): CommandHandler[] {
    return Array.from(this.commands.values())
  }

  // Get commands by category
  getCommandsByCategory(category: string): CommandHandler[] {
    return this.getAllCommands().filter(cmd => cmd.category === category)
  }

  // Get all registered plugins
  getPlugins(): CommandPlugin[] {
    return Array.from(this.plugins.values())
  }

  // Add a validator
  addValidator(validator: CommandValidator): void {
    this.validators.push(validator)
  }

  // Remove a validator
  removeValidator(validator: CommandValidator): void {
    const index = this.validators.indexOf(validator)
    if (index > -1) {
      this.validators.splice(index, 1)
    }
  }

  // Validate a command
  validateCommand(parsed: ParsedCommand): ValidationResult {
    const results: ValidationResult[] = this.validators.map(validator => 
      validator.validate(parsed)
    )

    // Combine all validation results
    const allErrors = results.flatMap(result => result.errors)
    const allWarnings = results.flatMap(result => result.warnings || [])

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings.length > 0 ? allWarnings : undefined
    }
  }

  // Execute a command with validation
  async executeCommand(parsed: ParsedCommand): Promise<string[]> {
    // Validate command first
    const validation = this.validateCommand(parsed)
    if (!validation.isValid) {
      return [
        `❌ Command validation failed:`,
        ...validation.errors.map(error => `  • ${error}`)
      ]
    }

    // Show warnings if any
    const warnings = validation.warnings || []
    const warningLines = warnings.length > 0 
      ? [`⚠️  Command warnings:`, ...warnings.map(warning => `  • ${warning}`), '']
      : []

    // Get and execute command
    const command = this.getCommand(parsed.command)
    if (!command) {
      return [`❌ Command not found: ${parsed.command}`]
    }

    try {
      const result = await command.handler(parsed)
      return [...warningLines, ...result]
    } catch (error) {
      return [
        `❌ Command execution failed:`,
        `  ${error instanceof Error ? error.message : 'Unknown error'}`
      ]
    }
  }

  // Clear all commands and plugins
  async clearAll(): Promise<void> {
    // Cleanup all plugins
    for (const plugin of this.plugins.values()) {
      if (plugin.cleanup) {
        await plugin.cleanup()
      }
    }

    this.commands.clear()
    this.plugins.clear()
    this.validators.length = 0
  }
}

// Global registry instance
export const globalCommandRegistry = new CommandRegistry()

// Built-in validators
export class BasicCommandValidator implements CommandValidator {
  validate(input: ParsedCommand): ValidationResult {
    const errors: string[] = []
    
    // Check for empty command
    if (!input.command || input.command.trim().length === 0) {
      errors.push('Command cannot be empty')
    }

    // Check for command length
    if (input.command && input.command.length > 100) {
      errors.push('Command is too long (max 100 characters)')
    }

    // Check for dangerous characters (basic security)
    const dangerousPatterns = [/[;&|`$()]/]
    if (input.command && dangerousPatterns.some(pattern => pattern.test(input.command))) {
      errors.push('Command contains potentially dangerous characters')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Register basic validator by default
globalCommandRegistry.addValidator(new BasicCommandValidator())