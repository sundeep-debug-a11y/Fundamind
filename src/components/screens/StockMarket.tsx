import { ArrowLeft, TrendingUp, TrendingDown, IndianRupee, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';

interface StockMarketProps {
  onBack: () => void;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

const stocks: Stock[] = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3542.50, change: 45.30, changePercent: 1.30, high: 3565, low: 3480 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2458.75, change: -23.50, changePercent: -0.95, high: 2490, low: 2445 },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1523.40, change: 18.20, changePercent: 1.21, high: 1530, low: 1505 },
  { symbol: 'HDFC', name: 'HDFC Bank Limited', price: 1642.30, change: 12.80, changePercent: 0.79, high: 1650, low: 1625 },
  { symbol: 'ICICI', name: 'ICICI Bank Limited', price: 985.60, change: -8.40, changePercent: -0.84, high: 998, low: 982 },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 456.25, change: 5.75, changePercent: 1.28, high: 462, low: 448 },
];

export function StockMarket({ onBack }: StockMarketProps) {
  const [portfolio] = useState({
    value: 125000,
    invested: 100000,
    holdings: [
      { symbol: 'TCS', quantity: 10, avgPrice: 3400 },
      { symbol: 'INFY', quantity: 15, avgPrice: 1480 },
    ],
  });
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [buyQuantity, setBuyQuantity] = useState(1);

  const pnl = portfolio.value - portfolio.invested;
  const pnlPercent = (pnl / portfolio.invested) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] to-[#1976D2] pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-white text-3xl mb-2">Stock Market Simulator</h2>
        <p className="text-white/90">Learn investing with virtual money</p>
      </div>

      {/* Portfolio Summary */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Portfolio Value</p>
              <div className="flex items-center gap-1 text-3xl text-gray-900">
                <IndianRupee className="w-6 h-6" />
                <span>{portfolio.value.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              pnl >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm">{pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs mb-1">Invested</p>
              <div className="flex items-center gap-0.5 text-gray-900">
                <IndianRupee className="w-3 h-3" />
                <span className="text-sm">{portfolio.invested.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Total P&L</p>
              <div className={`flex items-center gap-0.5 ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <IndianRupee className="w-3 h-3" />
                <span className="text-sm">{pnl >= 0 ? '+' : ''}{pnl.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Status */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white text-sm">Market Open</span>
          </div>
          <div className="text-white/80 text-sm">NSE/BSE</div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search stocks..."
            className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Stock List */}
      <div className="px-6">
        <h3 className="text-white mb-3">Top Stocks</h3>
        <div className="space-y-3">
          {stocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => setSelectedStock(stock)}
              className="w-full bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all active:scale-98"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-left flex-1">
                  <h4 className="text-gray-900">{stock.symbol}</h4>
                  <p className="text-xs text-gray-500">{stock.name}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5 text-gray-900 mb-1">
                    <IndianRupee className="w-4 h-4" />
                    <span>{stock.price.toFixed(2)}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>H: ₹{stock.high}</span>
                <span>L: ₹{stock.low}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Buy Modal */}
      {selectedStock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-md shadow-2xl animate-slide-up">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            
            <div className="text-center mb-6">
              <h3 className="text-2xl text-gray-900 mb-1">{selectedStock.symbol}</h3>
              <p className="text-gray-600 text-sm">{selectedStock.name}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Current Price</span>
                <div className="flex items-center gap-0.5 text-xl text-gray-900">
                  <IndianRupee className="w-5 h-5" />
                  <span>{selectedStock.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Change</span>
                <span className={selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBuyQuantity(Math.max(1, buyQuantity - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-all"
                >
                  -
                </button>
                <input
                  type="number"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center text-xl bg-gray-100 rounded-xl py-3 outline-none"
                />
                <button
                  onClick={() => setBuyQuantity(buyQuantity + 1)}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Amount</span>
                <div className="flex items-center gap-0.5 text-xl text-blue-600">
                  <IndianRupee className="w-5 h-5" />
                  <span>{(selectedStock.price * buyQuantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedStock(null)}
                className="py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedStock(null);
                  setBuyQuantity(1);
                }}
                className="py-3 bg-[#00A86B] text-white rounded-xl hover:bg-[#008C5A] transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
