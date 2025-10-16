import { Bell, Coins, Flame, TrendingUp, Lock, Play, ChevronRight, CalendarDays, Star, Target, BarChart3, X } from "lucide-react";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ProgressRing } from "./ProgressRing";
import { useState } from "react";

interface HomeDashboardProps {
  onNavigateToGame: (game: string) => void;
  onNavigateToVideos: () => void;
  onNavigate: (screen: string) => void;
}

const games = [
  {
    id: "budget-bazaar",
    title: "Budget Bazaar",
    subtitle: "Master smart shopping",
    icon: "🛒",
    color: "from-orange-400 to-red-500",
    unlocked: true,
    progress: 65,
    image: "https://images.unsplash.com/photo-1678274324663-afc2c68eeeec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYXJrZXRwbGFjZSUyMHNob3BwaW5nfGVufDF8fHx8MTc2MDQ5MzQ2MHww&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "stock-market",
    title: "Stock Market Simulator",
    subtitle: "Learn to invest wisely",
    icon: "📈",
    color: "from-blue-400 to-indigo-600",
    unlocked: true,
    progress: 40,
    image: "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0fGVufDF8fHx8MTc2MDQwNzc4M3ww&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "savings-sprout",
    title: "Savings Sprout",
    subtitle: "Grow your money tree",
    icon: "🌱",
    color: "from-green-400 to-emerald-600",
    unlocked: true,
    progress: 80,
    image: "https://images.unsplash.com/photo-1579621970590-9d624316904b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMHRyZWUlMjBncm93dGh8ZW58MXx8fHwxNzYwNDkzNDYxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "credit-card-quest",
    title: "Credit Card Quest",
    subtitle: "Build your credit score",
    icon: "💳",
    color: "from-purple-400 to-pink-600",
    unlocked: false,
    progress: 0,
    image: "https://images.unsplash.com/photo-1640545232493-9a9b5c88ede4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVkaXQlMjBjYXJkJTIwZmluYW5jaWFsfGVufDF8fHx8MTc2MDQ5MzQ2MXww&ixlib=rb-4.1.0&q=80&w=400"
  },
];

