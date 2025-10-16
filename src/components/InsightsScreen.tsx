import { Clock, CheckCircle2, Flame, Star, TrendingUp, BarChart3 } from "lucide-react";

export function InsightsScreen() {
  return (
    <div className="min-h-screen w-full bg-background px-6 pt-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Insights</h2>
        <p className="text-muted-foreground text-sm">Track your learning activity and progress</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-foreground" />
            <span className="text-sm text-muted-foreground">Learning Time</span>
          </div>
          <div className="text-lg font-semibold">12h 34m</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Modules Completed</span>
          </div>
          <div className="text-lg font-semibold">23</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-alert" />
            <span className="text-sm text-muted-foreground">Current Streak</span>
          </div>
          <div className="text-lg font-semibold">14 days</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Points Earned</span>
          </div>
          <div className="text-lg font-semibold">4,850</div>
        </div>
      </div>

      {/* Chart placeholders */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <h3 className="text-sm font-medium">Weekly Activity</h3>
          </div>
          <span className="text-xs text-muted-foreground">This Week</span>
        </div>
        <div className="h-28 bg-muted rounded-xl" />
      </div>

      <div className="bg-card border border-border rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4" />
          <h3 className="text-sm font-medium">Subject-wise Performance</h3>
        </div>
        <div className="space-y-2">
          {["Budgeting", "Investing", "Taxation"].map((s, i) => (
            <div key={s} className="w-full">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">{s}</span>
                <span className="text-foreground">{[72, 58, 83][i]}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${[72,58,83][i]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["Budget Master", "7-Day Streak", "Quiz Champion"].map((b) => (
            <div key={b} className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-xs whitespace-nowrap">
              <Star className="w-3 h-3 text-accent" /> {b}
            </div>
          ))}
        </div>
      </div>

      {/* Small spacer to prevent overlap */}
      <div className="h-16" aria-hidden="true" />
    </div>
  );
}
