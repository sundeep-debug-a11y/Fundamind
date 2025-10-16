import { ArrowLeft, ShoppingCart, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface BudgetBazaarProps {
  onBack: () => void;
}

interface Item {
  id: string;
  name: string;
  price: number;
  category: "need" | "want";
  emoji: string;
}

const storeItems: Item[] = [
  { id: "1", name: "Rice (5kg)", price: 250, category: "need", emoji: "🌾" },
  { id: "2", name: "Vegetables", price: 150, category: "need", emoji: "🥬" },
  { id: "3", name: "Milk (1L)", price: 60, category: "need", emoji: "🥛" },
  { id: "4", name: "Sneakers", price: 2500, category: "want", emoji: "👟" },
  { id: "5", name: "Smartphone", price: 15000, category: "want", emoji: "📱" },
  { id: "6", name: "Cooking Oil", price: 180, category: "need", emoji: "🧴" },
  { id: "7", name: "Gaming Console", price: 35000, category: "want", emoji: "🎮" },
  { id: "8", name: "School Books", price: 800, category: "need", emoji: "📚" },
  { id: "9", name: "Movie Ticket", price: 250, category: "want", emoji: "🎬" },
  { id: "10", name: "Medicine", price: 300, category: "need", emoji: "💊" },
];

export function BudgetBazaar({ onBack }: BudgetBazaarProps) {
  const [budget] = useState(5000);
  const [cart, setCart] = useState<Item[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totalSpent = cart.reduce((sum, item) => sum + item.price, 0);
  const remaining = budget - totalSpent;
  const budgetUsedPercent = (totalSpent / budget) * 100;

  const needsCount = cart.filter(item => item.category === "need").length;
  const wantsCount = cart.filter(item => item.category === "want").length;

  const addToCart = (item: Item) => {
    if (totalSpent + item.price <= budget) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const finishShopping = () => {
    setShowResult(true);
  };

  const needsRatio = cart.length > 0 ? (needsCount / cart.length) * 100 : 0;
  const coinsEarned = Math.floor(needsRatio * 5);

  if (showResult) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="mb-2 font-semibold">
              Shopping Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              Great job managing your budget
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between p-4 bg-background rounded-xl">
                <span>Total Spent</span>
                <span className="font-medium">₹{totalSpent}</span>
              </div>
              <div className="flex justify-between p-4 bg-background rounded-xl">
                <span>Remaining</span>
                <span className="font-medium text-success">₹{remaining}</span>
              </div>
              <div className="flex justify-between p-4 bg-background rounded-xl">
                <span>Needs vs Wants</span>
                <span className="font-medium">{needsCount} / {wantsCount}</span>
              </div>
              <div className="flex justify-between p-4 bg-primary/10 rounded-xl">
                <span className="text-primary">Coins Earned</span>
                <span className="font-medium text-primary">+{coinsEarned} 🪙</span>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-xl text-left">
              <h4 className="text-sm text-trust-blue mb-2">💡 Learning Tip</h4>
              <p className="text-sm text-muted-foreground">
                {needsRatio >= 70 
                  ? "Excellent! You prioritized needs over wants. This is smart budgeting!"
                  : "Try to focus more on needs (70%) and limit wants (30%) for better financial health."}
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl">
                Back to Home
              </Button>
              <Button onClick={() => setShowResult(false)} className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl">
                Play Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 px-6 pt-12 pb-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white font-semibold">Budget Bazaar</h2>
            <p className="text-white/80 text-sm">Shop smart within your budget</p>
          </div>
        </div>

        {/* Budget Meter */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex justify-between mb-2">
            <span className="text-white text-sm">Budget Used</span>
            <span className="text-white">₹{totalSpent} / ₹{budget}</span>
          </div>
          <Progress 
            value={budgetUsedPercent} 
            className={`h-3 ${budgetUsedPercent > 90 ? "bg-red-200" : "bg-white/30"}`}
          />
          <p className="text-white/80 text-sm mt-2">
            Remaining: ₹{remaining}
          </p>
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="px-6 py-4 bg-card border-b border-border sticky top-[180px] z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm">Cart: {cart.length} items</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs border-success text-success">
                    Needs: {needsCount}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-alert text-alert">
                    Wants: {wantsCount}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={finishShopping}
              disabled={cart.length === 0}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}

      {/* Store Items */}
      <div className="px-6 py-6">
        <h3 className="mb-4 font-semibold">Available Items</h3>
        <div className="grid grid-cols-2 gap-4">
          {storeItems.map((item) => {
            const inCart = cart.filter(i => i.id === item.id).length;
            const canAfford = totalSpent + item.price <= budget;
            
            return (
              <div key={item.id} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
                <div className="text-4xl mb-2 text-center">{item.emoji}</div>
                <h4 className="text-sm mb-1">{item.name}</h4>
                <p className="mb-2">₹{item.price}</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs mb-3 ${
                    item.category === "need" 
                      ? "border-success text-success" 
                      : "border-alert text-alert"
                  }`}
                >
                  {item.category === "need" ? "Need" : "Want"}
                </Badge>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => addToCart(item)}
                    disabled={!canAfford}
                    className={`flex-1 h-9 text-xs rounded-lg ${
                      canAfford 
                        ? "bg-primary hover:bg-primary/90 text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {canAfford ? "Add" : "Over Budget"}
                  </Button>
                  {inCart > 0 && (
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="outline"
                      className="h-9 px-3 text-xs rounded-lg"
                    >
                      {inCart}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-trust-blue flex-shrink-0" />
          <div>
            <h4 className="text-sm text-trust-blue mb-1">Budget Rule</h4>
            <p className="text-xs text-muted-foreground">
              Prioritize needs over wants. A good budget spends 70% on needs and 30% on wants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
