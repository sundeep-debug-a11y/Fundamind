import { ArrowLeft, BookOpen, Trophy, Clock, CheckCircle2, Lock, Play } from 'lucide-react';
import { useState } from 'react';
import { ProgressRing } from '../ProgressRing';

interface CASyllabusProps {
  onBack: () => void;
}

interface Chapter {
  id: number;
  title: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  isLocked: boolean;
}

const chapters: Chapter[] = [
  { id: 1, title: 'Principles of Accounting', icon: '📊', totalLessons: 12, completedLessons: 8, duration: '3h 20m', isLocked: false },
  { id: 2, title: 'Business Laws', icon: '⚖️', totalLessons: 10, completedLessons: 5, duration: '2h 45m', isLocked: false },
  { id: 3, title: 'Business Economics', icon: '📈', totalLessons: 15, completedLessons: 0, duration: '4h 10m', isLocked: false },
  { id: 4, title: 'Taxation Fundamentals', icon: '💰', totalLessons: 14, completedLessons: 0, duration: '3h 50m', isLocked: true },
];

const lessons = [
  { id: 1, title: 'Introduction to Double Entry System', duration: '15 min', completed: true },
  { id: 2, title: 'Understanding Debits and Credits', duration: '20 min', completed: true },
  { id: 3, title: 'Journal Entries Basics', duration: '18 min', completed: true },
  { id: 4, title: 'Ledger Posting', duration: '22 min', completed: false },
  { id: 5, title: 'Trial Balance', duration: '25 min', completed: false },
];

export function CASyllabus({ onBack }: CASyllabusProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showLesson, setShowLesson] = useState(false);

  const totalProgress = Math.round(
    (chapters.reduce((sum, ch) => sum + ch.completedLessons, 0) /
      chapters.reduce((sum, ch) => sum + ch.totalLessons, 0)) *
      100
  );

  if (selectedChapter && !showLesson) {
    const chapter = chapters.find(ch => ch.id === selectedChapter)!;
    const progress = Math.round((chapter.completedLessons / chapter.totalLessons) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] to-[#1976D2] pb-24">
        <div className="px-6 pt-12 pb-6">
          <button onClick={() => setSelectedChapter(null)} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-6">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
              {chapter.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-white text-2xl mb-1">{chapter.title}</h2>
              <p className="text-white/80 text-sm">{chapter.totalLessons} lessons • {chapter.duration}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white">Chapter Progress</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="px-6">
          <h3 className="text-white mb-4">Lessons</h3>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setShowLesson(true)}
                className="w-full bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all active:scale-98"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    lesson.completed ? 'bg-[#4CAF50]' : 'bg-[#0D47A1]'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-gray-900 mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                      {lesson.completed && (
                        <span className="text-[#4CAF50]">• Completed</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showLesson) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="px-6 pt-12 pb-6">
          <button onClick={() => setShowLesson(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 mb-6">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-gray-900 text-2xl mb-2">Journal Entries Basics</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              18 min
            </span>
            <span>•</span>
            <span>Lesson 3 of 12</span>
          </div>
        </div>

        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-[#0D47A1] to-[#1976D2] rounded-2xl p-8 text-white text-center mb-6">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg">Video/Interactive Content Placeholder</p>
            <p className="text-sm opacity-80 mt-2">This would be the lesson video or interactive module</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-gray-900 mb-3">Key Concepts</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <span>Journal is the book of original entry</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <span>Every transaction affects at least two accounts</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <span>Debit what comes in, Credit what goes out</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <h3 className="text-gray-900 mb-3">Practice Question</h3>
            <p className="text-gray-700 mb-4">
              If you purchase goods worth ₹5,000 for cash, which accounts are affected?
            </p>
            <div className="space-y-2">
              {['Purchase A/c (Debit) and Cash A/c (Credit)', 'Cash A/c (Debit) and Purchase A/c (Credit)', 'Sales A/c (Debit) and Cash A/c (Credit)'].map((option, index) => (
                <button
                  key={index}
                  className="w-full p-3 bg-white rounded-xl text-left text-gray-700 hover:bg-amber-100 transition-all border border-amber-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#00A86B] text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95">
            Complete Lesson & Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] to-[#1976D2] pb-24">
      <div className="px-6 pt-12 pb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-white text-3xl mb-2">CA Foundation</h2>
        <p className="text-white/90">Master the basics of Chartered Accountancy</p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-gray-900 mb-1">Overall Progress</h4>
              <p className="text-gray-600 text-sm">Keep learning every day!</p>
            </div>
            <ProgressRing progress={totalProgress} size={80} strokeWidth={6}>
              <span className="text-xl text-[#0D47A1]">{totalProgress}%</span>
            </ProgressRing>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl text-[#0D47A1] mb-1">13</div>
              <div className="text-xs text-gray-600">Lessons Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-[#F4B942] mb-1">850</div>
              <div className="text-xs text-gray-600">Coins Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-[#4CAF50] mb-1">5</div>
              <div className="text-xs text-gray-600">Certificates</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <h3 className="text-white mb-4">Chapters</h3>
        <div className="space-y-3">
          {chapters.map((chapter) => {
            const progress = Math.round((chapter.completedLessons / chapter.totalLessons) * 100);
            
            return (
              <button
                key={chapter.id}
                onClick={() => !chapter.isLocked && setSelectedChapter(chapter.id)}
                disabled={chapter.isLocked}
                className={`w-full bg-white rounded-2xl p-5 shadow-card transition-all ${
                  chapter.isLocked 
                    ? 'opacity-60' 
                    : 'hover:shadow-card-hover active:scale-98'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0D47A1] to-[#1976D2] rounded-xl flex items-center justify-center text-3xl relative">
                    {chapter.isLocked ? (
                      <Lock className="w-6 h-6 text-white" />
                    ) : (
                      <span>{chapter.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-gray-900 mb-1">{chapter.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{chapter.totalLessons} lessons</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{chapter.duration}</span>
                    </div>
                  </div>
                  {!chapter.isLocked && (
                    <div className="text-right">
                      <div className="text-2xl text-[#0D47A1] mb-1">{progress}%</div>
                    </div>
                  )}
                </div>
                
                {!chapter.isLocked && (
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0D47A1] to-[#1976D2] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
