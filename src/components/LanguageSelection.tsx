import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface LanguageSelectionProps {
  onComplete: () => void;
}

const languages = [
  { code: "en", name: "English", native: "English", icon: "🇬🇧" },
  { code: "hi", name: "Hindi", native: "हिन्दी", icon: "🇮🇳" },
  { code: "ta", name: "Tamil", native: "தமிழ்", icon: "🇮🇳" },
  { code: "te", name: "Telugu", native: "తెలుగు", icon: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", icon: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", icon: "🇮🇳" },
];

export function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const [selected, setSelected] = useState("en");

  return (
    <div className="h-screen w-full bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="text-center mt-12 mb-8">
          <h2 className="text-3xl mb-2 font-semibold">
            Choose Your Language
          </h2>
          <p className="text-muted-foreground">
            अपनी भाषा चुनें | உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`relative w-full p-5 rounded-2xl border-2 transition-all text-left bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                selected === lang.code
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl leading-none select-none">{lang.icon}</span>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{lang.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{lang.native}</div>
                </div>
              </div>
              {selected === lang.code && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <Button
          onClick={() => {
            try { localStorage.setItem('language', selected); } catch {}
            onComplete();
          }}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl mt-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
