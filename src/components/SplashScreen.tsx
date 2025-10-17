import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const { t } = useLanguage();
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>(
    "/fundamind-logo.png/WhatsApp%20Image%202025-10-16%20at%2018.30.14_2027928d.jpg"
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#00A86B] via-[#006B5E] to-[#0D47A1] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#F4B942]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      
      <div className="flex flex-col items-center justify-center relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="mb-6">
          <div className="w-36 h-36 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
            {logoError ? (
              <Sparkles className="w-16 h-16 text-[#00A86B]" />
            ) : (
              <img
                src={logoSrc}
                alt="FUNDAMIND Logo"
                className="w-full h-full object-contain p-3"
                loading="eager"
                onError={() => {
                  // If file missing, show fallback icon
                  setLogoError(true);
                }}
              />
            )}
          </div>
        </div>
        
        <h1 className="text-white text-5xl mb-2 tracking-tight font-extrabold">
          FundaMind
        </h1>
        
        <p className="text-white/90 text-center max-w-xs mt-2">
          {t('Learn Money')}
        </p>
        
        <div className="mt-12 flex gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}
