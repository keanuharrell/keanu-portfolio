export interface TerminalPreferences {
  theme: 'dark' | 'light'
  historySize: number
  autoComplete: boolean
  fontSize: 'small' | 'medium' | 'large'
  animationSpeed: 'slow' | 'normal' | 'fast'
  showWelcome: boolean
}

export interface TerminalSession {
  commandHistory: string[]
  preferences: TerminalPreferences
  lastAccessed: Date
}

const DEFAULT_PREFERENCES: TerminalPreferences = {
  theme: 'dark',
  historySize: 100,
  autoComplete: true,
  fontSize: 'medium',
  animationSpeed: 'normal',
  showWelcome: true
}

const STORAGE_KEYS = {
  PREFERENCES: 'terminal-preferences',
  HISTORY: 'terminal-history',
  SESSION: 'terminal-session'
} as const

export class TerminalStorage {
  private static isClient = typeof window !== 'undefined'

  // Get preferences with fallback to defaults
  static getPreferences(): TerminalPreferences {
    if (!this.isClient) return DEFAULT_PREFERENCES

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...DEFAULT_PREFERENCES, ...parsed }
      }
    } catch (error) {
      console.warn('Failed to load terminal preferences:', error)
    }

    return DEFAULT_PREFERENCES
  }

  // Save preferences
  static savePreferences(preferences: Partial<TerminalPreferences>): void {
    if (!this.isClient) return

    try {
      const current = this.getPreferences()
      const updated = { ...current, ...preferences }
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated))
    } catch (error) {
      console.warn('Failed to save terminal preferences:', error)
    }
  }

  // Get command history
  static getCommandHistory(): string[] {
    if (!this.isClient) return []

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load command history:', error)
    }

    return []
  }

  // Save command history
  static saveCommandHistory(history: string[]): void {
    if (!this.isClient) return

    try {
      const preferences = this.getPreferences()
      const limitedHistory = history.slice(-preferences.historySize)
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(limitedHistory))
    } catch (error) {
      console.warn('Failed to save command history:', error)
    }
  }

  // Add command to history
  static addCommand(command: string): void {
    if (!this.isClient || !command.trim()) return

    const history = this.getCommandHistory()
    
    // Don't add duplicate consecutive commands
    if (history.length > 0 && history[history.length - 1] === command) {
      return
    }

    history.push(command)
    this.saveCommandHistory(history)
  }

  // Get full session data
  static getSession(): TerminalSession {
    return {
      commandHistory: this.getCommandHistory(),
      preferences: this.getPreferences(),
      lastAccessed: new Date()
    }
  }

  // Save session data
  static saveSession(session: Partial<TerminalSession>): void {
    if (!this.isClient) return

    if (session.commandHistory) {
      this.saveCommandHistory(session.commandHistory)
    }

    if (session.preferences) {
      this.savePreferences(session.preferences)
    }

    // Update last accessed time
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
        lastAccessed: new Date().toISOString()
      }))
    } catch (error) {
      console.warn('Failed to save session data:', error)
    }
  }

  // Clear all stored data
  static clearAll(): void {
    if (!this.isClient) return

    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.warn('Failed to clear terminal storage:', error)
    }
  }

  // Clear only command history
  static clearHistory(): void {
    if (!this.isClient) return

    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY)
    } catch (error) {
      console.warn('Failed to clear command history:', error)
    }
  }

  // Reset preferences to defaults
  static resetPreferences(): void {
    if (!this.isClient) return

    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(DEFAULT_PREFERENCES))
    } catch (error) {
      console.warn('Failed to reset preferences:', error)
    }
  }

  // Get storage usage info
  static getStorageInfo(): { used: number; available: number; percentage: number } {
    if (!this.isClient) {
      return { used: 0, available: 0, percentage: 0 }
    }

    try {
      let used = 0
      Object.values(STORAGE_KEYS).forEach(key => {
        const value = localStorage.getItem(key)
        if (value) {
          used += new Blob([value]).size
        }
      })

      // Estimate available space (most browsers limit localStorage to ~5MB)
      const available = 5 * 1024 * 1024 // 5MB in bytes
      const percentage = (used / available) * 100

      return { used, available, percentage }
    } catch (error) {
      console.warn('Failed to get storage info:', error)
      return { used: 0, available: 0, percentage: 0 }
    }
  }

  // Check if storage is available
  static isStorageAvailable(): boolean {
    if (!this.isClient) return false

    try {
      const test = '__terminal_storage_test__'
      localStorage.setItem(test, 'test')
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }
}

// Export utility functions for easy use
export const terminalStorage = {
  getPreferences: () => TerminalStorage.getPreferences(),
  savePreferences: (prefs: Partial<TerminalPreferences>) => TerminalStorage.savePreferences(prefs),
  getHistory: () => TerminalStorage.getCommandHistory(),
  saveHistory: (history: string[]) => TerminalStorage.saveCommandHistory(history),
  addCommand: (command: string) => TerminalStorage.addCommand(command),
  getSession: () => TerminalStorage.getSession(),
  saveSession: (session: Partial<TerminalSession>) => TerminalStorage.saveSession(session),
  clear: () => TerminalStorage.clearAll(),
  clearHistory: () => TerminalStorage.clearHistory(),
  resetPreferences: () => TerminalStorage.resetPreferences(),
  getStorageInfo: () => TerminalStorage.getStorageInfo(),
  isAvailable: () => TerminalStorage.isStorageAvailable()
}