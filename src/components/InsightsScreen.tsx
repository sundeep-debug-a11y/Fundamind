import { Clock, CheckCircle2, Flame, Star, TrendingUp, BarChart3, Award, Target, BookOpen } from "lucide-react";

export function InsightsScreen() {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00A86B] via-[#006B5E] to-[#0D47A1] px-6 pt-12 pb-8 rounded-b-3xl shadow">
        <div className="mb-6">
          <h2 className="text-white mb-2 font-semibold text-2xl">
            Your Insights
          </h2>
          <p className="text-white/80">Track your learning journey and achievements</p>
        </div>

        {/* Quick Stats in Header */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <Clock className="w-5 h-5 text-white mb-1" />
            <p className="text-white text-xs">Total Time</p>
            <p className="text-white font-semibold">12h 34m</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <Flame className="w-5 h-5 text-white mb-1" />
            <p className="text-white text-xs">Streak</p>
            <p className="text-white font-semibold">14 days</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <Star className="w-5 h-5 text-white mb-1" />
            <p className="text-white text-xs">Points</p>
            <p className="text-white font-semibold">4,850</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Detailed Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Modules Completed</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">23</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Accuracy Rate</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">87%</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">Topics Mastered</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">12</div>
            <p className="text-xs text-muted-foreground">out of 18 total</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Certificates</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">3</div>
            <p className="text-xs text-muted-foreground">2 pending</p>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Weekly Activity</h3>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">This Week</span>
          </div>
          <div className="h-32 bg-gradient-to-t from-primary/10 to-primary/5 rounded-xl flex items-end justify-center">
            <div className="text-sm text-muted-foreground">Interactive chart coming soon</div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Subject Performance</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: "Budgeting", score: 72, color: "bg-green-500" },
              { name: "Investing", score: 58, color: "bg-blue-500" },
              { name: "Taxation", score: 83, color: "bg-purple-500" },
              { name: "Insurance", score: 65, color: "bg-orange-500" }
            ].map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subject.name}</span>
                  <span className="text-sm font-semibold">{subject.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${subject.color} rounded-full transition-all duration-300`} 
                    style={{ width: `${subject.score}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Budget Master", icon: "🏆", date: "2 days ago" },
              { name: "7-Day Streak", icon: "🔥", date: "1 week ago" },
              { name: "Quiz Champion", icon: "🎯", date: "3 days ago" },
              { name: "Fast Learner", icon: "⚡", date: "5 days ago" }
            ].map((achievement) => (
              <div key={achievement.name} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small spacer to prevent overlap */}
        <div className="h-16" aria-hidden="true" />
      </div>
    </div>
  );
}
