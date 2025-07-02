import { test, expect, describe } from "bun:test"
import { resolvePath, getCurrentDir, getFileSystemNode } from '../core/fileSystem'

describe('fileSystem', () => {
  test('should resolve absolute paths', () => {
    expect(resolvePath('/home/user')).toBe('/home/user')
    expect(resolvePath('/')).toBe('/')
  })

  test('should get root directory node', () => {
    const rootNode = getFileSystemNode('/')
    expect(rootNode).toBeDefined()
    expect(rootNode?.type).toBe('directory')
  })

  test('should get current directory', () => {
    const currentDir = getCurrentDir()
    expect(typeof currentDir).toBe('string')
    expect(currentDir.startsWith('/')).toBe(true)
  })

  test('should return null for non-existent path', () => {
    const node = getFileSystemNode('/non-existent-path-xyz')
    expect(node).toBeNull()
  })

  test('should handle basic path resolution', () => {
    // Test that the function exists and returns something
    const result = resolvePath('/test')
    expect(typeof result).toBe('string')
  })

  test('should get nodes from file system', () => {
    const rootNode = getFileSystemNode('/')
    expect(rootNode).toBeDefined()
    if (rootNode) {
      expect(rootNode.type).toBe('directory')
    }
  })
})