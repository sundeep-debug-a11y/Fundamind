import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface OnboardingQuizProps {
  onComplete: (score: number) => void;
}

const questions = [
  {
    id: 1,
    question: 'What does a budget help you do?',
    options: [
      'Track your spending',
      'Increase your income',
      'Get free money',
      'Buy anything you want',
    ],
    correct: 0,
  },
  {
    id: 2,
    question: 'Which is better for saving money?',
    options: [
      'Spending first, saving what\'s left',
      'Saving first, spending what\'s left',
      'Never saving',
      'Only saving during festivals',
    ],
    correct: 1,
  },
  {
    id: 3,
    question: 'What is an EMI?',
    options: [
      'Extra Money Income',
      'Equated Monthly Installment',
      'Emergency Medical Insurance',
      'Electronic Money Interface',
    ],
    correct: 1,
  },
];

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setTimeout(() => onComplete(score + (index === questions[currentQuestion].correct ? 1 : 0)), 500);
      }
    }, 1500);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00A86B] to-[#006B5E] flex flex-col">
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-white mb-2 text-sm">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
            <h3 className="text-xl mb-6 text-gray-900">{question.question}</h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showResult = showFeedback && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      showResult
                        ? isCorrect
                          ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                          : 'border-[#D32F2F] bg-[#D32F2F]/10'
                        : 'border-gray-200 hover:border-[#00A86B] hover:bg-[#00A86B]/5'
                    } ${showFeedback ? 'cursor-not-allowed' : 'active:scale-98'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={showResult && isCorrect ? 'text-[#4CAF50]' : showResult ? 'text-[#D32F2F]' : ''}>
                        {option}
                      </span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
                      )}
                      {showResult && !isCorrect && (
                        <div className="w-5 h-5 rounded-full border-2 border-[#D32F2F] flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#D32F2F] rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showFeedback && (
            <div className="text-center text-white">
              <p className="text-sm opacity-90">
                {selectedAnswer === question.correct ? '🎉 Great job!' : '💡 Keep learning!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
