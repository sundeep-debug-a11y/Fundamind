import { Check } from 'lucide-react';
import { useState } from 'react';

interface LanguageSelectionProps {
  onComplete: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
];

export function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const [selected, setSelected] = useState('en');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2 text-[#00A86B]">Choose Your Language</h2>
            <p className="text-gray-600">अपनी भाषा चुनें</p>
          </div>

          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${
                  selected === lang.code
                    ? 'border-[#00A86B] bg-[#00A86B]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className={selected === lang.code ? 'text-[#00A86B]' : 'text-gray-900'}>
                      {lang.name}
                    </div>
                    <div className="text-sm text-gray-500">{lang.nativeName}</div>
                  </div>
                </div>
                {selected === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-[#00A86B] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => onComplete(selected)}
          className="w-full bg-[#00A86B] text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
