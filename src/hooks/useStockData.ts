import { useState, useEffect } from 'react';
import { getStockQuote, getMultipleQuotes, searchStocks, StockQuote, StockSearchResult, DEMO_STOCKS } from '../services/stockApi';

// Hook for single stock quote
export function useStockQuote(symbol: string) {
  const [data, setData] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const quote = await getStockQuote(symbol);
      setData(quote);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
      // Fallback to demo data if API fails
      const demoStock = DEMO_STOCKS.find(stock => stock.symbol === symbol);
      if (demoStock) {
        setData(demoStock);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [symbol]);

  return { data, loading, error, refetch: fetchQuote };
}

// Hook for multiple stock quotes
export function useMultipleStocks(symbols: string[]) {
  const [data, setData] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    if (symbols.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    // Set a timeout for the API call
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('API request timeout')), 10000)
    );
    
    try {
      const quotesPromise = getMultipleQuotes(symbols);
      const quotes = await Promise.race([quotesPromise, timeoutPromise]) as StockQuote[];
      setData(quotes);
    } catch (err) {
      console.log('API failed, using demo data:', err);
      setError('Using demo data - API limit reached or connection issue');
      
      // Create demo data based on requested symbols
      const demoData = symbols.map((symbol, index) => ({
        symbol,
        price: 150 + Math.random() * 200,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 10000000),
        lastUpdated: new Date().toISOString().split('T')[0]
      }));
      
      setData(demoData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add a small delay to prevent immediate API calls
    const timer = setTimeout(() => {
      fetchQuotes();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [symbols.join(',')]);

  return { data, loading, error, refetch: fetchQuotes };
}

// Hook for stock search
export function useStockSearch() {
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchStocks(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
}

// Hook for real-time updates (polling)
export function useRealTimeStocks(symbols: string[], intervalMs: number = 60000) {
  const [data, setData] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (symbols.length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const quotes = await getMultipleQuotes(symbols);
        setData(quotes);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        // Use demo data as fallback
        setData(DEMO_STOCKS.slice(0, symbols.length));
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling
    const interval = setInterval(fetchData, intervalMs);

    return () => clearInterval(interval);
  }, [symbols.join(','), intervalMs]);

  return { data, loading, error, lastUpdated };
}
