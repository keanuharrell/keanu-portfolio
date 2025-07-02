import { test, expect, describe } from "bun:test"
import { TabCompletion } from '../core/tabCompletion'

describe('tabCompletion', () => {
  describe('TabCompletion.complete', () => {
    test('should complete command names', () => {
      const result = TabCompletion.complete('he')
      expect(result.completed).toContain('help')
    })

    test('should handle single command completion', () => {
      const result = TabCompletion.complete('hel')
      expect(result.completed).toBe('help ')
      expect(result.showSuggestions).toBe(false)
    })

    test('should show suggestions for multiple matches', () => {
      // Test with empty input which should show all commands
      const result = TabCompletion.complete('')
      expect(result.showSuggestions).toBe(true)
    })

    test('should handle empty input', () => {
      const result = TabCompletion.complete('')
      expect(result.completed).toBe('')
      expect(result.suggestions.length).toBeGreaterThan(0)
    })

    test('should handle file path completion', () => {
      const result = TabCompletion.complete('ls /ho')
      expect(result.completed).toContain('/ho')
    })

    test('should handle non-existent commands', () => {
      const result = TabCompletion.complete('xyz123')
      expect(result.completed).toBe('xyz123')
      expect(result.suggestions).toHaveLength(0)
      expect(result.showSuggestions).toBe(false)
    })
  })

  describe('TabCompletion.formatSuggestions', () => {
    test('should format suggestions in columns', () => {
      const suggestions = ['help', 'history', 'home', 'host']
      const formatted = TabCompletion.formatSuggestions(suggestions)
      expect(formatted.length).toBeGreaterThan(0)
      expect(formatted[0]).toContain('help')
    })

    test('should handle empty suggestions', () => {
      const formatted = TabCompletion.formatSuggestions([])
      expect(formatted).toEqual([])
    })

    test('should handle single suggestion', () => {
      const formatted = TabCompletion.formatSuggestions(['help'])
      expect(formatted).toEqual(['help'])
    })
  })
})