export interface IconData {
  name: string;
  symbol: string;
  svg: string | null;
}

export interface IconCollection {
  /**
   * Check if an icon exists in the collection
   * @param symbol - Icon symbol/name to check
   */
  has(symbol: string): boolean;

  /**
   * Get icon data by symbol
   * @param symbol - Icon symbol/name
   */
  get(symbol: string): IconData | null;

  /**
   * Get all icons in the collection
   */
  getAllSymbols(): string[];
}

/**
 * Collection of crypto icons from Binance
 */
export const binanceCryptoIcons: IconCollection;

/**
 * Collection of ETF icons from Binance
 */
export const binanceEtfIcons: IconCollection;

/**
 * Collection of currency icons from Binance
 */
export const binanceCurrencyIcons: IconCollection;
