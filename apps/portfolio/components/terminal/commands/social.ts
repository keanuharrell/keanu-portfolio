import { CommandHandler, ParsedCommand } from '../core/commandParser'

export const socialCommands: Record<string, CommandHandler> = {
  curl: {
    name: 'curl',
    description: 'Fetch data from external APIs',
    category: 'social',
    usage: 'curl [OPTIONS] URL',
    examples: [
      'curl api.github.com/users/keanuharrell',
      'curl -s linkedin.com/in/keanuharrell',
      'curl --help'
    ],
    handler: async (parsed: ParsedCommand) => {
      const url = parsed.args[0]
      if (!url) {
        return ["curl: no URL specified"]
      }
      
      const silent = parsed.flags.s || parsed.flags.silent
      
      if (url.includes('github.com/users/keanuharrell') || url.includes('api.github.com/users/keanuharrell')) {
        const headers = silent ? [] : [
          "HTTP/2 200",
          "server: GitHub.com",
          "content-type: application/json; charset=utf-8",
          ""
        ]
        
        return [
          ...headers,
          "{",
          "  \"login\": \"keanuharrell\",",
          "  \"id\": 12345678,",
          "  \"name\": \"Keanu Harrell\",",
          "  \"bio\": \"DevOps Engineer & iOS Developer\",",
          "  \"location\": \"Remote\",",
          "  \"email\": \"keanu.harrell@example.com\",",
          "  \"hireable\": true,",
          "  \"public_repos\": 42,",
          "  \"public_gists\": 8,",
          "  \"followers\": 156,",
          "  \"following\": 89,",
          "  \"created_at\": \"2018-03-15T10:30:00Z\",",
          "  \"updated_at\": \"2025-07-01T14:25:30Z\",",
          "  \"blog\": \"https://keanuharrell.dev\",",
          "  \"twitter_username\": \"keanuharrell\",",
          "  \"company\": \"TechCorp\"",
          "}"
        ]
      }
      
      if (url.includes('linkedin.com')) {
        return [
          "🔗 LinkedIn Profile:",
          "",
          "👤 Keanu Harrell",
          "💼 Senior DevOps Engineer @ TechCorp",
          "📍 Remote",
          "🎓 Computer Science Graduate",
          "",
          "🔗 Connect: https://linkedin.com/in/keanuharrell",
          "",
          "💡 Open to DevOps & Cloud Architecture opportunities"
        ]
      }
      
      if (url.includes('--help')) {
        return [
          "curl - transfer data from or to a server",
          "",
          "Usage: curl [options] <url>",
          "",
          "Options:",
          "  -s, --silent    Silent mode",
          "  -v, --verbose   Verbose output",
          "  -H, --header    Add custom header",
          "  -d, --data      Send POST data",
          "",
          "Examples:",
          "  curl api.github.com/users/keanuharrell",
          "  curl -s linkedin.com/in/keanuharrell"
        ]
      }
      
      return [`curl: (6) Could not resolve host: ${url}`]
    }
  },

  ssh: {
    name: 'ssh',
    description: 'Connect to remote servers',
    category: 'social',
    usage: 'ssh [USER@]HOSTNAME',
    examples: [
      'ssh keanu@keanuharrell.dev',
      'ssh portfolio-server',
      'ssh --help'
    ],
    handler: async (parsed: ParsedCommand) => {
      const target = parsed.args[0]
      if (!target) {
        return ["ssh: no hostname specified"]
      }
      
      if (target.includes('--help')) {
        return [
          "ssh - OpenSSH remote login client",
          "",
          "Usage: ssh [options] [user@]hostname [command]",
          "",
          "Common options:",
          "  -p port    Port to connect to on the remote host",
          "  -i file    Identity file (private key)",
          "  -v         Verbose mode",
          "",
          "Examples:",
          "  ssh user@example.com",
          "  ssh -p 2222 user@example.com"
        ]
      }
      
      if (target.includes('keanuharrell.dev') || target === 'portfolio-server') {
        return [
          `Connecting to ${target}...`,
          "",
          "🚨 This is a portfolio demonstration!",
          "",
          "In a real scenario, this would:",
          "• Establish SSH connection",
          "• Authenticate with keys/password", 
          "• Provide remote shell access",
          "",
          "💡 Want to see my real infrastructure work?",
          "   Try: cat projects/infrastructure/aws-multi-region"
        ]
      }
      
      return [
        `ssh: connect to host ${target} port 22: Connection refused`,
        "",
        "💡 Try connecting to 'keanu@keanuharrell.dev' or 'portfolio-server'"
      ]
    }
  },

  ping: {
    name: 'ping',
    description: 'Test network connectivity',
    category: 'social',
    usage: 'ping [OPTIONS] DESTINATION',
    examples: ['ping keanuharrell.dev', 'ping -c 4 google.com'],
    handler: async (parsed: ParsedCommand) => {
      const target = parsed.args[0]
      if (!target) {
        return ["ping: usage error: Destination address required"]
      }
      
      const count = parsed.flags.c ? parseInt(parsed.flags.c as string) || 4 : 4
      
      if (target === 'keanuharrell.dev' || target === 'portfolio') {
        const results = [
          `PING ${target} (185.199.108.153): 56 data bytes`
        ]
        
        for (let i = 0; i < count; i++) {
          const time = (Math.random() * 50 + 10).toFixed(1)
          results.push(`64 bytes from 185.199.108.153: icmp_seq=${i} ttl=64 time=${time} ms`)
        }
        
        results.push("")
        results.push(`--- ${target} ping statistics ---`)
        results.push(`${count} packets transmitted, ${count} received, 0% packet loss`)
        
        return results
      }
      
      return [
        `PING ${target}: 56 data bytes`,
        "Request timeout for icmp_seq 0",
        "Request timeout for icmp_seq 1", 
        "Request timeout for icmp_seq 2",
        "",
        `--- ${target} ping statistics ---`,
        "3 packets transmitted, 0 received, 100% packet loss"
      ]
    }
  },

  git: {
    name: 'git',
    description: 'Git version control operations',
    category: 'social',
    usage: 'git <command> [options]',
    examples: ['git status', 'git log --oneline', 'git remote -v'],
    handler: async (parsed: ParsedCommand) => {
      const subcommand = parsed.args[0]
      
      if (!subcommand) {
        return [
          "usage: git [--version] [--help] [-C <path>] [--exec-path[=<path>]]",
          "           <command> [<args>]",
          "",
          "These are common Git commands used in various situations:",
          "",
          "start a working area (see also: git help tutorial)",
          "   clone     Clone a repository into a new directory",
          "   init      Create an empty Git repository",
          "",
          "work on the current change (see also: git help everyday)",
          "   status    Show the working tree status",
          "   log       Show commit logs",
          "   remote    Manage set of tracked repositories"
        ]
      }
      
      switch (subcommand) {
        case 'status':
          return [
            "On branch main",
            "Your branch is up to date with 'origin/main'.",
            "",
            "nothing to commit, working tree clean"
          ]
          
        case 'log':
          const oneline = parsed.flags.oneline
          if (oneline) {
            return [
              "a7f3d2c feat: Add terminal interface to portfolio",
              "b8e4c1d feat: Implement real command parsing system", 
              "c9f5a3e feat: Add tab completion functionality",
              "d1g6b4f style: Refactor terminal component structure",
              "e2h7c5g docs: Update README with terminal features"
            ]
          }
          return [
            "commit a7f3d2c1234567890abcdef (HEAD -> main, origin/main)",
            "Author: Keanu Harrell <keanu.harrell@example.com>",
            "Date:   Mon Jul 1 14:25:30 2025 +0000",
            "",
            "    feat: Add terminal interface to portfolio",
            "    ",
            "    - Implemented real command parsing",
            "    - Added tab completion",
            "    - Created organized command structure"
          ]
          
        case 'remote':
          if (parsed.flags.v) {
            return [
              "origin  https://github.com/keanuharrell/keanu-portfolio.git (fetch)",
              "origin  https://github.com/keanuharrell/keanu-portfolio.git (push)"
            ]
          }
          return ["origin"]
          
        default:
          return [`git: '${subcommand}' is not a git command. See 'git --help'.`]
      }
    }
  }
} 