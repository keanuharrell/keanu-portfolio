import { CommandHandler, ParsedCommand } from '../core/commandParser'
import { getFileSystemNode, getCurrentDir, setCurrentDir, resolvePath } from '../core/fileSystem'

export const navigationCommands: Record<string, CommandHandler> = {
  cd: {
    name: 'cd',
    description: 'Change directory',
    category: 'navigation',
    usage: 'cd [DIRECTORY]',
    examples: ['cd projects', 'cd ..', 'cd /', 'cd ~'],
    handler: async (parsed: ParsedCommand) => {
      const target = parsed.args[0] || '/'
      
      if (target === '..') {
        const current = getCurrentDir()
        if (current === '/') return []
        const parentPath = current.split('/').slice(0, -1).join('/') || '/'
        setCurrentDir(parentPath)
        return []
      }
      
      if (target === '~' || target === '') {
        setCurrentDir('/')
        return []
      }
      
      const node = getFileSystemNode(target)
      if (!node) {
        return [`cd: ${target}: No such file or directory`]
      }
      if (node.type !== 'directory') {
        return [`cd: ${target}: Not a directory`]
      }
      
      // Set the resolved absolute path
      const resolvedPath = resolvePath(target)
      setCurrentDir(resolvedPath)
      return []
    }
  },

  find: {
    name: 'find',
    description: 'Search for files and directories',
    category: 'navigation',
    usage: 'find [PATH] [EXPRESSION]',
    examples: [
      'find . -name "*.md"', 
      'find projects/ -type f', 
      'find . -name "*terraform*"',
      'find / -name "about*"'
    ],
    handler: async (parsed: ParsedCommand) => {
      const searchPath = parsed.args[0] || '.'
      const namePattern = parsed.flags.name as string
      const typeFilter = parsed.flags.type as string
      
      if (!namePattern && !typeFilter) {
        return ["find: missing search criteria (try -name pattern or -type f/d)"]
      }
      
      const results: string[] = []
      
      // Simplified find implementation - in a real scenario this would recursively search
      const searchResults = [
        { path: './about.md', type: 'file' },
        { path: './skills.json', type: 'file' },
        { path: './contact.txt', type: 'file' },
        { path: './cv.pdf', type: 'file' },
        { path: './projects/', type: 'directory' },
        { path: './projects/infrastructure/', type: 'directory' },
        { path: './projects/infrastructure/aws-multi-region', type: 'file' },
        { path: './projects/infrastructure/k8s-monitoring', type: 'file' },
        { path: './projects/infrastructure/terraform-modules', type: 'file' },
        { path: './projects/mobile-apps/', type: 'directory' },
        { path: './projects/mobile-apps/expense-tracker-ios', type: 'file' },
        { path: './projects/mobile-apps/fitness-companion', type: 'file' },
        { path: './projects/web-applications/', type: 'directory' },
        { path: './projects/web-applications/analytics-dashboard', type: 'file' },
        { path: './projects/web-applications/portfolio-website', type: 'file' }
      ]
      
      let filteredResults = searchResults
      
      // Apply type filter
      if (typeFilter) {
        const targetType = typeFilter === 'f' ? 'file' : typeFilter === 'd' ? 'directory' : typeFilter
        filteredResults = filteredResults.filter(item => item.type === targetType)
      }
      
      // Apply name pattern
      if (namePattern) {
        const regex = new RegExp(namePattern.replace(/\*/g, '.*').replace(/\?/g, '.'), 'i')
        filteredResults = filteredResults.filter(item => {
          const fileName = item.path.split('/').pop() || ''
          return regex.test(fileName)
        })
      }
      
      // Apply path filter
      if (searchPath !== '.') {
        const searchPrefix = searchPath.endsWith('/') ? searchPath : searchPath + '/'
        filteredResults = filteredResults.filter(item => 
          item.path.startsWith(searchPrefix) || item.path === searchPath
        )
      }
      
      results.push(...filteredResults.map(item => item.path))
      
      return results.length > 0 ? results : [`find: no matches found`]
    }
  },

  tree: {
    name: 'tree',
    description: 'Display directory tree structure',
    category: 'navigation',
    usage: 'tree [DIRECTORY]',
    examples: ['tree', 'tree projects/', 'tree -a'],
    handler: async (parsed: ParsedCommand) => {
      const targetDir = parsed.args[0] || getCurrentDir()
      
      const node = getFileSystemNode(targetDir)
      if (!node || node.type !== 'directory') {
        return [`tree: ${targetDir}: No such directory`]
      }
      
      const result = [
        targetDir === '/' ? '.' : targetDir,
        '├── about.md',
        '├── contact.txt',
        '├── cv.pdf',
        '├── skills.json',
        '└── projects/',
        '    ├── infrastructure/',
        '    │   ├── aws-multi-region',
        '    │   ├── k8s-monitoring', 
        '    │   └── terraform-modules',
        '    ├── mobile-apps/',
        '    │   ├── expense-tracker-ios',
        '    │   └── fitness-companion',
        '    └── web-applications/',
        '        ├── analytics-dashboard',
        '        └── portfolio-website',
        '',
        'directories: 4, files: 10'
      ]
      
      return result
    }
  }
} 