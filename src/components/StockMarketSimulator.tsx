import { ArrowLeft, TrendingUp, TrendingDown, Search, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface Holding {
  stock: Stock;
  quantity: number;
  avgPrice: number;
}

const stocks: Stock[] = [
  { id: "1", symbol: "RELIANCE", name: "Reliance Industries", price: 2456.75, change: 45.30, changePercent: 1.88 },
  { id: "2", symbol: "TCS", name: "Tata Consultancy Services", price: 3678.50, change: -23.15, changePercent: -0.63 },
  { id: "3", symbol: "INFY", name: "Infosys", price: 1534.20, change: 18.90, changePercent: 1.25 },
  { id: "4", symbol: "HDFC", name: "HDFC Bank", price: 1645.80, change: -12.40, changePercent: -0.75 },
  { id: "5", symbol: "ICICI", name: "ICICI Bank", price: 987.35, change: 8.55, changePercent: 0.87 },
  { id: "6", symbol: "BHARTI", name: "Bharti Airtel", price: 876.45, change: 21.30, changePercent: 2.49 },
];

export function StockMarketSimulator({ onBack }: StockMarketSimulatorProps) {
  const [portfolio, setPortfolio] = useState<Holding[]>([
    { stock: stocks[0], quantity: 5, avgPrice: 2420.50 },
    { stock: stocks[2], quantity: 10, avgPrice: 1510.00 },
  ]);
  const [cash, setCash] = useState(50000);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");

  const portfolioValue = portfolio.reduce((sum, holding) => 
    sum + (holding.stock.price * holding.quantity), 0
  );
  const totalValue = portfolioValue + cash;
  const totalPL = portfolio.reduce((sum, holding) => 
    sum + ((holding.stock.price - holding.avgPrice) * holding.quantity), 0
  );

  const handleTrade = () => {
    if (!selectedStock) return;

    if (tradeType === "buy") {
      const cost = selectedStock.price * tradeQuantity;
      if (cost <= cash) {
        const existingHolding = portfolio.find(h => h.stock.id === selectedStock.id);
        if (existingHolding) {
          const newAvgPrice = ((existingHolding.avgPrice * existingHolding.quantity) + cost) / 
                             (existingHolding.quantity + tradeQuantity);
          setPortfolio(portfolio.map(h => 
            h.stock.id === selectedStock.id 
              ? { ...h, quantity: h.quantity + tradeQuantity, avgPrice: newAvgPrice }
              : h
          ));
        } else {
          setPortfolio([...portfolio, { stock: selectedStock, quantity: tradeQuantity, avgPrice: selectedStock.price }]);
        }
        setCash(cash - cost);
        setSelectedStock(null);
      }
    } else {
      const holding = portfolio.find(h => h.stock.id === selectedStock.id);
      if (holding && holding.quantity >= tradeQuantity) {
        const proceeds = selectedStock.price * tradeQuantity;
        if (holding.quantity === tradeQuantity) {
          setPortfolio(portfolio.filter(h => h.stock.id !== selectedStock.id));
        } else {
          setPortfolio(portfolio.map(h => 
            h.stock.id === selectedStock.id 
              ? { ...h, quantity: h.quantity - tradeQuantity }
              : h
          ));
        }
        setCash(cash + proceeds);
        setSelectedStock(null);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white font-semibold">Stock Market</h2>
            <p className="text-white/80 text-sm">Virtual Trading Simulator</p>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-1">Total Value</p>
            <p className="text-white text-xl font-semibold">
              ₹{totalValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-1">P&L</p>
            <p className={`text-xl ${totalPL >= 0 ? 'text-success' : 'text-destructive'} font-semibold`}>
              {totalPL >= 0 ? '+' : ''}₹{totalPL.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Market Index */}
        <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">NIFTY 50</p>
              <p className="text-white font-semibold">21,456.80</p>
            </div>
            <div className="text-right">
              <Badge className="bg-success/20 text-success border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +1.24%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-3">
            <div className="bg-card rounded-2xl p-4 border border-border mb-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Available Cash</span>
                <span className="text-primary font-semibold">
                  ₹{cash.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {portfolio.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No holdings yet</p>
                <p className="text-sm text-muted-foreground mt-2">Start by buying some stocks!</p>
              </div>
            ) : (
              portfolio.map((holding) => {
                const currentValue = holding.stock.price * holding.quantity;
                const invested = holding.avgPrice * holding.quantity;
                const pl = currentValue - invested;
                const plPercent = ((pl / invested) * 100);

                return (
                  <div key={holding.stock.id} className="bg-card rounded-2xl p-4 border border-border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4>{holding.stock.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{holding.stock.name}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedStock(holding.stock);
                          setTradeType("sell");
                          setTradeQuantity(1);
                        }}
                        className="rounded-lg"
                      >
                        Sell
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Qty</p>
                        <p>{holding.quantity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Price</p>
                        <p>₹{holding.avgPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p>₹{holding.stock.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">P&L</p>
                        <p className={pl >= 0 ? 'text-success' : 'text-destructive'}>
                          {pl >= 0 ? '+' : ''}₹{pl.toFixed(2)} ({plPercent.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="stocks" className="space-y-3">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="w-full h-12 pl-10 pr-4 bg-card border border-border rounded-xl outline-none focus:border-primary"
                />
              </div>
            </div>

            {stocks.map((stock) => (
              <div key={stock.id} className="bg-card rounded-2xl p-4 border border-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4>{stock.symbol}</h4>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                    onClick={() => {
                      setSelectedStock(stock);
                      setTradeType("buy");
                      setTradeQuantity(1);
                    }}
                  >
                    Buy
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      ₹{stock.price.toFixed(2)}
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`${
                      stock.change >= 0 
                        ? 'border-success text-success' 
                        : 'border-destructive text-destructive'
                    }`}
                  >
                    {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="watchlist" className="text-center py-12">
            <p className="text-muted-foreground">No stocks in watchlist</p>
            <p className="text-sm text-muted-foreground mt-2">Add stocks to track them here</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Trade Dialog */}
      <Dialog open={selectedStock !== null} onOpenChange={() => setSelectedStock(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{tradeType === "buy" ? "Buy" : "Sell"} {selectedStock?.symbol}</DialogTitle>
            <DialogDescription>{selectedStock?.name}</DialogDescription>
          </DialogHeader>
          
          {selectedStock && (
            <div className="space-y-4">
              <div className="bg-muted rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                <p className="text-2xl font-semibold">
                  ₹{selectedStock.price.toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 1))}
                    className="rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <input
                    type="number"
                    value={tradeQuantity}
                    onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 h-12 text-center bg-card border border-border rounded-xl outline-none focus:border-primary"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTradeQuantity(tradeQuantity + 1)}
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Total Amount</span>
                  <span className="font-semibold">
                    ₹{(selectedStock.price * tradeQuantity).toFixed(2)}
                  </span>
                </div>
                {tradeType === "buy" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Cash</span>
                    <span className={cash >= selectedStock.price * tradeQuantity ? 'text-success' : 'text-destructive'}>
                      ₹{cash.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedStock(null)} className="flex-1 rounded-xl">
                  Cancel
                </Button>
                <Button 
                  onClick={handleTrade}
                  disabled={tradeType === "buy" && cash < selectedStock.price * tradeQuantity}
                  className={`flex-1 rounded-xl ${
                    tradeType === "buy" 
                      ? "bg-primary hover:bg-primary/90" 
                      : "bg-destructive hover:bg-destructive/90"
                  } text-white`}
                >
                  {tradeType === "buy" ? "Buy Now" : "Sell Now"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
