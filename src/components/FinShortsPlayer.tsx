import { ArrowLeft, Heart, Share2, MessageCircle, Bookmark, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface FinShortsPlayerProps {
  onBack: () => void;
}

interface Video {
  id: number;
  title: string;
  category: string;
  creator: string;
  thumbnail: string;
  likes: number;
  description: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
}

const videos: Video[] = [
  {
    id: 1,
    title: "5 Money Mistakes to Avoid in Your 20s",
    category: "Daily Tips",
    creator: "Finance Guru",
    thumbnail: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400",
    likes: 1243,
    description: "Learn the top 5 financial mistakes young people make and how to avoid them.",
    quiz: {
      question: "What percentage of income should you ideally save?",
      options: ["10-15%", "20-30%", "40-50%", "5%"],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    title: "GST Simplified - Understanding Tax Slabs",
    category: "CA Syllabus",
    creator: "CA Mentor",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    likes: 2156,
    description: "A simple breakdown of GST tax slabs and how they work in India.",
    quiz: {
      question: "What is the highest GST slab rate in India?",
      options: ["18%", "28%", "12%", "5%"],
      correctAnswer: 1
    }
  },
  {
    id: 3,
    title: "Real Estate Investment: Myth vs Reality",
    category: "Myth Busters",
    creator: "Property Expert",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    likes: 987,
    description: "Debunking common myths about real estate investment in India.",
  },
  {
    id: 4,
    title: "How I Saved ₹1 Lakh in 6 Months",
    category: "Real Stories",
    creator: "Savings Hero",
    thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400",
    likes: 3421,
    description: "A personal journey of disciplined saving and smart budgeting.",
  },
];

export function FinShortsPlayer({ onBack }: FinShortsPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const currentVideo = videos[currentIndex];

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setLiked(false);
      setSaved(false);
      setShowQuiz(false);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setLiked(false);
      setSaved(false);
      setShowQuiz(false);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setQuizAnswered(true);
    }
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageWithFallback
          src={currentVideo.thumbnail}
          alt={currentVideo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 px-6 pt-12 z-20">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Badge className="bg-black/40 backdrop-blur-sm text-white border-white/20 whitespace-nowrap">
              Daily Tips
            </Badge>
            <Badge className="bg-black/40 backdrop-blur-sm text-white border-white/20 whitespace-nowrap">
              Myth Busters
            </Badge>
            <Badge className="bg-black/40 backdrop-blur-sm text-white border-white/20 whitespace-nowrap">
              CA Syllabus
            </Badge>
          </div>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute right-6 bottom-32 z-20 flex flex-col gap-6">
        <button 
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs">{currentVideo.likes + (liked ? 1 : 0)}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs">234</span>
        </button>

        <button 
          onClick={() => setSaved(!saved)}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Bookmark className={`w-6 h-6 ${saved ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs">Save</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs">Share</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-20">
        <div className="mb-4">
          <Badge className="bg-primary text-white border-0 mb-2">
            {currentVideo.category}
          </Badge>
          <h3 className="text-white mb-2 font-semibold">
            {currentVideo.title}
          </h3>
          <p className="text-white/80 text-sm mb-3">
            {currentVideo.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <span className="text-white text-sm">@{currentVideo.creator}</span>
          </div>
        </div>

        {currentVideo.quiz && !quizAnswered && (
          <Button 
            onClick={() => setShowQuiz(true)}
            className="w-full bg-gradient-to-r from-[#00A86B] via-[#006B5E] to-[#0D47A1] text-white h-12 rounded-2xl"
          >
            Take Quiz & Earn Coins 🪙
          </Button>
        )}

        {quizAnswered && (
          <div className="bg-success/20 backdrop-blur-sm border border-success rounded-2xl p-4">
            <p className="text-success text-center">
              ✅ Great job! You earned +50 coins
            </p>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
        <button 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center ${
            currentIndex === 0 ? 'opacity-30' : ''
          }`}
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={handleNext}
          disabled={currentIndex === videos.length - 1}
          className={`w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center ${
            currentIndex === videos.length - 1 ? 'opacity-30' : ''
          }`}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Quiz Dialog */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Quick Quiz</DialogTitle>
          </DialogHeader>
          
          {currentVideo.quiz && (
            <div className="space-y-4">
              <p className="text-lg">{currentVideo.quiz.question}</p>
              
              <div className="space-y-2">
                {currentVideo.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !quizAnswered && setSelectedAnswer(index)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedAnswer === index
                        ? quizAnswered
                          ? index === currentVideo.quiz!.correctAnswer
                            ? 'border-success bg-success/10'
                            : 'border-destructive bg-destructive/10'
                          : 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                    disabled={quizAnswered}
                  >
                    {option}
                    {quizAnswered && index === currentVideo.quiz!.correctAnswer && (
                      <span className="ml-2 text-success">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {!quizAnswered ? (
                <Button 
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12"
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className={`p-4 rounded-xl text-center ${
                    selectedAnswer === currentVideo.quiz.correctAnswer
                      ? 'bg-success/10 text-success'
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {selectedAnswer === currentVideo.quiz.correctAnswer
                      ? '🎉 Correct! You earned +50 coins'
                      : '❌ Incorrect. Better luck next time!'}
                  </div>
                  <Button 
                    onClick={() => {
                      setShowQuiz(false);
                      handleNext();
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12"
                  >
                    Next Video
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
