const path = require('path');

// Simple detection of browser environment without trying to use Node.js modules
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

// Only require fs in a Node.js environment
const fs = !isBrowser ? require('fs') : null;

// Read the manifest data
const manifest = require('./manifest.json');

/**
 * Base class for icon collections
 */
class IconCollection {
  /**
   * @param {Object[]} icons - Array of icon objects from manifest
   * @param {string} directory - Directory name where the SVG files are stored
   */
  constructor(icons, directory) {
    this.icons = icons;
    this.directory = directory;
    this._iconMap = new Map(icons.map(icon => [icon.symbol, icon]));
  }

  /**
   * Check if an icon exists in the collection
   * @param {string} symbol - Icon symbol/name to check
   * @returns {boolean} - True if icon exists
   */
  has(symbol) {
    return this._iconMap.has(symbol.toLowerCase());
  }

  /**
   * Get icon data by symbol
   * @param {string} symbol - Icon symbol/name
   * @returns {Object|null} - Icon data or null if not found
   */
  get(symbol) {
    const iconSymbol = symbol.toLowerCase();
    
    if (!this.has(iconSymbol)) {
      return null;
    }

    const icon = this._iconMap.get(iconSymbol);
    const svgPath = `${this.directory}/${iconSymbol}.svg`;
    
    // In browser environment, don't try to read files
    if (isBrowser) {
      return {
        name: icon.name,
        symbol: icon.symbol,
        svg: null,
        svgPath: svgPath
      };
    }
    
    // In Node.js environment, read the SVG file
    try {
      const fullPath = path.join(__dirname, svgPath);
      const svg = fs.readFileSync(fullPath, 'utf8');
      return {
        name: icon.name,
        symbol: icon.symbol,
        svg: svg,
        svgPath: svgPath
      };
    } catch (error) {
      console.error(`Error reading SVG file for ${iconSymbol}:`, error.message);
      return {
        name: icon.name,
        symbol: icon.symbol,
        svg: null,
        svgPath: svgPath
      };
    }
  }

  /**
   * Get all icons in the collection
   * @returns {string[]} - Array of all icon symbols
   */
  getAllSymbols() {
    return this.icons.map(icon => icon.symbol);
  }
}

// Create icon collections instances
const binanceCryptoIcons = new IconCollection(manifest.crypto, 'crypto');
const binanceEtfIcons = new IconCollection(manifest.etf, 'crypto'); // ETF icons are in the crypto directory
const binanceCurrencyIcons = new IconCollection(manifest.currency, 'currency');

module.exports = {
  binanceCryptoIcons,
  binanceEtfIcons,
  binanceCurrencyIcons
}; 