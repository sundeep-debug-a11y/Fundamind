import { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useMultipleStocks, useStockSearch } from '../hooks/useStockData';
import { POPULAR_US_STOCKS } from '../services/stockApi';

export function StockMarketDemo() {
  const [watchlist, setWatchlist] = useState(POPULAR_US_STOCKS.slice(0, 5));
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: stocks, loading, error, refetch } = useMultipleStocks(watchlist);
  const { results: searchResults, loading: searching, search } = useStockSearch();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery);
    }
  };

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s !== symbol));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stock Market Simulator</h1>
        <Button 
          onClick={refetch} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Stocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search for stocks (e.g., AAPL, GOOGL)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={searching}>
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Search Results:</h3>
              {searchResults.slice(0, 5).map((result) => (
                <div key={result.symbol} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">{result.symbol}</span>
                    <span className="text-sm text-gray-600 ml-2">{result.name}</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => addToWatchlist(result.symbol)}
                    disabled={watchlist.includes(result.symbol)}
                  >
                    {watchlist.includes(result.symbol) ? 'Added' : 'Add'}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Watchlist */}
      <Card>
        <CardHeader>
          <CardTitle>Your Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading stock data...</p>}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
              <p className="text-yellow-800">⚠️ {error}</p>
              <p className="text-sm text-yellow-600 mt-1">Showing demo data instead.</p>
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stocks.map((stock) => (
              <div key={stock.symbol} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{stock.symbol}</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => removeFromWatchlist(stock.symbol)}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    ${stock.price.toFixed(2)}
                  </div>
                  
                  <div className={`flex items-center gap-1 text-sm ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                      ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Volume: {stock.volume.toLocaleString()}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last updated: {stock.lastUpdated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600">
            <h4 className="font-semibold mb-2">📊 Real-time Stock Data</h4>
            <ul className="space-y-1">
              <li>• Data provided by Alpha Vantage API</li>
              <li>• Free tier: 25 requests per day</li>
              <li>• Updates every 15 minutes during market hours</li>
              <li>• Demo data shown when API limits are reached</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
