import { Lock, TrendingUp } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Game {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  image: string;
  difficulty: string;
}

interface GamesGridProps {
  onGameSelect: (gameId: string) => void;
}

const allGames: Game[] = [
  {
    id: "budget-bazaar",
    title: "Budget Bazaar",
    subtitle: "Master smart shopping",
    icon: "🛒",
    color: "from-orange-400 to-red-500",
    unlocked: true,
    progress: 65,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1678274324663-afc2c68eeeec?w=400"
  },
  {
    id: "stock-market",
    title: "Stock Market Simulator",
    subtitle: "Learn to invest wisely",
    icon: "📈",
    color: "from-blue-400 to-indigo-600",
    unlocked: true,
    progress: 40,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?w=400"
  },
  {
    id: "savings-sprout",
    title: "Savings Sprout",
    subtitle: "Grow your money tree",
    icon: "🌱",
    color: "from-green-400 to-emerald-600",
    unlocked: true,
    progress: 80,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1579621970590-9d624316904b?w=400"
  },
  {
    id: "credit-card-quest",
    title: "Credit Card Quest",
    subtitle: "Build your credit score",
    icon: "💳",
    color: "from-purple-400 to-pink-600",
    unlocked: false,
    progress: 0,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1640545232493-9a9b5c88ede4?w=400"
  },
  {
    id: "tax-explorer",
    title: "Tax Explorer",
    subtitle: "Navigate income tax",
    icon: "📊",
    color: "from-yellow-400 to-orange-600",
    unlocked: false,
    progress: 0,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400"
  },
  {
    id: "insurance-hero",
    title: "Insurance Hero",
    subtitle: "Protect what matters",
    icon: "🛡️",
    color: "from-cyan-400 to-blue-600",
    unlocked: false,
    progress: 0,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400"
  },
];

export function GamesGrid({ onGameSelect }: GamesGridProps) {
  return (
    <div className="min-h-screen w-full bg-background pt-12 px-4 sm:px-6">
      <div className="mb-4">
        <h2 className="mb-1 font-semibold">
          Learning Games
        </h2>
        <p className="text-muted-foreground text-sm">
          Play, learn, and master financial concepts
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <Badge variant="outline" className="bg-primary text-white border-primary whitespace-nowrap">
          All Games
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap">
          In Progress
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap">
          Completed
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap">
          Locked
        </Badge>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-4">
        {allGames.map((game) => (
          <button
            key={game.id}
            onClick={() => game.unlocked && onGameSelect(game.id)}
            className="relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all active:scale-95 text-left"
            disabled={!game.unlocked}
          >
            <div className={`h-36 bg-gradient-to-br ${game.color} relative`}>
              <ImageWithFallback
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Icon */}
              <div className="absolute top-3 right-3 text-3xl drop-shadow-lg">
                {game.icon}
              </div>

              {/* Difficulty Badge */}
              {game.unlocked && (
                <Badge className="absolute top-3 left-3 bg-black/50 text-white border-0 backdrop-blur-sm text-xs">
                  {game.difficulty}
                </Badge>
              )}

              {/* Lock Overlay */}
              {!game.unlocked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Lock className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-white text-xs">Level 10</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3">
              <h4 className="text-sm mb-1 line-clamp-1">{game.title}</h4>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                {game.subtitle}
              </p>
              
              {game.unlocked && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-primary">{game.progress}%</span>
                  </div>
                  <Progress value={game.progress} className="h-1.5" />
                </div>
              )}

              {!game.unlocked && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>Complete more games to unlock</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Learning Path Teaser */}
      <div className="mt-8 mb-8 bg-gradient-to-r from-[#00A86B] via-[#006B5E] to-[#0D47A1] rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold">Learning Path</h4>
            <p className="text-white/80 text-sm">Your financial journey</p>
          </div>
        </div>
        <p className="text-white/90 text-sm mb-4">
          Complete games in order to unlock advanced concepts and earn more rewards!
        </p>
        <div className="flex gap-2">
          <Badge className="bg-white/20 text-white border-0">
            ✓ Beginner
          </Badge>
          <Badge className="bg-white/20 text-white border-0">
            → Learner
          </Badge>
          <Badge className="bg-white/10 text-white/60 border-0">
            Expert
          </Badge>
        </div>
      </div>

      {/* Small spacer to prevent overlap */}
      <div className="h-16" aria-hidden="true" />
    </div>
  );
}
