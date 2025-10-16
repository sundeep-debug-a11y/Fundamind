import { ArrowLeft, Trophy, Award, Zap, Star, TrendingUp, Users } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface RewardsProgressProps {
  onBack: () => void;
}

const levelPath = [
  { name: "Beginner", xpRequired: 100, unlocked: true, current: false },
  { name: "Learner", xpRequired: 300, unlocked: true, current: false },
  { name: "Expert", xpRequired: 500, unlocked: true, current: true },
  { name: "Master", xpRequired: 1000, unlocked: false, current: false },
  { name: "Legend", xpRequired: 2000, unlocked: false, current: false },
];

const badges = [
  { id: 1, name: "Budget Master", icon: "🏆", category: "Games", unlocked: true, rarity: "gold" },
  { id: 2, name: "Stock Pro", icon: "📈", category: "Games", unlocked: true, rarity: "silver" },
  { id: 3, name: "7-Day Streak", icon: "🔥", category: "Engagement", unlocked: true, rarity: "bronze" },
  { id: 4, name: "Quiz Champion", icon: "🎯", category: "Learning", unlocked: true, rarity: "gold" },
  { id: 5, name: "Tax Saver", icon: "💰", category: "CA Syllabus", unlocked: false, rarity: "gold" },
  { id: 6, name: "CA Foundation Scholar", icon: "📚", category: "CA Syllabus", unlocked: false, rarity: "platinum" },
  { id: 7, name: "First Investment", icon: "💎", category: "Games", unlocked: true, rarity: "silver" },
  { id: 8, name: "Social Sharer", icon: "🎁", category: "Engagement", unlocked: true, rarity: "bronze" },
  { id: 9, name: "Perfect Week", icon: "⭐", category: "Engagement", unlocked: false, rarity: "gold" },
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", coins: 5420, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
  { rank: 2, name: "Rahul Verma", coins: 4890, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
  { rank: 3, name: "Anjali Patel", coins: 4650, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" },
  { rank: 4, name: "Vikram Singh", coins: 3980, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram" },
  { rank: 5, name: "Sneha Reddy", coins: 3720, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
  { rank: 12, name: "You (Arjun)", coins: 2450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", isUser: true },
];

export function RewardsProgress({ onBack }: RewardsProgressProps) {
  const currentLevel = levelPath.find(l => l.current)!;
  const currentXP = 350;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "platinum": return "from-purple-400 to-pink-400";
      case "gold": return "from-yellow-400 to-orange-400";
      case "silver": return "from-gray-300 to-gray-400";
      case "bronze": return "from-orange-300 to-yellow-600";
      default: return "from-gray-200 to-gray-300";
    }
  };

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F4B942] to-[#FF6F00] px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white font-semibold">Progress & Rewards</h2>
            <p className="text-white/80 text-sm">Track your achievements</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/80 text-sm">Current Level</p>
              <h3 className="text-white font-semibold">{currentLevel.name}</h3>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
          <Progress value={(currentXP / currentLevel.xpRequired) * 100} className="h-2 bg-white/30 mb-2" />
          <p className="text-white/90 text-sm">
            {currentXP} / {currentLevel.xpRequired} XP
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="levels" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="levels">Levels</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Level Path */}
          <TabsContent value="levels" className="space-y-4">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              {/* Level Nodes */}
              <div className="space-y-6">
                {levelPath.map((level, index) => (
                  <div key={level.name} className="relative flex items-start gap-4">
                    {/* Node */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      level.unlocked 
                        ? level.current 
                          ? 'bg-primary shadow-lg shadow-primary/50' 
                          : 'bg-success'
                        : 'bg-muted'
                    }`}>
                      {level.unlocked ? (
                        level.current ? (
                          <Zap className="w-6 h-6 text-white" />
                        ) : (
                          <Star className="w-6 h-6 text-white fill-white" />
                        )
                      ) : (
                        <span className="text-muted-foreground">{index + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 bg-card rounded-2xl p-4 border ${
                      level.current ? 'border-primary shadow-md' : 'border-border'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{level.name}</h4>
                        {level.current && (
                          <Badge className="bg-primary/10 text-primary border-0">Current</Badge>
                        )}
                        {level.unlocked && !level.current && (
                          <Badge className="bg-success/10 text-success border-0">Completed ✓</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {level.unlocked 
                          ? `Unlocked at ${level.xpRequired} XP`
                          : `Unlock at ${level.xpRequired} XP`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Info */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-5 text-white mt-6">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-8 h-8" />
                <div>
                  <h4 className="font-semibold">Keep Learning!</h4>
                  <p className="text-white/80 text-sm">Earn XP by completing games and lessons</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-white/20 text-white border-0">+10 XP per game</Badge>
                <Badge className="bg-white/20 text-white border-0">+5 XP per lesson</Badge>
              </div>
            </div>
          </TabsContent>

          {/* Badges */}
          <TabsContent value="badges" className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-card rounded-2xl p-3 border border-border text-center">
                <p className="text-2xl mb-1">6</p>
                <p className="text-xs text-muted-foreground">Unlocked</p>
              </div>
              <div className="bg-card rounded-2xl p-3 border border-border text-center">
                <p className="text-2xl mb-1">3</p>
                <p className="text-xs text-muted-foreground">Locked</p>
              </div>
              <div className="bg-card rounded-2xl p-3 border border-border text-center">
                <p className="text-2xl mb-1">67%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Badge variant="outline" className="bg-primary text-white border-primary whitespace-nowrap">
                All
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">Games</Badge>
              <Badge variant="outline" className="whitespace-nowrap">Learning</Badge>
              <Badge variant="outline" className="whitespace-nowrap">Engagement</Badge>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <button
                  key={badge.id}
                  className={`bg-card rounded-2xl p-4 border-2 text-center transition-all ${
                    badge.unlocked 
                      ? 'border-border hover:shadow-md active:scale-95' 
                      : 'border-border opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} mx-auto mb-2 flex items-center justify-center text-3xl shadow-lg ${
                    !badge.unlocked ? 'grayscale' : ''
                  }`}>
                    {badge.unlocked ? badge.icon : '🔒'}
                  </div>
                  <p className="text-xs line-clamp-2">{badge.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{badge.category}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-4">
            {/* Time Filter */}
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary text-white border-primary">
                This Week
              </Badge>
              <Badge variant="outline">This Month</Badge>
              <Badge variant="outline">All Time</Badge>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Badge variant="outline" className="bg-card border-primary text-primary whitespace-nowrap">
                <Users className="w-3 h-3 mr-1" />
                City-wise
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">Age-wise</Badge>
              <Badge variant="outline" className="whitespace-nowrap">Global</Badge>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-2">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`bg-card rounded-2xl p-4 border flex items-center gap-4 ${
                    user.isUser 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white' :
                    user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                    user.rank === 3 ? 'bg-gradient-to-br from-orange-300 to-yellow-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <span>{user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : user.rank}</span>
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>

                  {/* Name */}
                  <div className="flex-1">
                    <h4 className="text-sm">{user.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Level {Math.floor(user.coins / 500) + 1}
                    </p>
                  </div>

                  {/* Coins */}
                  <div className="text-right">
                    <p className="text-primary font-semibold">{user.coins.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">coins</p>
                  </div>
                </div>
              ))}
            </div>

            {/* User's Rank Card */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Your Rank</p>
                  <h3 className="font-semibold">#12 in Mumbai</h3>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">Beat</p>
                  <h3 className="font-semibold">88% users</h3>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
