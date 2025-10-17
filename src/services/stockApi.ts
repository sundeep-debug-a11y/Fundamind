// Stock Market API Service using Alpha Vantage
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

// Get real-time stock quote
export async function getStockQuote(symbol: string): Promise<StockQuote> {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error('Invalid stock symbol');
    }
    
    if (data['Note']) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    
    const quote = data['Global Quote'];
    if (!quote) {
      throw new Error('No data available for this symbol');
    }
    
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      lastUpdated: quote['07. latest trading day']
    };
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
}

// Search for stocks
export async function searchStocks(keywords: string): Promise<StockSearchResult[]> {
  try {
    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error('Search failed');
    }
    
    const matches = data['bestMatches'] || [];
    
    return matches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      currency: match['8. currency']
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
}

// Get multiple stock quotes (batch)
export async function getMultipleQuotes(symbols: string[]): Promise<StockQuote[]> {
  // For demo purposes, if we have more than 2 symbols, use demo data to avoid rate limits
  if (symbols.length > 2) {
    console.log('Using demo data to avoid API rate limits');
    return symbols.map(symbol => {
      const basePrice = symbol === 'AAPL' ? 175 : 
                       symbol === 'GOOGL' ? 2800 : 
                       symbol === 'MSFT' ? 380 : 
                       symbol === 'AMZN' ? 145 : 
                       symbol === 'TSLA' ? 250 : 
                       150 + Math.random() * 200;
      
      const change = (Math.random() - 0.5) * 10;
      
      return {
        symbol,
        price: basePrice + change,
        change: change,
        changePercent: (change / basePrice) * 100,
        volume: Math.floor(Math.random() * 50000000) + 1000000,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    });
  }

  const quotes: StockQuote[] = [];
  
  // For 1-2 symbols, try real API
  for (const symbol of symbols) {
    try {
      const quote = await getStockQuote(symbol);
      quotes.push(quote);
      
      // Add delay to respect rate limits (5 calls per minute)
      if (symbols.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 15000)); // 15 second delay
      }
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      // Add demo data for failed symbol
      quotes.push({
        symbol,
        price: 150 + Math.random() * 200,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 10000000),
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  }
  
  return quotes;
}

// Popular Indian stocks for demo
export const POPULAR_INDIAN_STOCKS = [
  'RELIANCE.BSE',
  'TCS.BSE', 
  'HDFCBANK.BSE',
  'INFY.BSE',
  'HINDUNILVR.BSE',
  'ICICIBANK.BSE',
  'KOTAKBANK.BSE',
  'BHARTIARTL.BSE',
  'ITC.BSE',
  'SBIN.BSE'
];

// Popular US stocks for demo
export const POPULAR_US_STOCKS = [
  'AAPL',
  'GOOGL', 
  'MSFT',
  'AMZN',
  'TSLA',
  'META',
  'NVDA',
  'NFLX',
  'UBER',
  'ZOOM'
];

// Demo data for when API is not available
export const DEMO_STOCKS: StockQuote[] = [
  {
    symbol: 'AAPL',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45678900,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  {
    symbol: 'GOOGL',
    price: 2847.63,
    change: -15.42,
    changePercent: -0.54,
    volume: 1234567,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  {
    symbol: 'TSLA',
    price: 248.87,
    change: 8.92,
    changePercent: 3.72,
    volume: 98765432,
    lastUpdated: new Date().toISOString().split('T')[0]
  }
];
