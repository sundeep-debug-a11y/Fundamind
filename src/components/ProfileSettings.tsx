import { ArrowLeft, User, Bell, Globe, Moon, Volume2, HelpCircle, LogOut, ChevronRight, Award, Trophy, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface ProfileSettingsProps {
  onBack: () => void;
}

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const achievements = [
    { id: 1, name: "Budget Master", icon: "🏆", unlocked: true },
    { id: 2, name: "Stock Pro", icon: "📈", unlocked: true },
    { id: 3, name: "Tax Saver", icon: "💰", unlocked: false },
    { id: 4, name: "CA Foundation Scholar", icon: "📚", unlocked: false },
    { id: 5, name: "7-Day Streak", icon: "🔥", unlocked: true },
    { id: 6, name: "Quiz Champion", icon: "🎯", unlocked: true },
  ];

  const stats = [
    { label: "Total Coins", value: "2,450", icon: "🪙" },
    { label: "Games Completed", value: "24", icon: "🎮" },
    { label: "Hours Learned", value: "12.5", icon: "⏱️" },
    { label: "Current Streak", value: "12 days", icon: "🔥" },
  ];

  return (
    <div className="min-h-screen w-full bg-background pb-[96px] sm:pb-[112px]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00A86B] via-[#006B5E] to-[#0D47A1] px-6 pt-12 pb-24 relative rounded-b-3xl shadow">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-16 mb-6">
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-white shadow-md">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Arjun Reddy</h3>
              <p className="text-sm text-muted-foreground">arjun@example.com</p>
              <Badge className="bg-primary/10 text-primary border-0 mt-2">
                <Zap className="w-3 h-3 mr-1" />
                Expert Level
              </Badge>
            </div>
            <button className="text-primary text-sm">Edit</button>
          </div>

          {/* Level Progress */}
          <div className="bg-background rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Level Progress</span>
              <span className="text-sm text-muted-foreground">Expert → Master</span>
            </div>
            <Progress value={65} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">350 / 500 XP to next level</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mb-8">
        <h3 className="mb-4 font-semibold">Your Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border">
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Achievements</h3>
          <button className="text-primary text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.slice(0, 6).map((achievement) => (
            <div 
              key={achievement.id} 
              className={`bg-card rounded-2xl p-4 border border-border text-center ${
                !achievement.unlocked ? 'opacity-50' : ''
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="text-xs">{achievement.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-6 mb-8">
        <h3 className="mb-4 font-semibold">Settings</h3>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p>Notifications</p>
                <p className="text-xs text-muted-foreground">Daily reminders & updates</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p>Audio Instructions</p>
                <p className="text-xs text-muted-foreground">Voice guidance in games</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p>Dark Mode</p>
                <p className="text-xs text-muted-foreground">Switch theme</p>
              </div>
            </div>
            <Switch />
          </div>

          <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p>Language</p>
                <p className="text-xs text-muted-foreground">English</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Additional Options */}
      <div className="px-6 mb-8">
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-primary" />
              <p>CA Syllabus Integration</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <p>Help & Support</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="flex items-center gap-3 p-4 w-full text-left hover:bg-muted/50 transition-colors text-destructive">
            <LogOut className="w-5 h-5" />
            <p>Logout</p>
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="px-6 text-center">
        <p className="text-xs text-muted-foreground">
          FundaMind v1.0.0
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Learn Money
        </p>
      </div>
    </div>
  );
}
