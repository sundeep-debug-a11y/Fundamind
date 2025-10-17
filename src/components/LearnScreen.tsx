import { BookOpen, Clock, Award, ChevronRight, Play, CheckCircle2, Search, Filter } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface LearnScreenProps {
  onBack: () => void;
}

const caSyllabusModules = [
  {
    id: 1,
    title: "Accounting Fundamentals",
    chapters: 12,
    progress: 75,
    duration: "8 hours",
    completed: 9,
    color: "from-blue-500 to-indigo-600",
    icon: "📊"
  },
  {
    id: 2,
    title: "Business Laws",
    chapters: 10,
    progress: 40,
    duration: "6 hours",
    completed: 4,
    color: "from-purple-500 to-pink-600",
    icon: "⚖️"
  },
  {
    id: 3,
    title: "Economics",
    chapters: 15,
    progress: 60,
    duration: "10 hours",
    completed: 9,
    color: "from-green-500 to-emerald-600",
    icon: "📈"
  },
  {
    id: 4,
    title: "Taxation",
    chapters: 14,
    progress: 20,
    duration: "12 hours",
    completed: 3,
    color: "from-orange-500 to-red-600",
    icon: "💰"
  },
];

const quickLessons = [
  {
    id: 1,
    title: "What is Compound Interest?",
    duration: "2 min",
    category: "Basics",
    completed: true
  },
  {
    id: 2,
    title: "Understanding Credit Score",
    duration: "3 min",
    category: "Credit",
    completed: true
  },
  {
    id: 3,
    title: "Types of Mutual Funds",
    duration: "4 min",
    category: "Investment",
    completed: false
  },
  {
    id: 4,
    title: "EMI Calculation Basics",
    duration: "2 min",
    category: "Loans",
    completed: false
  },
];

export function LearnScreen({ onBack }: LearnScreenProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [contentType, setContentType] = useState<"Courses" | "Videos" | "Articles">("Courses");
  const categories = [
    "All",
    "Basics",
    "Investing",
    "Taxation",
    "CA Syllabus",
    "Real Estate",
    "Insurance",
  ];
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00A86B] via-[#006B5E] to-[#0D47A1] px-4 pt-12 pb-8 rounded-b-3xl shadow">
        <div className="mb-6">
          <h2 className="text-white mb-2 font-semibold">
            {t('learningCenter')}
          </h2>
          <p className="text-white/80">{t('masterFinancialConcepts')}</p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <BookOpen className="w-5 h-5 text-white mb-1" />
            <p className="text-white text-xs">{t('lessons')}</p>
            <p className="text-white font-semibold">32/50</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <Clock className="w-5 h-5 text-white mb-1" />
            <p className="text-white text-xs">{t('hours')}</p>
            <p className="text-white font-semibold">12.5</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <Award className="w-5 h-5 text-white mb-1" />
            <p className="text-white text-xs">{t('certificates')}</p>
            <p className="text-white font-semibold">3</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-4">
        {/* Category Chips */}
        <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide mb-3">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-3 h-9 rounded-full text-sm whitespace-nowrap active:scale-95 transition border ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-transparent"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={`${t('search')} courses, videos, articles...`}
              className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-xl outline-none focus:border-primary"
            />
          </div>
          <button className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content Type Toggle */}
        <div className="flex gap-2 mb-4">
          {[t('courses'), "Videos", "Articles"].map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type as any)}
              className={`px-3 h-9 rounded-full text-sm border ${
                contentType === type
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-foreground border-border"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-2">
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="quick">{t('quickLessons')}</TabsTrigger>
            <TabsTrigger value="ca">{t('caSyllabus')}</TabsTrigger>
          </TabsList>

          {/* Quick Lessons */}
          <TabsContent value="quick" className="space-y-4">
            <div className="bg-gradient-to-r from-[#F4B942] to-[#FF6F00] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Continue Learning</p>
                  <h4 className="font-semibold">Emergency Fund Planning</h4>
                </div>
              </div>
              <Progress value={45} className="h-2 bg-white/30 mb-2" />
              <p className="text-white/90 text-sm">45% complete • 1 min left</p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">
                Recommended for You
              </h3>
              <div className="space-y-3">
                {quickLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className="w-full bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-all active:scale-95 flex items-center gap-3"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      lesson.completed ? 'bg-success/10' : 'bg-primary/10'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : (
                        <Play className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm mb-1 font-semibold">{lesson.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {lesson.category}
                        </Badge>
                        <span>•</span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* CA Syllabus */}
          <TabsContent value="ca" className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h4 className="text-sm text-trust-blue mb-1">
                    CA Foundation Integration
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Learn CA Foundation syllabus through interactive games and lessons
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {caSyllabusModules.map((module) => (
                <button
                  key={module.id}
                  className="w-full bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-all active:scale-95"
                >
                  <div className={`h-20 bg-gradient-to-r ${module.color} p-4 flex items-center gap-3`}>
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex-1 text-left">
                      <h4 className="text-white mb-1 font-semibold">
                        {module.title}
                      </h4>
                      <p className="text-white/80 text-sm">
                        {module.completed}/{module.chapters} chapters • {module.duration}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm text-primary">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2 mb-3" />
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {module.chapters} Chapters
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Interactive
                      </Badge>
                      {module.progress === 100 && (
                        <Badge className="bg-success/10 text-success border-success text-xs">
                          Completed ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-r from-[#00A86B] via-[#006B5E] to-[#0D47A1] rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="mb-1 font-semibold">
                    Study Streak 🔥
                  </h4>
                  <p className="text-white/80 text-sm">Keep learning every day!</p>
                </div>
                <div className="text-3xl">12</div>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7].map((day) => (
                  <div 
                    key={day}
                    className={`flex-1 h-2 rounded-full ${
                      day <= 5 ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Small spacer to prevent overlap */}
      <div className="h-16" aria-hidden="true" />
    </div>
  );
}
