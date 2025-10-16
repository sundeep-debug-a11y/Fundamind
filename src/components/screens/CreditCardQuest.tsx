import { ArrowLeft, Shield, Heart, Plane, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { ProgressRing } from '../ProgressRing';

interface CreditCardQuestProps {
  onBack: () => void;
}

interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: string;
  choices: {
    text: string;
    impact: number;
    reason: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Medical Emergency',
    description: 'Your family member needs urgent medical treatment costing ₹50,000. You have ₹30,000 in savings.',
    icon: '🏥',
    choices: [
      { 
        text: 'Use credit card for full amount', 
        impact: -15,
        reason: 'High interest rates can lead to debt accumulation. Better to use partial credit.' 
      },
      { 
        text: 'Use savings + Credit card for remaining', 
        impact: 10,
        reason: 'Smart choice! Using savings first and credit for the gap is financially wise.' 
      },
      { 
        text: 'Take personal loan', 
        impact: -10,
        reason: 'Personal loans have high interest. Credit card with quick repayment is better for emergencies.' 
      },
    ],
  },
  {
    id: 2,
    title: 'Wedding Shopping',
    description: 'Your cousin\'s wedding is next month. You want to buy new clothes and gifts worth ₹25,000.',
    icon: '💍',
    choices: [
      { 
        text: 'Buy everything on EMI', 
        impact: -20,
        reason: 'EMI for wants leads to unnecessary debt. Weddings are planned events - save in advance!' 
      },
      { 
        text: 'Buy only what you can afford now', 
        impact: 15,
        reason: 'Excellent! Living within means prevents debt and maintains good credit health.' 
      },
      { 
        text: 'Max out credit card now, pay later', 
        impact: -25,
        reason: 'Maxing out credit cards hurts your credit score and creates payment stress.' 
      },
    ],
  },
  {
    id: 3,
    title: 'Flight Booking Offer',
    description: 'Your dream vacation flight has 50% off if booked now. The trip is in 6 months. Cost: ₹40,000.',
    icon: '✈️',
    choices: [
      { 
        text: 'Book with credit card and save monthly', 
        impact: 10,
        reason: 'Good strategy! The discount saves money, and you have time to pay before interest kicks in.' 
      },
      { 
        text: 'Skip the offer and save first', 
        impact: 5,
        reason: 'Safe choice, but you miss the discount. Sometimes using credit strategically is smart.' 
      },
      { 
        text: 'Book and worry about payment later', 
        impact: -15,
        reason: 'Risky! Always have a repayment plan before making big purchases.' 
      },
    ],
  },
];

export function CreditCardQuest({ onBack }: CreditCardQuestProps) {
  const [creditScore, setCreditScore] = useState(650);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const scenario = scenarios[currentScenario];
  const scoreColor = creditScore >= 750 ? '#4CAF50' : creditScore >= 650 ? '#F4B942' : '#D32F2F';
  const scoreLabel = creditScore >= 750 ? 'Excellent' : creditScore >= 650 ? 'Good' : 'Fair';

  const handleChoice = (choiceIndex: number) => {
    const choice = scenario.choices[choiceIndex];
    setSelectedChoice(choiceIndex);
    setShowResult(true);
    
    setTimeout(() => {
      const newScore = Math.min(900, Math.max(300, creditScore + choice.impact));
      setCreditScore(newScore);
      
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
          setSelectedChoice(null);
          setShowResult(false);
        } else {
          setGameComplete(true);
        }
      }, 2000);
    }, 2000);
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#9C27B0] to-[#BA68C8] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-[#F4B942] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🏆</span>
            </div>
            <h3 className="text-2xl text-gray-900 mb-2">Quest Complete!</h3>
            <p className="text-gray-600">Your financial wisdom journey</p>
          </div>

          <div className="mb-6">
            <ProgressRing progress={(creditScore / 900) * 100} size={120} color={scoreColor}>
              <div className="text-center">
                <div className="text-2xl" style={{ color: scoreColor }}>{creditScore}</div>
                <div className="text-xs text-gray-500">{scoreLabel}</div>
              </div>
            </ProgressRing>
          </div>

          <div className="bg-gradient-to-r from-[#9C27B0] to-[#BA68C8] rounded-2xl p-4 mb-6 text-white text-center">
            <p className="mb-1">Final Credit Score</p>
            <p className="text-2xl">{creditScore} / 900</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Scenarios Completed</span>
              <span className="text-[#9C27B0]">{scenarios.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Coins Earned</span>
              <span className="text-[#F4B942]">+150</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                setCreditScore(650);
                setCurrentScenario(0);
                setGameComplete(false);
                setSelectedChoice(null);
                setShowResult(false);
              }}
              className="py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
            >
              Play Again
            </button>
            <button 
              onClick={onBack}
              className="py-3 bg-[#9C27B0] text-white rounded-xl hover:bg-[#8E24AA] transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9C27B0] to-[#BA68C8] pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-white text-3xl mb-2">Credit Card Quest</h2>
        <p className="text-white/90">Make smart choices, build your score!</p>
      </div>

      {/* Credit Score Display */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Your Credit Score</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl" style={{ color: scoreColor }}>{creditScore}</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  backgroundColor: `${scoreColor}20`,
                  color: scoreColor 
                }}>
                  {scoreLabel}
                </span>
              </div>
            </div>
            <ProgressRing progress={(creditScore / 900) * 100} size={80} color={scoreColor}>
              <span className="text-xs text-gray-500">/900</span>
            </ProgressRing>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${(creditScore / 900) * 100}%`,
                backgroundColor: scoreColor 
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>300</span>
            <span>900</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between text-white/90 text-sm mb-2">
          <span>Scenario {currentScenario + 1} of {scenarios.length}</span>
          <span>{Math.round(((currentScenario + 1) / scenarios.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{scenario.icon}</div>
            <h3 className="text-xl text-gray-900 mb-2">{scenario.title}</h3>
            <p className="text-gray-600">{scenario.description}</p>
          </div>

          <div className="space-y-3">
            {scenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleChoice(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showResult && selectedChoice === index
                    ? choice.impact > 0
                      ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                      : 'border-[#D32F2F] bg-[#D32F2F]/10'
                    : 'border-gray-200 hover:border-[#9C27B0] hover:bg-[#9C27B0]/5'
                } ${showResult ? 'cursor-not-allowed' : 'active:scale-98'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex-1">{choice.text}</span>
                  {showResult && selectedChoice === index && (
                    <div className={`flex items-center gap-1 text-sm ${
                      choice.impact > 0 ? 'text-[#4CAF50]' : 'text-[#D32F2F]'
                    }`}>
                      {choice.impact > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{choice.impact > 0 ? '+' : ''}{choice.impact}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && selectedChoice !== null && (
            <div className={`mt-6 p-4 rounded-xl ${
              scenario.choices[selectedChoice].impact > 0 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${
                scenario.choices[selectedChoice].impact > 0 ? 'text-green-900' : 'text-red-900'
              }`}>
                💡 {scenario.choices[selectedChoice].reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
