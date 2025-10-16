import { ArrowLeft, ShoppingCart, IndianRupee, Check, X } from 'lucide-react';
import { useState } from 'react';

interface BudgetBazaarProps {
  onBack: () => void;
}

interface Item {
  id: number;
  name: string;
  price: number;
  category: 'need' | 'want';
  emoji: string;
}

const availableItems: Item[] = [
  { id: 1, name: 'Rice (5kg)', price: 250, category: 'need', emoji: '🍚' },
  { id: 2, name: 'Vegetables', price: 150, category: 'need', emoji: '🥬' },
  { id: 3, name: 'Milk (1L)', price: 60, category: 'need', emoji: '🥛' },
  { id: 4, name: 'Designer Shirt', price: 2500, category: 'want', emoji: '👔' },
  { id: 5, name: 'School Books', price: 800, category: 'need', emoji: '📚' },
  { id: 6, name: 'Gaming Console', price: 35000, category: 'want', emoji: '🎮' },
  { id: 7, name: 'Medicine', price: 300, category: 'need', emoji: '💊' },
  { id: 8, name: 'Sneakers', price: 4000, category: 'want', emoji: '👟' },
  { id: 9, name: 'Electricity Bill', price: 1200, category: 'need', emoji: '💡' },
  { id: 10, name: 'Restaurant Meal', price: 800, category: 'want', emoji: '🍽️' },
];

export function BudgetBazaar({ onBack }: BudgetBazaarProps) {
  const [budget] = useState(5000);
  const [cart, setCart] = useState<Item[]>([]);
  const [showResult, setShowResult] = useState(false);

  const spent = cart.reduce((sum, item) => sum + item.price, 0);
  const remaining = budget - spent;
  const needsCount = cart.filter(item => item.category === 'need').length;
  const wantsCount = cart.filter(item => item.category === 'want').length;

  const addToCart = (item: Item) => {
    if (spent + item.price <= budget && !cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleComplete = () => {
    setShowResult(true);
  };

  const score = Math.round((needsCount / (needsCount + wantsCount || 1)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6F00] to-[#F4B942] pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-white text-3xl mb-2">Budget Bazaar</h2>
        <p className="text-white/90">Shop smart within your budget!</p>
      </div>

      {/* Budget Meter */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600 text-sm">Monthly Budget</p>
              <div className="flex items-center gap-1 text-2xl text-gray-900">
                <IndianRupee className="w-5 h-5" />
                <span>{budget}</span>
              </div>
            </div>
            <div className={`text-right ${remaining < 0 ? 'text-[#D32F2F]' : 'text-[#4CAF50]'}`}>
              <p className="text-sm">Remaining</p>
              <div className="flex items-center gap-1 text-2xl">
                <IndianRupee className="w-5 h-5" />
                <span>{remaining}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${remaining < 0 ? 'bg-[#D32F2F]' : 'bg-[#4CAF50]'}`}
              style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Shopping Items */}
      <div className="px-6 mb-6">
        <h3 className="text-white mb-3">Available Items</h3>
        <div className="grid grid-cols-2 gap-3">
          {availableItems.map((item) => {
            const inCart = cart.find(i => i.id === item.id);
            const canAfford = spent + item.price <= budget;
            
            return (
              <button
                key={item.id}
                onClick={() => inCart ? removeFromCart(item.id) : addToCart(item)}
                disabled={!inCart && !canAfford}
                className={`bg-white rounded-xl p-4 shadow-card transition-all ${
                  inCart 
                    ? 'ring-2 ring-[#4CAF50]' 
                    : canAfford 
                      ? 'hover:shadow-card-hover active:scale-95' 
                      : 'opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-sm text-gray-900 mb-1">{item.name}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-gray-700">
                    <IndianRupee className="w-3 h-3" />
                    <span className="text-sm">{item.price}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.category === 'need' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {item.category === 'need' ? 'Need' : 'Want'}
                  </span>
                </div>
                {inCart && (
                  <div className="mt-2 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-6">
          <div className="bg-white rounded-2xl p-4 shadow-xl max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#00A86B]" />
                <span className="text-gray-900">{cart.length} items</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-600">{needsCount} Needs</span> • 
                <span className="text-purple-600"> {wantsCount} Wants</span>
              </div>
            </div>
            <button 
              onClick={handleComplete}
              className="w-full bg-[#00A86B] text-white py-3 rounded-xl hover:bg-[#008C5A] transition-all active:scale-98"
            >
              Complete Shopping
            </button>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#F4B942] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">Shopping Complete!</h3>
              <p className="text-gray-600">Here's your financial wisdom score</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                <span className="text-gray-700">Needs Purchased</span>
                <span className="text-green-600">{needsCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <span className="text-gray-700">Wants Purchased</span>
                <span className="text-purple-600">{wantsCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-gray-700">Money Saved</span>
                <div className="flex items-center gap-0.5 text-blue-600">
                  <IndianRupee className="w-4 h-4" />
                  <span>{remaining}</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl text-[#F4B942] mb-2">{score}%</div>
              <p className="text-gray-600">
                {score >= 70 ? 'Excellent budgeting!' : score >= 40 ? 'Good start!' : 'Try focusing more on needs!'}
              </p>
            </div>

            <div className="bg-[#F4B942]/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700 text-center">
                +{cart.length * 10} coins earned! 🎉
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  setCart([]);
                  setShowResult(false);
                }}
                className="py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Try Again
              </button>
              <button 
                onClick={onBack}
                className="py-3 bg-[#00A86B] text-white rounded-xl hover:bg-[#008C5A] transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
