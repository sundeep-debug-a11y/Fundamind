import { Heart, Share2, Bookmark, MessageCircle, ChevronUp, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FinShortsPlayerProps {
  onBack: () => void;
}

interface Video {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  likes: number;
  duration: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
}

const videos: Video[] = [
  {
    id: 1,
    title: '5 Smart Ways to Save Money Every Month',
    category: 'Daily Tips',
    thumbnail: 'https://images.unsplash.com/photo-1644150196229-c1d6321406fa?w=400',
    likes: 12500,
    duration: '0:45',
    quiz: {
      question: 'What is the 50-30-20 rule?',
      options: [
        '50% needs, 30% wants, 20% savings',
        '50% savings, 30% needs, 20% wants',
        '50% wants, 30% savings, 20% needs',
      ],
      correct: 0,
    },
  },
  {
    id: 2,
    title: 'Credit Cards: Friend or Foe? Busting the Myth',
    category: 'Myth Busters',
    thumbnail: 'https://images.unsplash.com/photo-1644150196229-c1d6321406fa?w=400',
    likes: 8500,
    duration: '1:20',
    quiz: {
      question: 'What affects your credit score the most?',
      options: [
        'Payment history',
        'Number of cards',
        'Card color',
      ],
      correct: 0,
    },
  },
  {
    id: 3,
    title: 'Understanding GST: Simple Breakdown for Students',
    category: 'CA Syllabus',
    thumbnail: 'https://images.unsplash.com/photo-1644150196229-c1d6321406fa?w=400',
    likes: 15200,
    duration: '2:15',
    quiz: {
      question: 'What does GST stand for?',
      options: [
        'Goods and Services Tax',
        'General Sales Tax',
        'Government Service Tax',
      ],
      correct: 0,
    },
  },
];

const categories = ['All', 'Daily Tips', 'Myth Busters', 'CA Syllabus', 'Real Stories', 'News'];

export function FinShortsPlayer({ onBack }: FinShortsPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const currentVideo = videos[currentVideoIndex];

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      resetState();
    } else if (direction === 'down' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      resetState();
    }
  };

  const resetState = () => {
    setLiked(false);
    setSaved(false);
    setShowQuiz(false);
    setQuizAnswer(null);
  };

  const handleQuizAnswer = (index: number) => {
    setQuizAnswer(index);
    setTimeout(() => {
      setShowQuiz(false);
      setTimeout(() => handleSwipe('up'), 1000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Close Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Category Chips */}
      <div className="absolute top-4 left-16 right-4 z-40 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#00A86B] text-white'
                : 'bg-white/20 backdrop-blur-sm text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Container */}
      <div className="relative h-full w-full max-w-md mx-auto">
        {/* Video Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A86B] to-[#006B5E]">
          <ImageWithFallback
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="w-full h-full object-cover opacity-70"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-white border-b-12 border-b-transparent ml-2" />
            </div>
          </div>
        </div>

        {/* Video Info Bottom */}
        <div className="absolute bottom-20 left-0 right-0 px-6 z-30">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#00A86B] text-white text-xs rounded-full mb-2">
              {currentVideo.category}
            </span>
            <h3 className="text-white text-lg mb-2">{currentVideo.title}</h3>
            <p className="text-white/80 text-sm">👁 {(currentVideo.likes / 1000).toFixed(1)}K views • {currentVideo.duration}</p>
          </div>
        </div>

        {/* Action Buttons Right Side */}
        <div className="absolute right-4 bottom-32 z-30 flex flex-col gap-6">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center gap-1 text-white"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              liked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            </div>
            <span className="text-xs">{(currentVideo.likes + (liked ? 1 : 0)).toLocaleString()}</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs">125</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className="flex flex-col items-center gap-1 text-white"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              saved ? 'bg-[#F4B942]' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
            </div>
            <span className="text-xs">{saved ? 'Saved' : 'Save'}</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs">Share</span>
          </button>
        </div>

        {/* Navigation Hints */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-30">
          {currentVideoIndex > 0 && (
            <button
              onClick={() => handleSwipe('down')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
          {currentVideoIndex < videos.length - 1 && (
            <button
              onClick={() => handleSwipe('up')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quiz Button */}
        {currentVideo.quiz && !showQuiz && (
          <button
            onClick={() => setShowQuiz(true)}
            className="absolute bottom-32 left-6 z-30 px-6 py-3 bg-[#F4B942] text-white rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            🎯 Take Quiz (+50 coins)
          </button>
        )}

        {/* Quiz Overlay */}
        {showQuiz && currentVideo.quiz && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-end justify-center z-40 p-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
              <h4 className="text-xl text-gray-900 mb-4">{currentVideo.quiz.question}</h4>
              <div className="space-y-3">
                {currentVideo.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      quizAnswer === index
                        ? index === currentVideo.quiz!.correct
                          ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                          : 'border-[#D32F2F] bg-[#D32F2F]/10'
                        : 'border-gray-200 hover:border-[#00A86B] hover:bg-[#00A86B]/5'
                    } ${quizAnswer !== null ? 'cursor-not-allowed' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {quizAnswer !== null && (
                <div className={`mt-4 p-4 rounded-xl ${
                  quizAnswer === currentVideo.quiz.correct
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${
                    quizAnswer === currentVideo.quiz.correct ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {quizAnswer === currentVideo.quiz.correct 
                      ? '🎉 Correct! +50 coins earned!' 
                      : '💡 Not quite! The correct answer is highlighted.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="absolute top-20 right-4 z-30">
          <div className="flex flex-col gap-1">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 rounded-full transition-all ${
                  index === currentVideoIndex
                    ? 'bg-white'
                    : index < currentVideoIndex
                      ? 'bg-white/50'
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
