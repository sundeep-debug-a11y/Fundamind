import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { LanguageSelection } from "./components/LanguageSelection";
import { OnboardingCarousel } from "./components/OnboardingCarousel";
import { AuthScreen } from "./components/AuthScreen";
import { PhoneAuthScreen } from "./components/PhoneAuthScreen";
import { HomeDashboard } from "./components/HomeDashboard";
import { BudgetBazaar } from "./components/BudgetBazaar";
import { StockMarketSimulator } from "./components/StockMarketSimulator";
import { FinShortsPlayer } from "./components/FinShortsPlayer";
import { InsightsScreen } from "./components/InsightsScreen";
import { ProfileSettings } from "./components/ProfileSettings";
import { GamesGrid } from "./components/GamesGrid";
import { LearnScreen } from "./components/LearnScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { ApiTest } from "./components/ApiTest";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

type Screen = 
  | "splash"
  | "language"
  | "onboarding"
  | "auth"
  | "home"
  | "games"
  | "learn"
  | "budget-bazaar"
  | "stock-market"
  | "savings-sprout"
  | "credit-card-quest"
  | "videos"
  | "insights"
  | "profile"
  | "api-test";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState("home");

  // Reset function to clear all data and return to initial state
  const resetApp = () => {
    setCurrentScreen("splash");
    setActiveTab("home");
    // Clear any browser storage if needed in the future
    localStorage.clear();
    sessionStorage.clear();
  };

  // Mobile viewport setup
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        setCurrentScreen("home");
        break;
      case "games":
        setCurrentScreen("games");
        break;
      case "learn":
        setCurrentScreen("learn");
        break;
      case "insights":
        setCurrentScreen("insights");
        break;
      case "profile":
        setCurrentScreen("profile");
        break;
      default:
        setCurrentScreen("home");
    }
  };

  const handleNavigateToGame = (game: string) => {
    setCurrentScreen(game as Screen);
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setActiveTab("home");
  };

  const showBottomNav = ["home", "games", "learn", "videos", "insights", "profile"].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      {/* Demo Navigation Menu removed */}
      
      {/* Mobile Frame Container */}
      <div className="max-w-[440px] mx-auto relative bg-background min-h-screen shadow-xl">
        {/* Screen Router */}
        {currentScreen === "splash" && (
          <SplashScreen onComplete={() => setCurrentScreen("language")} />
        )}

        {currentScreen === "language" && (
          <LanguageSelection onComplete={() => setCurrentScreen("onboarding")} />
        )}

        {currentScreen === "onboarding" && (
          <OnboardingCarousel onComplete={() => setCurrentScreen("auth")} />
        )}

        {currentScreen === "auth" && (
          <AuthScreen onAuthSuccess={() => setCurrentScreen("home")} />
        )}

        {currentScreen === "home" && (
          <HomeDashboard 
            onNavigateToGame={handleNavigateToGame}
            onNavigateToVideos={() => setCurrentScreen("videos")}
            onNavigate={(screen: string) => setCurrentScreen(screen as Screen)}
          />
        )}

        {currentScreen === "games" && (
          <GamesGrid onGameSelect={handleNavigateToGame} />
        )}

        {currentScreen === "learn" && (
          <LearnScreen onBack={handleBackToHome} />
        )}

        {currentScreen === "budget-bazaar" && (
          <BudgetBazaar onBack={handleBackToHome} />
        )}

        {currentScreen === "stock-market" && (
          <StockMarketSimulator onBack={handleBackToHome} />
        )}

        {currentScreen === "savings-sprout" && (
          <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-600">
            <div className="text-center text-white p-8">
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl mb-2 font-semibold">
                Savings Sprout
              </h2>
              <p className="mb-6">Coming Soon</p>
              <button 
                onClick={handleBackToHome}
                className="bg-white text-green-600 px-6 py-3 rounded-xl"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {currentScreen === "credit-card-quest" && (
          <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-600">
            <div className="text-center text-white p-8">
              <div className="text-6xl mb-4">💳</div>
              <h2 className="text-2xl mb-2 font-semibold">
                Credit Card Quest
              </h2>
              <p className="mb-2">Unlock at Level 10</p>
              <p className="text-sm opacity-80 mb-6">Complete more games to unlock!</p>
              <button 
                onClick={handleBackToHome}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {currentScreen === "videos" && (
          <FinShortsPlayer onBack={handleBackToHome} />
        )}

        {currentScreen === "profile" && (
          <ProfileSettings onBack={handleBackToHome} />
        )}

        {currentScreen === "insights" && (
          <InsightsScreen />
        )}

        {currentScreen === "api-test" && (
          <ApiTest />
        )}

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>

    </div>
  );
}

// Wrap App with Providers
export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
