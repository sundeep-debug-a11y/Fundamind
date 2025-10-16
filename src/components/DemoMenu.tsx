import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface DemoMenuProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const screens = [
  { id: "splash", name: "🚀 Splash Screen", category: "Onboarding" },
  { id: "language", name: "🌍 Language Selection", category: "Onboarding" },
  { id: "onboarding", name: "📱 Onboarding Carousel", category: "Onboarding" },
  { id: "auth", name: "🔐 Phone Authentication", category: "Onboarding" },
  { id: "home", name: "🏠 Home Dashboard", category: "Main" },
  { id: "games", name: "🎮 Games Grid", category: "Main" },
  { id: "learn", name: "📚 Learning Center", category: "Main" },
  { id: "videos", name: "🎬 FinShorts Player", category: "Main" },
  { id: "profile", name: "👤 Profile & Settings", category: "Main" },
  { id: "budget-bazaar", name: "🛒 Budget Bazaar Game", category: "Games" },
  { id: "stock-market", name: "📈 Stock Market Simulator", category: "Games" },
  { id: "savings-sprout", name: "🌱 Savings Sprout (Coming Soon)", category: "Games" },
  { id: "credit-card-quest", name: "💳 Credit Card Quest (Locked)", category: "Games" },
];

export function DemoMenu({ currentScreen, onNavigate }: DemoMenuProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (screenId: string) => {
    onNavigate(screenId);
    setOpen(false);
  };

  const groupedScreens = screens.reduce((acc, screen) => {
    if (!acc[screen.category]) {
      acc[screen.category] = [];
    }
    acc[screen.category].push(screen);
    return acc;
  }, {} as Record<string, typeof screens>);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="fixed top-4 left-4 z-50 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          {open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>ProspEra Demo Menu</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {Object.entries(groupedScreens).map(([category, categoryScreens]) => (
            <div key={category}>
              <h4 className="text-sm text-muted-foreground mb-3">{category}</h4>
              <div className="space-y-2">
                {categoryScreens.map((screen) => (
                  <Button
                    key={screen.id}
                    onClick={() => handleNavigate(screen.id)}
                    variant={currentScreen === screen.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                  >
                    <span className="text-sm">{screen.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            This menu is for demo purposes. Click any screen to navigate.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
