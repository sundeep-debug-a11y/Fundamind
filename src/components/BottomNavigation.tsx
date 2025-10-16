import { Home, Gamepad2, BookOpen, BarChart3, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "games", icon: Gamepad2, label: "Practice" },
    { id: "learn", icon: BookOpen, label: "Learn" },
    { id: "insights", icon: BarChart3, label: "Insights" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border shadow-lg z-50 max-w-[440px] mx-auto" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-14 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span className={`flex items-center justify-center w-12 h-8 rounded-xl ${isActive ? 'bg-primary/10' : ''}`}>
                <Icon className={`w-6 h-6 ${isActive ? "fill-primary" : ""}`} />
              </span>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
