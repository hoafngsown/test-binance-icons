import fs from 'fs'
import path from 'path'

// Define the IconData interface
interface IconData {
  symbol: string
  name: string
}

// Define the IconCollection class
class IconCollection {
  private icons: IconData[]
  private directory: string
  private _iconMap: Map<string, IconData>
  private _svgCache: Map<string, string>

  constructor(icons: IconData[], directory: string) {
    this.icons = icons || []
    this.directory = directory
    this._iconMap = new Map(this.icons.map(icon => [icon.symbol.toLowerCase(), icon]))
    this._svgCache = new Map()
  }

  has(symbol: string): boolean {
    if (!symbol) return false
    return this._iconMap.has(symbol.toLowerCase())
  }

  get(symbol: string): any {
    if (!symbol) return null

    const iconSymbol = symbol.toLowerCase()

    if (!this.has(iconSymbol)) {
      return null
    }

    const icon = this._iconMap.get(iconSymbol)
    const svgPath = `${this.directory}/${iconSymbol}.svg`

    // We're in a Node.js environment when building
    try {
      // Use relative path for icons
      const fullPath = path.join(process.cwd(), 'icons', this.directory, `${iconSymbol}.svg`)
      const svg = fs.readFileSync(fullPath, 'utf8')
      return {
        name: icon?.name,
        symbol: icon?.symbol,
        svg,
        svgPath
      }
    } catch (error) {
      // Use console.error safely
      if (typeof console !== 'undefined' && console.error) {
        console.error(`Error reading SVG file for ${iconSymbol}:`, error)
      }
      return {
        name: icon?.name,
        symbol: icon?.symbol,
        svg: null,
        svgPath
      }
    }
  }

  getAllSymbols(): string[] {
    return this.icons.map(icon => icon.symbol)
  }
}

// Function to scan the icons directory and build a manifest
function buildIconsManifest(): IconData[] {
  // Path to the crypto icons using process.cwd() instead of __dirname
  const cryptoIconsPath = path.join(process.cwd(), 'icons', 'crypto')

  // Read all SVG files from the directory
  const svgFiles = fs
    .readdirSync(cryptoIconsPath)
    .filter((file: string) => file.endsWith('.svg'))
    .map((file: string) => {
      // Extract symbol from filename (remove .svg extension)
      const symbol = file.replace('.svg', '').toLowerCase()

      // Generate a display name (capitalize first letter)
      const name = symbol.charAt(0).toUpperCase() + symbol.slice(1)

      return { symbol, name }
    })

  return svgFiles
}

// Create the collection
const cryptoIcons = buildIconsManifest()
const binanceCryptoIcons = new IconCollection(cryptoIcons, 'crypto')

// Export the collection
export { binanceCryptoIcons }
