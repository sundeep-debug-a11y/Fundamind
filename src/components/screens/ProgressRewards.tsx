import { Trophy, Award, Coins, TrendingUp, Lock, Crown, Star, Target } from 'lucide-react';
import { useState } from 'react';
import { ProgressRing } from '../ProgressRing';

interface ProgressRewardsProps {
  onBack?: () => void;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

const badges: Badge[] = [
  { id: 1, name: 'First Steps', description: 'Complete first lesson', icon: '👣', unlocked: true },
  { id: 2, name: 'Budget Master', description: 'Complete Budget Bazaar perfectly', icon: '🛒', unlocked: true },
  { id: 3, name: 'Stock Pro', description: 'Make 10 profitable trades', icon: '📈', unlocked: true },
  { id: 4, name: 'Savings Champion', description: 'Grow tree to level 3', icon: '🌳', unlocked: false, progress: 15000, total: 50000 },
  { id: 5, name: 'Credit Guru', description: 'Achieve 750+ credit score', icon: '💳', unlocked: false, progress: 650, total: 750 },
  { id: 6, name: 'CA Foundation Scholar', description: 'Complete all CA chapters', icon: '🎓', unlocked: false, progress: 13, total: 51 },
  { id: 7, name: '7 Day Streak', description: 'Login for 7 consecutive days', icon: '🔥', unlocked: true },
  { id: 8, name: 'Video Binge', description: 'Watch 50 FinShorts', icon: '📱', unlocked: false, progress: 23, total: 50 },
  { id: 9, name: 'Quiz Master', description: 'Answer 100 quizzes correctly', icon: '🎯', unlocked: false, progress: 47, total: 100 },
];

const levels = [
  { level: 1, name: 'Beginner', minXP: 0, maxXP: 1000, color: 'from-gray-400 to-gray-500' },
  { level: 2, name: 'Learner', minXP: 1000, maxXP: 3000, color: 'from-blue-400 to-blue-500' },
  { level: 3, name: 'Expert', minXP: 3000, maxXP: 7000, color: 'from-purple-400 to-purple-500' },
  { level: 4, name: 'Master', minXP: 7000, maxXP: 15000, color: 'from-amber-400 to-amber-500' },
  { level: 5, name: 'Legend', minXP: 15000, maxXP: Infinity, color: 'from-red-400 to-red-500' },
];

const leaderboardData = [
  { rank: 1, name: 'Priya Sharma', city: 'Mumbai', age: '16-20', coins: 15420, avatar: '👧' },
  { rank: 2, name: 'Arjun Patel', city: 'Delhi', age: '16-20', coins: 14850, avatar: '👦' },
  { rank: 3, name: 'Sneha Kumar', city: 'Bangalore', age: '16-20', coins: 13990, avatar: '👩' },
  { rank: 4, name: 'Rahul Kumar', city: 'Mumbai', age: '16-20', coins: 12450, avatar: '👤', isYou: true },
  { rank: 5, name: 'Ananya Singh', city: 'Chennai', age: '16-20', coins: 11230, avatar: '👧' },
];

export function ProgressRewards({ onBack }: ProgressRewardsProps) {
  const [activeTab, setActiveTab] = useState<'badges' | 'level' | 'leaderboard'>('level');
  
  const currentXP = 4200;
  const currentLevel = levels.find(l => currentXP >= l.minXP && currentXP < l.maxXP)!;
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const levelProgress = nextLevel 
    ? ((currentXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      {/* Header */}
      <div className={`gradient-green-teal px-6 pt-12 pb-8 rounded-b-3xl`}>
        <h2 className="text-white text-3xl mb-2">Progress & Rewards</h2>
        <p className="text-white/90">Track your financial literacy journey</p>
      </div>

      {/* Tabs */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
          <button
            onClick={() => setActiveTab('level')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'level'
                ? 'bg-[#00A86B] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Level</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'badges'
                ? 'bg-[#00A86B] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Award className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Badges</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-[#00A86B] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Trophy className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Leaderboard</span>
          </button>
        </div>
      </div>

      <div className="px-6">
        {/* Level Tab */}
        {activeTab === 'level' && (
          <div className="space-y-6">
            {/* Current Level Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Current Level</p>
                  <h3 className="text-3xl text-gray-900">{currentLevel.name}</h3>
                </div>
                <div className={`w-20 h-20 bg-gradient-to-br ${currentLevel.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Crown className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>{currentXP} XP</span>
                  <span>{nextLevel ? `${nextLevel.minXP} XP to ${nextLevel.name}` : 'Max Level!'}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${currentLevel.color} rounded-full transition-all duration-500`}
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[#F4B942] mb-1">
                    <Coins className="w-4 h-4" />
                    <span className="text-xl">2,450</span>
                  </div>
                  <p className="text-xs text-gray-600">Total Coins</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[#00A86B] mb-1">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xl">7</span>
                  </div>
                  <p className="text-xs text-gray-600">Badges</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[#0D47A1] mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-xl">23</span>
                  </div>
                  <p className="text-xs text-gray-600">Games Done</p>
                </div>
              </div>
            </div>

            {/* Level Progression Path */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h4 className="text-gray-900 mb-4">Your Journey</h4>
              <div className="space-y-4">
                {levels.map((level, index) => {
                  const isPassed = currentXP >= level.minXP;
                  const isCurrent = level.level === currentLevel.level;
                  
                  return (
                    <div key={level.level} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isPassed
                          ? `bg-gradient-to-br ${level.color}`
                          : 'bg-gray-200'
                      }`}>
                        {isPassed ? (
                          <Star className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className={isPassed ? 'text-gray-900' : 'text-gray-400'}>
                            {level.name}
                          </h5>
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-[#00A86B] text-white text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {level.minXP.toLocaleString()} - {level.maxXP === Infinity ? '∞' : level.maxXP.toLocaleString()} XP
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h4 className="text-gray-900 mb-2">Badge Collection</h4>
              <p className="text-gray-600 text-sm mb-4">
                {badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#F4B942] to-[#00A86B] rounded-full"
                  style={{ width: `${(badges.filter(b => b.unlocked).length / badges.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <button
                  key={badge.id}
                  className={`bg-white rounded-2xl p-4 shadow-card transition-all ${
                    badge.unlocked 
                      ? 'hover:shadow-card-hover active:scale-95' 
                      : 'opacity-60'
                  }`}
                >
                  <div className="text-4xl mb-2">
                    {badge.unlocked ? badge.icon : '🔒'}
                  </div>
                  <h5 className={`text-xs mb-1 ${badge.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </h5>
                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="mt-2">
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#00A86B] rounded-full"
                          style={{ width: `${(badge.progress! / badge.total!) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {badge.progress}/{badge.total}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white text-[#00A86B] border-2 border-[#00A86B] rounded-xl text-sm">
                City-wise
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm">
                Age-wise
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm">
                National
              </button>
            </div>

            <div className="space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`bg-white rounded-2xl p-4 shadow-card ${
                    user.isYou ? 'ring-2 ring-[#00A86B]' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      user.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      #{user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-gray-900">{user.name}</h5>
                        {user.isYou && (
                          <span className="px-2 py-0.5 bg-[#00A86B] text-white text-xs rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{user.city} • {user.age}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[#F4B942]">
                        <Coins className="w-4 h-4" />
                        <span>{user.coins.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
