import { Lock, TrendingUp } from 'lucide-react';

interface GameCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
  isLocked?: boolean;
  gradient: string;
  onClick?: () => void;
}

export function GameCard({ 
  title, 
  subtitle, 
  icon, 
  progress, 
  isLocked = false,
  gradient,
  onClick 
}: GameCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`relative w-full rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ${
        isLocked ? 'opacity-60' : 'active:scale-98'
      }`}
    >
      <div className={`${gradient} p-6 h-56 flex flex-col justify-between`}>
        {isLocked && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-white">
              <Lock className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Complete previous level</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-start">
          <div className="text-white text-left flex-1">
            <h3 className="text-xl mb-1">{title}</h3>
            <p className="text-sm opacity-90">{subtitle}</p>
          </div>
          <div className="text-white ml-2">
            {icon}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-white text-sm">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Progress
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}
