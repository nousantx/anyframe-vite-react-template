import { AnyCSS } from '@anyframe/css'
import { glob } from 'glob'
import fs from 'node:fs'
import path from 'node:path'

export default function ViteAnyFrame() {
  const virtualId = 'virtual:anyframe.css'
  const resolvedVirtualId = '\0' + virtualId
  const classSet = new Set()
  const configPath = path.resolve(process.cwd(), '.config/anyframe.js')
  let ui
  let config
  let includedFiles = new Set()
  let isBuild = false

  async function loadConfig() {
    if (fs.existsSync(configPath)) {
      try {
        const configUrl = `file://${configPath}?update=${Date.now()}`
        const configModule = await import(configUrl)
        config = configModule.default || configModule
        ui = new AnyCSS(config)

        includedFiles.clear()
        if (config.include && Array.isArray(config.include)) {
          for (const pattern of config.include) {
            const matches = await glob(pattern, {
              cwd: process.cwd(),
              absolute: true
            })
            matches.forEach((file) => includedFiles.add(file))
          }
        }
      } catch (e) {
        console.error(`Failed to load anyframe.config.js: ${e.message}`)
      }
    }
  }

  function scanClassNames(code) {
    const classRegex = /class(?:Name)?=["'`]([^"'`]+)["'`]/g
    const classList = new Set()
    let match
    while ((match = classRegex.exec(code)) !== null) {
      match[1]
        .split(/\s+/)
        .filter(Boolean)
        .forEach((className) => {
          classList.add(className)
        })
    }
    return classList
  }

  function shouldProcessFile(id) {
    if (!isBuild) return false

    if (id === resolvedVirtualId || id.includes('\0') || id.startsWith('vite/')) {
      return false
    }

    if (!config?.include || !Array.isArray(config.include) || config.include.length === 0) {
      return (
        id.endsWith('.js') ||
        id.endsWith('.jsx') ||
        id.endsWith('.ts') ||
        id.endsWith('.tsx') ||
        id.endsWith('.vue')
      )
    }

    return includedFiles.has(path.resolve(id))
  }

  return {
    name: 'anyframe-css',

    configResolved(config) {
      isBuild = config.command === 'build'
    },

    async buildStart() {
      if (!isBuild) return
      await loadConfig()

      for (const file of includedFiles) {
        try {
          const code = fs.readFileSync(file, 'UTF-8')
          scanClassNames(code).forEach((className) => classSet.add(className))
        } catch (error) {
          console.warn(`Failed to read file ${file}: ${error.message}`)
        }
      }
    },

    resolveId(id) {
      if (id === virtualId) {
        return resolvedVirtualId
      }
    },

    transform(code, id) {
      if (!shouldProcessFile(id)) return null

      try {
        if (fs.existsSync(id)) {
          const _code = fs.readFileSync(id, 'UTF-8')
          const classList = scanClassNames(_code)
          classList.forEach((className) => classSet.add(className))
        }
      } catch (error) {
        console.warn(`Failed to read file ${id}: ${error.message}`)
      }

      return null
    },

    load(id) {
      if (id === resolvedVirtualId) {
        if (!isBuild) {
          return ''
        }
        const stylesheet = ui.render([...classSet])
        return stylesheet
      }
      return undefined
    }
  }
}
