import { ArrowLeft, TrendingUp, TrendingDown, Plus, Minus, Search, RefreshCw, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { useMultipleStocks, useStockSearch } from "../hooks/useStockData";
import { POPULAR_US_STOCKS } from "../services/stockApi";
import { StockQuote } from "../services/stockApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface StockMarketSimulatorProps {
  onBack: () => void;
}

interface Holding {
  stock: StockQuote;
  quantity: number;
  avgPrice: number;
}

export function StockMarketSimulator({ onBack }: StockMarketSimulatorProps) {
  const { t } = useLanguage();
  
  // Real-time stock data - Using popular US stocks for better API reliability
  const [watchlist] = useState(POPULAR_US_STOCKS.slice(0, 5)); // Reduced to 5 to avoid rate limits
  const { data: stocks, loading: stocksLoading, error: stocksError, refetch } = useMultipleStocks(watchlist);
  const { results: searchResults, loading: searching, search } = useStockSearch();
  
  // Portfolio state
  const [portfolio, setPortfolio] = useState<Holding[]>([]);
  const [cash, setCash] = useState(100000); // Starting with $100,000
  const [selectedStock, setSelectedStock] = useState<StockQuote | null>(null);
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [showTradeDialog, setShowTradeDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("market");

  // Initialize portfolio with some demo holdings when stocks load
  useEffect(() => {
    if (stocks.length > 0 && portfolio.length === 0) {
      const initialHoldings: Holding[] = [
        { stock: stocks[0], quantity: 5, avgPrice: stocks[0].price * 0.95 },
        { stock: stocks[1], quantity: 10, avgPrice: stocks[1].price * 0.98 },
      ];
      setPortfolio(initialHoldings);
    }
  }, [stocks]);

  // Portfolio calculations
  const portfolioValue = portfolio.reduce((sum, holding) => 
    sum + (holding.stock.price * holding.quantity), 0
  );
  const totalValue = portfolioValue + cash;
  const totalPL = portfolio.reduce((sum, holding) => 
    sum + ((holding.stock.price - holding.avgPrice) * holding.quantity), 0
  );

  const handleTrade = () => {
    if (!selectedStock) return;

    const totalCost = selectedStock.price * tradeQuantity;

    if (tradeType === "buy") {
      if (cash >= totalCost) {
        setCash(cash - totalCost);
        
        const existingHolding = portfolio.find(h => h.stock.symbol === selectedStock.symbol);
        if (existingHolding) {
          const newQuantity = existingHolding.quantity + tradeQuantity;
          const newAvgPrice = ((existingHolding.avgPrice * existingHolding.quantity) + totalCost) / newQuantity;
          
          setPortfolio(portfolio.map(h => 
            h.stock.symbol === selectedStock.symbol 
              ? { ...h, quantity: newQuantity, avgPrice: newAvgPrice }
              : h
          ));
        } else {
          setPortfolio([...portfolio, { 
            stock: selectedStock, 
            quantity: tradeQuantity, 
            avgPrice: selectedStock.price 
          }]);
        }
      }
    } else {
      const holding = portfolio.find(h => h.stock.symbol === selectedStock.symbol);
      if (holding && holding.quantity >= tradeQuantity) {
        setCash(cash + totalCost);
        
        if (holding.quantity === tradeQuantity) {
          setPortfolio(portfolio.filter(h => h.stock.symbol !== selectedStock.symbol));
        } else {
          setPortfolio(portfolio.map(h => 
            h.stock.symbol === selectedStock.symbol 
              ? { ...h, quantity: h.quantity - tradeQuantity }
              : h
          ));
        }
      }
    }

    setShowTradeDialog(false);
    setSelectedStock(null);
    setTradeQuantity(1);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery);
    }
  };

  const openTradeDialog = (stock: StockQuote, type: "buy" | "sell") => {
    setSelectedStock(stock);
    setTradeType(type);
    setTradeQuantity(1);
    setShowTradeDialog(true);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A2332] via-[#006B5E] to-[#0D47A1] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Stock Market Simulator</h1>
          </div>
          <Button 
            onClick={refetch} 
            disabled={stocksLoading}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <RefreshCw className={`w-4 h-4 ${stocksLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-sm opacity-90 font-medium">Cash</span>
            </div>
            <p className="text-xl font-bold">${(cash/1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm opacity-90 font-medium">Portfolio</span>
            </div>
            <p className="text-xl font-bold">${(portfolioValue/1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${totalPL >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {totalPL >= 0 ? <TrendingUp className="w-4 h-4 text-green-300" /> : <TrendingDown className="w-4 h-4 text-red-300" />}
              </div>
              <span className="text-sm opacity-90 font-medium">P&L</span>
            </div>
            <p className={`text-xl font-bold ${totalPL >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {totalPL >= 0 ? '+' : ''}${Math.abs(totalPL) >= 1000 ? (totalPL/1000).toFixed(1) + 'K' : totalPL.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {stocksError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-yellow-800">⚠️ {stocksError}</p>
            <p className="text-sm text-yellow-600 mt-1">Showing demo data. Check your API key or try again later.</p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 rounded-2xl p-1 backdrop-blur-sm">
            <TabsTrigger value="market" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Market
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="search" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Search
            </TabsTrigger>
          </TabsList>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-4">
            {stocksLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p>Loading real-time stock data...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {stocks.map((stock) => (
                  <div key={stock.symbol} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{stock.symbol}</h3>
                            <p className="text-sm text-gray-500">Stock</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 mb-3 px-3 py-1 rounded-full text-sm font-medium ${
                          stock.change >= 0 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                            ({stock.changePercent.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500">
                        <span>Volume: {(stock.volume/1000000).toFixed(1)}M</span>
                        <span className="ml-4">Updated: {stock.lastUpdated}</span>
                      </div>
                      <Button 
                        onClick={() => openTradeDialog(stock, "buy")}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold shadow-sm"
                        size="sm"
                      >
                        Buy Stock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            {portfolio.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No holdings yet</p>
                <p className="text-sm text-gray-400 mt-1">Buy some stocks to get started!</p>
              </div>
            ) : (
              portfolio.map((holding) => {
                const currentValue = holding.stock.price * holding.quantity;
                const totalCost = holding.avgPrice * holding.quantity;
                const pl = currentValue - totalCost;
                const plPercent = (pl / totalCost) * 100;

                return (
                  <div key={holding.stock.symbol} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">{holding.stock.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{holding.stock.symbol}</h3>
                          <p className="text-sm text-gray-500">
                            {holding.quantity} shares @ ${holding.avgPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${currentValue >= 1000 ? (currentValue/1000).toFixed(1) + 'K' : currentValue.toFixed(2)}
                        </p>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                          pl >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {pl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {pl >= 0 ? '+' : ''}${Math.abs(pl) >= 1000 ? (pl/1000).toFixed(1) + 'K' : pl.toFixed(2)} ({plPercent.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={() => openTradeDialog(holding.stock, "buy")}
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-green-200 text-green-700 hover:bg-green-50 font-medium"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Buy More
                      </Button>
                      <Button 
                        onClick={() => openTradeDialog(holding.stock, "sell")}
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-red-200 text-red-700 hover:bg-red-50 font-medium"
                      >
                        <Minus className="w-4 h-4 mr-2" />
                        Sell
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search stocks (e.g., AAPL, GOOGL, TSLA)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={searching}>
                {searching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Search Results:</h3>
                {searchResults.slice(0, 10).map((result) => (
                  <div key={result.symbol} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold">{result.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{result.name}</p>
                        <p className="text-xs text-muted-foreground">{result.region} • {result.currency}</p>
                      </div>
                      <Button 
                        onClick={() => {
                          // Add to watchlist functionality could go here
                          setSearchQuery(result.symbol);
                          handleSearch();
                        }}
                        size="sm"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Trade Dialog */}
      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {tradeType === "buy" ? "Buy" : "Sell"} {selectedStock?.symbol}
            </DialogTitle>
            <DialogDescription>
              Current price: ${selectedStock?.price.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <Input
                type="number"
                min="1"
                value={tradeQuantity}
                onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-bold">
                  ${selectedStock ? (selectedStock.price * tradeQuantity).toFixed(2) : '0.00'}
                </span>
              </div>
              {tradeType === "buy" && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Available Cash:</span>
                  <span>${cash >= 1000 ? (cash/1000).toFixed(0) + 'K' : cash.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowTradeDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleTrade}
                className="flex-1"
                disabled={
                  tradeType === "buy" 
                    ? (selectedStock ? cash < selectedStock.price * tradeQuantity : true)
                    : false
                }
              >
                {tradeType === "buy" ? "Buy" : "Sell"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
