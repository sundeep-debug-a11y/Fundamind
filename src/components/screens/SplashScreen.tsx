import { Sparkles, TrendingUp } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="min-h-screen gradient-green-teal flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <Sparkles className="w-24 h-24 text-white animate-pulse" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <TrendingUp className="w-32 h-32 text-white animate-pulse" />
      </div>
      
      {/* Logo and branding */}
      <div className="text-center z-10">
        <div className="mb-8 animate-bounce">
          <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6">
            <div className="relative">
              <div className="text-6xl">₹</div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#F4B942]" />
            </div>
          </div>
        </div>
        
        <h1 className="text-white text-5xl mb-4 tracking-tight">ProspEra</h1>
        <p className="text-white/90 text-xl mb-12">Empowering India's Financial Future</p>
        
        <div className="flex items-center justify-center gap-2 text-white/80">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
      
      <button
        onClick={onComplete}
        className="absolute bottom-12 left-6 right-6 bg-white text-[#00A86B] py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      >
        Get Started
      </button>
    </div>
  );
}
