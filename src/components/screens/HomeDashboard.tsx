import { Bell, Coins, Flame, ShoppingCart, TrendingUp, Sprout, CreditCard, Zap, Award, Calendar, ChevronRight } from 'lucide-react';
import { GameCard } from '../GameCard';
import { ProgressRing } from '../ProgressRing';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomeDashboardProps {
  onNavigate: (screen: string) => void;
}

const videoThumbnails = [
  { id: 1, title: '5 Tips to Save Money', duration: '0:45', views: '12K', category: 'Daily Tips' },
  { id: 2, title: 'Myth: Credit Cards are Bad', duration: '1:20', views: '8.5K', category: 'Myth Busters' },
  { id: 3, title: 'Understanding GST Basics', duration: '2:15', views: '15K', category: 'CA Syllabus' },
  { id: 4, title: 'Real Story: Debt Free Journey', duration: '3:00', views: '20K', category: 'Real Stories' },
];

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      {/* Top Header */}
      <div className="gradient-green-teal px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <h3 className="text-white">Rahul Kumar</h3>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[#F4B942] mb-1">
              <Coins className="w-4 h-4" />
              <span className="text-sm">Coins</span>
            </div>
            <p className="text-white text-xl">2,450</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[#FF6F00] mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-sm">Streak</span>
            </div>
            <p className="text-white text-xl">7 days</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-white mb-1">
              <Award className="w-4 h-4" />
              <span className="text-sm">Level</span>
            </div>
            <p className="text-white text-xl">Expert</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Daily Challenge Card */}
        <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#F4B942]/10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#F4B942]" />
              </div>
              <div>
                <h4 className="text-gray-900">Daily Challenge</h4>
                <p className="text-sm text-gray-500">Complete today's quiz</p>
              </div>
            </div>
            <ProgressRing progress={65} size={60} strokeWidth={5}>
              <span className="text-xs text-[#00A86B]">65%</span>
            </ProgressRing>
          </div>
          <button className="w-full bg-[#00A86B] text-white py-3 rounded-xl hover:bg-[#008C5A] transition-all active:scale-98">
            Continue Challenge
          </button>
        </div>

        {/* Game Modules */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Learning Games</h3>
            <button className="text-[#00A86B] text-sm flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <GameCard
              title="Budget Bazaar"
              subtitle="Learn smart shopping"
              icon={<ShoppingCart className="w-8 h-8" />}
              progress={75}
              gradient="bg-gradient-to-br from-[#FF6F00] to-[#F4B942]"
              onClick={() => onNavigate('budget-bazaar')}
            />
            <GameCard
              title="Stock Market"
              subtitle="Invest & grow"
              icon={<TrendingUp className="w-8 h-8" />}
              progress={45}
              gradient="bg-gradient-to-br from-[#0D47A1] to-[#1976D2]"
              onClick={() => onNavigate('stock-market')}
            />
            <GameCard
              title="Savings Sprout"
              subtitle="Grow your money tree"
              icon={<Sprout className="w-8 h-8" />}
              progress={30}
              gradient="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]"
              onClick={() => onNavigate('savings-sprout')}
            />
            <GameCard
              title="Credit Quest"
              subtitle="Build credit score"
              icon={<CreditCard className="w-8 h-8" />}
              progress={0}
              isLocked={false}
              gradient="bg-gradient-to-br from-[#9C27B0] to-[#BA68C8]"
              onClick={() => onNavigate('credit-quest')}
            />
          </div>
        </div>

        {/* FinShorts Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00A86B]" />
              <h3 className="text-gray-900">FinShorts</h3>
            </div>
            <button 
              onClick={() => onNavigate('finshorts')}
              className="text-[#00A86B] text-sm flex items-center gap-1"
            >
              Watch All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {videoThumbnails.map((video) => (
              <button
                key={video.id}
                onClick={() => onNavigate('finshorts')}
                className="flex-shrink-0 w-32 group"
              >
                <div className="relative h-56 bg-gradient-to-br from-[#00A86B] to-[#006B5E] rounded-2xl overflow-hidden mb-2 shadow-card group-hover:shadow-card-hover transition-all">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1644150196229-c1d6321406fa?w=400"
                    alt={video.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <p className="text-white text-xs line-clamp-2">{video.title}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-0.5">
                    <span className="text-white text-xs">{video.duration}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{video.views} views</div>
              </button>
            ))}
          </div>
        </div>

        {/* CA Syllabus Quick Access */}
        <div className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-white mb-1">CA Syllabus Learning</h4>
              <p className="text-white/80 text-sm mb-4">Continue your journey to CA Foundation</p>
              <button 
                onClick={() => onNavigate('ca-syllabus')}
                className="bg-white text-[#0D47A1] px-6 py-2 rounded-xl hover:shadow-lg transition-all active:scale-95"
              >
                Start Learning
              </button>
            </div>
            <Award className="w-16 h-16 text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
