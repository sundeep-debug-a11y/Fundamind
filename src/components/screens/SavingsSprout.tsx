import { ArrowLeft, Droplet, TrendingUp, IndianRupee, Award } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SavingsSproutProps {
  onBack: () => void;
}

const treeStages = [
  { stage: 0, name: 'Seed', minAmount: 0, emoji: '🌱' },
  { stage: 1, name: 'Sprout', minAmount: 5000, emoji: '🌿' },
  { stage: 2, name: 'Sapling', minAmount: 20000, emoji: '🌳' },
  { stage: 3, name: 'Tree', minAmount: 50000, emoji: '🌲' },
  { stage: 4, name: 'Money Tree', minAmount: 100000, emoji: '💰' },
];

const savingsTypes = [
  { id: 'savings', name: 'Savings Account', rate: 4, icon: '🏦', color: 'from-blue-500 to-blue-600' },
  { id: 'fd', name: 'Fixed Deposit', rate: 7, icon: '📈', color: 'from-green-500 to-green-600' },
  { id: 'rd', name: 'Recurring Deposit', rate: 6.5, icon: '💵', color: 'from-purple-500 to-purple-600' },
  { id: 'ppf', name: 'PPF', rate: 7.1, icon: '🏛️', color: 'from-amber-500 to-amber-600' },
];

export function SavingsSprout({ onBack }: SavingsSproutProps) {
  const [totalSavings, setTotalSavings] = useState(15000);
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedType, setSelectedType] = useState('fd');
  const [showDeposit, setShowDeposit] = useState(false);

  const currentStage = treeStages.reduce((stage, tree) => 
    totalSavings >= tree.minAmount ? tree : stage
  , treeStages[0]);

  const nextStage = treeStages.find(tree => tree.minAmount > totalSavings) || treeStages[treeStages.length - 1];
  const progress = nextStage.minAmount > 0 
    ? ((totalSavings - currentStage.minAmount) / (nextStage.minAmount - currentStage.minAmount)) * 100 
    : 100;

  const selectedSavingsType = savingsTypes.find(type => type.id === selectedType)!;
  const projectedValue = totalSavings * Math.pow(1 + selectedSavingsType.rate / 100, 10);

  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (amount > 0) {
      setTotalSavings(totalSavings + amount);
      setDepositAmount('');
      setShowDeposit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-white text-3xl mb-2">Savings Sprout</h2>
        <p className="text-white/90">Watch your money tree grow!</p>
      </div>

      {/* Tree Display */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="text-8xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                {currentStage.emoji}
              </div>
              {totalSavings > 0 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F4B942] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Droplet className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <h3 className="text-2xl text-gray-900 mb-1">{currentStage.name}</h3>
            <p className="text-gray-600">Stage {currentStage.stage + 1} of {treeStages.length}</p>
          </div>

          <div className="bg-gradient-to-br from-[#00A86B] to-[#006B5E] rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center text-white mb-2">
              <span>Total Savings</span>
              <div className="flex items-center gap-1 text-2xl">
                <IndianRupee className="w-5 h-5" />
                <span>{totalSavings.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {currentStage.stage < treeStages.length - 1 && (
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Progress to {nextStage.name}</span>
                <span>{Math.min(100, Math.round(progress))}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                ₹{(nextStage.minAmount - totalSavings).toLocaleString('en-IN')} more to go!
              </p>
            </div>
          )}

          <button
            onClick={() => setShowDeposit(true)}
            className="w-full bg-[#00A86B] text-white py-4 rounded-xl hover:bg-[#008C5A] transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <Droplet className="w-5 h-5" />
            Water Your Tree (Deposit)
          </button>
        </div>
      </div>

      {/* Savings Types */}
      <div className="px-6 mb-6">
        <h3 className="text-white mb-3">Choose Savings Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {savingsTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`bg-white rounded-xl p-4 shadow-card transition-all ${
                selectedType === type.id 
                  ? 'ring-2 ring-white scale-105' 
                  : 'hover:shadow-card-hover'
              }`}
            >
              <div className="text-4xl mb-2">{type.icon}</div>
              <h4 className="text-sm text-gray-900 mb-1">{type.name}</h4>
              <div className="flex items-center gap-1 text-[#4CAF50]">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">{type.rate}% p.a.</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Projection */}
      <div className="px-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white">10 Year Projection</h4>
              <p className="text-white/80 text-sm">With {selectedSavingsType.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/90">Future Value</span>
            <div className="flex items-center gap-1 text-2xl text-[#F4B942]">
              <IndianRupee className="w-5 h-5" />
              <span>{Math.round(projectedValue).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            
            <h3 className="text-2xl text-gray-900 mb-6 text-center">Add to Savings</h3>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Amount to Deposit</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-xl outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[500, 1000, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDepositAmount(amount.toString())}
                  className="py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setShowDeposit(false);
                  setDepositAmount('');
                }}
                className="py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                disabled={!depositAmount || parseInt(depositAmount) <= 0}
                className="py-3 bg-[#4CAF50] text-white rounded-xl hover:bg-[#45a049] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
