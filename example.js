const { binanceCryptoIcons, binanceEtfIcons, binanceCurrencyIcons } = require('./index');

// Examples for crypto icons
console.log('--- Crypto Icons ---');
const btcIcon = binanceCryptoIcons.get('btc');
console.log(`Bitcoin icon details:`);
console.log(`- Name: ${btcIcon.name}`);
console.log(`- Symbol: ${btcIcon.symbol}`);
console.log(`- Has SVG: ${btcIcon.svg !== null}`);

// Get all crypto symbols
const allCrypto = binanceCryptoIcons.getAllSymbols();
console.log(`\nTotal crypto icons: ${allCrypto.length}`);
console.log(`First 5 crypto icons: ${allCrypto.slice(0, 5).join(', ')}`);

// Examples for ETF icons
console.log('\n--- ETF Icons ---');
const btcupIcon = binanceEtfIcons.get('btcup');
if (btcupIcon) {
  console.log(`BTCUP icon details:`);
  console.log(`- Name: ${btcupIcon.name}`);
  console.log(`- Symbol: ${btcupIcon.symbol}`);
  console.log(`- Has SVG: ${btcupIcon.svg !== null}`);
}

// Get all ETF symbols
const allEtf = binanceEtfIcons.getAllSymbols();
console.log(`\nTotal ETF icons: ${allEtf.length}`);
console.log(`First 5 ETF icons: ${allEtf.slice(0, 5).join(', ')}`);

// Examples for currency icons
console.log('\n--- Currency Icons ---');
const usdIcon = binanceCurrencyIcons.get('usd');
if (usdIcon) {
  console.log(`USD icon details:`);
  console.log(`- Name: ${usdIcon.name}`);
  console.log(`- Symbol: ${usdIcon.symbol}`);
  console.log(`- Has SVG: ${usdIcon.svg !== null}`);
}

// Get all currency symbols
const allCurrency = binanceCurrencyIcons.getAllSymbols();
console.log(`\nTotal currency icons: ${allCurrency.length}`);
console.log(`First 5 currency icons: ${allCurrency.slice(0, 5).join(', ')}`);

// Check if icons exist
console.log('\n--- Icon Existence Checks ---');
console.log(`Does BTC icon exist? ${binanceCryptoIcons.has('btc')}`);
console.log(`Does UNKNOWN icon exist? ${binanceCryptoIcons.has('unknown')}`); 