import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const { t } = useLanguage();
  
  const slides = [
    {
      id: 1,
      title: t('learningGames'),
      description: t('playLearnMaster'),
      image: "https://images.unsplash.com/photo-1559984430-c12e199879b6?w=800",
      icon: "🎮",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: t('masterFinancialConcepts'),
      description: t('trackLearningJourney'),
      image: "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?w=800",
      icon: "💡",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      title: t('yourInsights'),
      description: t('recentAchievements'),
      image: "https://images.unsplash.com/photo-1551749626-2a2fdb374ee3?w=800",
      icon: "🏆",
      color: "from-orange-500 to-red-600"
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        {currentSlide < slides.length - 1 && (
          <button onClick={handleSkip} className="text-muted-foreground">
            {t('skip')}
          </button>
        )}
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Image */}
        <div className={`w-64 h-64 rounded-3xl bg-gradient-to-br ${slide.color} mb-8 relative overflow-hidden shadow-2xl`}>
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl drop-shadow-lg">{slide.icon}</div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-sm">
          <h2 className="mb-3 font-semibold">
            {slide.title}
          </h2>
          <p className="text-muted-foreground">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-8">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-primary w-8'
                  : 'bg-border w-2'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              {t('next')}
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            t('startLearning')
          )}
        </Button>
      </div>
    </div>
  );
}