const finShorts = [
  { id: 1, title: "5 Money Mistakes to Avoid", category: "Daily Tips", duration: "0:45", thumbnail: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400" },
  { id: 2, title: "GST Simplified", category: "CA Syllabus", duration: "1:20", thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400" },
  { id: 3, title: "Real Estate Investment Guide", category: "Myth Busters", duration: "2:10", thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400" },
  { id: 4, title: "How I Saved ₹1 Lakh", category: "Real Stories", duration: "1:50", thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400" },
];

export function HomeDashboard({ onNavigateToGame, onNavigateToVideos, onNavigate }: HomeDashboardProps) {
  const [activeChip, setActiveChip] = useState('challenge');
  const [showAchievement, setShowAchievement] = useState(true);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
  const hours = now.getHours();
  const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
  return (
    <div className="min-h-screen w-full bg-background pb-16">
      {/* Top Bar */}
      <div className="w-full bg-white border-b border-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 overflow-hidden">
            <ImageWithFallback src="/fundamind-logo.png/WhatsApp%20Image%202025-10-16%20at%2018.30.14_2027928d.jpg" alt="FUNDAMIND" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-semibold">FUNDAMIND</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full"></span>
          </button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="relative z-0 bg-gradient-to-br from-[#1A2332] to-[#006B5E] px-4 pt-8 pb-8 rounded-b-3xl shadow overflow-hidden">
        <div className="mb-2 text-white">
          <p className="text-sm opacity-90">{dateStr}</p>
          <h2 className="text-2xl mt-1 font-semibold">{greeting}, Arjun</h2>
          <p className="text-white/80">Your financial learning journey</p>
        </div>
      </div>

      {/* Learning Stats Card */}
      <div className="px-4 mt-6 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center justify-center flex-none">
            <ProgressRing progress={67} size={112} strokeWidth={7} color={"var(--primary)"}>
              <div className="flex flex-col items-center text-center leading-tight max-w-[88px] mx-auto">
                <div className="text-lg font-semibold">2/3</div>
                <div className="text-sm text-muted-foreground">Today</div>
                <div className="w-full text-sm text-muted-foreground mt-0.5 sm:mt-1 break-words">Almost there!</div>
              </div>
            </ProgressRing>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3 min-w-0">
            <div className="bg-muted rounded-xl p-3">
              <div className="text-xs text-muted-foreground">Streak</div>
              <div className="flex items-center gap-1 mt-1"><Flame className="w-4 h-4 text-alert" /><span className="text-sm font-medium">7 days</span></div>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <div className="text-xs text-muted-foreground">Points</div>
              <div className="flex items-center gap-1 mt-1"><Star className="w-4 h-4 text-accent" /><span className="text-sm font-medium">2,450</span></div>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <div className="text-xs text-muted-foreground">Level</div>
              <div className="flex items-center gap-1 mt-1"><TrendingUp className="w-4 h-4 text-info" /><span className="text-sm font-medium">8</span></div>
            </div>
            <div className="col-span-3 mt-1 min-w-0 flex justify-start">
              <Button
                size="xl"
                className="w-auto rounded-xl h-12 px-6 inline-flex items-center justify-center text-center whitespace-nowrap"
                onClick={() => onNavigate('learn')}
              >
                <span className="whitespace-nowrap">Continue Learning</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Chips */}
      <div className="px-4 mb-6 -mx-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4">
          {[
            { id: 'challenge', label: 'Daily Challenge', icon: Target },
            { id: 'stocks', label: 'Stock Market', icon: TrendingUp },
            { id: 'budget', label: 'Budget Practice', icon: Coins },
            { id: 'ca', label: 'CA Syllabus', icon: CalendarDays },
            { id: 'insights', label: 'My Portfolio', icon: BarChart3 },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                setActiveChip(chip.id);
                switch (chip.id) {
                  case 'challenge':
                    onNavigate('games');
                    break;
                  case 'stocks':
                    onNavigate('stock-market');
                    break;
                  case 'budget':
                    onNavigate('budget-bazaar');
                    break;
                  case 'ca':
                    onNavigate('learn');
                    break;
                  case 'insights':
                    onNavigate('insights');
                    break;
                }
              }}
              aria-pressed={activeChip === chip.id}
              className={`flex items-center gap-2 px-3 h-9 rounded-full text-sm whitespace-nowrap active:scale-95 transition border ${
                activeChip === chip.id
                  ? 'bg-accent text-accent-foreground border-transparent'
                  : 'bg-card text-foreground border-border'
              }`}
            >
              <chip.icon className={`w-4 h-4 ${activeChip === chip.id ? 'text-accent-foreground' : 'text-foreground'}`} />
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Your Learning Path */}
      <div className="px-4 mt-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Your Learning Path</h3>
          <button className="text-primary text-sm flex items-center gap-1" onClick={() => onNavigate('games')}>
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => game.unlocked && onNavigateToGame(game.id)}
              className="relative bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all active:scale-95 text-left"
            >
              <div className={`h-36 bg-gradient-to-br ${game.color} relative`}>
                <ImageWithFallback
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute top-2 right-2 text-3xl drop-shadow">{game.icon}</div>
                {!game.unlocked && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm mb-0.5 font-semibold">{game.title}</h4>
                  <Badge className={`text-[10px] border-0 ${
                    !game.unlocked
                      ? 'bg-muted text-muted-foreground'
                      : game.progress >= 100
                        ? 'bg-success/10 text-success'
                        : game.progress > 0
                          ? 'bg-info/10 text-info'
                          : 'bg-muted text-muted-foreground'
                  }`}>
                    {!game.unlocked ? 'Locked' : game.progress >= 100 ? 'Completed' : game.progress > 0 ? 'In Progress' : 'Not Started'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{game.subtitle} • 15 min</p>
                {game.unlocked && (
                  <Progress value={game.progress} className="h-1.5" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Learning Videos */}
      <div className="px-4 mt-4 mb-32 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">FinShort</h3>
          <button 
            onClick={onNavigateToVideos}
            className="text-primary text-sm flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-24 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
          {finShorts.map((short) => (
            <button
              key={short.id}
              onClick={onNavigateToVideos}
              className="flex-none w-36 sm:w-40 group snap-start"
            >
              <div className="relative rounded-xl overflow-hidden mb-2 aspect-[9/16] bg-card shadow-sm">
                <ImageWithFallback
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <Badge className="text-[10px] bg-white/20 text-white border-0 mb-1">
                    {short.category}
                  </Badge>
                  <p className="text-white text-xs line-clamp-2">{short.title}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-[10px]">{short.duration}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
